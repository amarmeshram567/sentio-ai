import { useEffect, useRef, useState } from 'react'

export default function CustomCursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const isFinePointer = window.matchMedia('(pointer: fine)').matches
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!isFinePointer || reduce) return
    setEnabled(true)

    let ringX = 0, ringY = 0, mouseX = 0, mouseY = 0
    let raf

    const onMove = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
      if (dotRef.current) {
        dotRef.current.style.left = `${mouseX}px`
        dotRef.current.style.top = `${mouseY}px`
      }
    }

    const animate = () => {
      ringX += (mouseX - ringX) * 0.18
      ringY += (mouseY - ringY) * 0.18
      if (ringRef.current) {
        ringRef.current.style.left = `${ringX}px`
        ringRef.current.style.top = `${ringY}px`
      }
      raf = requestAnimationFrame(animate)
    }

    const onOver = (e) => {
      const target = e.target.closest('[data-cursor="link"], a, button')
      if (target) {
        ringRef.current?.style.setProperty('width', '52px')
        ringRef.current?.style.setProperty('height', '52px')
        ringRef.current?.style.setProperty('border-color', 'rgba(207,201,255,0.6)')
        dotRef.current?.style.setProperty('transform', 'translate(-50%, -50%) scale(0.6)')
      }
    }
    const onOut = (e) => {
      const target = e.target.closest('[data-cursor="link"], a, button')
      if (target) {
        ringRef.current?.style.setProperty('width', '34px')
        ringRef.current?.style.setProperty('height', '34px')
        ringRef.current?.style.setProperty('border-color', 'rgba(207,201,255,0.35)')
        dotRef.current?.style.setProperty('transform', 'translate(-50%, -50%) scale(1)')
      }
    }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseover', onOver)
    window.addEventListener('mouseout', onOut)
    raf = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseover', onOver)
      window.removeEventListener('mouseout', onOut)
      cancelAnimationFrame(raf)
    }
  }, [])

  if (!enabled) return null

  return (
    <>
      <div ref={ringRef} className="cursor-ring" />
      <div ref={dotRef} className="cursor-dot" />
    </>
  )
}
