"use client";
import { useMemo, useState } from "react";
import { RotateCcw, Volume2 } from "lucide-react";
import type { ModelId } from "@/content/types";
import { solvePuzzle } from "@/lib/progress";
import { speak } from "@/lib/biz/speech";
import { cn, shuffle } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { MODELS, type ModelPart } from "./models";
import { useToolUse } from "./sim-kit";
import { Feedback, Segmented, WidgetFrame } from "./widget-frame";

type Mode = "explore" | "quiz";

/**
 * A business model or framework you can tap through one part at a time
 * (instead of a wall of text), then practise with scenarios: "which one is
 * this?" – the way Section B questions ask you to identify from a scenario.
 */
export function ModelExplorer({ model = "swot", mode: initialMode = "explore" }: { model?: ModelId; mode?: Mode }) {
  const m = MODELS[model];
  const touch = useToolUse();
  const [mode, setMode] = useState<Mode>(initialMode);
  const [sel, setSel] = useState<string>(m.parts[0].id);
  const [seen, setSeen] = useState<string[]>([m.parts[0].id]);
  const [round, setRound] = useState(0);
  const [q, setQ] = useState(0);
  const [score, setScore] = useState({ right: 0, tried: 0 });
  const [picked, setPicked] = useState<string | null>(null);
  const order = useMemo(() => shuffle(m.parts, `${model}-${round}`), [m.parts, model, round]);
  const target = order[q % order.length];
  const options = useMemo(() => {
    const others = shuffle(m.parts.filter((p) => p.id !== target.id), `${model}-${round}-${q}`).slice(0, 3);
    return m.kind === "steps" || m.parts.length <= 6 ? m.parts : shuffle([target, ...others], `${model}-${round}-${q}-o`);
  }, [m, model, target, round, q]);
  const selected = m.parts.find((p) => p.id === sel) ?? m.parts[0];
  const finished = score.tried >= m.parts.length;

  const tap = (p: ModelPart) => {
    touch();
    setSel(p.id);
    setSeen((s) => (s.includes(p.id) ? s : [...s, p.id]));
  };
  const answer = (p: ModelPart) => {
    if (picked) return;
    touch();
    const ok = p.id === target.id;
    setPicked(p.id);
    setScore((s) => {
      const next = { right: s.right + (ok ? 1 : 0), tried: s.tried + 1 };
      if (next.tried === m.parts.length && next.right === m.parts.length) solvePuzzle(`model:${model}`, 20);
      return next;
    });
  };
  const restart = (to: Mode = mode) => {
    setMode(to);
    setRound((r) => r + 1);
    setQ(0);
    setScore({ right: 0, tried: 0 });
    setPicked(null);
  };

  return (
    <WidgetFrame title={m.title} colour={m.colour} instruction={mode === "explore" ? "Tap one part at a time. When you have seen them all, switch to “Which one is it?”" : "Read the clue and tap the part it describes."}>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <Segmented colour={m.colour} value={mode} onChange={(v) => restart(v)} options={[{ id: "explore", label: "Explore" }, { id: "quiz", label: "Which one is it?" }]} />
        {mode === "explore"
          ? <span className="text-xs font-semibold text-muted">{seen.length}/{m.parts.length} explored</span>
          : <span className="text-xs font-semibold text-muted">{score.right}/{score.tried} correct</span>}
      </div>

      {mode === "explore" && (
        <div className="mt-3 grid gap-4 md:grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)]">
          <ol className="grid content-start gap-1.5">
            {m.parts.map((p, i) => (
              <li key={p.id}>
                <button onClick={() => tap(p)} aria-pressed={sel === p.id}
                  className={cn("flex w-full items-center gap-2 rounded-xl border-2 px-3 py-2 text-left text-sm font-semibold transition", sel === p.id ? "bg-surface-2" : "border-line hover:bg-surface-2", !seen.includes(p.id) && sel !== p.id && "border-dashed")}
                  style={sel === p.id ? { borderColor: m.colour } : undefined}>
                  <span aria-hidden className="text-lg">{p.emoji}</span>
                  <span className="min-w-0 flex-1">{m.kind === "steps" && <span className="mr-1 font-mono text-xs text-muted">{i + 1}.</span>}{p.name}</span>
                  {seen.includes(p.id) && <span aria-hidden className="text-xs text-success">✓</span>}
                </button>
              </li>
            ))}
          </ol>
          <div className="rounded-2xl border-l-4 bg-surface-2/60 p-4" style={{ borderColor: m.colour }} role="status">
            <p className="mb-3 text-xs text-muted">{m.intro}</p>
            <div className="flex items-start justify-between gap-2">
              <h4 className="font-display text-lg font-bold"><span aria-hidden>{selected.emoji}</span> {selected.name}</h4>
              <button onClick={() => speak(`${selected.name}. ${selected.what}`)} aria-label="Read aloud" className="rounded-lg p-1 text-muted hover:bg-surface hover:text-fg"><Volume2 className="h-4 w-4" /></button>
            </div>
            <ul className="mt-2 space-y-1.5 text-sm leading-relaxed">
              {selected.what.split(/(?<=[.!?])\s+(?=[A-Z+−])/).map((s, i) => <li key={i} className="flex gap-2"><span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: m.colour }} /><span>{s}</span></li>)}
            </ul>
            <p className="mt-3 rounded-lg bg-surface p-2 text-sm"><strong>Example:</strong> {selected.clue}</p>
          </div>
        </div>
      )}

      {mode === "quiz" && !finished && (
        <div className="mt-3">
          <p className="text-xs font-bold tracking-wide text-muted uppercase">Clue {score.tried + (picked ? 0 : 1)} of {m.parts.length}</p>
          <blockquote className="mt-1 rounded-xl border-l-4 bg-surface-2/60 p-3 font-medium" style={{ borderColor: m.colour }}>{target.clue}</blockquote>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            {options.map((o) => (
              <button key={o.id} disabled={Boolean(picked)} onClick={() => answer(o)}
                className={cn("flex items-center gap-2 rounded-xl border-2 px-3 py-2 text-left text-sm font-semibold transition",
                  picked && o.id === target.id ? "border-success bg-success/10" : picked === o.id ? "border-danger bg-danger/10" : "border-line hover:border-brand/50")}>
                <span aria-hidden>{o.emoji}</span>{o.name}
              </button>
            ))}
          </div>
          <Feedback ok={picked ? picked === target.id : null}>
            <strong>{picked === target.id ? "Yes!" : `Not yet – it is ${target.name}.`}</strong> {target.what.split(/(?<=[.!?])\s+/)[0]}
            <div className="mt-2"><Button size="sm" onClick={() => { setPicked(null); setQ((x) => x + 1); }}>Next clue</Button></div>
          </Feedback>
        </div>
      )}

      {mode === "quiz" && finished && (
        <div className="mt-4 rounded-2xl bg-surface-2/60 p-4 text-center">
          <p className="font-display text-2xl font-bold">{score.right} / {m.parts.length}</p>
          <p className="text-sm text-muted">{score.right === m.parts.length ? "Perfect – you can spot every part from a scenario. 🎉" : "Explore the ones you missed, then go again – every attempt makes the memory stronger."}</p>
          <div className="mt-3 flex justify-center gap-2">
            <Button size="sm" onClick={() => restart("quiz")}><RotateCcw className="h-4 w-4" /> New round</Button>
            <Button size="sm" variant="secondary" onClick={() => restart("explore")}>Back to explore</Button>
          </div>
        </div>
      )}
    </WidgetFrame>
  );
}
