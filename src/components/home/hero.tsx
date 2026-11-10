"use client";
import Link from "next/link";
import { useRef } from "react";
import { ArrowRight, FlaskConical } from "lucide-react";
import { AuroraBackground } from "@/components/aceternity/aurora-background";
import { Spotlight } from "@/components/aceternity/spotlight";
import { FlipWords } from "@/components/aceternity/flip-words";
import { TextGenerateEffect } from "@/components/aceternity/text-generate-effect";
import { MovingBorderLink } from "@/components/aceternity/moving-border";
import { gsap, motionAllowed, useGSAP } from "@/lib/gsap";

const FACTS = [
  { text: "Skilled, loyal bakers", quad: "S" },
  { text: "Old ovens break down", quad: "W" },
  { text: "New housing estate nearby", quad: "O" },
  { text: "Supermarket bakery opening", quad: "T" },
];
const QUADS = [
  { id: "S", name: "Strengths", where: "internal", colour: "#16a34a" },
  { id: "W", name: "Weaknesses", where: "internal", colour: "#dc2626" },
  { id: "O", name: "Opportunities", where: "external", colour: "#2563eb" },
  { id: "T", name: "Threats", where: "external", colour: "#d97706" },
];

/**
 * Hero: Aceternity aurora + spotlight, and a GSAP timeline in which the facts
 * of a short scenario are sorted, one by one, into a SWOT analysis – the way
 * a Section B question is answered.
 */
export function Hero({ stats }: { stats: { lessons: number; tools: number; exam: number; terms: number } }) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const el = root.current;
    if (!el) return;
    const fades = el.querySelectorAll("[data-fade]");
    const facts = el.querySelectorAll("[data-fact]");
    const quads = el.querySelectorAll("[data-quad]");
    const placed = el.querySelectorAll("[data-placed]");
    const extras = el.querySelectorAll("[data-extra]");
    if (!motionAllowed()) {
      gsap.set(fades, { opacity: 1, y: 0 });
      gsap.set([...facts, ...quads, ...placed, ...extras], { opacity: 1, y: 0, scale: 1 });
      return;
    }
    gsap.from(fades, { opacity: 0, y: 24, duration: 0.8, stagger: 0.12, ease: "power3.out", delay: 0.2 });
    const tl = gsap.timeline({ repeat: -1, repeatDelay: 2.5, delay: 0.6 });
    tl.set(facts, { opacity: 0, y: -10 })
      .set(quads, { opacity: 0, scale: 0.9 })
      .set(placed, { opacity: 0, y: -8 })
      .set(extras, { opacity: 0, y: 8 })
      .to(facts, { opacity: 1, y: 0, duration: 0.35, stagger: 0.15, ease: "power2.out" })
      .to(quads, { opacity: 1, scale: 1, duration: 0.3, stagger: 0.1, ease: "back.out(2)" });
    placed.forEach((x, i) => tl.to(facts[i], { opacity: 0.35, duration: 0.2 }).to(x, { opacity: 1, y: 0, duration: 0.4, ease: "back.out(2.5)" }));
    tl.to(extras, { opacity: 1, y: 0, duration: 0.5, stagger: 0.25 }).to({}, { duration: 3 });
  }, { scope: root });

  return (
    <AuroraBackground className="border-b border-line">
      <Spotlight className="-top-40 left-0 md:-top-20 md:left-60" fill="#22d3ee" />
      <div ref={root} className="relative z-10 mx-auto grid max-w-7xl items-center gap-12 px-4 pt-16 pb-20 md:pt-24 lg:grid-cols-[1.1fr_1fr]">
        <div>
          <p data-fade className="mb-4 inline-flex items-center gap-2 rounded-full border border-line bg-surface/70 px-3 py-1 text-sm font-semibold text-muted backdrop-blur">
            <span className="h-2 w-2 rounded-full bg-diversity" /> CAPS Business Studies · Grade 12 · Paper 1 &amp; 2
          </p>
          <h1 className="font-display text-4xl leading-[1.08] font-bold tracking-tight text-fg sm:text-5xl lg:text-6xl">
            <TextGenerateEffect words="Business Studies in small steps you can actually finish." highlight={["Business", "Studies", "finish."]} />
          </h1>
          <p data-fade className="mt-5 max-w-xl text-lg text-muted">
            The whole Grade 12 syllabus, one short step at a time – from{" "}
            <FlipWords words={["the eight Acts", "SWOT, Porter and PESTLE", "recruitment and selection", "TQM and quality", "leadership styles", "interest and insurance", "forms of ownership", "ethics and CSR", "teams and conflict", "the 40-mark essay"]} className="inline-block font-semibold text-brand" />
            {" "}— with scenarios to sort, models you can tap, calculators that show the working, exam questions with memos, and an essay planner that shows where every mark comes from.
          </p>
          <div data-fade className="mt-8 flex flex-wrap gap-3">
            <MovingBorderLink href="/learn">Start learning <ArrowRight className="h-4 w-4" /></MovingBorderLink>
            <Link href="/toolkit" className="inline-flex items-center gap-2 rounded-2xl border border-line bg-surface/70 px-6 py-3 font-semibold backdrop-blur transition hover:border-brand/50">
              <FlaskConical className="h-4 w-4 text-eco" /> Open the labs
            </Link>
          </div>
          <dl data-fade className="mt-10 grid max-w-xl grid-cols-2 gap-4 sm:grid-cols-4">
            {[[String(stats.lessons), "lessons"], [String(stats.tools), "labs & tools"], [String(stats.exam), "exam questions"], [String(stats.terms), "key terms"]].map(([a, b]) => (
              <div key={b}>
                <dt className="sr-only">{b}</dt>
                <dd className="font-display text-3xl font-bold text-fg">{a}</dd>
                <dd className="text-sm text-muted">{b}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div data-fade className="relative">
          <div className="decorative absolute -inset-4 rounded-[2rem] bg-gradient-to-tr from-diversity/30 via-cell/20 to-energy/30 blur-2xl" aria-hidden />
          <div className="relative overflow-hidden rounded-3xl border border-line bg-surface shadow-2xl">
            <div className="flex items-center gap-2 border-b border-line px-4 py-3 text-xs text-muted">
              <span className="font-mono font-semibold">PAPER 1 · SWOT ANALYSIS</span>
              <span className="ml-auto rounded-md bg-diversity px-2 py-0.5 font-semibold text-white">Live</span>
            </div>
            <div className="px-5 py-6 sm:px-7" role="img" aria-label="Animation: four facts about Khumalo Bakery are sorted into a SWOT analysis. Skilled, loyal bakers is a strength; old ovens that break down is a weakness; a new housing estate nearby is an opportunity; a supermarket bakery opening is a threat.">
              <div aria-hidden>
                <div className="text-[11px] font-bold tracking-wider text-muted uppercase">Scenario: Khumalo Bakery</div>
                <div className="mt-1.5 flex flex-wrap gap-1.5">
                  {FACTS.map((f) => (
                    <span key={f.text} data-fact className="rounded-lg border border-line bg-elevated px-2 py-1 text-xs font-semibold" style={{ opacity: 0 }}>{f.text}</span>
                  ))}
                </div>
                <div className="mt-4 grid grid-cols-2 gap-2">
                  {QUADS.map((q) => (
                    <div key={q.id} data-quad className="min-h-[5.25rem] rounded-xl border-2 p-2" style={{ borderColor: q.colour, opacity: 0 }}>
                      <div className="flex items-baseline justify-between gap-1 text-xs font-bold" style={{ color: q.colour }}><span>{q.name}</span><span className="text-[10px] font-semibold text-muted">{q.where}</span></div>
                      <div data-placed className="mt-1.5 rounded-lg px-2 py-1 text-xs font-semibold text-white" style={{ background: q.colour, opacity: 0 }}>{FACTS.find((f) => f.quad === q.id)!.text}</div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 grid gap-2 sm:grid-cols-2">
                  <div data-extra className="rounded-xl border border-line bg-elevated p-3 text-xs" style={{ opacity: 0 }}>
                    <div className="font-bold text-diversity uppercase">Ask yourself</div>
                    <div className="mt-1 font-semibold">Can the business control it? Yes → S or W. No → O or T.</div>
                  </div>
                  <div data-extra className="rounded-xl border border-line bg-elevated p-3 text-xs" style={{ opacity: 0 }}>
                    <div className="font-bold text-eco uppercase">Exam tip</div>
                    <div className="mt-1 font-semibold">Name it ✓✓ + quote the scenario ✓ = 3 marks</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuroraBackground>
  );
}
