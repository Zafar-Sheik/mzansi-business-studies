/**
 * Content model for lessons. Lessons are plain TypeScript data so that they
 * are type-checked and can be tested automatically: every quiz answer, every
 * practice answer (it must pass its own checker) and every exam memo is
 * validated by the test-suite.
 */

export type Grade = 12;

/**
 * Knowledge areas. The first four are the CAPS Business Studies main topics;
 * the last is our own: exam technique for both papers.
 */
export type Strand =
  | "Business Environments"
  | "Business Operations"
  | "Business Ventures"
  | "Business Roles"
  | "Exam Skills";

/**
 * 1 = Paper 1 (Business Environments + Business Operations),
 * 2 = Paper 2 (Business Ventures + Business Roles),
 * 3 = exam technique used in both papers, 0 = not examined (unused for now).
 */
export type Paper = 0 | 1 | 2 | 3;

/** A CAPS Grade 12 topic or the exam-skills topic (see src/lib/topics.ts). */
export type Topic =
  // Paper 1 – Business Environments
  | "g12-legislation"
  | "g12-strategies"
  | "g12-sectors"
  // Paper 1 – Business Operations
  | "g12-hr"
  | "g12-quality"
  // Paper 2 – Business Ventures
  | "g12-leadership"
  | "g12-securities"
  | "g12-insurance"
  | "g12-ownership"
  | "g12-presentation"
  // Paper 2 – Business Roles
  | "g12-ethics"
  | "g12-creative"
  | "g12-csr"
  | "g12-rights"
  | "g12-teams"
  // Both papers
  | "skills-exam";

export type CalloutVariant = "key" | "tip" | "mistake" | "memory" | "exam" | "break" | "real-world" | "safety" | "life";

export interface QuizQuestion {
  q: string;
  options: string[];
  answer: number;
  explain: string;
}

export interface Term {
  term: string;
  def: string;
}

/**
 * How a typed answer is checked (see src/lib/biz/check.ts):
 * - word:     one word or short phrase; case, extra spaces and end punctuation ignored. Alternatives separated by " | "
 * - sentence: a short phrase or sentence; case and punctuation ignored, word order counts
 * - number:   a number (decimal comma or point; % and units ignored); `tol` sets an allowed error
 * - list:     several items in any order, separated by commas (e.g. "forming, storming")
 * Money counts as a number: "R1 250,50", "1250.5" and "R 1 250,50" all read the same.
 */
export type AnswerKind = "word" | "sentence" | "number" | "list";

export interface PracticeProblem {
  q: string;
  /** The memo answer. Alternatives are separated by " | " (e.g. `ovary | ovaries`). */
  answer: string;
  kind?: AnswerKind;
  /** For number answers: the largest difference that still counts as right (e.g. 0.5). */
  tol?: number;
  hint?: string;
  /** Full explanation (markdown), shown after an attempt. */
  solution: string;
}

export interface WorkedStep {
  md: string;
  /** Why this step works – the bit learners usually skip. */
  why?: string;
}

export type Block =
  | { type: "text"; md: string }
  | { type: "callout"; variant: CalloutVariant; title?: string; md: string }
  | { type: "keypoints"; points: string[] }
  | { type: "flashcards"; cards: { front: string; back: string }[] }
  /** Renders the lesson's own key terms as flashcards. */
  | { type: "terms" }
  | { type: "quiz"; id: string; questions: QuizQuestion[] }
  | { type: "widget"; widget: WidgetName; props?: Record<string, unknown> }
  /** Put the steps in order (a procedure, a process, the stages of a team). */
  | { type: "sequence"; id: string; title: string; steps: string[]; explain: string }
  /** Match each item to its partner (Act ↔ purpose, style ↔ description…). */
  | { type: "match"; id: string; title: string; pairs: { left: string; right: string }[] }
  | { type: "table"; headers: string[]; rows: string[][]; caption?: string }
  /** A worked example revealed one step at a time ("predict, then reveal"). */
  | { type: "worked"; title: string; problem: string; steps: WorkedStep[] }
  /** Typed-answer practice with hints, instant checking and full explanations. */
  | { type: "practice"; id: string; title?: string; problems: PracticeProblem[] }
  /** A short exam-style question with a memo the learner self-marks against. */
  | { type: "exam"; question: ExamPart & { id: string } }
  /** A business model or framework you can tap through, then get quizzed on with scenarios. */
  | { type: "model"; model: ModelId; mode?: "explore" | "quiz" };

/** Tappable models and frameworks (see src/components/widgets/models.ts). */
export type ModelId =
  | "swot"
  | "porter"
  | "pestle"
  | "strategic-process"
  | "strategy-types"
  | "environments"
  | "recruitment"
  | "selection"
  | "tqm"
  | "pdca"
  | "leadership-styles"
  | "insurance-principles"
  | "problem-solving"
  | "triple-bottom-line"
  | "team-stages"
  | "bbbee-pillars"
  | "consumer-rights"
  | "laso";

export type WidgetName =
  | "sorter"
  | "drill"
  | "model"
  | "interest-lab"
  | "insurance-lab"
  | "force-field-lab"
  | "ownership-lab"
  | "essay-planner"
  | "act-finder"
  | "paper-planner";

export interface Chunk {
  id: string;
  title: string;
  /** Rough reading/doing time in minutes – chunks are kept short (2–10 min). */
  minutes: number;
  blocks: Block[];
}

export interface Lesson {
  slug: string;
  topic: Topic;
  order: number;
  title: string;
  tagline: string;
  emoji: string;
  /** CAPS reference. */
  caps: string;
  objectives: string[];
  /** Learning style tags used in docs: visual, auditory, read-write, kinaesthetic */
  styles: ("visual" | "auditory" | "read-write" | "kinaesthetic")[];
  xp: number;
  /** Key concepts – feed the lesson flashcards, the global deck and the games. */
  terms: Term[];
  chunks: Chunk[];
}

/** Cognitive levels (grouped) used in the DBE Business Studies examination guidelines. */
export type CognitiveLevel = "recall" | "understanding" | "applying" | "evaluating";

export interface ExamPart {
  q: string;
  marks: number;
  /**
   * The facts in the marking guideline. Each line is worth `per` marks.
   * There may be more lines than the question needs ("any FOUR"), exactly
   * like an NSC marking guideline – the score is capped at `marks`.
   */
  memo: string[];
  /** Marks per memo line: 2 for a full fact (√√), 1 for names, quotes and sub-marks. Defaults to 2. */
  per?: 1 | 2;
  level?: CognitiveLevel;
}

/** Marks earned for one ticked memo line. */
export const tickValue = (p: Pick<ExamPart, "per">) => p.per ?? 2;

export interface ExamQuestion {
  id: string;
  topic: Topic;
  title: string;
  /** Stimulus: a scenario or case study, a table or a statement. */
  source?: string;
  /** Optional interactive figure (a model or lab) shown with the source. */
  figure?: { widget: WidgetName; props?: Record<string, unknown> };
  /** The lesson to revise for this question. */
  lesson?: string;
  parts: ExamPart[];
}
