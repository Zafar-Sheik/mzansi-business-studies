"use client";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Explain, useToolUse } from "./sim-kit";
import { Segmented, Toggle, WidgetFrame } from "./widget-frame";

const C = "var(--t-skills)";

const PAPERS = {
  "1": { name: "Paper 1", q2: "Business Environments", q3: "Business Operations", q5: "Business Environments", q6: "Business Operations" },
  "2": { name: "Paper 2", q2: "Business Ventures", q3: "Business Roles", q5: "Business Ventures", q6: "Business Roles" },
} as const;

const clock = (start: number, mins: number) => {
  const t = start + mins;
  return `${String(Math.floor(t / 60)).padStart(2, "0")}:${String(Math.round(t % 60)).padStart(2, "0")}`;
};

/** Plan your two hours: choose your questions and get a minute-by-minute budget. */
export function PaperPlanner() {
  const touch = useToolUse();
  const [paper, setPaper] = useState<"1" | "2">("1");
  const [b, setB] = useState<string[]>(["Q2", "Q3"]);
  const [essay, setEssay] = useState("Q5");
  const [extra, setExtra] = useState(false);
  const p = PAPERS[paper];
  const k = extra ? 1.25 : 1;
  const toggleB = (q: string) => { touch(); setB((cur) => (cur.includes(q) ? cur.filter((x) => x !== q) : [...cur, q].slice(-2))); };
  const blocks = [
    { label: "Read & choose", detail: "Read all the questions; tick the ones you know best", mins: 5, marks: 0, tone: "bg-surface-2 text-fg" },
    { label: "Section A · Q1", detail: "Compulsory: multiple choice, choose the word, match columns", mins: 20, marks: 30, tone: "bg-skills text-white" },
    ...[...b].sort().map((q) => ({ label: `Section B · ${q}`, detail: q === "Q2" ? p.q2 : q === "Q3" ? p.q3 : "Miscellaneous – both main topics", mins: 30, marks: 40, tone: "bg-energy text-white" })),
    { label: `Section C · ${essay}`, detail: `Essay on ${essay === "Q5" ? p.q5 : p.q6} – LASO!`, mins: 30, marks: 40, tone: "bg-cell text-white" },
    { label: "Check", detail: "Numbering, headings, unanswered sub-questions", mins: 5, marks: 0, tone: "bg-surface-2 text-fg" },
  ];
  const marks = blocks.reduce((a, x) => a + x.marks, 0);
  let t = 0;

  return (
    <WidgetFrame title="Paper planner: your two hours" colour={C} instruction="Choose the paper and the questions you would answer. Section A is compulsory; choose TWO in Section B and ONE in Section C.">
      <div className="flex flex-wrap items-center gap-3">
        <Segmented colour={C} value={paper} onChange={(v) => { touch(); setPaper(v); }} options={[{ id: "1", label: "Paper 1" }, { id: "2", label: "Paper 2" }]} />
        <Toggle on={extra} onChange={setExtra}>Extra-time concession (+15 min per hour)</Toggle>
      </div>
      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        <div>
          <div className="mb-1 text-xs font-bold text-muted uppercase">Section B – choose two</div>
          <div className="grid gap-1.5">
            {(["Q2", "Q3", "Q4"] as const).map((q) => (
              <button key={q} onClick={() => toggleB(q)} aria-pressed={b.includes(q)} className={cn("rounded-xl border-2 px-3 py-2 text-left text-sm font-semibold", b.includes(q) ? "border-energy bg-surface-2" : "border-line text-muted")}>
                {b.includes(q) ? "☑" : "☐"} {q} · {q === "Q2" ? p.q2 : q === "Q3" ? p.q3 : "Miscellaneous"} <span className="font-normal">(40)</span>
              </button>
            ))}
          </div>
        </div>
        <div>
          <div className="mb-1 text-xs font-bold text-muted uppercase">Section C – choose one essay</div>
          <div className="grid gap-1.5">
            {(["Q5", "Q6"] as const).map((q) => (
              <button key={q} onClick={() => { touch(); setEssay(q); }} aria-pressed={essay === q} className={cn("rounded-xl border-2 px-3 py-2 text-left text-sm font-semibold", essay === q ? "border-cell bg-surface-2" : "border-line text-muted")}>
                {essay === q ? "◉" : "○"} {q} · {q === "Q5" ? p.q5 : p.q6} <span className="font-normal">(40)</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <ol className="mt-4 space-y-1.5">
        {blocks.map((x) => {
          const from = clock(540, t);
          t += x.mins * k;
          return (
            <li key={x.label} className="grid grid-cols-[6.2rem_1fr] items-stretch gap-2 text-sm">
              <span className="grid place-items-center rounded-lg bg-surface-2 font-mono text-xs font-bold tabular-nums">{from}–{clock(540, t)}</span>
              <span className={cn("rounded-lg px-3 py-1.5", x.tone)}><strong>{x.label}</strong> · {Math.round(x.mins * k)} min{x.marks > 0 && ` · ${x.marks} marks`}<span className="block text-xs opacity-90">{x.detail}</span></span>
            </li>
          );
        })}
      </ol>
      <Explain colour={C}>
        {b.length < 2
          ? <p><strong>Choose one more Section B question</strong> – you must answer two. If you answer all three, only the first two are marked.</p>
          : <p><strong>{marks} marks in {Math.round(120 * k)} minutes</strong> (starting at 09:00). That is about {extra ? "1" : "0,8"} minute{extra ? "" : "s"} per mark – a 4-mark question deserves about {extra ? "4" : "3"} minutes, not 10.</p>}
        <p className="mt-2 text-muted">Start each question on a NEW page, number exactly as in the question paper, and never leave a sub-question blank – an attempt can earn marks; a blank cannot.</p>
      </Explain>
    </WidgetFrame>
  );
}
