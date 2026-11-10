# Architecture

BusinessMzansi is a **static Next.js site**. There is no database and no server-side learner data.

## Stack

Next.js 15 (App Router, static generation) · React 19 · TypeScript (strict) · Tailwind CSS 4 · Motion · GSAP 3 · canvas-confetti · Vitest · Playwright. The browser's Web Speech API powers read-aloud.

## Folders

```
src/
  app/                 routes: learn, toolkit (Labs), flashcards, quiz, exam, exam/mock, games, progress, teachers, api/curriculum
  components/
    learn/             lesson player, block renderer, quiz, practice, worked examples, flashcards, sequence, match, exam-part
    biz/               answer-input, problem-card
    widgets/           labs and tools (code-split with next/dynamic), models.ts and essays.ts (data), sim-kit, catalogue
    pages/             client components for each page (learn browser, labs, exam room, mock exam, games…)
    home/, layout/, ui/, aceternity/
  content/
    lessons/           environments, operations, ventures, roles, skills (+ kit.ts helpers)
    exam.ts            Exam Room questions
    games.ts           banks for "This or That?" and "Who Am I?"
    index.ts           LESSONS, LIVE_TOPICS, GLOSSARY, QUESTION_BANK, EXAM_QUESTIONS, masteryIndex
  lib/
    biz/check.ts       answer checker: terms, numbers and money, lists
    biz/banks.ts       scenario banks (Acts, strategies, leadership styles, team stages…)
    biz/generators.ts  seeded question generators: terms, scenarios, interest, average clause
    topics.ts          main topics, topics, papers and colours
    progress.ts, cards.ts, prefs.ts, mastery.ts, mock.ts, worksheet.ts
docs/                  this documentation (rendered at /teachers)
tests/                 Vitest unit + content tests, Playwright e2e
```

## Data flow

- Content is plain TypeScript. Server components read it at build time and pass small, serialisable summaries to client components.
- Models are data (parts, explanations and clues) rendered by one explorer widget – adding a model needs no new component.
- One scenario bank feeds a question generator, the Act Finder and the Speed Biz game.
- Progress, preferences and flashcard schedules live in `localStorage` through a tiny store (`lib/store.ts`).
- `/api/curriculum` is a static, read-only JSON feed of topics, lessons, glossary and question ids. It contains no learner data.

## Marking model

An exam part has `marks`, a `memo` (one fact per line) and `per` (marks per fact: 2 by default, 1 for names, quotes and calculation steps). A learner's score is `min(marks, ticked facts × per)` – the same rule in lessons, the Exam Room and mock papers.
