import { Award } from "lucide-react";
import { certifications, experience } from "@/data/site";
import { Heading } from "./ui";

const kindColor = { work: "var(--color-accent)", study: "#B57BFF" } as const;

export function Experience() {
  return (
    <section id="experience" className="mx-auto max-w-6xl scroll-mt-24 px-4 pt-28 sm:px-6 sm:pt-40">
      <div className="grid gap-12 md:grid-cols-[1fr_1.6fr]">
        <div className="md:sticky md:top-32 md:self-start">
          <Heading
            center={false}
            lead="Three years inside a telecom."
            rest="From full-stack code to support desks, data science and now DevOps at Ooredoo Palestine."
          />
          <ul className="mt-8 flex gap-5 text-sm text-muted">
            <li className="flex items-center gap-2">
              <span className="size-2 rounded-full" style={{ background: kindColor.work }} />
              Work
            </li>
            <li className="flex items-center gap-2">
              <span className="size-2 rounded-full" style={{ background: kindColor.study }} />
              Study
            </li>
          </ul>
        </div>

        <ol className="relative">
          {/* Spine */}
          <span aria-hidden="true" className="absolute bottom-3 left-[5px] top-3 w-px bg-gradient-to-b from-line-strong via-line to-transparent" />
          {experience.map((e) => (
            <li key={e.role + e.dates} className="relative pb-10 pl-9 last:pb-0">
              <span
                aria-hidden="true"
                className="absolute left-0 top-[7px] size-[11px] rounded-full border-2 border-ink"
                style={{ background: kindColor[e.kind], boxShadow: `0 0 12px ${kindColor[e.kind]}` }}
              />
              <p className="font-mono text-xs text-dim">{e.dates}</p>
              <h3 className="mt-1.5 text-lg font-semibold tracking-tight text-fg">{e.role}</h3>
              <p className="text-sm text-muted">
                {e.org}, {e.place}
              </p>
              <ul className="mt-3 space-y-1.5">
                {e.points.map((pt) => (
                  <li key={pt} className="max-w-[60ch] text-[15px] leading-relaxed text-muted">
                    {pt}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </div>

      <div className="mt-20">
        <h3 className="text-sm font-medium text-fg">Certifications</h3>
        <ul className="mt-4 flex flex-wrap gap-2">
          {certifications.map((c) => (
            <li key={c} className="flex items-center gap-2 rounded-full border border-line bg-white/[0.03] px-3.5 py-1.5 text-sm text-muted">
              <Award size={14} className="text-accent" />
              {c}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
