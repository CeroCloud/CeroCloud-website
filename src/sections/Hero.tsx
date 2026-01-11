import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Download, Github, Lock, Zap, ArrowRight, CheckCircle2, LayoutDashboard } from "lucide-react";
import { Button } from "@/components/ui/button";
import icon from "@/assets/cerocloud-icon.png";
import dashboardDark from "@/assets/dashboard-dark.png";
import dashboardLight from "@/assets/dashboard-light.png";
import { useTheme } from "@/contexts/ThemeContext";
import { useLatestRelease } from "@/lib/useLatestRelease";

export default function Hero() {
    const { t } = useTranslation('landing');
    const { theme } = useTheme();
    const { release, loading } = useLatestRelease();

    // Use specific image based on theme, efficient LCP
    const dashboardImage = theme === "dark" ? dashboardDark : dashboardLight;

    return (
        <section id="hero" className="relative min-h-[calc(100vh-80px)] lg:min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-background to-primary/5">
            {/* Animated grid background */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

            {/* Animated gradient orbs (Optimized with simpler animations) */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40 lg:opacity-100">
                <motion.div
                    animate={{
                        scale: [1, 1.1, 1],
                        opacity: [0.3, 0.4, 0.3],
                    }}
                    transition={{
                        duration: 12,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className="absolute top-1/4 -left-48 w-96 h-96 bg-primary/20 rounded-full blur-3xl will-change-transform"
                />
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.4, 0.3],
                    }}
                    transition={{
                        duration: 15,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 1,
                    }}
                    className="absolute bottom-1/4 -right-48 w-96 h-96 bg-primary/20 rounded-full blur-3xl will-change-transform"
                />
            </div>

            <div className="container mx-auto px-4 py-12 lg:py-24 relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left side - Content */}
                    <div className="text-center lg:text-left">
                        {/* Logo - Large and Bold */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5 }}
                            className="mb-8 flex justify-center lg:justify-start"
                        >
                            <div className="flex items-center gap-6">
                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    className="relative w-24 h-24 md:w-32 md:h-32"
                                >
                                    {/* Icon */}
                                    <img
                                        src={icon}
                                        alt="CeroCloud Icon"
                                        width="128"
                                        height="128"
                                        className="relative w-full h-full drop-shadow-2xl"
                                    />
                                </motion.div>
                                <div>
                                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-2">CeroCloud</h2>
                                    <p className="text-sm md:text-base text-muted-foreground font-medium">{t('hero.subtitle')}</p>
                                </div>
                            </div>
                        </motion.div>

                        {/* Main Headline */}
                        <motion.h1
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1, duration: 0.5 }}
                            className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4 md:mb-6 leading-tight"
                        >
                            {t('hero.headline_start')}{" "}
                            <span className="bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent animate-gradient">
                                {t('hero.headline_highlight')}
                            </span>
                        </motion.h1>

                        {/* Slogan */}
                        <motion.p
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.5 }}
                            className="text-lg md:text-xl text-muted-foreground mb-6 max-w-2xl mx-auto lg:mx-0"
                        >
                            {t('hero.slogan_start')}{" "}
                            <span className="text-foreground font-semibold">{t('hero.slogan_highlight')}</span>
                        </motion.p>

                        {/* Value proposition */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3, duration: 0.5 }}
                            className="mb-8 space-y-2"
                        >
                            {[
                                t('hero.features.control'),
                                t('hero.features.security'),
                                t('hero.features.privacy'),
                            ].map((text, index) => (
                                <div
                                    key={index}
                                    className="flex items-center gap-3 justify-center lg:justify-start"
                                >
                                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                                    <span className="text-sm md:text-base text-muted-foreground">{text}</span>
                                </div>
                            ))}
                        </motion.div>

                        {/* Premium badges */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4, duration: 0.5 }}
                            className="flex flex-wrap gap-3 justify-center lg:justify-start mb-10"
                        >
                            {[
                                { label: t('hero.badges.free'), icon: Lock },
                                { label: "AES-256", icon: Lock },
                                { label: t('hero.badges.offline'), icon: Zap },
                            ].map((badge) => (
                                <div
                                    key={badge.label}
                                    className="px-4 py-2 bg-muted/40 border border-border/60 rounded-full text-sm font-medium flex items-center gap-2 hover:bg-muted/60 transition-colors"
                                >
                                    <badge.icon className="w-4 h-4 text-primary" />
                                    <span>{badge.label}</span>
                                </div>
                            ))}
                        </motion.div>

                        {/* Enhanced CTAs - CONVERSION OPTIMIZED */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5, duration: 0.5 }}
                            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start w-full sm:w-auto flex-wrap"
                        >
                            <Link to="/releases" className="w-full sm:w-auto">
                                <Button size="lg" className="w-full md:w-auto text-lg px-8 py-6 shadow-xl shadow-primary/20 hover:shadow-primary/40 hover:-translate-y-1 transition-all bg-gradient-to-r from-primary to-blue-600 hover:to-blue-500 border-0 ring-offset-2 focus:ring-2 relative overflow-hidden group">
                                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                                    <Download className="mr-2 h-5 w-5 relative z-10" />
                                    <span className="relative z-10 font-bold tracking-wide">{t('hero.cta.download')}</span>
                                </Button>
                            </Link>

                            <Link to="/demo" className="w-full sm:w-auto">
                                <Button size="lg" variant="secondary" className="text-lg px-8 py-6 shadow-sm hover:shadow-md transition-all w-full md:w-auto border border-border/50 hover:bg-secondary/80">
                                    <LayoutDashboard className="mr-2 h-5 w-5" />
                                    {t('hero.cta.demo')}
                                </Button>
                            </Link>

                            <a href="https://github.com/CeroCloud/CeroCloud-Desktop" target="_blank" rel="noreferrer" className="w-full sm:w-auto">
                                <Button size="lg" variant="outline" className="text-lg px-8 py-6 w-full md:w-auto hover:bg-background/80">
                                    <Github className="mr-2 h-5 w-5" />
                                    {t('hero.cta.github')}
                                </Button>
                            </a>
                        </motion.div>

                        {/* Version Badge */}
                        <div className="mt-8 inline-flex items-center gap-2 px-4 py-2 bg-muted/30 backdrop-blur-sm border border-border/40 rounded-full">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                            <span className="text-sm text-muted-foreground">
                                {t('hero.version.label')}{" "}
                                <span className="font-semibold text-foreground">
                                    {loading ? "..." : (release?.tag_name || "v1.0.0")}
                                </span>
                            </span>
                        </div>
                    </div>

                    {/* Right side - Enhanced Visual (LCP Optimized) */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2, duration: 0.8 }}
                        className="relative hidden lg:block"
                    >
                        <div className="relative">
                            {/* Main showcase card */}
                            <div className="relative bg-gradient-to-br from-primary/10 via-transparent to-transparent rounded-2xl border border-primary/10 p-2 backdrop-blur-sm shadow-2xl">
                                <div className="aspect-video bg-muted/20 rounded-xl overflow-hidden shadow-inner">
                                    {/* PRIORITIZED IMAGE LOADING */}
                                    <img
                                        src={dashboardImage}
                                        alt="CeroCloud Dashboard Interface"
                                        width="1200"
                                        height="675"
                                        className="w-full h-full object-contain rounded-lg"
                                        decoding="sync"
                                        loading="eager"
                                        // @ts-ignore
                                        fetchpriority="high"
                                    />
                                </div>
                            </div>

                            {/* Floating elements (Pure CSS animation) */}
                            <div className="absolute -top-6 -right-6 bg-card/90 backdrop-blur-md border border-border/50 rounded-xl p-4 shadow-xl animate-[float_6s_ease-in-out_infinite]">
                                <div className="flex items-center gap-2">
                                    <Lock className="w-4 h-4 text-primary" />
                                    <p className="text-sm font-semibold">AES-256</p>
                                </div>
                            </div>

                            <div className="absolute -bottom-6 -left-6 bg-card/90 backdrop-blur-md border border-border/50 rounded-xl p-4 shadow-xl animate-[float_8s_ease-in-out_infinite_1s]">
                                <div className="flex items-center gap-2">
                                    <Zap className="w-4 h-4 text-primary" />
                                    <p className="text-sm font-semibold">Local & Fast</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Scroll indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-2 opacity-50 animate-bounce">
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-widest">{t('hero.scroll_more')}</span>
                <ArrowRight className="w-4 h-4 rotate-90 text-muted-foreground" />
            </div>
        </section>
    );
}
