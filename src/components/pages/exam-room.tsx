"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { ArrowLeft, BookOpenCheck, CheckCircle2, Clock, NotebookPen, Timer } from "lucide-react";
import type { ExamQuestion, Topic } from "@/content/types";
import { useProgress } from "@/lib/progress";
import { gradeLabel, PAPER_INFO, paperLabel, paperShort, TOPICS, topicMeta } from "@/lib/topics";
import { Chip } from "@/components/ui/chip";
import { GlowCard } from "@/components/aceternity/glow-card";
import { ExamPartCard } from "@/components/learn/exam-part";
import { Markdown } from "@/components/learn/markdown";
import { Widget } from "@/components/widgets";

const VERBS: [string, string][] = [
  ["Name / State / List / Identify / Give", "Short and to the point – no explanation needed. Only the first answers are marked when a number (e.g. THREE) is asked."],
  ["Quote / Motivate from the scenario", "Copy the exact words from the scenario. The quote earns its mark only if your identification is correct."],
  ["Outline / Describe", "Full sentences, but brief – the main facts without long explanations."],
  ["Explain / Discuss", "Full sentences: give the fact AND say more about it (a reason, an example or a result). Each full fact = 2 marks."],
  ["Distinguish / Differentiate", "Clear differences that are linked point by point – a table works best."],
  ["Calculate", "Write the formula, show every step and put R in front of the answer."],
  ["Evaluate / Discuss the impact", "Positives AND/OR negatives, under those two sub-headings."],
  ["Advise / Recommend / Suggest", "Practical actions the business should take, each with a short explanation."],
];

/** Exam-style questions with self-marking memos, plus exam technique. */
export function ExamRoom({ questions }: { questions: ExamQuestion[] }) {
  const params = useSearchParams();
  const liveTopics = TOPICS.filter((t) => questions.some((q) => q.topic === t.topic));
  const initialTopic = TOPICS.find((t) => t.slug === params.get("topic"))?.topic ?? null;
  const [topic, setTopic] = useState<Topic | null>(initialTopic);
  const [open, setOpen] = useState<string | null>(null);
  const progress = useProgress();
  const list = questions.filter((q) => !topic || q.topic === topic);
  const current = questions.find((q) => q.id === open);
  const done = (q: ExamQuestion) => q.parts.every((_, k) => progress.exams?.[`${q.id}-${k}`]);
  const scoreOf = (q: ExamQuestion) => q.parts.reduce((s, _, k) => s + (progress.exams?.[`${q.id}-${k}`]?.score ?? 0), 0);
  const totalOf = (q: ExamQuestion) => q.parts.reduce((s, p) => s + p.marks, 0);

  if (current) {
    const meta = topicMeta(current.topic);
    const qNum = questions.indexOf(current) + 1;
    return (
      <div className="mx-auto max-w-4xl px-4 py-10">
        <button onClick={() => setOpen(null)} className="inline-flex items-center gap-1 text-sm text-muted hover:text-fg"><ArrowLeft className="h-4 w-4" /> All exam questions</button>
        <header className="mt-4 rounded-3xl border border-line p-6" style={{ background: `linear-gradient(135deg, color-mix(in oklab, ${meta.colour} 12%, var(--surface)), var(--surface) 60%)` }}>
          <div className="flex flex-wrap gap-2"><Chip colour={meta.colour}>{meta.emoji} {gradeLabel(meta.topic)} · {meta.title}</Chip><Chip>{paperLabel(meta.paper)}</Chip><Chip>{totalOf(current)} marks · ≈ {Math.round(totalOf(current) * 0.8)} min</Chip></div>
          <h1 className="mt-3 font-display text-3xl font-bold">{current.title}</h1>
          <p className="mt-1 text-sm text-muted">Write your answers (on paper or in the boxes) <strong>before</strong> you open the memo – that is where the learning happens. A full fact = two marks.</p>
          {current.lesson && <Link href={`/learn/${current.lesson}`} className="mt-2 inline-block text-sm font-semibold text-brand underline">Revise the lesson first →</Link>}
        </header>
        {current.source && <div className="mt-5 rounded-2xl border-l-4 border-exam bg-exam/5 p-4"><Markdown md={current.source} /></div>}
        {current.figure && <div className="mt-5"><div className="mb-1 text-xs font-bold text-muted uppercase">Tool to revise with (not in the real exam)</div><Widget name={current.figure.widget} props={current.figure.props} /></div>}
        <div className="mt-6 space-y-4">
          {current.parts.map((p, k) => <ExamPartCard key={k} part={p} id={`${current.id}-${k}`} number={`${qNum}.${k + 1}`} />)}
        </div>
        <div className="mt-6 rounded-2xl border border-line bg-surface p-4 text-center">
          <div className="text-sm text-muted">Your saved total for this question</div>
          <div className="font-display text-3xl font-bold">{scoreOf(current)} / {totalOf(current)}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <h1 className="font-display text-4xl font-bold tracking-tight">Exam Room</h1>
      <p className="mt-2 max-w-2xl text-lg text-muted">NSC-style Section B questions with marking guidelines. Answer first, then tick each fact you gave – two marks for a full fact.</p>
      <div className="mt-5 flex flex-col gap-3 rounded-2xl border-2 border-exam/40 bg-exam/5 p-4 sm:flex-row sm:items-center">
        <Timer className="h-8 w-8 shrink-0 text-exam" />
        <div className="flex-1"><div className="font-display font-bold">Ready for the real thing? Write a timed mock paper.</div><div className="text-sm text-muted">Full or quick mocks for Paper 1 and Paper 2 – marked by you, with an NSC level and a breakdown by topic.</div></div>
        <div className="flex flex-wrap gap-2">
          <Link href="/exam/mock" className="rounded-xl bg-exam px-4 py-2 text-sm font-semibold text-white">Mock papers</Link>
          <Link href="/progress#coach" className="rounded-xl border border-line bg-surface px-4 py-2 text-sm font-semibold">Weak-spot coach</Link>
        </div>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {([1, 2] as const).map((p) => (
          <div key={p} className="rounded-2xl border border-line bg-surface p-4">
            <div className="flex items-center gap-2 font-display font-bold"><NotebookPen className="h-4 w-4 text-exam" /> {PAPER_INFO[p].title}</div>
            <div className="mt-1 flex items-center gap-1 text-xs text-muted"><Clock className="h-3.5 w-3.5" /> {PAPER_INFO[p].duration} · {PAPER_INFO[p].marks} marks · 0,8 minutes per mark</div>
            <ul className="mt-2 space-y-0.5 text-sm">{PAPER_INFO[p].sections.map((s) => <li key={s.name} className="flex justify-between gap-2"><span>{s.name}</span><strong>{s.marks}</strong></li>)}</ul>
          </div>
        ))}
      </div>
      <p className="mt-2 text-xs text-muted">From the DBE examination guidelines – check the latest version with your teacher. Section A is compulsory; in Section B you answer any TWO of the three questions; in Section C you write ONE of the two essays.</p>

      <details className="mt-4 rounded-2xl border border-line bg-surface p-4">
        <summary className="cursor-pointer font-display font-bold">📝 Exam technique: action verbs, scenarios, essays &amp; timing</summary>
        <div className="mt-3 grid gap-4 md:grid-cols-2">
          <dl className="space-y-2 text-sm">{VERBS.map(([v, d]) => <div key={v}><dt className="font-semibold">{v}</dt><dd className="text-muted">{d}</dd></div>)}</dl>
          <div className="space-y-3 text-sm">
            <div className="rounded-xl bg-surface-2 p-3"><strong>Marks ÷ 2 = facts:</strong> an 8-mark question needs four full facts. A heading or half-explained fact earns only 1 of the 2 marks.</div>
            <div className="rounded-xl bg-surface-2 p-3"><strong>Scenarios:</strong> underline the key phrases while you read. “Identify… and motivate” = name it (2) + quote the exact words (1).</div>
            <div className="rounded-xl bg-surface-2 p-3"><strong>Choices:</strong> Section B – answer any TWO of Q2, Q3 and Q4. Section C – ONE essay. If you answer more, only the first ones are marked. Start each question on a new page.</div>
            <div className="rounded-xl bg-surface-2 p-3"><strong>The essay (40 marks):</strong> introduction (2) + body with a heading for each sub-question + conclusion (2), capped at 32 for content, plus 8 for insight – LASO: Layout, Analysis, Synthesis, Originality.</div>
            <div className="rounded-xl bg-surface-2 p-3"><strong>Calculations:</strong> simple interest, compound interest and the average clause – formula first, then every step. Method marks are given even if the final answer is wrong.</div>
            <div className="rounded-xl bg-surface-2 p-3"><strong>Timing:</strong> 150 marks in 120 minutes = 0,8 minutes per mark. Section A ±20 minutes, each Section B question ±30, the essay ±30, and 10 to choose and check.</div>
          </div>
        </div>
      </details>

      <div className="mt-6 flex flex-wrap gap-2">
        <Chip active={!topic} onClick={() => setTopic(null)}>All topics</Chip>
        {liveTopics.map((t) => <Chip key={t.topic} active={topic === t.topic} onClick={() => setTopic(t.topic)}>{t.emoji} {gradeLabel(t.topic)} · {t.title}</Chip>)}
      </div>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((q) => {
          const meta = topicMeta(q.topic);
          return (
            <button key={q.id} onClick={() => { setOpen(q.id); window.scrollTo({ top: 0 }); }} className="group text-left">
              <GlowCard colour={meta.colour} className="h-full p-5 transition group-hover:-translate-y-0.5">
                <div className="flex items-center justify-between gap-2"><Chip colour={meta.colour}>{meta.emoji} {gradeLabel(meta.topic)} · {meta.title}</Chip>{done(q) ? <span className="flex items-center gap-1 text-xs font-bold text-success"><CheckCircle2 className="h-4 w-4" /> {scoreOf(q)}/{totalOf(q)}</span> : <span className="text-xs text-muted">{totalOf(q)} marks</span>}</div>
                <h2 className="mt-3 font-display text-lg leading-tight font-bold">{q.title}</h2>
                <p className="mt-1 flex items-center gap-1 text-xs text-muted"><BookOpenCheck className="h-3.5 w-3.5" /> {q.parts.length} questions · {paperShort(meta.paper)}{q.figure && " · interactive figure"}</p>
              </GlowCard>
            </button>
          );
        })}
      </div>
      {list.length === 0 && <p className="mt-10 text-center text-muted">No questions for this topic yet.</p>}
    </div>
  );
}
