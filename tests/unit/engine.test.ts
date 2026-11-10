/** The Business Studies answer checker, the calculation helpers and the question generators. */
import { describe, expect, it } from "vitest";
import { ACTS, fill, SCENARIO_BANKS } from "@/lib/biz/banks";
import { checkAnswer, inferKind } from "@/lib/biz/check";
import { averageClause, compoundAmount, GENERATORS, rand, simpleInterest, TERM_BANK } from "@/lib/biz/generators";
import { ACT_CARDS } from "@/components/widgets/act-finder";
import { ESSAYS } from "@/components/widgets/essays";
import { MODELS } from "@/components/widgets/models";
import { FORMS } from "@/components/widgets/ownership-lab";

describe("checkAnswer", () => {
  it("words ignore case, spaces, hyphens, a leading article and end punctuation", () => {
    expect(checkAnswer("  Induction. ", { answer: "induction", kind: "word" }).ok).toBe(true);
    expect(checkAnswer("the average clause", { answer: "average clause", kind: "word" }).ok).toBe(true);
    expect(checkAnswer("LRA", { answer: "Labour Relations Act | LRA", kind: "word" }).ok).toBe(true);
    expect(checkAnswer("labour relations act", { answer: "Labour Relations Act | LRA", kind: "word" }).ok).toBe(true);
    expect(checkAnswer("laissez faire", { answer: "laissez-faire", kind: "word" }).ok).toBe(true);
    expect(checkAnswer("strength", { answer: "strengths", kind: "word" }).ok).toBe(true);
    expect(checkAnswer("recruitmant", { answer: "recruitment", kind: "word" }).message).toMatch(/spelling/);
    expect(checkAnswer("selection", { answer: "recruitment", kind: "word" }).ok).toBe(false);
  });

  it("numbers accept rand signs, spaces as thousands separators, decimal commas, % and a tolerance", () => {
    expect(checkAnswer("R2 160", { answer: "2160", kind: "number" }).ok).toBe(true);
    expect(checkAnswer("R 10 360,23", { answer: "10360.23", kind: "number" }).ok).toBe(true);
    expect(checkAnswer("10360.2", { answer: "10360.23", kind: "number", tol: 1 }).ok).toBe(true);
    expect(checkAnswer("45 hours", { answer: "45", kind: "number" }).ok).toBe(true);
    expect(checkAnswer("8%", { answer: "8", kind: "number" }).ok).toBe(true);
    expect(checkAnswer("150000", { answer: "150000", kind: "number" }).ok).toBe(true);
    expect(checkAnswer("15000", { answer: "150000", kind: "number" }).message).toMatch(/decimal|rands/);
    expect(checkAnswer("forty-five", { answer: "45", kind: "number" }).unreadable).toBe(true);
  });

  it("lists ignore order", () => {
    expect(checkAnswer("storming, forming", { answer: "forming, storming", kind: "list" }).ok).toBe(true);
    expect(checkAnswer("profit and people and planet", { answer: "profit, people, planet", kind: "list" }).ok).toBe(true);
    expect(checkAnswer("forming", { answer: "forming, storming", kind: "list" }).message).toMatch(/2 items/);
  });

  it("guesses the kind of answer", () => {
    expect(inferKind("45")).toBe("number");
    expect(inferKind("R12 500")).toBe("number");
    expect(inferKind("market penetration")).toBe("word");
  });

  it("empty input is unreadable, never correct", () => {
    expect(checkAnswer("   ", { answer: "x", kind: "word" }).ok).toBe(false);
  });
});

describe("calculations", () => {
  it("simple and compound interest", () => {
    expect(simpleInterest(8000, 9, 3)).toBe(2160);
    expect(compoundAmount(8000, 9, 3)).toBe(10360.23);
    expect(compoundAmount(10000, 10, 2)).toBe(12100);
    expect(compoundAmount(5000, 8, 1)).toBe(5000 + simpleInterest(5000, 8, 1));
  });
  it("the average clause only applies to under-insurance", () => {
    expect(averageClause(600000, 800000, 200000)).toBe(150000);
    expect(averageClause(800000, 1000000, 300000)).toBe(240000);
    expect(averageClause(700000, 500000, 500000)).toBe(500000);
    expect(averageClause(500000, 500000, 80000)).toBe(80000);
  });
  it("formats rands the South African way", () => {
    expect(rand(12500)).toBe("R12 500");
    expect(rand(1250.5)).toBe("R1 250,50");
    expect(rand(1000000)).toBe("R1 000 000");
  });
});

describe("banks, models and labs", () => {
  it("scenario banks are well-formed", () => {
    expect(new Set(SCENARIO_BANKS.map((b) => b.id)).size).toBe(SCENARIO_BANKS.length);
    for (const b of SCENARIO_BANKS) {
      expect(b.items.length, b.id).toBeGreaterThanOrEqual(4);
      expect(new Set(b.items.map((i) => i.s)).size, `${b.id}: duplicate scenario`).toBe(b.items.length);
      for (const i of b.items) {
        expect(fill(i.s, "Mzansi Traders", "Thabo"), b.id).not.toMatch(/\{|\}/);
        expect(i.why.length, i.s).toBeGreaterThan(15);
      }
    }
  });
  it("every Act scenario maps to exactly one of the eight Acts", () => {
    expect(ACT_CARDS.length).toBe(8);
    for (const i of ACTS.items) {
      const alts = i.a.split(" | ");
      expect(ACT_CARDS.filter((a) => alts.some((x) => x === a.short || x === a.name || x === `${a.short} Act`)).length, i.s).toBe(1);
    }
    for (const a of ACT_CARDS) expect(ACTS.items.some((i) => i.a.split(" | ").some((x) => x === a.short || x === a.name || x === `${a.short} Act`)), a.short).toBe(true);
  });
  it("models have unique, explained parts with a clue each", () => {
    for (const [id, m] of Object.entries(MODELS)) {
      expect(m.parts.length, id).toBeGreaterThanOrEqual(3);
      expect(new Set(m.parts.map((p) => p.id)).size, id).toBe(m.parts.length);
      expect(new Set(m.parts.map((p) => p.name)).size, id).toBe(m.parts.length);
      for (const p of m.parts) {
        expect(p.what.length, `${id}/${p.id}`).toBeGreaterThan(30);
        expect(p.clue.length, `${id}/${p.id}`).toBeGreaterThan(20);
      }
    }
  });
  it("essay plans can reach full marks and respect the sub-maximums", () => {
    for (const e of ESSAYS) {
      expect(e.sections.length, e.id).toBeGreaterThanOrEqual(3);
      expect(e.intro.length, e.id).toBeGreaterThanOrEqual(2);
      const available = 2 + e.sections.reduce((a, s) => a + s.max, 0) + 2;
      expect(available, e.id).toBeGreaterThanOrEqual(40);
      for (const s of e.sections) expect(s.facts.length * 2, `${e.id}: ${s.heading}`).toBeGreaterThanOrEqual(s.max);
    }
  });
  it("there are eight forms of ownership with both sides of the story", () => {
    expect(FORMS.length).toBe(8);
    for (const f of FORMS) {
      expect(f.plus.length, f.id).toBeGreaterThanOrEqual(3);
      expect(f.minus.length, f.id).toBeGreaterThanOrEqual(3);
    }
  });
  it("term banks have enough distinct descriptions per topic", () => {
    for (const [topic, bank] of Object.entries(TERM_BANK)) {
      expect(bank.length, topic).toBeGreaterThanOrEqual(10);
      expect(new Set(bank.map(([d]) => d)).size, topic).toBe(bank.length);
    }
  });
});

describe("generators", () => {
  it("there are at least 30, with unique ids", () => {
    expect(GENERATORS.length).toBeGreaterThanOrEqual(30);
    expect(new Set(GENERATORS.map((g) => g.id)).size).toBe(GENERATORS.length);
  });

  for (const g of GENERATORS) {
    it(`${g.id}: 150 problems, every memo alternative passes its own checker`, () => {
      for (let seed = 0; seed < 150; seed++) {
        const p = g.make(seed);
        expect(p.q.length).toBeGreaterThan(5);
        expect(p.solution.length).toBeGreaterThan(5);
        expect(p.q).not.toMatch(/undefined|NaN|\{|\}/);
        expect(p.solution).not.toMatch(/undefined|NaN/);
        expect(p.answer).not.toMatch(/undefined|NaN|\{|\}/);
        for (const alt of p.answer.split(" | ")) {
          const r = checkAnswer(alt, p);
          expect(r.ok, `${g.id}#${seed}: ${alt} (${r.message})`).toBe(true);
        }
        // Deterministic: the same seed makes the same problem.
        expect(g.make(seed).answer).toBe(p.answer);
      }
    });
  }

  it("produce variety", () => {
    for (const g of GENERATORS) {
      const answers = new Set(Array.from({ length: 80 }, (_, s) => g.make(s).answer));
      // Some "identify it" generators have only a few possible answers (e.g. the three sectors).
      expect(answers.size, g.id).toBeGreaterThanOrEqual(2);
    }
  });
});
