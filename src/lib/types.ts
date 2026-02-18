// Shared TypeScript interfaces for the Pilot marketing site
// V2: these will mirror the MCP server's tool response shapes

export interface ManifoldRegion {
  id: string
  label: string
  x: number       // percentage position left
  y: number       // percentage position top
  size: number    // diameter in px
  density: number // 0-1
  artifacts: number
}

export interface VoiceSlider {
  id: string
  name: string
  leftLabel: string
  rightLabel: string
  defaultValue: number
}

export interface CitationArtifact {
  title: string
  source: string
  artifactId?: string  // links to console.pilotwme.com/dashboard/artifacts?select=ID
}

export interface Source {
  title: string
  id: string
}

export interface Article {
  id: string
  slug: string
  title: string
  publishedAt: string | null
  metadata: {
    fileName: string
    sizeBytes: number
  }
}

export interface ArticleDetail extends Article {
  excerpt: string | null
  content: string
  generatedFrom: string | null
}
