import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Garcia Integrum — Auditoría, BI, Software e IA | El Salvador",
  description:
    "Garcia Integrum: Firma de servicios profesionales en auditoría fiscal, business intelligence, desarrollo de software con IA y servicios financieros. Integridad y estrategia para empresas.",
  keywords: [
    "Garcia Integrum",
    "auditoría fiscal El Salvador",
    "dictamen fiscal",
    "automatización empresarial",
    "Power BI El Salvador",
    "desarrollo software IA",
    "servicios financieros diáspora salvadoreña",
    "consultoría tecnológica El Salvador",
    "investigación forense financiera",
    "NIIF El Salvador",
    "business intelligence San Salvador",
  ],
  authors: [{ name: "Garcia Integrum" }],
  manifest: "/manifest.json",
  openGraph: {
    title: "Garcia Integrum — Servicios Profesionales de Alto Impacto",
    description:
      "Auditoría Fiscal, Business Intelligence, Desarrollo de Software con IA y Servicios Financieros para empresas y salvadoreños en el extranjero.",
    type: "website",
    locale: "es_SV",
    siteName: "Garcia Integrum",
  },
  twitter: {
    card: "summary_large_image",
    title: "Garcia Integrum — Auditoría, BI, Software e IA",
    description:
      "Impulsamos empresas con auditoría de precisión, inteligencia de datos y tecnología que transforma.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="smooth-scroll">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
