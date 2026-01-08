import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Download, Github, Lock, Zap, ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import icon from "@/assets/cerocloud-icon.png";
import dashboardDark from "@/assets/dashboard-dark.png";
import dashboardLight from "@/assets/dashboard-light.png";
import { useTheme } from "@/contexts/ThemeContext";
import { useLatestRelease } from "@/lib/useLatestRelease";

export default function Hero() {
    const { theme } = useTheme();
    const { release, loading } = useLatestRelease();
    console.log("Hero rendering. Loading:", loading, "Release:", release);

    return (
        <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-background to-primary/5">
            {/* Animated grid background */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

            {/* Animated gradient orbs */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className="absolute top-1/4 -left-48 w-96 h-96 bg-primary/20 rounded-full blur-3xl"
                />
                <motion.div
                    animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 1,
                    }}
                    className="absolute bottom-1/4 -right-48 w-96 h-96 bg-primary/20 rounded-full blur-3xl"
                />
            </div>

            <div className="container mx-auto px-4 py-12 lg:py-24 relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left side - Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center lg:text-left"
                    >
                        {/* Logo - Large and Bold */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2, duration: 0.6 }}
                            className="mb-10 flex justify-center lg:justify-start"
                        >
                            <div className="flex items-center gap-6">
                                <motion.div
                                    whileHover={{ scale: 1.1, rotate: 5 }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                    className="relative w-24 h-24 md:w-36 md:h-36"
                                >
                                    {/* Glow effect */}
                                    <div className="absolute inset-0 bg-primary/20 rounded-3xl blur-2xl" />
                                    {/* Icon */}
                                    <img src={icon} alt="CeroCloud Icon" className="relative w-full h-full drop-shadow-2xl" />
                                </motion.div>
                                <div>
                                    <h2 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight">CeroCloud</h2>
                                    <p className="text-sm md:text-base lg:text-lg text-muted-foreground font-medium mt-1">Local. Seguro. Profesional.</p>
                                </div>
                            </div>
                        </motion.div>

                        {/* Main Headline with enhanced gradient */}
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 0.6 }}
                            className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold mb-4 md:mb-6 leading-tight"
                        >
                            Gestión Empresarial{" "}
                            <span className="bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent animate-gradient">
                                100% Local
                            </span>
                        </motion.h1>

                        {/* Enhanced Slogan */}
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5, duration: 0.6 }}
                            className="text-xl md:text-2xl text-muted-foreground mb-6 max-w-2xl mx-auto lg:mx-0"
                        >
                            Sin nube. Sin suscripciones.{" "}
                            <span className="text-foreground font-semibold">Control total de tus datos.</span>
                        </motion.p>

                        {/* Value proposition */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6, duration: 0.6 }}
                            className="mb-8 space-y-3"
                        >
                            {[
                                "Control total de tus datos en tu negocio",
                                "Seguridad empresarial sin costos mensuales",
                                "Datos privados, seguros y siempre disponibles",
                            ].map((text, index) => (
                                <motion.div
                                    key={text}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.7 + index * 0.1 }}
                                    className="flex items-center gap-3 justify-center lg:justify-start"
                                >
                                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                                    <span className="text-sm md:text-base text-muted-foreground">{text}</span>
                                </motion.div>
                            ))}
                        </motion.div>

                        {/* Premium badges */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.9, duration: 0.6 }}
                            className="flex flex-wrap gap-3 justify-center lg:justify-start mb-10"
                        >
                            {[
                                { label: "100% Gratuito", icon: Lock },
                                { label: "AES-256", icon: Lock },
                                { label: "Sin Internet", icon: Zap },
                            ].map((badge, index) => (
                                <motion.div
                                    key={badge.label}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 1.0 + index * 0.1, duration: 0.4 }}
                                    whileHover={{ scale: 1.05, y: -2 }}
                                    className="group px-4 py-2 bg-primary/10 hover:bg-primary/20 border border-primary/20 hover:border-primary/40 rounded-full text-sm font-medium transition-all cursor-default shadow-sm hover:shadow-md"
                                >
                                    <div className="flex items-center gap-2">
                                        <badge.icon className="w-4 h-4 text-primary" />
                                        <span>{badge.label}</span>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>

                        {/* Enhanced CTAs */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1.2, duration: 0.6 }}
                            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start w-full sm:w-auto"
                        >
                            <Link to="/releases" className="w-full sm:w-auto">
                                <Button size="lg" className="text-lg px-8 py-6 group shadow-lg hover:shadow-xl transition-all w-full">
                                    <Download className="mr-2 h-5 w-5 group-hover:animate-bounce" />
                                    Descargar Ahora
                                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                                </Button>
                            </Link>
                            <a href="https://github.com/CeroCloud/CeroCloud-Desktop" target="_blank" rel="noreferrer" className="w-full sm:w-auto">
                                <Button size="lg" variant="outline" className="text-lg px-8 py-6 group border-2 hover:border-primary/50 w-full">
                                    <Github className="mr-2 h-5 w-5" />
                                    Ver en GitHub
                                </Button>
                            </a>
                        </motion.div>

                        {/* Version Badge with enhanced styling */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1.4, duration: 0.6 }}
                            className="mt-8 inline-flex items-center gap-2 px-4 py-2 bg-muted/50 backdrop-blur-sm border border-border/50 rounded-full"
                        >
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                            <span className="text-sm text-muted-foreground">
                                Versión actual:{" "}
                                <span className="font-semibold text-foreground">
                                    {loading ? "Cargando..." : (release?.tag_name || "Unknown")} - {loading ? "" : (release?.name || "Release")}
                                </span>
                            </span>
                        </motion.div>
                    </motion.div>

                    {/* Right side - Enhanced Visual */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                        className="relative hidden lg:block"
                    >
                        <div className="relative">
                            {/* Main showcase card */}
                            <motion.div
                                whileHover={{ scale: 1.02 }}
                                transition={{ duration: 0.3 }}
                                className="relative bg-gradient-to-br from-primary/20 via-primary/10 to-primary/5 rounded-2xl border-2 border-primary/20 p-8 backdrop-blur-sm shadow-2xl"
                            >
                                <div className="aspect-video bg-gradient-to-br from-muted/30 to-muted/10 rounded-xl border border-border overflow-hidden shadow-inner p-4">
                                    <motion.img
                                        key={theme}
                                        src={theme === "dark" ? dashboardDark : dashboardLight}
                                        alt="CeroCloud Dashboard - Premium Glass Interface"
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ duration: 0.5 }}
                                        className="w-full h-full object-contain rounded-lg"
                                    />
                                </div>
                            </motion.div>

                            {/* Enhanced floating elements */}
                            <motion.div
                                animate={{
                                    y: [0, -10, 0],
                                }}
                                transition={{
                                    duration: 3,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                }}
                                whileHover={{ scale: 1.05 }}
                                className="absolute -top-6 -right-6 bg-card/90 backdrop-blur-md border-2 border-primary/30 rounded-xl p-4 shadow-xl cursor-default"
                            >
                                <div className="flex items-center gap-2">
                                    <Lock className="w-4 h-4 text-primary" />
                                    <p className="text-sm font-semibold">Cifrado AES-256</p>
                                </div>
                            </motion.div>

                            <motion.div
                                animate={{
                                    y: [0, 10, 0],
                                }}
                                transition={{
                                    duration: 4,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                    delay: 0.5,
                                }}
                                whileHover={{ scale: 1.05 }}
                                className="absolute -bottom-6 -left-6 bg-card/90 backdrop-blur-md border-2 border-primary/30 rounded-xl p-4 shadow-xl cursor-default"
                            >
                                <div className="flex items-center gap-2">
                                    <Zap className="w-4 h-4 text-primary" />
                                    <p className="text-sm font-semibold">SQLite Local</p>
                                </div>
                            </motion.div>

                            {/* Additional floating badge */}
                            <motion.div
                                animate={{
                                    y: [0, -8, 0],
                                    rotate: [0, 2, 0],
                                }}
                                transition={{
                                    duration: 5,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                    delay: 1,
                                }}
                                whileHover={{ scale: 1.05 }}
                                className="absolute top-1/2 -left-8 bg-gradient-to-br from-primary/20 to-primary/10 backdrop-blur-md border-2 border-primary/30 rounded-xl p-3 shadow-xl cursor-default"
                            >
                                <div className="flex flex-col items-center gap-1">
                                    <span className="text-2xl font-bold text-primary">100%</span>
                                    <span className="text-xs font-semibold text-muted-foreground">Gratuito</span>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Scroll indicator */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2, duration: 0.6 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden lg:block"
            >
                <motion.div
                    animate={{
                        y: [0, 8, 0],
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className="flex flex-col items-center gap-2 text-muted-foreground cursor-pointer"
                >
                    <span className="text-sm font-medium">Descubre más</span>
                    <ArrowRight className="w-5 h-5 rotate-90" />
                </motion.div>
            </motion.div>
        </section>
    );
}
