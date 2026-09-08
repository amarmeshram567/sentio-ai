import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import Reveal from './Reveal.jsx'

const FAQS = [
  { q: 'What is SENTIO AI?', a: 'SENTIO AI is an intelligent workspace that brings conversation, reasoning, research, coding, and vision into a single, unified product.' },
  { q: 'Which AI models are available?', a: 'SENTIO Ultra, Reason, Vision, Code, and Fast — each tuned for a different kind of work, from deep reasoning to instant everyday answers.' },
  { q: 'Can I upload files?', a: 'Yes. You can upload documents, spreadsheets, and images for SENTIO AI to analyze and reason about directly in conversation.' },
  { q: 'Does SENTIO AI support coding?', a: 'SENTIO Code is purpose-built for programming — generating, explaining, debugging, and reviewing production-quality code.' },
  { q: 'Is my data private?', a: 'Your conversations are handled with enterprise-grade protection, transparent controls, and permissions you manage.' },
  { q: 'Can teams use SENTIO AI?', a: 'Yes. The Enterprise plan includes shared team workspaces, admin controls, and custom integrations.' },
  { q: 'Can I cancel anytime?', a: 'Yes, Pro subscriptions can be cancelled at any time with no additional fees.' },
  { q: 'Is there a free plan?', a: 'Yes. The Free plan lets you explore SENTIO AI with basic models and limited messages before upgrading.' },
]

function FAQItem({ item, isOpen, onClick }) {
  return (
    <div className="border-b border-white/[0.07]">
      <button
        onClick={onClick}
        className="w-full flex items-center justify-between gap-4 py-6 text-left"
        aria-expanded={isOpen}
      >
        <span className="text-[15px] sm:text-base text-silver-200">{item.q}</span>
        <motion.span animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
          <ChevronDown size={18} className="text-silver-400/70 shrink-0" />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-[13.5px] text-silver-400/75 leading-relaxed max-w-2xl">{item.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function FAQ() {
  const [open, setOpen] = useState(0)

  return (
    <section className="px-4 py-28 sm:py-36 max-w-3xl mx-auto">
      <Reveal className="text-center mb-16">
        <h2 className="font-ui font-medium text-3xl sm:text-5xl tracking-tight text-gradient">
          Questions, answered.
        </h2>
      </Reveal>
      <Reveal delay={0.1}>
        <div>
          {FAQS.map((f, i) => (
            <FAQItem key={f.q} item={f} isOpen={open === i} onClick={() => setOpen(open === i ? -1 : i)} />
          ))}
        </div>
      </Reveal>
    </section>
  )
}
