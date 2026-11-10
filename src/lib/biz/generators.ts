/**
 * Endless Business Studies practice: every generator makes a fresh question
 * from a seed, with the memo answer (and accepted alternatives) and a full
 * explanation. The test-suite makes 150 questions per generator and checks
 * that every memo answer passes its own checker.
 */
import type { PracticeProblem, Topic } from "@/content/types";
import { seededRandom } from "@/lib/utils";
import { BUSINESSES, fill, PEOPLE, SCENARIO_BANKS, type ScenarioBank } from "./banks";
import { type Generator, int, pick, type Rng, za } from "./gen-kit";

const rng = (id: string, seed: number | string): Rng => seededRandom(`${id}:${seed}`);

/** R12 500 or R1 250,50 – South African money formatting. */
export const rand = (n: number) => {
  const [whole, cents] = Math.abs(n).toFixed(2).split(".");
  const grouped = whole.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  return `${n < 0 ? "−" : ""}R${grouped}${cents === "00" ? "" : `,${cents}`}`;
};

// ------------------------------------------------------------------ Investment: securities

/** Simple interest: I = P × r × t. */
export const simpleInterest = (p: number, ratePct: number, years: number) => (p * ratePct * years) / 100;
/** Compound interest (compounded yearly): A = P(1 + r)^n, rounded to cents. */
export const compoundAmount = (p: number, ratePct: number, years: number) => Math.round(p * (1 + ratePct / 100) ** years * 100) / 100;

const simple: Generator = {
  id: "simple-interest",
  title: "Simple interest",
  topic: "g12-securities",
  speed: true,
  make(seed) {
    const r = rng(this.id, seed);
    const who = pick(r, PEOPLE);
    const p = int(r, 2, 40) * 1000;
    const rate = pick(r, [5, 6, 7, 8, 9, 10, 12]);
    const t = int(r, 2, 5);
    const i = simpleInterest(p, rate, t);
    const total = r() < 0.4;
    return {
      q: `${who} invests **${rand(p)}** in a fixed deposit at **${rate}% simple interest** per year for **${t} years**.\n\nCalculate the ${total ? "**total amount** (capital plus interest) at the end of the period" : "**interest** earned over the period"}.`,
      answer: String(total ? p + i : i),
      kind: "number",
      hint: "Simple interest is calculated on the **original amount only**: Interest = P × r × t (write the rate as a decimal: 8% = 0,08).",
      solution: `Interest = P × r × t\n\n= ${rand(p)} × ${za(rate / 100, 2)} × ${t}\n\n= **${rand(i)}**${total ? `\n\nTotal amount = ${rand(p)} + ${rand(i)} = **${rand(p + i)}**` : ""}\n\nIn the exam, **show the formula and every step** – marks are given for the method.`,
    };
  },
};

const compound: Generator = {
  id: "compound-interest",
  title: "Compound interest",
  topic: "g12-securities",
  make(seed) {
    const r = rng(this.id, seed);
    const who = pick(r, PEOPLE);
    const p = int(r, 2, 30) * 1000;
    const rate = pick(r, [5, 6, 8, 10, 12]);
    const t = int(r, 2, 3);
    const steps: string[] = [];
    let bal = p;
    for (let y = 1; y <= t; y++) {
      const i = Math.round(bal * rate) / 100;
      steps.push(`| ${y} | ${rand(bal)} | ${rand(bal)} × ${za(rate / 100, 2)} = ${rand(i)} | ${rand(Math.round((bal + i) * 100) / 100)} |`);
      bal = Math.round((bal + i) * 100) / 100;
    }
    const wantInterest = r() < 0.4;
    return {
      q: `${who} invests **${rand(p)}** at **${rate}% interest per year, compounded annually**, for **${t} years**.\n\nCalculate the ${wantInterest ? "**total interest** earned" : "**total amount** of the investment at the end of the period"}.`,
      answer: String(wantInterest ? Math.round((bal - p) * 100) / 100 : bal),
      kind: "number",
      tol: 1,
      hint: "Compound interest is **interest on interest**: each year's interest is added to the capital before the next year's interest is calculated.",
      solution: `| Year | Opening amount | Interest | Closing amount |\n|---|---|---|---|\n${steps.join("\n")}\n\nTotal amount = **${rand(bal)}**${wantInterest ? `\n\nInterest = ${rand(bal)} − ${rand(p)} = **${rand(Math.round((bal - p) * 100) / 100)}**` : ""}\n\n(Or use the formula A = P(1 + r)ⁿ.)`,
    };
  },
};

const interestGap: Generator = {
  id: "interest-difference",
  title: "Simple vs compound interest",
  topic: "g12-securities",
  make(seed) {
    const r = rng(this.id, seed);
    const p = int(r, 5, 25) * 1000;
    const rate = pick(r, [5, 10, 12]);
    const t = 2;
    const si = simpleInterest(p, rate, t);
    const ci = Math.round((compoundAmount(p, rate, t) - p) * 100) / 100;
    return {
      q: `${pick(r, PEOPLE)} can invest **${rand(p)}** for **${t} years** at **${rate}% per year**.\n\n- Option A: simple interest\n- Option B: interest compounded annually\n\nHow much **more interest** does Option B earn?`,
      answer: String(Math.round((ci - si) * 100) / 100),
      kind: "number",
      tol: 0.5,
      hint: "Work out the interest for each option, then subtract. Compound interest is always more over the same period (after year 1).",
      solution: `**Option A (simple):** ${rand(p)} × ${za(rate / 100, 2)} × ${t} = ${rand(si)}\n\n**Option B (compound):** ${rand(p)} × (1 + ${za(rate / 100, 2)})² = ${rand(p + ci)}, so interest = ${rand(ci)}\n\nDifference = ${rand(ci)} − ${rand(si)} = **${rand(Math.round((ci - si) * 100) / 100)}**\n\nCompound interest gives a higher return because interest is earned on interest.`,
    };
  },
};

// ------------------------------------------------------------------ Investment: insurance

/** The average clause: (amount insured ÷ market value) × damage. Never more than the damage. */
export const averageClause = (insured: number, value: number, damage: number) => (insured >= value ? damage : (insured / value) * damage);

const average: Generator = {
  id: "average-clause",
  title: "The average clause",
  topic: "g12-insurance",
  make(seed) {
    const r = rng(this.id, seed);
    const b = pick(r, BUSINESSES);
    const value = int(r, 4, 20) * 100000;
    const frac = pick(r, [0.5, 0.6, 0.75, 0.8]);
    const insured = value * frac;
    const damage = Math.min(value, int(r, 2, 16) * 25000);
    const pay = averageClause(insured, value, damage);
    const thing = pick(r, ["building", "warehouse", "stock", "factory", "equipment"]);
    return {
      q: `The ${thing} of ${b} has a market value of **${rand(value)}** but is insured for only **${rand(insured)}**. A fire causes damage of **${rand(damage)}**.\n\nCalculate the amount that the insurer will pay out.`,
      answer: String(pay),
      kind: "number",
      tol: 1,
      hint: "The business is **under-insured**, so the average clause applies: (amount insured ÷ market value) × amount of damage.",
      solution: `Amount insured ÷ market value × damage\n\n= ${rand(insured)} ÷ ${rand(value)} × ${rand(damage)}\n\n= **${rand(pay)}**\n\n${b} is insured for only ${frac * 100}% of the value, so it receives only ${frac * 100}% of the loss and must carry the other **${rand(damage - pay)}** itself.`,
    };
  },
};

const insuredStatus: Generator = {
  id: "under-over-insured",
  title: "Under-insured or over-insured?",
  topic: "g12-insurance",
  speed: true,
  make(seed) {
    const r = rng(this.id, seed);
    const value = int(r, 3, 15) * 100000;
    const kind = pick(r, ["under", "over", "under", "over", "full"] as const);
    const insured = kind === "under" ? value * pick(r, [0.5, 0.6, 0.8]) : kind === "over" ? value * pick(r, [1.2, 1.5]) : value;
    const ans = kind === "under" ? "under-insured | underinsured | under-insurance | under insurance" : kind === "over" ? "over-insured | overinsured | over-insurance | over insurance" : "fully insured | full | fully";
    return {
      q: `${pick(r, BUSINESSES)} insures property with a market value of **${rand(value)}** for **${rand(insured)}**.\n\nIs the business **under-insured**, **over-insured** or **fully insured**?`,
      answer: ans,
      kind: "word",
      hint: "Compare the amount insured with the market value.",
      solution: kind === "under"
        ? `Insured for **less** than the value → **under-insured**. The average clause will apply: the insurer pays only ${za((insured / value) * 100, 0)}% of any loss.`
        : kind === "over"
          ? `Insured for **more** than the value → **over-insured**. The insurer will still pay only the real value of the loss (indemnification – you may not profit), so the extra premium is wasted.`
          : `Insured for exactly the market value → **fully insured**. A proven loss is paid out in full.`,
    };
  },
};

// ------------------------------------------------------------------ Exam skills

const timing: Generator = {
  id: "exam-timing",
  title: "Exam timing",
  topic: "skills-exam",
  speed: true,
  make(seed) {
    const r = rng(this.id, seed);
    const [name, marks] = pick(r, [["Section A (Question 1)", 30], ["one Section B question", 40], ["both of your Section B questions", 80], ["your Section C essay", 40], ["a 6-mark question", 6], ["a 10-mark question", 10]] as const);
    const mins = Math.round(marks * 0.8);
    return {
      q: `A Business Studies paper is **150 marks in 120 minutes**. About how many **minutes** should you spend on **${name}** (${marks} marks)?`,
      answer: String(mins),
      kind: "number",
      tol: marks >= 30 ? 4 : 1.5,
      hint: "120 ÷ 150 = 0,8 minutes per mark.",
      solution: `120 minutes ÷ 150 marks = **0,8 minutes per mark**.\n\n${marks} × 0,8 = **about ${mins} minutes**.\n\nA common plan: Section A ±20 min, each Section B question ±30 min, the essay ±30 min – and 10 minutes to choose questions and check.`,
    };
  },
};

// ------------------------------------------------------------------ Scenarios: "identify it"

const scenarioGenerator = (bank: ScenarioBank): Generator => ({
  id: `spot-${bank.id}`,
  title: bank.title.replace(/\?$/, ""),
  topic: bank.topic,
  speed: true,
  make(seed: number | string) {
    const r = rng(`spot-${bank.id}`, seed);
    const item = pick(r, bank.items);
    const text = fill(item.s, pick(r, BUSINESSES), pick(r, PEOPLE));
    const main = item.a.split(" | ")[0];
    const opts = bank.options;
    return {
      q: `Identify the **${bank.ask}**:\n\n> ${text}`,
      answer: item.a,
      kind: "word" as const,
      hint: opts && opts.length <= 6 ? `Choose from: ${opts.join(" · ")}.` : `It starts with **${main[0].toUpperCase()}**.`,
      solution: `**${main.charAt(0).toUpperCase()}${main.slice(1)}** – ${item.why}\n\nIn the exam: **name it** (2 marks), then **quote from the scenario** to motivate (1 mark).`,
    };
  },
});

const scenarioGenerators = SCENARIO_BANKS.map(scenarioGenerator);

// ------------------------------------------------------------------ Section A terminology

/** [description, memo answer] – "give the correct business term" items for every topic. */
export const TERM_BANK: Record<Topic, [string, string][]> = {
  "g12-legislation": [
    ["The Act that aims to improve the skills of the workforce and encourages employers to use the workplace as a learning environment", "Skills Development Act | SDA"],
    ["Bodies established for each economic sector to manage skills development and pay out training grants", "SETAs | SETA | Sector Education and Training Authorities | Sector Education and Training Authority"],
    ["A structured learning programme that combines theory with practical workplace training and leads to an NQF-registered qualification", "learnership | learnerships"],
    ["The Act that promotes collective bargaining and regulates trade unions, strikes and lock-outs", "Labour Relations Act | LRA"],
    ["The body that resolves labour disputes through conciliation, mediation and arbitration", "CCMA | Commission for Conciliation, Mediation and Arbitration | Commission for Conciliation Mediation and Arbitration"],
    ["Negotiations between employers and trade unions about wages and conditions of employment", "collective bargaining"],
    ["The Act that promotes equal opportunity and fair treatment in the workplace and implements affirmative action", "Employment Equity Act | EEA"],
    ["Measures that ensure that suitably qualified people from designated groups have equal opportunities in the workplace", "affirmative action"],
    ["The Act that sets the minimum conditions of employment such as working hours, leave and termination", "Basic Conditions of Employment Act | BCEA"],
    ["The Act that provides for compensation to employees who are injured or contract diseases at work", "Compensation for Occupational Injuries and Diseases Act | COIDA"],
    ["The Act that aims to increase the participation of previously disadvantaged people in the economy", "Broad-Based Black Economic Empowerment Act | BBBEE Act | BBBEE | B-BBEE | Broad Based Black Economic Empowerment Act"],
    ["The BBBEE pillar that deals with the percentage of shares in a business held by black people", "ownership"],
    ["The Act that promotes responsible borrowing and protects consumers against reckless lending", "National Credit Act | NCA"],
    ["The process that helps an over-indebted consumer to restructure debt repayments", "debt counselling | debt review | debt counseling"],
    ["The Act that protects consumers against unfair business practices and unsafe goods", "Consumer Protection Act | CPA"],
    ["The maximum number of ordinary working hours per week allowed by the BCEA", "45"],
  ],
  "g12-strategies": [
    ["A long-term plan of action to achieve the goals of a business", "strategy | business strategy"],
    ["The tool that analyses the strengths, weaknesses, opportunities and threats of a business", "SWOT analysis | SWOT"],
    ["The model used to analyse the position of a business in the market environment by looking at five competitive forces", "Porter's Five Forces | Porter's Five Forces model | Porters Five Forces | Porter's five forces model"],
    ["The tool used to analyse the political, economic, social, technological, legal and environmental factors in the macro environment", "PESTLE analysis | PESTLE | PESTLE model"],
    ["The strategy where a business takes over or merges with its suppliers", "backward vertical integration | backward integration"],
    ["The strategy where a business takes over or merges with its distributors", "forward vertical integration | forward integration"],
    ["The strategy where a business takes over or merges with a competitor", "horizontal integration"],
    ["The intensive strategy where existing products are sold to the existing market by using aggressive marketing", "market penetration"],
    ["The intensive strategy where existing products are sold in new markets", "market development"],
    ["The intensive strategy where new products are introduced into existing markets", "product development"],
    ["The diversification strategy where new, unrelated products are added to appeal to new customers", "conglomerate diversification"],
    ["The defensive strategy where a business sells off unprofitable assets or divisions", "divestiture | divestment"],
    ["The defensive strategy where all assets are sold to pay creditors because of a lack of capital", "liquidation"],
    ["The group of strategies that includes retrenchment, divestiture and liquidation", "defensive strategies | defensive | defensive strategy"],
  ],
  "g12-sectors": [
    ["The sector that extracts raw materials and natural resources", "primary sector | primary"],
    ["The sector that changes raw materials into finished or semi-finished products", "secondary sector | secondary"],
    ["The sector that provides services and distributes goods to consumers", "tertiary sector | tertiary"],
    ["The business environment over which a business has full control", "micro environment | micro | internal environment | micro-environment"],
    ["The business environment that a business can influence but not control", "market environment | market"],
    ["The business environment over which a business has no control", "macro environment | macro | macro-environment"],
    ["Businesses that sell the same or similar products to the same target market", "competitors | competition | competitor"],
    ["Businesses or people who provide the raw materials and stock that a business needs", "suppliers | supplier"],
    ["Wholesalers, retailers and agents that help to move products from the producer to the consumer", "intermediaries | intermediary"],
    ["The shared values, beliefs and way of doing things in a business", "organisational culture | organizational culture | business culture"],
    ["Farming, mining, fishing and forestry belong to this sector", "primary sector | primary"],
    ["Banking, transport, retail and tourism belong to this sector", "tertiary sector | tertiary"],
  ],
  "g12-hr": [
    ["The process of collecting information about a job, made up of the job description and the job specification", "job analysis"],
    ["A written description of the duties, tasks and responsibilities of a job", "job description"],
    ["A written description of the minimum qualifications, skills and experience needed for a job", "job specification"],
    ["The process of finding and attracting suitable candidates to fill a vacancy", "recruitment"],
    ["Filling a vacancy with someone who already works for the business", "internal recruitment"],
    ["Filling a vacancy with someone from outside the business", "external recruitment"],
    ["Checking applications against the minimum requirements to eliminate unsuitable applicants", "screening | preliminary screening"],
    ["The process of choosing the most suitable candidate for the vacancy", "selection"],
    ["A formal meeting where the employer assesses whether a candidate is suitable for the post", "interview | interviewing | job interview"],
    ["The legally binding agreement between an employer and an employee", "employment contract | contract of employment"],
    ["The process of introducing new employees to the business, its policies and their colleagues", "induction"],
    ["The process of putting a new employee in the post where his or her skills are best used", "placement"],
    ["The salary determination method where workers are paid for the number of units they produce", "piecemeal | piece-meal | piece meal | piece work"],
    ["The salary determination method where workers are paid for the hours they spend at work", "time-related | time related"],
    ["Benefits that an employee receives on top of the basic salary, such as medical aid or a pension fund", "fringe benefits | perks | fringe benefit"],
  ],
  "g12-quality": [
    ["The ability of a product or service to satisfy the specific needs of consumers", "quality"],
    ["A system of inspecting the final product to make sure that it meets the required standards", "quality control"],
    ["Checks carried out during and after the production process to make sure that standards are met at every stage – getting it right the first time", "quality assurance"],
    ["The techniques and tools used to design and improve the quality of a product", "quality management"],
    ["The total performance of each department measured against specified standards", "quality performance"],
    ["An integrated system applied throughout the organisation that designs, produces and provides quality products to customers", "total quality management | TQM"],
    ["Small groups of employees who meet regularly to discuss and solve quality problems", "quality circles | quality circle"],
    ["The four-step cycle used for the continuous improvement of processes and systems", "PDCA | PDCA cycle | plan do check act | PDCA model"],
    ["The TQM element that keeps the skills of employees up to date through ongoing training", "continuous skills development | education and training"],
    ["The TQM element that focuses on market research and customer feedback to meet customers' needs", "total client satisfaction | total customer satisfaction | total client/customer satisfaction"],
    ["The TQM element that ensures a business has enough funds and resources to meet quality standards", "adequate financing and capacity"],
    ["The business function that is responsible for acquiring quality raw materials at reasonable prices", "purchasing function | purchasing | purchasing/procurement"],
    ["The business function that handles relationships with the media and promotes a positive image of the business", "public relations function | public relations | PR"],
  ],
  "g12-leadership": [
    ["The leadership style where the leader takes all the decisions alone without consulting employees", "autocratic | autocratic leadership style | boss-centred"],
    ["The leadership style where employees are involved in the decision-making process", "democratic | democratic leadership style | participative"],
    ["The leadership style where the leader delegates tasks and leaves followers to make their own decisions", "laissez-faire | free-reign | laissez faire | free reign | laissez-faire leadership style"],
    ["The leadership style where the leader uses charm and personality to inspire followers", "charismatic | charismatic leadership style"],
    ["The leadership style where the leader uses rewards and punishment to motivate employees", "transactional | transactional leadership style"],
    ["The leadership theory which states that different leadership characteristics are needed for different situations", "situational leadership theory | situational | situational theory | situational leadership"],
    ["The leadership theory which is suitable for a dynamic environment where change can be drastic, and where a passionate leader inspires followers to work towards a vision", "transformational leadership theory | transformational | transformational theory | transformational leadership"],
    ["The leadership theory which focuses on the relationship between leaders and the people they lead", "leaders and followers | leaders and followers theory"],
    ["The process of planning, organising, leading and controlling the resources of a business", "management"],
    ["The ability to inspire and influence people to work towards a vision", "leadership"],
    ["The way a person thinks and feels about something, which influences his or her success as a leader", "attitude | personal attitude"],
  ],
  "g12-securities": [
    ["The interest that is calculated on the original amount invested only", "simple interest"],
    ["The interest that is calculated on the original amount plus the interest already earned", "compound interest"],
    ["The ease and speed with which an investment can be converted into cash", "liquidity"],
    ["The possibility that an investor may lose some or all of the money invested", "risk"],
    ["The profit earned on an investment, such as interest, dividends or increased capital", "return on investment | ROI | return"],
    ["The general increase in prices that reduces the buying power of money", "inflation | inflation rate"],
    ["The share of a company's profit that is paid out to shareholders", "dividends | dividend"],
    ["Shares that give the holder a right to vote at the AGM, with dividends that depend on the profit made", "ordinary shares | ordinary share"],
    ["Shares that receive a fixed rate of dividend before ordinary shareholders are paid", "preference shares | preference share"],
    ["An investment where a fund manager pools the money of many investors to buy a variety of shares and other securities", "unit trusts | unit trust"],
    ["An investment where a fixed amount is deposited at a bank for a fixed period at a fixed interest rate", "fixed deposit | fixed deposits"],
    ["Government bonds that ordinary citizens can buy, with a fixed or inflation-linked interest rate", "RSA Retail Savings Bonds | retail savings bonds | government retail bonds | RSA retail bonds"],
    ["The formal market in South Africa where listed shares are bought and sold", "JSE | Johannesburg Stock Exchange | JSE Limited | JSE Ltd"],
    ["Spreading money over different types of investments to reduce risk", "diversification | diversify | spreading of risk"],
    ["Shares issued to existing shareholders free of charge as compensation for unpaid dividends", "bonus shares | bonus share"],
  ],
  "g12-insurance": [
    ["Cover for a specified event that may or may not happen, such as fire or theft", "insurance | short-term insurance"],
    ["Cover for an event that is certain to happen, such as death", "assurance | life assurance | long-term insurance"],
    ["The monthly or yearly amount that the insured pays to the insurer for cover", "premium | premiums"],
    ["The part of a claim that the insured has to pay himself or herself", "excess"],
    ["The principle that the insured is placed in the same financial position as before the loss", "indemnification | indemnity"],
    ["The principle that a predetermined amount is paid out when the insured reaches a certain age or dies", "security | certainty"],
    ["The principle that both parties must disclose all relevant facts honestly", "utmost good faith"],
    ["The principle that the insured must prove that he or she will suffer a financial loss if the insured object is damaged", "insurable interest"],
    ["The situation where property is insured for less than its market value", "under-insurance | underinsurance | under insurance | under-insured"],
    ["The situation where property is insured for more than its market value", "over-insurance | overinsurance | over insurance | over-insured"],
    ["The stipulation used to calculate a pay-out when goods are under-insured", "average clause"],
    ["The compulsory fund that pays benefits to workers who become unemployed, or who are on maternity leave or ill", "UIF | Unemployment Insurance Fund"],
    ["The compulsory fund that compensates people injured in road accidents, financed by the fuel levy", "RAF | Road Accident Fund | Road Accident Benefit Scheme | RABS"],
    ["A risk that an insurer will not cover, such as losses caused by war or changes in fashion", "non-insurable risk | non-insurable | uninsurable risk | non insurable risk"],
  ],
  "g12-ownership": [
    ["A business that is owned and managed by one person", "sole trader | sole proprietor | sole proprietorship"],
    ["A business owned by two or more people who share the profits and are jointly and severally liable for its debts", "partnership"],
    ["A company whose name ends with (Pty) Ltd", "private company"],
    ["A company whose name ends with Ltd and that may sell shares to the public", "public company"],
    ["A company whose name ends with Inc. and whose directors are personally liable for its debts", "personal liability company"],
    ["A company whose name ends with SOC Ltd and that is owned by the government", "state-owned company | SOC | state owned company"],
    ["A company whose name ends with NPC and that is formed for a public benefit", "non-profit company | NPC | non profit company"],
    ["A business that is owned and democratically controlled by its members, who share a common need", "co-operative | cooperative | co-operative society"],
    ["Owners can lose only the amount they invested in the business, not their personal assets", "limited liability"],
    ["Owners can lose their personal assets if the business cannot pay its debts", "unlimited liability"],
    ["The ability of a business to carry on existing when an owner dies or leaves", "continuity | continuity of existence | perpetual existence"],
    ["The founding document that sets out the rights and responsibilities of the shareholders and directors of a company", "Memorandum of Incorporation | MOI"],
    ["The document that invites the public to buy shares in a public company", "prospectus"],
    ["The body with which all companies in South Africa must be registered", "CIPC | Companies and Intellectual Property Commission"],
  ],
  "g12-presentation": [
    ["Tools such as slides, posters and graphs that support a presentation and help the audience to understand", "visual aids | visual aid"],
    ["Printed notes given to the audience to take away after the presentation", "handouts | handout | hand-outs"],
    ["The responses and questions from the audience after a presentation", "feedback"],
    ["Communication through gestures, posture, eye contact and facial expressions", "non-verbal communication | body language | non verbal communication"],
    ["A touch-controlled board that is connected to a computer and can save what is written on it", "interactive whiteboard | smart board | smartboard"],
    ["Large sheets of paper on a stand, used to write down ideas in a small group", "flip chart | flipchart"],
    ["Rows and columns that show exact figures so that they can be compared", "tables | table"],
    ["Diagrams such as bar, line and pie charts that show trends and comparisons", "graphs | charts | graph | chart"],
    ["The first part of a presentation, where the presenter states the purpose and main points", "introduction"],
    ["The last part of a presentation, where the main points are summarised", "conclusion"],
    ["The people who watch and listen to a presentation", "audience"],
  ],
  "g12-ethics": [
    ["The principles of right and wrong that guide how a business and its people behave", "ethics | ethical behaviour | business ethics"],
    ["A certain standard of behaviour and competence expected in a profession or workplace", "professionalism | professional behaviour"],
    ["A written set of rules that describes how employees are expected to behave", "code of conduct | code of ethics"],
    ["The King Code principle that requires decisions and actions to be clear to all stakeholders", "transparency"],
    ["The King Code principle that requires a business to be answerable for its decisions and actions", "accountability"],
    ["The system of rules and practices by which a company is directed and controlled", "corporate governance"],
    ["Unwelcome behaviour of a sexual nature in the workplace", "sexual harassment"],
    ["Illegally not declaring all income to SARS in order to pay less tax", "tax evasion | taxation"],
    ["Using the money or assets of a business for personal benefit without permission", "unauthorised use of funds | fraud | unauthorised use of funds and resources"],
    ["Making false or misleading claims about a product in order to sell it", "unfair advertising | false advertising | misleading advertising"],
    ["Reporting unethical or illegal conduct in the business to the authorities", "whistle-blowing | whistleblowing | whistle blowing"],
  ],
  "g12-creative": [
    ["The ability to think of original, varied and new ideas", "creative thinking | creativity"],
    ["The process of analysing a situation to identify strategies that bring about change", "problem-solving | problem solving"],
    ["Choosing between a number of alternatives, often done by one person or a senior manager", "decision-making | decision making"],
    ["The technique where a panel of experts completes questionnaires in rounds until they reach consensus", "Delphi technique | Delphi"],
    ["The technique that weighs the driving forces for a change against the restraining forces", "force-field analysis | force field analysis | force-field | force field"],
    ["The technique where a group calls out as many ideas as possible without criticism", "brainstorming"],
    ["The technique where members silently write down ideas, share them one by one and then rank them by voting", "nominal group technique | NGT | nominal group"],
    ["A diagram with the main idea in the centre and related ideas on branches around it", "mind map | mind mapping | mind-mapping"],
    ["The forces in a force-field analysis that support a change", "driving forces | driving | forces for | pros"],
    ["The forces in a force-field analysis that work against a change", "restraining forces | restraining | forces against | cons"],
    ["Ways of thinking that follow habits and repeat old solutions", "routine thinking | conventional thinking | routine"],
  ],
  "g12-csr": [
    ["The obligation of every person and business to act in a way that benefits society and the environment", "social responsibility"],
    ["The way a business conducts its operations ethically and morally, considering its impact on people and the environment", "corporate social responsibility | CSR"],
    ["Projects and programmes that a business funds to uplift communities, beyond its normal business activities", "corporate social investment | CSI"],
    ["The framework that measures the performance of a business in terms of profit, people and planet", "triple bottom line"],
    ["The element of the triple bottom line that deals with the impact of the business on the environment", "planet | environment"],
    ["The element of the triple bottom line that deals with the well-being of employees and the community", "people | social"],
    ["The element of the triple bottom line that deals with the economic value created by the business", "profit | economic"],
    ["A plan of action that explains how a business will contribute to the upliftment of communities", "CSI policy | CSR policy | corporate social investment policy"],
    ["People or groups that are affected by the activities of a business, such as employees, customers and the community", "stakeholders | stakeholder"],
    ["Development that meets present needs without harming the ability of future generations to meet theirs", "sustainability | sustainable development"],
  ],
  "g12-rights": [
    ["The basic rights and freedoms that every person has, as set out in the Bill of Rights", "human rights"],
    ["Giving every person equal opportunities, regardless of race, gender, age, language or disability", "inclusivity | inclusion"],
    ["The variety of people in a workplace in terms of race, gender, age, culture, language, religion and ability", "diversity"],
    ["The human right that protects an employee's personal information", "privacy"],
    ["The human right that requires every employee to be treated with respect", "dignity | human dignity | respect and dignity"],
    ["The human right to equal treatment and equal pay for work of equal value", "equity | equality"],
    ["Treating a person unfairly because of race, gender, religion, age or disability", "discrimination | unfair discrimination"],
    ["The state of not having enough money to meet basic needs", "poverty"],
    ["The rights that include free trade, fair labour practices and the right to join a trade union", "economic rights | economic"],
    ["The rights that include respect for different languages, religions and customs in the workplace", "cultural rights | cultural"],
    ["Employees elected to inspect the workplace and report unsafe conditions", "health and safety representatives | health and safety representative | safety representatives | health and safety reps"],
  ],
  "g12-teams": [
    ["The first stage of team development, where members meet and are polite to one another", "forming"],
    ["The stage of team development marked by conflict and power struggles", "storming"],
    ["The stage of team development where members reach agreement and accept their roles", "norming"],
    ["The stage of team development where the team works well and independently towards its goals", "performing"],
    ["The final stage of team development, when the task is complete and the team breaks up", "adjourning | mourning | adjourning/mourning"],
    ["A clash of opinions, ideas or interests between people in the workplace", "conflict"],
    ["A formal complaint that an employee lays against the employer", "grievance"],
    ["A group of people who work together towards a common goal", "team | teamwork"],
    ["The process of managing and resolving disagreements in a constructive way", "conflict management | conflict resolution"],
    ["A neutral third party who helps two parties in conflict to reach their own agreement", "mediator | mediation"],
    ["The type of difficult personality that always finds fault and blames others", "complainer | complainers"],
  ],
  "skills-exam": [
    ["The acronym for the four components of insight in a Section C essay", "LASO"],
    ["The LASO component that is awarded for an introduction, body and conclusion", "layout | structure | layout/structure"],
    ["The LASO component that is awarded for using only relevant facts", "synthesis"],
    ["The LASO component that is awarded for current examples and recent information", "originality"],
    ["The maximum mark for content in a Section C essay", "32"],
    ["The number of marks for insight in a Section C essay", "8"],
    ["The total number of marks for each Business Studies paper", "150"],
    ["The number of Section B questions you must answer in each paper", "2"],
    ["The action verb that asks you to give facts in full sentences and then say more about each one", "explain | discuss | describe"],
    ["The action verb that asks you to give your own judgement about the positives and/or negatives", "evaluate | critically evaluate | analyse"],
  ],
};

const TOPIC_TITLES: Record<Topic, string> = {
  "g12-legislation": "Terms: legislation", "g12-strategies": "Terms: business strategies", "g12-sectors": "Terms: sectors & environments",
  "g12-hr": "Terms: human resources", "g12-quality": "Terms: quality of performance", "g12-leadership": "Terms: management & leadership",
  "g12-securities": "Terms: investment securities", "g12-insurance": "Terms: insurance", "g12-ownership": "Terms: forms of ownership",
  "g12-presentation": "Terms: presentation", "g12-ethics": "Terms: ethics & professionalism", "g12-creative": "Terms: creative thinking",
  "g12-csr": "Terms: social responsibility", "g12-rights": "Terms: human rights & inclusivity", "g12-teams": "Terms: teams & conflict",
  "skills-exam": "Exam facts",
};

const termGenerators: Generator[] = (Object.entries(TERM_BANK) as [Topic, [string, string][]][]).map(([topic, bank]) => ({
  id: `terms-${topic}`,
  title: TOPIC_TITLES[topic],
  topic,
  speed: true,
  make(seed: number | string) {
    const r = rng(`terms-${topic}`, seed);
    const [desc, ans] = pick(r, bank);
    const main = ans.split(" | ")[0];
    const numeric = /^\d+$/.test(main);
    return {
      q: numeric ? `${desc}:` : `Give the correct **business term** for:\n\n> ${desc}`,
      answer: ans,
      kind: numeric ? ("number" as const) : ("word" as const),
      hint: numeric ? "It is a number you should know by heart." : `It starts with **${main[0].toUpperCase()}** and has ${main.split(/\s+/).length === 1 ? "one word" : `${main.split(/\s+/).length} words`}.`,
      solution: `**${main}**${ans.includes(" | ") ? ` (also accepted: ${ans.split(" | ").slice(1, 3).join(", ")})` : ""}. Section A needs the **exact term** – each one is worth 2 marks.`,
    };
  },
}));

/** Every generator, in syllabus order (terms first, then the scenario and calculation skills of each topic). */
const TOPIC_SEQUENCE = Object.keys(TERM_BANK) as Topic[];
const extras: Generator[] = [...scenarioGenerators, simple, compound, interestGap, average, insuredStatus, timing];

export const GENERATORS: Generator[] = TOPIC_SEQUENCE.flatMap((t) => [...termGenerators.filter((g) => g.topic === t), ...extras.filter((g) => g.topic === t)]);

export const getGenerator = (id: string) => GENERATORS.find((g) => g.id === id);

/** A problem from a random generator (used by "surprise me"). */
export function anyProblem(seed: number): PracticeProblem {
  const r = seededRandom(`any:${seed}`);
  return GENERATORS[int(r, 0, GENERATORS.length - 1)].make(seed);
}
