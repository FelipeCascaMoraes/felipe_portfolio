/**
 * Versão leve do núcleo, em CSS e SVG. Aparece enquanto a cena 3D carrega e
 * substitui o canvas quando o WebGL não está disponível ou falha.
 */
export function CoreFallback() {
  return (
    <div aria-hidden="true" className="absolute inset-0 grid place-items-center">
      <svg
        viewBox="0 0 400 400"
        fill="none"
        className="absolute inset-0 h-full w-full motion-safe:animate-orbit"
      >
        <ellipse cx="200" cy="200" rx="150" ry="52" stroke="#4a85ff" strokeOpacity="0.5" transform="rotate(-18 200 200)" />
        <ellipse cx="200" cy="200" rx="172" ry="74" stroke="#8b6cff" strokeOpacity="0.35" transform="rotate(34 200 200)" />
        <ellipse cx="200" cy="200" rx="190" ry="40" stroke="#4a85ff" strokeOpacity="0.22" transform="rotate(72 200 200)" />
        <circle cx="343" cy="154" r="4" fill="#dfe9ff" />
        <circle cx="58" cy="104" r="3.5" fill="#b9a8ff" />
        <circle cx="259" cy="381" r="3" fill="#dfe9ff" />
      </svg>
      <div className="relative aspect-square w-[45%] rounded-full bg-[radial-gradient(circle_at_32%_28%,#2a3a66_0%,#0b1020_42%,#04060c_78%)] shadow-[inset_-10px_-14px_40px_rgb(139_108_255/0.28),inset_8px_10px_30px_rgb(74_133_255/0.35),0_0_60px_rgb(74_133_255/0.2)]" />
    </div>
  );
}
