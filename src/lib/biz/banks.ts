/**
 * Scenario banks: short workplace stories and the concept each one shows.
 * They feed the "identify it" question generators, the Act Finder lab and
 * the games, so one well-checked bank is practised in several ways.
 */
import type { Topic } from "@/content/types";

export interface Scenario {
  /** The story. `{B}` is replaced with a business name and `{N}` with a person's name. */
  s: string;
  /** The memo answer; alternatives are separated by " | ". */
  a: string;
  /** Why – shown after answering. */
  why: string;
}

export interface ScenarioBank {
  id: string;
  title: string;
  topic: Topic;
  /** Completes "Name the … described in the scenario." */
  ask: string;
  /** Short option labels (first alternative of each distinct answer is used when omitted). */
  options?: string[];
  items: Scenario[];
}

export const BUSINESSES = ["Mzansi Traders", "Khumalo Bakery", "Sizwe Motors", "Lerato Fashions", "Ubuntu Builders", "Karoo Foods", "Thandi's Spa", "Vuka Logistics", "Bongani Electrical", "Protea Printers", "Naidoo Furnishers", "Molefe Mining"];
export const PEOPLE = ["Thabo", "Lerato", "Sipho", "Naledi", "Ayesha", "Pieter", "Zanele", "Kagiso", "Priya", "Johan", "Nomsa", "Lwazi"];

export const ACTS: ScenarioBank = {
  id: "acts",
  title: "Which Act applies?",
  topic: "g12-legislation",
  ask: "Act",
  options: ["Skills Development Act", "Labour Relations Act", "Employment Equity Act", "Basic Conditions of Employment Act", "COIDA", "BBBEE Act", "National Credit Act", "Consumer Protection Act"],
  items: [
    { s: "{B} pays 1% of its payroll every month as a levy that is used to train workers.", a: "Skills Development Act | SDA", why: "The SDA (with the Skills Development Levies Act) requires businesses with a payroll above the threshold to pay a 1% skills development levy." },
    { s: "{N} is registered for a learnership through the SETA of the sector in which {B} operates.", a: "Skills Development Act | SDA", why: "SETAs and learnerships were created by the SDA to improve the skills of workers." },
    { s: "{B} refuses to give {N} time off to attend a learnership, although {N} qualifies for it.", a: "Skills Development Act | SDA", why: "Denying employees access to training programmes is a discriminatory action under the SDA." },
    { s: "{N} was dismissed by {B} for joining a trade union.", a: "Labour Relations Act | LRA", why: "The LRA protects the right of employees to form and join trade unions (freedom of association)." },
    { s: "The workers of {B} referred their wage dispute to the CCMA for conciliation.", a: "Labour Relations Act | LRA", why: "The CCMA was established by the LRA to resolve labour disputes." },
    { s: "The management of {B} refuses to allow employees to take part in a legal strike.", a: "Labour Relations Act | LRA", why: "The LRA gives employees the right to take part in legal strikes and promotes collective bargaining." },
    { s: "{B} set up a workplace forum so that employees can take part in decision-making.", a: "Labour Relations Act | LRA", why: "Workplace forums are provided for in the LRA to promote employee participation." },
    { s: "{N} was not promoted at {B} because she is pregnant.", a: "Employment Equity Act | EEA", why: "The EEA prohibits unfair discrimination on grounds such as pregnancy, gender, race, disability and HIV status." },
    { s: "{B} submitted a plan to the Department of Employment and Labour showing how it will make its workforce representative of the country's population.", a: "Employment Equity Act | EEA", why: "Designated employers must prepare and submit an employment equity plan under the EEA." },
    { s: "{B} pays male supervisors more than female supervisors who do exactly the same work.", a: "Employment Equity Act | EEA", why: "The EEA requires equal pay for work of equal value." },
    { s: "{B} expects its employees to work 60 ordinary hours a week without overtime pay.", a: "Basic Conditions of Employment Act | BCEA", why: "The BCEA limits ordinary hours to 45 per week and regulates overtime pay." },
    { s: "{N} was refused four consecutive months of maternity leave by {B}.", a: "Basic Conditions of Employment Act | BCEA", why: "The BCEA entitles a pregnant employee to at least four consecutive months of maternity leave." },
    { s: "{B} employs a 13-year-old child to pack shelves after school.", a: "Basic Conditions of Employment Act | BCEA", why: "The BCEA prohibits the employment of children under the age of 15." },
    { s: "{B} dismissed {N} without giving any notice or a written contract.", a: "Basic Conditions of Employment Act | BCEA", why: "The BCEA regulates termination of employment (notice periods) and requires written particulars of employment." },
    { s: "{N} lost a finger in a machine while working at {B} and received compensation for the injury.", a: "COIDA | Compensation for Occupational Injuries and Diseases Act", why: "COIDA compensates employees who are injured or contract diseases in the course of their work." },
    { s: "{B} did not register with the Compensation Fund and does not report workplace accidents.", a: "COIDA | Compensation for Occupational Injuries and Diseases Act", why: "COIDA requires employers to register with the Compensation Commissioner and report all accidents." },
    { s: "The family of a worker who died in an accident at the {B} factory received financial support.", a: "COIDA | Compensation for Occupational Injuries and Diseases Act", why: "COIDA pays compensation to the dependants of employees who die from work-related injuries or diseases." },
    { s: "{B} sold 30% of its shares to its black employees and buys its stock from black-owned suppliers.", a: "BBBEE Act | Broad-Based Black Economic Empowerment Act | BBBEE | B-BBEE", why: "Ownership and enterprise and supplier development are BBBEE pillars." },
    { s: "{B} appointed more black women as directors to improve its scorecard rating and win government tenders.", a: "BBBEE Act | Broad-Based Black Economic Empowerment Act | BBBEE | B-BBEE", why: "Management control is a BBBEE pillar, and a good scorecard helps a business to get government contracts." },
    { s: "{B} granted {N} a loan without checking whether he could afford the repayments.", a: "National Credit Act | NCA", why: "The NCA prohibits reckless lending: credit providers must do an affordability assessment." },
    { s: "{N} is over-indebted and applied for debt counselling to restructure her repayments.", a: "National Credit Act | NCA", why: "The NCA introduced debt counselling/debt review to help over-indebted consumers." },
    { s: "{B} keeps sending {N} pre-approved credit offers and automatically increases his credit limit without consent.", a: "National Credit Act | NCA", why: "The NCA does not allow automatic credit-limit increases without the consumer's consent." },
    { s: "{N} returned a faulty cellphone to {B} within six months, but the store refused to repair, replace or refund it.", a: "Consumer Protection Act | CPA", why: "The CPA gives consumers the right to fair value, good quality and safety – unsafe or defective goods may be returned within six months." },
    { s: "{B} advertises a television at a low price, but the customer is told at the till that a higher price must be paid.", a: "Consumer Protection Act | CPA", why: "The CPA gives consumers the right to fair and responsible marketing and to information and disclosure – the displayed price must be honoured." },
    { s: "The contracts of {B} are written in difficult legal language that customers cannot understand.", a: "Consumer Protection Act | CPA", why: "The CPA gives consumers the right to information in plain and understandable language." },
  ],
};

export const LEADERSHIP: ScenarioBank = {
  id: "leadership",
  title: "Which leadership style?",
  topic: "g12-leadership",
  ask: "leadership style",
  options: ["Autocratic", "Democratic", "Laissez-faire", "Charismatic", "Transactional"],
  items: [
    { s: "{N}, the manager of {B}, takes all the decisions alone and tells workers exactly what to do and how to do it.", a: "autocratic | autocratic leadership style | boss-centred", why: "An autocratic leader takes all decisions without consulting followers – communication is one-way (top-down)." },
    { s: "During a factory fire at {B}, {N} gave clear, direct instructions that everybody had to follow immediately.", a: "autocratic | autocratic leadership style | boss-centred", why: "The autocratic style works well in a crisis, when quick decisions are needed." },
    { s: "{N} asks the staff of {B} for their ideas and involves them in the decision before making the final call.", a: "democratic | democratic leadership style | participative", why: "A democratic (participative) leader involves employees in decision-making – communication is two-way." },
    { s: "The team at {B} votes on new product ideas, and {N} uses the suggestions with the most support.", a: "democratic | democratic leadership style | participative", why: "Group participation and a variety of ideas are typical of the democratic style." },
    { s: "{N} gives the experienced designers of {B} the goal and a deadline, and then leaves them to decide how to do the work.", a: "laissez-faire | laissez-faire leadership style | free-reign | free reign | laissez faire", why: "A laissez-faire (free-reign) leader delegates authority and lets competent workers make their own decisions." },
    { s: "{N} is seldom at {B}; the highly skilled engineers set their own targets and solve their own problems.", a: "laissez-faire | laissez-faire leadership style | free-reign | free reign | laissez faire", why: "Followers are responsible for their own decisions in the laissez-faire style." },
    { s: "{N} inspires the workers of {B} with energy, charm and a strong personality – people follow because they believe in {N}.", a: "charismatic | charismatic leadership style", why: "A charismatic leader uses personality, charm and enthusiasm to inspire and motivate followers." },
    { s: "The staff of {B} work late because they admire {N}'s passion and the exciting vision {N} describes at every meeting.", a: "charismatic | charismatic leadership style", why: "Charismatic leaders energise followers through their vision and personal appeal." },
    { s: "{N} pays the sales team of {B} a bonus when they reach the monthly target and gives a warning when they do not.", a: "transactional | transactional leadership style", why: "A transactional leader uses rewards and penalties (punishment) to motivate followers to meet targets." },
    { s: "At {B}, {N} closely monitors performance: workers who follow the rules are rewarded, and those who break them are disciplined.", a: "transactional | transactional leadership style", why: "Transactional leadership focuses on rules, performance standards, rewards and discipline." },
  ],
};

export const STRATEGIES: ScenarioBank = {
  id: "strategy-types",
  title: "Which business strategy?",
  topic: "g12-strategies",
  ask: "business strategy",
  options: ["Forward vertical integration", "Backward vertical integration", "Horizontal integration", "Market penetration", "Market development", "Product development", "Concentric diversification", "Horizontal diversification", "Conglomerate diversification", "Retrenchment", "Divestiture", "Liquidation"],
  items: [
    { s: "{B}, a clothing manufacturer, bought the retail shops that sell its clothes.", a: "forward vertical integration | forward integration", why: "The business takes over its distributors – it moves forward, closer to the consumer." },
    { s: "{B}, a bakery, bought the mill that supplies its flour.", a: "backward vertical integration | backward integration", why: "The business takes over its supplier – it moves backward in the supply chain." },
    { s: "{B} took over a competitor that sells the same products in the same town.", a: "horizontal integration", why: "Taking over or merging with a competitor increases market share." },
    { s: "{B} cut its prices and advertised heavily to sell more of its existing products to its existing market.", a: "market penetration", why: "Existing products, existing market – grow market share with aggressive marketing." },
    { s: "{B}, which trades only in Gauteng, opened branches in Namibia to sell its existing products.", a: "market development", why: "Existing products are sold in a new market." },
    { s: "{B} launched a new sugar-free version of its cooldrink for its current customers.", a: "product development", why: "New or improved products are introduced into the existing market." },
    { s: "{B}, a car manufacturer, started making motorbikes to attract new customers.", a: "concentric diversification", why: "A new product that is related to the existing products is added to attract new customers." },
    { s: "{B}, a hair salon, started selling cooldrinks and snacks to its existing clients.", a: "horizontal diversification", why: "A new product that is unrelated to existing products is added, but it appeals to existing customers." },
    { s: "{B}, a furniture manufacturer, opened a funeral parlour to reach a completely new group of customers.", a: "conglomerate diversification", why: "A new product that is unrelated to existing products is added to appeal to new customers." },
    { s: "{B} reduced its number of employees and closed two product lines to lower its costs.", a: "retrenchment", why: "A defensive strategy: jobs or product lines are terminated to reduce expenses." },
    { s: "{B} sold its unprofitable transport division so that it can focus on its main business.", a: "divestiture | divestment", why: "A defensive strategy: assets or divisions that are no longer profitable are sold off." },
    { s: "{B} sold all its assets to pay its creditors and closed down.", a: "liquidation", why: "A defensive strategy: all assets are sold to pay creditors because of a lack of capital." },
  ],
};

export const PORTER: ScenarioBank = {
  id: "porter-forces",
  title: "Which of Porter's forces?",
  topic: "g12-strategies",
  ask: "Porter's Five Forces model force",
  options: ["Power of suppliers", "Power of buyers", "Competitive rivalry", "Threat of substitution", "Threat of new entrants"],
  items: [
    { s: "The only company that supplies spare parts to {B} increased its prices by 20%.", a: "power of suppliers | bargaining power of suppliers | supplier power", why: "A supplier with few competitors is powerful and can control prices and quality." },
    { s: "{B} can choose between many wholesalers that offer the same stock at similar prices.", a: "power of suppliers | bargaining power of suppliers | supplier power", why: "When there are many suppliers, their power is low and the business can negotiate." },
    { s: "Customers of {B} demand discounts because they can easily buy the same goods elsewhere.", a: "power of buyers | bargaining power of buyers | buyer power | power of consumers", why: "Buyers are powerful when they have many choices and it costs little to switch." },
    { s: "A large chain store buys 70% of the output of {B} and insists on lower prices.", a: "power of buyers | bargaining power of buyers | buyer power | power of consumers", why: "A buyer who buys in bulk has strong bargaining power." },
    { s: "Three other shops in the same street as {B} sell the same products and run price wars.", a: "competitive rivalry | power of competitors | rivalry", why: "Many competitors selling the same products means strong rivalry and less power for the business." },
    { s: "Customers of {B}, a taxi business, are starting to use e-hailing services instead.", a: "threat of substitution | threat of substitutes | substitutes | substitution", why: "A different product that satisfies the same need is a substitute." },
    { s: "Many people now use streaming services in place of the DVDs that {B} rents out.", a: "threat of substitution | threat of substitutes | substitutes | substitution", why: "A cheaper or better substitute can take customers away." },
    { s: "It costs very little to start a business like {B}, so new businesses open in the area every month.", a: "threat of new entrants | barriers to entry | new entrants", why: "Low barriers to entry make it easy for new competitors to enter the market." },
    { s: "A new business needs an expensive licence and R50 million in equipment to compete with {B}.", a: "threat of new entrants | barriers to entry | new entrants", why: "High barriers to entry protect existing businesses from new entrants." },
  ],
};

export const PESTLE: ScenarioBank = {
  id: "pestle-factors",
  title: "Which PESTLE factor?",
  topic: "g12-strategies",
  ask: "PESTLE factor",
  options: ["Political", "Economic", "Social", "Technological", "Legal", "Environmental"],
  items: [
    { s: "The interest rate increased, so customers of {B} have less money to spend.", a: "economic", why: "Interest rates, inflation, exchange rates and unemployment are economic factors." },
    { s: "The rand weakened against the dollar, making the imported stock of {B} more expensive.", a: "economic", why: "Exchange rates are an economic factor." },
    { s: "A change of government policy on trade affects the import permits of {B}.", a: "political", why: "Government policy, political stability and trade agreements are political factors." },
    { s: "Many customers of {B} cannot afford its products because of high unemployment and poverty in the community.", a: "social", why: "Poverty, unemployment, HIV/Aids, crime and changing lifestyles are social factors." },
    { s: "Customers of {B} are becoming more health-conscious and prefer low-sugar products.", a: "social", why: "Changes in lifestyles, culture and demographics are social factors." },
    { s: "{B} loses sales because it cannot afford online shopping software and the latest card machines.", a: "technological", why: "New technology, automation and e-commerce are technological factors." },
    { s: "{B} must change its contracts and labels to comply with the Consumer Protection Act.", a: "legal", why: "Laws and regulations that a business must comply with are legal factors." },
    { s: "{B} was fined because its staff contracts do not meet the requirements of the BCEA.", a: "legal", why: "Complying with legislation is a legal factor." },
    { s: "{B} must find new packaging because customers object to plastic that pollutes rivers.", a: "environmental", why: "Pollution, waste, climate change and sustainability are environmental factors." },
    { s: "A severe drought reduced the supply of the maize that {B} uses in its products.", a: "environmental", why: "Weather, climate and natural resources are environmental factors." },
  ],
};

export const SECTORS: ScenarioBank = {
  id: "sectors",
  title: "Which sector?",
  topic: "g12-sectors",
  ask: "business sector",
  options: ["Primary", "Secondary", "Tertiary"],
  items: [
    { s: "{B} mines platinum near Rustenburg.", a: "primary | primary sector", why: "The primary sector extracts raw materials from nature (mining, farming, fishing, forestry)." },
    { s: "{B} farms with maize and cattle in the Free State.", a: "primary | primary sector", why: "Agriculture is part of the primary sector." },
    { s: "{B} catches hake off the West Coast.", a: "primary | primary sector", why: "Fishing extracts a natural resource – primary sector." },
    { s: "{B} grows pine trees and sells the timber.", a: "primary | primary sector", why: "Forestry is part of the primary sector." },
    { s: "{B} assembles cars in a factory in Gqeberha.", a: "secondary | secondary sector", why: "The secondary sector processes raw materials into finished or semi-finished products (manufacturing, construction)." },
    { s: "{B} builds houses and office blocks.", a: "secondary | secondary sector", why: "Construction is part of the secondary sector." },
    { s: "{B} turns fruit into canned jam.", a: "secondary | secondary sector", why: "Processing raw materials into products is manufacturing – secondary sector." },
    { s: "{B} generates electricity at a power station.", a: "secondary | secondary sector", why: "Generating electricity processes resources into a usable product – secondary sector." },
    { s: "{B} sells groceries to the public in a supermarket.", a: "tertiary | tertiary sector", why: "Retailers provide a service (distribution) – tertiary sector." },
    { s: "{B} transports goods between Durban and Johannesburg.", a: "tertiary | tertiary sector", why: "Transport is a service – tertiary sector." },
    { s: "{B} offers banking and insurance services.", a: "tertiary | tertiary sector", why: "Financial services are part of the tertiary sector." },
    { s: "{B} runs a guest house and a tour-guiding business.", a: "tertiary | tertiary sector", why: "Tourism and hospitality are services – tertiary sector." },
  ],
};

export const ENVIRONMENTS: ScenarioBank = {
  id: "environments",
  title: "Which business environment?",
  topic: "g12-sectors",
  ask: "business environment",
  options: ["Micro", "Market", "Macro"],
  items: [
    { s: "The employees of {B} are often absent and have a poor attitude to their work.", a: "micro | micro environment | internal environment", why: "Employees are inside the business – the micro environment, over which it has full control." },
    { s: "{B} has no clear vision or mission, and its managers lack leadership skills.", a: "micro | micro environment | internal environment", why: "Vision, mission, management and organisational culture are in the micro environment." },
    { s: "The financial function of {B} did not budget enough for marketing.", a: "micro | micro environment | internal environment", why: "The eight business functions are part of the micro environment." },
    { s: "A new competitor opened a shop next to {B} and sells at lower prices.", a: "market | market environment", why: "Competitors are in the market environment – the business has limited control (it can only influence)." },
    { s: "The supplier of {B} delivers stock late every month.", a: "market | market environment", why: "Suppliers are in the market environment." },
    { s: "Customers of {B} complain about poor service and are buying elsewhere.", a: "market | market environment", why: "Consumers/customers are in the market environment." },
    { s: "A trade union called on the members who work at {B} to strike for higher wages.", a: "market | market environment", why: "Trade unions, CBOs, NGOs and regulators are in the market environment." },
    { s: "The Reserve Bank increased the repo rate, so the loan of {B} is more expensive.", a: "macro | macro environment", why: "Interest rates are an economic factor in the macro environment – the business has no control." },
    { s: "Load shedding forces {B} to close for several hours a day.", a: "macro | macro environment", why: "Electricity supply is outside the control of the business – macro environment." },
    { s: "New legislation forces {B} to change the way it stores customer information.", a: "macro | macro environment", why: "Legislation is a legal factor in the macro environment." },
    { s: "High unemployment and crime in the country reduce the sales of {B}.", a: "macro | macro environment", why: "Social factors in the macro environment are outside the control of the business." },
  ],
};

export const TEAM_STAGES: ScenarioBank = {
  id: "team-stages",
  title: "Which stage of team development?",
  topic: "g12-teams",
  ask: "stage of team development",
  options: ["Forming", "Storming", "Norming", "Performing", "Adjourning"],
  items: [
    { s: "The new project team of {B} met for the first time; members were polite and got to know one another.", a: "forming", why: "Forming: individuals gather information and impressions and are comfortable and polite." },
    { s: "The team members of {B} are unsure of their roles and look to the leader for guidance on the task.", a: "forming", why: "Forming: people focus on being busy with routines such as team organisation." },
    { s: "The team members of {B} argue about who should lead and different ideas compete for attention.", a: "storming", why: "Storming: teams go through a period of unease and conflict; power struggles are common." },
    { s: "Some members of the {B} team openly confront one another and cliques begin to form.", a: "storming", why: "Storming: tension, struggles and arguments occur as members compete." },
    { s: "The team of {B} has agreed on rules and roles, and members now accept one another.", a: "norming", why: "Norming: team members come to an agreement and reach consensus; roles and responsibilities are clear." },
    { s: "Conflict in the {B} team has been settled, and processes and working styles have been agreed on.", a: "norming", why: "Norming: processes and procedures are established and commitment develops." },
    { s: "The team of {B} works independently towards its goal without supervision and solves its own problems.", a: "performing", why: "Performing: the team is aware of strategies and aims, works without interference and reaches its goals." },
    { s: "The {B} project is complete; the team is breaking up and members feel sad to leave.", a: "adjourning | mourning | adjourning/mourning", why: "Adjourning/mourning: the focus is on completing the task, and breaking up may be traumatic." },
  ],
};

export const INSURANCE_PRINCIPLES: ScenarioBank = {
  id: "insurance-principles",
  title: "Which principle of insurance?",
  topic: "g12-insurance",
  ask: "principle of insurance",
  options: ["Indemnification", "Security", "Utmost good faith", "Insurable interest"],
  items: [
    { s: "{N}'s car was stolen. The insurer paid out the market value of the car so that {N} was in the same financial position as before the theft.", a: "indemnification | indemnity", why: "Indemnification: the insured is compensated for the proven loss and placed in the same position as before – no profit may be made." },
    { s: "{N}'s shop burnt down. {N} first had to prove the value of the stock that was lost before the insurer paid.", a: "indemnification | indemnity", why: "Indemnity applies to short-term insurance: the insured must prove the amount of the loss." },
    { s: "{N} took out a life policy that will pay a fixed amount of R1 million to her family when she dies.", a: "security | certainty", why: "Security/certainty: a predetermined amount is paid out when the insured reaches a certain age or dies – it applies to long-term insurance." },
    { s: "{N}'s retirement annuity will pay out an agreed amount when he turns 65.", a: "security | certainty", why: "Security/certainty: the event is certain and the amount is agreed in advance." },
    { s: "The insurer refused {N}'s claim because he did not disclose that the car had been in a serious accident before.", a: "utmost good faith", why: "Utmost good faith: the insured must be honest and disclose all relevant facts in the proposal form." },
    { s: "{N} had to declare her heart condition when she applied for a life policy.", a: "utmost good faith", why: "Both parties must disclose all relevant information; if not, the contract may be void." },
    { s: "{N} may not insure the neighbour's house, because {N} would lose nothing if it burnt down.", a: "insurable interest", why: "Insurable interest: the insured must prove that he or she will suffer a financial loss if the object is damaged." },
    { s: "{B} can insure its delivery vans because the business would lose money if they were stolen.", a: "insurable interest", why: "There must be a financial interest in the insured object and a legal relationship to it." },
  ],
};

export const OWNERSHIP: ScenarioBank = {
  id: "ownership-forms",
  title: "Which form of ownership?",
  topic: "g12-ownership",
  ask: "form of ownership",
  options: ["Sole trader", "Partnership", "Private company", "Personal liability company", "Public company", "State-owned company", "Non-profit company", "Co-operative"],
  items: [
    { s: "{N} owns a spaza shop alone, takes all the decisions and keeps all the profit.", a: "sole trader | sole proprietor | sole proprietorship", why: "One owner, unlimited liability, no legal formalities – a sole trader." },
    { s: "{N} and two friends signed an agreement to run a plumbing business and share profits; each is jointly and severally liable for its debts.", a: "partnership", why: "Two or more people share responsibility, capital and profit and have unlimited liability." },
    { s: "The name of the business ends with (Pty) Ltd and it may not offer its shares to the public.", a: "private company", why: "A private company's name ends in (Pty) Ltd/Proprietary Limited and its shares are not freely transferable." },
    { s: "The name of the business ends with Ltd, its shares are traded on the JSE and it must publish a prospectus.", a: "public company", why: "A public company (Ltd) raises capital from the public and needs at least three directors." },
    { s: "A firm of attorneys' name ends with Inc.; the directors are personally liable for the debts of the company.", a: "personal liability company", why: "A personal liability company (Inc./Incorporated) – directors are jointly and severally liable for debts." },
    { s: "The name of the business ends with SOC Ltd and the government is its main shareholder.", a: "state-owned company | SOC", why: "A state-owned company (SOC Ltd) is owned by the government and listed as a public entity." },
    { s: "The name of the organisation ends with NPC; it was set up for a public benefit and does not pay dividends.", a: "non-profit company | NPC", why: "A non-profit company uses all its income to promote its stated goal." },
    { s: "Ten small farmers formed a business with Limited at the end of its name to buy seed in bulk and share resources; each member has one vote.", a: "co-operative | cooperative | co-operative society", why: "A co-operative is owned and democratically controlled by at least five members who share a common need." },
  ],
};

export const TECHNIQUES: ScenarioBank = {
  id: "problem-solving-techniques",
  title: "Which problem-solving technique?",
  topic: "g12-creative",
  ask: "problem-solving technique",
  options: ["Delphi technique", "Force-field analysis", "Brainstorming", "Nominal group technique", "Mind mapping", "SCAMPER", "Forced combinations", "Empty chair technique"],
  items: [
    { s: "{B} sent a questionnaire to a panel of experts, who do not meet. Their answers were summarised and sent back for a second round until consensus was reached.", a: "Delphi technique | Delphi", why: "Delphi: experts answer questionnaires anonymously in rounds until they reach consensus." },
    { s: "{B} invited specialists from other provinces to complete a questionnaire on how to improve its product, without ever bringing them together.", a: "Delphi technique | Delphi", why: "Delphi uses a panel of experts who do not have to be in one place." },
    { s: "The managers of {B} listed the forces for and against a proposed change, gave each a score and compared the totals.", a: "force-field analysis | force field analysis | force-field | force field", why: "Force-field analysis weighs driving forces (for) against restraining forces (against)." },
    { s: "{B} wants to move to a four-day week. It lists the advantages and disadvantages, scores them, and decides whether the driving forces are stronger.", a: "force-field analysis | force field analysis | force-field | force field", why: "If the driving forces outweigh the restraining forces, the change is likely to succeed." },
    { s: "The staff of {B} call out as many ideas as possible; every idea is written on a flip chart and nobody may criticise.", a: "brainstorming", why: "Brainstorming: a group generates many ideas quickly without judging them." },
    { s: "Each employee of {B} silently writes down ideas, shares one idea at a time with the small group, and then everybody ranks the ideas by voting.", a: "nominal group technique | NGT | nominal group", why: "Nominal group technique: silent idea generation, sharing in turn, then individual ranking/voting." },
    { s: "{N} writes the problem in the middle of a page and draws branches with related ideas and sub-ideas around it.", a: "mind mapping | mind map | mind-mapping", why: "A mind map shows ideas visually around a central theme." },
    { s: "{B} improves an existing product by asking: what can we substitute, combine, adapt, modify, put to another use, eliminate or rearrange?", a: "SCAMPER", why: "SCAMPER: Substitute, Combine, Adapt, Modify, Put to another use, Eliminate, Rearrange/Reverse." },
    { s: "{B} combines two unrelated items – a cellphone cover and a wallet – to create a new product idea.", a: "forced combinations | forced combination", why: "Forced combinations: unrelated objects or ideas are combined to create something new." },
    { s: "{N} speaks to an empty chair as if the customer who complained is sitting in it, to understand the other point of view.", a: "empty chair technique | empty chair", why: "Empty chair: you imagine another person in the chair and explore the problem from their perspective." },
  ],
};

export const TQM: ScenarioBank = {
  id: "tqm-elements",
  title: "Which TQM element?",
  topic: "g12-quality",
  ask: "TQM element",
  options: ["Continuous skills development", "Total client satisfaction", "Continuous improvement to processes and systems", "Adequate financing and capacity", "Monitoring and evaluation of quality processes"],
  items: [
    { s: "{B} sends its workers on regular training courses so that they can do their jobs better.", a: "continuous skills development | education and training", why: "Continuous skills development/education and training keeps employees' skills up to date." },
    { s: "{B} has an induction programme and offers learnerships to improve the competence of its workers.", a: "continuous skills development | education and training", why: "Ongoing training increases productivity and the quality of work." },
    { s: "{B} does market research and follows up on every complaint to make sure customers are happy.", a: "total client satisfaction | total customer satisfaction | total client/customer satisfaction", why: "Total client/customer satisfaction: the business uses market research and feedback to meet customers' needs." },
    { s: "{B} uses customer surveys and a suggestion box to find out whether its products meet expectations.", a: "total client satisfaction | total customer satisfaction | total client/customer satisfaction", why: "Understanding customers' needs and measuring their satisfaction is the focus of this element." },
    { s: "{B} uses the PDCA cycle and quality circles to make its production process a little better all the time.", a: "continuous improvement to processes and systems | continuous improvement", why: "Continuous improvement uses the PDCA model and quality circles to improve processes." },
    { s: "{B} budgeted enough money to buy modern machines and to test its products before they are sold.", a: "adequate financing and capacity", why: "Adequate financing and capacity: enough funds and resources to meet orders and quality standards." },
    { s: "{B} cannot deliver large orders on time because it does not have enough capital or machines.", a: "adequate financing and capacity", why: "Without adequate financing and capacity a business cannot produce enough quality goods." },
    { s: "{B} checks at every stage of production whether its quality targets were reached and corrects what went wrong.", a: "monitoring and evaluation of quality processes | monitoring and evaluation", why: "Monitoring and evaluation prevents waste and identifies gaps in the process." },
  ],
};

export const UNETHICAL: ScenarioBank = {
  id: "unethical-practices",
  title: "Which unethical or unprofessional practice?",
  topic: "g12-ethics",
  ask: "type of unethical or unprofessional business practice",
  options: ["Sexual harassment", "Unauthorised use of funds", "Abuse of work time", "Unfair advertising", "Pricing of goods in rural areas", "Taxation"],
  items: [
    { s: "A supervisor at {B} promises {N} a promotion in exchange for a sexual favour.", a: "sexual harassment", why: "Unwelcome sexual advances or requests linked to work are sexual harassment." },
    { s: "{N} keeps sending unwanted, suggestive messages to a colleague at {B}.", a: "sexual harassment", why: "Unwelcome behaviour of a sexual nature creates a hostile workplace." },
    { s: "{N}, the bookkeeper of {B}, uses the business bank card to pay for a family holiday.", a: "unauthorised use of funds | unauthorised use of funds and resources | fraud", why: "Using business funds for personal benefit without permission is unauthorised use of funds (fraud)." },
    { s: "{N} spends two hours of each working day at {B} on social media and takes very long lunch breaks.", a: "abuse of work time | abusing work time", why: "Employees who use working hours for personal matters waste the employer's money." },
    { s: "{N} runs a private online business from the office during the working hours of {B}.", a: "abuse of work time | abusing work time", why: "Doing private work during paid hours is abuse of work time." },
    { s: "{B} advertises second-hand goods as new and uses fine print to hide extra costs.", a: "unfair advertising", why: "Misleading or false claims in advertisements are unfair advertising." },
    { s: "{B} runs a 'bait and switch' advert: the cheap item is never in stock and customers are pushed to buy a dearer one.", a: "unfair advertising", why: "Bait-and-switch advertising misleads consumers." },
    { s: "{B} charges much higher prices in a remote village, where it is the only shop, than in its town branch.", a: "pricing of goods in rural areas", why: "Exploiting rural consumers who have no other choice with inflated prices is unethical." },
    { s: "{B} keeps two sets of books and does not declare all its income to SARS.", a: "taxation | tax evasion", why: "Hiding income to pay less tax is tax evasion – it is illegal and unethical." },
  ],
};

export const TRIPLE: ScenarioBank = {
  id: "triple-bottom-line",
  title: "Profit, people or planet?",
  topic: "g12-csr",
  ask: "element of the triple bottom line",
  options: ["Profit", "People", "Planet"],
  items: [
    { s: "{B} builds a clinic and gives bursaries to learners in the community.", a: "people | social", why: "People: business operations should not be at the expense of society – the business invests in communities and employees." },
    { s: "{B} offers its workers HIV/Aids counselling and a wellness programme.", a: "people | social", why: "People: caring for the well-being of employees and the community." },
    { s: "{B} recycles its waste, uses solar power and plants trees to offset its emissions.", a: "planet | environment | environmental", why: "Planet: the business should not harm or exhaust natural resources." },
    { s: "{B} replaced plastic packaging with packaging that is biodegradable.", a: "planet | environment | environmental", why: "Planet: reducing the environmental impact of production." },
    { s: "{B} keeps its costs low so that shareholders receive a fair return, without harming the community.", a: "profit | economic", why: "Profit: the business must stay financially sustainable – but not maximise profit at the expense of others." },
    { s: "{B} reinvests part of its earnings to grow the business and create more jobs.", a: "profit | economic", why: "Profit: economic value created by the business benefits its owners and the economy." },
  ],
};

export const RIGHTS: ScenarioBank = {
  id: "human-rights",
  title: "Which human right in the workplace?",
  topic: "g12-rights",
  ask: "human right in the workplace",
  options: ["Privacy", "Dignity", "Equity", "Freedom of speech and expression", "Information", "Safety, security and protection of life"],
  items: [
    { s: "The manager of {B} reads {N}'s personal emails and shares her medical records with other staff.", a: "privacy", why: "Privacy: businesses may not disclose personal information or read private correspondence without consent." },
    { s: "A supervisor at {B} swears at {N} and humiliates him in front of customers.", a: "dignity | respect and dignity | human dignity", why: "Dignity: employees must be treated with respect, regardless of their position." },
    { s: "{B} pays {N} less than a colleague who does the same job, because of her race.", a: "equity | equality", why: "Equity: equal pay for work of equal value and no unfair discrimination." },
    { s: "{N} was victimised by {B} after raising a complaint about working conditions at a staff meeting.", a: "freedom of speech and expression | freedom of speech | freedom of expression", why: "Employees may voice their opinions and grievances without being punished." },
    { s: "{B} refuses to show {N} her own employment contract and the workplace policies.", a: "information | access to information", why: "Information: employees should have access to information such as contracts and policies, and be told about decisions that affect them." },
    { s: "{B} expects workers to handle dangerous chemicals without gloves, masks or training.", a: "safety, security and protection of life | safety | safety and security", why: "Employees have the right to work in a safe environment with protective clothing." },
  ],
};

export const RECRUIT_SOURCE: ScenarioBank = {
  id: "recruitment-sources",
  title: "Internal or external recruitment?",
  topic: "g12-hr",
  ask: "method of recruitment (internal or external)",
  options: ["Internal", "External"],
  items: [
    { s: "{B} advertises a supervisor vacancy on the staff notice board.", a: "internal | internal recruitment", why: "Internal recruitment fills a vacancy from inside the business (notice boards, internal emails, intranet, word of mouth, newsletters)." },
    { s: "{B} emails the vacancy to all current staff members and posts it on the intranet.", a: "internal | internal recruitment", why: "Only existing employees see the vacancy – internal recruitment." },
    { s: "The head of department at {B} recommends a junior employee for promotion to the vacant post.", a: "internal | internal recruitment", why: "Promotion from within is internal recruitment." },
    { s: "{B} places an advertisement for an accountant in a national newspaper.", a: "external | external recruitment", why: "External recruitment looks for candidates outside the business (printed media, electronic media, agencies, walk-ins, headhunting)." },
    { s: "{B} asks a recruitment agency to find a suitable marketing manager.", a: "external | external recruitment", why: "Recruitment agencies supply candidates from outside the business." },
    { s: "{B} headhunts a top engineer who works for a competitor.", a: "external | external recruitment", why: "Headhunting approaches people with scarce skills outside the business." },
    { s: "{B} advertises its vacancy on a careers website and on social media.", a: "external | external recruitment", why: "Electronic media reach candidates outside the business." },
    { s: "{N} walks into {B} and hands in a CV although no post was advertised.", a: "external | external recruitment", why: "Walk-ins are a source of external recruitment." },
  ],
};

export const VISUAL_AIDS: ScenarioBank = {
  id: "visual-aids",
  title: "Which visual aid?",
  topic: "g12-presentation",
  ask: "visual aid",
  options: ["Data projector / PowerPoint", "Interactive whiteboard", "Handouts", "Flip chart", "Posters", "Video / audio-visual", "Tables", "Graphs"],
  items: [
    { s: "{N} connects a laptop to a device that displays her slides on a large screen for the whole audience.", a: "data projector | PowerPoint | data projector/PowerPoint | slides", why: "A data projector/PowerPoint shows slides with text, images and animation to a large audience." },
    { s: "{N} writes on a screen with a special pen, saves the notes and opens websites by touching the board.", a: "interactive whiteboard | smart board | smartboard", why: "An interactive whiteboard/smart board is touch-controlled and can save notes." },
    { s: "{N} gives every board member a printed summary of the presentation with space for notes.", a: "handouts | handout | hand-outs", why: "Handouts are printed notes that the audience can keep and refer to later." },
    { s: "{N} writes the ideas from the audience with a marker on large sheets of paper on a stand.", a: "flip chart | flipchart | flip charts", why: "A flip chart is useful for small groups and brainstorming – it needs no electricity." },
    { s: "{N} sticks large printed sheets with pictures and key words on the walls of the venue.", a: "posters | poster | posters/banners | banners", why: "Posters/banners can add impact and stay up for the whole presentation." },
    { s: "{N} plays a short recording that shows how the new machine works, with sound.", a: "video | audio-visual | video conferencing | videos", why: "Audio-visual aids (video) combine sound and moving images – useful for demonstrations." },
    { s: "{N} shows the sales figures of four branches in rows and columns so that exact amounts can be compared.", a: "tables | table", why: "Tables show exact data in rows and columns." },
    { s: "{N} uses a line that rises from left to right to show the trend in profit over five years.", a: "graphs | graph | line graph | charts", why: "Graphs/charts show trends and comparisons at a glance." },
  ],
};

export const LASO: ScenarioBank = {
  id: "laso",
  title: "Which LASO component?",
  topic: "skills-exam",
  ask: "component of insight (LASO)",
  options: ["Layout", "Analysis", "Synthesis", "Originality"],
  items: [
    { s: "The marker checks whether the essay has an introduction, a body with headings and a conclusion.", a: "layout | layout/structure | structure", why: "Layout/structure (2 marks): introduction, body and conclusion." },
    { s: "The marker checks whether the candidate broke the question down into headings and subheadings and showed understanding of what was asked.", a: "analysis | analysis and interpretation | interpretation", why: "Analysis and interpretation (2 marks): the ability to break the question down into headings/subheadings and interpret it correctly." },
    { s: "The marker checks whether only relevant facts were given – no padding or content from other topics.", a: "synthesis", why: "Synthesis (2 marks): only relevant facts, based on the questions that were asked." },
    { s: "The marker looks for current, recent examples and facts that do not come from the textbook.", a: "originality", why: "Originality (2 marks): examples, recency of information, current trends and developments." },
  ],
};

export const SCENARIO_BANKS: ScenarioBank[] = [ACTS, STRATEGIES, PORTER, PESTLE, SECTORS, ENVIRONMENTS, RECRUIT_SOURCE, TQM, LEADERSHIP, INSURANCE_PRINCIPLES, OWNERSHIP, VISUAL_AIDS, UNETHICAL, TECHNIQUES, TRIPLE, RIGHTS, TEAM_STAGES, LASO];

/** Fill the `{B}` and `{N}` placeholders. */
export const fill = (s: string, business: string, person: string) => s.replaceAll("{B}", business).replaceAll("{N}", person);
