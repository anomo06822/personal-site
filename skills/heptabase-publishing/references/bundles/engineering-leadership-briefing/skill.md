# skill.md — Engineering Leadership Briefing Skill

## Overview
This bundle is for high-density management-facing briefings.

It is designed for topics that need:
- a strong point of view
- short, direct paragraphs
- conclusion-sentence section headings
- explicit managerial implications
- concrete next actions

This bundle still returns the standard AIPW content JSON packet, so it remains compatible with:
- Content Studio draft generation
- note projection
- LinkedIn / X draft creation
- hero image brief generation

## Part 1 — Voice System

### Core identity
Write like a technical operator briefing engineering leadership.

The result should feel:
- condensed
- informed
- selective
- managerial
- structurally crisp

### What matters most
Prioritize:
- judgment clarity
- evidence-backed interpretation
- org and delivery implications
- short paragraphs with high information density

### What to avoid
Avoid:
- narrative scene-setting that delays the conclusion
- soft or generic section headings
- motivational filler
- trend-list writing with no hierarchy
- "both sides" hedging when the evidence supports a real stance

## Part 2 — Supported Article Modes

### `OpenAI 訪談型`
Use when an interview, keynote, or executive conversation reveals:
- product direction
- operating philosophy
- ecosystem strategy
- org-level implications for builders or buyers

The job is not to summarize quotes.
The job is to extract what the interview implies about market structure, team decisions, or engineering strategy.

### `年度趨勢型`
Use when multiple signals should be compressed into one annual judgment.

Do not write "top 10 trends."
Write a hierarchy:
- what is changing
- why now
- what engineering leaders should reallocate

### `工程管理觀點型`
Use when the main value is a direct leadership stance.

This mode should emphasize:
- staffing
- org design
- delivery rhythm
- risk handling
- management tradeoffs

## Part 3 — Briefing Preparation Contract

When this bundle is used, fill the optional `briefingPreparation` object.

Requirements:
- `alternateTitles`: exactly 3 usable titles
- `openingParagraph`: 1 opening paragraph with judgment first
- `outline`: the real article outline, in order
- `weeklyActions`: exactly 3 actions a reader can take this week

These items are projected into the note before the canonical draft so the operator can review the framing quickly.

## Part 4 — Personal-site Canonical Structure

The personal-site article still maps to the standard AIPW fields, but with a stricter briefing style.

### `personalSite.sectionHeadings`
Always fill this object in this bundle.

Rules:
- every heading should be a conclusion sentence
- `insightHeadingStyle` should be `direct`
- headings should sound like judgments, not labels

### `personalSite.tldr`
Use as the sharp opening brief.
3–4 sentences.
State:
- the event or topic
- the core judgment
- why this matters to the target reader

### `personalSite.whatHappened`
Keep it short.
This is context, not the article's center of gravity.

### `personalSite.whyItMatters`
Translate the event into:
- a managerial signal
- an operating shift
- a resource-allocation question

### `personalSite.insights`
Use at least 3 insights.

For each insight:
- `heading` must be a conclusion sentence
- `punchline` must be even sharper than the heading
- `body` must include example or observation, explanation, and reader meaning
- `implication` must tell the team what changes because this is true

### `personalSite.secondOrderImpact`
Force the discussion into second-order terms:
- delivery shape
- ownership boundaries
- evaluation burden
- management overhead
- org learning loops

### `personalSite.adoption`
Write concrete adoption guidance for the target reader.
Answer:
- who should act
- how to start
- what not to do yet

### `personalSite.riskAndConstraints`
Be specific.
Name the failure mode, not just uncertainty.

### `personalSite.finalJudgment`
This must be quotable on its own.
2–4 sentences.

### `personalSite.cta`
Use this as the closing actions section.
Make it work with the three actions in `briefingPreparation.weeklyActions`.

## Part 5 — LinkedIn Rules

LinkedIn is not the article summary.

It should read like:
- one sharp management stance
- one clear implication
- one useful closing prompt

Requirements:
- short paragraphs
- explicit viewpoint in the first paragraph
- no vague personal-branding tone

## Part 6 — X Thread Rules

The X thread should stage the reasoning.

Good sequence:
1. strong judgment
2. event / signal
3. why leaders should care
4. what teams will misread
5. what changes in practice
6. closing stance
7. click reason

## Part 7 — Hero Image Rules

Use metaphors that support a leadership briefing:
- control planes
- decision funnels
- org topology
- resource flow
- feedback loops

Avoid:
- humanoid robot imagery
- generic cyberpunk dashboards
- pretty but meaningless AI wallpaper

## Part 8 — QA Checklist

Before finalizing, verify:
- the article reads like a briefing, not a blog ramble
- section headings are conclusion sentences
- each section contains claim, evidence, explanation, reader meaning
- the article lands inside the target length range
- the weekly actions are operationally specific
- LinkedIn and X keep the same thesis without copying the long-form structure
