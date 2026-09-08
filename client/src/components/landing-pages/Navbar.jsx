// import { useEffect, useState } from 'react'
// import { motion, AnimatePresence } from 'framer-motion'
// import { Menu, X } from 'lucide-react'
// import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react"
// import Logo from './Logo.jsx'
// import { useAppContext } from '../../context/AppContext.jsx'

// const LINKS = ['Product', 'Capabilities', 'Models', 'Pricing', 'Resources']

// export default function Navbar() {
//   const { navigate } = useAppContext()
//   const [scrolled, setScrolled] = useState(false)
//   const [open, setOpen] = useState(false)

//   useEffect(() => {
//     const onScroll = () => setScrolled(window.scrollY > 24)
//     onScroll()
//     window.addEventListener('scroll', onScroll, { passive: true })
//     return () => window.removeEventListener('scroll', onScroll)
//   }, [])

//   useEffect(() => {
//     document.body.style.overflow = open ? 'hidden' : ''
//   }, [open])

//   return (
//     <>
//       <motion.header
//         initial={{ y: -40, opacity: 0 }}
//         animate={{ y: 0, opacity: 1 }}
//         transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
//         className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-4 sm:pt-5"
//       >
//         <div
//           className={`w-full max-w-6xl flex items-center justify-between rounded-full px-4 sm:px-6 py-3 transition-all duration-500 ${scrolled ? 'glass-panel shadow-glass' : 'bg-transparent border border-transparent'
//             }`}
//         >
//           <a href="#top" data-cursor="link" className="flex items-center gap-2.5 group">
//             <Logo size={26} />
//             <span
//               className="font-['Instrument_Serif'] text-[21px] tracking-wide text-white whitespace-nowrap italic"
//             >
//               Sentio <span className="not-italic font-sans text-xs tracking-widest uppercase font-semibold text-sky-400 ml-1">AI</span>
//             </span>
//           </a>

//           <nav className="hidden md:flex items-center gap-9">
//             {LINKS.map((l) => (
//               <a
//                 key={l}
//                 href={`#${l.toLowerCase()}`}
//                 data-cursor="link"
//                 className="text-[13.5px] text-silver-400/80 hover:text-white transition-colors duration-300"
//               >
//                 {l}
//               </a>
//             ))}
//           </nav>

//           {/* Desktop Auth Section */}
//           <div className="hidden md:flex items-center gap-4">
//             <SignedOut>
//               <SignInButton mode="modal">
//                 <button
//                   type="button"
//                   className="text-[13.5px] text-silver-400/80 hover:text-white transition-colors duration-300"
//                 >
//                   Sign In
//                 </button>
//               </SignInButton>
//               <a
//                 href="#pricing"
//                 className="shine-sweep relative text-[13.5px] font-medium text-obsidian-950 bg-silver-200 hover:bg-white transition-colors duration-300 rounded-full px-5 py-2.5"
//               >
//                 Get Started
//               </a>
//             </SignedOut>

//             <SignedIn>
//               <button
//                 type="button"
//                 onClick={() => navigate?.('/workspace')}
//                 className="text-[13.5px] font-medium text-silver-200 hover:text-white transition-colors duration-200 px-3 py-1.5"
//               >
//                 Go to Workspace
//               </button>
//               <UserButton
//                 afterSignOutUrl="/"
//                 appearance={{
//                   elements: {
//                     avatarBox: "w-8 h-8 rounded-full border border-obsidian-700 shadow-sm"
//                   }
//                 }}
//               />
//             </SignedIn>
//           </div>

//           {/* Mobile Hamburger */}
//           <button
//             className="md:hidden text-silver-200 p-1 rounded-lg hover:bg-white/5 transition-colors"
//             onClick={() => setOpen(true)}
//             aria-label="Open menu"
//           >
//             <Menu size={22} />
//           </button>
//         </div>
//       </motion.header>

//       {/* Mobile Drawer */}
//       <AnimatePresence>
//         {open && (
//           <div className="fixed inset-0 z-[60] md:hidden">
//             {/* Backdrop */}
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               transition={{ duration: 0.3, ease: 'easeInOut' }}
//               onClick={() => setOpen(false)}
//               className="absolute inset-0 bg-obsidian-950/70 backdrop-blur-md"
//             />

//             {/* Drawer Container */}
//             <motion.div
//               initial={{ x: '-100%' }}
//               animate={{ x: 0 }}
//               exit={{ x: '-100%' }}
//               transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
//               className="relative h-[100dvh] w-[86vw] max-w-[340px] bg-obsidian-950/95 border-r border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.8)] flex flex-col justify-between overflow-hidden"
//             >
//               {/* Top & Navigation Section */}
//               <div className="flex-1 overflow-y-auto px-6 pt-6 pb-4">
//                 <div className="flex items-center justify-between pb-6 border-b border-white/[0.08]">
//                   <div className="flex items-center gap-3">
//                     <Logo size={24} />
//                     <span className="font-ui text-[14px] tracking-[0.16em] text-silver-200 uppercase font-medium">
//                       Sentio <span className="text-white/40 font-light">AI</span>
//                     </span>
//                   </div>
//                   <button
//                     className="text-silver-300 p-2 rounded-xl bg-white/[0.03] border border-white/[0.05] hover:bg-white/10 active:scale-95 transition-all"
//                     onClick={() => setOpen(false)}
//                     aria-label="Close menu"
//                   >
//                     <X size={20} />
//                   </button>
//                 </div>

//                 <nav className="flex flex-col gap-2 pt-6">
//                   {LINKS.map((l, i) => (
//                     <motion.a
//                       key={l}
//                       href={`#${l.toLowerCase()}`}
//                       onClick={() => setOpen(false)}
//                       initial={{ opacity: 0, x: -16 }}
//                       animate={{ opacity: 1, x: 0 }}
//                       transition={{ delay: 0.05 * i + 0.1, duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
//                       className="font-display text-xl tracking-tight text-silver-400 hover:text-white hover:bg-white/[0.04] px-3 py-2.5 rounded-xl transition-all duration-200"
//                     >
//                       {l}
//                     </motion.a>
//                   ))}
//                 </nav>
//               </div>

//               {/* Premium Bottom Auth Container */}
//               <motion.div
//                 initial={{ opacity: 0, y: 16 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 0.35, duration: 0.4 }}
//                 className="relative px-6 pt-5 pb-[calc(env(safe-area-inset-bottom)+1.5rem)] border-t border-white/[0.08] bg-gradient-to-b from-obsidian-950/40 via-obsidian-950/80 to-obsidian-950 backdrop-blur-xl flex flex-col gap-3 shrink-0"
//               >
//                 {/* Subtle Ambient Radial Glow */}
//                 <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />

//                 <SignedOut>
//                   <a
//                     href="#pricing"
//                     onClick={() => setOpen(false)}
//                     className="relative group overflow-hidden w-full text-center rounded-xl bg-gradient-to-r from-white via-silver-200 to-white text-obsidian-950 py-3 text-sm font-semibold tracking-wide shadow-[0_0_20px_rgba(255,255,255,0.12)] active:scale-[0.98] transition-all duration-300"
//                   >
//                     Get Started
//                   </a>

//                   <SignInButton mode="modal">
//                     <button
//                       type="button"
//                       onClick={() => setOpen(false)}
//                       className="w-full text-center text-xs tracking-wider uppercase font-medium text-silver-400 hover:text-silver-200 py-2.5 rounded-xl border border-white/[0.06] hover:bg-white/[0.04] transition-all"
//                     >
//                       Sign In
//                     </button>
//                   </SignInButton>
//                 </SignedOut>

//                 <SignedIn>
//                   <div className="flex items-center justify-between p-2 rounded-2xl bg-white/[0.03] border border-white/[0.08] shadow-inner">
//                     <button
//                       type="button"
//                       onClick={() => {
//                         setOpen(false);
//                         navigate?.('/workspace');
//                       }}
//                       className="flex items-center gap-2 text-sm font-medium text-silver-200 hover:text-white transition-colors pl-1"
//                     >
//                       <span>Go to Workspace</span>
//                       <span className="text-white/40 text-xs">→</span>
//                     </button>
//                     <div className="p-1 rounded-full bg-gradient-to-r from-white/20 via-white/40 to-white/20 shadow-[0_0_20px_rgba(255,255,255,0.12)]">
//                       <UserButton afterSignOutUrl="/" />
//                     </div>
//                   </div>
//                 </SignedIn>
//               </motion.div>
//             </motion.div>
//           </div>
//         )}
//       </AnimatePresence>
//     </>
//   )
// }


// import { useEffect, useState, useRef } from 'react'
// import { motion, AnimatePresence } from 'framer-motion'
// import { Menu, X, User, LogOut, ChevronUp, ChevronDown, ComputerIcon } from 'lucide-react'
// import { SignedIn, SignedOut, SignInButton, useUser, useClerk } from "@clerk/clerk-react"
// import Logo from './Logo.jsx'
// import { useAppContext } from '../../context/AppContext.jsx'

// const LINKS = ['Product', 'Capabilities', 'Models', 'Pricing', 'Resources']

// export default function Navbar() {
//   const { navigate } = useAppContext()
//   const { user } = useUser()
//   const { openUserProfile, signOut } = useClerk()

//   const [scrolled, setScrolled] = useState(false)
//   const [open, setOpen] = useState(false)
//   const [menuOpen, setMenuOpen] = useState(false)
//   const menuRef = useRef(null)

//   // Scroll listener for glassmorphism navbar background
//   useEffect(() => {
//     const onScroll = () => setScrolled(window.scrollY > 24)
//     onScroll()
//     window.addEventListener('scroll', onScroll, { passive: true })
//     return () => window.removeEventListener('scroll', onScroll)
//   }, [])

//   // Lock body scroll when mobile drawer is open
//   useEffect(() => {
//     document.body.style.overflow = open ? 'hidden' : ''
//   }, [open])

//   // Close custom profile dropdown when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (e) => {
//       if (menuRef.current && !menuRef.current.contains(e.target)) {
//         setMenuOpen(false)
//       }
//     }
//     document.addEventListener('mousedown', handleClickOutside)
//     return () => document.removeEventListener('mousedown', handleClickOutside)
//   }, [])

//   return (
//     <>
//       <motion.header
//         initial={{ y: -40, opacity: 0 }}
//         animate={{ y: 0, opacity: 1 }}
//         transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
//         className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-4 sm:pt-5"
//       >
//         <div
//           className={`w-full max-w-6xl flex items-center justify-between rounded-full px-4 sm:px-6 py-3 transition-all duration-500 ${scrolled ? 'glass-panel shadow-glass' : 'bg-transparent border border-transparent'
//             }`}
//         >
//           <a href="#top" data-cursor="link" className="flex items-center gap-2.5 group">
//             <Logo size={26} />
//             <span className="font-['Instrument_Serif'] text-[21px] tracking-wide text-white whitespace-nowrap italic">
//               Sentio <span className="not-italic font-sans text-xs tracking-widest uppercase font-semibold text-sky-400 ml-1">AI</span>
//             </span>
//           </a>

//           <nav className="hidden md:flex items-center gap-9">
//             {LINKS.map((l) => (
//               <a
//                 key={l}
//                 href={`#${l.toLowerCase()}`}
//                 data-cursor="link"
//                 className="text-[13.5px] text-silver-400/80 hover:text-white transition-colors duration-300"
//               >
//                 {l}
//               </a>
//             ))}
//           </nav>

//           {/* Desktop Auth Section */}
//           <div className="hidden md:flex items-center gap-3">
//             <SignedOut>
//               <SignInButton mode="modal">
//                 <button
//                   type="button"
//                   className="text-[13.5px] text-silver-400/80 hover:text-white transition-colors duration-300 px-2"
//                 >
//                   Sign In
//                 </button>
//               </SignInButton>
//               <a
//                 href="#pricing"
//                 className="shine-sweep relative text-[13.5px] font-medium text-obsidian-950 bg-silver-200 hover:bg-white transition-colors duration-300 rounded-full px-5 py-2.5"
//               >
//                 Get Started
//               </a>
//             </SignedOut>

//             <SignedIn>
//               {/* Desktop Profile Dropdown */}
//               <div className="relative" ref={menuRef}>
//                 <button
//                   type="button"
//                   onClick={() => setMenuOpen((prev) => !prev)}
//                   className="flex items-center gap-2 p-1 rounded-full border border-white/10 hover:border-white/25 bg-white/[0.03] transition-all"
//                 >
//                   <img
//                     src={user?.imageUrl}
//                     alt={user?.fullName || 'Profile'}
//                     className="w-7 h-7 rounded-full object-cover shadow-theme-glow-lg"
//                   />
//                 </button>

//                 <AnimatePresence>
//                   {menuOpen && (
//                     <motion.div
//                       initial={{ opacity: 0, y: 10, scale: 0.95 }}
//                       animate={{ opacity: 1, y: 0, scale: 1 }}
//                       exit={{ opacity: 0, y: 8, scale: 0.95 }}
//                       transition={{ duration: 0.18 }}
//                       className="absolute right-0 mt-2.5 w-60 rounded-2xl bg-obsidian-950/95 border border-white/10 shadow-[0_12px_40px_rgba(0,0,0,0.8)] backdrop-blur-xl p-2 z-50 flex flex-col gap-1"
//                     >
//                       <div className="px-3 py-2 border-b border-white/[0.08] mb-1">
//                         <p className="text-xs font-semibold text-white truncate">{user?.fullName}</p>
//                         <p className="text-[11px] text-silver-400 truncate">{user?.primaryEmailAddress?.emailAddress}</p>
//                       </div>

//                       <button
//                         type="button"
//                         onClick={() => navigate?.('/workspace')}
//                         className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-silver-300 hover:text-white hover:bg-white/[0.06] rounded-xl transition-colors text-left"
//                       >
//                         <ComputerIcon size={15} className="text-silver-400" />
//                         Workspace
//                       </button>

//                       <button
//                         type="button"
//                         onClick={() => {
//                           setMenuOpen(false)
//                           openUserProfile()
//                         }}
//                         className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-silver-300 hover:text-white hover:bg-white/[0.06] rounded-xl transition-colors text-left"
//                       >
//                         <User size={15} className="text-silver-400" />
//                         Manage Profile
//                       </button>

//                       <button
//                         type="button"
//                         onClick={() => {
//                           setMenuOpen(false)
//                           signOut({ redirectUrl: '/' })
//                         }}
//                         className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-rose-400 hover:text-rose-300 hover:bg-rose-500/[0.08] rounded-xl transition-colors text-left"
//                       >
//                         <LogOut size={15} />
//                         Sign Out
//                       </button>
//                     </motion.div>
//                   )}
//                 </AnimatePresence>
//               </div>
//             </SignedIn>
//           </div>

//           {/* Mobile Hamburger */}
//           <button
//             className="md:hidden text-silver-200 p-1 rounded-lg hover:bg-white/5 transition-colors"
//             onClick={() => setOpen(true)}
//             aria-label="Open menu"
//           >
//             {user ? <>
//               <button
//                 type="button"
//                 onClick={() => setMenuOpen((prev) => !prev)}
//                 className="flex items-center gap-2 p-1 rounded-full border border-white/10 hover:border-white/25 bg-white/[0.03] transition-all"
//               >
//                 <img
//                   src={user?.imageUrl}
//                   alt={user?.fullName || 'Profile'}
//                   className="w-7 h-7 rounded-full object-cover shadow-theme-glow-lg"
//                 />
//               </button>
//             </> : <Menu size={22} />}
//           </button>
//         </div>
//       </motion.header>

//       {/* Mobile Drawer */}
//       <AnimatePresence>
//         {open && (
//           <div className="fixed inset-0 z-[60] md:hidden">
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               transition={{ duration: 0.3, ease: 'easeInOut' }}
//               onClick={() => {
//                 setOpen(false)
//                 setMenuOpen(false)
//               }}
//               className="absolute inset-0 bg-obsidian-950/70 backdrop-blur-md"
//             />

//             <motion.div
//               initial={{ x: '-100%' }}
//               animate={{ x: 0 }}
//               exit={{ x: '-100%' }}
//               transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
//               className="relative h-[100dvh] w-[86vw] max-w-[340px] bg-obsidian-950/95 border-r border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.8)] flex flex-col justify-between overflow-hidden"
//             >
//               {/* Top Navigation */}
//               <div className="flex-1 overflow-y-auto px-6 pt-6 pb-4">
//                 <div className="flex items-center justify-between pb-6 border-b border-white/[0.08]">
//                   <div className="flex items-center gap-3">
//                     <Logo size={24} />
//                     <span className="font-ui text-[14px] tracking-[0.16em] text-silver-200 uppercase font-medium">
//                       Sentio <span className="text-white/40 font-light">AI</span>
//                     </span>
//                   </div>
//                   <button
//                     className="text-silver-300 p-2 rounded-xl bg-white/[0.03] border border-white/[0.05] hover:bg-white/10 active:scale-95 transition-all"
//                     onClick={() => {
//                       setOpen(false)
//                       setMenuOpen(false)
//                     }}
//                     aria-label="Close menu"
//                   >
//                     <X size={20} />
//                   </button>
//                 </div>

//                 <nav className="flex flex-col gap-2 pt-6">
//                   {LINKS.map((l, i) => (
//                     <motion.a
//                       key={l}
//                       href={`#${l.toLowerCase()}`}
//                       onClick={() => {
//                         setOpen(false)
//                         setMenuOpen(false)
//                       }}
//                       initial={{ opacity: 0, x: -16 }}
//                       animate={{ opacity: 1, x: 0 }}
//                       transition={{ delay: 0.05 * i + 0.1, duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
//                       className="font-display text-xl tracking-tight text-silver-400 hover:text-white hover:bg-white/[0.04] px-3 py-2.5 rounded-xl transition-all duration-200"
//                     >
//                       {l}
//                     </motion.a>
//                   ))}
//                 </nav>
//               </div>

//               {/* Bottom Mobile Drawer Actions */}
//               <motion.div
//                 initial={{ opacity: 0, y: 16 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 0.35, duration: 0.4 }}
//                 className="relative px-5 pt-4 pb-[calc(env(safe-area-inset-bottom)+1.25rem)] border-t border-white/[0.08] bg-gradient-to-b from-obsidian-950/60 to-obsidian-950 flex flex-col gap-3 shrink-0"
//               >
//                 <SignedOut>
//                   <a
//                     href="#pricing"
//                     onClick={() => setOpen(false)}
//                     className="w-full text-center rounded-xl bg-white text-obsidian-950 py-3 text-sm font-semibold tracking-wide shadow-md active:scale-[0.98] transition-all"
//                   >
//                     Get Started
//                   </a>

//                   <SignInButton mode="modal">
//                     <button
//                       type="button"
//                       onClick={() => setOpen(false)}
//                       className="w-full text-center text-xs tracking-wider uppercase font-medium text-silver-400 hover:text-silver-200 py-2.5 rounded-xl border border-white/[0.06] hover:bg-white/[0.04] transition-all"
//                     >
//                       Sign In
//                     </button>
//                   </SignInButton>
//                 </SignedOut>

//                 <SignedIn>
//                   {/* Expandable Mobile Account Dropdown */}
//                   <AnimatePresence>
//                     {menuOpen && (
//                       <motion.div
//                         initial={{ opacity: 0, height: 0 }}
//                         animate={{ opacity: 1, height: 'auto' }}
//                         exit={{ opacity: 0, height: 0 }}
//                         transition={{ duration: 0.25, ease: 'easeInOut' }}
//                         className="overflow-hidden flex flex-col gap-1 rounded-2xl bg-white/[0.04] border border-white/[0.08] p-2"
//                       >
//                         <button
//                           type="button"
//                           onClick={async () => {
//                             setOpen(false)
//                             setMenuOpen(false)
//                             await openUserProfile()
//                           }}
//                           className="flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-silver-200 hover:text-white hover:bg-white/[0.06] rounded-xl transition-colors text-left"
//                         >
//                           <User size={15} className="text-silver-400" />
//                           Manage Account & Profile
//                         </button>
//                         <button
//                           type="button"
//                           onClick={async () => {
//                             setOpen(false)
//                             setMenuOpen(false)
//                             await signOut({ redirectUrl: '/' })
//                           }}
//                           className="flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-rose-400 hover:text-rose-300 hover:bg-rose-500/[0.08] rounded-xl transition-colors text-left"
//                         >
//                           <LogOut size={15} />
//                           Sign Out
//                         </button>
//                       </motion.div>
//                     )}
//                   </AnimatePresence>

//                   {/* Mobile Account Bar & Workspace Link */}
//                   <div className="flex items-center justify-between p-2 rounded-2xl bg-white/[0.03] border border-white/[0.08]">
//                     <button
//                       type="button"
//                       onClick={async () => {
//                         setOpen(false)
//                         await navigate?.('/workspace')
//                       }}
//                       className="flex items-center gap-2 text-sm font-medium text-silver-200 hover:text-white transition-colors pl-2"
//                     >
//                       <span>Workspace</span>
//                       <span className="text-white/40 text-xs">→</span>
//                     </button>

//                     <button
//                       type="button"
//                       onClick={() => setMenuOpen((prev) => !prev)}
//                       className="flex items-center gap-1.5 p-1 rounded-xl hover:bg-white/[0.05] border border-white/[0.06] transition-colors"
//                     >
//                       <img
//                         src={user?.imageUrl}
//                         alt="Profile"
//                         className="w-7 h-7 rounded-full object-cover ring-1 ring-white/20"
//                       />
//                       {menuOpen ? (
//                         <ChevronDown size={14} className="text-silver-400" />
//                       ) : (
//                         <ChevronUp size={14} className="text-silver-400" />
//                       )}
//                     </button>
//                   </div>
//                 </SignedIn>
//               </motion.div>
//             </motion.div>
//           </div>
//         )}
//       </AnimatePresence>
//     </>
//   )
// }



import { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, User, LogOut, ComputerIcon } from 'lucide-react'
import { SignedIn, SignedOut, SignInButton, useUser, useClerk } from "@clerk/clerk-react"
import Logo from './Logo.jsx'
import { useAppContext } from '../../context/AppContext.jsx'

const LINKS = ['Product', 'Capabilities', 'Models', 'Pricing', 'Resources']

export default function Navbar() {
  const context = useAppContext?.() || {}
  const navigate = context.navigate
  const { user } = useUser()
  const { openUserProfile, signOut } = useClerk()

  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef(null)

  // Scroll listener for glassmorphism navbar background
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  // Close desktop profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleNavigate = (path) => {
    setOpen(false)
    setMenuOpen(false)
    if (typeof navigate === 'function') {
      navigate(path)
    } else {
      window.location.href = path
    }
  }

  const handleSignOut = () => {
    setOpen(false)
    setMenuOpen(false)
    signOut({ redirectUrl: '/' })
  }

  const handleOpenProfile = () => {
    setOpen(false)
    setMenuOpen(false)
    openUserProfile()
  }

  return (
    <>
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
        className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-4 sm:pt-5"
      >
        <div
          className={`w-full max-w-6xl flex items-center justify-between rounded-full px-4 sm:px-6 py-3 transition-all duration-500 ${scrolled ? 'glass-panel shadow-glass' : 'bg-transparent border border-transparent'
            }`}
        >
          <a href="#top" data-cursor="link" className="flex items-center gap-2.5 group">
            <Logo size={26} />
            <span className="font-['Instrument_Serif'] text-[21px] tracking-wide text-white whitespace-nowrap italic">
              Sentio <span className="not-italic font-sans text-xs tracking-widest uppercase font-semibold text-sky-400 ml-1">AI</span>
            </span>
          </a>

          <nav className="hidden md:flex items-center gap-9">
            {LINKS.map((l) => (
              <a
                key={l}
                href={`#${l.toLowerCase()}`}
                data-cursor="link"
                className="text-[13.5px] text-silver-400/80 hover:text-white transition-colors duration-300"
              >
                {l}
              </a>
            ))}
          </nav>

          {/* Desktop Auth Section */}
          <div className="hidden md:flex items-center gap-3">
            <SignedOut>
              <SignInButton mode="modal">
                <button
                  type="button"
                  className="text-[13.5px] text-silver-400/80 hover:text-white transition-colors duration-300 px-2"
                >
                  Sign In
                </button>
              </SignInButton>
              <a
                href="#pricing"
                className="shine-sweep relative text-[13.5px] font-medium text-obsidian-950 bg-silver-200 hover:bg-white transition-colors duration-300 rounded-full px-5 py-2.5"
              >
                Get Started
              </a>
            </SignedOut>

            <SignedIn>
              {/* Desktop Profile Dropdown */}
              <div className="relative" ref={menuRef}>
                <button
                  type="button"
                  onClick={() => setMenuOpen((prev) => !prev)}
                  className="flex items-center gap-2 p-1 rounded-full border border-white/10 hover:border-white/25 bg-white/[0.03] transition-all"
                >
                  <img
                    src={user?.imageUrl}
                    alt={user?.fullName || 'Profile'}
                    className="w-7 h-7 rounded-full object-cover shadow-theme-glow-lg"
                  />
                </button>

                <AnimatePresence>
                  {menuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.95 }}
                      transition={{ duration: 0.18 }}
                      className="absolute right-0 mt-2.5 w-60 rounded-2xl bg-obsidian-950/95 border border-white/10 shadow-[0_12px_40px_rgba(0,0,0,0.8)] backdrop-blur-xl p-2 z-50 flex flex-col gap-1"
                    >
                      <div className="px-3 py-2 border-b border-white/[0.08] mb-1">
                        <p className="text-xs font-semibold text-white truncate">{user?.fullName}</p>
                        <p className="text-[11px] text-silver-400 truncate">{user?.primaryEmailAddress?.emailAddress}</p>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleNavigate('/workspace')}
                        className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-silver-300 hover:text-white hover:bg-white/[0.06] rounded-xl transition-colors text-left"
                      >
                        <ComputerIcon size={15} className="text-silver-400" />
                        Workspace
                      </button>

                      <button
                        type="button"
                        onClick={handleOpenProfile}
                        className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-silver-300 hover:text-white hover:bg-white/[0.06] rounded-xl transition-colors text-left"
                      >
                        <User size={15} className="text-silver-400" />
                        Manage Profile
                      </button>

                      <button
                        type="button"
                        onClick={handleSignOut}
                        className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-rose-400 hover:text-rose-300 hover:bg-rose-500/[0.08] rounded-xl transition-colors text-left"
                      >
                        <LogOut size={15} />
                        Sign Out
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </SignedIn>
          </div>

          {/* Mobile Header Trigger */}
          <div className="md:hidden flex items-center">
            {user ? (
              <button
                type="button"
                onClick={() => setOpen(true)}
                className="flex items-center gap-2 p-1 rounded-full border border-white/10 hover:border-white/25 bg-white/[0.03] transition-all"
                aria-label="Open profile drawer"
              >
                <img
                  src={user?.imageUrl}
                  alt={user?.fullName || 'Profile'}
                  className="w-7 h-7 rounded-full object-cover shadow-theme-glow-lg"
                />
              </button>
            ) : (
              <button
                type="button"
                className="text-silver-200 p-1 rounded-lg hover:bg-white/5 transition-colors"
                onClick={() => setOpen(true)}
                aria-label="Open menu"
              >
                <Menu size={22} />
              </button>
            )}
          </div>
        </div>
      </motion.header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 z-[60] md:hidden">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              onClick={() => setOpen(false)}
              className="absolute inset-0 bg-obsidian-950/70 backdrop-blur-md"
            />

            {/* Sidebar Drawer Container */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-10 h-[100dvh] w-[86vw] max-w-[340px] bg-obsidian-950 border-r border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.8)] flex flex-col justify-between overflow-hidden"
            >
              {/* Top Section */}
              <div className="flex-1 overflow-y-auto px-6 pt-6 pb-4">
                <div className="flex items-center justify-between pb-6 border-b border-white/[0.08]">
                  <div className="flex items-center gap-3">
                    <Logo size={24} />
                    <span className="font-ui text-[14px] tracking-[0.16em] text-silver-200 uppercase font-medium">
                      Sentio <span className="text-white/40 font-light">AI</span>
                    </span>
                  </div>
                  <button
                    className="text-silver-300 p-2 rounded-xl bg-white/[0.03] border border-white/[0.05] hover:bg-white/10 active:scale-95 transition-all"
                    onClick={() => setOpen(false)}
                    aria-label="Close menu"
                  >
                    <X size={20} />
                  </button>
                </div>

                <nav className="flex flex-col gap-2 pt-6">
                  {LINKS.map((l, i) => (
                    <motion.a
                      key={l}
                      href={`#${l.toLowerCase()}`}
                      onClick={() => setOpen(false)}
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 * i + 0.1, duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      className="font-display text-xl tracking-tight text-silver-400 hover:text-white hover:bg-white/[0.04] px-3 py-2.5 rounded-xl transition-all duration-200"
                    >
                      {l}
                    </motion.a>
                  ))}
                </nav>
              </div>

              {/* Bottom Actions Section */}
              <div className="relative px-5 pt-4 pb-[calc(env(safe-area-inset-bottom)+1.25rem)] border-t border-white/[0.08] bg-obsidian-950 flex flex-col gap-3 shrink-0">
                <SignedOut>
                  <a
                    href="#pricing"
                    onClick={() => setOpen(false)}
                    className="w-full text-center rounded-xl bg-white text-obsidian-950 py-3 text-sm font-semibold tracking-wide shadow-md active:scale-[0.98] transition-all"
                  >
                    Get Started
                  </a>

                  <SignInButton mode="modal">
                    <button
                      type="button"
                      onClick={() => setOpen(false)}
                      className="w-full text-center text-xs tracking-wider uppercase font-medium text-silver-400 hover:text-silver-200 py-2.5 rounded-xl border border-white/[0.06] hover:bg-white/[0.04] transition-all"
                    >
                      Sign In
                    </button>
                  </SignInButton>
                </SignedOut>

                <SignedIn>
                  {/* User Profile Header Card */}
                  <div className="flex items-center gap-3 p-2.5 rounded-2xl bg-white/[0.03] border border-white/[0.08]">
                    <img
                      src={user?.imageUrl}
                      alt="Profile"
                      className="w-8 h-8 rounded-full object-cover ring-1 ring-white/20 shrink-0"
                    />
                    <div className="flex flex-col min-w-0">
                      <span className="text-xs font-semibold text-white truncate">{user?.fullName}</span>
                      <span className="text-[11px] text-silver-400 truncate">{user?.primaryEmailAddress?.emailAddress}</span>
                    </div>
                  </div>

                  {/* Navigation Links Directly Accessible */}
                  <div className="flex flex-col gap-1">
                    <button
                      type="button"
                      onClick={() => handleNavigate('/workspace')}
                      className="w-full flex items-center justify-between px-3 py-2 text-xs font-medium text-silver-200 hover:text-white hover:bg-white/[0.06] rounded-xl transition-colors"
                    >
                      <div className="flex items-center gap-2.5">
                        <ComputerIcon size={15} className="text-silver-400" />
                        <span>Workspace</span>
                      </div>
                      <span className="text-white/40 text-xs">→</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleOpenProfile}
                      className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-silver-200 hover:text-white hover:bg-white/[0.06] rounded-xl transition-colors text-left"
                    >
                      <User size={15} className="text-silver-400" />
                      <span>Manage Profile</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleSignOut}
                      className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-rose-400 hover:text-rose-300 hover:bg-rose-500/[0.08] rounded-xl transition-colors text-left"
                    >
                      <LogOut size={15} />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </SignedIn>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  )
}