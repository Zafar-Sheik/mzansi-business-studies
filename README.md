# BusinessMzansi

**An interactive Grade 12 Business Studies companion for South African learners (CAPS, NSC Paper 1 and Paper 2) – designed for learners with ADHD, dyslexia and other learning differences.**

It's the sister app of *MathsMzansi*, *PhysicsMzansi*, *EnglishMzansi*, *AccountingMzansi*, *LifeMzansi*, *GeoMzansi* and *CodeMzansi*, with the same learning design and accessibility features. Built with Next.js, Motion, GSAP and Aceternity UI patterns.

## What's inside

- 📚 **24 lessons in 95 short steps**, covering every CAPS Grade 12 topic:
  - *Paper 1 – Business Environments:* impact of recent legislation (SDA, LRA, EEA, BCEA, COIDA, BBBEE, NCA, CPA), business strategies (SWOT, Porter, PESTLE, types of strategies), business sectors and their environments
  - *Paper 1 – Business Operations:* the human resources function, quality of performance and TQM
  - *Paper 2 – Business Ventures:* management and leadership, investment (securities and insurance), forms of ownership, presentation
  - *Paper 2 – Business Roles:* ethics and professionalism, creative thinking and problem-solving, social responsibility and CSR/CSI, human rights and inclusivity, team performance and conflict management
  - *Exam skills (both papers):* paper structure, action verbs, Section B technique and the Section C essay (LASO)
- 👆 **18 tappable models** – explore one part at a time, then identify parts from scenarios.
- 🔬 **Labs & tools** – Act Finder, interest lab, average-clause lab, force-field analysis lab, forms-of-ownership comparison, an essay planner and a paper planner.
- ♾️ **40 question generators** – Section A terms for every topic, 172 scenarios to identify, and interest and average-clause calculations.
- ✍️ **Typed answers that understand Business Studies**: terms with accepted alternatives, rands with spaces and decimal commas, spelling hints.
- 🃏 **Flashcards** with spaced repetition for 185 key terms, ⚔️ a **Quiz Arena**, 📝 an **Exam Room** (34 NSC-style questions, 693 marks, self-marked at two marks a fact), ⏱️ **mock papers** for Paper 1 and Paper 2 with NSC levels, 🎯 a **weak-spot coach** and a 🖨️ **worksheet generator**.
- 🎮 **Games**: Speed Biz, This or That?, Who Am I?, Concept Pairs, True/False Blitz, Odd One Out, Biz Hangman.
- 🧠 **Accessibility**: step mode, focus mode, focus sprints with brain breaks, calm mode, reading ruler, word anchors, dyslexia-friendly fonts, read-aloud, high contrast, memory hooks for every list, extra time on mocks, and tap/keyboard alternatives for every puzzle.
- 🔒 **No accounts, no tracking**: progress stays on the learner's device.

## Quick start

```bash
npm install
npm run dev        # http://localhost:3000
```

## Scripts

| Command | |
|---|---|
| `npm run dev` | Development server |
| `npm run build` / `npm start` | Production build / serve |
| `npm run typecheck` | TypeScript strict check |
| `npm run lint` | ESLint (zero warnings) |
| `npm test` | Answer-checker, calculation, generator and content-integrity tests (Vitest) |
| `npm run test:e2e` | Browser tests on desktop + mobile (Playwright; needs a production build) |
| `npm run check` | typecheck + lint + test + build |

## Deploying

Every page is statically generated. There is no backend and there are no environment variables. Node 18.18+ is required.

```bash
npm ci
npm run check
npm start
```

## Documentation

The teacher guide and technical documentation live in [`docs/`](docs) and are rendered in the app at `/teachers`: overview, quick-start, CAPS curriculum map, learning design, ADHD & accessibility, labs and tools, design system, architecture, content authoring, testing and privacy.

## A note on the curriculum

Content follows the CAPS Business Studies document and the DBE examination guidelines for Grade 12. Legislation is amended from time to time, so always check the latest guidelines and your textbook. BusinessMzansi is an independent study aid.
