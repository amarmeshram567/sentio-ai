import Reveal from './Reveal.jsx'

const TESTIMONIALS = [
  {
    quote: 'SENTIO AI feels less like software and more like having another incredibly capable person on the team.',
    name: 'Maren Ilić',
    title: 'Head of Product',
    company: 'Nordly Labs',
  },
  {
    quote: 'We replaced three separate tools with one workspace. The reasoning quality alone changed how we plan.',
    name: 'Devon Cass',
    title: 'Founder',
    company: 'Arclight Studio',
  },
  {
    quote: 'It anticipates what I actually need instead of just answering what I typed. That distinction matters.',
    name: 'Priya Nathan',
    title: 'Lead Researcher',
    company: 'Meridian Institute',
  },
]

export default function Testimonials() {
  return (
    <section className="px-4 py-28 sm:py-36 max-w-6xl mx-auto">
      <Reveal className="text-center max-w-2xl mx-auto mb-16">
        <h2 className="font-ui font-medium text-3xl sm:text-5xl tracking-tight text-gradient">
          Loved by people building
          <br />
          <span className="font-display italic font-normal text-gradient-accent">what comes next.</span>
        </h2>
      </Reveal>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {TESTIMONIALS.map((t, i) => (
          <Reveal key={t.name} delay={i * 0.1}>
            <div className="h-full rounded-2xl glass-panel p-7 flex flex-col justify-between">
              <p className="text-[14.5px] text-silver-200 leading-relaxed font-display italic text-lg">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="flex items-center gap-3 mt-8">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-core-violet/60 to-core-cyan/40" />
                <div>
                  <p className="text-[13px] text-silver-100">{t.name}</p>
                  <p className="text-[11.5px] text-silver-400/60">{t.title}, {t.company}</p>
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
