import Reveal from './Reveal.jsx'

const STAGES = [
  { label: 'Idea', text: '"I want to launch a productivity app."' },
  { label: 'Analysis', text: 'Evaluating market gaps, user needs, and differentiation opportunities.' },
  { label: 'Suggestion', text: 'Consider focusing on async team rituals rather than task lists.' },
  { label: 'Solution', text: 'A calm, async-first workspace built around weekly rhythms — positioned and ready to build.' },
]

export default function ThinkTogether() {
  return (
    <section className="relative px-4 py-28 sm:py-40 max-w-4xl mx-auto">
      <Reveal className="text-center mb-20">
        <h2 className="font-ui font-medium text-3xl sm:text-5xl tracking-tight text-gradient">
          Don't just ask.
          <br />
          <span className="font-display italic font-normal text-gradient-accent">Think together.</span>
        </h2>
      </Reveal>

      <div className="relative">
        <div className="absolute left-[15px] sm:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/15 to-transparent sm:-translate-x-1/2" />
        <div className="flex flex-col gap-14">
          {STAGES.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.12} className={`relative pl-10 sm:pl-0 ${i % 2 === 0 ? 'sm:pr-[52%]' : 'sm:pl-[52%]'}`}>
              <span
                className={`absolute top-1.5 left-[9px] sm:left-1/2 w-3 h-3 rounded-full bg-core-cyan shadow-glow -translate-x-1/2 animate-pulse-soft`}
              />
              <p className="text-[11px] uppercase tracking-[0.14em] text-core-cyan/80 mb-2">{s.label}</p>
              <p className="text-[15px] sm:text-base text-silver-300 leading-relaxed">{s.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
