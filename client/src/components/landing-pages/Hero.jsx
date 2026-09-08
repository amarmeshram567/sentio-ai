// import { motion } from 'framer-motion'
// import { ArrowRight, Sparkle } from 'lucide-react'
// import AIChatPreview from './AIChatPreview.jsx'
// import { useAppContext } from '../../context/AppContext.jsx'
// import { SignedIn, SignedOut, SignInButton, useUser, useClerk } from "@clerk/clerk-react"
// import toast from 'react-hot-toast'


// export default function Hero() {

//   const { navigate } = useAppContext()

//   const { user } = useUser();

//   if (user) {
//     navigate('/workspace');
//   }

//   !user && toast.error('Please sign in to access the workspace.')



//   return (
//     <section id="top" className="relative min-h-[100vh] flex flex-col items-center pt-36 sm:pt-40 pb-24 px-4 overflow-hidden">
//       {/* Ambient background */}
//       <div className="absolute inset-0 -z-10">
//         <div className="absolute inset-0 bg-obsidian-950" />
//         <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[900px] h-[900px] rounded-full bg-core-glow opacity-60 blur-3xl" />
//         <div className="absolute inset-0 bg-fine-grid" />
//       </div>

//       <motion.div
//         initial={{ opacity: 0, y: 12 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.7, delay: 0.5 }}
//         className="glass-panel flex items-center gap-2 rounded-full px-4 py-1.5 text-[12.5px] text-silver-300/90 mb-8"
//       >
//         <Sparkle size={13} className="text-core-cyan" />
//         SENTIO AI 2.0 — Intelligence without limits
//       </motion.div>

//       <motion.h1
//         initial={{ opacity: 0, y: 24, filter: 'blur(10px)' }}
//         animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
//         transition={{ duration: 1, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
//         className="text-center font-ui font-medium text-[13vw] leading-[0.98] sm:text-7xl md:text-8xl tracking-tight text-gradient max-w-5xl"
//       >
//         Intelligence,<br />
//         <span className="font-display italic font-normal text-gradient-accent">Reimagined.</span>
//       </motion.h1>

//       <motion.p
//         initial={{ opacity: 0, y: 16 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.8, delay: 1.05 }}
//         className="mt-7 max-w-xl text-center text-[15.5px] sm:text-base text-silver-400/80 leading-relaxed"
//       >
//         Meet a new generation of AI designed to think deeper, create faster,
//         and work alongside you.
//       </motion.p>

//       <motion.div
//         initial={{ opacity: 0, y: 16 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.8, delay: 1.25 }}
//         className="mt-10 flex flex-col sm:flex-row items-center gap-4"
//       >
//         <button
//           onClick={() => navigate('/workspace')}
//           data-cursor="link"
//           className="shine-sweep group relative inline-flex items-center gap-2 rounded-full bg-silver-200 hover:bg-white text-obsidian-950 px-7 py-3.5 text-[14.5px] font-medium shadow-glow transition-all duration-300 hover:scale-[1.03]"
//         >
//           Start Chatting
//           <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
//         </button>
//         <a
//           href="#capabilities"
//           data-cursor="link"
//           className="glass-panel inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-[14.5px] text-silver-200 transition-all duration-300 hover:bg-white/[0.08] hover:scale-[1.02]"
//         >
//           Explore SENTIO AI
//         </a>
//       </motion.div>

//       <motion.div
//         initial={{ opacity: 0, y: 60, scale: 0.96 }}
//         animate={{ opacity: 1, y: 0, scale: 1 }}
//         transition={{ duration: 1.1, delay: 1.5, ease: [0.16, 1, 0.3, 1] }}
//         className="mt-20 w-full"
//         id="product"
//       >
//         <AIChatPreview />
//       </motion.div>
//     </section>
//   )
// }


import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, LoaderIcon, Sparkle } from 'lucide-react'
import AIChatPreview from './AIChatPreview.jsx'
import { useAppContext } from '../../context/AppContext.jsx'
import { useUser, useClerk } from "@clerk/clerk-react"
import toast from 'react-hot-toast'

export default function Hero() {
  const { navigate } = useAppContext()
  const { user, isLoaded } = useUser()
  const { openSignIn } = useClerk()

  // Optional: Auto-redirect existing logged-in users away from the landing page
  useEffect(() => {
    if (isLoaded && user) {
      navigate?.('/workspace')
    }
  }, [isLoaded, user, navigate])

  const handleStartChatting = () => {
    // Wait until Clerk finishes loading auth state
    if (!isLoaded) return

    if (user) {
      navigate?.('/workspace')
    } else {
      toast.error('Please sign in to access the workspace.')
      // Optional: automatically pop open the Clerk modal for better UX
      openSignIn?.()
    }
  }

  return (
    <section id="top" className="relative min-h-[100vh] flex flex-col items-center pt-36 sm:pt-40 pb-24 px-4 overflow-hidden">
      {/* Ambient background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-obsidian-950" />
        <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[900px] h-[900px] rounded-full bg-core-glow opacity-60 blur-3xl" />
        <div className="absolute inset-0 bg-fine-grid" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.5 }}
        className="glass-panel flex items-center gap-2 rounded-full px-4 py-1.5 text-[12.5px] text-silver-300/90 mb-8"
      >
        <Sparkle size={13} className="text-core-cyan" />
        SENTIO AI 2.0 — Intelligence without limits
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 24, filter: 'blur(10px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        transition={{ duration: 1, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="text-center font-ui font-medium text-[13vw] leading-[0.98] sm:text-7xl md:text-8xl tracking-tight text-gradient max-w-5xl"
      >
        Intelligence,<br />
        <span className="font-display italic font-normal text-gradient-accent">Reimagined.</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.05 }}
        className="mt-7 max-w-xl text-center text-[15.5px] sm:text-base text-silver-400/80 leading-relaxed"
      >
        Meet a new generation of AI designed to think deeper, create faster,
        and work alongside you.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.25 }}
        className="mt-10 flex flex-col sm:flex-row items-center gap-4"
      >
        <button
          type="button"
          onClick={handleStartChatting}
          data-cursor="link"
          className="shine-sweep group relative inline-flex items-center gap-2 rounded-full bg-silver-200 hover:bg-white text-obsidian-950 px-7 py-3.5 text-[14.5px] font-medium shadow-glow transition-all duration-300 hover:scale-[1.03]"
        >
          Start Chatting
          <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
        </button>

        <a
          href="#capabilities"
          data-cursor="link"
          className="glass-panel inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-[14.5px] text-silver-200 transition-all duration-300 hover:bg-white/[0.08] hover:scale-[1.02]"
        >
          Explore SENTIO AI
        </a>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 60, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1.1, delay: 1.5, ease: [0.16, 1, 0.3, 1] }}
        className="mt-20 w-full"
        id="product"
      >
        <AIChatPreview />
      </motion.div>
    </section>
  )
}