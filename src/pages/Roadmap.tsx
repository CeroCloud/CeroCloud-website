import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { CheckCircle2, Rocket, Database, Users, Globe, Zap, Shield, FileText } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useMemo } from "react";

export default function Roadmap() {
    const { t } = useTranslation('roadmap');
    const phases = useMemo(() => [
        {
            title: t('phases.phase0.title'),
            status: "completed",
            items: t('phases.phase0.items', { returnObjects: true }) as string[],
            color: "blue",
            icon: FileText
        },
        {
            title: t('phases.phase1.title'),
            status: "completed",
            items: t('phases.phase1.items', { returnObjects: true }) as string[],
            color: "indigo",
            icon: Database
        },
        {
            title: t('phases.phase2.title'),
            status: "completed",
            items: t('phases.phase2.items', { returnObjects: true }) as string[],
            color: "violet",
            icon: Zap
        },
        {
            title: t('phases.phase3.title'),
            status: "completed",
            items: t('phases.phase3.items', { returnObjects: true }) as string[],
            color: "purple",
            icon: Shield
        },
        {
            title: t('phases.phase4.title'),
            status: "completed",
            version: "v1.2.0",
            items: t('phases.phase4.items', { returnObjects: true }) as string[],
            color: "pink",
            icon: Rocket
        },
        {
            title: t('phases.phase5.title'),
            status: "planned",
            version: "v2.0.0",
            icon: Users,
            items: t('phases.phase5.items', { returnObjects: true }) as string[],
            color: "rose"
        },
        {
            title: t('phases.phase6.title'),
            status: "future",
            version: "v3.0.0",
            icon: Globe,
            items: t('phases.phase6.items', { returnObjects: true }) as string[],
            color: "orange"
        }
    ], [t]);

    return (
        <div className="min-h-screen bg-background pt-8 pb-20">
            <Helmet>
                <title>{t('seo.title')}</title>
                <meta name="description" content={t('seo.description')} />
                <meta name="keywords" content={t('seo.keywords')} />

                {/* Open Graph */}
                <meta property="og:title" content={t('seo.og_title')} />
                <meta property="og:description" content={t('seo.og_description')} />
                <meta property="og:url" content="https://cerocloud.github.io/CeroCloud-website/roadmap" />
                <meta property="og:image" content="https://cerocloud.github.io/CeroCloud-website/assets/dashboard-light.png" />
                <meta property="og:image:alt" content={t('seo.og_image_alt')} />
                <meta property="og:type" content="website" />

                <link rel="canonical" href="https://cerocloud.github.io/CeroCloud-website/roadmap" />
            </Helmet>

            <div className="container mx-auto px-4 max-w-4xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center justify-center p-3 bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl mb-6 text-primary ring-1 ring-primary/20 shadow-lg shadow-primary/10">
                        <Rocket className="w-8 h-8" />
                    </div>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
                        {t('hero.title')}
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        {t('hero.subtitle')}
                    </p>
                </motion.div>

                <div className="space-y-12 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-muted-foreground/20 before:to-transparent">
                    {phases.map((phase, index) => (
                        <RoadmapItem key={index} phase={phase} index={index} />
                    ))}
                </div>

                <div className="mt-20 text-center p-8 bg-muted/20 rounded-2xl border border-border">
                    <h3 className="text-xl font-bold mb-4">{t('cta.title')}</h3>
                    <p className="text-muted-foreground mb-6">
                        {t('cta.description')}
                    </p>
                    <a
                        href="https://github.com/CeroCloud/CeroCloud-Desktop/discussions"
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 text-primary font-bold hover:underline"
                    >
                        {t('cta.link')} <Globe className="w-4 h-4" />
                    </a>
                </div>
            </div>
        </div>
    );
}

const colorMap: Record<string, { border: string, bg: string, text: string, marker: string, ring: string, line: string, lightBg: string }> = {
    blue: {
        border: "border-blue-200 dark:border-blue-800",
        bg: "bg-blue-50/50 dark:bg-blue-950/20",
        lightBg: "bg-blue-50",
        text: "text-blue-700 dark:text-blue-400",
        marker: "bg-blue-500",
        ring: "ring-blue-500/20",
        line: "bg-blue-200"
    },
    indigo: {
        border: "border-indigo-200 dark:border-indigo-800",
        bg: "bg-indigo-50/50 dark:bg-indigo-950/20",
        lightBg: "bg-indigo-50",
        text: "text-indigo-700 dark:text-indigo-400",
        marker: "bg-indigo-500",
        ring: "ring-indigo-500/20",
        line: "bg-indigo-200"
    },
    violet: {
        border: "border-violet-200 dark:border-violet-800",
        bg: "bg-violet-50/50 dark:bg-violet-950/20",
        lightBg: "bg-violet-50",
        text: "text-violet-700 dark:text-violet-400",
        marker: "bg-violet-500",
        ring: "ring-violet-500/20",
        line: "bg-violet-200"
    },
    purple: {
        border: "border-purple-200 dark:border-purple-800",
        bg: "bg-purple-50/50 dark:bg-purple-950/20",
        lightBg: "bg-purple-50",
        text: "text-purple-700 dark:text-purple-400",
        marker: "bg-purple-500",
        ring: "ring-purple-500/20",
        line: "bg-purple-200"
    },
    pink: {
        border: "border-pink-200 dark:border-pink-800",
        bg: "bg-pink-50/50 dark:bg-pink-950/20",
        lightBg: "bg-pink-50",
        text: "text-pink-700 dark:text-pink-400",
        marker: "bg-pink-500",
        ring: "ring-pink-500/20",
        line: "bg-pink-200"
    },
    rose: {
        border: "border-rose-200 dark:border-rose-800",
        bg: "bg-rose-50/50 dark:bg-rose-950/20",
        lightBg: "bg-rose-50",
        text: "text-rose-700 dark:text-rose-400",
        marker: "bg-rose-500",
        ring: "ring-rose-500/20",
        line: "bg-rose-200"
    },
    orange: {
        border: "border-orange-200 dark:border-orange-800",
        bg: "bg-orange-50/50 dark:bg-orange-950/20",
        lightBg: "bg-orange-50",
        text: "text-orange-700 dark:text-orange-400",
        marker: "bg-orange-500",
        ring: "ring-orange-500/20",
        line: "bg-orange-200"
    }
};

function RoadmapItem({ phase, index }: any) {
    const isCompleted = phase.status === "completed";
    const colors = colorMap[phase.color] || colorMap.blue;
    const Icon = phase.icon || CheckCircle2;

    return (
        <div className={`relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group ${isCompleted ? 'is-completed' : ''}`}>

            {/* Icon Marker */}
            <div className={`flex items-center justify-center w-12 h-12 rounded-full border-4 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-xl z-10 transition-transform hover:scale-110
                ${isCompleted ? `${colors.marker} border-white dark:border-background text-white` :
                    'bg-background border-muted text-muted-foreground'}
            `}>
                {isCompleted ? <Icon className="w-5 h-5" /> :
                    <Icon className="w-5 h-5 opacity-50" />}
            </div>

            {/* Content Card */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`w-[calc(100%-3.5rem)] md:w-[calc(50%-3rem)] p-4 md:p-6 rounded-2xl border backdrop-blur-sm shadow-sm hover:shadow-lg transition-all
                    ${colors.border} ${colors.bg} hover:scale-[1.02]
                `}
            >
                <div className="flex justify-between items-center mb-4">
                    <h3 className={`text-xl font-bold ${colors.text}`}>
                        {phase.title}
                    </h3>
                    {phase.version && (
                        <span className={`text-xs font-mono px-2 py-1 rounded font-bold ${colors.lightBg} ${colors.text} border ${colors.border}`}>
                            {phase.version}
                        </span>
                    )}
                </div>

                <ul className="space-y-3">
                    {phase.items.map((item: string, i: number) => (
                        <li key={i} className="flex items-start gap-3 text-sm text-foreground/80 dark:text-foreground/90 font-medium">
                            <span className={`mt-1.5 w-2 h-2 rounded-full shrink-0 
                                ${colors.marker}
                            `} />
                            {item}
                        </li>
                    ))}
                </ul>
            </motion.div>
        </div>
    );
}
