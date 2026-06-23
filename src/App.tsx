import { useState } from "react";
import { motion } from "motion/react";
import {
  Shield, BarChart3, Rocket, CheckCircle2, ArrowRight,
  Globe, Zap, Award, FileCheck, Scale,
  Layers, BrainCircuit, Target, Lightbulb, MessageSquare,
  Mail, Phone, MapPin, Clock
} from "lucide-react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Resources from "./components/Resources";
import ArticleDetail from "./pages/ArticleDetail";

interface FormData {
  nombre: string;
  empresa: string;
  email: string;
  telefono: string;
  pais: string;
  servicio: string;
  urgencia: string;
  presupuesto: string;
  descripcion: string;
  autorizado: boolean;
}

const initialForm: FormData = {
  nombre: "", empresa: "", email: "", telefono: "",
  pais: "", servicio: "", urgencia: "", presupuesto: "",
  descripcion: "", autorizado: false,
};

function MainLanding() {
  const [form, setForm] = useState<FormData>(initialForm);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch("https://formsubmit.co/ajax/garcia.integrum1@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(form)
      });
      setSubmitted(true);
    } catch (error) {
      console.error("Error enviando formulario:", error);
      setSubmitted(true);
    }
  };

  const handleWhatsApp = () => {
    const formEl = document.getElementById('contact-form') as HTMLFormElement;
    if (formEl && !formEl.reportValidity()) return;

    const { nombre, empresa, email, telefono, pais, servicio, urgencia, presupuesto, descripcion } = form;

    let text = `*Nueva Solicitud de Propuesta - Garcia Integrum*\n\n`;
    text += `*Nombre:* ${nombre}\n`;
    text += `*Empresa:* ${empresa || 'N/A'}\n`;
    text += `*Email:* ${email}\n`;
    text += `*Teléfono:* ${telefono}\n`;
    text += `*País:* ${pais}\n`;
    text += `*Servicio:* ${servicio}\n`;
    text += `*Urgencia:* ${urgencia || 'N/A'}\n`;
    text += `*Presupuesto:* ${presupuesto || 'N/A'}\n\n`;
    text += `*Descripción del proyecto:*\n${descripcion}`;

    const encodedText = encodeURIComponent(text);
    const phoneNumber = "50375966836";
    window.open(`https://wa.me/${phoneNumber}?text=${encodedText}`, '_blank');
  };

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-bg-base selection:bg-brand-green selection:text-black">
      <Navbar />
      
      <main className="w-full">
        {/* Hero Section */}
        <Hero />

        {/* Credentials Bar */}
        <section className="max-w-7xl mx-auto px-6 md:px-12 -mt-16 relative z-30">
          <div className="bg-white/80 backdrop-blur-md border border-black/[0.05] rounded-xl p-6 shadow-sm grid grid-cols-2 lg:grid-cols-4 gap-6 items-center">
            {[
              { icon: Shield, label: "Registrados CVPCPA" },
              { icon: FileCheck, label: "Conformes NIIF / NIC" },
              { icon: BarChart3, label: "Partners: Power BI / Azure" },
              { icon: Scale, label: "Código Tributario SV" },
            ].map((cred, i) => (
              <div key={i} className="flex items-center gap-3 justify-center text-xs font-semibold uppercase tracking-wider text-zinc-700">
                <cred.icon className="w-5 h-5 text-zinc-900" />
                <span>{cred.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Servicios / 4 Pilares */}
        <section id="servicios" className="max-w-7xl mx-auto px-6 md:px-12 py-24 sm:py-32">
          <div className="text-center mb-20 space-y-4">
            <span className="text-xs uppercase tracking-[0.25em] font-bold text-zinc-500 block">
              Soluciones Especializadas
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold font-display text-zinc-900">
              Nuestros Pilares de Servicio
            </h2>
            <p className="text-zinc-600 max-w-2xl mx-auto">
              Cuatro líneas de servicio diseñadas para resolver las necesidades más críticas de empresas y profesionales en la era digital.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {[
              {
                id: "01",
                title: "Business Intelligence y Automatización",
                pain: "“¿Tomas decisiones críticas basándote en intuición porque tus datos están dispersos en hojas de Excel desconectadas?”",
                icon: BarChart3,
                accent: "bg-amber-400 text-amber-900 bg-amber-50",
                features: [
                  "Dashboards ejecutivos en Power BI con datos en tiempo real",
                  "Automatización de reportes que antes tomaban días",
                  "Macros inteligentes con IA integrada para Excel",
                  "ETL automatizado para consolidar fuentes de datos"
                ],
                diff: "DIFERENCIADOR: No solo creamos dashboards bonitos — construimos sistemas de inteligencia que se actualizan solos y generan alertas predictivas."
              },
              {
                id: "02",
                title: "Auditoría Externa, Fiscal e Investigación Forense",
                pain: "“¿Te preocupa un dictamen fiscal desfavorable o no detectar fraudes a tiempo en tu organización?”",
                icon: Shield,
                accent: "bg-zinc-900 text-zinc-100 bg-zinc-100",
                features: [
                  "Dictámenes fiscales con cumplimiento total del Código Tributario SV",
                  "Auditoría financiera bajo estándares NIIF aplicables en El Salvador",
                  "Investigación forense para detección de fraude e irregularidades",
                  "Evaluación integral de riesgos y control interno"
                ],
                diff: "DIFERENCIADOR: Combinamos la rigurosidad de la auditoría tradicional con herramientas de análisis de datos avanzadas para encontrar lo que otros pasan por alto."
              },
              {
                id: "03",
                title: "Desarrollo de Software, Apps y Soluciones IA",
                pain: "“¿Tu empresa sigue dependiendo de procesos manuales porque no encuentras soluciones tecnológicas que se adapten a tu realidad?”",
                icon: Rocket,
                accent: "bg-blue-600 text-blue-900 bg-blue-50",
                features: [
                  "Aplicaciones web y móviles a la medida de tu operación",
                  "Integración de Inteligencia Artificial en procesos existentes",
                  "Sistemas desktop especializados para industrias reguladas",
                  "Automatización inteligente de flujos de trabajo"
                ],
                diff: "DIFERENCIADOR: Desarrollamos con IA nativa desde el diseño — no como un módulo adicional, sino como parte integral de cada solución."
              },
              {
                id: "04",
                title: "Servicios Financieros para la Diáspora",
                pain: "“¿Eres salvadoreño en el extranjero y necesitas gestionar obligaciones fiscales, inversiones o asuntos legales en El Salvador?”",
                icon: Globe,
                accent: "bg-[#9fff00] text-black bg-lime-50",
                features: [
                  "Declaraciones fiscales y cumplimiento tributario remoto",
                  "Asesoría para inversiones inmobiliarias desde el exterior",
                  "Gestión de herencias, poderes y trámites legales a distancia",
                  "Consultoría financiera adaptada a la realidad del migrante"
                ],
                diff: "DIFERENCIADOR: Somos tu representante de confianza en El Salvador. Gestionamos tus asuntos financieros y de negocios como si estuvieras en el país."
              }
            ].map((pillar) => (
              <motion.div
                key={pillar.id}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3 }}
                className="bg-white/80 backdrop-blur-sm border border-black/[0.05] rounded-xl p-8 flex flex-col justify-between shadow-sm relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-1.5 h-full bg-[#1a1a1a]"></div>
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className={`p-3 rounded-lg flex items-center justify-center ${pillar.accent.split(' ')[2]} ${pillar.accent.split(' ')[1]}`}>
                      <pillar.icon className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-bold font-display text-zinc-400">PILAR {pillar.id}</span>
                  </div>
                  
                  <h3 className="text-xl font-bold font-display text-zinc-900 mb-4">{pillar.title}</h3>
                  <p className="text-zinc-500 italic text-sm mb-6">{pillar.pain}</p>

                  <ul className="space-y-3 mb-6">
                    {pillar.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-sm text-zinc-700">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <div className="bg-zinc-50 border border-black/[0.03] rounded-lg p-4 mb-6">
                    <p className="text-xs text-zinc-600 font-medium leading-relaxed">
                      <Zap className="w-3.5 h-3.5 inline mr-1 text-zinc-900 fill-zinc-900" />
                      {pillar.diff}
                    </p>
                  </div>

                  <button
                    onClick={() => scrollTo('contacto')}
                    className="flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-zinc-900 hover:text-black transition-colors cursor-pointer"
                  >
                    solicitar información <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ¿Por Qué Elegirnos? */}
        <section className="bg-white/40 py-24 sm:py-32 border-y border-black/[0.03]">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <div className="text-center mb-20 space-y-4">
              <span className="text-xs uppercase tracking-[0.25em] font-bold text-zinc-500 block">
                Ventajas Competitivas
              </span>
              <h2 className="text-4xl sm:text-5xl font-bold font-display text-zinc-900">
                ¿Por Qué Elegirnos?
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { icon: Layers, title: "Enfoque Dual", desc: "Combinamos experiencia financiera con capacidad tecnológica de vanguardia." },
                { icon: BrainCircuit, title: "Tecnología Propia", desc: "Desarrollamos herramientas internas que potencian nuestros servicios." },
                { icon: Scale, title: "Normativa Local", desc: "Dominio profundo de la legislación fiscal y mercantil salvadoreña." },
                { icon: Target, title: "Propuesta a la Medida", desc: "Cada cliente recibe una propuesta personalizada, no paquetes genéricos." },
                { icon: Award, title: "Equipo Certificado", desc: "Profesionales con formación continua en NIIF, IA y análisis de datos." },
                { icon: Globe, title: "Alcance Global", desc: "Atendemos empresas en El Salvador y salvadoreños en cualquier parte del mundo." },
              ].map((item, i) => (
                <div key={i} className="bg-white border border-black/[0.05] rounded-xl p-6 flex gap-4 shadow-sm hover:border-black/10 transition-all">
                  <div className="p-3 rounded-lg bg-zinc-50 text-zinc-900 shrink-0 self-start">
                    <item.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold font-display text-zinc-900 mb-1">{item.title}</h4>
                    <p className="text-sm text-zinc-500 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Metodología */}
        <section id="metodologia" className="max-w-7xl mx-auto px-6 md:px-12 py-24 sm:py-32">
          <div className="text-center mb-20 space-y-4">
            <span className="text-xs uppercase tracking-[0.25em] font-bold text-zinc-500 block">
              Metodología de Trabajo
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold font-display text-zinc-900">
              Así Trabajamos
            </h2>
            <p className="text-zinc-600 max-w-xl mx-auto">
              Un proceso claro y transparente desde el primer contacto hasta la entrega final de tu proyecto.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            {[
              { num: "01", icon: Lightbulb, title: "Describe tu Necesidad", desc: "Completa el formulario con los detalles de tu proyecto o necesidades." },
              { num: "02", icon: Target, title: "Análisis y Diagnóstico", desc: "Nuestro equipo evalúa tu situación y define el alcance óptimo." },
              { num: "03", icon: FileCheck, title: "Propuesta Técnica", desc: "Recibes una propuesta detallada y económica en 48 horas hábiles." },
              { num: "04", icon: Rocket, title: "Ejecución y Entrega", desc: "Implementamos la solución con seguimiento continuo y reportes." },
            ].map((step, i) => (
              <div key={i} className="relative flex flex-col items-start bg-white/60 backdrop-blur-sm border border-black/[0.05] rounded-xl p-6 shadow-sm">
                <span className="text-xs font-bold text-zinc-400 absolute top-4 right-4 font-display">{step.num}</span>
                <step.icon className="w-8 h-8 text-zinc-900 mb-4" />
                <h4 className="text-lg font-bold font-display text-zinc-900 mb-2">{step.title}</h4>
                <p className="text-xs text-zinc-500 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Confianza & Resultados */}
        <section id="resultados" className="bg-[#1a1a1a] text-white py-24 sm:py-32 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
            <div className="text-center mb-20 space-y-4">
              <span className="text-xs uppercase tracking-[0.25em] font-bold text-zinc-400 block">
                Resultados Comprobables
              </span>
              <h2 className="text-4xl sm:text-5xl font-bold font-display text-white">
                La Confianza se Demuestra
              </h2>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
              {[
                { num: "+200", label: "Auditorías Completadas" },
                { num: "6+", label: "Procesos Automatizados" },
                { num: "7+", label: "Apps & Desarrollos" },
                { num: "3", label: "Países con Presencia" },
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <p className="text-5xl md:text-6xl font-extrabold font-display text-[#9fff00] mb-2">{stat.num}</p>
                  <p className="text-xs uppercase tracking-wider text-zinc-400 font-semibold">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Testimonials */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  quote: "“Garcia Integrum transformó la forma en que gestionamos nuestros reportes fiscales. Lo que antes tomaba semanas ahora se resuelve en días con total confianza.”",
                  name: "María R.",
                  role: "CFO, Grupo Industrial"
                },
                {
                  quote: "“Desde EE.UU. pude gestionar la venta de una propiedad y mis obligaciones tributarias en El Salvador sin necesidad de viajar. Un servicio excepcional.”",
                  name: "Carlos M.",
                  role: "Empresario Salvadoreño en Virginia"
                },
                {
                  quote: "“Los dashboards de Power BI que implementaron nos dieron visibilidad total de nuestras operaciones. La automatización nos ahorra 40 horas mensuales.”",
                  name: "Andrea P.",
                  role: "Gerente de Operaciones, Distribuidora"
                }
              ].map((t, i) => (
                <div key={i} className="bg-zinc-900 border border-zinc-800 rounded-xl p-8 flex flex-col justify-between">
                  <p className="text-sm text-zinc-300 leading-relaxed mb-6 italic">{t.quote}</p>
                  <div className="pt-4 border-t border-zinc-800">
                    <p className="text-sm font-bold text-white">{t.name}</p>
                    <p className="text-xs text-zinc-500">{t.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Diaspora Banner */}
        <section className="max-w-7xl mx-auto px-6 md:px-12 py-20">
          <div className="bg-gradient-to-r from-zinc-900 to-zinc-800 text-white rounded-2xl p-8 md:p-16 flex flex-col md:flex-row items-center justify-between gap-10">
            <div className="space-y-6 max-w-xl">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold uppercase tracking-wider text-zinc-300">
                <Globe className="w-3.5 h-3.5" /> Servicio Internacional
              </span>
              <h3 className="text-3xl md:text-4xl font-bold font-display text-white">¿Salvadoreño en el Extranjero?</h3>
              <p className="text-zinc-300 leading-relaxed">
                Gestionamos tus obligaciones fiscales, inversiones y trámites legales en El Salvador de manera remota. <strong>No necesitas viajar</strong> — nos encargamos de todo con transparencia y seguridad.
              </p>
              <button
                onClick={() => scrollTo('contacto')}
                className="bg-[#9fff00] text-black text-sm font-bold px-6 py-3 rounded-lg hover:bg-lime-400 transition-all cursor-pointer inline-flex items-center gap-2"
              >
                Conectar desde el Exterior <ArrowRight className="w-4 h-4" />
              </button>
            </div>
            
            <div className="hidden md:flex flex-col items-center gap-4">
              <div className="w-36 h-36 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shadow-inner">
                <Globe className="w-16 h-16 text-[#9fff00] animate-pulse" />
              </div>
              <div className="flex gap-2">
                {['🇸🇻', '🇺🇸', '🇨🇦', '🇪🇸'].map((flag, i) => (
                  <span key={i} className="text-2xl">{flag}</span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Recursos Educativos */}
        <Resources />

        {/* Contacto */}
        <section id="contacto" className="bg-white/40 py-24 sm:py-32 border-t border-black/[0.03]">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <div className="text-center mb-16 space-y-4">
              <span className="text-xs uppercase tracking-[0.25em] font-bold text-zinc-500 block">
                Contacto
              </span>
              <h2 className="text-4xl sm:text-5xl font-bold font-display text-zinc-900">
                Ponte en Contacto con Nosotros
              </h2>
              <p className="text-zinc-600 max-w-lg mx-auto text-sm sm:text-base">
                Escríbenos, llámanos o envíanos un mensaje. Nuestro equipo técnico te enviará una propuesta de solución personalizada en menos de 48 horas hábiles.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              {/* Información de Contacto */}
              <div className="lg:col-span-5 space-y-8">
                <div className="bg-white border border-black/[0.05] rounded-xl p-8 shadow-sm space-y-8">
                  <h3 className="text-xl font-bold font-display text-zinc-900">
                    Datos de Contacto
                  </h3>
                  <p className="text-sm text-zinc-500 leading-relaxed">
                    Estamos listos para asesorarte y llevar tu negocio al siguiente nivel con soluciones financieras y tecnológicas a tu medida.
                  </p>

                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-lg bg-zinc-50 text-zinc-900 shrink-0">
                        <Mail className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-700 mb-1">Correo Electrónico</h4>
                        <a href="mailto:garcia.integrum1@gmail.com" className="text-sm text-zinc-900 hover:underline font-semibold block break-all">
                          garcia.integrum1@gmail.com
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-lg bg-zinc-50 text-zinc-900 shrink-0">
                        <Phone className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-700 mb-1">Teléfono / WhatsApp</h4>
                        <a href="https://wa.me/50375966836" target="_blank" rel="noopener noreferrer" className="text-sm text-zinc-900 hover:underline font-semibold block">
                          +503 7596-6836
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-lg bg-zinc-50 text-zinc-900 shrink-0">
                        <MapPin className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-700 mb-1">Ubicación</h4>
                        <p className="text-sm text-zinc-900 font-semibold">
                          San Salvador, El Salvador
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-lg bg-zinc-50 text-zinc-900 shrink-0">
                        <Clock className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-700 mb-1">Horario de Atención</h4>
                        <p className="text-sm text-zinc-900 font-semibold">
                          Lunes a Viernes: 8:00 AM - 5:00 PM
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Diaspora direct shortcut */}
                <div className="bg-[#1a1a1a] text-white rounded-xl p-8 border border-zinc-800 space-y-4">
                  <h4 className="text-sm font-bold uppercase tracking-wider text-[#9fff00]">Atención Diáspora</h4>
                  <p className="text-xs text-zinc-300 leading-relaxed">
                    Si eres salvadoreño en el exterior, puedes contactarnos directamente por WhatsApp para una asesoría remota e inmediata.
                  </p>
                  <a
                    href="https://wa.me/50375966836"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-[#9fff00] text-black text-xs font-bold uppercase tracking-wider px-4 py-2.5 rounded-lg hover:bg-lime-400 transition-all font-sans cursor-pointer"
                  >
                    <MessageSquare className="w-3.5 h-3.5" /> WhatsApp Internacional
                  </a>
                </div>
              </div>

              {/* Formulario */}
              <div className="lg:col-span-7">
                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-white border border-black/[0.05] rounded-xl p-10 text-center space-y-6 shadow-sm"
                  >
                    <div className="w-16 h-16 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h3 className="text-2xl font-bold font-display text-zinc-900">¡Mensaje Recibido con Éxito!</h3>
                    <p className="text-zinc-500 text-sm max-w-sm mx-auto">
                      Hemos registrado tu solicitud correctamente. Te responderemos en un lapso máximo de <strong>48 horas hábiles</strong>.
                    </p>
                    <button
                      onClick={() => { setSubmitted(false); setForm(initialForm); }}
                      className="bg-[#1a1a1a] text-white text-xs font-bold uppercase tracking-wider px-6 py-2.5 rounded-lg hover:bg-black transition-all cursor-pointer"
                    >
                      Enviar otra solicitud
                    </button>
                  </motion.div>
                ) : (
                  <form id="contact-form" onSubmit={handleSubmit} className="bg-white border border-black/[0.05] rounded-xl p-8 sm:p-12 shadow-sm space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 mb-2">
                          Nombre completo <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="nombre"
                          value={form.nombre}
                          onChange={handleChange}
                          required
                          placeholder="Ej: Juan Martínez"
                          className="w-full bg-zinc-50 border border-black/[0.05] rounded-md px-4 py-2.5 text-sm outline-none focus:bg-white focus:border-zinc-900 transition-all text-zinc-900"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 mb-2">
                          Empresa o Institución
                        </label>
                        <input
                          type="text"
                          name="empresa"
                          value={form.empresa}
                          onChange={handleChange}
                          placeholder="Ej: Empresa S.A."
                          className="w-full bg-zinc-50 border border-black/[0.05] rounded-md px-4 py-2.5 text-sm outline-none focus:bg-white focus:border-zinc-900 transition-all text-zinc-900"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 mb-2">
                          Correo electrónico <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={form.email}
                          onChange={handleChange}
                          required
                          placeholder="correo@empresa.com"
                          className="w-full bg-zinc-50 border border-black/[0.05] rounded-md px-4 py-2.5 text-sm outline-none focus:bg-white focus:border-zinc-900 transition-all text-zinc-900"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 mb-2">
                          Teléfono / WhatsApp <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="tel"
                          name="telefono"
                          value={form.telefono}
                          onChange={handleChange}
                          required
                          placeholder="Ej: +503 7000-0000"
                          className="w-full bg-zinc-50 border border-black/[0.05] rounded-md px-4 py-2.5 text-sm outline-none focus:bg-white focus:border-zinc-900 transition-all text-zinc-900"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 mb-2">
                          País <span className="text-red-500">*</span>
                        </label>
                        <select
                          name="pais"
                          value={form.pais}
                          onChange={handleChange}
                          required
                          className="w-full bg-zinc-50 border border-black/[0.05] rounded-md px-4 py-2.5 text-sm outline-none focus:bg-white focus:border-zinc-900 transition-all text-zinc-900"
                        >
                          <option value="">Seleccione...</option>
                          <option value="SV">El Salvador</option>
                          <option value="US">Estados Unidos</option>
                          <option value="CA">Canadá</option>
                          <option value="ES">España</option>
                          <option value="OTHER">Otro país</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 mb-2">
                          Línea de servicio <span className="text-red-500">*</span>
                        </label>
                        <select
                          name="servicio"
                          value={form.servicio}
                          onChange={handleChange}
                          required
                          className="w-full bg-zinc-50 border border-black/[0.05] rounded-md px-4 py-2.5 text-sm outline-none focus:bg-white focus:border-zinc-900 transition-all text-zinc-900"
                        >
                          <option value="">Seleccione...</option>
                          <option value="BI">Business Intelligence y Automatización</option>
                          <option value="AUDIT">Auditoría Externa, Fiscal e Investigación</option>
                          <option value="DEV">Desarrollo de Software, Apps y Soluciones IA</option>
                          <option value="DIASPORA">Servicios Financieros (Diáspora)</option>
                          <option value="UNSURE">No estoy seguro — necesito orientación</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 mb-2">
                          Nivel de urgencia
                        </label>
                        <select
                          name="urgencia"
                          value={form.urgencia}
                          onChange={handleChange}
                          className="w-full bg-zinc-50 border border-black/[0.05] rounded-md px-4 py-2.5 text-sm outline-none focus:bg-white focus:border-zinc-900 transition-all text-zinc-900"
                        >
                          <option value="">Seleccione...</option>
                          <option value="IMMEDIATE">Inmediato (esta semana)</option>
                          <option value="2WEEKS">1-2 semanas</option>
                          <option value="1MONTH">Dentro de 1 mes</option>
                          <option value="EXPLORING">Solo estoy explorando</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 mb-2">
                          Presupuesto estimado
                        </label>
                        <select
                          name="presupuesto"
                          value={form.presupuesto}
                          onChange={handleChange}
                          className="w-full bg-zinc-50 border border-black/[0.05] rounded-md px-4 py-2.5 text-sm outline-none focus:bg-white focus:border-zinc-900 transition-all text-zinc-900"
                        >
                          <option value="">Seleccione...</option>
                          <option value="500-2K">$500 – $2,000</option>
                          <option value="2K-5K">$2,000 – $5,000</option>
                          <option value="5K-15K">$5,000 – $15,000</option>
                          <option value="15K+">$15,000+</option>
                          <option value="NEED_GUIDANCE">Necesito orientación</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 mb-2">
                        Descripción del proyecto o requerimiento <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        name="descripcion"
                        value={form.descripcion}
                        onChange={handleChange}
                        required
                        rows={4}
                        placeholder="Describa brevemente su requerimiento, retos técnicos o el problema que busca resolver..."
                        className="w-full bg-zinc-50 border border-black/[0.05] rounded-md px-4 py-2.5 text-sm outline-none focus:bg-white focus:border-zinc-900 transition-all text-zinc-900 resize-none"
                      />
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 pt-4">
                      <button
                        type="submit"
                        className="bg-[#1a1a1a] text-white text-xs font-bold uppercase tracking-wider px-8 py-3.5 rounded-lg hover:bg-black transition-all cursor-pointer flex-1 justify-center flex items-center gap-1.5"
                      >
                        Enviar propuesta por correo <ArrowRight className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={handleWhatsApp}
                        className="bg-zinc-900 hover:bg-black text-[#9fff00] text-xs font-bold uppercase tracking-wider px-8 py-3.5 rounded-lg transition-all cursor-pointer flex-1 justify-center flex items-center gap-1.5 border border-zinc-800"
                      >
                        <MessageSquare className="w-4 h-4 text-[#9fff00]" /> Contactar vía WhatsApp
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-black/[0.03] bg-zinc-50 py-12 text-xs text-zinc-500">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col items-center md:items-start gap-2">
            <div className="flex items-center gap-2">
              <span className="font-display font-bold text-zinc-900 text-sm">garcia integrum</span>
              <span>© 2026. Todos los derechos reservados.</span>
            </div>
            <p className="text-zinc-400 text-[11px] text-center md:text-left">
              garcia.integrum1@gmail.com | +503 7596-6836 | San Salvador, El Salvador
            </p>
          </div>
          <div className="flex gap-6">
            <a href="#servicios" className="hover:text-zinc-950 transition-colors">Servicios</a>
            <a href="#metodologia" className="hover:text-zinc-950 transition-colors">Metodología</a>
            <a href="#contacto" className="hover:text-zinc-950 transition-colors">Contacto</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLanding />} />
        <Route path="/articulos/:id" element={<ArticleDetail />} />
      </Routes>
    </Router>
  );
}
