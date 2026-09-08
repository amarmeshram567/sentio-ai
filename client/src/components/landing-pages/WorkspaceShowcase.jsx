import { motion, useReducedMotion } from 'framer-motion'
import { FolderCode, ScanSearch, Mic, ListTree } from 'lucide-react'
import Reveal from './Reveal.jsx'

export default function WorkspaceShowcase() {
  const reduce = useReducedMotion()

  return (
    <section id="product" className="relative px-4 py-28 sm:py-40 max-w-6xl mx-auto">
      <Reveal className="text-center max-w-2xl mx-auto mb-16">
        <h2 className="font-ui font-medium text-3xl sm:text-5xl tracking-tight text-gradient">
          Your entire AI workflow.
          <br />
          <span className="font-display italic font-normal text-gradient-accent">One intelligent workspace.</span>
        </h2>
      </Reveal>

      <motion.div
        initial={reduce ? { opacity: 0 } : { opacity: 0, rotateX: 8, scale: 0.94 }}
        whileInView={{ opacity: 1, rotateX: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        style={{ transformPerspective: 1600 }}
        className="relative rounded-[24px] glass-panel shadow-glass overflow-hidden"
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-white/[0.06]">
          <div className="p-6 sm:p-8">
            <div className="flex items-center gap-2 text-silver-300 mb-4">
              <FolderCode size={15} className="text-core-cyan/80" />
              <span className="text-[12.5px] tracking-wide uppercase text-silver-400/60">Code Editor</span>
            </div>
            <div className="rounded-lg border border-white/[0.07] bg-obsidian-950/60 p-4 font-mono text-[11px] leading-relaxed text-silver-400">
              <p><span className="text-core-violet/80">function</span> <span className="text-core-cyan/90">summarize</span>() {'{'}</p>
              <p className="pl-3 text-silver-500">{'// SENTIO generated'}</p>
              <p className="pl-3">return insight;</p>
              <p>{'}'}</p>
            </div>
          </div>

          <div className="p-6 sm:p-8">
            <div className="flex items-center gap-2 text-silver-300 mb-4">
              <ScanSearch size={15} className="text-core-cyan/80" />
              <span className="text-[12.5px] tracking-wide uppercase text-silver-400/60">Research</span>
            </div>
            <div className="flex flex-col gap-2.5">
              {['24 sources analyzed', 'Cross-referencing data', 'Synthesis complete'].map((t) => (
                <div key={t} className="flex items-center gap-2 text-[12.5px] text-silver-400/80">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400/80" />
                  {t}
                </div>
              ))}
            </div>
          </div>

          <div className="p-6 sm:p-8">
            <div className="flex items-center gap-2 text-silver-300 mb-4">
              <Mic size={15} className="text-core-cyan/80" />
              <span className="text-[12.5px] tracking-wide uppercase text-silver-400/60">Voice &amp; Tools</span>
            </div>
            <div className="flex items-end gap-1 h-12">
              {[6, 14, 22, 12, 28, 10, 18, 8, 24, 14].map((h, i) => (
                <span
                  key={i}
                  className="w-1.5 rounded-full bg-gradient-to-t from-core-violet to-core-cyan animate-pulse-soft"
                  style={{ height: `${h}px`, animationDelay: `${i * 0.1}s` }}
                />
              ))}
            </div>
            <div className="flex items-center gap-2 mt-4 text-[12px] text-silver-400/60">
              <ListTree size={13} /> Model: SENTIO Ultra
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
