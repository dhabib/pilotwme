// =============================================================================
// Marketing Site Content
// =============================================================================
// Static marketing copy and configuration.
// Dynamic content (Research Desk answers, Wisdom Engine hook) fetched from API.
// Components must not embed content inline — they receive it via props.
// =============================================================================

import { ManifoldRegion, VoiceSlider, CitationArtifact } from './types'

// -----------------------------------------------------------------------------
// HOME PAGE
// -----------------------------------------------------------------------------

export const homeHero = {
  eyebrow: "THE WORLD'S FIRST WISDOM ENGINE",
  headline: 'Your CMS manages articles.',
  headlineEm: 'Pilot cultivates wisdom.',
  subhead:
    'Pilot doesn\'t just store files for retrieval. It memorizes what you know, and _projects_ structured knowledge on demand - as articles, briefings, newsletters, social posts... Your full treasury of source material, now truly within reach.',
}

export const homeCards = [
  {
    tag: 'HOOK CONTENT',
    title: 'This site is generated, not written',
    description:
      'The content on this site is a fusion of static, SEO- and AEO- friendly artifacts, called "Hooks," and supplementary content from the Manifold - curated content. Not AI slop - simply a resurfacing of wisdom, in context.',
  },
  {
    tag: 'EXPLORATORY',
    title: 'Scroll deeper and the page opens up',
    description:
      'Of course you still have articles. But below the fold, _exploratory_ zones emerge. Pilot reads your context and generates fresh projections from the manifold — shaped by your Editorial Voice. No two readers get exactly the same page.',
  },
  {
    tag: 'RESEARCH DESK',
    title: 'Ask anything about Pilot',
    description:
      'The research desk is a live interface to Pilot\'s manifold. Ask a question in plain language and Pilot projects an answer from its knowledge space — with full provenance, citing every source it drew from.',
  },
]

export const homeTransparency = {
  heading: 'This site runs on Pilot.',
  body: [
    'The dynamic content on this site is projected by Pilot from its stash of wisdom that we call its _manifold_. This site learned from only a few artifacts: two books (David Habib\'s _Latent Vector_ and _About Five Years_), a few of the product documents that we wrote as we were designing Pilot, and a growing number of items that were projected from the manifold, reviewed, approved, and placed in the library as further sources of wisdom.',
    'This transparency is not a legal disclaimer. It is the product demonstrating its own principle: that the origin of every claim should be traceable, that editorial voice should be paramount, and that knowledge should compound rather than depreciate.',
  ],
}

// -----------------------------------------------------------------------------
// WISDOM ENGINE PAGE — /wisdom-engine
// -----------------------------------------------------------------------------
// Content now fetched from API via /api/hook endpoint (featured hook projection)

// -----------------------------------------------------------------------------
// MANIFOLD EXPLORER — /manifold
// -----------------------------------------------------------------------------

export const manifoldRegions: ManifoldRegion[] = [
  { id: 'wisdom',     label: 'Wisdom Engine',          x: 35, y: 30, size: 70, density: 0.90, artifacts: 24 },
  { id: 'pull',       label: 'Pull-to-Push',           x: 65, y: 25, size: 55, density: 0.80, artifacts: 18 },
  { id: 'schema',     label: 'Schema Trap',            x: 25, y: 55, size: 45, density: 0.70, artifacts: 12 },
  { id: 'byok',       label: 'BYOK Model',             x: 70, y: 55, size: 40, density: 0.50, artifacts:  8 },
  { id: 'editorial',  label: 'Editorial AI',           x: 50, y: 45, size: 60, density: 0.85, artifacts: 21 },
  { id: 'format',     label: 'Format Fluidity',        x: 55, y: 72, size: 35, density: 0.40, artifacts:  6 },
  { id: 'icc',        label: 'Info-Commercial Complex', x: 20, y: 35, size: 42, density: 0.60, artifacts: 10 },
  { id: 'provenance', label: 'Provenance',             x: 78, y: 40, size: 38, density: 0.55, artifacts:  9 },
]

export const manifoldPage = {
  eyebrow: 'MANIFOLD EXPLORER',
  title: 'The knowledge space behind this site',
  description:
    'Every bubble is a semantic region of Pilot\'s manifold — a cluster of related concepts drawn from the source material. Density reflects how richly a region is covered. Artifacts counts the source passages that contribute to it. Click any region to explore.',
}

// -----------------------------------------------------------------------------
// VOICE DEMO — /voice
// -----------------------------------------------------------------------------

export const voiceSliders: VoiceSlider[] = [
  { id: 'brevity',    name: 'Brevity',    leftLabel: 'Expansive', rightLabel: 'Concise',    defaultValue: 50 },
  { id: 'formality',  name: 'Formality',  leftLabel: 'Casual',    rightLabel: 'Scholarly',  defaultValue: 70 },
  { id: 'confidence', name: 'Confidence', leftLabel: 'Hedged',    rightLabel: 'Assertive',  defaultValue: 65 },
]

export const voiceVariants = {
  scholarly: `The epistemological distinction between content management and knowledge projection is foundational to understanding why wisdom engines represent a categorical advancement over prior information architectures. Where a content management system treats knowledge as a discrete artifact — authored, versioned, published — a wisdom engine treats knowledge as a continuous manifold from which projections are derived on demand, governed by an editorial constitution that encodes the organization's communicative intent. The implications for editorial governance, knowledge depreciation, and organizational epistemics are significant and largely underexplored in the literature on enterprise content strategy.`,

  balanced: `Pilot is different from a CMS because it doesn't store articles — it projects them. Your source knowledge lives in the manifold, and every article is generated fresh when needed, shaped by your editorial constitution. The result is content that's always current, always on-voice, and always cites its sources. When you add new knowledge, every downstream projection reflects it immediately. The manifold grows more useful over time, not less.`,

  casual: `Regular CMS: you write stuff, you publish stuff, you update stuff forever. Pilot: you add source material, it writes stuff for you. Better stuff, actually — consistent voice, automatic citations, never stale. You stop being an editor and start being a curator. The machine does the writing. You do the knowing.`,
}

export const voicePage = {
  eyebrow: 'VOICE DEMO',
  title: 'Same knowledge, different voice',
  description:
    'The editorial constitution is a set of parameters that shape every projection Pilot produces. Adjust the sliders to see how the same underlying knowledge reads differently at different voice settings.',
  manifoldRegion: 'Editorial AI',
  sourceCount: 21,
}

// -----------------------------------------------------------------------------
// RESEARCH DESK — /research-desk
// -----------------------------------------------------------------------------

export const researchDeskPage = {
  eyebrow: 'RESEARCH DESK',
  title: 'Ask Pilot anything',
  description:
    'The research desk is a direct interface to Pilot\'s knowledge manifold. Ask a question in plain language and Pilot projects an answer from the real knowledge base — with full provenance, citing every source it drew from.',
  placeholder: 'What would you like to know about Pilot?',
}

export const researchSuggestions = [
  'What is a wisdom engine?',
  'How is Pilot different from a headless CMS?',
  'What are the five content categories?',
  'How does the editorial constitution work?',
]

// Research Desk now streams live answers from the API via /api/ask endpoint
