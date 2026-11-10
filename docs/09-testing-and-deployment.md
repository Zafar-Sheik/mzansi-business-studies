# Testing & deployment

## Scripts

| Command | |
|---|---|
| `npm run dev` | Development server on http://localhost:3000 |
| `npm run typecheck` | TypeScript strict |
| `npm run lint` | ESLint (zero warnings allowed) |
| `npm test` | Vitest: answer checker, calculations, generators and content integrity |
| `npm run build` | Production build (every page is static) |
| `npm run test:e2e` | Playwright on desktop and mobile (needs a build) |
| `npm run check` | typecheck + lint + test + build |

## What the tests guarantee

- **Answer checker.** Terms ignore case, hyphens and articles and accept alternatives; numbers accept rand signs, spaces, decimal commas and tolerances; lists ignore order – with the right feedback for each kind of slip.
- **Calculations.** Simple interest, compound interest and the average clause give the textbook answers.
- **Every generator** produces 150 problems; every memo alternative passes its own checker; problems are deterministic per seed.
- **Every practice problem** passes its own checker; every quiz answer points at a real option; every sorter item belongs to a bucket; matches have unique partners.
- **Every model** is used in a lesson and listed on the Labs page, with unique, explained parts.
- **Every Act scenario** maps to exactly one of the eight Acts.
- **Syllabus coverage.** Every CAPS topic has a lesson, a quiz, Exam Room questions and Section A term practice.
- **Exam questions** always have enough memo facts to reach full marks; every mock paper has enough questions.
- **End-to-end.** Key pages load on desktop and mobile without console errors.

## Deploying

Every page is statically generated; there are no environment variables. Any Node 18.18+ host works (Vercel, Netlify, a school server):

```bash
npm ci
npm run check
npm start
```
