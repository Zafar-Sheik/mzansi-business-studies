/**
 * Mock exam papers, assembled from the Exam Room questions. A full mock is
 * about 150 marks – the length of a real paper – and a quick mock about 50.
 * Both are a seeded mix that touches as many topics of the paper as possible.
 */
import type { ExamQuestion, Grade, Paper, Topic } from "@/content/types";
import { TOPICS, topicMeta } from "./topics";
import { seededRandom } from "./utils";

/** NSC Business Studies papers are 150 marks in 2 hours – 0,8 minutes per mark. */
export const MINUTES_PER_MARK = 0.8;
export const QUICK_TARGET = 50;
export const FULL_TARGET = 150;
export const MOCK_IDS = ["p1", "p2"] as const;

export type MockId = (typeof MOCK_IDS)[number];

export interface MockPaper {
  id: MockId;
  grade: Grade;
  paper: Paper;
  title: string;
  quick: boolean;
  seed?: number;
  questions: ExamQuestion[];
  marks: number;
  minutes: number;
}

export const questionMarks = (q: ExamQuestion) => q.parts.reduce((s, p) => s + p.marks, 0);
export const partId = (q: ExamQuestion, k: number) => `${q.id}-${k}`;

export function parseMockId(id: string): { grade: Grade; paper: Paper } | null {
  const m = /^p([12])$/.exec(id);
  return m ? { grade: 12, paper: Number(m[1]) as Paper } : null;
}

export function mockTitle(id: MockId, quick = false) {
  const { paper } = parseMockId(id)!;
  return `Grade 12 Paper ${paper}${quick ? " – quick mock" : " – full mock"}`;
}

const topicOrder = (t: Topic) => TOPICS.findIndex((x) => x.topic === t);

/**
 * Questions for a paper, in CAPS topic order. Exam-skills questions apply to
 * both papers, so they are dealt out across the two mocks.
 */
export function paperQuestions(all: ExamQuestion[], id: MockId): ExamQuestion[] {
  const { paper } = parseMockId(id)!;
  const skills = all.filter((q) => topicMeta(q.topic).paper === 3);
  const slot = MOCK_IDS.indexOf(id);
  return all
    .filter((q) => {
      const m = topicMeta(q.topic);
      if (m.paper === 3) return skills.indexOf(q) % MOCK_IDS.length === slot;
      return m.paper === paper;
    })
    .map((q, i) => ({ q, i }))
    .sort((a, b) => topicOrder(a.q.topic) - topicOrder(b.q.topic) || a.i - b.i)
    .map((x) => x.q);
}

export function buildMock(all: ExamQuestion[], id: MockId, opts: { quick?: boolean; seed?: number } = {}): MockPaper {
  const { grade, paper } = parseMockId(id)!;
  const pool = paperQuestions(all, id);
  let questions = pool;
  const target = opts.quick ? QUICK_TARGET : FULL_TARGET;
  {
    const r = seededRandom(`${id}-${opts.quick ? "quick" : "full"}-${opts.seed ?? 0}`);
    const byTopic = new Map<Topic, ExamQuestion[]>();
    for (const q of pool) byTopic.set(q.topic, [...(byTopic.get(q.topic) ?? []), q]);
    // Shuffle within each topic, then deal one question per topic in a shuffled topic order.
    const decks = [...byTopic.values()].map((qs) => [...qs].sort(() => r() - 0.5));
    decks.sort(() => r() - 0.5);
    const picked: ExamQuestion[] = [];
    let marks = 0;
    for (let round = 0; marks < target && decks.some((d) => d.length > round); round++) {
      for (const d of decks) {
        if (marks >= target) break;
        const q = d[round];
        if (!q) continue;
        picked.push(q);
        marks += questionMarks(q);
      }
    }
    questions = pool.filter((q) => picked.includes(q));
  }
  const marks = questions.reduce((s, q) => s + questionMarks(q), 0);
  return { id, grade, paper, title: mockTitle(id, opts.quick), quick: Boolean(opts.quick), seed: opts.quick ? opts.seed ?? 0 : undefined, questions, marks, minutes: Math.round(marks * MINUTES_PER_MARK) };
}

/** NSC achievement levels (rating codes 1–7). */
export const ACHIEVEMENT = [
  { min: 80, level: 7, label: "Outstanding achievement" },
  { min: 70, level: 6, label: "Meritorious achievement" },
  { min: 60, level: 5, label: "Substantial achievement" },
  { min: 50, level: 4, label: "Adequate achievement" },
  { min: 40, level: 3, label: "Moderate achievement" },
  { min: 30, level: 2, label: "Elementary achievement" },
  { min: 0, level: 1, label: "Not achieved" },
] as const;

export function achievement(pct: number) {
  return ACHIEVEMENT.find((a) => pct >= a.min) ?? ACHIEVEMENT[ACHIEVEMENT.length - 1];
}

/** Score per topic from the marks awarded to each part (keyed by partId). */
export function topicBreakdown(questions: ExamQuestion[], scores: Record<string, number>): { topic: Topic; score: number; total: number }[] {
  const out = new Map<Topic, { score: number; total: number }>();
  for (const q of questions) {
    const t = out.get(q.topic) ?? { score: 0, total: 0 };
    q.parts.forEach((p, k) => {
      t.score += Math.min(p.marks, scores[partId(q, k)] ?? 0);
      t.total += p.marks;
    });
    out.set(q.topic, t);
  }
  return [...out.entries()].map(([topic, v]) => ({ topic, ...v }));
}
