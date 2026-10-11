"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Search } from "lucide-react";
import { profile } from "@/data/site";
import { usePalette } from "./palette";
import { Logo } from "./ui";
import { useModKey } from "./use-mod-key";

const links = [
  { id: "services", label: "Services" },
  { id: "work", label: "Work" },
  { id: "process", label: "Process" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
];

const pill = "glass flex h-12 items-center rounded-full bg-ink/50";

/** Which section is under the middle of the screen */
function useActiveSection() {
  const [active, setActive] = useState<string | null>(null);
  useEffect(() => {
    const els = links.map((l) => document.getElementById(l.id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setActive(e.target.id));
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    els.forEach((el) => io.observe(el));
    const onScroll = () => window.scrollY < window.innerHeight * 0.5 && setActive(null);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);
  return active;
}

export function Nav() {
  const { open } = usePalette();
  const mod = useModKey();
  const active = useActiveSection();
  const [hover, setHover] = useState<string | null>(null);
  const lit = hover ?? active;

  return (
    <header className="fixed inset-x-0 top-3 z-50 px-3 sm:top-5 sm:px-6">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3">
        <a href="#top" className={`${pill} gap-2.5 pl-2 pr-4 text-[15px] font-semibold tracking-tight`}>
          <span className="grid size-8 place-items-center rounded-full bg-white/[0.06]">
            <Logo size={18} />
          </span>
          {profile.short}
        </a>

        <nav aria-label="Main" className={`${pill} hidden px-1.5 md:flex`} onMouseLeave={() => setHover(null)}>
          <ul className="flex items-center">
            {links.map((l) => (
              <li key={l.id} className="relative">
                {lit === l.id && (
                  <motion.span
                    layoutId="nav-lit"
                    className="absolute inset-0 rounded-full bg-white/[0.08]"
                    transition={{ type: "spring", stiffness: 420, damping: 34 }}
                  />
                )}
                <a
                  href={`#${l.id}`}
                  onMouseEnter={() => setHover(l.id)}
                  aria-current={active === l.id ? "location" : undefined}
                  className={`relative flex items-center gap-2 rounded-full px-4 py-2 text-sm transition-colors ${
                    lit === l.id ? "text-fg" : "text-muted hover:text-fg"
                  }`}
                >
                  {active === l.id && <span className="size-1.5 rounded-full bg-accent" />}
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className={`${pill} gap-1 pl-1.5 pr-1.5`}>
          <button
            onClick={open}
            className="flex h-9 items-center gap-2 rounded-full px-3 text-sm text-muted transition-colors hover:bg-white/[0.06] hover:text-fg"
            aria-label="Open command palette"
          >
            <Search size={15} />
            <span className="hidden font-mono text-xs sm:inline">{mod} K</span>
          </button>
          <a
            href={`mailto:${profile.email}`}
            className="flex h-9 items-center rounded-full bg-fg px-4 text-sm font-medium text-ink transition-colors hover:bg-white"
          >
            Start a project
          </a>
        </div>
      </div>
    </header>
  );
}
