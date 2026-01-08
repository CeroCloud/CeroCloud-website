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
                <meta property="og:url" content="https://cerocloud.github.io/CeroCloud-website/" />
                <meta property="og:title" content="CeroCloud - Gestión Empresarial Local y Segura" />
                <meta property="og:description" content="El sistema de gestión que corre en TU computadora. Sin nube, sin rentas, sin riesgos. Dashboard, POS e Inventario en un solo lugar." />
                <meta property="og:image" content="https://cerocloud.github.io/CeroCloud-website/assets/dashboard-light.png" />
                <meta property="og:image:alt" content="Dashboard de CeroCloud mostrando estadísticas de ventas e inventario" />
                <meta property="og:image:width" content="1200" />
                <meta property="og:image:height" content="630" />

                {/* Twitter */}
                <meta property="twitter:card" content="summary_large_image" />
                <meta property="twitter:url" content="https://cerocloud.github.io/CeroCloud-website/" />
                <meta property="twitter:title" content="CeroCloud - Software POS e Inventario Gratuito" />
                <meta property="twitter:description" content="Olvídate de pagar suscripciones. CeroCloud es tu centro de comando local. Rápido, seguro y elegante." />
                <meta property="twitter:image" content="https://cerocloud.github.io/CeroCloud-website/assets/dashboard-light.png" />
                <meta property="twitter:image:alt" content="Dashboard de CeroCloud con métricas en tiempo real" />

                <link rel="canonical" href="https://cerocloud.github.io/CeroCloud-website/" />
            </Helmet>

            <Hero />
            <Stats />
            <Features />
            <Modules />

            <Download />
        </>
    );
}
