/** Small helpers that keep the lesson files short and readable. They only build plain data. */
import type { Block, CalloutVariant, ExamPart, ModelId, QuizQuestion } from "../types";

export const ENV = "var(--t-diversity)";
export const OPS = "var(--t-energy)";
export const VEN = "var(--t-cell)";
export const ROL = "var(--t-body)";
export const SKL = "var(--t-skills)";

export const text = (md: string): Block => ({ type: "text", md });
export const note = (variant: CalloutVariant, title: string, md: string): Block => ({ type: "callout", variant, title, md });
export const points = (...p: string[]): Block => ({ type: "keypoints", points: p });
export const table = (headers: string[], rows: string[][], caption?: string): Block => ({ type: "table", headers, rows, caption });
export const model = (id: ModelId, mode: "explore" | "quiz" = "explore"): Block => ({ type: "model", model: id, mode });
export const quiz = (id: string, ...questions: QuizQuestion[]): Block => ({ type: "quiz", id, questions });
export const mc = (q: string, options: string[], answer: number, explain: string): QuizQuestion => ({ q, options, answer, explain });
export const order = (id: string, title: string, steps: string[], explain: string): Block => ({ type: "sequence", id, title, steps, explain });
export const match = (id: string, title: string, pairs: [string, string][]): Block => ({ type: "match", id, title, pairs: pairs.map(([left, right]) => ({ left, right })) });
export const drill = (title: string, ...generators: string[]): Block => ({ type: "widget", widget: "drill", props: { title, generators } });
export const exam = (id: string, q: string, marks: number, memo: string[], extra: Partial<ExamPart> = {}): Block => ({ type: "exam", question: { id, q, marks, memo, ...extra } });

/** Sort cards into groups: `groups` maps each bucket to its cards. */
export const sort = (id: string, title: string, colour: string, groups: Record<string, string[]>): Block => ({
  type: "widget",
  widget: "sorter",
  props: { id, title, colour, buckets: Object.keys(groups), items: Object.entries(groups).flatMap(([bucket, items]) => items.map((t) => ({ text: t, bucket }))) },
});

/** A brain break – short, physical, and guilt-free. */
export const brk = (md: string): Block => ({ type: "callout", variant: "break", title: "Brain break", md });
