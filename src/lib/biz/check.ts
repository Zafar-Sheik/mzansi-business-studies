import type { AnswerKind, PracticeProblem } from "@/content/types";

export interface CheckResult {
  ok: boolean;
  /** Friendly, specific feedback ("check your spelling", "check your rounding"…). */
  message?: string;
  /** Could not read the input at all. */
  unreadable?: boolean;
}

type Spec = Pick<PracticeProblem, "answer" | "kind" | "tol">;

/** Memo alternatives are separated by " | ". */
export const alternatives = (answer: string) => answer.split(/\s\|\s/).map((a) => a.trim()).filter(Boolean);

/** Guess the answer kind from the memo answer when a problem doesn't say. */
export function inferKind(answer: string): AnswerKind {
  const a = alternatives(answer)[0] ?? "";
  if (/^R?\s?-?\d[\d ]*([.,]\d+)?\s*%?$/.test(a)) return "number";
  return a.trim().split(/\s+/).length > 3 ? "sentence" : "word";
}

/** Curly quotes, dashes and odd spaces typed on phones become their plain versions. */
export function plain(s: string): string {
  return s
    .replace(/[‘’ʼ`´]/g, "'")
    .replace(/[“”„]/g, '"')
    .replace(/[‐-―−]/g, "-")
    .replace(/[   ]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/** Words: case, spaces, hyphens and end punctuation don't matter. A leading "the"/"a" is ignored. */
export function normaliseWord(s: string): string {
  return plain(s)
    .toLowerCase()
    .replace(/^[\s"'(]+|[\s"'.,!?;:)]+$/g, "")
    .replace(/^(the|a|an) /, "")
    .replace(/\s*-\s*/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/** Phrases: case and punctuation don't matter; words and their order do. */
export function normaliseSentence(s: string): string {
  return plain(s).toLowerCase().replace(/[^\w\s]/g, " ").replace(/\s+/g, " ").trim();
}

/** Read a number typed with a decimal comma or point, spaces as thousands separators, and units or % after it. */
export function readNumber(s: string): number | null {
  const t = plain(s).replace(/(\d)\s+(?=\d{3}\b)/g, "$1");
  const m = /-?\d+(?:[.,]\d+)?/.exec(t);
  if (!m) return null;
  const n = Number(m[0].replace(",", "."));
  return Number.isFinite(n) ? n : null;
}

/** List items: split on commas, "and", semicolons or slashes; compare as a set. */
export const listItems = (s: string) =>
  plain(s)
    .split(/\s*(?:,|;|\/|\band\b|\bor\b|\s&\s)\s*/)
    .map((x) => normaliseWord(x))
    .filter(Boolean);

/** Levenshtein distance, for "check your spelling" feedback. */
export function distance(a: string, b: string): number {
  const m = a.length;
  const n = b.length;
  const d = Array.from({ length: m + 1 }, (_, i) => [i, ...Array(n).fill(0)] as number[]);
  for (let j = 1; j <= n; j++) d[0][j] = j;
  for (let i = 1; i <= m; i++) for (let j = 1; j <= n; j++) d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
  return d[m][n];
}

function sameList(input: string, memo: string): boolean {
  const a = listItems(input);
  const b = listItems(memo);
  if (a.length !== b.length) return false;
  const sorted = (xs: string[]) => [...xs].sort().join("|");
  return sorted(a) === sorted(b);
}

/** Check a typed answer against a memo answer. Never throws. */
export function checkAnswer(input: string, spec: Spec): CheckResult {
  const kind = spec.kind ?? inferKind(spec.answer);
  if (!input.trim()) return { ok: false, unreadable: true, message: "Type an answer first." };
  const alts = alternatives(spec.answer);
  try {
    switch (kind) {
      case "number": {
        const n = readNumber(input);
        if (n === null) return { ok: false, unreadable: true, message: "Type a number." };
        const tol = spec.tol ?? 1e-9;
        const targets = alts.map(readNumber).filter((x): x is number => x !== null);
        if (targets.some((t) => Math.abs(t - n) <= tol + 1e-9)) return { ok: true };
        const t = targets[0];
        if (t !== undefined && t !== 0) {
          const r = n / t;
          if ([10, 1000, 0.1, 0.001].some((k) => Math.abs(r - k) < 1e-6)) return { ok: false, message: "The digits are right but the size is off – check the rands and cents, or where the decimal comma goes." };
          if (Math.abs(r - 100) < 1e-6 || Math.abs(r - 0.01) < 1e-6) return { ok: false, message: "Check whether the answer should be a percentage or a decimal (8% = 0,08)." };
          if (Math.abs(n - t) / Math.abs(t) < 0.03) return { ok: false, message: "Very close – check your rounding." };
        }
        return { ok: false };
      }
      case "list": {
        if (alts.some((a) => sameList(input, a))) return { ok: true };
        const n = listItems(input).length;
        const want = listItems(alts[0]).length;
        if (n !== want) return { ok: false, message: `The answer has ${want} item${want > 1 ? "s" : ""} – you gave ${n}. Separate them with commas.` };
        return { ok: false };
      }
      case "sentence": {
        const got = normaliseSentence(input);
        if (alts.some((a) => normaliseSentence(a) === got)) return { ok: true };
        const best = Math.min(...alts.map((a) => distance(normaliseSentence(a), got)));
        if (best <= 3) return { ok: false, message: "Nearly there – check your spelling." };
        return { ok: false };
      }
      default: {
        const got = normaliseWord(input);
        if (alts.some((a) => normaliseWord(a) === got)) return { ok: true };
        // A plural / singular slip ("strength" for "strengths") is still the right idea.
        if (alts.some((a) => normaliseWord(a).replace(/s$/, "") === got.replace(/s$/, ""))) return { ok: true };
        const best = Math.min(...alts.map((a) => distance(normaliseWord(a), got)));
        if (best > 0 && best <= 2 && got.length > 4) return { ok: false, message: "Very close – check the spelling letter by letter. Business terms must be spelt correctly in the exam." };
        return { ok: false };
      }
    }
  } catch {
    return { ok: false, unreadable: true, message: "I couldn't read that – try typing it again." };
  }
}
