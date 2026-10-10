import type { ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost";
type Size = "md" | "lg";

interface ButtonLinkProps {
  href: string;
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
}

const base =
  "group inline-flex items-center justify-center gap-2 rounded-full font-medium whitespace-nowrap transition-[background-color,border-color,color,transform] duration-200 active:translate-y-px";

const variants: Record<Variant, string> = {
  primary:
    "bg-accent-strong text-white shadow-[inset_0_1px_0_rgb(255_255_255/0.18)] hover:bg-accent",
  secondary:
    "border border-line-strong bg-white/[0.03] text-fg hover:border-white/30 hover:bg-white/[0.07]",
  ghost: "text-muted hover:text-fg",
};

const sizes: Record<Size, string> = {
  md: "h-10 px-4 text-sm",
  lg: "h-12 px-6 text-[0.95rem]",
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
  size = "lg",
  className = "",
}: ButtonLinkProps) {
  const external = /^https?:\/\//.test(href);

  return (
    <a
      href={href}
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {children}
    </a>
  );
}
