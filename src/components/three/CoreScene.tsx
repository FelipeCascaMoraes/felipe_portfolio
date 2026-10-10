"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

interface CoreSceneProps {
  /** Renderiza um único quadro estático, sem animação. */
  reducedMotion: boolean;
  /** Reduz resolução e quantidade de partículas em telas pequenas. */
  compact: boolean;
  /** Pausa o loop quando a cena está fora da área visível. */
  active: boolean;
  onContextLost: () => void;
}

const BLUE = "#4a85ff";
const VIOLET = "#8b6cff";

interface Orbit {
  radius: number;
  tilt: [number, number, number];
  speed: number;
  color: string;
  opacity: number;
  phase: number;
}

const ORBITS: Orbit[] = [
  { radius: 1.48, tilt: [1.25, 0.2, 0], speed: 0.34, color: BLUE, opacity: 0.55, phase: 0.4 },
  { radius: 1.7, tilt: [1.05, -0.75, 0.3], speed: -0.22, color: VIOLET, opacity: 0.4, phase: 2.6 },
  { radius: 1.92, tilt: [1.45, 0.95, -0.2], speed: 0.15, color: BLUE, opacity: 0.28, phase: 4.4 },
];

/** PRNG determinístico: mantém a nuvem de partículas idêntica entre renders. */
function mulberry32(seed: number) {
  let state = seed;
  return () => {
    state = (state + 0x6d2b79f5) | 0;
    let t = Math.imul(state ^ (state >>> 15), 1 | state);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function createParticles(count: number): Float32Array {
  const random = mulberry32(7);
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const radius = 1.6 + random() * 1.5;
    const theta = random() * Math.PI * 2;
    const phi = Math.acos(2 * random() - 1);
    positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = radius * Math.cos(phi) * 0.8;
    positions[i * 3 + 2] = radius * Math.sin(phi) * Math.sin(theta);
  }
  return positions;
}

/**
 * Ambiente procedural: painéis de luz azul, violeta e branca que a esfera
 * reflete. Evita baixar um HDRI e mantém as cores da identidade.
 */
function applyStudioEnvironment(renderer: THREE.WebGLRenderer, scene: THREE.Scene) {
  const pmrem = new THREE.PMREMGenerator(renderer);
  const studio = new THREE.Scene();
  studio.background = new THREE.Color("#020308");

  const geometry = new THREE.PlaneGeometry(1, 1);
  const materials: THREE.MeshBasicMaterial[] = [];
  const addPanel = (
    color: string,
    intensity: number,
    position: [number, number, number],
    size: [number, number],
  ) => {
    const material = new THREE.MeshBasicMaterial({
      color: new THREE.Color(color).multiplyScalar(intensity),
      side: THREE.DoubleSide,
    });
    materials.push(material);
    const panel = new THREE.Mesh(geometry, material);
    panel.position.set(...position);
    panel.scale.set(size[0], size[1], 1);
    panel.lookAt(0, 0, 0);
    studio.add(panel);
  };

  // Disposição assimétrica: luz principal no alto à esquerda, contraluz violeta à direita.
  addPanel("#ffffff", 4, [-3, 7, 2], [9, 1.2]);
  addPanel(BLUE, 14, [-7, 2.5, 1], [1.4, 9]);
  addPanel(VIOLET, 9, [7, -3.5, -2], [1.2, 8]);
  addPanel(BLUE, 3, [5, 6, -4], [5, 1]);

  const target = pmrem.fromScene(studio, 0.035);
  scene.environment = target.texture;

  return () => {
    scene.environment = null;
    target.dispose();
    pmrem.dispose();
    geometry.dispose();
    materials.forEach((material) => material.dispose());
  };
}

function StudioEnvironment() {
  const renderer = useThree((state) => state.gl);
  const scene = useThree((state) => state.scene);
  const invalidate = useThree((state) => state.invalidate);

  useEffect(() => {
    const dispose = applyStudioEnvironment(renderer, scene);
    // Com frameloop "demand" é preciso pedir um quadro novo após aplicar o ambiente.
    invalidate();
    return dispose;
  }, [renderer, scene, invalidate]);

  return null;
}

const rimUniforms = {
  uBlue: { value: new THREE.Color(BLUE) },
  uViolet: { value: new THREE.Color(VIOLET) },
};

const rimVertexShader = /* glsl */ `
  varying vec3 vNormal;
  varying vec3 vView;

  void main() {
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    vNormal = normalize(normalMatrix * normal);
    vView = normalize(-mvPosition.xyz);
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const rimFragmentShader = /* glsl */ `
  uniform vec3 uBlue;
  uniform vec3 uViolet;
  varying vec3 vNormal;
  varying vec3 vView;

  void main() {
    float fresnel = pow(1.0 - max(dot(normalize(vNormal), normalize(vView)), 0.0), 2.8);
    vec3 color = mix(uBlue, uViolet, smoothstep(-0.5, 0.9, vNormal.x - vNormal.y * 0.6));
    gl_FragColor = vec4(color * fresnel * 1.6, fresnel);
    #include <colorspace_fragment>
  }
`;

interface CoreProps {
  animated: boolean;
  particleCount: number;
}

function Core({ animated, particleCount }: CoreProps) {
  const rig = useRef<THREE.Group>(null);
  const sphere = useRef<THREE.Group>(null);
  const shell = useRef<THREE.Mesh>(null);
  const cloud = useRef<THREE.Points>(null);
  const nodes = useRef<(THREE.Group | null)[]>([]);
  const pointer = useRef({ x: 0, y: 0 });
  const elapsed = useRef(0);

  const particles = useMemo(() => createParticles(particleCount), [particleCount]);

  useEffect(() => {
    if (!animated || !window.matchMedia("(pointer: fine)").matches) return;

    const onPointerMove = (event: PointerEvent) => {
      pointer.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (event.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    return () => window.removeEventListener("pointermove", onPointerMove);
  }, [animated]);

  useFrame((_, rawDelta) => {
    if (!animated) return;
    // Limita o salto de tempo ao voltar de uma aba em segundo plano.
    const delta = Math.min(rawDelta, 0.05);
    elapsed.current += delta;

    if (rig.current) {
      rig.current.rotation.x = THREE.MathUtils.damp(
        rig.current.rotation.x,
        pointer.current.y * 0.16,
        2.5,
        delta,
      );
      rig.current.rotation.y = THREE.MathUtils.damp(
        rig.current.rotation.y,
        pointer.current.x * 0.26,
        2.5,
        delta,
      );
      rig.current.position.y = Math.sin(elapsed.current * 0.55) * 0.05;
    }
    if (sphere.current) sphere.current.rotation.y += delta * 0.12;
    if (shell.current) {
      shell.current.rotation.y -= delta * 0.05;
      shell.current.rotation.x += delta * 0.025;
    }
    if (cloud.current) cloud.current.rotation.y += delta * 0.018;
    nodes.current.forEach((node, index) => {
      if (node) node.rotation.z += delta * ORBITS[index].speed;
    });
  });

  return (
    <group ref={rig} rotation={[0.12, -0.3, 0]}>
      <group ref={sphere}>
        <mesh>
          <sphereGeometry args={[1, 96, 96]} />
          <meshPhysicalMaterial
            color="#060913"
            metalness={0.95}
            roughness={0.2}
            clearcoat={1}
            clearcoatRoughness={0.12}
            envMapIntensity={1.15}
          />
        </mesh>
        {/* Frisos finos na superfície: dão leitura à rotação da esfera. */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1.002, 0.0035, 8, 160]} />
          <meshBasicMaterial color={BLUE} transparent opacity={0.55} toneMapped={false} />
        </mesh>
        <mesh rotation={[0.5, 0, 0.9]}>
          <torusGeometry args={[1.002, 0.0025, 8, 160]} />
          <meshBasicMaterial color={VIOLET} transparent opacity={0.3} toneMapped={false} />
        </mesh>
      </group>

      <mesh scale={1.015}>
        <sphereGeometry args={[1, 64, 64]} />
        <shaderMaterial
          vertexShader={rimVertexShader}
          fragmentShader={rimFragmentShader}
          uniforms={rimUniforms}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      <mesh ref={shell}>
        <icosahedronGeometry args={[1.26, 2]} />
        <meshBasicMaterial color="#7da2ff" wireframe transparent opacity={0.06} />
      </mesh>

      {ORBITS.map((orbit, index) => (
        <group key={orbit.radius} rotation={orbit.tilt}>
          <mesh>
            <torusGeometry args={[orbit.radius, 0.005, 8, 220]} />
            <meshBasicMaterial
              color={orbit.color}
              transparent
              opacity={orbit.opacity}
              toneMapped={false}
            />
          </mesh>
          <group
            ref={(node) => {
              nodes.current[index] = node;
            }}
            rotation={[0, 0, orbit.phase]}
          >
            <mesh position={[orbit.radius, 0, 0]}>
              <sphereGeometry args={[0.04, 16, 16]} />
              <meshBasicMaterial color="#dfe9ff" toneMapped={false} />
            </mesh>
            <mesh position={[orbit.radius, 0, 0]}>
              <sphereGeometry args={[0.11, 16, 16]} />
              <meshBasicMaterial
                color={orbit.color}
                transparent
                opacity={0.28}
                depthWrite={false}
                blending={THREE.AdditiveBlending}
                toneMapped={false}
              />
            </mesh>
          </group>
        </group>
      ))}

      <points ref={cloud}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[particles, 3]} />
        </bufferGeometry>
        <pointsMaterial
          color="#a9c0ff"
          size={0.02}
          sizeAttenuation
          transparent
          opacity={0.55}
          depthWrite={false}
        />
      </points>
    </group>
  );
}

export default function CoreScene({
  reducedMotion,
  compact,
  active,
  onContextLost,
}: CoreSceneProps) {
  const frameloop = reducedMotion ? "demand" : active ? "always" : "never";

  return (
    <Canvas
      className="animate-fade"
      style={{ pointerEvents: "none" }}
      dpr={compact ? [1, 1.5] : [1, 2]}
      camera={{ position: [0, 0, 7], fov: 35 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      frameloop={frameloop}
      onCreated={({ gl }) => {
        gl.domElement.addEventListener("webglcontextlost", onContextLost, { once: true });
      }}
    >
      <StudioEnvironment />
      <Core animated={!reducedMotion} particleCount={compact ? 140 : 280} />
    </Canvas>
  );
}
