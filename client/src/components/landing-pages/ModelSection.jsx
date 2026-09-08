import { Gauge, Calculator, ScanEye, Terminal, Bolt } from 'lucide-react'
import Reveal from './Reveal.jsx'

const MODELS = [
  {
    icon: Gauge,
    name: 'SENTIO Ultra',
    desc: 'Maximum intelligence.',
    tags: ['Complex reasoning', 'Research', 'Strategy', 'Advanced problem solving'],
  },
  {
    icon: Calculator,
    name: 'SENTIO Reason',
    desc: 'Deep analytical thinking.',
    tags: ['Mathematics', 'Logic', 'Planning', 'Technical problems'],
  },
  {
    icon: ScanEye,
    name: 'SENTIO Vision',
    desc: 'Advanced visual intelligence.',
    tags: ['Images', 'Documents', 'Screenshots', 'Visual analysis'],
  },
  {
    icon: Terminal,
    name: 'SENTIO Code',
    desc: 'Built for developers.',
    tags: ['Programming', 'Debugging', 'Architecture', 'Code review'],
  },
  {
    icon: Bolt,
    name: 'SENTIO Fast',
    desc: 'Instant everyday intelligence.',
    tags: ['Quick answers', 'Brainstorming', 'Writing', 'Everyday tasks'],
  },
]

export default function ModelSection() {
  return (
    <section id="models" className="px-4 py-28 sm:py-36 max-w-6xl mx-auto">
      <Reveal className="text-center max-w-2xl mx-auto mb-16">
        <h2 className="font-ui font-medium text-3xl sm:text-5xl tracking-tight text-gradient">
          Choose the intelligence
          <br />
          <span className="font-display italic font-normal text-gradient-accent">behind your work.</span>
        </h2>
      </Reveal>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {MODELS.map((m, i) => (
          <Reveal key={m.name} delay={i * 0.07}>
            <div className="group h-full rounded-2xl glass-panel p-6 transition-all duration-500 hover:-translate-y-1 hover:shadow-glow">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-core-violet/30 to-core-cyan/20 flex items-center justify-center mb-5">
                <m.icon size={16} className="text-core-cyan/90" />
              </div>
              <h3 className="text-[14.5px] font-medium text-silver-100">{m.name}</h3>
              <p className="text-[12.5px] text-silver-400/70 mt-1 mb-4">{m.desc}</p>
              <div className="flex flex-col gap-1.5">
                {m.tags.map((t) => (
                  <span key={t} className="text-[11.5px] text-silver-500 flex items-center gap-1.5">
                    <span className="w-1 h-1 rounded-full bg-silver-500/70" /> {t}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
