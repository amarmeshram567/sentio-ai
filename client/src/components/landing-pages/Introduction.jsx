import Reveal from './Reveal.jsx'

export default function Introduction() {
  return (
    <section className="relative px-4 py-32 sm:py-44 max-w-4xl mx-auto text-center">
      <Reveal>
        <h2 className="font-ui font-medium text-3xl sm:text-5xl leading-[1.15] tracking-tight text-gradient">
          AI should feel less like a tool
          <br />
          and more like a{' '}
          <span className="font-display italic font-normal text-gradient-accent">partner.</span>
        </h2>
      </Reveal>
      <Reveal delay={0.15}>
        <p className="mt-8 text-[15.5px] sm:text-lg text-silver-400/75 leading-relaxed max-w-2xl mx-auto">
          SENTIO AI brings conversation, reasoning, creativity, research, coding,
          and vision into one intelligent workspace.
        </p>
      </Reveal>
    </section>
  )
}
