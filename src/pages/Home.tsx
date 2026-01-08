import { Helmet } from "react-helmet-async";
import Hero from "@/sections/Hero";
import Stats from "@/sections/Stats";
import Features from "@/sections/Features";
import Modules from "@/sections/Modules";
import Download from "@/sections/Download";

export default function Home() {
    return (
        <>
            <Helmet>
                <title>CeroCloud - Software POS e Inventario 100% Local</title>
                <meta
                    name="description"
                    content="Sistema de Punto de Venta (POS) e Inventario diseñado para escritorio. Funciona sin internet, sin suscripciones mensuales y con control total de tus datos. Descarga gratis."
                />
                <meta
                    name="keywords"
                    content="CeroCloud, software punto de venta, sistema de inventario, pos escritorio, software gratuito, sin internet, offline pos, gestión de negocios, electron react"
                />

                {/* Facebook / Open Graph */}
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://daaniieel123.github.io/CeroCloud/" />
                <meta property="og:title" content="CeroCloud - Gestión Empresarial Local y Segura" />
                <meta property="og:description" content="El sistema de gestión que corre en TU computadora. Sin nube, sin rentas, sin riesgos. Dashboard, POS e Inventario en un solo lugar." />
                <meta property="og:image" content="https://daaniieel123.github.io/CeroCloud/og-image.jpg" />

                {/* Twitter */}
                <meta property="twitter:card" content="summary_large_image" />
                <meta property="twitter:url" content="https://daaniieel123.github.io/CeroCloud/" />
                <meta property="twitter:title" content="CeroCloud - Software POS e Inventario Gratuito" />
                <meta property="twitter:description" content="Olvídate de pagar suscripciones. CeroCloud es tu centro de comando local. Rápido, seguro y elegante." />
                <meta property="twitter:image" content="https://daaniieel123.github.io/CeroCloud/og-image.jpg" />

                <link rel="canonical" href="https://daaniieel123.github.io/CeroCloud/" />
            </Helmet>

            <Hero />
            <Stats />
            <Features />
            <Modules />

            <Download />
        </>
    );
}
