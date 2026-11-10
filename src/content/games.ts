/** Banks for the Games room: "This or That?" statements and "Who Am I?" riddles. */
import type { Topic } from "./types";

export interface DashItem {
  /** The statement shown to the learner. */
  s: string;
  /** The right choice and the decoy. */
  answer: string;
  other: string;
  why: string;
}

/** Quick two-way sorts – the classic "distinguish between" pairs of the syllabus. */
export const DASH: DashItem[] = [
  { s: "Describes the duties and responsibilities of a job", answer: "job description", other: "job specification", why: "The description is about the JOB; the specification is about the PERSON." },
  { s: "Lists the qualifications, skills and experience needed", answer: "job specification", other: "job description", why: "Specification = skills." },
  { s: "The vacancy is advertised on the staff notice board", answer: "internal recruitment", other: "external recruitment", why: "Only existing employees see it." },
  { s: "A recruitment agency finds candidates", answer: "external recruitment", other: "internal recruitment", why: "Candidates come from outside the business." },
  { s: "Workers are paid per unit produced", answer: "piecemeal", other: "time-related", why: "Piecemeal = per piece." },
  { s: "Workers are paid for the hours they work", answer: "time-related", other: "piecemeal", why: "Time-related = per hour, week or month." },
  { s: "Inspecting the final product", answer: "quality control", other: "quality assurance", why: "Control checks at the end." },
  { s: "Checks during and after production to get it right the first time", answer: "quality assurance", other: "quality control", why: "Assurance prevents faults at every stage." },
  { s: "The business has full control", answer: "micro environment", other: "macro environment", why: "The micro environment is inside the business." },
  { s: "The business has no control – it can only adapt", answer: "macro environment", other: "market environment", why: "PESTLE factors cannot be controlled." },
  { s: "Suppliers, customers and competitors", answer: "market environment", other: "micro environment", why: "The business can influence, but not control, them." },
  { s: "Skilled, loyal employees", answer: "strength", other: "opportunity", why: "Internal and positive = strength." },
  { s: "A competitor closes down", answer: "opportunity", other: "strength", why: "External and positive = opportunity." },
  { s: "Old machinery that breaks down", answer: "weakness", other: "threat", why: "Internal and negative = weakness." },
  { s: "Rising interest rates", answer: "threat", other: "weakness", why: "External and negative = threat." },
  { s: "A business takes over its supplier", answer: "backward integration", other: "forward integration", why: "Suppliers are behind you in the supply chain." },
  { s: "A business takes over its distributor", answer: "forward integration", other: "backward integration", why: "Distributors are ahead of you, closer to the consumer." },
  { s: "Existing products in a new market", answer: "market development", other: "product development", why: "The MARKET is new." },
  { s: "New products for the existing market", answer: "product development", other: "market development", why: "The PRODUCT is new." },
  { s: "Selling off an unprofitable division", answer: "divestiture", other: "liquidation", why: "Liquidation sells ALL assets and closes the business." },
  { s: "Selling all assets to pay creditors", answer: "liquidation", other: "divestiture", why: "The business closes down." },
  { s: "The leader takes all decisions alone", answer: "autocratic", other: "democratic", why: "One-way, top-down communication." },
  { s: "Employees take part in decision-making", answer: "democratic", other: "autocratic", why: "Participative, two-way communication." },
  { s: "The leader delegates and steps back", answer: "laissez-faire", other: "transactional", why: "Free reign for skilled workers." },
  { s: "Rewards and penalties are used to meet targets", answer: "transactional", other: "charismatic", why: "A transaction: performance for reward." },
  { s: "Focuses on how and when", answer: "management", other: "leadership", why: "Leadership focuses on what and why." },
  { s: "Inspires and influences people through vision", answer: "leadership", other: "management", why: "Managers administer; leaders inspire." },
  { s: "Interest is calculated on the principal amount only", answer: "simple interest", other: "compound interest", why: "Compound interest also earns interest on interest." },
  { s: "Interest is earned on interest", answer: "compound interest", other: "simple interest", why: "The amount grows every year." },
  { s: "Voting rights at the AGM; dividends vary with profit", answer: "ordinary shares", other: "preference shares", why: "Preference shares get a fixed dividend first." },
  { s: "A fixed dividend that is paid first", answer: "preference shares", other: "ordinary shares", why: "They have preference over ordinary shares." },
  { s: "Covers an event that MAY happen, like fire", answer: "insurance", other: "assurance", why: "Assurance covers an event that is certain, like death." },
  { s: "Covers an event that is certain to happen", answer: "assurance", other: "insurance", why: "Only the time is uncertain." },
  { s: "Insured for less than the market value", answer: "under-insurance", other: "over-insurance", why: "The average clause will apply." },
  { s: "Required by law, e.g. UIF", answer: "compulsory insurance", other: "non-compulsory insurance", why: "UIF, RAF and COIDA are compulsory." },
  { s: "Name ends with (Pty) Ltd", answer: "private company", other: "public company", why: "A public company's name ends with Ltd." },
  { s: "Must have at least three directors", answer: "public company", other: "private company", why: "A private company needs only one." },
  { s: "Owners are jointly and severally liable", answer: "partnership", other: "private company", why: "Partners have unlimited liability." },
  { s: "Limited liability and continuity", answer: "company", other: "sole trader", why: "A company is a separate legal person." },
  { s: "The way a business operates ethically every day", answer: "CSR", other: "CSI", why: "CSI is the projects it funds in communities." },
  { s: "Funding a school library", answer: "CSI", other: "CSR", why: "An investment in a community project." },
  { s: "Often done by one person or senior manager", answer: "decision-making", other: "problem-solving", why: "Problem-solving is usually done by a group." },
  { s: "Experts answer questionnaires and never meet", answer: "Delphi technique", other: "nominal group technique", why: "The nominal group meets in person." },
  { s: "Ideas are written silently, then ranked by vote", answer: "nominal group technique", other: "brainstorming", why: "Brainstorming is free and spoken." },
  { s: "Forces that support a change", answer: "driving forces", other: "restraining forces", why: "Driving = for; restraining = against." },
  { s: "A formal complaint by an employee", answer: "grievance", other: "conflict", why: "Conflict is a clash between parties." },
  { s: "Power struggles in a new team", answer: "storming", other: "norming", why: "Norming is when agreement is reached." },
  { s: "Roles and rules are agreed and accepted", answer: "norming", other: "performing", why: "Performing comes next: working independently." },
  { s: "Sets working hours, leave and overtime", answer: "BCEA", other: "LRA", why: "The LRA deals with unions, strikes and disputes." },
  { s: "Promotes collective bargaining and the CCMA", answer: "LRA", other: "BCEA", why: "Labour relations = unions and disputes." },
  { s: "Eliminates unfair discrimination; affirmative action", answer: "EEA", other: "BBBEE", why: "The EEA is about equity in the workplace." },
  { s: "Five pillars and a scorecard", answer: "BBBEE", other: "EEA", why: "BBBEE transforms ownership and the economy." },
  { s: "Prevents reckless lending", answer: "NCA", other: "CPA", why: "The NCA deals with credit." },
  { s: "Right to return unsafe or defective goods", answer: "CPA", other: "NCA", why: "The CPA protects consumers who buy goods and services." },
  { s: "Compensation for an injury at work", answer: "COIDA", other: "UIF", why: "UIF pays when you are unemployed." },
  { s: "Morally right and wrong", answer: "ethical behaviour", other: "professional behaviour", why: "Professional behaviour is the expected standard in a job." },
  { s: "Extracts raw materials", answer: "primary sector", other: "secondary sector", why: "The secondary sector processes them." },
  { s: "Provides services such as banking", answer: "tertiary sector", other: "secondary sector", why: "Services = tertiary." },
  { s: "Maximum 32 marks in an essay", answer: "content", other: "insight", why: "Insight (LASO) is worth 8." },
  { s: "Only relevant facts are given", answer: "synthesis", other: "originality", why: "Originality is about examples and current trends." },
];

export interface Riddle {
  riddle: string;
  answer: string;
  topic: Topic;
}

/** "Who am I?" – a concept, Act or model describes itself. */
export const RIDDLES: Riddle[] = [
  { riddle: "I collect a 1% levy from employers and I am the reason SETAs and learnerships exist.", answer: "Skills Development Act", topic: "g12-legislation" },
  { riddle: "I resolve labour disputes through conciliation, mediation and arbitration.", answer: "CCMA", topic: "g12-legislation" },
  { riddle: "I say you may not work more than 45 ordinary hours a week.", answer: "BCEA", topic: "g12-legislation" },
  { riddle: "I am the crime of pretending to be BBBEE-compliant.", answer: "fronting", topic: "g12-legislation" },
  { riddle: "I have four blocks: two look inside the business and two look outside.", answer: "SWOT analysis", topic: "g12-strategies" },
  { riddle: "I have five forces and I study the market environment.", answer: "Porter's Five Forces", topic: "g12-strategies" },
  { riddle: "I am six letters long and I scan the macro environment.", answer: "PESTLE", topic: "g12-strategies" },
  { riddle: "I am the defensive strategy where workers lose their jobs to cut costs.", answer: "retrenchment", topic: "g12-strategies" },
  { riddle: "I am the sector that turns wheat into bread and steel into cars.", answer: "secondary sector", topic: "g12-sectors" },
  { riddle: "I am the environment that contains your competitors and suppliers.", answer: "market environment", topic: "g12-sectors" },
  { riddle: "I am made up of a job description and a job specification.", answer: "job analysis", topic: "g12-hr" },
  { riddle: "I welcome new employees and show them the rules, the building and their colleagues.", answer: "induction", topic: "g12-hr" },
  { riddle: "I am a list of about five of the best applicants.", answer: "shortlist", topic: "g12-hr" },
  { riddle: "I am a medical aid, a pension fund or a housing allowance.", answer: "fringe benefit", topic: "g12-hr" },
  { riddle: "I am a cycle with four steps: Plan, Do, Check, Act.", answer: "PDCA", topic: "g12-quality" },
  { riddle: "I am a small group of employees who meet to solve quality problems.", answer: "quality circle", topic: "g12-quality" },
  { riddle: "I am an integrated system in which quality is everybody's job.", answer: "TQM", topic: "g12-quality" },
  { riddle: "I am the leader who inspires with charm and energy.", answer: "charismatic leader", topic: "g12-leadership" },
  { riddle: "I am the theory that says: change your style when the situation changes.", answer: "situational leadership theory", topic: "g12-leadership" },
  { riddle: "I am the formal market where shares of listed companies are traded in South Africa.", answer: "JSE", topic: "g12-securities" },
  { riddle: "I pool the money of many investors and a fund manager invests it for them.", answer: "unit trust", topic: "g12-securities" },
  { riddle: "I describe how quickly an investment can be turned into cash.", answer: "liquidity", topic: "g12-securities" },
  { riddle: "I am applied when you are under-insured: you only get a proportion of your loss.", answer: "average clause", topic: "g12-insurance" },
  { riddle: "I am the principle that says: tell the insurer the whole truth.", answer: "utmost good faith", topic: "g12-insurance" },
  { riddle: "I am paid for by a levy on every litre of fuel, and I help people injured in road accidents.", answer: "Road Accident Fund", topic: "g12-insurance" },
  { riddle: "My name ends with Inc. and my directors are personally liable for my debts.", answer: "personal liability company", topic: "g12-ownership" },
  { riddle: "I need at least five members, and each member has one vote.", answer: "co-operative", topic: "g12-ownership" },
  { riddle: "I am the document a public company must publish to invite the public to buy shares.", answer: "prospectus", topic: "g12-ownership" },
  { riddle: "I am printed notes that the audience can take home after a presentation.", answer: "handout", topic: "g12-presentation" },
  { riddle: "I am the King Code principle that means nothing is hidden from stakeholders.", answer: "transparency", topic: "g12-ethics" },
  { riddle: "I am the body to which consumers can complain about misleading adverts.", answer: "Advertising Regulatory Board", topic: "g12-ethics" },
  { riddle: "I weigh driving forces against restraining forces.", answer: "force-field analysis", topic: "g12-creative" },
  { riddle: "In me, a group shouts out ideas and nobody may criticise.", answer: "brainstorming", topic: "g12-creative" },
  { riddle: "I measure success by profit, people and planet.", answer: "triple bottom line", topic: "g12-csr" },
  { riddle: "I am the money and time a business invests in community projects.", answer: "corporate social investment", topic: "g12-csr" },
  { riddle: "I am the right that keeps your personal and medical information confidential.", answer: "privacy", topic: "g12-rights" },
  { riddle: "I am elected by workers to inspect the workplace for dangers.", answer: "health and safety representative", topic: "g12-rights" },
  { riddle: "I am the stage where a team argues and struggles for power.", answer: "storming", topic: "g12-teams" },
  { riddle: "I am a formal complaint that starts with the supervisor and can end at the CCMA.", answer: "grievance", topic: "g12-teams" },
  { riddle: "I am four letters that are worth eight marks in every essay.", answer: "LASO", topic: "skills-exam" },
];
