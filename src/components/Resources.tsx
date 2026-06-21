import { motion } from "motion/react";
import { Calendar, Clock, ArrowUpRight } from "lucide-react";
import { articles } from "../data/articles";

export default function Resources() {
  return (
    <section id="recursos" className="max-w-7xl mx-auto px-6 md:px-12 py-24 sm:py-32 border-t border-black/[0.03]">
      <div className="text-center mb-20 space-y-4">
        <span className="text-xs uppercase tracking-[0.25em] font-bold text-zinc-500 block">
          Centro de Conocimiento
        </span>
        <h2 className="text-4xl sm:text-5xl font-bold font-display text-zinc-900">
          Recursos Educativos y Guías
        </h2>
        <p className="text-zinc-600 max-w-2xl mx-auto text-sm sm:text-base">
          Información técnica y práctica para impulsar el crecimiento de tu empresa, asegurar el cumplimiento fiscal y optimizar tu toma de decisiones.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {articles.map((article) => {
          // Dynamic category colors matching the theme
          let categoryStyle = "bg-zinc-100 text-zinc-800";
          if (article.category === "Auditoría") categoryStyle = "bg-red-50 text-red-800 border-red-100";
          else if (article.category === "Inteligencia de Datos") categoryStyle = "bg-amber-50 text-amber-800 border-amber-100";
          else if (article.category === "Diáspora") categoryStyle = "bg-lime-50 text-lime-800 border-lime-200";

          return (
            <motion.div
              key={article.id}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.3 }}
              className="bg-white/80 backdrop-blur-sm border border-black/[0.05] rounded-xl p-6 flex flex-col justify-between shadow-sm hover:shadow-md hover:border-black/10 transition-all relative overflow-hidden group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${categoryStyle}`}>
                    {article.category}
                  </span>
                  <div className="flex items-center gap-3 text-zinc-400 text-[11px]">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {article.date.split(',')[0]}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {article.readTime.split(' ')[0]} min
                    </span>
                  </div>
                </div>

                <h3 className="text-lg font-bold font-display text-zinc-900 mb-3 group-hover:text-black transition-colors line-clamp-2">
                  {article.title}
                </h3>
                <p className="text-zinc-500 text-xs leading-relaxed mb-6 line-clamp-3">
                  {article.description}
                </p>
              </div>

              <div className="pt-4 border-t border-black/[0.03]">
                <a
                  href={`/articulos/${article.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-zinc-900 hover:text-black transition-colors cursor-pointer group/link"
                >
                  Leer artículo completo
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                </a>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
