import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { Heart, Globe, Zap, Users, Lock } from "lucide-react";
import logo from "@/assets/cerocloud-icon.png";

export default function About() {
    return (
        <div className="min-h-screen bg-background pt-24 pb-20">
            <Helmet>
                <title>Acerca de CeroCloud - Nuestra Misión</title>
                <meta name="description" content="Conoce la filosofía detrás de CeroCloud: Software de gestión 100% local, gratuito y sin suscripciones." />
            </Helmet>

            <div className="container mx-auto px-4 max-w-4xl">
                {/* Hero */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-20"
                >
                    <img src={logo} alt="CeroCloud Logo" className="w-24 h-24 mx-auto mb-6 drop-shadow-2xl" />
                    <h1 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight">
                        Democratizando la <span className="text-primary">Gestión Empresarial</span>
                    </h1>
                    <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                        Creemos que todo negocio, sin importar su tamaño, merece herramientas profesionales sin barreras económicas ni dependencia de la nube.
                    </p>
                </motion.div>

                {/* Philosophy Grid */}
                <div className="grid md:grid-cols-2 gap-8 mb-24">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="bg-muted/30 p-8 rounded-3xl border border-primary/10"
                    >
                        <Lock className="w-10 h-10 text-primary mb-6" />
                        <h3 className="text-2xl font-bold mb-4">Privacidad Absoluta</h3>
                        <p className="text-muted-foreground leading-relaxed">
                            A diferencia del software en la nube, CeroCloud almacena el 100% de tus datos en tu equipo.
                            Sin telemetría, sin rastreo y sin servidores externos. Tu negocio es solo tuyo.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="bg-muted/30 p-8 rounded-3xl border border-primary/10"
                    >
                        <Zap className="w-10 h-10 text-primary mb-6" />
                        <h3 className="text-2xl font-bold mb-4">Sin Costos Ocultos</h3>
                        <p className="text-muted-foreground leading-relaxed">
                            Olvídate de las suscripciones mensuales de $50 USD. CeroCloud es gratuito para siempre
                            gracias a su modelo de código abierto y arquitectura local eficiente.
                        </p>
                    </motion.div>
                </div>

                {/* Mission Quote */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="text-center mb-24 relative"
                >
                    <div className="absolute inset-0 bg-primary/5 blur-3xl rounded-full" />
                    <blockquote className="relative text-2xl md:text-3xl font-medium italic leading-relaxed text-foreground/90">
                        "Nuestra misión es convertirnos en el estándar mundial para negocios que valoran la privacidad, el control y la sostenibilidad económica."
                    </blockquote>
                </motion.div>

                {/* Team & Community */}
                <div className="mb-20">
                    <h2 className="text-3xl font-bold mb-10 text-center flex items-center justify-center gap-3">
                        <Users className="w-8 h-8 text-primary" />
                        Equipo y Comunidad
                    </h2>

                    <div className="bg-gradient-to-br from-background to-muted/50 p-8 rounded-3xl border border-border shadow-sm">
                        <div className="flex flex-col md:flex-row items-center gap-8">
                            <div className="flex-1 text-center md:text-left">
                                <h3 className="text-xl font-bold mb-6">Equipo de Desarrollo</h3>

                                <div className="space-y-6">
                                    <div className="flex flex-col md:items-start items-center">
                                        <h4 className="font-bold text-lg">Daniel Ortiz</h4>
                                        <p className="text-sm text-muted-foreground mb-1">Lead Developer</p>
                                        <a
                                            href="https://github.com/DaaNiieeL123"
                                            target="_blank"
                                            rel="noreferrer"
                                            className="text-primary hover:text-primary/80 transition-colors text-sm flex items-center gap-1.5"
                                        >
                                            <Globe className="w-3.5 h-3.5" />
                                            @DaaNiieeL123
                                        </a>
                                    </div>

                                    <div className="flex flex-col md:items-start items-center">
                                        <h4 className="font-bold text-lg">Josue Vaquiax</h4>
                                        <p className="text-sm text-muted-foreground mb-1">Developer</p>
                                        <a
                                            href="https://github.com/Jsue46"
                                            target="_blank"
                                            rel="noreferrer"
                                            className="text-primary hover:text-primary/80 transition-colors text-sm flex items-center gap-1.5"
                                        >
                                            <Globe className="w-3.5 h-3.5" />
                                            @Jsue46
                                        </a>
                                    </div>
                                </div>
                            </div>

                            <div className="flex-1 border-l border-border pl-8 hidden md:block">
                                <h4 className="font-bold mb-4 text-sm uppercase tracking-wider text-muted-foreground">Tecnologías Core</h4>
                                <div className="flex flex-wrap gap-3">
                                    {["Electron", "React", "TypeScript", "SQLite", "Tailwind"].map((tech) => (
                                        <span key={tech} className="px-3 py-1 bg-background border border-border rounded-full text-xs font-semibold">
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* CTA */}
                <div className="text-center">
                    <div className="inline-flex items-center gap-2 text-muted-foreground text-sm mb-8">
                        <Heart className="w-4 h-4 text-red-500 fill-red-500" />
                        <span>Hecho con amor para la comunidad Open Source</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
