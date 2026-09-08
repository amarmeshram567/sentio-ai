import { Gauge, Wand2, Compass } from 'lucide-react'
import Reveal from './Reveal.jsx'

const PILLARS = [
  { icon: Gauge, title: 'Think Faster', desc: 'Turn complex problems into clear decisions.' },
  { icon: Wand2, title: 'Create Better', desc: 'Transform ideas into polished work.' },
  { icon: Compass, title: 'Go Further', desc: 'Explore possibilities beyond what you could do alone.' },
]

export default function HumanCentered() {
  return (
    <section className="px-4 py-28 sm:py-40 max-w-5xl mx-auto text-center">
      <Reveal>
        <h2 className="font-ui font-medium text-3xl sm:text-5xl leading-[1.15] tracking-tight text-gradient">
          Technology should amplify
          <br />
          <span className="font-display italic font-normal text-gradient-accent">human potential.</span>
        </h2>
      </Reveal>
      <Reveal delay={0.15}>
        <p className="mt-7 text-[15.5px] sm:text-lg text-silver-400/75 leading-relaxed max-w-2xl mx-auto">
          SENTIO AI doesn't replace creativity. It gives your ideas the intelligence,
          speed, and clarity to become something more.
        </p>
      </Reveal>

      <div className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-10 sm:gap-6">
        {PILLARS.map((p, i) => (
          <Reveal key={p.title} delay={0.2 + i * 0.1}>
            <div className="flex flex-col items-center">
              <div className="w-11 h-11 rounded-full glass-panel flex items-center justify-center mb-5">
                <p.icon size={18} className="text-core-cyan/90" />
              </div>
              <h3 className="text-[15.5px] font-medium text-silver-100 mb-2">{p.title}</h3>
              <p className="text-[13.5px] text-silver-400/70 max-w-[220px] leading-relaxed">{p.desc}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
