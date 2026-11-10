"use client";
import { useState } from "react";
import { CheckSquare, RotateCcw, Square } from "lucide-react";
import { solvePuzzle } from "@/lib/progress";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ESSAYS } from "./essays";
import { Explain, useToolUse } from "./sim-kit";
import { Segmented, WidgetFrame } from "./widget-frame";

const C = "var(--t-skills)";
const LASO = [
  { id: "l", name: "Layout", ask: "I wrote the headings Introduction and Conclusion, and a body with headings." },
  { id: "a", name: "Analysis", ask: "I used every sub-question as a heading and answered what was asked." },
  { id: "s", name: "Synthesis", ask: "I gave only relevant facts – no padding from other topics." },
  { id: "o", name: "Originality", ask: "I added at least two current, real-life examples of my own." },
];

/**
 * A Section C essay, one small step at a time: introduction → each
 * sub-question → conclusion → LASO. Tick the facts you could write from
 * memory and see your mark out of 40 build up, capped exactly like the
 * marking guideline (sub-maximums, 32 for content, 8 for insight).
 */
export function EssayPlanner({ essay: initial = ESSAYS[0].id }: { essay?: string }) {
  const touch = useToolUse();
  const [id, setId] = useState(ESSAYS.some((e) => e.id === initial) ? initial : ESSAYS[0].id);
  const [step, setStep] = useState(0);
  const [ticks, setTicks] = useState<Record<string, boolean>>({});
  const e = ESSAYS.find((x) => x.id === id)!;
  const steps = ["Question", "Introduction", ...e.sections.map((_, i) => `Body ${i + 1}`), "Conclusion", "LASO"];
  const on = (k: string) => Boolean(ticks[`${id}:${k}`]);
  const toggle = (k: string) => { touch(); setTicks((t) => ({ ...t, [`${id}:${k}`]: !t[`${id}:${k}`] })); };
  const count = (prefix: string, n: number) => Array.from({ length: n }, (_, i) => on(`${prefix}${i}`)).filter(Boolean).length;

  const intro = Math.min(2, count("i", e.intro.length));
  const body = e.sections.map((s, k) => Math.min(s.max, count(`s${k}-`, s.facts.length) * 2));
  const concl = Math.min(2, count("c", e.conclusion.length) * 2);
  const raw = intro + body.reduce((a, b) => a + b, 0) + concl;
  const content = Math.min(32, raw);
  const insight = LASO.filter((l) => on(`laso-${l.id}`)).length * 2;
  const total = content + insight;
  const available = 2 + e.sections.reduce((a, s) => a + s.max, 0) + 2;

  const fact = (key: string, text: string, tag = "√√") => (
    <li key={key}>
      <button onClick={() => toggle(key)} aria-pressed={on(key)} className={cn("flex w-full items-start gap-2 rounded-lg px-2 py-1.5 text-left text-sm transition hover:bg-surface-2", on(key) && "bg-success/10")}>
        {on(key) ? <CheckSquare className="mt-0.5 h-4 w-4 shrink-0 text-success" /> : <Square className="mt-0.5 h-4 w-4 shrink-0 text-muted" />}
        <span className="flex-1">{text}</span><span className="shrink-0 font-mono text-xs text-muted">{tag}</span>
      </button>
    </li>
  );
  const sec = step >= 2 && step < 2 + e.sections.length ? e.sections[step - 2] : null;

  return (
    <WidgetFrame title="Essay planner: build a 40-mark essay" colour={C} instruction="One step at a time. Write (or say) your answer first, then tick the facts you got. Watch the marks – and the maximums – add up.">
      <Segmented colour={C} value={id} onChange={(v) => { setId(v); setStep(0); }} options={ESSAYS.map((x) => ({ id: x.id, label: `P${x.paper} · ${x.topic}` }))} />

      <div className="mt-3 flex items-center gap-1" aria-label={`Step ${step + 1} of ${steps.length}`}>
        {steps.map((s, i) => <button key={s} onClick={() => setStep(i)} aria-current={i === step} title={s} className={cn("h-2 flex-1 rounded-full transition", i === step ? "bg-skills" : i < step ? "bg-skills/45" : "bg-surface-2")}><span className="sr-only">{s}</span></button>)}
      </div>
      <div className="mt-1 flex items-baseline justify-between text-xs text-muted"><span>Step {step + 1} of {steps.length} · <strong className="text-fg">{steps[step]}</strong></span><span>Content {content}/32 · Insight {insight}/8 · <strong className="text-fg">{total}/40</strong></span></div>

      <div className="mt-3 min-h-56 rounded-2xl border border-line p-4">
        {step === 0 && <>
          <p className="text-xs font-bold tracking-wide text-muted uppercase">Section C · Paper {e.paper} · {e.topic} · 40 marks</p>
          <p className="mt-2">{e.stem}</p>
          <p className="mt-2 font-semibold">Write an essay in which you:</p>
          <ul className="mt-1 list-disc space-y-1 pl-5">{e.sections.map((s) => <li key={s.heading}>{s.heading}.</li>)}</ul>
          <p className="mt-3 rounded-lg bg-surface-2 p-2 text-sm">🔎 <strong>Before you write:</strong> underline the action verbs ({e.sections.map((s) => s.heading.split(" ")[0].toLowerCase()).join(", ")}). Each bullet becomes a <strong>heading</strong> in your body.</p>
        </>}
        {step === 1 && <>
          <h4 className="font-display font-bold">Introduction <span className="text-sm font-normal text-muted">· any two relevant facts · 2 × 1 = 2 marks</span></h4>
          <p className="text-sm text-muted">Do not repeat the question word for word. Two short, meaningful sentences about the topic are enough.</p>
          <ul className="mt-2 space-y-0.5">{e.intro.map((t, i) => fact(`i${i}`, t, "√"))}</ul>
        </>}
        {sec && <>
          <h4 className="font-display font-bold">{sec.heading} <span className="text-sm font-normal text-muted">· maximum {sec.max} marks</span></h4>
          <p className="text-sm text-muted">Each full fact = 2 marks. You need <strong>{sec.max / 2}</strong> of these {sec.facts.length} facts for full marks here.</p>
          <ul className="mt-2 space-y-0.5">{sec.facts.map((t, i) => fact(`s${step - 2}-${i}`, t))}</ul>
          <p className="mt-2 text-right text-sm font-bold">{body[step - 2]} / {sec.max}{count(`s${step - 2}-`, sec.facts.length) * 2 > sec.max && <span className="font-normal text-muted"> (sub-max reached – extra facts earn nothing here)</span>}</p>
        </>}
        {step === steps.length - 2 && <>
          <h4 className="font-display font-bold">Conclusion <span className="text-sm font-normal text-muted">· one meaningful fact · 1 × 2 = 2 marks</span></h4>
          <p className="text-sm text-muted">It must be a NEW insight – not a fact you already used in the introduction or the body.</p>
          <ul className="mt-2 space-y-0.5">{e.conclusion.map((t, i) => fact(`c${i}`, t))}</ul>
        </>}
        {step === steps.length - 1 && <>
          <h4 className="font-display font-bold">Insight: LASO <span className="text-sm font-normal text-muted">· 4 × 2 = 8 marks</span></h4>
          <ul className="mt-2 space-y-0.5">{LASO.map((l) => fact(`laso-${l.id}`, `${l.name}: ${l.ask}`))}</ul>
          <p className="mt-2 text-sm"><strong>Originality ideas:</strong></p>
          <ul className="list-disc pl-5 text-sm text-muted">{e.originality.map((o) => <li key={o}>{o}</li>)}</ul>
        </>}
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-2">
        <Button size="sm" variant="secondary" disabled={step === 0} onClick={() => setStep((s) => s - 1)}>Back</Button>
        {step < steps.length - 1
          ? <Button size="sm" onClick={() => setStep((s) => s + 1)}>Next: {steps[step + 1]}</Button>
          : <Button size="sm" variant="success" onClick={() => { if (total >= 24) solvePuzzle(`essay:${id}`, 25); setStep(0); }}>Finish</Button>}
        <Button size="sm" variant="ghost" className="ml-auto" onClick={() => { setTicks({}); setStep(0); }}><RotateCcw className="h-4 w-4" /> Clear ticks</Button>
      </div>

      <Explain colour={C}>
        <p><strong>How the 40 is made up:</strong> this guideline has {available} marks of content available, but content is capped at <strong>32</strong>{raw > 32 && <> (you ticked {raw} – {raw - 32} did not count)</>}. Add <strong>8</strong> for insight. You do not need every fact – you need <em>enough facts under every heading</em>.</p>
        <p className="mt-1 text-muted">Missing a whole sub-question costs you its marks AND an Analysis mark. Spread your time: about 30 minutes for the essay.</p>
      </Explain>
    </WidgetFrame>
  );
}
