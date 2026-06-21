import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowLeft, Calendar, Clock, MessageSquare, ShieldCheck, ArrowRight, Share2 } from "lucide-react";
import { articles } from "../data/articles";

export default function ArticleDetail() {
  const { id } = useParams<{ id: string }>();
  const article = articles.find((a) => a.id === id);

  useEffect(() => {
    if (article) {
      // Set Document Title for SEO
      document.title = `${article.title} | Garcia Integrum`;

      // Set Meta Description for SEO
      let metaDesc = document.querySelector('meta[name="description"]');
      if (!metaDesc) {
        metaDesc = document.createElement('meta');
        metaDesc.setAttribute('name', 'description');
        document.head.appendChild(metaDesc);
      }
      metaDesc.setAttribute('content', article.description);

      // Set Meta Keywords if available
      let metaKeywords = document.querySelector('meta[name="keywords"]');
      if (!metaKeywords) {
        metaKeywords = document.createElement('meta');
        metaKeywords.setAttribute('name', 'keywords');
        document.head.appendChild(metaKeywords);
      }
      metaKeywords.setAttribute('content', article.seoKeywords.join(', '));
    }
  }, [article]);

  if (!article) {
    return (
      <div className="min-h-screen bg-bg-base flex flex-col items-center justify-center p-6 text-center">
        <h1 className="text-4xl font-bold font-display text-zinc-900 mb-4">Artículo no encontrado</h1>
        <p className="text-zinc-500 mb-8 max-w-md">El recurso educativo al que intentas acceder no existe o ha sido trasladado.</p>
        <Link
          to="/"
          className="bg-[#1a1a1a] text-white text-xs font-bold uppercase tracking-wider px-6 py-3 rounded-lg hover:bg-black transition-all"
        >
          Volver al Inicio
        </Link>
      </div>
    );
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: article.title,
        text: article.description,
        url: window.location.href,
      }).catch(console.error);
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Enlace copiado al portapapeles");
    }
  };

  return (
    <div className="min-h-screen bg-bg-base selection:bg-brand-green selection:text-black">
      {/* Mini-Navbar */}
      <header className="border-b border-black/[0.03] bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="font-display font-bold text-lg text-zinc-900 tracking-tight hover:opacity-85 transition-opacity">
            garcia integrum
          </Link>
          <div className="flex items-center gap-4">
            <button
              onClick={handleShare}
              className="p-2 rounded-full hover:bg-zinc-100 text-zinc-500 hover:text-zinc-900 transition-all cursor-pointer"
              title="Compartir artículo"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <Link
              to="/"
              className="text-xs font-bold uppercase tracking-wider text-zinc-600 hover:text-zinc-950 transition-colors flex items-center gap-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Volver
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-3xl mx-auto px-6 py-12 sm:py-20">
        {/* Navigation Breadcrumb */}
        <div className="mb-8">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-xs text-zinc-500 hover:text-zinc-900 transition-colors font-medium"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Volver a la página principal
          </Link>
        </div>

        {/* Article Header */}
        <article className="space-y-6">
          <div className="space-y-4">
            <span className="inline-block text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-zinc-900 text-[#9fff00] border border-zinc-800">
              {article.category}
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-display text-zinc-900 leading-tight">
              {article.title}
            </h1>
            <div className="flex items-center gap-4 text-xs text-zinc-500 pt-2 border-b border-black/[0.03] pb-6">
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {article.date}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {article.readTime}
              </span>
              <span className="flex items-center gap-1 text-emerald-600 font-semibold">
                <ShieldCheck className="w-4 h-4" />
                Verificado por Garcia Integrum
              </span>
            </div>
          </div>

          {/* Article Body */}
          <div className="prose prose-zinc max-w-none pt-4 space-y-6 text-zinc-700 leading-relaxed text-sm sm:text-base">
            {article.content.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </article>

        {/* Lead Magnet / CTA Hook */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-16 bg-gradient-to-r from-zinc-900 to-zinc-800 text-white rounded-2xl p-8 sm:p-12 shadow-md relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full translate-x-8 -translate-y-8 blur-lg"></div>
          <div className="relative z-10 space-y-6 max-w-xl">
            <h3 className="text-2xl sm:text-3xl font-bold font-display text-white">
              ¿Listo para dar el siguiente paso?
            </h3>
            <p className="text-zinc-300 text-sm leading-relaxed">
              Las decisiones correctas nacen de la información adecuada y del asesoramiento de expertos. Descubre cómo nuestro equipo en Garcia Integrum puede ayudarte a implementar estas estrategias en tu negocio de forma segura y eficiente.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              {/* Redirects to main page's contact section */}
              <a
                href="/#contacto"
                className="bg-[#9fff00] text-black text-xs font-bold uppercase tracking-wider px-6 py-3.5 rounded-lg hover:bg-lime-400 transition-all text-center inline-flex items-center justify-center gap-2 cursor-pointer"
              >
                Solicitar Asesoría Personalizada <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="https://wa.me/50375966836?text=Hola,%20leí%20su%20artículo%20y%20me%20gustaría%20obtener%20más%20información%20sobre%20sus%20servicios."
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 hover:bg-white/15 text-white text-xs font-bold uppercase tracking-wider px-6 py-3.5 rounded-lg transition-all text-center inline-flex items-center justify-center gap-2 cursor-pointer border border-white/10"
              >
                <MessageSquare className="w-4 h-4 text-[#9fff00]" /> WhatsApp Directo
              </a>
            </div>
          </div>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="border-t border-black/[0.03] bg-zinc-50 py-12 text-center text-xs text-zinc-500">
        <div className="max-w-4xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-display font-bold text-zinc-900">garcia integrum</span>
            <span>© 2026. Todos los derechos reservados.</span>
          </div>
          <div className="flex gap-6">
            <Link to="/#servicios" className="hover:text-zinc-950 transition-colors">Servicios</Link>
            <Link to="/#metodologia" className="hover:text-zinc-950 transition-colors">Metodología</Link>
            <Link to="/#contacto" className="hover:text-zinc-950 transition-colors">Contacto</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
