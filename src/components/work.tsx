import { Activity, ArrowUpRight, Bot, Boxes, Gauge, Search, Workflow, type LucideIcon } from "lucide-react";
import Image from "next/image";
import { projects, type Project, type ProjectItem } from "@/data/site";
import { Horizon } from "./horizon";
import { Heading, serviceIcons } from "./ui";

function Preview({ p, big }: { p: Project; big?: boolean }) {
  const Icon = serviceIcons[p.services[0]];
  return (
    <div className={`relative overflow-hidden rounded-xl bg-ink ${big ? "aspect-[16/10] md:aspect-auto md:h-full" : "aspect-[16/10]"}`}>
      <div aria-hidden="true" className="dot-grid absolute inset-0" />
      {/* Project-tinted horizon; it rises on hover */}
      <div className="absolute inset-0 translate-y-[6%] transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0">
        <Horizon glow={p.color} haze={p.color} className="top-[72%] w-[180%]" />
      </div>
      {p.image ? (
        <div className={`absolute inset-0 flex items-center justify-center ${big ? "p-[5%] pb-[9%]" : "p-[10%] pb-[15%]"}`}>
          <Image
            src={p.image}
            alt={`${p.name} logo`}
            sizes={big ? "(min-width: 768px) 640px, 90vw" : "(min-width: 1024px) 330px, (min-width: 768px) 45vw, 90vw"}
            placeholder="blur"
            className="h-auto max-h-full w-auto max-w-full rounded-lg border border-white/10 bg-white object-contain transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-1"
            style={{ boxShadow: `0 24px 60px -18px ${p.color}99, 0 10px 30px -10px rgb(0 0 0 / 0.8)` }}
          />
        </div>
      ) : (
        <div className="absolute inset-0 grid place-items-center pb-[8%]">
          <div
            className={`grid place-items-center rounded-[22%] border border-white/15 shadow-2xl ${big ? "size-24" : "size-16"}`}
            style={{ background: `linear-gradient(145deg, ${p.color}, #0e0f12 130%)`, boxShadow: `0 20px 50px -12px ${p.color}aa` }}
          >
            <Icon size={big ? 40 : 28} className="text-white" strokeWidth={1.8} />
          </div>
        </div>
      )}
    </div>
  );
}

function Card({ p, big, className = "" }: { p: Project; big?: boolean; className?: string }) {
  const Tag = p.href ? "a" : "div";
  const link = p.href ? { href: p.href, target: "_blank", rel: "noreferrer" } : {};
  return (
    <Tag
      id={`project-${p.slug}`}
      {...link}
      className={`group relative flex scroll-mt-28 flex-col gap-4 rounded-2xl border border-line bg-surface p-3 transition-colors ${p.href ? "hover:border-line-strong" : ""} ${
        big ? "md:grid md:grid-cols-[1.4fr_1fr] md:gap-6" : ""
      } ${className}`}
    >
      <Preview p={p} big={big} />
      <div className={`flex flex-1 flex-col px-2 pb-2 ${big ? "md:justify-end md:py-4 md:pr-4" : ""}`}>
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className={`font-semibold tracking-tight text-fg ${big ? "text-2xl" : "text-lg"}`}>{p.name}</h3>
            <p className="text-sm text-dim">
              {p.client}, {p.year}
            </p>
          </div>
          {p.href && <ArrowUpRight size={18} className="mt-1 shrink-0 text-dim transition-colors group-hover:text-fg" aria-label="Opens in a new tab" />}
        </div>
        <p className="mt-3 text-[15px] leading-relaxed text-muted">{p.summary}</p>
        <p className="mt-4 font-mono text-[13px]" style={{ color: p.color }}>
          {p.result}
        </p>
        <ul className="mt-4 flex flex-wrap gap-1.5">
          {p.stack.map((s) => (
            <li key={s} className="rounded-md border border-line bg-white/[0.03] px-2 py-0.5 text-xs text-muted">
              {s}
            </li>
          ))}
        </ul>
      </div>
    </Tag>
  );
}

const itemIcons: Record<ProjectItem["icon"], LucideIcon> = {
  assets: Boxes,
  score: Gauge,
  chat: Bot,
  flow: Workflow,
  monitor: Activity,
};

/** One wide card holding several related projects, styled like a launcher window */
function GroupCard({ p }: { p: Project }) {
  return (
    <div
      id={`project-${p.slug}`}
      className="relative grid scroll-mt-28 gap-6 overflow-hidden rounded-2xl border border-line bg-surface p-3 md:col-span-6 md:grid-cols-[1fr_1.7fr]"
    >
      <div aria-hidden="true" className="dot-grid absolute inset-0 opacity-60" />
      <div aria-hidden="true" className="absolute inset-y-0 left-0 hidden w-[37%] overflow-hidden md:block">
        <Horizon glow={p.color} haze={p.color} className="top-[82%] w-[170%]" />
      </div>

      <div className="relative flex flex-col px-2 pb-2 pt-2 md:py-4 md:pl-4">
        <h3 className="text-2xl font-semibold tracking-tight text-fg">{p.name}</h3>
        <p className="text-sm text-dim">
          {p.client}, {p.year}
        </p>
        <p className="mt-3 text-[15px] leading-relaxed text-muted">{p.summary}</p>
        <p className="mt-4 font-mono text-[13px]" style={{ color: p.color }}>
          {p.result}
        </p>
        <ul className="mt-4 flex flex-wrap gap-1.5">
          {p.stack.map((s) => (
            <li key={s} className="rounded-md border border-line bg-white/[0.03] px-2 py-0.5 text-xs text-muted">
              {s}
            </li>
          ))}
        </ul>
      </div>

      <div className="glass relative overflow-hidden rounded-xl bg-ink/70">
        <div className="flex items-center gap-3 border-b border-line px-4 py-3 text-sm text-dim">
          <Search size={15} />
          {p.name} projects
          <span className="ml-auto font-mono text-xs">{p.items?.length}</span>
        </div>
        <ul className="p-2">
          {p.items?.map((it) => {
            const Icon = itemIcons[it.icon];
            return (
              <li key={it.name} className="flex gap-3 rounded-lg px-2.5 py-3 transition-colors hover:bg-white/[0.05]">
                <span
                  className="grid size-9 shrink-0 place-items-center rounded-lg"
                  style={{ background: `${it.color}1f`, color: it.color }}
                >
                  <Icon size={17} />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <span className="text-[15px] font-medium text-fg">{it.name}</span>
                    <span className="text-xs text-dim">{it.tags.join(", ")}</span>
                  </div>
                  <p className="mt-1 text-sm leading-relaxed text-muted">{it.summary}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export function Work() {
  const [first, ...rest] = projects;
  const groups = rest.filter((p) => p.items?.length);
  const small = rest.filter((p) => !p.items?.length);
  return (
    <section id="work" className="mx-auto max-w-6xl scroll-mt-24 px-4 pt-28 sm:px-6 sm:pt-40">
      <Heading lead="Selected work." rest="From a live client platform to AI research, each one designed and built end to end." />
      <div className="mt-14 grid gap-4 md:grid-cols-6">
        <Card p={first} big className="md:col-span-6" />
        {groups.map((p) => (
          <GroupCard key={p.slug} p={p} />
        ))}
        {small.map((p, i) => (
          <Card
            key={p.slug}
            p={p}
            className={i === small.length - 1 && small.length % 2 ? "md:col-span-6 lg:col-span-2" : "md:col-span-3 lg:col-span-2"}
          />
        ))}
      </div>
    </section>
  );
}
