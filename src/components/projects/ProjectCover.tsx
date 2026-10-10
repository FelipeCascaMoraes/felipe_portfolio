import Image from "next/image";
import type { ReactNode } from "react";
import type { Project, ProjectMotif } from "@/data/projects";

const stroke = {
  fill: "none",
  strokeWidth: 1.5,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

/** Composições abstratas por tema, usadas enquanto não há captura real. */
const motifs: Record<ProjectMotif, ReactNode> = {
  finance: (
    <>
      <path d="M40 150 C90 150 100 96 150 104 S 220 60 280 44" stroke="#4a85ff" {...stroke} />
      <path d="M40 166 C100 166 120 132 170 136 S 240 104 280 96" stroke="#8b6cff" strokeOpacity="0.6" {...stroke} />
      <circle cx="150" cy="104" r="4" fill="#dfe9ff" />
      <circle cx="280" cy="44" r="4" fill="#dfe9ff" />
    </>
  ),
  education: (
    <>
      <path d="M160 60 L96 100 M160 60 L224 100 M96 100 L64 148 M96 100 L128 148 M224 100 L192 148 M224 100 L256 148" stroke="#4a85ff" strokeOpacity="0.7" {...stroke} />
      <circle cx="160" cy="60" r="9" fill="#0a0e17" stroke="#dfe9ff" strokeWidth="1.5" />
      <circle cx="96" cy="100" r="6" fill="#4a85ff" />
      <circle cx="224" cy="100" r="6" fill="#8b6cff" />
      {[64, 128, 192, 256].map((x) => (
        <circle key={x} cx={x} cy="148" r="4" fill="#0a0e17" stroke="#8fb2ff" strokeWidth="1.5" />
      ))}
    </>
  ),
  geopolitics: (
    <>
      <circle cx="160" cy="104" r="62" stroke="#4a85ff" strokeOpacity="0.7" {...stroke} />
      <ellipse cx="160" cy="104" rx="26" ry="62" stroke="#4a85ff" strokeOpacity="0.4" {...stroke} />
      <path d="M98 104 H222 M108 72 H212 M108 136 H212" stroke="#4a85ff" strokeOpacity="0.4" {...stroke} />
      <path d="M132 84 Q172 52 196 122" stroke="#8b6cff" {...stroke} />
      <circle cx="132" cy="84" r="4" fill="#dfe9ff" />
      <circle cx="196" cy="122" r="4" fill="#dfe9ff" />
    </>
  ),
  broker: (
    <>
      {[
        [64, 96, 132, 108, 30],
        [104, 76, 124, 86, 28],
        [144, 88, 140, 98, 22],
        [184, 58, 112, 66, 34],
        [224, 66, 104, 72, 18],
        [264, 40, 88, 46, 30],
      ].map(([x, top, bottom, bodyTop, bodyHeight], index) => (
        <g key={x} stroke={index % 3 === 2 ? "#8b6cff" : "#4a85ff"}>
          <path d={`M${x} ${top} V${bottom}`} {...stroke} />
          <rect
            x={x - 7}
            y={bodyTop}
            width="14"
            height={bodyHeight}
            rx="2"
            fill={index % 3 === 2 ? "#8b6cff" : "#4a85ff"}
            fillOpacity="0.25"
            strokeWidth="1.5"
          />
        </g>
      ))}
    </>
  ),
};

interface ProjectCoverProps {
  project: Project;
}

export function ProjectCover({ project }: ProjectCoverProps) {
  return (
    <div className="relative aspect-[16/10] overflow-hidden border-b border-line bg-surface-2">
      {project.image ? (
        <Image
          src={project.image}
          alt={`Tela do projeto ${project.name}`}
          fill
          sizes="(min-width: 768px) 540px, 100vw"
          className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
        />
      ) : (
        <>
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[linear-gradient(rgb(255_255_255/0.04)_1px,transparent_1px),linear-gradient(90deg,rgb(255_255_255/0.04)_1px,transparent_1px)] bg-size-[32px_32px]"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_55%,rgb(74_133_255/0.16),transparent_62%)]"
          />
          <svg
            viewBox="0 0 320 200"
            aria-hidden="true"
            className="absolute inset-0 h-full w-full transition-transform duration-500 group-hover:scale-[1.04]"
          >
            {motifs[project.motif]}
          </svg>
        </>
      )}
    </div>
  );
}
