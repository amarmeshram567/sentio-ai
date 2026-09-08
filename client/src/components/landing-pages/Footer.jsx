import { Github, Twitter, Linkedin, MessageCircle } from 'lucide-react'
import Logo from './Logo.jsx'

const COLUMNS = [
  { title: 'Product', links: ['Chat', 'Models', 'Capabilities', 'Pricing'] },
  { title: 'Resources', links: ['Documentation', 'API', 'Guides', 'Help Center'] },
  { title: 'Company', links: ['About', 'Careers', 'Contact', 'Security'] },
]

const SOCIALS = [
  { icon: Github, label: 'GitHub' },
  { icon: Twitter, label: 'X' },
  { icon: Linkedin, label: 'LinkedIn' },
  { icon: MessageCircle, label: 'Discord' },
]

export default function Footer() {
  return (
    <footer className="relative border-t border-white/[0.06] px-4 pt-20 pb-10">
      <div className="max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-10">
        <div className="col-span-2 lg:col-span-2">
          <div className="flex items-center gap-2.5 mb-4">
            <Logo size={24} />
            <span className="font-ui text-[14px] tracking-[0.14em] text-silver-200 uppercase">Sentio AI</span>
          </div>
          <p className="text-[13px] text-silver-400/60 max-w-[220px]">Intelligence, Reimagined.</p>
          <div className="flex items-center gap-4 mt-6">
            {SOCIALS.map((s) => (
              <a key={s.label} href="#" data-cursor="link" aria-label={s.label} className="text-silver-400/60 hover:text-silver-200 transition-colors">
                <s.icon size={16} />
              </a>
            ))}
          </div>
        </div>

        {COLUMNS.map((col) => (
          <div key={col.title}>
            <p className="text-[11.5px] uppercase tracking-[0.1em] text-silver-400/50 mb-4">{col.title}</p>
            <div className="flex flex-col gap-3">
              {col.links.map((l) => (
                <a key={l} href="#" data-cursor="link" className="text-[13px] text-silver-400/75 hover:text-white transition-colors">
                  {l}
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="max-w-6xl mx-auto mt-16 pt-8 border-t border-white/[0.05] flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-[12px] text-silver-400/50">&copy; 2026 SENTIO AI. All rights reserved.</p>
        <div className="flex items-center gap-6">
          {['Privacy', 'Terms', 'Cookies'].map((l) => (
            <a key={l} href="#" data-cursor="link" className="text-[12px] text-silver-400/50 hover:text-silver-200 transition-colors">
              {l}
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
