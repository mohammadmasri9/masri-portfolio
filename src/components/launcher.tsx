"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowLeft, Check, ChevronDown, CornerDownLeft, FolderOpen } from "lucide-react";
import { profile, projects, services, type ServiceId } from "@/data/site";
import { Heading, Kbd, serviceIcons } from "./ui";

export function Launcher() {
  const [id, setId] = useState<ServiceId>("web");
  const [query, setQuery] = useState("");
  const [row, setRow] = useState(0);
  const [hover, setHover] = useState<ServiceId | null>(null);

  const service = services.find((s) => s.id === id)!;
  const Icon = serviceIcons[id];
  const related = projects.filter((p) => p.services.includes(id));

  useEffect(() => {
    const onSelect = (e: Event) => setId((e as CustomEvent<ServiceId>).detail);
    window.addEventListener("select-service", onSelect);
    return () => window.removeEventListener("select-service", onSelect);
  }, []);

  useEffect(() => {
    setQuery("");
    setRow(0);
  }, [id]);

  const rows = useMemo(() => {
    const q = query.toLowerCase();
    const d = service.deliverables.filter((x) => x.toLowerCase().includes(q)).map((x) => ({ kind: "d" as const, label: x }));
    const p = related.filter((x) => x.name.toLowerCase().includes(q)).map((x) => ({ kind: "p" as const, label: x.name, project: x }));
    return { d, p };
  }, [query, service, related]);

  return (
    <section id="services" className="relative mx-auto max-w-6xl scroll-mt-24 px-4 pt-24 sm:px-6 sm:pt-32">
      <Heading lead="One person, the whole product." rest="Pick a service to see what's included." />

      {/* Bezel */}
      <div className="relative mt-14 overflow-hidden rounded-[28px] border border-line bg-surface p-3 sm:p-6 md:p-10">
        {/* Glow behind the window, tinted by the selected service */}
        <motion.div
          aria-hidden="true"
          className="absolute inset-0"
          animate={{
            background: `radial-gradient(60% 70% at 70% 60%, ${service.color}38, transparent 70%), radial-gradient(40% 50% at 20% 100%, ${service.color}22, transparent 70%)`,
          }}
          transition={{ duration: 0.6 }}
        />
        <div aria-hidden="true" className="dot-grid absolute inset-0" />

        {/* Window */}
        <div className="glass relative mx-auto max-w-[860px] overflow-hidden rounded-2xl bg-ink/70">
          <div className="flex items-center gap-3 border-b border-line px-3 py-2.5 sm:px-4">
            <span className="grid size-7 place-items-center rounded-md bg-white/[0.08] text-muted">
              <ArrowLeft size={14} />
            </span>
            <input
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setRow(0);
              }}
              placeholder={`Filter ${service.title.toLowerCase()}…`}
              aria-label="Filter the list"
              className="h-9 min-w-0 flex-1 bg-transparent text-[15px] outline-none placeholder:text-dim"
            />
            <span className="hidden items-center gap-1.5 rounded-lg border border-line bg-white/[0.04] px-2.5 py-1.5 text-xs text-muted sm:flex">
              {service.title}
              <ChevronDown size={13} />
            </span>
          </div>

          <div className="grid md:grid-cols-[1fr_1.1fr]">
            {/* List */}
            <div className="min-h-[300px] border-line p-2 md:border-r">
              <p className="px-2.5 pb-1.5 pt-2 text-xs font-medium text-dim">What you get</p>
              {rows.d.map((r, i) => (
                <button
                  key={r.label}
                  onMouseEnter={() => setRow(i)}
                  onFocus={() => setRow(i)}
                  className={`flex w-full items-center gap-3 rounded-lg px-2.5 py-2 text-left text-sm ${row === i ? "bg-white/[0.08]" : ""}`}
                >
                  <span className="grid size-5 place-items-center rounded-full" style={{ background: `${service.color}26`, color: service.color }}>
                    <Check size={11} strokeWidth={3} />
                  </span>
                  {r.label}
                </button>
              ))}
              {rows.p.length > 0 && <p className="px-2.5 pb-1.5 pt-4 text-xs font-medium text-dim">Related work</p>}
              {rows.p.map((r, j) => {
                const i = rows.d.length + j;
                return (
                  <a
                    key={r.label}
                    href={`#project-${r.project.slug}`}
                    onMouseEnter={() => setRow(i)}
                    onFocus={() => setRow(i)}
                    className={`flex w-full items-center gap-3 rounded-lg px-2.5 py-2 text-sm ${row === i ? "bg-white/[0.08]" : ""}`}
                  >
                    <FolderOpen size={15} style={{ color: r.project.color }} />
                    {r.label}
                    <span className="ml-auto text-xs text-dim">{r.project.year}</span>
                  </a>
                );
              })}
              {rows.d.length + rows.p.length === 0 && (
                <p className="px-2.5 py-8 text-sm text-muted">No matches. Clear the filter to see everything.</p>
              )}
            </div>

            {/* Preview */}
            <div className="flex flex-col">
              <div className="flex flex-1 flex-col items-center justify-center gap-4 border-t border-line px-6 py-10 md:border-t-0">
                <AnimatePresence mode="popLayout">
                  <motion.div
                    key={id}
                    initial={{ scale: 0.6, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 22 }}
                    className="grid size-24 place-items-center rounded-full"
                    style={{
                      background: `radial-gradient(circle at 35% 30%, ${service.color}, ${service.color}aa 60%, ${service.color}55)`,
                      boxShadow: `0 0 0 6px ${service.color}22, 0 20px 60px -10px ${service.color}`,
                    }}
                  >
                    <Icon size={36} className="text-ink" strokeWidth={2.2} />
                  </motion.div>
                </AnimatePresence>
                <p className="font-mono text-sm text-fg/90">{service.title}</p>
              </div>
              <dl className="border-t border-line px-5 py-4 text-sm">
                <p className="pb-2 text-xs font-medium text-dim">Information</p>
                {[
                  ["Timeline", service.timeline],
                  ["Projects", String(related.length)],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between border-b border-line py-2 last:border-0">
                    <dt className="text-muted">{k}</dt>
                    <dd className="text-fg">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>

          <div className="flex items-center justify-between border-t border-line bg-black/25 px-4 py-2.5 text-xs text-muted">
            <span className="flex items-center gap-2">
              <Icon size={14} style={{ color: service.color }} />
              {service.title}
            </span>
            <a
              href={`mailto:${profile.email}?subject=${encodeURIComponent(`Project: ${service.title}`)}`}
              className="flex items-center gap-2 text-fg hover:text-white"
            >
              Ask about this
              <Kbd>
                <CornerDownLeft size={11} />
              </Kbd>
            </a>
          </div>
        </div>

        {/* Dock */}
        <div className="relative mt-8 flex justify-center">
          <div className="glass flex gap-2 rounded-2xl bg-ink/50 p-2" role="tablist" aria-label="Services">
            {services.map((s) => {
              const I = serviceIcons[s.id];
              const selected = s.id === id;
              return (
                <div key={s.id} className="relative">
                  <AnimatePresence>
                    {(hover === s.id || (hover === null && selected)) && (
                      <motion.span
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 4 }}
                        transition={{ duration: 0.15 }}
                        className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-lg border border-line bg-raised px-2.5 py-1 text-xs text-fg"
                      >
                        {s.title}
                      </motion.span>
                    )}
                  </AnimatePresence>
                  <button
                    role="tab"
                    aria-selected={selected}
                    aria-label={s.title}
                    onClick={() => setId(s.id)}
                    onMouseEnter={() => setHover(s.id)}
                    onMouseLeave={() => setHover(null)}
                    data-down={selected}
                    className={`keycap grid size-12 place-items-center rounded-xl sm:size-14 ${selected ? "text-fg" : "text-muted"}`}
                    style={selected ? { color: s.color } : undefined}
                  >
                    <I size={20} />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.p
          key={id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="mx-auto mt-8 max-w-xl text-center text-[17px] leading-relaxed"
        >
          <span className="font-medium text-fg">{service.lead}</span> <span className="text-muted">{service.rest}</span>
        </motion.p>
      </AnimatePresence>
    </section>
  );
}
