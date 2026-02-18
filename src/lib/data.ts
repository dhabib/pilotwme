// =============================================================================
// V1 Hardcoded Content
// =============================================================================
// All content lives here. In V2, replace individual exports with API/MCP calls.
// Components must not embed content inline — they receive it via props.
// =============================================================================

import { ManifoldRegion, VoiceSlider, CitationArtifact, Source } from './types'

// -----------------------------------------------------------------------------
// HOME PAGE
// -----------------------------------------------------------------------------

export const homeHero = {
  eyebrow: "THE WORLD'S FIRST WISDOM ENGINE",
  headline: 'Your CMS manages articles.',
  headlineEm: 'Pilot cultivates wisdom.',
  subhead:
    'Pilot ingests what you know, shapes it through editorial intelligence, and projects structured knowledge on demand — as articles, briefings, or answers. The same source material, endlessly recombined, never stale.',
}

export const homeCards = [
  {
    tag: 'HOOK CONTENT',
    title: 'This site is generated, not written',
    description:
      'Every article on this site was projected from Pilot\'s manifold — not typed, scheduled, or stuffed into a template. Hook content is cached, deterministic, and serves a stable URL. You can link to it. Google can index it. It does not change until the knowledge does.',
  },
  {
    tag: 'EXPLORATORY',
    title: 'Scroll deeper and the page opens up',
    description:
      'Below the fold, exploratory zones emerge. Pilot reads your engagement and generates fresh projections from the manifold — shaped by your editorial constitution. No two readers get exactly the same page.',
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
    'Everything you are reading was projected by Pilot, shaped by two source books: Latent Vector by David Habib, and About 5 Years Publish 6, published by Wren\'s Watch. Neither was written for this site. Pilot ingested them, built a manifold, and has been projecting content ever since.',
    'This transparency is not a legal disclaimer. It is the product demonstrating its own principle: that the origin of every claim should be traceable, that editorial voice should be configurable, and that knowledge should compound rather than depreciate.',
  ],
  citedBook: {
    artifact: {
      title: 'Latent Vector — Foreword',
      source: 'David Habib, Latent Vector (2025), p. i',
    } as CitationArtifact,
    quote: 'AI systems can understand information without requiring predetermined categories',
  },
}

// -----------------------------------------------------------------------------
// HOOK PAGE — /wisdom-engine
// -----------------------------------------------------------------------------

export const hookPage = {
  eyebrow: 'HOOK CONTENT · CACHED · STABLE URL',
  title: 'What Is a Wisdom Engine?',

  // Body paragraphs with optional inline citations
  paragraphs: [
    {
      id: 'p1',
      text: 'A wisdom engine is not a content management system. It does not store articles, manage slugs, or publish pages. It manages understanding — a structured, searchable, editorially-governed space of knowledge that produces content on demand, in any format, at any level of depth, for any audience.',
      citation: null,
    },
    {
      id: 'p2',
      text: 'Every CMS solves the same problem: how do you get structured content from authors to readers? The answer has always been some combination of templates, workflows, and taxonomies. But the schema trap — the assumption that you must define the shape of knowledge before you can manage it — is the original sin of the industry. Wisdom engines are schema-free.',
      citation: {
        artifact: {
          title: 'About 5 Years Publish 6 — The Schema Trap',
          source: 'Wren\'s Watch, About 5 Years Publish 6, Ch. 4',
        } as CitationArtifact,
        text: 'schema trap',
      },
    },
    {
      id: 'p3',
      text: 'The traditional pipeline runs: document → template → page. The wisdom engine pipeline runs: source material → manifold → projection. A manifold is not a database of articles. It is a semantic space — a high-dimensional embedding of your organization\'s accumulated knowledge, indexed by meaning rather than by key.',
      citation: null,
    },
    {
      id: 'pullquote',
      text: '',
      citation: null,
      isPullQuote: true,
      pullQuoteText:
        'Content management manages artifacts. Knowledge management manages documentation. A wisdom engine manages understanding.',
    },
    {
      id: 'p4',
      text: 'What makes a wisdom engine different from a retrieval-augmented generation system is the editorial layer. RAG retrieves; it does not shape. A wisdom engine applies editorial constitution — tone, bias, brevity, formality, confidence — to every projection. The same knowledge can be projected as a scholarly article, a casual briefing, or a three-sentence answer, without touching the source material.',
      citation: {
        artifact: {
          title: 'Latent Vector — Chapter 3: Knowledge Architectures',
          source: 'David Habib, Latent Vector (2025), Ch. 3',
        } as CitationArtifact,
        text: 'editorial constitution',
      },
    },
    {
      id: 'p5',
      text: 'Pull-to-push is the operational shift. Traditional content is pulled: an editor decides to write something, creates a draft, routes it through approval, and publishes it. Hook content is pushed: the system detects what knowledge is relevant to what audience at what moment, and generates the projection automatically. Human editors do not write; they govern.',
      citation: null,
    },
    {
      id: 'p6',
      text: 'The wisdom engine does not replace editorial judgment. It scales it. A single editorial constitution — a few hundred tokens of guidance — governs every projection across every surface. The voice is consistent. The citations are automatic. The content is always current. This is not AI-generated slop. It is structured editorial intelligence applied at machine speed.',
      citation: null,
    },
  ],

  exploratoryText:
    'The shift from pull to push changes everything about how an organization relates to its own knowledge. In a traditional CMS, knowledge depreciates. Articles go stale, editors forget to update them, and the gap between what an organization knows and what it publishes grows wider every month. Teams spend more time maintaining old content than producing new insight. The editorial calendar becomes a graveyard of good intentions.\n\nIn a wisdom engine, knowledge compounds. Every source document added to the manifold enriches every future projection. The manifold grows denser, more connected, more useful — automatically. A new insight does not require a new article. It requires a new source, and the manifold reorganizes itself around it.\n\nThis is what Latent Vector calls the latent vector problem: the knowledge that organizations hold is always richer than the knowledge they publish. The gap is not a talent problem or a process problem. It is an architectural problem. Traditional CMS tools were designed to manage what is published, not to cultivate what is known. Pilot inverts this. The manifold is the product. The publications are projections from it.',

  exploratoryTopics: [
    'Pull-to-Push Architecture',
    'Editorial Constitution',
    'Manifold Density',
    'Provenance Tracking',
    'Hook vs Exploratory',
  ],

  provenanceFooter: {
    artifactCount: 6,
    voiceSettings: 'assertive, moderate depth, scholarly',
    timestamp: new Date().toISOString(),
  },

  generatedFooter: {
    date: new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }),
    libraryUrl: '#',
  },
}

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
    'The editorial constitution is a set of parameters that shape every projection Pilot produces. Adjust the sliders to see how the same underlying knowledge reads differently at different voice settings. In V2, this calls the live API.',
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
    'The research desk is a direct interface to the manifold. Ask a question in plain language and Pilot projects an answer, with citations. In V1, this demonstrates the interaction pattern with a pre-written response.',
  placeholder: 'What would you like to know about Pilot?',
}

export const researchSuggestions = [
  'What is a wisdom engine?',
  'How is Pilot different from a headless CMS?',
  'What are the five content categories?',
  'How does the editorial constitution work?',
]

export const researchAnswer =
  "Pilot uses a Bring Your Own Key model for AI inference. You connect your own API keys — OpenAI, Anthropic, or any compatible provider — and Pilot routes projection requests through your account. This means your content never touches Pilot's servers during inference. Your knowledge stays in your infrastructure: the manifold lives in your Qdrant instance, the knowledge graph in Neo4j, the source files in S3. Pilot is an orchestration layer, not a data host. You own the knowledge. You own the keys. Pilot owns the intelligence that connects them."

export const researchSources: Source[] = [
  { title: 'Latent Vector — Chapter 3: Knowledge Architectures', id: 'artifact_lv_003' },
  { title: 'About 5 Years Publish 6 — The BYOK Principle',       id: 'artifact_p6_017' },
  { title: 'Pilot API Reference — Authentication & BYOK',         id: 'artifact_api_auth' },
]
