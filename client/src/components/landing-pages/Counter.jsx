import { useEffect, useRef, useState } from 'react'
import { useInView, useReducedMotion } from 'framer-motion'

export default function Counter({ target, suffix = '', duration = 1.4 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })
  const reduce = useReducedMotion()
  const [value, setValue] = useState(reduce ? target : 0)

  useEffect(() => {
    if (!inView || reduce) return
    const isNumeric = typeof target === 'number'
    if (!isNumeric) return
    let start
    const step = (ts) => {
      if (!start) start = ts
      const progress = Math.min((ts - start) / (duration * 1000), 1)
      setValue(Math.floor(progress * target))
      if (progress < 1) requestAnimationFrame(step)
      else setValue(target)
    }
    requestAnimationFrame(step)
  }, [inView, reduce, target, duration])

  return (
    <span ref={ref}>
      {typeof target === 'number' ? value : target}
      {suffix}
    </span>
  )
}
