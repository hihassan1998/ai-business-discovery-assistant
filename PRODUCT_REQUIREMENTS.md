# Product Requirements Document

## 1. Landing Page (`/`)
- Hero Title: "Turn Customer Conversations into Software Blueprints"
- Subtext: "AI-powered discovery for software consultants"
- Primary CTA: "Start Discovery Session" → links to `/discovery`

## 2. Discovery Chat (`/discovery`)
- Top: Title "Discovery Session"
- Middle: Scrollable chat feed (User bubbles + AI bubbles)
- Bottom: Input field + Send button
- Fixed Button below chat: "⚡ Generate Report" (appears after 5+ exchanges)

## 3. Report Output (Below chat, after generation)
- Sections (Editable divs):
  1. Customer Overview
  2. Identified Pain Points
  3. Business Problems
  4. Proposed Solution
  5. Functional Requirements (Bullet list)
  6. User Stories (Bullet list)
  7. Technical Architecture (Paragraph)
- Editable: All text fields must be `contentEditable` or use a simple textarea.

## 4. Scope Visualization
- Chart.js Doughnut/Pie chart showing:
  - Frontend, Backend, UI/UX, Testing, Management
- Data comes from the AI's JSON response.

## 5. Final Action
- Button: "📨 Send to Consultant"
- On click: Shows toast notification: "Report delivered to consultant@firm.com (Demo)"