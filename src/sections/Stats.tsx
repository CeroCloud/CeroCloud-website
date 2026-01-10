import { motion } from "framer-motion";
import { Users, Download, Shield, Star, Loader2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useLatestRelease } from "@/lib/useLatestRelease";

export default function Stats() {
    const { t } = useTranslation('landing');
    const { release, loading } = useLatestRelease();

    const stats = [
        {
            icon: Download,
            value: "100%",
            label: t('stats.free.label'),
            description: t('stats.free.description'),
        },
        {
            icon: Shield,
            value: "AES-256",
            label: t('stats.security.label'),
            description: t('stats.security.description'),
        },
        {
            icon: Users,
            value: t('stats.local.value'),
            label: t('stats.local.label'),
            description: t('stats.local.description'),
        },
        {
            icon: Star,
            value: loading ? <Loader2 className="w-6 h-6 animate-spin mx-auto" /> : (release?.tag_name === release?.name ? release?.tag_name : `${release?.tag_name} - ${release?.name || "Release"}`),
            label: t('stats.version.label'),
            description: loading ? t('stats.version.loading') : "Latest Stable Release",
        },
    ];

    return (
        <section className="py-16 bg-muted/30 border-y border-border/50">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            whileHover={{ y: -5 }}
                            className="bg-card border border-border/50 rounded-xl p-6 text-center shadow-sm hover:shadow-md transition-all"
                        >
                            <div className="inline-flex items-center justify-center w-12 h-12 mb-4 bg-primary/10 group-hover:bg-primary/20 rounded-xl transition-colors">
                                <stat.icon className="w-6 h-6 text-primary" />
                            </div>
                            <div className="text-2xl font-bold mb-1 text-card-foreground flex items-center justify-center h-8">
                                {stat.value}
                            </div>
                            <div className="text-sm font-semibold mb-1 text-muted-foreground">{stat.label}</div>
                            <div className="text-xs text-muted-foreground opacity-80">{stat.description}</div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
