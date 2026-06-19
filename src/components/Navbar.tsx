import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const links = [
    { label: "servicios", id: "servicios" },
    { label: "metodología", id: "metodologia" },
    { label: "resultados", id: "resultados" },
    { label: "contacto", id: "contacto" }
  ];

  const scrollTo = (id: string) => {
    setIsOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 py-6 md:py-10 bg-gradient-to-b from-[#f1f1f1]/80 to-transparent backdrop-blur-[2px]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-12 items-center w-full">
          {/* Left: Cols 1-3 */}
          <div className="col-span-6 md:col-span-3 flex items-center gap-2">
            <svg viewBox="0 0 24 24" className="w-7 h-7" fill="#1a1a1a" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2a4 4 0 0 1 4 4v1a4 4 0 0 1-4 4 4 4 0 0 1-4-4V6a4 4 0 0 1 4-4zm0 20a4 4 0 0 1-4-4v-1a4 4 0 0 1 4-4 4 4 0 0 1 4 4v1a4 4 0 0 1-4 4zm-10-10a4 4 0 0 1 4-4h1a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6a4 4 0 0 1-4-4zm20 0a4 4 0 0 1-4 4h-1a4 4 0 0 1-4-4 4 4 0 0 1 4-4h1a4 4 0 0 1 4 4z" />
            </svg>
            <span className="font-display text-2xl font-bold tracking-tight text-[#1a1a1a] flex flex-col leading-none">
              <span className="text-xl font-black">garcia</span>
              <span className="text-[10px] uppercase tracking-widest text-zinc-500">integrum</span>
            </span>
          </div>

          {/* Center: Cols 4-9 (Desktop only) */}
          <div className="hidden md:flex md:col-span-6 justify-center items-center gap-8">
            {links.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className="text-xs font-sans tracking-wide text-zinc-600 hover:text-black transition-colors lowercase cursor-pointer"
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Right: Cols 10-12 (Col 7-12 on mobile for alignment) */}
          <div className="col-span-6 md:col-span-3 flex items-center justify-end gap-6">
            <button
              onClick={() => scrollTo('contacto')}
              className="hidden sm:inline-block text-xs font-sans tracking-wide text-zinc-600 hover:text-black transition-colors lowercase cursor-pointer"
            >
              solicitar propuesta
            </button>
            
            <button
              onClick={() => scrollTo('contacto')}
              className="bg-[#1a1a1a] text-white text-xs font-sans font-medium px-4 py-2 rounded-full hover:bg-black transition-all flex items-center gap-1.5 shadow-sm cursor-pointer"
            >
              comenzar <span className="text-sm">→</span>
            </button>

            {/* Mobile Hamburger Toggle Icon */}
            <button
              onClick={toggleMenu}
              className="md:hidden flex flex-col justify-center items-center w-8 h-8 gap-1.5 focus:outline-none z-50 relative"
              aria-label="Toggle Menu"
            >
              <motion.span
                animate={isOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.2 }}
                className="w-6 h-[2px] bg-[#1a1a1a] block rounded-sm"
              />
              <motion.span
                animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
                transition={{ duration: 0.15 }}
                className="w-6 h-[2px] bg-[#1a1a1a] block rounded-sm"
              />
              <motion.span
                animate={isOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.2 }}
                className="w-6 h-[2px] bg-[#1a1a1a] block rounded-sm"
              />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer sliding down */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 150 }}
            className="fixed top-0 left-0 w-full h-[60vh] bg-white/95 backdrop-blur-md z-40 pt-28 pb-8 px-6 flex flex-col justify-between shadow-xl border-b border-black/[0.05] md:hidden"
          >
            <div className="flex flex-col gap-6">
              {links.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollTo(link.id)}
                  className="text-left text-lg font-sans tracking-wide text-zinc-800 hover:text-black transition-colors lowercase cursor-pointer"
                >
                  {link.label}
                </button>
              ))}
            </div>
            
            <div className="flex flex-col gap-4 border-t border-zinc-100 pt-6">
              <button
                onClick={() => scrollTo('contacto')}
                className="text-left text-sm font-sans tracking-wide text-zinc-600 hover:text-black transition-colors lowercase cursor-pointer"
              >
                solicitar propuesta
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
