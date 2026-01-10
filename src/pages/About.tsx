import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { Heart, Globe, Zap, Users, Lock } from "lucide-react";
import logo from "@/assets/cerocloud-icon.png";
import { useTranslation } from "react-i18next";

export default function About() {
    const { t } = useTranslation('about');

    return (
        <div className="min-h-screen bg-background pt-24 pb-20">
            <Helmet>
                <title>{t('about.seo.title')}</title>
                <meta name="description" content={t('about.seo.description')} />

                {/* Open Graph */}
                <meta property="og:title" content={t('about.seo.og_title')} />
                <meta property="og:description" content={t('about.seo.og_description')} />
                <meta property="og:url" content="https://cerocloud.github.io/CeroCloud-website/about" />
                <meta property="og:image" content="https://cerocloud.github.io/CeroCloud-website/assets/dashboard-light.png" />
                <meta property="og:image:alt" content={t('about.seo.og_image_alt')} />
                <meta property="og:type" content="website" />

                <link rel="canonical" href="https://cerocloud.github.io/CeroCloud-website/about" />
            </Helmet>

            <div className="container mx-auto px-4 max-w-4xl">
                {/* Hero */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-20"
                >
                    <img src={logo} alt="CeroCloud Logo" width="96" height="96" loading="lazy" className="w-24 h-24 mx-auto mb-6 drop-shadow-2xl" />
                    <h1 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight">
                        {t('about.hero.title_start')} <span className="text-primary">{t('about.hero.title_highlight')}</span>
                    </h1>
                    <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                        {t('about.hero.subtitle')}
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
                        <h3 className="text-2xl font-bold mb-4">{t('about.philosophy.privacy.title')}</h3>
                        <p className="text-muted-foreground leading-relaxed">
                            {t('about.philosophy.privacy.description')}
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="bg-muted/30 p-8 rounded-3xl border border-primary/10"
                    >
                        <Zap className="w-10 h-10 text-primary mb-6" />
                        <h3 className="text-2xl font-bold mb-4">{t('about.philosophy.cost.title')}</h3>
                        <p className="text-muted-foreground leading-relaxed">
                            {t('about.philosophy.cost.description')}
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
                        "{t('about.mission')}"
                    </blockquote>
                </motion.div>

                {/* Team & Community */}
                <div className="mb-20">
                    <h2 className="text-3xl font-bold mb-10 text-center flex items-center justify-center gap-3">
                        <Users className="w-8 h-8 text-primary" />
                        {t('about.team.title')}
                    </h2>

                    <div className="bg-gradient-to-br from-background to-muted/50 p-8 rounded-3xl border border-border shadow-sm">
                        <div className="flex flex-col md:flex-row items-center gap-8">
                            <div className="flex-1 text-center md:text-left">
                                <h3 className="text-xl font-bold mb-6">{t('about.team.dev_team')}</h3>

                                <div className="space-y-6">
                                    <div className="flex flex-col md:items-start items-center">
                                        <h4 className="font-bold text-lg">Daniel Ortiz</h4>
                                        <p className="text-sm text-muted-foreground mb-1">{t('about.team.roles.lead_dev')}</p>
                                        <a
                                            href="https://github.com/CeroCloud"
                                            target="_blank"
                                            rel="noreferrer"
                                            className="text-primary hover:text-primary/80 transition-colors text-sm flex items-center gap-1.5"
                                        >
                                            <Globe className="w-3.5 h-3.5" />
                                            @CeroCloud
                                        </a>
                                    </div>

                                    <div className="flex flex-col md:items-start items-center">
                                        <h4 className="font-bold text-lg">Josue Vaquiax</h4>
                                        <p className="text-sm text-muted-foreground mb-1">{t('about.team.roles.developer')}</p>
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
                                <h4 className="font-bold mb-4 text-sm uppercase tracking-wider text-muted-foreground">{t('about.team.tech_stack')}</h4>
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
                        <span>{t('about.footer_love')}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
