// import { Link } from 'react-router-dom';
// import { motion, useScroll, useTransform } from 'framer-motion';
// import clsx from 'clsx';
// import { useEffect, useState } from 'react';

// const Navbar = () => {
//   const [isDark, setIsDark] = useState(false);

//   useEffect(() => {
//     const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
//     setIsDark(mediaQuery.matches);
//     const handler = (e) => setIsDark(e.matches);
//     mediaQuery.addEventListener('change', handler);
//     return () => mediaQuery.removeEventListener('change', handler);
//   }, []);

//   const { scrollYProgress } = useScroll();
//   const navScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);

//   return (
//     <motion.nav
//       style={{ scale: navScale }}
//       className={clsx(
//         'glass fixed top-4 left-1/2 transform -translate-x-1/2 z-50 mx-4 transition-all duration-300',
//         { 'dark': isDark }
//       )}
//       initial={{ y: -50 }}
//       animate={{ y: 0 }}
//     >
//       <div className="glass-inner flex justify-between items-center p-4">
//         <Link to="/" className="text-2xl font-bold text-[var(--text-primary)]">
//           Findly
//         </Link>
//         <div className="space-x-4">
//           <Link to="/post" className="text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors">
//             Post Item
//           </Link>
//           <Link to="/view" className="text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors">
//             View Items
//           </Link>
//         </div>
//       </div>
//     </motion.nav>
//   );
// };

// export default Navbar;

// import { Link, NavLink } from 'react-router-dom'
// import { motion, useScroll, useTransform } from 'framer-motion'
// import { useEffect, useState } from 'react'
// import clsx from 'clsx'

// const NavItem = ({ to, children, onClick }) => (
//   <NavLink
//     to={to}
//     onClick={onClick}
//     className={({ isActive }) =>
//       clsx(
//         'px-3 py-2 rounded-lg transition-colors',
//         'text-[var(--text-secondary)] hover:text-[var(--accent)]',
//         isActive && 'text-[var(--accent)]'
//       )
//     }
//   >
//     {children}
//   </NavLink>
// )

// const Navbar = () => {
//   const [isDark, setIsDark] = useState(false)
//   const [open, setOpen] = useState(false)

//   useEffect(() => {
//     const mq = window.matchMedia('(prefers-color-scheme: dark)')
//     setIsDark(mq.matches)
//     const handler = (e) => setIsDark(e.matches)
//     mq.addEventListener('change', handler)
//     return () => mq.removeEventListener('change', handler)
//   }, [])

//   // close menu on route change via click
//   const close = () => setOpen(false)

//   const { scrollYProgress } = useScroll()
//   const navScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.92])

//   return (
//     <motion.nav
//       style={{ scale: navScale }}
//       className={clsx(
//         'fixed top-4 left-1/2 -translate-x-1/2 z-[100] w-[min(92%,1100px)]',
//         { dark: isDark }
//       )}
//       initial={{ y: -50, opacity: 0 }}
//       animate={{ y: 0, opacity: 1 }}
//       transition={{ duration: 0.35 }}
//     >
//       {/* Shell */}
//       <div className="glass glass-inner px-4 md:px-6 py-3">
//         <div className="flex items-center justify-between gap-3 relative z-10">
//           {/* Brand */}
//           <Link
//             to="/"
//             className="text-2xl font-bold text-[var(--text-primary)] select-none"
//             onClick={close}
//           >
//             Findly
//           </Link>

//           {/* Desktop links */}
//           <div className="hidden md:flex items-center gap-1">
//             <NavItem to="/post">Post Item</NavItem>
//             <NavItem to="/view">View Items</NavItem>
//           </div>

//           {/* Mobile toggle */}
//           <button
//             type="button"
//             className="md:hidden inline-flex items-center justify-center rounded-xl px-3 py-2 text-[var(--text-primary)] hover:bg-[var(--glass-bg)] border border-[var(--glass-border)]"
//             aria-label="Toggle navigation menu"
//             aria-expanded={open}
//             onClick={() => setOpen((v) => !v)}
//           >
//             {/* simple hamburger */}
//             <span className="sr-only">Menu</span>
//             <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
//               <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
//             </svg>
//           </button>
//         </div>

//         {/* Mobile menu panel */}
//         <motion.div
//           initial={false}
//           animate={{ height: open ? 'auto' : 0, opacity: open ? 1 : 0 }}
//           transition={{ duration: 0.2 }}
//           className="md:hidden overflow-hidden"
//         >
//           <div className="pt-2 pb-1 flex flex-col">
//             <NavItem to="/post" onClick={close}>Post Item</NavItem>
//             <NavItem to="/view" onClick={close}>View Items</NavItem>
//           </div>
//         </motion.div>
//       </div>
//     </motion.nav>
//   )
// }

// export default Navbar

// import { Link, NavLink } from 'react-router-dom'
// import { useEffect, useState } from 'react'
// import clsx from 'clsx'

// const NavItem = ({ to, children, onClick }) => (
//   <NavLink
//     to={to}
//     onClick={onClick}
//     className={({ isActive }) =>
//       clsx(
//         // Big, comfy tap targets
//         'px-4 py-2 rounded-xl text-base',
//         // Colors
//         'text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors',
//         // Active state
//         isActive && 'text-[var(--accent)] font-semibold'
//       )
//     }
//   >
//     {children}
//   </NavLink>
// )

// const Navbar = () => {
//   const [isDark, setIsDark] = useState(false)
//   const [open, setOpen] = useState(false)

//   useEffect(() => {
//     const mq = window.matchMedia('(prefers-color-scheme: dark)')
//     setIsDark(mq.matches)
//     const handler = (e) => setIsDark(e.matches)
//     mq.addEventListener('change', handler)
//     return () => mq.removeEventListener('change', handler)
//   }, [])

//   const close = () => setOpen(false)

//   return (
//     <nav
//       className={clsx(
//         // Full-width bar, pinned to top, very high z-index
//         'fixed inset-x-0 top-3 z-[300] px-3',
//         { dark: isDark }
//       )}
//       role="navigation"
//       aria-label="Primary"
//     >
//       <div className="mx-auto w-[min(96%,1100px)]">
//         {/* Glass pill */}
//         <div className="glass glass-inner rounded-2xl overflow-hidden">
//           <div className="relative z-10 flex items-center justify-between gap-3 px-4 md:px-6 py-3">
//             {/* Brand */}
//             <Link
//               to="/"
//               className="text-2xl font-bold text-[var(--text-primary)] select-none"
//               onClick={close}
//             >
//               Findly
//             </Link>

//             {/* Desktop links */}
//             <div className="hidden md:flex items-center gap-1">
//               <NavItem to="/post">Post Item</NavItem>
//               <NavItem to="/view">View Items</NavItem>
//             </div>

//             {/* Mobile hamburger */}
//             <button
//               type="button"
//               className="md:hidden inline-flex items-center justify-center rounded-xl px-3 py-2 text-[var(--text-primary)] hover:bg-[var(--glass-bg)] border border-[var(--glass-border)]"
//               aria-label="Toggle menu"
//               aria-expanded={open}
//               onClick={() => setOpen(v => !v)}
//             >
//               <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
//                 <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
//               </svg>
//             </button>
//           </div>

//           {/* Mobile panel */}
//           <div
//             className={clsx(
//               'md:hidden',
//               open ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0',
//               'transition-[max-height,opacity] duration-200 overflow-hidden'
//             )}
//           >
//             <div className="px-4 pb-3 flex flex-col">
//               <NavItem to="/post" onClick={close}>Post Item</NavItem>
//               <NavItem to="/view" onClick={close}>View Items</NavItem>
//             </div>
//           </div>
//         </div>
//       </div>
//     </nav>
//   )
// }

// export default Navbar

import { Link, NavLink } from 'react-router-dom'
import { useEffect, useState } from 'react'
import clsx from 'clsx'
import { useRole } from '../context/RoleContext'

const NavItem = ({ to, children }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      clsx(
        'px-4 py-2 rounded-xl text-base',
        'text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors',
        isActive && 'text-[var(--accent)] font-semibold'
      )
    }
  >
    {children}
  </NavLink>
)

export default function Navbar() {
  const [isDark, setIsDark] = useState(false)
  const { role, setRole } = useRole()

  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    setIsDark(mq.matches)
    const handler = (e) => setIsDark(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  return (
    <nav className={clsx('fixed inset-x-0 top-3 z-[300] px-3', { dark: isDark })} role="navigation" aria-label="Primary">
      <div className="mx-auto w-[min(96%,1100px)]">
        <div className="glass glass-inner rounded-2xl overflow-hidden">
          <div className="relative z-10 flex items-center justify-between gap-3 px-4 md:px-6 py-3">
            <Link to="/" className="text-2xl font-bold text-[var(--text-primary)] select-none">Findly</Link>

            <div className="hidden md:flex items-center gap-1">
              <NavItem to="/view">View Items</NavItem>
              {role === 'poster' && <NavItem to="/post">Post Item</NavItem>}
              {role === 'poster' && <NavItem to="/claims">Claims</NavItem>}
            </div>

            {/* Role badge / switch */}
            <div className="flex items-center gap-2">
              <span className="glass px-3 py-1 rounded-xl text-sm">
                Role: <strong>{role}</strong>
              </span>
              <Link to="/role" className="hidden md:inline text-[var(--text-secondary)] hover:text-[var(--accent)] px-3 py-2 rounded-xl">
                Change
              </Link>
            </div>
          </div>

          {/* Mobile row for role + links */}
          <div className="md:hidden px-4 pb-3 flex flex-wrap items-center gap-2">
            <NavItem to="/view">View Items</NavItem>
            {role === 'poster' && <NavItem to="/post">Post Item</NavItem>}
            {role === 'poster' && <NavItem to="/claims">Claims</NavItem>}
            <Link to="/role" className="ml-auto text-[var(--text-secondary)] hover:text-[var(--accent)] px-3 py-2 rounded-xl">Change role</Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

