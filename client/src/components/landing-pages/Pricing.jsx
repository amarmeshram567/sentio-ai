import { Check } from 'lucide-react'
import Reveal from './Reveal.jsx'

const PLANS = [
  {
    name: 'Free',
    desc: 'For exploring SENTIO AI.',
    price: '$0',
    features: ['Limited AI messages', 'Basic models', 'File uploads', 'Standard speed'],
    cta: 'Start Free',
    featured: false,
  },
  {
    name: 'Pro',
    desc: 'For creators and developers.',
    price: '$24',
    period: '/mo',
    features: [
      'Unlimited conversations',
      'Advanced models',
      'Deep reasoning',
      'Vision',
      'Code intelligence',
      'Priority access',
      'Larger context',
    ],
    cta: 'Start Pro',
    featured: true,
  },
  {
    name: 'Enterprise',
    desc: 'For teams and organizations.',
    price: 'Custom',
    features: [
      'Advanced security',
      'Team workspace',
      'Admin controls',
      'Custom limits',
      'Priority support',
      'Enterprise integrations',
    ],
    cta: 'Talk to Sales',
    featured: false,
  },
]

export default function Pricing() {
  return (
    <section id="pricing" className="px-4 py-28 sm:py-36 max-w-6xl mx-auto">
      <Reveal className="text-center max-w-2xl mx-auto mb-16">
        <h2 className="font-ui font-medium text-3xl sm:text-5xl tracking-tight text-gradient">
          Simple plans.
          <br />
          <span className="font-display italic font-normal text-gradient-accent">Serious intelligence.</span>
        </h2>
      </Reveal>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-start">
        {PLANS.map((p, i) => (
          <Reveal key={p.name} delay={i * 0.1}>
            <div
              className={`relative h-full rounded-2xl p-7 sm:p-8 flex flex-col transition-all duration-500 ${p.featured
                  ? 'glass-panel shadow-glow border-white/20 md:-translate-y-3'
                  : 'border border-white/[0.07] bg-white/[0.015]'
                }`}
            >
              {p.featured && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-[10.5px] tracking-[0.1em] uppercase bg-gradient-to-r from-core-violet to-core-cyan text-white rounded-full px-3 py-1">
                  Most Popular
                </span>
              )}
              <h3 className="text-[15px] font-medium text-silver-100">{p.name}</h3>
              <p className="text-[13px] text-silver-400/70 mt-1">{p.desc}</p>
              <p className="mt-6 mb-6">
                <span className="font-display text-4xl text-silver-100">{p.price}</span>
                {p.period && <span className="text-[13px] text-silver-400/60">{p.period}</span>}
              </p>
              <div className="flex flex-col gap-3 mb-8 flex-1">
                {p.features.map((f) => (
                  <div key={f} className="flex items-center gap-2.5 text-[13px] text-silver-300/85">
                    <Check size={14} className="text-core-cyan/80 shrink-0" />
                    {f}
                  </div>
                ))}
              </div>
              <a
                href="#"
                data-cursor="link"
                className={`shine-sweep relative text-center rounded-full px-5 py-3 text-[13.5px] font-medium transition-all duration-300 hover:scale-[1.02] ${p.featured
                    ? 'bg-silver-200 hover:bg-white text-obsidian-950'
                    : 'glass-panel text-silver-200 hover:bg-white/[0.08]'
                  }`}
              >
                {p.cta}
              </a>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
