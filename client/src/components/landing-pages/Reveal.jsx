import { motion, useReducedMotion } from 'framer-motion'

export default function Reveal({
  children,
  delay = 0,
  y = 24,
  blur = true,
  className = '',
  as = 'div',
  once = true,
}) {
  const shouldReduceMotion = useReducedMotion()
  const Component = motion[as] || motion.div

  const initial = shouldReduceMotion
    ? { opacity: 0 }
    : { opacity: 0, y, filter: blur ? 'blur(8px)' : 'blur(0px)' }

  const animate = { opacity: 1, y: 0, filter: 'blur(0px)' }

  return (
    <Component
      initial={initial}
      whileInView={animate}
      viewport={{ once, amount: 0.2 }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </Component>
  )
}
