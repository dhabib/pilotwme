/**
 * MCP Client for pilotwme
 *
 * Connects to PilotCMS MCP server over SSE transport.
 * Handles connection lifecycle, tool calling, and streaming.
 */

const API_URL = process.env.NEXT_PUBLIC_PILOT_API_URL || 'https://api.pilotwme.com'

export interface MCPStreamChunk {
  type: 'provenance' | 'text' | 'component' | 'done' | 'error'
  data: any
}

type StreamHandler = (chunk: MCPStreamChunk) => void

export class MCPClient {
  private eventSource: EventSource | null = null
  private postUrl: string = ''
  private messageId: number = 0
  private pendingRequests: Map<number, { resolve: (v: any) => void; reject: (e: Error) => void }> =
    new Map()
  private streamHandlers: Map<number, StreamHandler> = new Map()
  private connected: boolean = false
  private token: string

  constructor(token: string) {
    this.token = token
  }

  connect(): Promise<void> {
    return new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        reject(new Error('MCP connection timeout'))
      }, 5000)

      this.eventSource = new EventSource(`${API_URL}/api/v1/mcp/sse?token=${this.token}`)

      this.eventSource.addEventListener('endpoint', (event: MessageEvent) => {
        this.postUrl = `${API_URL}${event.data}`
        this.connected = true
        clearTimeout(timeout)

        this.sendRequest('initialize', {
          protocolVersion: '2024-11-05',
          capabilities: {},
          clientInfo: { name: 'pilotwme', version: '1.0.0' },
        })
          .then(() => resolve())
          .catch(reject)
      })

      this.eventSource.addEventListener('message', (event: MessageEvent) => {
        try {
          const data = JSON.parse(event.data)
          const pending = this.pendingRequests.get(data.id)
          if (pending) {
            if (data.error) {
              pending.reject(new Error(data.error.message))
            } else {
              pending.resolve(data.result)
            }
            this.pendingRequests.delete(data.id)
          }
        } catch {
          // Ignore parse errors
        }
      })

      this.eventSource.addEventListener('tool_stream', (event: MessageEvent) => {
        try {
          const chunk: MCPStreamChunk = JSON.parse(event.data)
          for (const handler of this.streamHandlers.values()) {
            handler(chunk)
          }
        } catch {
          // Ignore parse errors
        }
      })

      this.eventSource.onerror = () => {
        if (!this.connected) {
          clearTimeout(timeout)
          reject(new Error('MCP connection failed'))
        }
      }
    })
  }

  private async sendRequest(method: string, params: any = {}): Promise<any> {
    if (!this.connected && method !== 'initialize') {
      throw new Error('Not connected to MCP server')
    }

    const id = ++this.messageId

    const promise = new Promise<any>((resolve, reject) => {
      const timeout = setTimeout(() => {
        this.pendingRequests.delete(id)
        reject(new Error(`MCP request timeout: ${method}`))
      }, 30000)

      this.pendingRequests.set(id, {
        resolve: (value) => {
          clearTimeout(timeout)
          resolve(value)
        },
        reject: (error) => {
          clearTimeout(timeout)
          reject(error)
        },
      })
    })

    await fetch(this.postUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ jsonrpc: '2.0', id, method, params }),
    })

    return promise
  }

  async callTool(name: string, args: Record<string, any> = {}): Promise<any> {
    return this.sendRequest('tools/call', { name, arguments: args })
  }

  async callToolStreaming(
    name: string,
    args: Record<string, any>,
    onChunk: StreamHandler
  ): Promise<any> {
    const handlerId = ++this.messageId
    this.streamHandlers.set(handlerId, onChunk)

    try {
      const result = await this.callTool(name, args)
      return result
    } finally {
      this.streamHandlers.delete(handlerId)
    }
  }

  disconnect(): void {
    if (this.eventSource) {
      this.eventSource.close()
      this.eventSource = null
    }
    this.connected = false
    this.pendingRequests.clear()
    this.streamHandlers.clear()
  }

  isConnected(): boolean {
    return this.connected
  }
}
