---
title: Claude Fable 5, by the numbers
date: 2026-06-09
description: Anthropic's new top-tier model — pricing, context window, and how it fits into the lineup.
tags: ai, llms
---

Anthropic's model lineup has a new top tier. Claude Fable 5 (API id
`claude-fable-5`) sits above Opus, which until now was the flagship name. Here's
what the published specs say, without the hype.

## Pricing

Fable 5 costs exactly twice what Opus 4.8 does: $10 per million input tokens
and $50 per million output tokens.

![Bar chart comparing Claude API pricing per million tokens: Fable 5 at $10 in / $50 out, Opus 4.8 at $5/$25, Sonnet 4.6 at $3/$15, Haiku 4.5 at $1/$5](/images/fable-5-pricing.svg)

The lineup now has a clean 2× ladder: each tier costs roughly double the one
below it (Haiku → Sonnet is the exception at 3×).

## Context and output

Fable 5 matches Opus 4.8 here: a 1M-token context window and 128K max output
tokens. Sonnet 4.6 gets the same 1M context but half the output ceiling; Haiku
4.5 is the outlier with a 200K window.

![Bar chart comparing context windows and max output tokens: Fable 5 and Opus 4.8 at 1M context / 128K output, Sonnet 4.6 at 1M / 64K, Haiku 4.5 at 200K / 64K](/images/fable-5-context.svg)

## API notes for the curious

The request surface is the same as Opus 4.7/4.8, which means the older knobs
are gone for good:

- **No sampling parameters.** `temperature`, `top_p`, and `top_k` all return
  a 400. Steering happens through prompting.
- **Adaptive thinking only.** The fixed "thinking budget" (`budget_tokens`) is
  removed; you pass `thinking: { type: "adaptive" }` and optionally tune
  `output_config.effort` (`low` through `max`). One quirk unique to Fable 5:
  explicitly sending `thinking: { type: "disabled" }` is also a 400 — you omit
  the parameter instead.
- **No assistant prefills.** Structured outputs (`output_config.format`)
  replace them.

## Should you use it?

The honest answer for most workloads: probably start with Opus 4.8 and move up
only if you measure a difference that's worth 2× the cost. The interesting
thing about Fable 5 isn't any single number above — it's that Anthropic decided
Opus needed a tier above it at all.

_Specs from Anthropic's published model documentation and API pricing as of
June 2026._
