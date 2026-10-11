import { Bot, ChartLine, Globe, Smartphone, Terminal, type LucideIcon } from "lucide-react";
import type { ServiceId } from "@/data/site";

export const serviceIcons: Record<ServiceId, LucideIcon> = {
  web: Globe,
  mobile: Smartphone,
  ai: Bot,
  automation: Terminal,
  data: ChartLine,
};

export function Logo({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true">
      <defs>
        <linearGradient id="logo-g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#a5ecff" />
          <stop offset="1" stopColor="#1e6bff" />
        </linearGradient>
      </defs>
      <rect x="6" y="6" width="20" height="20" rx="4" transform="rotate(45 16 16)" fill="url(#logo-g)" />
      <path d="M9 16 16 9M12.5 19.5l7-7M16 23l7-7" stroke="#07080a" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export function Kbd({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <kbd
      className={`inline-flex h-6 min-w-6 items-center justify-center rounded-md border border-line-strong bg-white/[0.06] px-1.5 font-mono text-[11px] text-muted shadow-[inset_0_-1px_0_rgb(0_0_0/0.5)] ${className}`}
    >
      {children}
    </kbd>
  );
}

/** Section heading in Raycast's "Bold line. Muted continuation." style */
export function Heading({ lead, rest, center = true }: { lead: string; rest: string; center?: boolean }) {
  return (
    <h2
      className={`max-w-2xl text-balance text-[clamp(1.6rem,3.2vw,2.4rem)] font-semibold leading-[1.15] tracking-[-0.025em] ${
        center ? "mx-auto text-center" : ""
      }`}
    >
      <span className="text-fg">{lead}</span> <span className="text-muted">{rest}</span>
    </h2>
  );
}
