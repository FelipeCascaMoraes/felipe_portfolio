"use client";

import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState, type MouseEvent } from "react";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { navigation, site } from "@/data/site";

const MOBILE_MENU_ID = "menu-mobile";

/** Destaca no menu a seção que está cruzando o meio da tela. */
function useActiveSection(): string {
  const [active, setActive] = useState<string>(navigation[0].href);

  useEffect(() => {
    const sections = navigation
      .map((item) => document.getElementById(item.href.slice(1)))
      .filter((section): section is HTMLElement => section !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return active;
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const active = useActiveSection();
  const pendingTarget = useRef<string | null>(null);

  // A rolagem só começa depois que o menu termina de fechar; iniciada antes,
  // ela é cancelada pela animação de saída.
  const navigateFromMenu = (event: MouseEvent, href: string) => {
    if (!open) return;
    event.preventDefault();
    pendingTarget.current = href;
    setOpen(false);
  };

  const scrollToPendingTarget = () => {
    const href = pendingTarget.current;
    pendingTarget.current = null;
    if (!href) return;
    document.getElementById(href.slice(1))?.scrollIntoView();
    window.history.pushState(null, "", href);
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    const desktop = window.matchMedia("(min-width: 1024px)");
    const onBreakpoint = () => setOpen(false);

    window.addEventListener("keydown", onKeyDown);
    desktop.addEventListener("change", onBreakpoint);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      desktop.removeEventListener("change", onBreakpoint);
    };
  }, [open]);

  const solid = scrolled || open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 ${
        solid ? "border-line bg-bg/75 backdrop-blur-xl" : "border-transparent"
      }`}
    >
      <Container className="flex h-16 items-center justify-between gap-6">
        <a
          href="#inicio"
          className="flex items-center gap-3"
          onClick={(event) => navigateFromMenu(event, "#inicio")}
        >
          <Logo className="size-8" />
          <span className="flex flex-col leading-none">
            <span className="text-sm font-semibold tracking-tight">{site.name}</span>
            <span className="mt-1 font-mono text-[0.68rem] tracking-[0.16em] text-dim uppercase">
              {site.role}
            </span>
          </span>
        </a>

        <nav aria-label="Navegação principal" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {navigation.map((item) => {
              const current = active === item.href;
              return (
                <li key={item.href}>
                  <a
                    href={item.href}
                    aria-current={current ? "location" : undefined}
                    className={`rounded-full px-3.5 py-2 text-sm transition-colors ${
                      current ? "text-fg" : "text-muted hover:text-fg"
                    }`}
                  >
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <ButtonLink href="#contato" size="md" className="hidden sm:inline-flex">
            Falar comigo
          </ButtonLink>
          <button
            type="button"
            aria-expanded={open}
            aria-controls={MOBILE_MENU_ID}
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            onClick={() => setOpen((value) => !value)}
            className="grid size-11 place-items-center rounded-full border border-line-strong text-fg transition-colors hover:bg-white/[0.06] lg:hidden"
          >
            {open ? <X aria-hidden="true" className="size-5" /> : <Menu aria-hidden="true" className="size-5" />}
          </button>
        </div>
      </Container>

      <AnimatePresence onExitComplete={scrollToPendingTarget}>
        {open ? (
          <motion.nav
            id={MOBILE_MENU_ID}
            aria-label="Navegação principal"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-line lg:hidden"
          >
            <Container className="pt-3 pb-6">
              <ul>
                {navigation.map((item) => (
                  <li key={item.href} className="border-b border-line">
                    <a
                      href={item.href}
                      onClick={(event) => navigateFromMenu(event, item.href)}
                      aria-current={active === item.href ? "location" : undefined}
                      className={`flex h-13 items-center text-base ${
                        active === item.href ? "text-fg" : "text-muted"
                      }`}
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
              <div
                onClick={(event) => navigateFromMenu(event, "#contato")}
                className="mt-5 sm:hidden"
              >
                <ButtonLink href="#contato" className="w-full">
                  Falar comigo
                </ButtonLink>
              </div>
            </Container>
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
