import { cacheLife } from "next/cache";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { navigation, site } from "@/data/site";

/** O ano é revalidado diariamente, sem tornar a página dinâmica. */
async function CurrentYear() {
  "use cache";
  cacheLife("days");
  return new Date().getFullYear();
}

export function Footer() {
  return (
    <footer className="border-t border-line">
      <Container className="flex flex-col gap-8 py-10 md:flex-row md:items-center md:justify-between">
        <a href="#inicio" className="flex items-center gap-3 self-start">
          <Logo className="size-8" />
          <span className="flex flex-col leading-none">
            <span className="text-sm font-semibold tracking-tight">{site.name}</span>
            <span className="mt-1 font-mono text-[0.68rem] tracking-[0.16em] text-dim uppercase">
              {site.role}
            </span>
          </span>
        </a>

        <nav aria-label="Navegação do rodapé">
          <ul className="flex flex-wrap gap-x-6 gap-y-3">
            {navigation.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="text-sm text-muted transition-colors hover:text-fg">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <p className="text-sm text-dim">
          © <CurrentYear /> {site.name}
        </p>
      </Container>
    </footer>
  );
}
