import { memo } from "react";
import { motion } from "framer-motion";
import { CloudOff, Shield, Sparkles, Database, type LucideIcon } from "lucide-react";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const features = [
    {
        icon: CloudOff,
        title: "Independencia de la Nube",
        description: "Tu negocio y tus datos funcionan sin depender de servidores externos o conexión a internet.",
        gradient: "from-blue-500 to-cyan-500",
    },
    {
        icon: Shield,
        title: "Seguridad de Grado Empresarial",
        description: "Implementación de cifrado AES-256 para la protección de datos sensibles y respaldos.",
        gradient: "from-green-500 to-emerald-500",
    },
    {
        icon: Sparkles,
        title: "Interfaz Moderna y Fluida",
        description: "Diseño profesional basado en estándares web modernos (React + Tailwind CSS), alejándose de interfaces de escritorio tradicionales.",
        gradient: "from-purple-500 to-pink-500",
    },
    {
        icon: Database,
        title: "Escalabilidad Local",
        description: "Uso de SQLite como motor de base de datos para manejar grandes volúmenes de información sin pérdida de rendimiento.",
        gradient: "from-orange-500 to-red-500",
    },
];

interface FeatureCardProps {
    feature: {
        icon: LucideIcon;
        title: string;
        description: string;
        gradient: string;
    };
    index: number;
}

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

export default function Features() {
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
                        Pilares Fundamentales
                    </h2>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        CeroCloud está construido sobre cuatro principios que garantizan control, seguridad y rendimiento
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
                            Tus datos permanecen privados, seguros y siempre disponibles
                        </span>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
