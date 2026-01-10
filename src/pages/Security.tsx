import { useMemo } from "react"; // Added useMemo
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { Shield, Lock, WifiOff, Server, Key, FileJson } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Security() {
    const { t } = useTranslation('legal');
    const navigate = useNavigate();

    const features = useMemo(() => [
        {
            icon: Lock,
            title: t('security.features.encryption.title'),
            description: t('security.features.encryption.description')
        },
        {
            icon: Server,
            title: t('security.features.database.title'),
            description: t('security.features.database.description')
        },
        {
            icon: WifiOff,
            title: t('security.features.offline.title'),
            description: t('security.features.offline.description')
        },
        {
            icon: Key,
            title: t('security.features.ownership.title'),
            description: t('security.features.ownership.description')
        }
    ], [t]);

    return (
        <div className="min-h-screen bg-background pt-8 pb-20">
            <Helmet>
                <title>{t('security.seo.title')}</title>
                <meta name="description" content={t('security.seo.description')} />
                <meta name="keywords" content={t('security.seo.keywords')} />

                {/* Open Graph */}
                <meta property="og:title" content={t('security.seo.og_title')} />
                <meta property="og:description" content={t('security.seo.og_description')} />
                <meta property="og:url" content="https://cerocloud.github.io/CeroCloud-website/security" />
                <meta property="og:image" content="https://cerocloud.github.io/CeroCloud-website/assets/docs/settings-light.png" />
                <meta property="og:image:alt" content={t('security.seo.og_image_alt')} />
                <meta property="og:type" content="website" />

                <link rel="canonical" href="https://cerocloud.github.io/CeroCloud-website/security" />
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
                        {t('security.hero.title_start')} <br />
                        <span className="text-primary">{t('security.hero.title_highlight')}</span>
                    </h1>
                    <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                        {t('security.hero.subtitle')}
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
                            <h3 className="font-bold mb-2">{t('security.diagram.local_data.title')}</h3>
                            <p className="text-xs text-muted-foreground">{t('security.diagram.local_data.subtitle')}</p>
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
                            <h3 className="font-bold mb-2">{t('security.diagram.cloud.title')}</h3>
                            <p className="text-xs text-muted-foreground">{t('security.diagram.cloud.subtitle')}</p>
                        </div>
                    </div>

                    <div className="text-center mt-12">
                        <p className="text-sm font-mono text-primary/80 bg-primary/10 inline-block px-4 py-2 rounded-lg border border-primary/20">
                            {t('security.diagram.protocol_info')}
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
                <h2 className="text-2xl font-bold mb-6">{t('security.cta.title')}</h2>
                <Button size="lg" onClick={() => navigate("/releases")} className="px-8">
                    {t('security.cta.button')}
                </Button>
            </div>
        </div>
    );
}
