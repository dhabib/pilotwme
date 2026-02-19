'use client'

import { GENUI_REGISTRY, TextBlock } from './gen-ui'

export interface GenUIItem {
  type: 'text' | 'component' | 'provenance'
  data: {
    componentId?: string
    props?: Record<string, any>
    content?: string
    sourceId?: string
    fileName?: string
    score?: number
    isPublic?: boolean
  }
}

interface GenUIRendererProps {
  items: GenUIItem[]
  onTopicClick?: (query: string) => void
  onExploreClick?: (question: string) => void
  streaming?: boolean
}

export default function GenUIRenderer({
  items,
  onTopicClick,
  onExploreClick,
  streaming = false,
}: GenUIRendererProps) {
  return (
    <div className="space-y-1" role="region" aria-label="AI-generated content" aria-live="polite">
      {items.map((item, index) => {
        const isLast = index === items.length - 1

        if (item.type === 'provenance') {
          const CitationCard = GENUI_REGISTRY.citation_card
          return CitationCard ? (
            <div key={`prov-${index}`}>
              <CitationCard
                sourceId={item.data.sourceId}
                fileName={item.data.fileName}
                score={item.data.score}
                isPublic={item.data.isPublic}
              />
            </div>
          ) : null
        }

        if (item.type === 'text') {
          return (
            <TextBlock
              key={`text-${index}`}
              content={item.data.content || ''}
              streaming={streaming && isLast}
            />
          )
        }

        if (item.type === 'component' && item.data.componentId) {
          const Component = GENUI_REGISTRY[item.data.componentId]

          if (!Component) {
            const fallbackContent =
              item.data.props?.content ||
              item.data.props?.question ||
              item.data.props?.title ||
              JSON.stringify(item.data.props)
            return (
              <TextBlock
                key={`fallback-${index}`}
                content={fallbackContent}
                streaming={streaming && isLast}
              />
            )
          }

          const enrichedProps = { ...item.data.props }
          if (item.data.componentId === 'topic_pill' && onTopicClick) {
            enrichedProps.onClick = onTopicClick
          }
          if (item.data.componentId === 'explore_prompt' && onExploreClick) {
            enrichedProps.onClick = onExploreClick
          }

          return <Component key={`comp-${index}`} {...enrichedProps} />
        }

        return null
      })}
    </div>
  )
}
