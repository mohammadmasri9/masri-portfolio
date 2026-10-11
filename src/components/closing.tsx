"use client";

import { profile } from "@/data/site";
import { Horizon } from "./horizon";
import { usePalette } from "./palette";
import { Kbd, Logo } from "./ui";
import { useModKey } from "./use-mod-key";

export function Contact() {
  const { open } = usePalette();
  const mod = useModKey();
  return (
    <section id="contact" className="relative isolate mt-28 overflow-hidden px-4 pb-24 pt-32 sm:mt-40 sm:px-6 sm:pt-44">
      <div aria-hidden="true" className="absolute inset-0 -z-10 overflow-hidden">
        <div className="dot-grid absolute inset-0" />
        <Horizon className="top-[78%] w-[max(130vw,1200px)]" />
      </div>

      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-balance text-[clamp(2.4rem,6vw,4.5rem)] font-semibold leading-[1] tracking-[-0.04em] text-white">
          Have an idea? Let&apos;s build it.
        </h2>
        <p className="mx-auto mt-6 max-w-md text-[17px] leading-relaxed text-fg/80">
          Tell me what you&apos;re making. I&apos;ll reply within a day with questions, a rough timeline and a price.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href={`mailto:${profile.email}`}
            className="flex h-12 items-center rounded-xl bg-fg px-6 text-[15px] font-medium text-ink shadow-[0_8px_30px_-6px_rgb(255_255_255/0.35)] transition-colors hover:bg-white"
          >
            Email {profile.email}
          </a>
          <a
            href={profile.whatsapp}
            target="_blank"
            rel="noreferrer"
            className="flex h-12 items-center rounded-xl border border-line-strong bg-ink/50 px-5 text-[15px] text-fg backdrop-blur transition-colors hover:border-white/30"
          >
            Message on WhatsApp
          </a>
        </div>
        <button onClick={open} className="mt-6 inline-flex items-center gap-2 text-sm text-muted hover:text-fg">
          Or jump anywhere with <Kbd>{mod}</Kbd>
          <Kbd>K</Kbd>
        </button>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-4 py-10 text-sm text-muted sm:flex-row sm:items-center sm:px-6">
        <span className="flex items-center gap-2.5 text-fg">
          <Logo size={18} />
          {profile.name}
        </span>
        <ul className="flex gap-5">
          {profile.socials.map((s) => (
            <li key={s.label}>
              <a href={s.href} target="_blank" rel="noreferrer" className="hover:text-fg">
                {s.label}
              </a>
            </li>
          ))}
        </ul>
        <span className="text-dim">© {new Date().getFullYear()}</span>
      </div>
    </footer>
  );
}
