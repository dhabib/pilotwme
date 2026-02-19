import { ComponentType } from 'react'
import TextBlock, { TextBlockProps } from './text-block'
import CitationCard, { CitationCardProps } from './citation-card'
import TopicPill, { TopicPillProps } from './topic-pill'
import InsightPanel, { InsightPanelProps } from './insight-panel'
import ExplorePrompt, { ExplorePromptProps } from './explore-prompt'

export const GENUI_REGISTRY: Record<string, ComponentType<any>> = {
  text_block: TextBlock,
  citation_card: CitationCard,
  topic_pill: TopicPill,
  insight_panel: InsightPanel,
  explore_prompt: ExplorePrompt,
}

export { TextBlock, CitationCard, TopicPill, InsightPanel, ExplorePrompt }

export type {
  TextBlockProps,
  CitationCardProps,
  TopicPillProps,
  InsightPanelProps,
  ExplorePromptProps,
}
