"use client";

import { useEffect, useState } from "react";
import { stack } from "@/data/site";
import { Heading } from "./ui";

export function Stack() {
  const [down, setDown] = useState<Set<string>>(new Set());

  // Typing a letter presses every key that starts with it
  useEffect(() => {
    const typing = (e: KeyboardEvent) => {
      const el = e.target as HTMLElement;
      return el.isContentEditable || ["INPUT", "TEXTAREA"].includes(el.tagName) || e.metaKey || e.ctrlKey || e.altKey;
    };
    const match = (k: string) => stack.flat().filter((n) => n[0].toLowerCase() === k.toLowerCase());
    const onDown = (e: KeyboardEvent) => {
      if (typing(e) || e.key.length !== 1) return;
      const hits = match(e.key);
      if (hits.length) setDown((d) => new Set([...d, ...hits]));
    };
    const onUp = (e: KeyboardEvent) => {
      if (e.key.length !== 1) return;
      const hits = match(e.key);
      setDown((d) => {
        const n = new Set(d);
        hits.forEach((h) => n.delete(h));
        return n;
      });
    };
    window.addEventListener("keydown", onDown);
    window.addEventListener("keyup", onUp);
    return () => {
      window.removeEventListener("keydown", onDown);
      window.removeEventListener("keyup", onUp);
    };
  }, []);

  return (
    <section id="stack" className="mx-auto max-w-6xl scroll-mt-24 px-4 pt-28 sm:px-6 sm:pt-40">
      <Heading lead="The tools I reach for." rest="Proven, well-supported tech, so your product is easy to hire for and grow." />

      <div className="relative mx-auto mt-14 max-w-4xl">
        <div
          aria-hidden="true"
          className="absolute inset-x-10 -bottom-10 h-40 rounded-full bg-accent/20 blur-[80px]"
        />
        <div className="relative rounded-[22px] border border-line bg-gradient-to-b from-[#1c1d22] to-[#0f1013] p-3 shadow-[inset_0_1px_0_rgb(255_255_255/0.08),0_40px_80px_-30px_rgb(0_0_0)] sm:p-5">
          <div className="flex flex-col gap-2 sm:gap-3">
            {stack.map((row, r) => (
              <div key={r} className="flex gap-2 sm:gap-3" style={{ paddingLeft: `${r * 4}%` }}>
                {row.map((name) => (
                  <button
                    key={name}
                    data-down={down.has(name)}
                    onPointerDown={() => setDown((d) => new Set(d).add(name))}
                    onPointerUp={() => setDown(new Set())}
                    onPointerLeave={() => setDown((d) => (d.has(name) ? new Set() : d))}
                    className="keycap flex h-14 flex-1 items-end rounded-xl px-3 pb-2 text-left text-[12px] font-medium text-fg/85 sm:h-20 sm:text-sm"
                  >
                    {name}
                  </button>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
      <p className="mt-8 hidden text-center text-sm text-dim sm:block">Try typing a letter.</p>
    </section>
  );
}
