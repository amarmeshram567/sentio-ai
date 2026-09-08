import { useEffect, useRef, useState } from 'react'
import { useInView, useReducedMotion } from 'framer-motion'
import Reveal from './Reveal.jsx'

const STATS = [
  { value: 1, prefix: '< ', suffix: 's', label: 'Average response start', decimals: 0 },
  { value: 99.9, suffix: '%', label: 'Platform availability', decimals: 1 },
  { value: null, display: '24/7', label: 'AI availability' },
  { value: null, display: '∞', label: 'Ideas supported' },
]

function AnimatedStat({ stat }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })
  const reduce = useReducedMotion()
  const [display, setDisplay] = useState(reduce ? stat.value : 0)

  useEffect(() => {
    if (!inView || stat.value === null) return
    if (reduce) {
      setDisplay(stat.value)
      return
    }
    let start
    const duration = 1400
    const step = (ts) => {
      if (!start) start = ts
      const progress = Math.min((ts - start) / duration, 1)
      setDisplay(Number((progress * stat.value).toFixed(stat.decimals)))
      if (progress < 1) requestAnimationFrame(step)
      else setDisplay(stat.value)
    }
    requestAnimationFrame(step)
  }, [inView, reduce, stat])

  return (
    <span ref={ref}>
      {stat.value === null ? stat.display : `${stat.prefix || ''}${display}${stat.suffix || ''}`}
    </span>
  )
}

export default function PerformanceStats() {
  return (
    <section className="px-4 py-28 sm:py-32 max-w-5xl mx-auto">
      <Reveal className="text-center max-w-xl mx-auto mb-16">
        <h2 className="font-ui font-medium text-3xl sm:text-4xl tracking-tight text-gradient">
          Fast enough to keep up with your thoughts.
        </h2>
      </Reveal>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 sm:gap-6">
        {STATS.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.1} className="text-center">
            <p className="font-display text-4xl sm:text-5xl text-gradient-accent mb-2">
              <AnimatedStat stat={s} />
            </p>
            <p className="text-[12.5px] text-silver-400/70">{s.label}</p>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
