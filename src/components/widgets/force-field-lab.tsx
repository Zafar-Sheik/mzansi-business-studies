"use client";
import { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Explain, useToolUse } from "./sim-kit";
import { Segmented, WidgetFrame } from "./widget-frame";

const C = "var(--t-body)";

interface Force { text: string; score: number }
interface Case { id: string; label: string; change: string; driving: Force[]; restraining: Force[] }

const CASES: Case[] = [
  { id: "online", label: "Sell online", change: "A clothing shop wants to start selling online.",
    driving: [{ text: "Reach customers all over South Africa", score: 4 }, { text: "Competitors already sell online", score: 3 }, { text: "Lower rent than a second shop", score: 2 }],
    restraining: [{ text: "Cost of a website and delivery", score: 3 }, { text: "Staff lack computer skills", score: 2 }, { text: "Fear of online fraud", score: 2 }] },
  { id: "shift", label: "Night shift", change: "A factory wants to introduce a night shift to meet demand.",
    driving: [{ text: "Orders are higher than current output", score: 4 }, { text: "Machines stand idle at night", score: 3 }, { text: "More jobs for the community", score: 2 }],
    restraining: [{ text: "Workers resist working at night", score: 4 }, { text: "Higher wages (night allowance)", score: 3 }, { text: "Transport is unsafe at night", score: 3 }] },
  { id: "green", label: "Go solar", change: "A bakery wants to install solar panels.",
    driving: [{ text: "Load shedding stops the ovens", score: 5 }, { text: "Lower electricity bills over time", score: 3 }, { text: "Good for the business image (planet)", score: 2 }],
    restraining: [{ text: "High installation cost", score: 4 }, { text: "The roof needs repairs first", score: 2 }, { text: "Owner is unsure about the technology", score: 1 }] },
];

/** Force-field analysis: score the forces for and against a change and see which side wins. */
export function ForceFieldLab() {
  const touch = useToolUse();
  const [id, setId] = useState(CASES[0].id);
  const base = CASES.find((c) => c.id === id)!;
  const [scores, setScores] = useState<Record<string, number>>({});
  const val = (side: string, i: number, f: Force) => scores[`${id}-${side}-${i}`] ?? f.score;
  const bump = (side: string, i: number, f: Force, d: number) => { touch(); setScores((s) => ({ ...s, [`${id}-${side}-${i}`]: Math.max(1, Math.min(5, val(side, i, f) + d)) })); };
  const total = (side: "d" | "r") => (side === "d" ? base.driving : base.restraining).reduce((a, f, i) => a + val(side, i, f), 0);
  const d = total("d");
  const r = total("r");
  const shift = Math.max(-45, Math.min(45, (d - r) * 5));

  const column = (side: "d" | "r", forces: Force[]) => (
    <div>
      <h4 className={cn("mb-2 flex items-center gap-1 text-sm font-bold", side === "d" ? "text-success" : "justify-end text-danger")}>
        {side === "d" ? <>Driving forces (for) <ArrowRight className="h-4 w-4" /></> : <><ArrowLeft className="h-4 w-4" /> Restraining forces (against)</>}
      </h4>
      <ul className="space-y-2">
        {forces.map((f, i) => (
          <li key={f.text} className="rounded-xl border border-line p-2 text-sm">
            <div>{f.text}</div>
            <div className="mt-1 flex items-center gap-2">
              <button onClick={() => bump(side, i, f, -1)} aria-label={`Lower the score of: ${f.text}`} className="grid h-7 w-7 place-items-center rounded-lg bg-surface-2 font-bold">−</button>
              <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-surface-2"><div className={cn("h-full rounded-full transition-[width]", side === "d" ? "bg-success" : "bg-danger")} style={{ width: `${val(side, i, f) * 20}%` }} /></div>
              <button onClick={() => bump(side, i, f, 1)} aria-label={`Raise the score of: ${f.text}`} className="grid h-7 w-7 place-items-center rounded-lg bg-surface-2 font-bold">+</button>
              <span className="w-4 text-center font-mono font-bold">{val(side, i, f)}</span>
            </div>
          </li>
        ))}
      </ul>
      <p className="mt-2 text-sm font-bold">Total: {side === "d" ? d : r}</p>
    </div>
  );

  return (
    <WidgetFrame title="Force-field analysis lab" colour={C} instruction="Give each force a score from 1 (weak) to 5 (strong) with + and −. Which side is stronger?">
      <Segmented colour={C} value={id} onChange={setId} options={CASES.map((c) => ({ id: c.id, label: c.label }))} />
      <p className="mt-3 rounded-xl bg-surface-2/60 p-3 text-center font-display font-bold">Proposed change: {base.change}</p>
      <div className="mt-3 grid gap-4 md:grid-cols-2">
        {column("d", base.driving)}
        {column("r", base.restraining)}
      </div>
      <div className="relative mt-4 h-10 rounded-full bg-gradient-to-r from-danger/25 via-surface-2 to-success/25" role="img" aria-label={`Driving forces ${d}, restraining forces ${r}`}>
        <div className="absolute top-1 h-8 w-8 -translate-x-1/2 rounded-full border-2 border-white shadow-md transition-[left]" style={{ left: `${50 + shift}%`, background: C }} />
        <span className="absolute top-2.5 left-3 text-xs font-bold text-danger">No change</span>
        <span className="absolute top-2.5 right-3 text-xs font-bold text-success">Change</span>
      </div>
      <Explain colour={C}>
        {d > r ? <p><strong>Driving forces win ({d} vs {r}).</strong> The change is likely to succeed – implement it, but still plan how to reduce the restraining forces.</p>
          : d < r ? <p><strong>Restraining forces win ({r} vs {d}).</strong> The change is likely to fail as it stands. Either drop it, or <strong>strengthen the driving forces and weaken the restraining forces</strong> (e.g. train staff, find cheaper finance) and analyse again.</p>
            : <p><strong>The forces are balanced ({d} vs {r}).</strong> Nothing will change unless the business strengthens a driving force or reduces a restraining force.</p>}
        <p className="mt-2 text-muted">Exam steps: describe the current situation and the desired situation → list the driving and restraining forces → allocate a score to each → weigh up the totals → decide if the change is viable → identify strategies to reduce the restraining forces.</p>
      </Explain>
    </WidgetFrame>
  );
}
