import type { ModelId, Strand, Topic, WidgetName } from "@/content/types";

export interface CatalogueEntry {
  name: WidgetName;
  title: string;
  topic: Topic;
  /** Where the tool lives on the Labs page. */
  area: Strand;
  description: string;
  emoji: string;
  props?: Record<string, unknown>;
}

const model = (id: ModelId, title: string, topic: Topic, area: Strand, emoji: string, description: string): CatalogueEntry => ({ name: "model", title, topic, area, emoji, description, props: { model: id } });

/** Every interactive lab, model and tool, used by the Labs page and the docs. */
export const WIDGET_CATALOGUE: CatalogueEntry[] = [
  // Business Environments
  { name: "act-finder", title: "Act Finder", topic: "g12-legislation", area: "Business Environments", emoji: "⚖️", description: "A scenario appears – tap the Act that applies. Builds the “identify the Act” reflex for all eight Acts." },
  model("bbbee-pillars", "The five BBBEE pillars", "g12-legislation", "Business Environments", "📈", "Management control, ownership, ESD, skills development and SED – explore, then match scenarios."),
  model("consumer-rights", "Consumer rights (CPA)", "g12-legislation", "Business Environments", "🛍️", "The nine consumer rights, one at a time, with a scenario for each."),
  model("swot", "SWOT analysis", "g12-strategies", "Business Environments", "🧮", "Strengths, weaknesses, opportunities and threats – internal or external?"),
  model("porter", "Porter's Five Forces", "g12-strategies", "Business Environments", "⚔️", "The five forces of the market environment, with clues to identify each."),
  model("pestle", "PESTLE analysis", "g12-strategies", "Business Environments", "🌐", "Six macro-environment factors and how to spot them in a scenario."),
  model("strategy-types", "Types of business strategies", "g12-strategies", "Business Environments", "♟️", "Integration, intensive, diversification and defensive strategies – all twelve."),
  model("strategic-process", "Strategic management process", "g12-strategies", "Business Environments", "🔭", "The five steps from vision to control, in order."),
  model("environments", "The three business environments", "g12-sectors", "Business Environments", "🏠", "Micro, market and macro – and how much control a business has over each."),
  { name: "drill", title: "Business Environments drill", topic: "g12-strategies", area: "Business Environments", emoji: "♾️", props: { generators: ["spot-acts", "spot-strategy-types", "spot-porter-forces", "spot-pestle-factors", "spot-sectors", "spot-environments", "terms-g12-legislation", "terms-g12-strategies", "terms-g12-sectors"], title: "Business Environments drill" }, description: "Endless scenarios and Section A terms for legislation, strategies and sectors." },
  // Business Operations
  model("recruitment", "The recruitment procedure", "g12-hr", "Business Operations", "📰", "From job analysis to receiving applications – step by step."),
  model("selection", "The selection procedure", "g12-hr", "Business Operations", "📋", "Screening, shortlisting, interviews and the job offer, in order."),
  model("tqm", "The TQM elements", "g12-quality", "Business Operations", "🏅", "Five elements of total quality management and their impact on large businesses."),
  model("pdca", "The PDCA cycle", "g12-quality", "Business Operations", "♻️", "Plan, Do, Check, Act – the continuous-improvement cycle."),
  { name: "drill", title: "Business Operations drill", topic: "g12-hr", area: "Business Operations", emoji: "♾️", props: { generators: ["spot-recruitment-sources", "spot-tqm-elements", "terms-g12-hr", "terms-g12-quality"], title: "Business Operations drill" }, description: "Endless HR and quality scenarios and Section A terms." },
  // Business Ventures
  { name: "interest-lab", title: "Interest lab", topic: "g12-securities", area: "Business Ventures", emoji: "📈", description: "Simple vs compound interest year by year, with the full exam working." },
  { name: "insurance-lab", title: "Insurance lab: the average clause", topic: "g12-insurance", area: "Business Ventures", emoji: "🛡️", description: "Under-insurance, over-insurance and who pays for the loss – with the calculation." },
  { name: "ownership-lab", title: "Forms of ownership: compare two", topic: "g12-ownership", area: "Business Ventures", emoji: "🏢", description: "Compare any two forms on capital, taxation, management, legislation and division of profits." },
  model("leadership-styles", "Leadership styles", "g12-leadership", "Business Ventures", "🧭", "Democratic, autocratic, laissez-faire, charismatic and transactional – when each one works."),
  model("insurance-principles", "Principles of insurance", "g12-insurance", "Business Ventures", "🔐", "Indemnification, security, utmost good faith and insurable interest."),
  { name: "drill", title: "Investment & insurance calculations", topic: "g12-securities", area: "Business Ventures", emoji: "🧮", props: { generators: ["simple-interest", "compound-interest", "interest-difference", "average-clause", "under-over-insured"], title: "Investment & insurance calculations" }, description: "Fresh simple-interest, compound-interest and average-clause calculations every time." },
  { name: "drill", title: "Business Ventures drill", topic: "g12-leadership", area: "Business Ventures", emoji: "♾️", props: { generators: ["spot-leadership", "spot-insurance-principles", "spot-ownership-forms", "spot-visual-aids", "terms-g12-leadership", "terms-g12-securities", "terms-g12-insurance", "terms-g12-ownership", "terms-g12-presentation"], title: "Business Ventures drill" }, description: "Endless scenarios and Section A terms for leadership, investment, insurance, ownership and presentation." },
  // Business Roles
  { name: "force-field-lab", title: "Force-field analysis lab", topic: "g12-creative", area: "Business Roles", emoji: "⚖️", description: "Score the driving and restraining forces of a change and see which side wins." },
  model("problem-solving", "The problem-solving steps", "g12-creative", "Business Roles", "💡", "Eight steps from identifying the problem to evaluating the solution."),
  model("triple-bottom-line", "The triple bottom line", "g12-csr", "Business Roles", "🌱", "Profit, people and planet – with examples of each."),
  model("team-stages", "Stages of team development", "g12-teams", "Business Roles", "👥", "Forming, storming, norming, performing and adjourning."),
  { name: "drill", title: "Business Roles drill", topic: "g12-teams", area: "Business Roles", emoji: "♾️", props: { generators: ["spot-unethical-practices", "spot-problem-solving-techniques", "spot-triple-bottom-line", "spot-human-rights", "spot-team-stages", "terms-g12-ethics", "terms-g12-creative", "terms-g12-csr", "terms-g12-rights", "terms-g12-teams"], title: "Business Roles drill" }, description: "Endless scenarios and Section A terms for ethics, creative thinking, CSR, human rights and teams." },
  // Exam skills
  { name: "essay-planner", title: "Essay planner", topic: "skills-exam", area: "Exam Skills", emoji: "✍️", description: "Build a 40-mark Section C essay one step at a time and see how content and LASO marks add up." },
  { name: "paper-planner", title: "Paper planner", topic: "skills-exam", area: "Exam Skills", emoji: "⏱️", description: "Choose your questions and get a minute-by-minute plan for the two hours." },
  model("laso", "LASO – the insight marks", "skills-exam", "Exam Skills", "🌟", "Layout, analysis, synthesis and originality: the eight marks most learners leave behind."),
];
