"use client";

import { useEffect } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react";
import { profile } from "@/data/site";
import { Horizon } from "./horizon";
import { usePalette } from "./palette";
import { Kbd } from "./ui";
import { useModKey } from "./use-mod-key";

export function Hero() {
  const { open } = usePalette();
  const mod = useModKey();
  const reduce = useReducedMotion();

  // The bright spot on the rim follows the pointer horizontally
  const px = useMotionValue(0.5);
  const sx = useSpring(px, { stiffness: 60, damping: 20 });
  const left = useTransform(sx, (v) => `${38 + v * 24}%`);

  useEffect(() => {
    if (reduce) return;
    const onMove = (e: PointerEvent) => px.set(e.clientX / window.innerWidth);
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, [px, reduce]);

  return (
    <section id="top" className="relative isolate flex min-h-[100svh] flex-col items-center justify-center overflow-hidden pb-[22vh] pt-32">
      <div aria-hidden="true" className="dot-grid absolute inset-0 -z-20" />

      <motion.div
        className="absolute inset-x-0 bottom-0 -z-10 h-[min(40vh,420px)]"
        initial={reduce ? false : { y: "40%", opacity: 0 }}
        animate={{ y: "0%", opacity: 1 }}
        transition={{ duration: 1.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
      >
        <Horizon className="top-0 w-[max(150vw,1400px)]">
          <motion.div
            className="absolute -top-[3px] h-[6px] w-[14%] -translate-x-1/2 rounded-full bg-white blur-[3px]"
            style={{ left }}
          />
          <motion.div
            className="absolute -top-16 h-32 w-[30%] -translate-x-1/2 rounded-full bg-accent/50 blur-[50px]"
            style={{ left }}
          />
        </Horizon>
      </motion.div>

      <motion.div
        className="px-6 text-center"
        initial={reduce ? false : { opacity: 0, y: 16, filter: "blur(8px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 1, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className="mb-5 text-sm text-muted">
          {profile.name}, {profile.role.toLowerCase()}
        </p>
        <h1 className="mx-auto max-w-[14ch] text-balance text-[clamp(2.75rem,8vw,6rem)] font-semibold leading-[0.98] tracking-[-0.045em] text-white">
          {profile.headline}
        </h1>
        <p className="mx-auto mt-6 max-w-[46ch] text-pretty text-[clamp(1rem,1.4vw,1.15rem)] leading-relaxed text-fg/75">
          {profile.intro}
        </p>

        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href={`mailto:${profile.email}`}
            className="flex h-11 items-center rounded-full bg-fg px-6 text-[15px] font-medium text-ink shadow-[0_0_0_1px_rgb(255_255_255/0.2),0_8px_30px_-6px_rgb(255_255_255/0.35)] transition-colors hover:bg-white"
          >
            Start a project
          </a>
          <button
            onClick={open}
            className="flex h-11 items-center gap-3 rounded-full border border-line-strong bg-ink/80 backdrop-blur-md pl-5 pr-2 text-[15px] text-fg transition-colors hover:border-accent/50 hover:bg-accent/[0.06]"
          >
            Explore everything
            <span className="flex gap-1">
              <Kbd>{mod}</Kbd>
              <Kbd>K</Kbd>
            </span>
          </button>
        </div>

        <p className="mt-7 font-mono text-xs leading-6 text-dim">
          {profile.availability}
          <br />
          {profile.location}
        </p>
      </motion.div>
    </section>
  );
}
