import { motion } from 'framer-motion'
import { Lock, Server, SlidersHorizontal, Eye, UserCheck, KeyRound } from 'lucide-react'
import Reveal from './Reveal.jsx'

const POINTS = [
  { icon: Lock, label: 'Private conversations' },
  { icon: Server, label: 'Secure data handling' },
  { icon: SlidersHorizontal, label: 'Enterprise-grade protection' },
  { icon: KeyRound, label: 'Permission controls' },
  { icon: Eye, label: 'Data transparency' },
  { icon: UserCheck, label: 'Account security' },
]

export default function Security() {
  return (
    <section className="relative px-4 py-28 sm:py-40 max-w-5xl mx-auto">
      <div className="absolute inset-0 -z-10 flex justify-center">
        <div className="w-[600px] h-[600px] rounded-full bg-core-glow opacity-30 blur-3xl" />
      </div>

      <Reveal className="text-center max-w-2xl mx-auto mb-16">
        <h2 className="font-ui font-medium text-3xl sm:text-5xl leading-[1.15] tracking-tight text-gradient">
          Your intelligence. Your data.
          <br />
          <span className="font-display italic font-normal text-gradient-accent">Your control.</span>
        </h2>
      </Reveal>

      <div className="flex justify-center mb-16">
        <div className="relative w-52 h-52 sm:w-64 sm:h-64 flex items-center justify-center">
          {[0, 1, 2].map((ring) => (
            <motion.div
              key={ring}
              className="absolute rounded-full border border-white/10"
              style={{ width: `${100 - ring * 22}%`, height: `${100 - ring * 22}%` }}
              animate={{ rotate: 360 }}
              transition={{ duration: 18 + ring * 6, repeat: Infinity, ease: 'linear' }}
            >
              <span className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-core-cyan shadow-glow" />
            </motion.div>
          ))}
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-core-violet to-core-cyan shadow-glow" />
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
        {POINTS.map((p, i) => (
          <Reveal key={p.label} delay={i * 0.06} className="flex items-center gap-2.5">
            <p.icon size={15} className="text-core-cyan/80 shrink-0" />
            <span className="text-[13px] text-silver-400/80">{p.label}</span>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
