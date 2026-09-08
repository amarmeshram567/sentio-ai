import { motion } from 'framer-motion'
import { Plus, Paperclip, Mic, Wrench, ChevronDown, ArrowUp, MessageSquare, User } from 'lucide-react'

const HISTORY = [
  'Build a startup plan',
  'Analyze my document',
  'Create React component',
  'Research AI trends',
  'Marketing strategy',
]

const FLOATERS = [
  { label: 'Reasoning', value: 'Deep analysis complete', pos: 'top-[6%] left-[-4%] sm:left-[-2%]', delay: 0 },
  { label: 'Vision', value: 'Image understood', pos: 'top-[2%] right-[-3%] sm:right-[2%]', delay: 0.6 },
  { label: 'Code', value: 'React component generated', pos: 'bottom-[22%] right-[-6%] sm:right-[-3%]', delay: 1.1 },
  { label: 'Research', value: '24 sources analyzed', pos: 'bottom-[8%] left-[-6%] sm:left-[-3%]', delay: 1.6 },
  { label: 'Memory', value: 'Context synchronized', pos: 'top-[42%] left-[-8%] sm:left-[-5%] hidden lg:block', delay: 2.1 },
]

export default function AIChatPreview() {
  return (
    <div className="relative mx-auto max-w-5xl px-2">
      {/* Floating intelligence indicators */}
      {FLOATERS.map((f) => (
        <motion.div
          key={f.label}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: f.delay + 1.8 }}
          className={`hidden sm:block absolute z-20 ${f.pos}`}
        >
          <div
            className="glass-panel animate-drift rounded-xl px-4 py-3 shadow-glass"
            style={{ animationDelay: `${f.delay}s` }}
          >
            <p className="text-[10.5px] uppercase tracking-[0.12em] text-core-cyan/90">{f.label}</p>
            <p className="text-[12.5px] text-silver-300 mt-0.5 whitespace-nowrap">{f.value}</p>
          </div>
        </motion.div>
      ))}

      {/* Main interface panel */}
      <div className="relative rounded-[22px] glass-panel shadow-glass overflow-hidden" style={{ perspective: '1400px' }}>
        <div className="flex h-[520px] sm:h-[560px]">
          {/* Sidebar */}
          <aside className="hidden md:flex w-[220px] flex-col border-r border-white/[0.06] bg-white/[0.015] px-4 py-5">
            <div className="flex items-center gap-2 px-1 mb-6">
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-core-violet to-core-cyan" />
              <span className="text-[13px] tracking-wide text-silver-200">SENTIO AI</span>
            </div>
            <button className="flex items-center gap-2 text-[12.5px] text-silver-300 border border-white/10 rounded-lg px-3 py-2 mb-6 hover:bg-white/[0.05] transition-colors">
              <Plus size={14} /> New Chat
            </button>
            <p className="text-[10.5px] uppercase tracking-[0.12em] text-silver-400/50 px-1 mb-2">Recent</p>
            <div className="flex flex-col gap-1">
              {HISTORY.map((h, i) => (
                <div
                  key={h}
                  className={`flex items-center gap-2 text-[12.5px] px-2.5 py-2 rounded-lg truncate transition-colors ${
                    i === 0 ? 'bg-white/[0.06] text-silver-200' : 'text-silver-400/70 hover:bg-white/[0.03]'
                  }`}
                >
                  <MessageSquare size={12} className="shrink-0 opacity-60" />
                  <span className="truncate">{h}</span>
                </div>
              ))}
            </div>
            <div className="mt-auto flex items-center gap-2 px-1 pt-4 border-t border-white/[0.06]">
              <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center">
                <User size={13} className="text-silver-300" />
              </div>
              <span className="text-[12px] text-silver-400/80">Account</span>
            </div>
          </aside>

          {/* Main chat */}
          <div className="flex-1 flex flex-col min-w-0">
            <div className="flex items-center justify-between px-5 sm:px-7 py-4 border-b border-white/[0.06]">
              <div>
                <p className="text-[13.5px] text-silver-200 font-medium">SENTIO Ultra</p>
                <p className="text-[11px] text-emerald-400/90 flex items-center gap-1.5 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse-soft" /> Online
                </p>
              </div>
              <div className="hidden sm:flex items-center gap-1.5 text-[11.5px] text-silver-400/70 glass-panel rounded-full px-3 py-1.5">
                Ultra <ChevronDown size={12} />
              </div>
            </div>

            <div className="flex-1 overflow-hidden px-5 sm:px-7 py-6 flex flex-col gap-5">
              <motion.div
                initial={{ opacity: 0, x: 10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 2.2, duration: 0.6 }}
                className="ml-auto max-w-[85%] sm:max-w-[70%] bg-white/[0.08] rounded-2xl rounded-tr-sm px-4 py-3"
              >
                <p className="text-[13px] text-silver-200">Create a premium landing page for my AI startup.</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 2.7, duration: 0.6 }}
                className="max-w-[90%] sm:max-w-[78%] rounded-2xl rounded-tl-sm px-4 py-3 bg-gradient-to-br from-white/[0.05] to-transparent border border-white/[0.06]"
              >
                <p className="text-[13px] text-silver-300 leading-relaxed">
                  Absolutely. I've created a complete product direction focused on intelligence, clarity, and conversion.
                </p>
                <div className="mt-3 rounded-lg border border-white/[0.08] bg-obsidian-950/60 px-3 py-2.5 font-mono text-[11px] text-core-cyan/80 leading-relaxed">
                  <span className="text-silver-500">{'// generating UI preview'}</span>
                  <br />
                  {'<Hero '}<span className="text-core-violet/90">variant</span>{'='}<span className="text-emerald-300/80">"cinematic"</span>{' />'}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 3.2, duration: 0.5 }}
                className="flex items-center gap-2 text-[12px] text-silver-400/70"
              >
                <span>Sentio is thinking</span>
                <span className="flex gap-1">
                  <span className="w-1 h-1 rounded-full bg-silver-400/70 animate-pulse-soft" style={{ animationDelay: '0s' }} />
                  <span className="w-1 h-1 rounded-full bg-silver-400/70 animate-pulse-soft" style={{ animationDelay: '0.2s' }} />
                  <span className="w-1 h-1 rounded-full bg-silver-400/70 animate-pulse-soft" style={{ animationDelay: '0.4s' }} />
                </span>
              </motion.div>
            </div>

            {/* Input area */}
            <div className="px-5 sm:px-7 pb-5 pt-2">
              <div className="glass-panel rounded-2xl px-4 py-3.5 flex items-center gap-3">
                <span className="text-[13px] text-silver-500 flex-1 truncate">Ask SENTIO anything...</span>
                <Paperclip size={15} className="text-silver-400/60 hidden sm:block" />
                <Mic size={15} className="text-silver-400/60 hidden sm:block" />
                <Wrench size={15} className="text-silver-400/60 hidden sm:block" />
                <button
                  aria-label="Send message"
                  className="w-8 h-8 rounded-full bg-gradient-to-br from-core-violet to-core-blue flex items-center justify-center shadow-glow"
                >
                  <ArrowUp size={15} className="text-white" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
