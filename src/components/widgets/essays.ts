/** Essay plans for the Essay Planner: NSC-style Section C questions with the facts markers look for. */
export interface EssaySection {
  /** The sub-question, used as the heading in the body. */
  heading: string;
  /** Marks available on the marking guideline for this sub-question (sub-max). */
  max: number;
  /** Facts – each one is worth 2 marks. */
  facts: string[];
}

export interface EssayPlan {
  id: string;
  paper: 1 | 2;
  topic: string;
  /** The scenario / lead-in. */
  stem: string;
  intro: string[];
  sections: EssaySection[];
  conclusion: string[];
  /** Ideas for the two originality marks. */
  originality: string[];
}

export const ESSAYS: EssayPlan[] = [
  {
    id: "strategies", paper: 1, topic: "Business strategies",
    stem: "Businesses operate in a challenging environment. They use tools such as Porter's Five Forces to analyse their market, and they develop strategies to stay competitive.",
    intro: [
      "Businesses need to develop strategies to respond to the challenges of the three business environments.",
      "Porter's Five Forces model helps a business to analyse its position in the market environment.",
      "Defensive strategies are used when a business is struggling and needs to cut its losses.",
      "Strategies must be evaluated continuously to check whether they are still effective.",
    ],
    sections: [
      { heading: "Outline the strategic management process", max: 8, facts: [
        "Have a clear vision, a mission statement and measurable/realistic objectives in place",
        "Identify opportunities, threats, strengths and weaknesses by conducting environmental scanning/situational analysis",
        "Use tools such as SWOT, PESTLE and Porter's Five Forces for the environmental scan",
        "Formulate alternative strategies to respond to the challenges",
        "Develop/implement an action plan, including the tasks, deadlines and resources",
        "Control, evaluate and monitor the implemented strategies to identify gaps and take corrective action",
      ] },
      { heading: "Explain how businesses can apply Porter's Five Forces", max: 14, facts: [
        "Power of suppliers: assess the power of suppliers – few suppliers means they can control prices; identify alternative suppliers",
        "Power of buyers: assess how easy it is for buyers to drive prices down; buyers buying in bulk can bargain for lower prices",
        "Competitive rivalry: determine how many competitors there are and how influential they are; draw up competitor profiles",
        "If competitors have a unique product or service, they will have greater power",
        "Threat of substitution: establish whether sellers of substitute products have improved or lowered their prices",
        "If the business's product can be easily substituted, its power in the market is weakened",
        "Threat of new entrants: if barriers to entry are low, it is easy for new businesses to enter the market",
        "A business with a highly profitable market will attract new entrants, which reduces its market share",
      ] },
      { heading: "Discuss the types of defensive strategies", max: 12, facts: [
        "Retrenchment: terminating the employment contracts of employees for operational reasons",
        "Retrenchment: decreasing the number of product lines or closing certain departments to reduce costs",
        "Divestiture/divestment: disposing of or selling some assets or divisions that are no longer profitable or productive",
        "Divestiture: selling off divisions or product lines that show slow growth or potential; paying off debts by selling unproductive assets",
        "Liquidation: selling all assets to pay creditors because of a lack of capital or cash flow",
        "Liquidation: selling the entire business in order to pay all its liabilities; creditors may apply for forced liquidation",
      ] },
      { heading: "Advise businesses on the steps in evaluating a strategy", max: 10, facts: [
        "Examine the underlying basis of the business strategy",
        "Look forward and backwards into the implementation process",
        "Compare the expected performance with the actual performance",
        "Measure business performance in order to determine the reasons for deviations, and analyse these reasons",
        "Take corrective action so that deviations may be corrected",
        "Set specific dates for control and follow-up",
        "Decide on the desired outcome, as envisaged when the strategy was implemented",
      ] },
    ],
    conclusion: [
      "A business that scans its environment regularly can respond to challenges before they become a crisis.",
      "The choice of strategy depends on the position of the business and the resources it has available.",
      "Continuous evaluation ensures that strategies remain relevant in a changing environment.",
    ],
    originality: ["Name a real South African business that divested a division or retrenched staff recently.", "Mention a current challenge such as load shedding, e-commerce or rising interest rates and the strategy that fits it."],
  },
  {
    id: "hr", paper: 1, topic: "Human resources function",
    stem: "The human resources function is responsible for finding the right person for every vacancy. The process starts with recruitment and ends when the new employee has been inducted and placed.",
    intro: [
      "The human resources function is responsible for recruiting and appointing suitable employees.",
      "Recruitment is the process of finding suitable candidates, and it can be done internally or externally.",
      "A fair selection procedure helps the business to appoint the best candidate for the job.",
      "Induction helps new employees to settle in and become productive quickly.",
    ],
    sections: [
      { heading: "Outline the recruitment procedure", max: 8, facts: [
        "The human resources manager should evaluate the job/prepare a job analysis that includes the job description and job specification, to identify recruitment needs",
        "Indicate the job description, i.e. the duties and responsibilities of the new employee",
        "Choose the method of recruitment, i.e. internal or external, to reach or target suitable applicants",
        "If the internal recruitment process is unsuccessful, external recruitment should be considered",
        "Prepare the advertisement with the relevant information, e.g. the name of the business, contact details and contact person",
        "Place the advertisement in the selected media that will ensure that the best candidates apply",
      ] },
      { heading: "Explain the impact of external recruitment on businesses", max: 12, facts: [
        "Positive: new candidates bring new talents, ideas, experiences and skills into the business",
        "Positive: there is a larger pool of candidates to choose from",
        "Positive: it may help the business to meet affirmative action and BBBEE targets",
        "Positive: there is a better chance of finding a suitable candidate with the required skills, who does not need much training",
        "Negative: external sources can be expensive, e.g. recruitment agencies' fees and advertisements in newspapers",
        "Negative: the selection process may not be effective and an incompetent candidate may be chosen",
        "Negative: information on CVs and from referees may not be reliable",
        "Negative: recruitment takes longer, and in-service training may be needed, which decreases productivity during the training period",
        "Negative: it may demotivate existing employees who hoped to be promoted",
      ] },
      { heading: "Discuss the selection procedure", max: 14, facts: [
        "Determine fair assessment criteria on which selection will be based",
        "Use the assessment criteria to assess all CVs and application forms received during recruitment (preliminary screening)",
        "Check that applicants are not submitting false documents such as forged certificates or degrees",
        "Make a preliminary list of all applicants who qualify for the post",
        "Screen and check references, e.g. check applicants' criminal records, credit history and social media",
        "Conduct preliminary interviews to identify applicants who are not suitable for the job, although they meet all the requirements",
        "Inform all applicants about the outcome of their application",
        "Compile a shortlist of approximately five people",
        "Shortlisted candidates may be subjected to various types of selection tests, e.g. skills tests",
        "Invite the shortlisted candidates for an interview",
        "A written offer is made to the selected candidate",
      ] },
      { heading: "Advise businesses on the benefits of induction", max: 10, facts: [
        "Allows new employees to settle in quickly and work effectively",
        "Ensures that new employees understand the rules and restrictions of the business",
        "New employees may establish relationships with fellow employees at different levels",
        "Makes new employees feel at ease in the workplace, which reduces anxiety, insecurity and fear",
        "The results obtained during the induction process provide a base for focused training",
        "Increases quality of performance and productivity",
        "Minimises the need for ongoing training and development",
        "Employees will be familiar with organisational structures, e.g. who their supervisors and low-level managers are",
      ] },
    ],
    conclusion: [
      "A business that recruits and selects carefully saves the cost of appointing the wrong person.",
      "A good induction programme lowers staff turnover because employees feel that they belong.",
      "The human resources function contributes directly to the productivity and success of the business.",
    ],
    originality: ["Mention how businesses now recruit through LinkedIn, careers portals and online video interviews.", "Refer to current labour-market conditions, e.g. youth unemployment or scarce skills."],
  },
  {
    id: "leadership", paper: 2, topic: "Management and leadership",
    stem: "The success of a business depends on how it is managed and led. Leaders use different leadership styles and theories in different situations.",
    intro: [
      "Managers focus on getting the work done, while leaders inspire people to follow a vision.",
      "A successful leader does not use the same leadership style in every situation.",
      "Leadership theories help us to understand why some leaders are more effective than others.",
      "The attitude of a leader has a direct influence on the performance of the team.",
    ],
    sections: [
      { heading: "Distinguish between management and leadership", max: 8, facts: [
        "Management guides human behaviour; leadership influences human behaviour",
        "Management communicates through management functions, e.g. line functions; leadership communicates by means of interaction, behaviour, vision, values and charisma",
        "Managers administer plans, programmes and tasks to reach targets; leaders innovate and encourage new ideas to increase productivity",
        "Managers control systems and procedures to get the job done; leaders inspire staff to trust and support each other",
        "Management focuses on how and when; leadership focuses on what and why",
        "A person becomes a manager because he or she is appointed to the position; leaders are born with natural or instinctive leadership skills",
        "Managers are task-orientated and do things right; leaders are people-orientated and do the right things",
      ] },
      { heading: "Discuss the impact of the democratic leadership style", max: 12, facts: [
        "Positive: employees participate in the decision-making process, so they feel empowered and positive",
        "Positive: staff give a variety of ideas, inputs, feedback and viewpoints that can lead to innovation and improved production methods",
        "Positive: clear, two-way communication ensures group commitment to the final decision",
        "Positive: authority is delegated, which can motivate and inspire workers to be more productive",
        "Positive: complex decisions can be made with the inputs of specialists and skilled workers",
        "Negative: incorrect decisions may be made if staff are inexperienced or not fully informed",
        "Negative: decision-making may be time-consuming because stakeholders have to be consulted",
        "Negative: employees may feel discouraged if their opinions and inputs are not considered",
        "Negative: leaders can rely too much on the input of the followers and fail to make a final decision",
        "Negative: it is not effective in times of crisis, when quick decisions need to be made",
      ] },
      { heading: "Explain the situational and transformational leadership theories", max: 14, facts: [
        "Situational: different leadership characteristics are needed for different situations",
        "Situational: the task or situation dictates the leadership style that should be applied, so leaders are adaptable, flexible and self-assured",
        "Situational: effective application of this theory may enable leaders to accomplish their goals",
        "Situational: relationships between leaders and employees are based on mutual trust, respect, loyalty and integrity",
        "Situational: leaders have the ability to analyse the situation and the group members in order to get the task done",
        "Transformational: suitable for a dynamic environment, where change could be drastic",
        "Transformational: the passion, vision and personality of leaders inspire followers to change their expectations, perceptions and motivation to work towards a common goal",
        "Transformational: strategic thinking leaders develop a long-term vision for the organisation and sell it to subordinates",
        "Transformational: leaders have the trust, respect and admiration of their followers",
        "Transformational: followers are coached and led to meet unexpected challenges and to be more innovative",
      ] },
      { heading: "Advise on the role of personal attitude in successful leadership", max: 10, facts: [
        "A positive attitude releases leadership potential",
        "A leader's good or bad attitude can influence the success or failure of the business",
        "Leaders must know their strengths and weaknesses to apply their leadership styles effectively",
        "Great leaders understand that the right attitude will set the right atmosphere",
        "A leader's attitude may influence the team's or group's thoughts and behaviour",
        "Leaders should model the behaviour that they want to see in team members",
        "Successful leaders have a constant desire to work and achieve personal and professional success",
        "Enthusiasm produces confidence in a leader",
      ] },
    ],
    conclusion: [
      "The most effective leaders adapt their leadership style to the situation and the people they lead.",
      "A business needs both good managers and good leaders in order to be successful.",
      "A leader with a positive attitude builds a motivated and productive team.",
    ],
    originality: ["Name a well-known South African business or sports leader and the style he or she shows.", "Link leadership to a current trend such as remote or hybrid work."],
  },
  {
    id: "teams", paper: 2, topic: "Team performance and conflict management",
    stem: "Businesses rely on teams to reach their objectives. Teams go through stages of development, and conflict in the workplace must be managed properly.",
    intro: [
      "Successful teams enable a business to reach its goals more effectively.",
      "Every team goes through different stages of development before it performs well.",
      "Conflict is a normal part of the workplace and it can be positive if it is handled correctly.",
      "Managers need the skills to deal with difficult employees in a professional way.",
    ],
    sections: [
      { heading: "Outline the criteria for successful team performance", max: 8, facts: [
        "Interpersonal attitudes and behaviour: members have a positive attitude of support and motivation towards each other",
        "Interpersonal attitudes and behaviour: good, sound interpersonal relationships ensure job satisfaction and increase the productivity of the team",
        "Shared values/mutual trust and support: members show loyalty, respect and trust towards each other despite their differences",
        "Shared values: members show respect for the knowledge and skills of other members",
        "Communication: a clear set of processes and procedures for teamwork ensures that every member understands his or her role; quick decisions can be made",
        "Co-operation/collaboration: clearly defined, realistic goals are set, so that all members know exactly what is to be accomplished",
        "Co-operation: all members take part in decision-making, and there is a willingness to co-operate as a unit to achieve team objectives",
      ] },
      { heading: "Explain the stages of team development", max: 14, facts: [
        "Forming: individuals gather information and impressions about each other and the scope of the task",
        "Forming: this is a comfortable stage; people focus on being busy with routines such as team organisation",
        "Storming: teams go through a period of unease or conflict after formation; different ideas compete for consideration",
        "Storming: team members open up to each other and confront each other's ideas; power struggles may occur",
        "Norming: team members come to an agreement and reach consensus; roles and responsibilities are clear and accepted",
        "Norming: processes, working style and respect develop; members work towards the success of the team's goals",
        "Performing: team members are aware of strategies and aims; they have direction without interference from the leader",
        "Performing: processes and structures are set; all members are competent, autonomous and able to handle decision-making without supervision",
        "Adjourning/mourning: the focus is on the completion of the task or ending the project",
        "Adjourning/mourning: breaking up the team may be traumatic, as members may find it difficult to perform as individuals once again",
      ] },
      { heading: "Discuss the causes of conflict in the workplace", max: 12, facts: [
        "Lack of proper communication between management and workers",
        "Ignoring rules and procedures may result in disagreements and conflict",
        "Management and/or workers may have different personalities or backgrounds",
        "Different values, or different levels of knowledge, skills and experience, of managers and workers",
        "Little or no co-operation between internal and/or external parties or stakeholders",
        "Lack of recognition for good work, e.g. a manager may not show appreciation for extra hours worked to meet deadlines",
        "Lack of employee development may increase frustration levels, as workers repeat errors owing to a lack of knowledge or skills",
        "Unfair disciplinary procedures, e.g. favouritism or nepotism",
        "Little or no support from management with regard to supplying the necessary resources and providing guidelines",
        "Unrealistic deadlines or heavy workloads lead to stress, resulting in conflict",
      ] },
      { heading: "Suggest ways in which businesses can deal with difficult employees", max: 10, facts: [
        "Get perspective from others who have experienced the same kind of situation, to be able to understand difficult employees",
        "Act pro-actively, if possible, as a staff or personnel problem is part of a manager's responsibilities",
        "Regular meetings with supervisors or departmental heads should help to identify difficult or problem behaviour",
        "Ask someone in authority for their input into the situation",
        "Identify the type of personality which is creating the problem",
        "Meet privately with difficult employees, so that there are no distractions from other employees or issues",
        "Make your intentions and reasons for action known, so that the difficult person feels at ease",
        "Employees should be told what specific behaviours are acceptable, by giving details about what is wrong or unacceptable, and an opportunity to explain their behaviour",
        "A deadline should be set for improving bad or negative behaviour; monitor and give feedback",
      ] },
    ],
    conclusion: [
      "A team that communicates well and shares the same values will reach its goals.",
      "Conflict that is managed well can lead to new ideas and better working relationships.",
      "Managers who understand team dynamics can turn a group of individuals into a productive team.",
    ],
    originality: ["Mention how online tools (video calls, shared documents, messaging groups) change the way teams work.", "Use a current example of conflict such as a wage dispute, and how it was resolved."],
  },
];
