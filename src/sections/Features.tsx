import { memo } from "react";
import { motion } from "framer-motion";
import { CloudOff, Shield, Sparkles, Database, type LucideIcon } from "lucide-react";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslation } from "react-i18next";

const FeatureCard = memo(({ feature, index }: FeatureCardProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.6 }}
            whileHover={{ y: -8 }}
            className="h-full"
        >
            <Card className="h-full hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/50 group">
                <CardHeader>
                    {/* Icon with gradient background */}
                    <div className="mb-4">
                        <div
                            className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.gradient} p-0.5 group-hover:scale-110 transition-transform duration-300`}
                        >
                            <div className="w-full h-full bg-card rounded-2xl flex items-center justify-center">
                                <feature.icon className="w-8 h-8 text-primary" />
                            </div>
                        </div>
                    </div>
                    <CardTitle className="text-xl mb-2">{feature.title}</CardTitle>
                    <CardDescription className="text-base leading-relaxed">
                        {feature.description}
                    </CardDescription>
                </CardHeader>
            </Card>
        </motion.div>
    );
});

interface FeatureCardProps {
    feature: {
        icon: LucideIcon;
        title: string;
        description: string;
        gradient: string;
    };
    index: number;
}

export default function Features() {
    const { t } = useTranslation('landing');

    const features = [
        {
            icon: CloudOff,
            title: t('features.cloud.title'),
            description: t('features.cloud.description'),
            gradient: "from-blue-500 to-cyan-500",
        },
        {
            icon: Shield,
            title: t('features.security.title'),
            description: t('features.security.description'),
            gradient: "from-green-500 to-emerald-500",
        },
        {
            icon: Sparkles,
            title: t('features.interface.title'),
            description: t('features.interface.description'),
            gradient: "from-purple-500 to-pink-500",
        },
        {
            icon: Database,
            title: t('features.scalability.title'),
            description: t('features.scalability.description'),
            gradient: "from-orange-500 to-red-500",
        },
    ];

    return (
        <section id="features" className="py-20 bg-muted">
            <div className="container mx-auto px-4">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-5xl font-bold mb-4">
                        {t('features.main_title')}
                    </h2>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        {t('features.main_subtitle')}
                    </p>
                </motion.div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {features.map((feature, index) => (
                        <FeatureCard key={feature.title} feature={feature} index={index} />
                    ))}
                </div>

                {/* Additional Info */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6, duration: 0.6 }}
                    className="mt-16 text-center"
                >
                    <div className="inline-flex items-center gap-2 px-6 py-3 bg-primary/10 border border-primary/20 rounded-full">
                        <Shield className="w-5 h-5 text-primary" />
                        <span className="font-medium">
                            {t('features.footer_note')}
                        </span>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
