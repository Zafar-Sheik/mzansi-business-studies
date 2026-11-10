/** Exam skills for both papers: how the papers work, action verbs, Section B technique and the Section C essay. */
import type { Lesson } from "../types";
import { brk, drill, exam, match, mc, model, note, order, points, quiz, SKL, sort, table, text } from "./kit";

export const SKILLS: Lesson[] = [
  {
    slug: "how-the-papers-work",
    topic: "skills-exam",
    order: 1,
    title: "How the Papers Work",
    tagline: "Two papers, three sections, 120 minutes – and what every action verb wants from you.",
    emoji: "🎯",
    caps: "Gr 12 NSC examination guidelines: structure of Paper 1 and Paper 2 (Sections A, B and C), time allocation, cognitive levels and action verbs, marking principles for Section B",
    objectives: ["Describe the structure of both papers", "Plan your time for each section", "Interpret action verbs correctly", "Answer scenario-based Section B questions for full marks"],
    styles: ["visual", "kinaesthetic", "read-write"],
    xp: 70,
    terms: [
      { term: "Section A", def: "Question 1: compulsory short questions (multiple choice, choose the correct word, match columns) – 30 marks." },
      { term: "Section B", def: "Three 40-mark questions (Q2, Q3, Q4) of which you answer any TWO – 80 marks." },
      { term: "Section C", def: "Two essay questions (Q5, Q6) of which you answer ONE – 40 marks." },
      { term: "Action verb", def: "The instruction word in a question (name, explain, discuss, evaluate…) that tells you how much to write." },
      { term: "Motivation", def: "A quote from the scenario that supports your answer – usually worth 1 mark." },
      { term: "Split marks", def: "A 2-mark fact is marked as a heading/statement (1) plus an explanation or example (1)." },
    ],
    chunks: [
      {
        id: "structure", title: "The shape of both papers", minutes: 6,
        blocks: [
          text("Good news first: **Paper 1 and Paper 2 look exactly the same.** Once you know the shape, nothing on exam day is a surprise."),
          table(["", "Paper 1", "Paper 2"], [
            ["**Main topics**", "Business Environments + Business Operations", "Business Ventures + Business Roles"],
            ["**Section A** (30) – compulsory", "Q1: short questions on both main topics", "Q1: short questions on both main topics"],
            ["**Section B** (80) – choose TWO", "Q2 Environments · Q3 Operations · Q4 Miscellaneous", "Q2 Ventures · Q3 Roles · Q4 Miscellaneous"],
            ["**Section C** (40) – choose ONE", "Q5 Environments · Q6 Operations", "Q5 Ventures · Q6 Roles"],
            ["**Total**", "150 marks · 2 hours", "150 marks · 2 hours"],
          ]),
          { type: "widget", widget: "paper-planner" },
          note("mistake", "Answering too many questions", "If you answer all three Section B questions, **only the first two are marked** – even if your third was your best. Choose, then cross out any attempt you do not want marked."),
        ],
      },
      {
        id: "section-a", title: "Section A: 30 quick marks", minutes: 5,
        blocks: [
          points(
            "**1.1 Multiple choice** – 5 questions × 2 marks. Write only the letter (A–D) next to the question number.",
            "**1.2 Choose the correct word(s)** from a list – 5 × 2 marks. Write the word(s) exactly as given.",
            "**1.3 Match Column A with Column B** – 5 × 2 marks. Write only the letter (A–J).",
            "Each answer is worth **2 marks** – one careless answer costs as much as a full fact in Section B.",
            "**Never leave a blank.** There is no negative marking: eliminate two options and choose.",
          ),
          note("tip", "The cover-up trick", "For multiple choice: cover the options, answer the question in your head, then look for your answer among the options. It stops the wrong options from confusing you."),
          drill("Section A warm-up", "terms-g12-legislation", "terms-g12-hr", "terms-g12-leadership", "terms-g12-teams", "terms-skills-exam"),
        ],
      },
      {
        id: "verbs", title: "Action verbs: how much to write", minutes: 8,
        blocks: [
          text("The **verb** decides how much you write. *Name THREE…* needs three words. *Discuss…* needs full sentences with explanations. Using the wrong depth is the most common way to lose marks."),
          table(["Level", "Verbs", "What to do"], [
            ["🟢 **Lower order** (remember, understand)", "Name · State · List · Identify · Give · Define · Quote · Outline", "Short and to the point. *Outline* = full sentences, but brief."],
            ["🟡 **Middle order** (apply, analyse)", "Explain · Describe · Discuss · Distinguish · Differentiate · Compare · Apply · Calculate", "Full sentences. Give the fact **and** say more about it (reason, example or result). Link to the scenario."],
            ["🔴 **Higher order** (evaluate, create)", "Evaluate · Advise · Recommend · Suggest · Justify · Analyse · Propose · Devise", "Give your judgement or a practical way forward, with reasons. *Evaluate / impact* = positives AND/OR negatives."],
          ]),
          sort("verb-levels", "Which level is the verb?", SKL, {
            "Lower order": ["Name", "Identify", "List", "Quote", "Define"],
            "Middle order": ["Explain", "Discuss", "Distinguish", "Calculate"],
            "Higher order": ["Evaluate", "Advise", "Recommend", "Suggest", "Justify"],
          }),
          match("m-verbs", "What does the verb want?", [
            ["Name / state", "A word or short phrase – no explanation needed"],
            ["Distinguish / differentiate", "Clear differences, linked point by point (a table works well)"],
            ["Discuss / explain", "Full sentences with a fact and its explanation"],
            ["Evaluate the impact", "Positives and/or negatives"],
            ["Advise / recommend / suggest", "Practical ways forward, written as actions the business should take"],
          ]),
        ],
      },
      {
        id: "section-b", title: "Section B: scenarios and split marks", minutes: 8,
        blocks: [
          note("real-world", "A typical Section B question", "*BONGANI ELECTRICAL (BE)*\n\n*Bongani Electrical wants to fill a vacancy for an electrician. The human resources manager asked a supervisor to recommend a suitable employee. An advertisement was also placed in a local newspaper.*\n\n**2.3.1 Identify TWO sources of recruitment used by BE. Motivate your answer by quoting from the scenario above.** (6)"),
          table(["SOURCES OF RECRUITMENT", "MOTIVATIONS"], [
            ["1. Internal recruitment ✓✓", "“The human resources manager asked a supervisor to recommend a suitable employee.” ✓"],
            ["2. External recruitment ✓✓", "“An advertisement was also placed in a local newspaper.” ✓"],
          ], "How to set out the answer: (2 + 1) × 2 = 6 marks"),
          points(
            "**Identify = 2 marks. Quote = 1 mark.** Quote the **exact words** – do not rewrite them in your own words.",
            "If the identification is **wrong**, the motivation earns **nothing**.",
            "When a question asks for a number (**TWO**, **THREE**), only the **first** answers are marked.",
            "**Split marks:** a 2-mark fact = statement/heading ✓ + explanation or example ✓. A bare heading earns only 1.",
            "**Distinguish / differentiate:** the differences must be **clear and linked**. Answer in a table and compare the same aspect in each row.",
            "Number your answers **exactly** as in the question paper, and start each question on a **new page**.",
          ),
          order("answer-routine", "Your routine for every Section B question", [
            "Read the question and underline the action verb and the number of facts",
            "Check the mark allocation: divide by two to find how many facts you need",
            "Read the scenario and underline the phrases that link to the question",
            "Write your answer in full sentences, one fact per line",
            "Add the quote if the question asks you to motivate",
          ], "Verb → marks → scenario → write → quote."),
          quiz("q-papers",
            mc("How many Section B questions must you answer?", ["One", "Two", "Three", "All"], 1, "Any TWO of Q2, Q3 and Q4."),
            mc("An 8-mark “Explain” question usually needs…", ["8 facts", "4 facts with explanations", "2 facts", "1 paragraph"], 1, "Each full fact is worth 2 marks."),
            mc("“Motivate your answer by quoting from the scenario” means…", ["explain in your own words", "copy the exact words from the scenario", "give an example from real life", "write a conclusion"], 1, "Quote directly."),
            mc("“Evaluate the impact of the BCEA on businesses” requires…", ["only positives", "only negatives", "positives and/or negatives", "a definition"], 2, "Impact/evaluate = both sides."),
          ),
          drill("Timing drill", "exam-timing"),
        ],
      },
    ],
  },
  {
    slug: "writing-the-essay",
    topic: "skills-exam",
    order: 2,
    title: "Writing the Section C Essay",
    tagline: "32 for content, 8 for LASO – a plan that works for every essay.",
    emoji: "✍️",
    caps: "Gr 12 NSC examination guidelines: Section C essay – structure (introduction, body, conclusion), mark allocation (maximum 32 for content, 8 for insight), LASO (layout, analysis, synthesis, originality)",
    objectives: ["Structure an essay with an introduction, body and conclusion", "Explain how the 40 marks are allocated", "Earn all eight insight marks with LASO", "Plan an essay in five minutes"],
    styles: ["read-write", "kinaesthetic", "visual"],
    xp: 80,
    terms: [
      { term: "LASO", def: "Layout, Analysis, Synthesis, Originality – the four components of insight in an essay, 2 marks each." },
      { term: "Layout", def: "The structure of the essay: introduction, body and conclusion." },
      { term: "Analysis and interpretation", def: "The ability to break the question down into headings and sub-headings and to interpret it correctly." },
      { term: "Synthesis", def: "Giving only relevant facts, based on the questions asked." },
      { term: "Originality", def: "Examples, recency of information, current trends and developments." },
      { term: "Sub-maximum", def: "The highest mark that can be earned for one sub-question of an essay." },
    ],
    chunks: [
      {
        id: "marks", title: "Where the 40 marks come from", minutes: 6,
        blocks: [
          text("An essay memo usually has **44 to 50 marks' worth of facts** – but content is capped at **32**. That means you do **not** have to know everything. You have to give *enough facts under every heading*."),
          table(["Part", "Marks", "What to write"], [
            ["**Introduction**", "2", "Two relevant, meaningful facts about the topic. Do not repeat the question."],
            ["**Body**", "up to 28+", "One heading per sub-question. Each sub-question has its own **sub-maximum** (e.g. 8, 12, 14, 10)."],
            ["**Conclusion**", "2", "One meaningful closing fact that was not used before."],
            ["**Content total**", "**max 32**", ""],
            ["**Insight (LASO)**", "**8**", "Layout 2 · Analysis 2 · Synthesis 2 · Originality 2"],
            ["**TOTAL**", "**40**", ""],
          ]),
          model("laso"),
        ],
      },
      {
        id: "laso", title: "LASO: eight marks most learners give away", minutes: 7,
        blocks: [
          sort("laso-do", "Which LASO mark does this earn?", SKL, {
            Layout: ["Writing the headings “Introduction” and “Conclusion”", "Using paragraphs with a heading for each sub-question"],
            Analysis: ["Answering every sub-question that was asked", "Using the wording of the question for your headings"],
            Synthesis: ["Leaving out facts from other topics", "Keeping every fact relevant to the heading it is under"],
            Originality: ["Adding a current example of a South African business", "Mentioning a recent development such as online recruitment"],
          }),
          note("mistake", "How learners lose insight marks", "❌ No heading for the introduction or conclusion → **Layout** lost.\n\n❌ Skipping a whole sub-question → **Analysis** lost (plus all its content marks).\n\n❌ Writing everything you know about the topic → **Synthesis** lost.\n\n❌ No examples of your own → **Originality** lost."),
          drill("Which LASO component?", "spot-laso"),
        ],
      },
      {
        id: "planner", title: "Build an essay step by step", minutes: 12,
        blocks: [
          text("Choose an essay below. For each step, **say or write your answer first**, then tick the facts you got. Watch how the sub-maximums and the cap of 32 work."),
          { type: "widget", widget: "essay-planner" },
          brk("That was a big one. Stand up, stretch your writing hand, shake out your shoulders. One short chunk left."),
        ],
      },
      {
        id: "routine", title: "Your five-minute essay routine", minutes: 6,
        blocks: [
          order("essay-routine", "The essay routine", [
            "Choose the essay where you can answer ALL the sub-questions",
            "Underline the action verb and key words of each sub-question",
            "Write the heading “Introduction” and two relevant facts",
            "Write each sub-question as a heading, with one fact per line in full sentences",
            "Add your own current examples where they fit",
            "Write the heading “Conclusion” and one new closing fact",
          ], "Choose → underline → introduction → headings and facts → examples → conclusion."),
          points(
            "Write in **full sentences** – bullets are fine, but single words earn nothing in an essay.",
            "Leave a **line open** between facts, so the marker can see each one.",
            "Spend about **30 minutes** on the essay – roughly 6 minutes per sub-question.",
          ),
          quiz("q-essay",
            mc("What is the maximum mark for CONTENT in an essay?", ["40", "36", "32", "28"], 2, "32 for content + 8 for insight = 40."),
            mc("Which LASO component rewards current examples?", ["Layout", "Analysis", "Synthesis", "Originality"], 3, "Originality: examples, recency, current trends."),
            mc("You skip one whole sub-question. Which insight mark do you lose first?", ["Layout", "Analysis", "Originality", "None"], 1, "Analysis and interpretation needs all sub-questions to be addressed."),
            mc("How many marks is the introduction worth?", ["1", "2", "4", "8"], 1, "Two facts, one mark each."),
          ),
          exam("ex-laso", "Explain the FOUR components of insight (LASO) that are used to mark a Section C essay.", 8, [
            "Layout/structure: there must be an introduction, a body and a conclusion",
            "Analysis and interpretation: the ability to break the question down into headings or sub-headings and to interpret it correctly, showing understanding of what is being asked",
            "Synthesis: only relevant facts are given, based on the questions that were asked",
            "Originality: there is evidence of examples, recency of information, current trends and developments",
          ], { level: "recall" }),
        ],
      },
    ],
  },
];
