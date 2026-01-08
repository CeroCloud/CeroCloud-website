import { memo } from "react";
import { motion } from "framer-motion";
import { BarChart3, Package, ShoppingCart, HardDrive, type LucideIcon } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const modules = [
    {
        icon: BarChart3,
        title: "Dashboard Analítico",
        subtitle: "Premium Glass",
        description: "Visualización de ingresos y ventas en tiempo real mediante gráficas dinámicas.",
        features: [
            "KPIs en tiempo real",
            "Alertas de stock bajo",
            "Análisis de tendencias",
        ],
        color: "text-blue-500",
        bgColor: "bg-blue-500/10",
    },
    {
        icon: Package,
        title: "Gestión de Inventario",
        subtitle: "Profesional",
        description: "Catálogo completo con soporte para imágenes locales y control total de stock.",
        features: [
            "Catálogo con imágenes",
            "Control de categorías",
            "Niveles mínimos",
        ],
        color: "text-green-500",
        bgColor: "bg-green-500/10",
    },
    {
        icon: ShoppingCart,
        title: "Punto de Venta (POS)",
        subtitle: "Rápido y Eficiente",
        description: "Interfaz de caja rápida para el registro de transacciones con múltiples métodos de pago.",
        features: [
            "Caja rápida",
            "Múltiples pagos",
            "Historial completo",
        ],
        color: "text-purple-500",
        bgColor: "bg-purple-500/10",
    },
    {
        icon: HardDrive,
        title: "Data Protection Suite",
        subtitle: "Seguridad Total",
        description: "Sistema completo de respaldo y restauración con cifrado AES-256.",
        features: [
            "Backup Wizard (Cifrado)",
            "Restore Wizard (Integridad)",
            "Previsualización de datos",
        ],
        color: "text-orange-500",
        bgColor: "bg-orange-500/10",
    },
];

interface ModuleCardProps {
    module: {
        icon: LucideIcon;
        title: string;
        subtitle: string;
        description: string;
        features: string[];
        color: string;
        bgColor: string;
    };
    index: number;
}

const ModuleCard = memo(({ module, index }: ModuleCardProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.15, duration: 0.6 }}
        >
            <Card className="h-full hover:shadow-2xl transition-all duration-300 border-2 hover:border-primary/50 group overflow-hidden">
                <CardHeader className="relative">
                    {/* Background decoration */}
                    <div className={`absolute top-0 right-0 w-32 h-32 ${module.bgColor} rounded-full blur-3xl opacity-50 group-hover:opacity-100 transition-opacity`} />

                    <div className="relative">
                        {/* Icon */}
                        <div className={`w-14 h-14 ${module.bgColor} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                            <module.icon className={`w-7 h-7 ${module.color}`} />
                        </div>

                        {/* Title and Subtitle */}
                        <div className="mb-2">
                            <CardTitle className="text-2xl mb-1">{module.title}</CardTitle>
                            <p className={`text-sm font-semibold ${module.color}`}>
                                {module.subtitle}
                            </p>
                        </div>

                        <CardDescription className="text-base leading-relaxed">
                            {module.description}
                        </CardDescription>
                    </div>
                </CardHeader>

                <CardContent className="relative">
                    {/* Features List */}
                    <ul className="space-y-2">
                        {module.features.map((feature, idx) => (
                            <motion.li
                                key={idx}
                                initial={{ opacity: 0, x: -10 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.15 + idx * 0.1 }}
                                className="flex items-center gap-2 text-sm"
                            >
                                <div className={`w-1.5 h-1.5 rounded-full ${module.color.replace('text-', 'bg-')}`} />
                                <span>{feature}</span>
                            </motion.li>
                        ))}
                    </ul>
                </CardContent>
            </Card>
        </motion.div>
    );
});

export default function Modules() {
    return (
        <section id="modules" className="py-20 bg-muted/30">
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
                        Módulos y Funcionalidades
                    </h2>
                    <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                        Todo lo que necesitas para gestionar tu negocio en un solo lugar
                    </p>
                </motion.div>

                {/* Modules Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                    {modules.map((module, index) => (
                        <ModuleCard key={module.title} module={module} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
}
