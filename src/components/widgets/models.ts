import type { ModelId } from "@/content/types";

export interface ModelPart {
  id: string;
  name: string;
  emoji: string;
  /** What it is / what happens – in exam language. */
  what: string;
  /** A short clue or scenario used in "Which one is it?" mode. */
  clue: string;
}

export interface Model {
  title: string;
  /** "steps" models are a process in a fixed order; "set" models are a group of parts. */
  kind: "set" | "steps";
  intro: string;
  colour: string;
  parts: ModelPart[];
}

const P = (id: string, emoji: string, name: string, what: string, clue: string): ModelPart => ({ id, emoji, name, what, clue });

/** Every tappable model and framework. Explore one part at a time, then test yourself with scenarios. */
export const MODELS: Record<ModelId, Model> = {
  swot: {
    title: "SWOT analysis", kind: "set", colour: "var(--t-diversity)",
    intro: "A SWOT analysis looks at the internal (micro) and external (market and macro) environments. Strengths and weaknesses are INSIDE the business; opportunities and threats are OUTSIDE.",
    parts: [
      P("s", "💪", "Strengths", "Internal factors that the business does well and that give it an advantage, e.g. skilled staff, a strong brand, a good location, enough capital.", "The business has experienced, well-trained employees and a loyal customer base."),
      P("w", "🩹", "Weaknesses", "Internal factors that hold the business back, e.g. poor management, old equipment, high staff turnover, a lack of capital.", "The machines are old and break down often, and the manager lacks leadership skills."),
      P("o", "🚪", "Opportunities", "External factors that the business can use to its advantage, e.g. a new market, a competitor closing down, new technology, lower interest rates.", "A competitor in the area closed down and a new shopping mall is being built nearby."),
      P("t", "⛈️", "Threats", "External factors that can harm the business, e.g. new competitors, load shedding, rising inflation, new legislation, crime.", "A large chain store is opening next door and load shedding interrupts production."),
    ],
  },
  porter: {
    title: "Porter's Five Forces", kind: "set", colour: "var(--t-diversity)",
    intro: "Porter's Five Forces model analyses the MARKET environment – how strong a business's position is against its competitors.",
    parts: [
      P("rivalry", "⚔️", "Competitive rivalry / power of competitors", "How many competitors there are and how strong they are. If competitors sell the same or similar products, the business has little power in the market. Businesses must draw up competitor profiles and do market research.", "Four shops in the same street sell the same product and keep undercutting one another's prices."),
      P("entrants", "🚧", "Threat of new entrants / barriers to entry", "How easy it is for new businesses to enter the market. If barriers to entry are low (little capital, no licences), new entrants are a big threat. New competitors may quickly take market share.", "Anyone can start this kind of business from home with very little capital."),
      P("buyers", "🛒", "Power of buyers", "How easy it is for buyers to drive prices down. Buyers are powerful when they buy in bulk, have many choices and can switch easily. Powerful buyers can force prices down and demand better quality.", "One big customer buys most of the output and demands a 15% discount."),
      P("suppliers", "🚚", "Power of suppliers", "How easy it is for suppliers to drive prices up. Suppliers are powerful when there are few of them or their product is unique. The business should identify alternative suppliers.", "There is only one supplier of the key raw material, and it raises prices whenever it likes."),
      P("substitutes", "🔁", "Threat of substitution / substitutes", "Whether customers can replace the product with a different one that satisfies the same need. If a cheaper substitute exists, the business may lose customers.", "Customers are switching from butter to cheaper margarine."),
    ],
  },
  pestle: {
    title: "PESTLE analysis", kind: "set", colour: "var(--t-diversity)",
    intro: "PESTLE analyses the MACRO environment – the factors a business cannot control but must respond to.",
    parts: [
      P("p", "🏛️", "Political", "Government policy, political stability, trade agreements, tenders and taxes on imports.", "A new government trade policy makes it harder to import stock from overseas."),
      P("e", "💱", "Economic", "Interest rates, inflation, exchange rates, unemployment, economic growth and taxes.", "The repo rate went up, so loans cost more and customers spend less."),
      P("s", "👨‍👩‍👧", "Social", "Poverty, unemployment, HIV/Aids, crime, education levels, culture, lifestyles and population trends.", "Customers are moving to a healthier lifestyle and many people in the area are unemployed."),
      P("t", "💻", "Technological", "New machinery, automation, e-commerce, social media and the cost of keeping up with technology.", "Competitors sell online and accept cellphone payments; the business cannot afford the new systems."),
      P("l", "📜", "Legal", "Acts and regulations the business must comply with, e.g. the CPA, NCA, BCEA, licences and contracts.", "A new Act forces the business to rewrite its contracts and pay a penalty if it does not comply."),
      P("env", "🌳", "Environmental", "Pollution, waste, climate change, scarce natural resources and pressure to 'go green'.", "The community complains that the factory pollutes the river, and a drought has reduced supplies."),
    ],
  },
  "strategic-process": {
    title: "The strategic management process", kind: "steps", colour: "var(--t-diversity)",
    intro: "How a business develops a strategy. (Option 1 from the examination guidelines – learn the steps in order.)",
    parts: [
      P("vision", "🔭", "Have a clear vision, mission and measurable goals", "Know where the business wants to go: have a clear vision, a mission statement and measurable/realistic objectives in place.", "The owners rewrite the long-term dream and the SMART objectives of the business."),
      P("scan", "🔍", "Identify opportunities and threats – environmental scanning", "Analyse the micro, market and macro environments with tools such as SWOT, Porter's Five Forces and PESTLE.", "Management does a SWOT and a PESTLE analysis to see what is happening inside and outside the business."),
      P("formulate", "🧠", "Formulate strategies and alternative strategies", "Develop strategies (and alternatives) to respond to the challenges that were identified.", "Managers list three possible strategies to deal with the new competitor."),
      P("implement", "🛠️", "Implement the strategy", "Put the chosen strategy into action: draw up action plans, communicate them and allocate resources and tasks.", "Action plans are drawn up, tasks are delegated and resources are allocated."),
      P("control", "📏", "Control, evaluate and monitor", "Compare actual performance with expected performance, identify gaps and take corrective action. Continuously evaluate the strategy.", "Six months later, management measures the results against the targets and takes corrective action."),
    ],
  },
  "strategy-types": {
    title: "Types of business strategies", kind: "set", colour: "var(--t-diversity)",
    intro: "Four families of strategies. Memory aid: I-I-D-D – Integration, Intensive, Diversification, Defensive.",
    parts: [
      P("forward", "➡️", "Forward vertical integration", "INTEGRATION. The business combines with or takes over its distributors (e.g. a factory buys retail shops). It gains control over distribution and gets closer to the consumer.", "A shoe factory buys the chain of shoe shops that sells its shoes."),
      P("backward", "⬅️", "Backward vertical integration", "INTEGRATION. The business combines with or takes over its suppliers. It controls the supply and cost of raw materials.", "A restaurant buys the farm that supplies its vegetables."),
      P("horizontal-int", "↔️", "Horizontal integration", "INTEGRATION. The business takes over or merges with a competitor that sells similar products, to increase market share and reduce competition.", "A cellphone network merges with a rival cellphone network."),
      P("penetration", "🎯", "Market penetration", "INTENSIVE. Existing products are sold in the existing market. The business uses aggressive marketing – lower prices, advertising, promotions – to increase market share.", "A supermarket cuts prices and runs a big advertising campaign to win more of its current market."),
      P("market-dev", "🗺️", "Market development", "INTENSIVE. Existing products are sold in NEW markets, e.g. a new region, country or target group.", "A Gauteng fast-food chain opens outlets in Botswana."),
      P("product-dev", "🧪", "Product development", "INTENSIVE. NEW or improved products are introduced into the existing market.", "A cooldrink company launches a new flavour for its existing customers."),
      P("concentric", "🎡", "Concentric diversification", "DIVERSIFICATION. New products that are RELATED to existing products are added to appeal to NEW customers.", "A television manufacturer starts making computer monitors."),
      P("horizontal-div", "🧺", "Horizontal diversification", "DIVERSIFICATION. New products that are UNRELATED to existing products are added, but they appeal to EXISTING customers.", "A petrol station adds a bakery for the motorists who already stop there."),
      P("conglomerate", "🏙️", "Conglomerate diversification", "DIVERSIFICATION. New products that are UNRELATED to existing products are added to appeal to NEW customers.", "A clothing company buys a gold mine."),
      P("retrenchment", "✂️", "Retrenchment", "DEFENSIVE. The business reduces costs by terminating the employment contracts of some employees or cutting product lines for operational reasons.", "A factory reduces its workforce by 100 people to cut costs."),
      P("divestiture", "💸", "Divestiture / divestment", "DEFENSIVE. The business sells off assets, divisions or product lines that are unprofitable or not part of its core business.", "A hotel group sells its loss-making car-hire division."),
      P("liquidation", "🔒", "Liquidation", "DEFENSIVE. The business sells all its assets to pay creditors and closes down, because it has no capital to continue.", "The owners sell everything, pay the creditors and stop trading."),
    ],
  },
  environments: {
    title: "The three business environments", kind: "set", colour: "var(--t-diversity)",
    intro: "Every challenge a business faces comes from one of three environments. The big exam question: how much CONTROL does the business have?",
    parts: [
      P("micro", "🏠", "Micro (internal) environment", "Everything INSIDE the business: vision, mission and goals, management and leadership, organisational culture, resources, and the eight business functions. The business has FULL control.", "Staff are unmotivated, and the purchasing department keeps ordering the wrong stock."),
      P("market", "🏪", "Market environment", "Immediately OUTSIDE the business: consumers/customers, suppliers, intermediaries, competitors, and other organisations such as trade unions, NGOs and CBOs. The business has LIMITED/PARTIAL control – it can only influence.", "Suppliers deliver late and a competitor has launched a cheaper product."),
      P("macro", "🌐", "Macro environment", "The wider world: Political, Economic, Social, Technological, Legal and Environmental (PESTLE) factors. The business has NO control – it can only adapt.", "Inflation is rising, load shedding has returned and a new law has been passed."),
    ],
  },
  recruitment: {
    title: "The recruitment procedure", kind: "steps", colour: "var(--t-energy)",
    intro: "How the human resources manager finds applicants for a vacancy.",
    parts: [
      P("identify", "📌", "Identify the vacancy and do a job analysis", "The HR manager evaluates the job/prepares a job analysis, which includes the job description and the job specification, to identify the recruitment needs.", "HR writes down the duties of the post and the qualifications a person needs to do it."),
      P("source", "🧭", "Choose the method: internal or external", "The HR manager decides whether to recruit internally (from inside the business) or externally. If internal recruitment is unsuccessful, external recruitment is used.", "HR decides to look inside the business first before advertising to the public."),
      P("advert", "📰", "Prepare and place the advertisement", "The vacancy is advertised with the relevant information: name of the business, contact details, contact person, the requirements and the closing date. It is placed in suitable media that will reach the target market.", "A notice with the requirements and the closing date is placed in the newspaper and online."),
      P("receive", "📥", "Receive the applications", "Applications (CVs, application forms and certified documents) are collected up to the closing date and passed on to the selection process.", "CVs and certified copies of qualifications arrive before the closing date."),
    ],
  },
  selection: {
    title: "The selection procedure", kind: "steps", colour: "var(--t-energy)",
    intro: "How the best candidate is chosen from all the applicants.",
    parts: [
      P("criteria", "📋", "Determine fair assessment criteria", "Selection criteria are based on the job description and specification, so that every applicant is measured in the same way.", "The panel agrees on the requirements against which every applicant will be measured."),
      P("screen", "🔎", "Receive applications and do preliminary screening", "Applicants submit application forms/CVs and certified copies. All applications are screened/checked against the criteria, and those that do not meet the minimum requirements are eliminated.", "CVs without the required diploma are put aside."),
      P("checks", "☎️", "Check references and do background checks", "Information in the CVs is verified: contact references, check qualifications, criminal records and credit history.", "HR phones previous employers and verifies the qualifications."),
      P("shortlist", "📑", "Compile a shortlist", "A list of the 3–5 most suitable candidates is drawn up, and they are invited to an interview.", "Five applicants are chosen and told the date, time and place of their interviews."),
      P("tests", "🧩", "Conduct selection tests (if needed)", "Shortlisted candidates may write skills, aptitude, personality or medical tests to assess their abilities.", "Candidates do a typing-speed test and a personality questionnaire."),
      P("interview", "🗣️", "Conduct interviews", "The panel interviews each shortlisted candidate, asks the same questions and records the scores.", "A panel asks each candidate the same set of questions and scores the answers."),
      P("offer", "🤝", "Select the best candidate and make an offer", "The most suitable candidate is offered the job in writing. Unsuccessful applicants are informed. The employment contract is then signed.", "The top-scoring candidate receives a written job offer and the others get a letter of regret."),
    ],
  },
  tqm: {
    title: "The TQM elements", kind: "set", colour: "var(--t-energy)",
    intro: "Total Quality Management is an integrated system applied throughout the business. The exam asks how each element affects LARGE businesses (positives and negatives).",
    parts: [
      P("skills", "🎓", "Continuous skills development / education and training", "Large businesses have a human resources department dedicated to skills training. Trained employees are more productive and motivated, and can be trained in quality circles. BUT: poor communication systems may prevent effective training, and trained staff may leave for better jobs.", "Workers attend regular courses, and the business has a training budget and an induction programme."),
      P("client", "😊", "Total client / customer satisfaction", "Large businesses use market research and customer surveys to measure and monitor satisfaction, and they build positive relationships with customers. This leads to loyal customers, higher sales and a competitive advantage. BUT: employees who seldom meet customers may not know what customers want, and monopolies may not need to please customers.", "The business phones customers after every sale and analyses its complaints register."),
      P("improve", "♻️", "Continuous improvement to processes and systems", "Large businesses have more resources to check on quality performance in each unit, to use the PDCA cycle and quality circles, and to hire quality-control inspectors. BUT: large scale makes it hard to keep control, and some employees resist change.", "Teams use the PDCA cycle and quality circles to remove small faults from the process every week."),
      P("finance", "💰", "Adequate financing and capacity", "Large businesses have enough capital for new equipment, research and testing, and for prototypes and samples. They can afford product research. BUT: if demand outstrips production capacity, orders cannot be met, and fast growth can strain funds.", "The business budgets for modern machines and can test products before selling them."),
      P("monitor", "📈", "Monitoring and evaluation of quality processes", "Large businesses can set targets, measure results against them, use benchmarking and take corrective action – this prevents waste and identifies gaps. BUT: it takes time away from production, and effective quality checks are expensive.", "Managers compare the reject rate with the target each month and correct what went wrong."),
    ],
  },
  pdca: {
    title: "The PDCA cycle", kind: "steps", colour: "var(--t-energy)",
    intro: "Plan–Do–Check–Act is the model for the continuous improvement of processes and systems. It never ends: after Act, you plan again.",
    parts: [
      P("plan", "📝", "Plan", "The business identifies the problem and develops a plan for improvement to processes and systems. Answer questions such as 'what to do' and 'how to do it'.", "The team identifies why deliveries are late and designs a better route schedule."),
      P("do", "▶️", "Do", "The business implements the change on a small scale and puts the planned process into action.", "The new route schedule is tried out in one branch for a month."),
      P("check", "🔬", "Check / analyse", "The business uses data to analyse the results of the change, and determines whether it made a difference and what needs to be changed.", "Delivery times in the pilot branch are measured and compared with the old times."),
      P("act", "✅", "Act as needed", "The business institutionalises the improvement – it is implemented across the business. If necessary, the process is revised and the cycle starts again.", "The new schedule is rolled out to all branches and becomes the standard."),
    ],
  },
  "leadership-styles": {
    title: "Leadership styles", kind: "set", colour: "var(--t-cell)",
    intro: "Five leadership styles. A good leader chooses the style that fits the situation, the task and the followers.",
    parts: [
      P("democratic", "🗳️", "Democratic / participative", "The leader involves employees in decision-making. Two-way communication. Works when the leader does not have all the information and the team is experienced. + New ideas, motivated staff, group commitment. − Slow decisions; not effective in a crisis.", "The manager holds a meeting, listens to everyone's suggestions and then decides."),
      P("autocratic", "📢", "Autocratic / boss-centred", "The leader takes all the decisions alone. One-way (top-down) communication. Works in a crisis, with new or unskilled workers and when deadlines are tight. + Quick decisions, clear direction. − Demotivated staff, no new ideas, high absenteeism.", "The manager gives orders, expects them to be followed and does not ask for opinions."),
      P("laissez", "🕊️", "Laissez-faire / free-reign", "The leader delegates and leaves workers to make their own decisions. Works with highly skilled, experienced and motivated workers. + Workers develop and feel trusted. − Lack of direction, missed deadlines, conflict if workers are not self-motivated.", "The manager hands the project to the experts and steps back completely."),
      P("charismatic", "✨", "Charismatic", "The leader inspires people through charm, energy and personality. + Followers are motivated and loyal. − The leader may believe more in himself or herself than in the team, and the business struggles if the leader leaves.", "Workers follow the manager because of the manager's energy and inspiring speeches."),
      P("transactional", "🏆", "Transactional", "The leader uses rewards for good performance and penalties for poor performance. Works when deadlines must be met and rules followed. + Clear targets, productivity rises. − Workers may feel monitored and creativity is limited.", "Workers who reach the target get a bonus; those who miss it get a written warning."),
    ],
  },
  "insurance-principles": {
    title: "Principles of insurance", kind: "set", colour: "var(--t-cell)",
    intro: "The four principles every insurance contract is built on.",
    parts: [
      P("indemnity", "⚖️", "Indemnification / indemnity", "The insured is compensated for a specified, proven loss and is placed in the same financial position as before the loss. The insured may not profit from insurance. Applies to short-term insurance.", "After the burglary, the insurer pays exactly what the stolen stock was worth – no more."),
      P("security", "🔐", "Security / certainty", "A predetermined amount is paid out when the insured reaches a pre-determined age, gets injured or dies. Applies to long-term insurance (assurance) – the event is certain.", "The life policy pays R500 000 to the family when the policyholder dies."),
      P("faith", "🙏", "Utmost good faith", "The insured must be honest and disclose all relevant facts when applying for cover; the insurer must also disclose all relevant information. Dishonesty can make the contract void.", "The claim is rejected because the applicant hid a previous illness."),
      P("interest", "🧾", "Insurable interest", "The insured must prove that he or she will suffer a financial loss if the insured object is damaged, lost or ceases to exist. The insured must have a legal relationship to the object.", "You can insure your own car, but not a stranger's car."),
    ],
  },
  "problem-solving": {
    title: "The problem-solving steps", kind: "steps", colour: "var(--t-body)",
    intro: "Problem-solving is a process, usually done by a group, that needs creative thinking. Learn the steps in order.",
    parts: [
      P("identify", "🎯", "Identify the problem", "Acknowledge that there is a problem and identify exactly what it is.", "Management realises that sales have dropped for three months in a row."),
      P("define", "🔍", "Define the problem", "State the nature and possible causes of the problem clearly; gather as much information as possible.", "The team collects data and finds that most lost sales are from online customers."),
      P("alternatives", "💡", "Identify alternative solutions", "Generate as many possible solutions as you can, e.g. by brainstorming.", "The team brainstorms ten different ways to win customers back."),
      P("evaluate", "⚖️", "Evaluate alternative solutions", "Use critical evaluation: weigh the advantages and disadvantages of each alternative.", "The pros, cons and costs of each idea are compared."),
      P("choose", "☑️", "Choose the best solution", "Select the solution that best matches the size and resources of the business; set criteria for the best solution.", "The team picks the option that fits the budget and can be done by existing staff."),
      P("plan", "🗓️", "Formulate / develop an action plan", "Arrange the necessary resources and delegate tasks; establish a time line.", "Tasks, deadlines and a budget are written down and responsibilities are assigned."),
      P("implement", "🚀", "Implement the action plan", "Carry out the planned actions and communicate delegated tasks and deadlines.", "The new online ordering system goes live and staff are told what to do."),
      P("review", "🔄", "Evaluate the solution / monitor", "Assess whether the problem has been solved, partially or entirely; monitor continuously and adjust if needed.", "After two months, the team checks whether sales have recovered."),
    ],
  },
  "triple-bottom-line": {
    title: "The triple bottom line", kind: "set", colour: "var(--t-body)",
    intro: "A business should measure its success by more than money: the 3 Ps – Profit, People and Planet.",
    parts: [
      P("profit", "💵", "Profit / economic", "Triple bottom line means that businesses should not only focus on profit or charge high prices, but should also invest in CSI projects. Businesses should not make a profit at the expense of the community.", "The business earns a fair return for its owners while charging fair prices."),
      P("people", "🧑‍🤝‍🧑", "People / social", "Business operations should not have a negative impact on, or exploit, people (employees, customers and the community). Businesses should engage in sustainable community programmes and improve the lifestyle and quality of life of their human resources.", "The business pays fair wages, offers wellness programmes and sponsors a local school."),
      P("planet", "🌍", "Planet / environment", "Businesses should not exhaust resources or harm the environment for production purposes. They may support energy-efficient and eco-friendly products, and recycle or re-use waste.", "The business recycles, saves water and cuts its carbon emissions."),
    ],
  },
  "team-stages": {
    title: "Stages of team development", kind: "steps", colour: "var(--t-body)",
    intro: "Every team moves through these stages. Rhyme: forming, storming, norming, performing – and finally adjourning (mourning).",
    parts: [
      P("forming", "👋", "Forming", "Individuals gather information and impressions about one another and the scope of the task. This is a comfortable stage: people focus on being busy with routines such as team organisation, and are polite and positive.", "Members meet for the first time, are polite and wait for the leader to give direction."),
      P("storming", "🌩️", "Storming", "Teams go through a period of unease and conflict after formation. Different ideas from team members compete for consideration; members open up to and confront one another's ideas. Tension, struggles and arguments occur and upset the team.", "Members disagree about who does what, and there is a power struggle."),
      P("norming", "🤝", "Norming / settling and reconciliation", "Team members come to an agreement and reach consensus. Roles and responsibilities are clear and accepted. Processes, working style and respect develop, and members have the ambition to work for the success of the team's goals.", "The team agrees on rules, roles are accepted and members start trusting one another."),
      P("performing", "🏁", "Performing / working as a team towards a goal", "Team members are aware of strategies and aims. They have direction without interference from the leader. Processes and structures are set, leaders delegate and oversee, and all members are competent, autonomous and able to handle decision-making.", "The team works smoothly and independently and reaches its targets."),
      P("adjourning", "🎓", "Adjourning / mourning", "The focus is on the completion of the task/ending the project. Breaking up the team may be traumatic as team members may find it difficult to perform as individuals once again. All tasks need to be completed before the team finally dissolves.", "The project is finished, and members are sad that the team is breaking up."),
    ],
  },
  "bbbee-pillars": {
    title: "The five BBBEE pillars", kind: "set", colour: "var(--t-diversity)",
    intro: "A business earns points on the BBBEE scorecard for five pillars. A good rating helps it to win government tenders and contracts.",
    parts: [
      P("management", "👩‍💼", "Management control", "Businesses must ensure that transformation is implemented at all levels – black people (and especially black women) must be appointed in senior, middle and junior management positions and be involved in decision-making.", "The business appoints black women as directors and senior managers."),
      P("ownership", "📜", "Ownership", "Businesses should include black people as shareholders, partners or franchisees. Large businesses should sell shares to black employees and investors. More opportunities are created for black people to become owners.", "Black employees are offered shares, so that 26% of the business is black-owned."),
      P("esd", "🤝", "Enterprise and supplier development (ESD)", "Businesses must create jobs and buy from BBBEE-compliant suppliers (preferential procurement). They should invest in and support the development of black-owned SMMEs, e.g. with mentoring, loans or shared facilities.", "The business buys from black-owned suppliers and mentors a small black-owned business."),
      P("skills", "🎓", "Skills development", "Businesses must engage black employees in skills development initiatives, e.g. learnerships and training programmes, and must contribute to the skills development levy. Productivity and the pool of skilled workers improve.", "Black employees are sent on learnerships and management-training programmes."),
      P("sed", "🏘️", "Socio-economic development (SED) / social responsibility", "Businesses should focus on critical areas which can bring about change, e.g. support education, health care, housing and job creation in disadvantaged communities, and distribute scarce CSI resources carefully.", "The business builds a library and funds a feeding scheme in a disadvantaged community."),
    ],
  },
  "consumer-rights": {
    title: "Consumer rights (CPA)", kind: "set", colour: "var(--t-diversity)",
    intro: "The Consumer Protection Act gives consumers these rights. In the exam: name the right, then explain it.",
    parts: [
      P("choose", "🛍️", "Right to choose", "Consumers have the right to choose suppliers and goods, to shop around for the best prices, to cancel or renew fixed-term agreements, and to reject goods that are not the same as a sample.", "A customer is forced to buy a phone cover together with the phone – this right is violated."),
      P("privacy", "🔕", "Right to privacy and confidentiality", "Consumers have the right to stop/restrict unwanted direct marketing (spam, sales calls) and to object to unwanted promotional messages. Personal information may not be shared without consent.", "A business keeps sending marketing SMSes after the customer asked it to stop."),
      P("fairvalue", "🛡️", "Right to fair value, good quality and safety", "Consumers have the right to demand quality service or goods. They may return faulty items for a repair, a replacement or a refund (within six months), and must be warned about hazards. Goods must be safe.", "A kettle stops working after two weeks and the shop refuses a refund, repair or replacement."),
      P("disclosure", "🏷️", "Right to information and disclosure", "Contracts and agreements should be in plain language and easy to understand. Businesses should display prices in full, and label products and trade descriptions correctly.", "The shelf price is missing and the contract is written in confusing legal terms."),
      P("marketing", "📣", "Right to fair and responsible marketing / promotion", "Businesses should not mislead consumers on pricing, benefits or uses of goods. Consumers may cancel purchases made through direct marketing within the cooling-off period (five working days).", "An advert promises results that the product cannot deliver."),
      P("accountability", "📋", "Right to accountability from suppliers", "Consumers have the right to be protected in lay-bye agreements, and when buying gift vouchers and prepaid services. Businesses must honour credit vouchers and prepaid certificates.", "A shop refuses to honour a gift voucher that has not yet expired."),
      P("terms", "🧾", "Right to fair, just and reasonable terms and conditions", "Businesses should provide consumers with written notices of clauses that may limit consumer rights. Businesses may not market or sell goods at unfair prices, or use unfair contract terms.", "A contract contains a hidden clause that removes the customer's right to complain."),
      P("equality", "🟰", "Right to equality in the consumer market place", "Businesses should not limit access to goods and services. Quality goods must be available to all consumers, and businesses may not vary quality or prices unfairly between different groups of consumers.", "A shop charges customers from one community more than others for the same item."),
      P("honest", "🤝", "Right to fair and honest dealings", "Suppliers may not use physical force or harass customers. They may not give misleading or false information, or run fraudulent schemes such as pyramid schemes.", "A salesperson pressures and harasses an elderly customer into signing."),
    ],
  },
  laso: {
    title: "LASO – the 8 insight marks", kind: "set", colour: "var(--t-skills)",
    intro: "A Section C essay is marked out of 40: a maximum of 32 for content plus 8 for insight. Insight is LASO – two marks each.",
    parts: [
      P("l", "🧱", "Layout / structure (2)", "Is there an introduction, a body and a conclusion? Write the headings 'Introduction' and 'Conclusion', and use the question's sub-questions as body headings.", "The essay has a clear introduction, body paragraphs under headings, and a conclusion."),
      P("a", "🔬", "Analysis and interpretation (2)", "Could you break the question down into headings/subheadings and interpret it correctly, to show understanding of what is being asked? You need marks in all (or most) of the sub-questions to get both marks.", "Every sub-question in the essay is answered under its own heading, exactly as it was asked."),
      P("s", "🧵", "Synthesis (2)", "Are there only relevant facts, based on the questions asked? Irrelevant padding costs you these marks – stick to what was asked.", "The essay contains no facts from other topics – only what the question asked for."),
      P("o", "🌟", "Originality (2)", "Is there evidence of examples, recency of information, current trends and developments? Add at least two current, real-life examples that are not copied from the question.", "The candidate adds recent real-life examples from South African businesses."),
    ],
  },
};
