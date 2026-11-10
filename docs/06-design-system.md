# Colours, type & design system

Every colour has **one meaning** across the whole site.

| Token | Meaning |
|---|---|
| `--brand` (indigo) | Actions and links – "you can click this" |
| `--t-diversity` (teal) | Business Environments |
| `--t-energy` (orange) | Business Operations |
| `--t-cell` (violet) | Business Ventures |
| `--t-body` (berry) | Business Roles |
| `--t-skills` (blue) | Exam Skills |
| `--danger` (red) | Only errors and common mistakes |
| `--success` (green) | Correct answers and positives |
| `--memory` (pink) | Memory hooks and flashcards |
| `--exam` (amber) | Exam tips and the Exam Room |

The token names are shared with the sister apps so that components can be reused; only their meaning per subject differs. Each token has light, dark and high-contrast values in `src/app/globals.css`, and a print palette so papers and memos print in black on white.

## Type

**Space Grotesk** for headings, **Inter** for reading (switchable to Atkinson Hyperlegible or OpenDyslexic), **JetBrains Mono** for amounts, numbers and timers.

## Components

Aceternity-style aurora, spotlight, 3D cards, bento grid, moving border and floating dock; GSAP for the hero animation (a scenario sorted into a SWOT analysis) and lesson transitions; canvas-confetti for celebrations (never in calm mode).

## Widgets

Every lab uses the same frame (`WidgetFrame`): a title, a one-line instruction, the controls and an *Explain* box that updates as the learner changes something. Sliders, segmented controls and toggles come from `widget-frame.tsx`, so labs look and behave the same.
