import { motion } from "motion/react";

export default function Hero() {
  const scrollToContact = () => {
    document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-[110vh] sm:min-h-[140vh] w-full flex flex-col items-center justify-start overflow-hidden bg-bg-base">
      
      {/* Background Video Container */}
      <div className="absolute top-[15vh] sm:top-[20vh] left-0 w-full h-[95vh] sm:h-[120vh] z-0 pointer-events-none">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-100"
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260603_132049_036591b8-6e92-4760-b94c-a7ea6eef315c.mp4"
        />
        {/* Gradient Mask */}
        <div className="absolute top-0 left-0 w-full h-24 sm:h-32 bg-gradient-to-b from-bg-base to-transparent"></div>
      </div>

      {/* Hero Content Alignment */}
      <div className="max-w-7xl w-full mx-auto px-8 md:px-16 lg:px-20 relative z-10 grid grid-cols-12 gap-x-4 md:gap-x-8 pt-[22vh] sm:pt-[28vh]">
        <div className="col-span-12 md:col-span-10 md:col-start-2 flex flex-col items-start">
          
          {/* Hero Header */}
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-bold font-display leading-[1.15] sm:leading-[1.1] tracking-tight text-left"
          >
            <span className="text-[#1a1a1a] block">Garcia Integrum ofrece</span>
            <span className="text-[#8e8e8e]">auditoría, datos</span>
            <br />
            <span className="text-[#8e8e8e]">y tecnología para transformar</span>
            <br />
            <span className="text-[#8e8e8e] flex flex-wrap items-center gap-x-2 md:gap-x-3 gap-y-1">
              tu
              <span className="w-[36px] sm:w-[50px] md:w-[62px] h-[20px] sm:h-[28px] md:h-[36px] border-[2px] border-[#1a1a1a] rounded-full inline-flex items-center justify-center self-center bg-white/50">
                <span className="w-2 h-2 rounded-full bg-black"></span>
              </span>
              empresa.
            </span>
          </motion.h1>

          {/* Search Pill Component */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="mt-10 sm:mt-12 w-full max-w-lg"
          >
            <div className="bg-white rounded-[6px] border border-black/[0.05] p-1 pl-4 flex items-center shadow-sm focus-within:border-black/20 transition-all">
              <input
                type="text"
                placeholder="Pregúntanos lo que sea sobre tu negocio..."
                className="w-full bg-transparent border-none outline-none py-2 text-sm text-[#1a1a1a] placeholder-zinc-400"
              />
              <button
                onClick={scrollToContact}
                className="bg-[#1a1a1a] hover:bg-black text-white w-9 h-9 rounded-full relative flex items-center justify-center transition-colors shrink-0 cursor-pointer"
                aria-label="Enviar consulta"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2.5}
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </button>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Architectural Edge Anchors */}
      {/* Absolute middle right edge: language switching */}
      <div className="absolute right-6 top-[50%] -translate-y-[50%] z-20">
        <button className="bg-white/80 backdrop-blur-md border border-black/[0.08] text-xs font-semibold px-4 py-2.5 rounded-full text-[#1a1a1a] shadow-md flex items-center gap-2 hover:bg-white hover:scale-105 transition-all cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-4 h-4 text-zinc-700"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-.883.128-1.735.366-2.54" />
          </svg>
          <span className="tracking-wide">idioma: es / en</span>
        </button>
      </div>

      {/* Absolute bottom left corner */}
      <div className="absolute bottom-24 left-8 sm:left-12 z-20">
        <span className="text-xs font-medium text-zinc-500 tracking-wider">2026</span>
      </div>

      {/* Absolute bottom right corner */}
      <div className="absolute bottom-24 right-8 sm:right-12 z-20">
        <span className="text-xs font-medium text-zinc-500 tracking-wider lowercase">auditoría, datos y software</span>
      </div>

    </section>
  );
}
