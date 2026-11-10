# Writing lessons & exam questions

All content is TypeScript data in `src/content`. The tests check everything you add.

## A lesson

Add a lesson object to the file for its main topic in `src/content/lessons/`. It needs a unique `slug`, a `topic`, an `order`, the CAPS reference, objectives, key `terms` (these feed the flashcards and games) and `chunks`.

Keep chunks short (the tests allow at most 15 minutes) and give nearly every chunk something to do. The helpers in `kit.ts` keep lessons readable:

| Helper | Block |
|---|---|
| `text`, `points`, `table`, `note` | Explanation, key points, tables and callouts (`key`, `tip`, `mistake`, `memory`, `exam`, `real-world`, `life`) |
| `brk` | A brain break |
| `model(id)` | A tappable model from `widgets/models.ts` |
| `sort`, `order`, `match` | Sort into groups, put in order, match pairs |
| `quiz` + `mc` | Multiple choice with an explanation for each question |
| `drill` | Endless practice from named generators |
| `exam` | An exam-style question with its marking guideline |

Typed practice (`practice` blocks) and worked examples (`worked` blocks) are written as plain objects.

## An exam question

Add it to `src/content/exam.ts`. Use `p(...)` for parts where each memo line is a full two-mark fact, and `p1(...)` where each line is worth one mark (names, quotes, calculation steps). Give at least enough facts to reach the marks; more is fine – the score is capped.

For "identify and motivate" (3 marks), write the identification and a line starting with `Motivation (1 mark):` – the cap makes the total 3.

## A scenario or a term

- Scenarios: add to the right bank in `src/lib/biz/banks.ts`. Use `{B}` for a business name and `{N}` for a person; alternatives are separated by ` | `.
- Section A terms: add `[description, answer]` to `TERM_BANK` in `src/lib/biz/generators.ts`.

## A model

Add an entry to `MODELS` in `src/components/widgets/models.ts` and its id to `ModelId` in `src/content/types.ts`. Each part needs a name, an explanation and a clue for quiz mode. Then list it in `widgets/catalogue.ts` and use it in a lesson – the tests insist on both.

## Style

Plain South African English, short sentences, local examples. Write memo facts the way the marking guidelines phrase them. Positives and negatives for every "impact" topic.
