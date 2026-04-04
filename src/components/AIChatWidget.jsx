import { useState, useRef, useEffect } from 'react'
import OpenAI from 'openai'

const client = new OpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey: import.meta.env.VITE_OPENROUTER_API_KEY || '',
  dangerouslyAllowBrowser: true,
  defaultHeaders: {
    'HTTP-Referer': 'https://dashboards.spirittree.dev',
    'X-Title': 'SpiritTree Dashboards',
  },
})

const SYSTEM_PROMPT = `You are the Economy Narrator — an AI that explains economic dashboard data in plain English for SpiritTree Dashboards.

The dashboards cover 10 topics:
1. Thought Clock — cognitive labor metrics
2. Displacement Index — AI job displacement scores for 56 occupations
3. Last Worker — countdown to full automation scenarios
4. Sørn's Law — intelligence cost trends over time
5. AI Pulse — fear/greed sentiment for AI markets
6. Arms Race — geopolitical AI competition tracking
7. Debasement — currency purchasing power erosion
8. Agent Economy — autonomous agent market metrics
9. Multiplier — leverage and productivity amplification
10. Singularity Clock — timeline estimates for technological singularity

When someone asks about a dashboard or data point, explain what it means in clear, accessible language.
Connect data to real-world implications. Be concise but insightful. Use analogies when they help.`

export default function AIChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const messagesEndRef = useRef(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!input.trim() || loading) return

    const userMsg = { role: 'user', content: input.trim() }
    const newMessages = [...messages, userMsg]
    setMessages(newMessages)
    setInput('')
    setLoading(true)
    setError(null)

    try {
      const response = await client.chat.completions.create({
        model: 'anthropic/claude-haiku-4-5',
        messages: [{ role: 'system', content: SYSTEM_PROMPT }, ...newMessages],
        max_tokens: 1024,
      })
      const assistantMsg = { role: 'assistant', content: response.choices[0]?.message?.content || 'No response.' }
      setMessages([...newMessages, assistantMsg])
    } catch (err) {
      setError('Something went wrong. Please try again.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const accent = '#00ff88'

  return (
    <>
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          style={{ backgroundColor: accent, color: '#0a0a0f' }}
          className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-lg flex items-center justify-center hover:scale-105 transition-transform"
          aria-label="Open Economy Narrator"
        >
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        </button>
      )}

      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-[380px] max-w-[calc(100vw-2rem)] rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          style={{ maxHeight: '500px', background: '#0f0f1a', border: '1px solid #2a2a3a' }}>
          <div style={{ backgroundColor: accent, color: '#0a0a0f' }} className="px-4 py-3 flex items-center justify-between shrink-0">
            <span className="font-semibold text-sm">📊 Economy Narrator</span>
            <button onClick={() => setIsOpen(false)} style={{ color: '#0a0a0f', opacity: 0.7 }} className="hover:opacity-100">
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 min-h-[200px]" style={{ maxHeight: '370px' }}>
            {messages.length === 0 && (
              <div className="text-sm italic" style={{ color: '#666' }}>
                Ask about any dashboard — I'll explain the data in plain English.
              </div>
            )}
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className="max-w-[85%] rounded-xl px-3 py-2 text-sm leading-relaxed"
                  style={{
                    backgroundColor: m.role === 'user' ? accent : '#1a1a2e',
                    color: m.role === 'user' ? '#0a0a0f' : '#e0e0f0',
                  }}
                >
                  {m.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="rounded-xl px-3 py-2 text-sm animate-pulse" style={{ background: '#1a1a2e', color: '#666' }}>
                  Narrating...
                </div>
              </div>
            )}
            {error && <div className="text-xs text-center" style={{ color: '#ef4444' }}>{error}</div>}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSubmit} className="px-3 py-2 shrink-0" style={{ borderTop: '1px solid #2a2a3a' }}>
            <div className="flex gap-2">
              <input
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="Ask about a dashboard..."
                className="flex-1 px-3 py-2 text-sm rounded-lg focus:outline-none"
                style={{ background: '#1a1a2e', border: '1px solid #2a2a3a', color: '#e0e0f0' }}
                disabled={loading}
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                style={{ backgroundColor: accent, color: '#0a0a0f' }}
                className="px-3 py-2 rounded-lg text-sm font-medium disabled:opacity-50 hover:opacity-90 transition-opacity"
              >
                Send
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  )
}
