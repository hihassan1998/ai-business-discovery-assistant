# UI Specification

## Design System
- Font: Inter (Google Fonts)
- Colors: 
  - Primary: `#9B2740`
  - Dark: `#40252F`
  - Background: `#F3F0F1`
  - Cards: `#F2F2F2` with `shadow-md`
  - Accent: `#A68C41`
  - Text: `#1E293B`

## Landing Page Layout
- Full-width hero with gradient background.
- 3 Feature cards: "Understand", "Generate", "Refine".

## Discovery Page Layout (Desktop)
[Header] "AI Discovery Session"
[Left 60%] Chat history + Input
[Right 40%] Report Preview (sticky scroll) OR Empty state with instructions.

text
On Mobile: Stack vertically (Chat on top, Report below after generation).

## Report Card Design
- Each section is a white card with a blue left border.
- Edit icon (pencil) next to each section header. Clicking makes the text editable.