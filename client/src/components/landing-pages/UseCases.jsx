import { useState } from 'react'
import { Code2, PenTool, GraduationCap, Search, Rocket, Users } from 'lucide-react'
import Reveal from './Reveal.jsx'

const CASES = [
  { icon: Code2, title: 'Developers', desc: 'Build and debug faster.' },
  { icon: PenTool, title: 'Creators', desc: 'Write, design, and brainstorm.' },
  { icon: GraduationCap, title: 'Students', desc: 'Learn difficult concepts with an intelligent tutor.' },
  { icon: Search, title: 'Researchers', desc: 'Explore and synthesize complex information.' },
  { icon: Rocket, title: 'Founders', desc: 'Turn ideas into strategies and products.' },
  { icon: Users, title: 'Teams', desc: 'Collaborate with shared AI intelligence.' },
]

export default function UseCases() {
  const [active, setActive] = useState(0)

  return (
    <section className="px-4 py-28 sm:py-36 max-w-6xl mx-auto">
      <Reveal className="text-center max-w-2xl mx-auto mb-16">
        <h2 className="font-ui font-medium text-3xl sm:text-5xl tracking-tight text-gradient">
          Built for whatever
          <br />
          <span className="font-display italic font-normal text-gradient-accent">comes next.</span>
        </h2>
      </Reveal>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-10">
        {CASES.map((c, i) => (
          <button
            key={c.title}
            data-cursor="link"
            onClick={() => setActive(i)}
            className={`flex flex-col items-center gap-3 rounded-xl px-4 py-5 transition-all duration-300 ${
              active === i ? 'glass-panel shadow-glow' : 'border border-white/[0.05] hover:bg-white/[0.03]'
            }`}
          >
            <c.icon size={18} className={active === i ? 'text-core-cyan' : 'text-silver-400/60'} />
            <span className={`text-[12.5px] ${active === i ? 'text-silver-100' : 'text-silver-400/70'}`}>{c.title}</span>
          </button>
        ))}
      </div>

      <Reveal key={active} className="rounded-2xl glass-panel p-8 sm:p-10 text-center max-w-2xl mx-auto">
        <p className="text-[15px] sm:text-lg text-silver-200 leading-relaxed">{CASES[active].desc}</p>
      </Reveal>
    </section>
  )
}
