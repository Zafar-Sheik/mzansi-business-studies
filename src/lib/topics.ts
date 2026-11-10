import type { Grade, Paper, Strand, Topic } from "@/content/types";

/** Every main topic has ONE colour across the whole site (see docs/06-design-system.md). */
export const STRANDS: { strand: Strand; colour: string; emoji: string; slug: string; short: string; blurb: string }[] = [
  { strand: "Business Environments", colour: "var(--t-diversity)", emoji: "🌍", slug: "environments", short: "Environments", blurb: "The laws every business must obey, the strategies a business uses to respond to challenges, and the three sectors and environments it works in." },
  { strand: "Business Operations", colour: "var(--t-energy)", emoji: "⚙️", slug: "operations", short: "Operations", blurb: "The human resources function – from recruitment to the employment contract – and quality of performance in all eight business functions." },
  { strand: "Business Ventures", colour: "var(--t-cell)", emoji: "🚀", slug: "ventures", short: "Ventures", blurb: "Management and leadership, investing and the JSE, insurance, forms of ownership, and presenting business information." },
  { strand: "Business Roles", colour: "var(--t-body)", emoji: "🤝", slug: "roles", short: "Roles", blurb: "Ethics and professionalism, creative thinking, social responsibility, human rights and diversity, teams and conflict management." },
  { strand: "Exam Skills", colour: "var(--t-skills)", emoji: "🎯", slug: "skills", short: "Skills", blurb: "How the two papers work, what every action verb wants, how to answer Section B, and how to write a 40-mark essay with LASO." },
];

export interface TopicMeta {
  topic: Topic;
  grade: Grade;
  strand: Strand;
  title: string;
  emoji: string;
  slug: string;
  blurb: string;
  colour: string;
  /** 1 or 2 for the NSC papers, 3 for exam skills used in both papers, 0 for topics that are not examined. */
  paper: Paper;
}

const T = (topic: Topic, strand: Strand, paper: Paper, title: string, emoji: string, blurb: string): TopicMeta => {
  const s = STRANDS.find((x) => x.strand === strand)!;
  return { topic, grade: 12, strand, title, emoji, slug: topic, blurb, colour: s.colour, paper };
};

/** All CAPS Grade 12 Business Studies topics (in paper order), then exam skills. */
export const TOPICS: TopicMeta[] = [
  // ------------------------------------------------------------- Paper 1: Business Environments
  T("g12-legislation", "Business Environments", 1, "Impact of Recent Legislation", "⚖️", "The SDA, LRA, EEA, BCEA, COIDA, BBBEE, NCA and CPA: purpose, impact on businesses, discriminatory actions, penalties and how to comply."),
  T("g12-strategies", "Business Environments", 1, "Business Strategies", "♟️", "SWOT, Porter's Five Forces and PESTLE, the strategic management process, the types of business strategies and how to evaluate a strategy."),
  T("g12-sectors", "Business Environments", 1, "Business Sectors & Environments", "🏭", "The primary, secondary and tertiary sectors, the micro, market and macro environments, and how much control a business has over each."),
  // ------------------------------------------------------------- Paper 1: Business Operations
  T("g12-hr", "Business Operations", 1, "Human Resources Function", "🧑‍💼", "Job analysis, recruitment, selection, interviews, employment contracts, induction, placement, salaries, fringe benefits and HR legislation."),
  T("g12-quality", "Business Operations", 1, "Quality of Performance", "🏅", "Quality control and assurance, quality indicators of the eight business functions, TQM elements, PDCA and the cost of quality."),
  // ------------------------------------------------------------- Paper 2: Business Ventures
  T("g12-leadership", "Business Ventures", 2, "Management & Leadership", "🧭", "Management versus leadership, the five leadership styles, leadership theories and the role of personal attitude in successful leadership."),
  T("g12-securities", "Business Ventures", 2, "Investment: Securities", "📈", "Factors to consider when investing, types of investments, shares and the JSE, and simple and compound interest calculations."),
  T("g12-insurance", "Business Ventures", 2, "Investment: Insurance", "🛡️", "Insurance versus assurance, insurable and non-insurable risks, the principles of insurance, the average clause, and compulsory insurance."),
  T("g12-ownership", "Business Ventures", 2, "Forms of Ownership", "🏢", "How each form of ownership – from sole trader to public company – contributes to the success or failure of a business."),
  T("g12-presentation", "Business Ventures", 2, "Presentation & Data Response", "📊", "Preparing and delivering a presentation, visual aids, handling feedback in a non-aggressive way, and improving the next presentation."),
  // ------------------------------------------------------------- Paper 2: Business Roles
  T("g12-ethics", "Business Roles", 2, "Ethics & Professionalism", "🧑‍⚖️", "Ethical and professional behaviour, the King Code principles, and how to deal with unethical and unprofessional business practices."),
  T("g12-creative", "Business Roles", 2, "Creative Thinking & Problem-Solving", "💡", "Creative thinking in the workplace, problem-solving versus decision-making, the problem-solving steps and techniques such as Delphi and force-field analysis."),
  T("g12-csr", "Business Roles", 2, "Social Responsibility, CSR & CSI", "🌱", "Social responsibility and the triple bottom line, CSR and CSI, their impact on business and communities, and socio-economic issues."),
  T("g12-rights", "Business Roles", 2, "Human Rights, Inclusivity & Environment", "✊", "Human rights in the workplace, economic, social and cultural rights, diversity issues, and health, safety and the environment."),
  T("g12-teams", "Business Roles", 2, "Team Performance & Conflict Management", "👥", "Criteria for successful teams, the stages of team development, causes of conflict, handling conflict, grievances and difficult people."),
  // ------------------------------------------------------------- Exam skills
  T("skills-exam", "Exam Skills", 3, "Exam Technique", "🎯", "The structure of both papers, timing, action verbs, answering Section B, and writing Section C essays with LASO for full insight marks."),
];

export function topicMeta(t: Topic): TopicMeta {
  return TOPICS.find((x) => x.topic === t)!;
}

export function strandMeta(s: Strand) {
  return STRANDS.find((x) => x.strand === s)!;
}

/** True for topics that are not examined (none at the moment – kept for the shared page components). */
export const isLife = (t: Topic) => topicMeta(t).paper === 0;

export function paperLabel(p: Paper) {
  return p === 1 ? "Paper 1" : p === 2 ? "Paper 2" : p === 3 ? "Paper 1 & 2 · exam skills" : "Not examined";
}

export function paperShort(p: Paper) {
  return p === 0 ? "For life" : p === 3 ? "Both papers" : `Paper ${p}`;
}

/** Short label used on chips, e.g. "P1 · Business Strategies". */
export function topicLabel(t: Topic) {
  const m = topicMeta(t);
  return `${gradeLabel(t)} · ${m.title}`;
}

/** Short paper label: "P1", "P2" or "P1 & 2" for exam skills. (The app is Grade 12 only, so the paper is the useful tag.) */
export function gradeLabel(t: Topic) {
  const m = topicMeta(t);
  return m.paper === 3 ? "P1 & 2" : m.paper === 0 ? m.strand : `P${m.paper}`;
}

/** Does this topic belong in a paper filter? Exam skills show in both papers. */
export const inPaper = (t: Topic, p: 1 | 2 | null) => !p || topicMeta(t).paper === p || topicMeta(t).paper === 3;

export interface PaperSpec {
  title: string;
  duration: string;
  marks: number;
  sections: { name: string; marks: number }[];
}

/**
 * The two NSC Business Studies papers (DBE examination guidelines, 2021
 * onwards). Each paper is 150 marks in 2 hours:
 * Section A (30, compulsory) – multiple choice, choose the word, matching.
 * Section B (80) – three 40-mark questions, answer any TWO.
 * Section C (40) – two essay questions, answer any ONE.
 * Always check the latest guidelines and your school's Annual Teaching Plan.
 */
export const PAPER_INFO: Record<1 | 2, PaperSpec> = {
  1: {
    title: "Paper 1 – Business Environments & Business Operations",
    duration: "2 hours",
    marks: 150,
    sections: [
      { name: "Section A – compulsory short questions (Q1)", marks: 30 },
      { name: "Section B – choose TWO of Q2 (Environments), Q3 (Operations), Q4 (Miscellaneous)", marks: 80 },
      { name: "Section C – choose ONE essay: Q5 (Environments) or Q6 (Operations)", marks: 40 },
    ],
  },
  2: {
    title: "Paper 2 – Business Ventures & Business Roles",
    duration: "2 hours",
    marks: 150,
    sections: [
      { name: "Section A – compulsory short questions (Q1)", marks: 30 },
      { name: "Section B – choose TWO of Q2 (Ventures), Q3 (Roles), Q4 (Miscellaneous)", marks: 80 },
      { name: "Section C – choose ONE essay: Q5 (Ventures) or Q6 (Roles)", marks: 40 },
    ],
  },
};

/** Topic groups for pickers: the two papers, then exam skills. */
export const TOPIC_GROUPS: { label: string; short: string; has: (t: TopicMeta) => boolean }[] = [
  { label: "Paper 1", short: "Paper 1 only", has: (t) => t.paper === 1 },
  { label: "Paper 2", short: "Paper 2 only", has: (t) => t.paper === 2 },
  { label: "Exam skills", short: "Exam skills only", has: (t) => t.paper === 3 },
];
