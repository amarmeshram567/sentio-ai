import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Reveal from './Reveal.jsx'

export default function FinalCTA() {
  return (
    <section className="relative px-4 py-36 sm:py-48 overflow-hidden text-center">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-obsidian-950" />
        <motion.div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1100px] h-[500px] rounded-full bg-core-glow opacity-50 blur-3xl"
          animate={{ opacity: [0.35, 0.55, 0.35] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <div className="absolute inset-0 bg-fine-grid opacity-60" />
        {[...Array(14)].map((_, i) => (
          <span
            key={i}
            className="absolute w-1 h-1 rounded-full bg-core-cyan/60 animate-drift-slow"
            style={{
              left: `${(i * 37) % 100}%`,
              top: `${(i * 53) % 100}%`,
              animationDelay: `${i * 0.4}s`,
            }}
          />
        ))}
      </div>

      <Reveal>
        <h2 className="font-ui font-medium text-4xl sm:text-6xl tracking-tight text-gradient max-w-3xl mx-auto">
          The future is <span className="font-display italic font-normal text-gradient-accent">already here.</span>
        </h2>
      </Reveal>
      <Reveal delay={0.15}>
        <p className="mt-6 text-[15.5px] sm:text-lg text-silver-400/75 max-w-xl mx-auto">
          Start thinking differently with intelligence designed for what comes next.
        </p>
      </Reveal>
      <Reveal delay={0.3} className="mt-11 flex flex-col sm:flex-row items-center justify-center gap-4">
        <a
          href="#pricing"
          data-cursor="link"
          className="shine-sweep group inline-flex items-center gap-2 rounded-full bg-silver-200 hover:bg-white text-obsidian-950 px-7 py-3.5 text-[14.5px] font-medium shadow-glow transition-all duration-300 hover:scale-[1.03]"
        >
          Start Using SENTIO AI
          <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
        </a>
        <a
          href="#product"
          data-cursor="link"
          className="glass-panel inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-[14.5px] text-silver-200 transition-all duration-300 hover:bg-white/[0.08]"
        >
          Explore the Platform
        </a>
      </Reveal>
    </section>
  )
}
