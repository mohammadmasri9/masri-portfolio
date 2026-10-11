"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  ArrowUpRight,
  Briefcase,
  Copy,
  CornerDownLeft,
  FileDown,
  GraduationCap,
  Layers,
  Mail,
  MessageCircle,
  Search,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import { profile, projects, services } from "@/data/site";
import { Kbd, Logo, serviceIcons } from "./ui";

type Ctx = { open: () => void };
const PaletteContext = createContext<Ctx>({ open: () => {} });
export const usePalette = () => useContext(PaletteContext);

type Item = {
  id: string;
  group: string;
  title: string;
  subtitle: string;
  icon: LucideIcon;
  tint: string;
  action: string;
  run: () => void | Promise<void>;
};

function go(hash: string) {
  document.querySelector(hash)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function PaletteProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setOpen] = useState(false);
  const open = useCallback(() => setOpen(true), []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const value = useMemo(() => ({ open }), [open]);

  return (
    <PaletteContext.Provider value={value}>
      {children}
      <AnimatePresence>{isOpen && <CommandPalette onClose={() => setOpen(false)} />}</AnimatePresence>
    </PaletteContext.Provider>
  );
}

function CommandPalette({ onClose }: { onClose: () => void }) {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const [toast, setToast] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const items = useMemo<Item[]>(() => {
    const close = (fn: () => void) => () => {
      onClose();
      setTimeout(fn, 60);
    };
    return [
      { id: "nav-work", group: "Go to", title: "Selected work", subtitle: "Projects", icon: Briefcase, tint: "#4FD1FF", action: "Jump", run: close(() => go("#work")) },
      { id: "nav-services", group: "Go to", title: "Services", subtitle: "What I do", icon: Layers, tint: "#56C2FF", action: "Jump", run: close(() => go("#services")) },
      { id: "nav-process", group: "Go to", title: "How I work", subtitle: "Process", icon: Workflow, tint: "#59D499", action: "Jump", run: close(() => go("#process")) },
      { id: "nav-experience", group: "Go to", title: "Experience", subtitle: "Ooredoo, Sweden, Al-Quds", icon: GraduationCap, tint: "#B57BFF", action: "Jump", run: close(() => go("#experience")) },
      ...projects.map<Item>((p) => ({
        id: `p-${p.slug}`,
        group: "Projects",
        title: p.name,
        subtitle: `${p.client}, ${p.year}`,
        icon: serviceIcons[p.services[0]],
        tint: p.color,
        action: "View",
        run: close(() => go(`#project-${p.slug}`)),
      })),
      ...services.map<Item>((s) => ({
        id: `s-${s.id}`,
        group: "Services",
        title: s.title,
        subtitle: s.lead,
        icon: serviceIcons[s.id],
        tint: s.color,
        action: "Details",
        run: close(() => {
          window.dispatchEvent(new CustomEvent("select-service", { detail: s.id }));
          go("#services");
        }),
      })),
      {
        id: "a-copy",
        group: "Contact",
        title: "Copy email address",
        subtitle: profile.email,
        icon: Copy,
        tint: "#FF6B8B",
        action: "Copy",
        run: async () => {
          await navigator.clipboard?.writeText(profile.email);
          setToast("Email copied");
          setTimeout(onClose, 700);
        },
      },
      { id: "a-mail", group: "Contact", title: "Start a project", subtitle: "Send an email", icon: Mail, tint: "#4FD1FF", action: "Open", run: close(() => (window.location.href = `mailto:${profile.email}`)) },
      { id: "a-wa", group: "Contact", title: "Message on WhatsApp", subtitle: "Usually replies within a day", icon: MessageCircle, tint: "#59D499", action: "Open", run: close(() => window.open(profile.whatsapp, "_blank")) },
      { id: "a-cv", group: "Contact", title: "Download CV", subtitle: "PDF", icon: FileDown, tint: "#B48CFF", action: "Download", run: close(() => window.open(profile.cv, "_blank")) },
      ...profile.socials.map<Item>((s) => ({
        id: `soc-${s.label}`,
        group: "Contact",
        title: `Open ${s.label}`,
        subtitle: s.href.replace(/^https?:\/\/(www\.)?/, ""),
        icon: ArrowUpRight,
        tint: "#8A8F98",
        action: "Open",
        run: close(() => window.open(s.href, "_blank")),
      })),
    ];
  }, [onClose]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter((i) => `${i.title} ${i.subtitle} ${i.group}`.toLowerCase().includes(q));
  }, [items, query]);

  useEffect(() => setActive(0), [query]);
  useEffect(() => inputRef.current?.focus(), []);

  useEffect(() => {
    listRef.current?.querySelector(`[data-index="${active}"]`)?.scrollIntoView({ block: "nearest" });
  }, [active]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      filtered[active]?.run();
    } else if (e.key === "Escape") {
      onClose();
    }
  };

  let lastGroup = "";
  const current = filtered[active];

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-start justify-center px-4 pt-[14vh]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15 }}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label="Command palette"
        className="glass relative w-full max-w-[640px] overflow-hidden rounded-2xl bg-surface/80"
        initial={{ opacity: 0, scale: 0.96, y: -8 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.98, y: -4 }}
        transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
        onKeyDown={onKeyDown}
      >
        <div className="flex items-center gap-3 border-b border-line px-4">
          <Search size={18} className="text-muted" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search projects, services, or contact…"
            className="h-14 flex-1 bg-transparent text-[15px] text-fg outline-none placeholder:text-dim"
            role="combobox"
            aria-expanded="true"
            aria-controls="palette-list"
            aria-activedescendant={current ? `pi-${current.id}` : undefined}
          />
          <Kbd>Esc</Kbd>
        </div>

        <div ref={listRef} id="palette-list" role="listbox" className="no-scrollbar max-h-[min(420px,55vh)] overflow-y-auto p-2">
          {filtered.length === 0 && (
            <p className="px-3 py-10 text-center text-sm text-muted">
              Nothing matches “{query}”. Try a project name, a service, or “email”.
            </p>
          )}
          {filtered.map((item, i) => {
            const header = item.group !== lastGroup ? item.group : null;
            lastGroup = item.group;
            const Icon = item.icon;
            const selected = i === active;
            return (
              <div key={item.id}>
                {header && <div className="px-3 pb-1.5 pt-3 text-xs font-medium text-dim">{header}</div>}
                <button
                  id={`pi-${item.id}`}
                  data-index={i}
                  role="option"
                  aria-selected={selected}
                  onMouseMove={() => setActive(i)}
                  onClick={() => item.run()}
                  className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors ${
                    selected ? "bg-white/[0.08]" : ""
                  }`}
                >
                  <span
                    className="grid size-7 place-items-center rounded-md"
                    style={{ background: `${item.tint}22`, color: item.tint }}
                  >
                    <Icon size={15} />
                  </span>
                  <span className="text-[14px] text-fg">{item.title}</span>
                  <span className="truncate text-[13px] text-dim">{item.subtitle}</span>
                  <span className={`ml-auto text-xs text-muted ${selected ? "opacity-100" : "opacity-0"}`}>{item.group}</span>
                </button>
              </div>
            );
          })}
        </div>

        <div className="flex items-center justify-between border-t border-line bg-black/20 px-4 py-2.5 text-xs text-muted">
          <span className="flex items-center gap-2">
            <Logo size={16} />
            {toast ?? profile.short}
          </span>
          <span className="flex items-center gap-2">
            {current?.action ?? "Open"}
            <Kbd>
              <CornerDownLeft size={11} />
            </Kbd>
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
}
