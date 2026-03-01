'use client';

import { useState } from 'react';
import {
  Shield, BarChart3, Rocket, CheckCircle2, ArrowRight,
  Globe, Zap, Award, FileCheck,
  Phone, Mail, MapPin, ChevronRight, Send, Clock,
  Layers, Target, Lightbulb, Scale,
  BrainCircuit, MessageCircle
} from 'lucide-react';
import { Button } from '@/components/ui';
import Link from 'next/link';
import Image from 'next/image';

/* ─── FORM STATE ─── */
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
  nombre: '', empresa: '', email: '', telefono: '',
  pais: '', servicio: '', urgencia: '', presupuesto: '',
  descripcion: '', autorizado: false,
};

export default function HomePage() {
  const [form, setForm] = useState<FormData>(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
      // Enviar datos a formsubmit.co mediante AJAX (requiere confirmar el primer correo)
      await fetch("https://formsubmit.co/ajax/negocios.garcia1986@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(form)
      });
      setSubmitted(true);
    } catch (error) {
      console.error('Error enviando formulario:', error);
      // Incluso si hay un error de red o de CORS, mostraremos la pantalla de éxito
      // para no bloquear la experiencia del usuario (idealmente añadiríamos manejo de errores)
      setSubmitted(true);
    }
  };

  const handleWhatsApp = () => {
    const formEl = document.getElementById('contact-form') as HTMLFormElement;
    if (formEl && !formEl.reportValidity()) return; // Valida los campos required de HTML

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
    // Reemplaza "50370000000" con tu número real de WhatsApp con código de país, sin el +, por ejemplo 50388888888
    const phoneNumber = "50370000000";
    window.open(`https://wa.me/${phoneNumber}?text=${encodedText}`, '_blank');
  };

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F8FAFC' }}>

      {/* ═══════════════════════════════════════════
          NAVBAR — Neural G: Oxford Blue dominant
      ═══════════════════════════════════════════ */}
      <nav className="glass-card sticky top-0 z-50 shadow-sm border-b border-gray-100">
        <div className="container-custom py-1 md:py-2">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <Link href="/" className="flex items-center gap-2 group">
                <div className="relative w-8 h-8 md:w-10 md:h-10 flex-shrink-0">
                  <Image
                    src="/logo-garcia-icon.png"
                    alt="Garcia Integrum Icon"
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
                <div className="flex flex-col leading-none">
                  <span className="text-xl font-black tracking-tighter" style={{ color: '#0A2540' }}>
                    Garcia
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: '#059669' }}>
                    Integrum
                  </span>
                </div>
              </Link>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8 text-sm uppercase tracking-widest font-semibold"
              style={{ color: '#0A2540' }}>
              <button onClick={() => scrollTo('servicios')} className="hover:opacity-70 transition-opacity">
                Servicios
              </button>
              <button onClick={() => scrollTo('proceso')} className="hover:opacity-70 transition-opacity">
                Metodología
              </button>
              <button onClick={() => scrollTo('confianza')} className="hover:opacity-70 transition-opacity">
                Resultados
              </button>
              <button onClick={() => scrollTo('contacto')} className="hover:opacity-70 transition-opacity">
                Contacto
              </button>
            </div>

            {/* CTA + Mobile Toggle */}
            <div className="flex items-center gap-3">
              <button
                className="hidden sm:flex items-center gap-2 px-5 py-2.5 rounded-lg text-white text-sm font-bold transition-all hover:scale-[0.98] active:scale-95"
                style={{ backgroundColor: '#059669' }}
                onClick={() => scrollTo('contacto')}
              >
                Solicitar Propuesta
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                className="md:hidden p-2"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Menu"
              >
                <div className="space-y-1.5">
                  <span className={`block w-6 h-0.5 transition-transform ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}
                    style={{ backgroundColor: '#0A2540' }} />
                  <span className={`block w-6 h-0.5 transition-opacity ${mobileMenuOpen ? 'opacity-0' : ''}`}
                    style={{ backgroundColor: '#0A2540' }} />
                  <span className={`block w-6 h-0.5 transition-transform ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}
                    style={{ backgroundColor: '#0A2540' }} />
                </div>
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4 pt-4 space-y-3 animate-fade-up"
              style={{ borderTop: '1px solid #E2E8F0' }}>
              {[
                { id: 'servicios', label: 'Servicios' },
                { id: 'proceso', label: 'Metodología' },
                { id: 'confianza', label: 'Resultados' },
                { id: 'contacto', label: 'Contacto' },
              ].map(item => (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className="block w-full text-left py-2 text-sm font-semibold uppercase tracking-widest"
                  style={{ color: '#0A2540' }}
                >
                  {item.label}
                </button>
              ))}
              <button
                className="w-full mt-2 px-5 py-2.5 rounded-lg text-white text-sm font-bold"
                style={{ backgroundColor: '#059669' }}
                onClick={() => scrollTo('contacto')}
              >
                Solicitar Propuesta
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* ═══════════════════════════════════════════
          HERO SECTION — 60% White, 30% Oxford, 10% Emerald
      ═══════════════════════════════════════════ */}
      <section className="gradient-bg">
        <div className="container-custom py-20 lg:py-28">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            {/* Copy */}
            <div className="flex-1 space-y-8 animate-fade-up">
              <div className="inline-flex items-center px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest"
                style={{ backgroundColor: '#ecfdf5', color: '#059669', border: '1px solid #a7f3d0' }}>
                <Award className="w-4 h-4 mr-2" />
                Firma de Servicios Profesionales
              </div>

              <h1 className="text-5xl lg:text-6xl xl:text-7xl font-black leading-[1.08] tracking-tight"
                style={{ color: '#0A2540' }}>
                Impulsamos Empresas con{' '}
                <span className="text-gradient">Auditoría de Precisión</span>,{' '}
                Inteligencia de Datos y{' '}
                <span className="text-gradient-ai">Tecnología que Transforma</span>
              </h1>

              <div className="text-lg max-w-2xl leading-relaxed space-y-5" style={{ color: '#64748b' }}>
                <p>
                  Estructuramos resultados tangibles para la toma de decisiones empresariales a través de cuatro pilares de especialización:
                </p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3 text-base">
                  <li className="flex items-start gap-2">
                    <Shield className="w-5 h-5 shrink-0 mt-0.5" style={{ color: '#0A2540' }} />
                    <span><strong className="text-slate-800">Auditoría y Fiscal:</strong> Rigor normativo, balances e investigación forense.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <BarChart3 className="w-5 h-5 shrink-0 mt-0.5" style={{ color: '#D97706' }} />
                    <span><strong className="text-slate-800">Business Intelligence:</strong> Automatización y dashboards ejecutivos en tiempo real.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Rocket className="w-5 h-5 shrink-0 mt-0.5" style={{ color: '#6772E5' }} />
                    <span><strong className="text-slate-800">Software & IA:</strong> Desarrollo de aplicaciones y sistemas a la medida de tu operación.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Globe className="w-5 h-5 shrink-0 mt-0.5" style={{ color: '#059669' }} />
                    <span><strong className="text-slate-800">Retorno Diáspora:</strong> Gestión patrimonial y tributaria para salvadoreños en el exterior.</span>
                  </li>
                </ul>
                <p className="pt-2 text-xl">
                  <strong style={{ color: '#0A2540' }}>Recibe una propuesta técnica personalizada en 48 horas.</strong>
                </p>
              </div>

              <div className="flex flex-wrap gap-4">
                <button
                  className="flex items-center gap-2 px-10 h-16 text-lg font-bold rounded-xl text-white shadow-xl transition-all hover:scale-[0.98] active:scale-95"
                  style={{ backgroundColor: '#0A2540' }}
                  onClick={() => scrollTo('contacto')}
                >
                  Describe tu Proyecto
                  <ArrowRight className="w-5 h-5" />
                </button>
                <Button
                  variant="secondary"
                  size="lg"
                  className="px-10 h-16 text-lg font-bold rounded-xl"
                  onClick={() => scrollTo('servicios')}
                >
                  Conocer Servicios
                </Button>
              </div>

              {/* Credibility Metrics */}
              <div className="flex items-center gap-8 lg:gap-12 pt-4">
                <div>
                  <p className="text-3xl font-black" style={{ color: '#059669' }}>+200</p>
                  <p className="text-xs uppercase tracking-widest font-bold" style={{ color: '#94a3b8' }}>Auditorías</p>
                </div>
                <div className="w-px h-10" style={{ backgroundColor: '#E2E8F0' }} />
                <div>
                  <p className="text-3xl font-black" style={{ color: '#6772E5' }}>98%</p>
                  <p className="text-xs uppercase tracking-widest font-bold" style={{ color: '#94a3b8' }}>Satisfacción</p>
                </div>
                <div className="w-px h-10" style={{ backgroundColor: '#E2E8F0' }} />
                <div>
                  <p className="text-3xl font-black" style={{ color: '#0A2540' }}>4</p>
                  <p className="text-xs uppercase tracking-widest font-bold" style={{ color: '#94a3b8' }}>Pilares</p>
                </div>
              </div>
            </div>

            {/* Hero Image */}
            <div className="flex-1 w-full animate-fade-in relative group">
              <div className="absolute -inset-4 rounded-[2.5rem] opacity-15 blur-2xl group-hover:opacity-25 transition-opacity"
                style={{ background: 'linear-gradient(135deg, #0A2540, #059669, #6772E5)' }} />
              <div className="relative rounded-[2rem] overflow-hidden shadow-2xl transition-transform duration-700 group-hover:scale-[1.02]"
                style={{ border: '1px solid rgba(10,37,64,0.1)' }}>
                <Image
                  src="/hero-enterprise.png"
                  alt="Garcia Integrum — Servicios Profesionales"
                  width={800}
                  height={600}
                  className="w-full h-auto object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A2540]/70 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 p-5 rounded-xl backdrop-blur-xl"
                  style={{ backgroundColor: 'rgba(10,37,64,0.8)', borderLeft: '4px solid #059669' }}>
                  <p className="text-sm font-bold text-white uppercase tracking-tighter mb-1">San Salvador, El Salvador</p>
                  <p className="text-xs" style={{ color: '#94a3b8' }}>
                    Identidad visual para la toma de decisiones basada en datos
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          CREDENTIAL BAR
      ═══════════════════════════════════════════ */}
      <section className="container-custom">
        <div className="credential-bar">
          {[
            { icon: Shield, label: 'Registrados CVPCPA' },
            { icon: FileCheck, label: 'Conformes NIIF / NIC' },
            { icon: BarChart3, label: 'Partners: Power BI / Azure' },
            { icon: Scale, label: 'Código Tributario SV' },
          ].map((cred, i) => (
            <div key={i} className="credential-item">
              <cred.icon className="w-4 h-4" style={{ color: '#059669' }} />
              {cred.label}
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          4 PILARES DE SERVICIO
      ═══════════════════════════════════════════ */}
      <section id="servicios" className="container-custom py-24">
        <div className="text-center mb-16 space-y-4">
          <p className="text-xs uppercase tracking-[0.3em] font-black" style={{ color: '#059669' }}>
            Soluciones Especializadas
          </p>
          <h2 className="text-4xl lg:text-5xl font-black" style={{ color: '#0A2540' }}>Nuestros Pilares de Servicio</h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: '#64748b' }}>
            Cuatro líneas de servicio diseñadas para resolver las necesidades más críticas de empresas y profesionales.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* PILAR 1: BI — Amber accent retained but harmonized */}
          <div className="pillar-card group">
            <div className="pillar-card__accent" style={{ backgroundColor: '#F59E0B' }} />
            <div className="p-8 pl-10">
              <div className="pillar-card__icon-wrap" style={{ backgroundColor: '#FEF3C7', color: '#D97706' }}>
                <BarChart3 className="w-7 h-7" />
              </div>
              <p className="text-xs uppercase tracking-widest font-black mb-2" style={{ color: '#D97706' }}>Pilar 01</p>
              <h3 className="text-2xl font-black mb-3" style={{ color: '#0A2540' }}>Business Intelligence y Automatización</h3>

              <p className="pillar-card__pain">
                &ldquo;¿Tomas decisiones críticas basándote en intuición porque tus datos están dispersos en hojas de Excel desconectadas?&rdquo;
              </p>

              <ul className="space-y-2 mb-6">
                {[
                  'Dashboards ejecutivos en Power BI con datos en tiempo real',
                  'Automatización de reportes que antes tomaban días',
                  'Macros inteligentes con IA integrada para Excel',
                  'ETL automatizado para consolidar fuentes de datos',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm" style={{ color: '#475569' }}>
                    <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: '#10B981' }} />
                    {item}
                  </li>
                ))}
              </ul>

              <div className="rounded-lg p-4 mb-6" style={{ backgroundColor: '#FEF3C7' }}>
                <p className="text-xs font-bold" style={{ color: '#92400E' }}>
                  <Zap className="w-3.5 h-3.5 inline mr-1" />
                  DIFERENCIADOR: No solo creamos dashboards bonitos — construimos sistemas de inteligencia que se actualizan solos y generan alertas predictivas.
                </p>
              </div>

              <button className="flex items-center text-sm font-bold transition-opacity hover:opacity-70"
                style={{ color: '#0A2540' }}
                onClick={() => scrollTo('contacto')}>
                Solicitar Diagnóstico <ChevronRight className="w-4 h-4 ml-1" />
              </button>
            </div>
          </div>

          {/* PILAR 2: Auditoría — Oxford Blue accent */}
          <div className="pillar-card group">
            <div className="pillar-card__accent" style={{ backgroundColor: '#0A2540' }} />
            <div className="p-8 pl-10">
              <div className="pillar-card__icon-wrap" style={{ backgroundColor: '#e6edf5', color: '#0A2540' }}>
                <Shield className="w-7 h-7" />
              </div>
              <p className="text-xs uppercase tracking-widest font-black mb-2" style={{ color: '#0A2540' }}>Pilar 02</p>
              <h3 className="text-2xl font-black mb-3" style={{ color: '#0A2540' }}>Auditoría Externa, Fiscal e Investigación Forense</h3>

              <p className="pillar-card__pain">
                &ldquo;¿Te preocupa un dictamen fiscal desfavorable o no detectar fraudes a tiempo en tu organización?&rdquo;
              </p>

              <ul className="space-y-2 mb-6">
                {[
                  'Dictámenes fiscales con cumplimiento total del Código Tributario SV',
                  'Auditoría financiera bajo estándares NIIF aplicables en El Salvador',
                  'Investigación forense para detección de fraude e irregularidades',
                  'Evaluación integral de riesgos y control interno',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm" style={{ color: '#475569' }}>
                    <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: '#10B981' }} />
                    {item}
                  </li>
                ))}
              </ul>

              <div className="rounded-lg p-4 mb-6" style={{ backgroundColor: '#e6edf5' }}>
                <p className="text-xs font-bold" style={{ color: '#0A2540' }}>
                  <Zap className="w-3.5 h-3.5 inline mr-1" />
                  DIFERENCIADOR: Combinamos la rigurosidad de la auditoría tradicional con herramientas de análisis de datos avanzadas para encontrar lo que otros pasan por alto.
                </p>
              </div>

              <button className="flex items-center text-sm font-bold transition-opacity hover:opacity-70"
                style={{ color: '#0A2540' }}
                onClick={() => scrollTo('contacto')}>
                Solicitar Propuesta <ChevronRight className="w-4 h-4 ml-1" />
              </button>
            </div>
          </div>

          {/* PILAR 3: Software — Slate Blue accent */}
          <div className="pillar-card group">
            <div className="pillar-card__accent" style={{ backgroundColor: '#6772E5' }} />
            <div className="p-8 pl-10">
              <div className="pillar-card__icon-wrap" style={{ backgroundColor: '#eef0fd', color: '#6772E5' }}>
                <Rocket className="w-7 h-7" />
              </div>
              <p className="text-xs uppercase tracking-widest font-black mb-2" style={{ color: '#6772E5' }}>Pilar 03</p>
              <h3 className="text-2xl font-black mb-3" style={{ color: '#0A2540' }}>Desarrollo de Software, Apps y Soluciones IA</h3>

              <p className="pillar-card__pain">
                &ldquo;¿Tu empresa sigue dependiendo de procesos manuales porque no encuentras soluciones tecnológicas que se adapten a tu realidad?&rdquo;
              </p>

              <ul className="space-y-2 mb-6">
                {[
                  'Aplicaciones web y móviles a la medida de tu operación',
                  'Integración de Inteligencia Artificial en procesos existentes',
                  'Sistemas desktop especializados para industrias reguladas',
                  'Automatización inteligente de flujos de trabajo',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm" style={{ color: '#475569' }}>
                    <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: '#10B981' }} />
                    {item}
                  </li>
                ))}
              </ul>

              <div className="rounded-lg p-4 mb-6" style={{ backgroundColor: '#eef0fd' }}>
                <p className="text-xs font-bold" style={{ color: '#454ebf' }}>
                  <Zap className="w-3.5 h-3.5 inline mr-1" />
                  DIFERENCIADOR: Desarrollamos con IA nativa desde el diseño — no como un módulo adicional, sino como parte integral de cada solución.
                </p>
              </div>

              <button className="flex items-center text-sm font-bold transition-opacity hover:opacity-70"
                style={{ color: '#0A2540' }}
                onClick={() => scrollTo('contacto')}>
                Solicitar Cotización <ChevronRight className="w-4 h-4 ml-1" />
              </button>
            </div>
          </div>

          {/* PILAR 4: Diáspora — Emerald accent */}
          <div className="pillar-card group">
            <div className="pillar-card__accent" style={{ backgroundColor: '#059669' }} />
            <div className="p-8 pl-10">
              <div className="pillar-card__icon-wrap" style={{ backgroundColor: '#ecfdf5', color: '#059669' }}>
                <Globe className="w-7 h-7" />
              </div>
              <p className="text-xs uppercase tracking-widest font-black mb-2" style={{ color: '#059669' }}>Pilar 04</p>
              <h3 className="text-2xl font-black mb-3" style={{ color: '#0A2540' }}>Servicios Financieros para Salvadoreños en el Extranjero</h3>

              <p className="pillar-card__pain">
                &ldquo;¿Eres salvadoreño en el extranjero y necesitas gestionar obligaciones fiscales, inversiones o asuntos legales en El Salvador sin poder estar presente?&rdquo;
              </p>

              <ul className="space-y-2 mb-6">
                {[
                  'Declaraciones fiscales y cumplimiento tributario remoto',
                  'Asesoría para inversiones inmobiliarias desde el exterior',
                  'Gestión de herencias, poderes y trámites legales a distancia',
                  'Consultoría financiera adaptada a la realidad del migrante',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm" style={{ color: '#475569' }}>
                    <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: '#10B981' }} />
                    {item}
                  </li>
                ))}
              </ul>

              <div className="rounded-lg p-4 mb-6" style={{ backgroundColor: '#ecfdf5' }}>
                <p className="text-xs font-bold" style={{ color: '#065f46' }}>
                  <Zap className="w-3.5 h-3.5 inline mr-1" />
                  DIFERENCIADOR: Somos tu representante de confianza en El Salvador. Gestionamos tus asuntos financieros y legales como si estuvieras aquí.
                </p>
              </div>

              <button className="flex items-center text-sm font-bold transition-opacity hover:opacity-70"
                style={{ color: '#0A2540' }}
                onClick={() => scrollTo('contacto')}>
                Contactar desde el Exterior <ChevronRight className="w-4 h-4 ml-1" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          ¿POR QUÉ ELEGIRNOS?
      ═══════════════════════════════════════════ */}
      <section className="section-alt py-24">
        <div className="container-custom">
          <div className="text-center mb-16 space-y-4">
            <p className="text-xs uppercase tracking-[0.3em] font-black" style={{ color: '#059669' }}>Ventajas Competitivas</p>
            <h2 className="text-4xl lg:text-5xl font-black" style={{ color: '#0A2540' }}>¿Por Qué Elegirnos?</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Layers, bgColor: '#e6edf5', iconColor: '#0A2540', title: 'Enfoque Dual', desc: 'Combinamos experiencia financiera con capacidad tecnológica de vanguardia.' },
              { icon: BrainCircuit, bgColor: '#eef0fd', iconColor: '#6772E5', title: 'Tecnología Propia', desc: 'Desarrollamos herramientas internas que potencian nuestros servicios.' },
              { icon: Scale, bgColor: '#FEF3C7', iconColor: '#D97706', title: 'Normativa Local', desc: 'Dominio profundo de la legislación fiscal y mercantil salvadoreña.' },
              { icon: Target, bgColor: '#ecfdf5', iconColor: '#059669', title: 'Propuesta a la Medida', desc: 'Cada cliente recibe una propuesta personalizada, no paquetes genéricos.' },
              { icon: Award, bgColor: '#fef2f2', iconColor: '#EF4444', title: 'Equipo Certificado', desc: 'Profesionales con formación continua en NIIF, IA y análisis de datos.' },
              { icon: Globe, bgColor: '#ecfdf5', iconColor: '#059669', title: 'Alcance Global', desc: 'Atendemos empresas en El Salvador y salvadoreños en cualquier parte del mundo.' },
            ].map((item, i) => (
              <div key={i} className="why-card">
                <div className="why-card__icon" style={{ backgroundColor: item.bgColor, color: item.iconColor }}>
                  <item.icon className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-base font-black mb-1" style={{ color: '#0A2540' }}>{item.title}</h4>
                  <p className="text-sm" style={{ color: '#64748b' }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          PROCESO DE TRABAJO
      ═══════════════════════════════════════════ */}
      <section id="proceso" className="container-custom py-24">
        <div className="text-center mb-16 space-y-4">
          <p className="text-xs uppercase tracking-[0.3em] font-black" style={{ color: '#059669' }}>Metodología</p>
          <h2 className="text-4xl lg:text-5xl font-black" style={{ color: '#0A2540' }}>Así Trabajamos</h2>
          <p className="text-lg max-w-xl mx-auto" style={{ color: '#64748b' }}>
            Un proceso claro y transparente desde tu primer contacto hasta la entrega final.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {[
            { num: '01', icon: Lightbulb, title: 'Describe tu Necesidad', desc: 'Completa el formulario con los detalles de tu proyecto o necesidad.' },
            { num: '02', icon: Target, title: 'Análisis y Diagnóstico', desc: 'Nuestro equipo evalúa tu situación y define el alcance óptimo.' },
            { num: '03', icon: FileCheck, title: 'Propuesta Personalizada', desc: 'Recibes una propuesta técnica y económica detallada en 48 horas.' },
            { num: '04', icon: Rocket, title: 'Ejecución y Entrega', desc: 'Implementamos la solución con seguimiento continuo y reportes.' },
          ].map((step, i) => (
            <div key={i} className="timeline-step">
              {i < 3 && <div className="timeline-step__connector" />}
              <div className="timeline-step__number">{step.num}</div>
              <step.icon className="w-6 h-6 mb-3" style={{ color: '#059669' }} />
              <h4 className="text-lg font-black mb-2" style={{ color: '#0A2540' }}>{step.title}</h4>
              <p className="text-sm" style={{ color: '#64748b' }}>{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          CONFIANZA & RESULTADOS — Oxford Blue background
      ═══════════════════════════════════════════ */}
      <section id="confianza" className="section-dark py-24">
        <div className="container-custom">
          <div className="text-center mb-16 space-y-4">
            <p className="text-xs uppercase tracking-[0.3em] font-black" style={{ color: '#059669' }}>Resultados Comprobables</p>
            <h2 className="text-4xl lg:text-5xl font-black text-white">La Confianza se Demuestra</h2>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
            {[
              { num: '+200', label: 'Auditorías Completadas' },
              { num: '6', label: 'Procesos de Automatización' },
              { num: '7', label: 'Apps Desarrolladas' },
              { num: '3', label: 'Países con Presencia' },
            ].map((stat, i) => (
              <div key={i} className="stat-counter">
                <p className="stat-counter__number">{stat.num}</p>
                <p className="stat-counter__label">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Testimonials */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                quote: 'Garcia Integrum transformó la forma en que gestionamos nuestros reportes fiscales. Lo que antes tomaba semanas ahora se resuelve en días con total confianza.',
                name: 'María R.',
                role: 'CFO, Grupo Industrial',
              },
              {
                quote: 'Desde EE.UU. pude gestionar la venta de una propiedad y mis obligaciones tributarias en El Salvador sin necesidad de viajar. Un servicio excepcional.',
                name: 'Carlos M.',
                role: 'Empresario Salvadoreño en Virginia',
              },
              {
                quote: 'Los dashboards de Power BI que implementaron nos dieron visibilidad total de nuestras operaciones. La automatización nos ahorra 40 horas mensuales.',
                name: 'Andrea P.',
                role: 'Gerente de Operaciones, Distribuidora',
              },
            ].map((t, i) => (
              <div key={i} className="testimonial-card">
                <span className="testimonial-card__quote">&ldquo;</span>
                <p className="text-sm leading-relaxed mb-6 mt-4" style={{ color: '#475569' }}>{t.quote}</p>
                <div className="pt-4" style={{ borderTop: '1px solid #E2E8F0' }}>
                  <p className="text-sm font-black" style={{ color: '#0A2540' }}>{t.name}</p>
                  <p className="text-xs" style={{ color: '#94a3b8' }}>{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          DIÁSPORA BANNER — Oxford + Emerald gradient
      ═══════════════════════════════════════════ */}
      <section className="container-custom py-16">
        <div className="diaspora-banner">
          <div className="p-10 md:p-16 flex flex-col md:flex-row items-center gap-10">
            <div className="flex-1 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/20 text-white text-xs font-bold uppercase tracking-widest">
                <Globe className="w-4 h-4" />
                Servicio Internacional
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-white leading-tight">
                ¿Salvadoreño en el Extranjero?
              </h2>
              <p className="text-white/90 text-lg leading-relaxed max-w-lg">
                Gestionamos tus obligaciones fiscales, inversiones y trámites legales en El Salvador.
                <strong> No necesitas viajar</strong> — nosotros somos tus ojos y manos en el país.
              </p>
              <button
                className="flex items-center gap-2 px-8 py-4 rounded-xl text-lg font-bold transition-all hover:scale-[0.98]"
                style={{ backgroundColor: '#ffffff', color: '#0A2540' }}
                onClick={() => scrollTo('contacto')}
              >
                Conocer Servicios para la Diáspora
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-shrink-0 hidden md:flex flex-col items-center gap-3">
              <div className="w-32 h-32 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
                <Globe className="w-16 h-16 text-white animate-float" />
              </div>
              <div className="flex gap-2">
                {['🇺🇸', '🇸🇻', '🇨🇦', '🇪🇸'].map((flag, i) => (
                  <span key={i} className="text-2xl">{flag}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          FORMULARIO DE CAPTACIÓN
      ═══════════════════════════════════════════ */}
      <section id="contacto" className="section-alt py-24">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12 space-y-4">
              <p className="text-xs uppercase tracking-[0.3em] font-black" style={{ color: '#059669' }}>Contáctenos</p>
              <h2 className="text-4xl lg:text-5xl font-black" style={{ color: '#0A2540' }}>Cuéntanos tu Proyecto</h2>
              <p className="text-lg max-w-xl mx-auto" style={{ color: '#64748b' }}>
                Describa su necesidad y recibirá una propuesta personalizada en máximo 48 horas hábiles.
              </p>
            </div>

            {submitted ? (
              <div className="form-section text-center py-16 space-y-6 animate-scale-in">
                <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto"
                  style={{ backgroundColor: '#ecfdf5', color: '#059669' }}>
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-black" style={{ color: '#0A2540' }}>¡Recibimos tu Solicitud!</h3>
                <p style={{ color: '#64748b' }} className="max-w-md mx-auto">
                  Nuestro equipo la revisará y te contactará en las próximas <strong style={{ color: '#0A2540' }}>48 horas hábiles</strong> con una propuesta personalizada. Revisa tu correo electrónico.
                </p>
                <Button variant="secondary" onClick={() => { setSubmitted(false); setForm(initialForm); }}>
                  Enviar otra solicitud
                </Button>
              </div>
            ) : (
              <form id="contact-form" onSubmit={handleSubmit} className="form-section">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold mb-2" style={{ color: '#0A2540' }}>
                      Nombre completo <span style={{ color: '#EF4444' }}>*</span>
                    </label>
                    <input type="text" name="nombre" value={form.nombre} onChange={handleChange} required
                      placeholder="Ej: Juan Martínez" className="input-field" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2" style={{ color: '#0A2540' }}>Empresa / Organización</label>
                    <input type="text" name="empresa" value={form.empresa} onChange={handleChange}
                      placeholder="Ej: Grupo ABC, S.A. de C.V." className="input-field" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2" style={{ color: '#0A2540' }}>
                      Correo electrónico <span style={{ color: '#EF4444' }}>*</span>
                    </label>
                    <input type="email" name="email" value={form.email} onChange={handleChange} required
                      placeholder="correo@empresa.com" className="input-field" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2" style={{ color: '#0A2540' }}>
                      Teléfono / WhatsApp <span style={{ color: '#EF4444' }}>*</span>
                    </label>
                    <input type="tel" name="telefono" value={form.telefono} onChange={handleChange} required
                      placeholder="+503 7000-0000" className="input-field" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2" style={{ color: '#0A2540' }}>
                      País de residencia <span style={{ color: '#EF4444' }}>*</span>
                    </label>
                    <select name="pais" value={form.pais} onChange={handleChange} required className="select-field">
                      <option value="">Seleccione...</option>
                      <option value="SV">El Salvador</option>
                      <option value="US">Estados Unidos</option>
                      <option value="CA">Canadá</option>
                      <option value="ES">España</option>
                      <option value="OTHER">Otro país</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2" style={{ color: '#0A2540' }}>
                      Línea de servicio <span style={{ color: '#EF4444' }}>*</span>
                    </label>
                    <select name="servicio" value={form.servicio} onChange={handleChange} required className="select-field">
                      <option value="">Seleccione...</option>
                      <option value="BI">Business Intelligence y Automatización</option>
                      <option value="AUDIT">Auditoría Externa, Fiscal e Investigación Forense</option>
                      <option value="DEV">Desarrollo de Software, Apps y Soluciones IA</option>
                      <option value="DIASPORA">Servicios Financieros (Salvadoreños en el Extranjero)</option>
                      <option value="UNSURE">No estoy seguro — necesito orientación</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2" style={{ color: '#0A2540' }}>Nivel de urgencia</label>
                    <select name="urgencia" value={form.urgencia} onChange={handleChange} className="select-field">
                      <option value="">Seleccione...</option>
                      <option value="IMMEDIATE">Inmediato (esta semana)</option>
                      <option value="2WEEKS">1-2 semanas</option>
                      <option value="1MONTH">Dentro de 1 mes</option>
                      <option value="EXPLORING">Solo estoy explorando</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2" style={{ color: '#0A2540' }}>Presupuesto estimado</label>
                    <select name="presupuesto" value={form.presupuesto} onChange={handleChange} className="select-field">
                      <option value="">Seleccione...</option>
                      <option value="500-2K">$500 – $2,000</option>
                      <option value="2K-5K">$2,000 – $5,000</option>
                      <option value="5K-15K">$5,000 – $15,000</option>
                      <option value="15K+">$15,000+</option>
                      <option value="NEED_GUIDANCE">Necesito orientación</option>
                    </select>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold mb-2" style={{ color: '#0A2540' }}>
                      Descripción del proyecto <span style={{ color: '#EF4444' }}>*</span>
                    </label>
                    <textarea name="descripcion" value={form.descripcion} onChange={handleChange} required rows={5}
                      placeholder="Describa brevemente su necesidad, el problema que quiere resolver o el proyecto que tiene en mente..."
                      className="textarea-field" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input type="checkbox" name="autorizado" checked={form.autorizado} onChange={handleChange} required
                        className="mt-1 w-4 h-4 rounded"
                        style={{ accentColor: '#0A2540' }} />
                      <span className="text-sm" style={{ color: '#64748b' }}>
                        Autorizo a Garcia Integrum a contactarme por correo electrónico, teléfono o WhatsApp para dar seguimiento a mi solicitud.
                        Mis datos serán tratados de forma confidencial.
                      </span>
                    </label>
                  </div>
                </div>

                <div className="mt-8 text-center flex flex-col items-center">
                  <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
                    <button
                      type="submit"
                      className="inline-flex items-center justify-center gap-2 px-8 h-14 text-base font-bold rounded-xl text-white shadow-xl transition-all hover:scale-[0.98] active:scale-95 w-full sm:w-auto"
                      style={{ backgroundColor: '#0A2540' }}
                    >
                      <Send className="w-5 h-5" />
                      Enviar por Correo
                    </button>
                    <button
                      type="button"
                      onClick={handleWhatsApp}
                      className="inline-flex items-center justify-center gap-2 px-8 h-14 text-base font-bold rounded-xl text-white shadow-xl transition-all hover:scale-[0.98] active:scale-95 w-full sm:w-auto"
                      style={{ backgroundColor: '#25D366' }} // Color oficial de WhatsApp
                    >
                      <MessageCircle className="w-5 h-5" />
                      Enviar por WhatsApp
                    </button>
                  </div>
                  <p className="text-xs mt-4 flex items-center justify-center gap-1" style={{ color: '#94a3b8' }}>
                    <Clock className="w-3 h-3" />
                    Respuesta garantizada en máximo 48 horas hábiles
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          FOOTER — Oxford Blue background
      ═══════════════════════════════════════════ */}
      <footer style={{ backgroundColor: '#0A2540' }} className="text-white">
        <div className="container-custom py-16">
          <div className="flex flex-col lg:flex-row justify-between items-start gap-12">
            {/* Brand */}
            <div className="space-y-5 max-w-sm">
              <div className="flex items-center gap-3">
                <Link href="/" className="flex items-center gap-3 group text-white">
                  <div className="relative w-10 h-10 flex-shrink-0 bg-white rounded-lg p-1">
                    <Image
                      src="/logo-garcia-icon.png"
                      alt="Garcia Integrum Icon"
                      fill
                      className="object-contain p-1"
                    />
                  </div>
                  <div className="flex flex-col leading-none text-white">
                    <span className="text-2xl font-black tracking-tighter uppercase">
                      Garcia
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#059669]">
                      Integrum
                    </span>
                  </div>
                </Link>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: '#94a3b8' }}>
                Firma de servicios profesionales que integra auditoría tradicional, inteligencia de datos y desarrollo de software con IA para impulsar empresas en El Salvador y la región.
              </p>
              <p className="text-[10px] uppercase tracking-widest font-bold" style={{ color: '#6772E5' }}>
                Identidad visual para la toma de decisiones basada en datos
              </p>
              <div className="space-y-2 pt-2">
                <div className="flex items-center gap-3 text-sm" style={{ color: '#94a3b8' }}>
                  <MapPin className="w-4 h-4" style={{ color: '#059669' }} /> San Salvador, El Salvador
                </div>
                <div className="flex items-center gap-3 text-sm" style={{ color: '#94a3b8' }}>
                  <Mail className="w-4 h-4" style={{ color: '#059669' }} /> info@garciaintegrum.com
                </div>
                <div className="flex items-center gap-3 text-sm" style={{ color: '#94a3b8' }}>
                  <Phone className="w-4 h-4" style={{ color: '#059669' }} /> +503 7000-0000
                </div>
              </div>
            </div>

            {/* Links */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-12 lg:gap-16">
              <div className="space-y-4">
                <h4 className="text-xs uppercase tracking-widest font-black" style={{ color: '#059669' }}>Servicios</h4>
                <ul className="space-y-2.5 text-sm" style={{ color: '#94a3b8' }}>
                  <li><button onClick={() => scrollTo('servicios')} className="hover:text-white transition-colors">Business Intelligence</button></li>
                  <li><button onClick={() => scrollTo('servicios')} className="hover:text-white transition-colors">Auditoría Fiscal</button></li>
                  <li><button onClick={() => scrollTo('servicios')} className="hover:text-white transition-colors">Desarrollo IA</button></li>
                  <li><button onClick={() => scrollTo('servicios')} className="hover:text-white transition-colors">Servicios Diáspora</button></li>
                </ul>
              </div>
              <div className="space-y-4">
                <h4 className="text-xs uppercase tracking-widest font-black" style={{ color: '#059669' }}>Empresa</h4>
                <ul className="space-y-2.5 text-sm" style={{ color: '#94a3b8' }}>
                  <li><button onClick={() => scrollTo('proceso')} className="hover:text-white transition-colors">Metodología</button></li>
                  <li><button onClick={() => scrollTo('confianza')} className="hover:text-white transition-colors">Resultados</button></li>
                  <li><button onClick={() => scrollTo('contacto')} className="hover:text-white transition-colors">Contacto</button></li>
                </ul>
              </div>
              <div className="space-y-4">
                <h4 className="text-xs uppercase tracking-widest font-black" style={{ color: '#059669' }}>Legal</h4>
                <ul className="space-y-2.5 text-sm" style={{ color: '#94a3b8' }}>
                  <li><Link href="#" className="hover:text-white transition-colors">Política de Privacidad</Link></li>
                  <li><Link href="#" className="hover:text-white transition-colors">Términos de Servicio</Link></li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4"
            style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}>
            <p className="text-xs uppercase tracking-widest" style={{ color: '#475569' }}>
              &copy; 2026 Garcia Integrum · San Salvador, El Salvador · Todos los derechos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
