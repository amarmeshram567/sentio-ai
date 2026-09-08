import { MessageCircle, Brain, Eye, Code2, Search, PenTool, FileText, BarChart3 } from 'lucide-react'
import Reveal from './Reveal.jsx'

const CARDS = [
  {
    icon: MessageCircle,
    title: 'Intelligent Conversations',
    desc: 'Understand complex questions and maintain meaningful context.',
    span: 'md:col-span-2',
  },
  {
    icon: Brain,
    title: 'Advanced Reasoning',
    desc: 'Break down difficult problems and provide structured solutions.',
    span: '',
  },
  {
    icon: Eye,
    title: 'Vision',
    desc: 'Understand images, screenshots, diagrams, and visual information.',
    span: '',
  },
  {
    icon: Code2,
    title: 'Code',
    desc: 'Generate, explain, debug, and improve production-quality code.',
    span: 'md:col-span-2',
  },
  {
    icon: Search,
    title: 'Research',
    desc: 'Analyze information and transform complex research into clear insights.',
    span: 'md:col-span-2',
  },
  {
    icon: PenTool,
    title: 'Creative Studio',
    desc: 'Create writing, ideas, strategies, concepts, and content.',
    span: '',
  },
  {
    icon: FileText,
    title: 'Documents',
    desc: 'Upload and analyze PDFs, documents, spreadsheets, and files.',
    span: '',
  },
  {
    icon: BarChart3,
    title: 'Data Intelligence',
    desc: 'Analyze data and discover meaningful patterns.',
    span: 'md:col-span-2',
  },
]

export default function Capabilities() {
  return (
    <section id="capabilities" className="px-4 py-28 sm:py-36 max-w-6xl mx-auto">
      <Reveal className="text-center max-w-2xl mx-auto mb-16">
        <h2 className="font-ui font-medium text-3xl sm:text-5xl tracking-tight text-gradient">
          One intelligence.
          <br />
          <span className="font-display italic font-normal text-gradient-accent">Infinite possibilities.</span>
        </h2>
        <p className="mt-6 text-[15px] sm:text-base text-silver-400/70">
          Everything you need to think, create, build, and discover.
        </p>
      </Reveal>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {CARDS.map((c, i) => (
          <Reveal key={c.title} delay={(i % 4) * 0.08} className={c.span}>
            <div className="group relative h-full rounded-2xl glass-panel p-6 sm:p-7 overflow-hidden transition-all duration-500 hover:-translate-y-1 hover:border-white/20">
              <div
                className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: 'radial-gradient(180px circle at 30% 20%, rgba(124,108,255,0.16), transparent 70%)' }}
              />
              <div className="relative w-9 h-9 rounded-lg bg-white/[0.06] flex items-center justify-center mb-5">
                <c.icon size={17} className="text-core-cyan/90" />
              </div>
              <h3 className="relative text-[15px] font-medium text-silver-100 mb-2">{c.title}</h3>
              <p className="relative text-[13.5px] text-silver-400/70 leading-relaxed">{c.desc}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
