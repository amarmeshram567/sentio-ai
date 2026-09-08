import { ShieldCheck, Layers, Zap, BrainCircuit, Sparkles } from 'lucide-react'
import Reveal from './Reveal.jsx'

const ITEMS = [
  { icon: ShieldCheck, label: 'Private by Design' },
  { icon: Layers, label: 'Multimodal' },
  { icon: Zap, label: 'Lightning Fast' },
  { icon: BrainCircuit, label: 'Context Aware' },
  { icon: Sparkles, label: 'Always Learning' },
]

export default function TrustIndicators() {
  return (
    <section className="px-4 py-16 sm:py-20">
      <Reveal>
        <p className="text-center text-[13px] tracking-[0.1em] uppercase text-silver-400/60 mb-8">
          Built for the way you think.
        </p>
      </Reveal>
      <div className="flex flex-wrap justify-center gap-x-10 gap-y-5 max-w-4xl mx-auto">
        {ITEMS.map((item, i) => (
          <Reveal key={item.label} delay={i * 0.08}>
            <div className="flex items-center gap-2 text-silver-400/70">
              <item.icon size={15} className="text-core-cyan/70" />
              <span className="text-[13px]">{item.label}</span>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
