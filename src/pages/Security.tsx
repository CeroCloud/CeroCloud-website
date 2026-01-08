import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { Shield, Lock, WifiOff, Server, Key, FileJson } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function Security() {
    const navigate = useNavigate();

    const features = [
        {
            icon: Lock,
            title: "Cifrado Militar AES-256",
            description: "Tus backups no son simples archivos. Utilizamos el estándar de cifrado avanzado (AES) de 256 bits para asegurar que solo tú tengas acceso a tu información crítica."
        },
        {
            icon: Server,
            title: "Base de Datos SQLite Local",
            description: "Olvídate de servidores externos lentos o vulnerables. Tus datos viven en tu disco duro, optimizados con SQLite y modo WAL para un rendimiento instantáneo."
        },
        {
            icon: WifiOff,
            title: "Arquitectura Offline-First",
            description: "CeroCloud no necesita internet para funcionar. Si se cae la red, tu negocio sigue operando sin interrupciones. Cero dependencias externas."
        },
        {
            icon: Key,
            title: "Propiedad Total",
            description: "No hay 'Términos de Servicio' ocultos sobre el uso de tus datos. Tú eres el único dueño y administrador de tu base de datos y tus clientes."
        }
    ];

    return (
        <div className="min-h-screen bg-background pt-8 pb-20">
            <Helmet>
                <title>Seguridad y Privacidad - CeroCloud (AES-256)</title>
                <meta name="description" content="Tus datos, tu propiedad. Descubre cómo CeroCloud protege tu negocio con cifrado AES-256, base de datos local (SQLite) y funcionamiento 100% offline." />
                <meta name="keywords" content="seguridad datos pos, cifrado aes-256, software local seguro, privacidad empresarial, sin nube, offline first" />

                {/* Open Graph */}
                <meta property="og:title" content="Seguridad de Grado Militar - CeroCloud" />
                <meta property="og:description" content="Olvídate de las brechas de seguridad en la nube. CeroCloud mantiene tus datos cifrados y locales." />
                <meta property="og:url" content="https://daaniieel123.github.io/CeroCloud/security" />

                <link rel="canonical" href="https://daaniieel123.github.io/CeroCloud/security" />
            </Helmet>

            {/* Hero Section */}
            <div className="container mx-auto px-4 text-center max-w-4xl mb-24">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-6 text-primary">
                        <Shield className="w-8 h-8" />
                    </div>
                    <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-6 tracking-tight">
                        Tus Datos. Tu Control. <br />
                        <span className="text-primary">Sin Intermediarios.</span>
                    </h1>
                    <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                        En una era donde todo está en la nube, nosotros te devolvemos el poder.
                        CeroCloud está diseñado desde cero con la privacidad y la soberanía de datos como prioridad absoluta.
                    </p>
                </motion.div>
            </div>

            {/* Diagram / Visual Representation */}
            <div className="container mx-auto px-4 mb-32">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="relative max-w-5xl mx-auto bg-muted/20 rounded-3xl p-6 md:p-16 border border-white/5 overflow-hidden"
                >
                    {/* Background decorations */}
                    <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,_rgba(59,130,246,0.1),_transparent_70%)]" />

                    <div className="relative grid md:grid-cols-3 gap-8 items-center text-center">
                        <div className="bg-background/80 backdrop-blur-sm p-6 rounded-2xl border border-border shadow-lg">
                            <FileJson className="w-12 h-12 text-blue-500 mx-auto mb-4" />
                            <h3 className="font-bold mb-2">Tus Datos (.db)</h3>
                            <p className="text-xs text-muted-foreground">Almacenados localmente</p>
                        </div>

                        <div className="hidden md:flex justify-center items-center">
                            <div className="w-full h-1 bg-gradient-to-r from-blue-500/20 via-primary to-blue-500/20 relative">
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-background p-2 rounded-full border border-primary">
                                    <Lock className="w-4 h-4 text-primary" />
                                </div>
                            </div>
                        </div>

                        {/* Mobile Vertical Pipe */}
                        <div className="md:hidden flex justify-center py-4">
                            <div className="h-12 w-1 bg-gradient-to-b from-blue-500/20 via-primary to-blue-500/20 relative">
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-background p-2 rounded-full border border-primary">
                                    <Lock className="w-4 h-4 text-primary" />
                                </div>
                            </div>
                        </div>

                        <div className="bg-background/80 backdrop-blur-sm p-6 rounded-2xl border border-border shadow-lg">
                            <Server className="w-12 h-12 text-primary mx-auto mb-4" />
                            <h3 className="font-bold mb-2">Nube (No existe)</h3>
                            <p className="text-xs text-muted-foreground">Cero conexión externa</p>
                        </div>
                    </div>

                    <div className="text-center mt-12">
                        <p className="text-sm font-mono text-primary/80 bg-primary/10 inline-block px-4 py-2 rounded-lg border border-primary/20">
                            Protocolo: Local-Only • Cifrado: AES-256-CBC • Dependencia: 0%
                        </p>
                    </div>
                </motion.div>
            </div>

            {/* Features Grid */}
            <div className="container mx-auto px-4 max-w-6xl">
                <div className="grid md:grid-cols-2 gap-6 lg:gap-12">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="flex gap-6 p-6 rounded-2xl bg-muted/30 hover:bg-muted/50 transition-colors border border-transparent hover:border-primary/10"
                        >
                            <div className="flex-shrink-0">
                                <div className="p-3 bg-background rounded-xl shadow-sm">
                                    <feature.icon className="w-6 h-6 text-primary" />
                                </div>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                                <p className="text-muted-foreground leading-relaxed">
                                    {feature.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* CTA */}
            <div className="container mx-auto px-4 mt-32 text-center">
                <h2 className="text-2xl font-bold mb-6">Protege tu negocio hoy mismo</h2>
                <Button size="lg" onClick={() => navigate("/releases")} className="px-8">
                    Descargar CeroCloud
                </Button>
            </div>
        </div>
    );
}
