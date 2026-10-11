"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "motion/react";
import { Check, Loader2, MessageSquare, PanelLeft, Plus } from "lucide-react";
import { process, profile } from "@/data/site";
import { Heading, Logo } from "./ui";

const TASK_MS = 700;

export function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.4 });
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(0); // tasks finished in the current step
  const [manual, setManual] = useState(false);
  const s = process[step];

  // Tick tasks while the window is on screen
  useEffect(() => {
    if (!inView) return;
    if (done <= s.tasks.length) {
      const t = setTimeout(() => setDone((d) => d + 1), done === 0 ? 500 : TASK_MS);
      return () => clearTimeout(t);
    }
    if (!manual) {
      const t = setTimeout(() => select((step + 1) % process.length, false), 3200);
      return () => clearTimeout(t);
    }
  }, [inView, done, s.tasks.length, manual, step]);

  function select(i: number, byUser = true) {
    setStep(i);
    setDone(0);
    if (byUser) setManual(true);
  }

  const finished = done > s.tasks.length;

  return (
    <section id="process" className="mx-auto max-w-6xl scroll-mt-24 px-4 pt-28 sm:px-6 sm:pt-40">
      <Heading lead="How I work." rest="Four steps, a fixed price, and a live preview every week so nothing is a surprise." />

      <div ref={ref} className="glass mt-14 overflow-hidden rounded-2xl bg-surface/80">
        {/* Title bar */}
        <div className="flex items-center gap-3 border-b border-line px-4 py-2.5 text-xs text-muted">
          <span className="flex gap-1.5" aria-hidden="true">
            <span className="size-3 rounded-full bg-[#ff5f57]" />
            <span className="size-3 rounded-full bg-[#febc2e]" />
            <span className="size-3 rounded-full bg-[#28c840]" />
          </span>
          <PanelLeft size={14} className="ml-2" />
          <span className="mx-auto">{s.title}</span>
          <Plus size={14} />
        </div>

        <div className="grid md:grid-cols-[230px_1fr]">
          {/* Steps */}
          <nav aria-label="Process steps" className="flex gap-1 overflow-x-auto border-b border-line p-2 md:flex-col md:border-b-0 md:border-r">
            {process.map((p, i) => (
              <button
                key={p.title}
                onClick={() => select(i)}
                aria-current={i === step ? "step" : undefined}
                className={`flex shrink-0 items-center gap-2.5 rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                  i === step ? "bg-white/[0.08] text-fg" : "text-muted hover:text-fg"
                }`}
              >
                <span className="font-mono text-xs text-dim">{i + 1}</span>
                {p.title}
              </button>
            ))}
          </nav>

          {/* Conversation */}
          <div className="min-h-[340px] p-5 sm:p-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.25 }}
                className="flex flex-col gap-5"
              >
                <div className="flex items-start gap-3 self-end">
                  <p className="max-w-md rounded-2xl rounded-tr-md bg-white/[0.07] px-4 py-2.5 text-[15px]">{s.prompt}</p>
                  <span className="grid size-7 shrink-0 place-items-center rounded-full bg-white/[0.08] text-muted">
                    <MessageSquare size={13} />
                  </span>
                </div>

                <div className="flex items-start gap-3">
                  <span className="grid size-7 shrink-0 place-items-center rounded-full bg-accent/10">
                    <Logo size={16} />
                  </span>
                  <div className="flex flex-col gap-2.5 pt-1">
                    {s.tasks.map((t, i) => {
                      const state = done > i + 1 || finished ? "done" : done === i + 1 ? "run" : "wait";
                      return (
                        <div key={t} className={`flex items-center gap-2.5 text-sm transition-opacity ${state === "wait" ? "opacity-30" : ""}`}>
                          {state === "done" ? (
                            <span className="grid size-4 place-items-center rounded bg-[#4b7bec] text-white">
                              <Check size={11} strokeWidth={3} />
                            </span>
                          ) : (
                            <Loader2 size={16} className={`text-muted ${state === "run" ? "animate-spin" : ""}`} />
                          )}
                          <span className={state === "done" ? "text-fg" : "text-muted"}>{t}</span>
                        </div>
                      );
                    })}
                    <AnimatePresence>
                      {finished && (
                        <motion.p
                          initial={{ opacity: 0, y: 4 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mt-2 max-w-lg text-[15px] leading-relaxed text-fg"
                        >
                          {s.reply}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      <p className="mx-auto mt-8 max-w-xl text-center text-[17px] leading-relaxed">
        <span className="font-medium text-fg">You always talk to me.</span>{" "}
        <span className="text-muted">No account managers, no hand-offs. {profile.short} designs it, builds it and stays after launch.</span>
      </p>
    </section>
  );
}
