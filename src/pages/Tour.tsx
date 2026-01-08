import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import {
    LayoutDashboard,
    ShoppingCart,
    Package,
    ShieldCheck,
    ArrowRight,
    Zap,
    Sun,
    Moon
} from "lucide-react";
import lightDashboard from "@/assets/dashboard-light.png";
import darkDashboard from "@/assets/dashboard-dark.png";
// New imports from docs folder
import lightPos from "@/assets/docs/pos-light.png";
import darkPos from "@/assets/docs/pos-dark.png";
import lightInventory from "@/assets/docs/inventory-light.png";
import darkInventory from "@/assets/docs/inventory-dark.png";
import lightSettings from "@/assets/docs/settings-light.png"; // Used for Security
import darkSettings from "@/assets/docs/settings-dark.png"; // Used for Security
import { useTheme } from "@/contexts/ThemeContext";

const features = [
    {
        id: "dashboard",
        title: "Dashboard Analítico 'Premium Glass'",
        subtitle: "Control Total en Tiempo Real",
        description: "Visualiza el pulso de tu negocio con gráficas dinámicas y KPIs actualizados al instante. Diseñado para facilitar la toma de decisiones sin distracciones.",
        points: [
            "Visualización de ingresos y ventas en tiempo real",
            "Alertas automáticas de stock bajo",
            "Interfaz libre de desorden (Clutter-free)",
            "Modo oscuro optimizado para largas jornadas"
        ],
        icon: LayoutDashboard,
        color: "text-blue-500",
        lightImage: lightDashboard,
        darkImage: darkDashboard
    },
    {
        id: "pos",
        title: "Punto de Venta (POS) Fluido",
        subtitle: "Ventas Rápidas, Clientes Felices",
        description: "Una experiencia de cobro optimizada para la velocidad. Registra transacciones, gestiona múltiples métodos de pago y emite tickets en segundos.",
        points: [
            "Interfaz de caja rápida con atajos de teclado",
            "Búsqueda instantánea de productos",
            "Cálculo automático de cambio",
            "Soporte para múltiples métodos de pago"
        ],
        icon: ShoppingCart,
        color: "text-green-500",
        lightImage: lightPos,
        darkImage: darkPos
    },
    {
        id: "inventory",
        title: "Gestión de Inventario Profesional",
        subtitle: "Tu Stock, Perfectamente Organizado",
        description: "Olvídate de las hojas de cálculo. Mantén un catálogo detallado con imágenes, categorías y proveedores, todo almacenado localmente.",
        points: [
            "Soporte para imágenes de productos",
            "Gestión de proveedores y costos",
            "Control de niveles mínimos y máximos",
            "Historial de movimientos detallado"
        ],
        icon: Package,
        color: "text-purple-500",
        lightImage: lightInventory,
        darkImage: darkInventory
    },
    {
        id: "security",
        title: "Data Protection Suite",
        subtitle: "Seguridad de Grado Bancario",
        description: "Tus datos son tuyos. Nuesto sistema de copias de seguridad cifradas garantiza que tu información esté segura sin depender de la nube.",
        points: [
            "Cifrado AES-256 militar",
            "Asistente de Backups (CeroBak)",
            "Restauración con validación de integridad",
            "Sin telemetría ni rastreadores"
        ],
        icon: ShieldCheck,
        color: "text-amber-500",
        lightImage: lightSettings,
        darkImage: darkSettings
    }
];

export default function Tour() {
    const { theme } = useTheme();
    const navigate = useNavigate();
    const [previewTheme, setPreviewTheme] = useState<'light' | 'dark'>(theme === 'dark' ? 'dark' : 'light');

    // Sync initial preview with system theme, but allow manual override afterwards
    useEffect(() => {
        setPreviewTheme(theme === 'dark' ? 'dark' : 'light');
    }, [theme]);

    return (
        <div className="min-h-screen bg-background pt-8 pb-20">
            <Helmet>
                <title>Tour del Producto - CeroCloud POS y Dashboard</title>
                <meta name="description" content="Explora las características: Dashboard analítico en tiempo real, Punto de Venta (POS) rápido, Gestión de Inventario con imágenes y Seguridad AES-256." />
                <meta name="keywords" content="tour cerocloud, características pos, dashboard ventas, control inventario, seguridad local, software gestion" />

                {/* Open Graph */}
                <meta property="og:title" content="Tour Virtual - CeroCloud" />
                <meta property="og:description" content="Mira cómo CeroCloud transforma tu negocio. Interfaz moderna, rápida y 100% local." />
                <meta property="og:url" content="https://cerocloud.github.io/CeroCloud-website/tour" />
                <meta property="og:image" content="https://cerocloud.github.io/CeroCloud-website/assets/docs/pos-light.png" />
                <meta property="og:image:alt" content="CeroCloud Punto de Venta - Interfaz POS completa" />
                <meta property="og:type" content="website" />

                <link rel="canonical" href="https://cerocloud.github.io/CeroCloud-website/tour" />
            </Helmet>

            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <Badge variant="outline" className="mb-4 px-4 py-1 text-sm border-primary/30 text-primary">
                            Vista Previa Interactiva
                        </Badge>
                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 tracking-tight">
                            Potencia Local para tu Negocio
                        </h1>
                        <p className="text-xl text-muted-foreground leading-relaxed mb-8">
                            Descubre cómo CeroCloud transforma tu computadora en un
                            centro de comando empresarial, sin depender de internet.
                        </p>

                        {/* Theme Toggle for Screenshots */}
                        <div className="inline-flex items-center gap-3 p-1.5 bg-muted/50 rounded-full border border-border/50 shadow-sm">
                            <span className="text-sm font-medium text-muted-foreground pl-3 pr-1">Ver interfaz en:</span>
                            <button
                                onClick={() => setPreviewTheme('light')}
                                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${previewTheme === 'light'
                                    ? 'bg-background text-foreground shadow-sm ring-1 ring-border'
                                    : 'text-muted-foreground hover:text-foreground'
                                    }`}
                            >
                                <Sun className="w-4 h-4" /> Claro
                            </button>
                            <button
                                onClick={() => setPreviewTheme('dark')}
                                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${previewTheme === 'dark'
                                    ? 'bg-background text-foreground shadow-sm ring-1 ring-border'
                                    : 'text-muted-foreground hover:text-foreground'
                                    }`}
                            >
                                <Moon className="w-4 h-4" /> Oscuro
                            </button>
                        </div>
                    </motion.div>
                </div>

                {/* Features List */}
                <div className="space-y-32">
                    {features.map((feature, index) => (
                        <motion.div
                            key={feature.id}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.7 }}
                            className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-12 lg:gap-20`}
                        >
                            {/* Text Content */}
                            <div className="flex-1 space-y-8">
                                <div className="space-y-4">
                                    <div className={`p-3 w-fit rounded-xl bg-muted/50 ${feature.color}`}>
                                        <feature.icon className="w-8 h-8" />
                                    </div>
                                    <h2 className="text-3xl font-bold">{feature.title}</h2>
                                    <p className="text-xl font-medium text-primary">{feature.subtitle}</p>
                                    <p className="text-lg text-muted-foreground leading-relaxed">
                                        {feature.description}
                                    </p>
                                </div>

                                <ul className="space-y-4">
                                    {feature.points.map((point, idx) => (
                                        <li key={idx} className="flex items-center gap-3 text-muted-foreground">
                                            <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                                                <div className="w-2 h-2 rounded-full bg-primary" />
                                            </div>
                                            {point}
                                        </li>
                                    ))}
                                </ul>

                                <Button
                                    className="group mt-4"
                                    size="lg"
                                    variant="outline"
                                    onClick={() => navigate("/releases")}
                                >
                                    Pruébalo ahora
                                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </Button>
                            </div>

                            {/* Visual Content */}
                            <div className="flex-1 w-full relative">
                                <div className="relative group">
                                    {/* Decoration Blob */}
                                    <div className={`absolute -inset-4 bg-gradient-to-r ${index % 2 === 0 ? 'from-primary/20 to-purple-500/20' : 'from-blue-500/20 to-primary/20'
                                        } rounded-3xl blur-2xl opacity-50 group-hover:opacity-75 transition-opacity duration-500`} />

                                    <Card className="relative overflow-hidden border-2 border-primary/10 bg-background/50 backdrop-blur-sm shadow-2xl rounded-2xl aspect-video flex items-center justify-center group-hover:border-primary/30 transition-all">
                                        <img
                                            loading="lazy"
                                            src={previewTheme === 'dark' ? feature.darkImage : feature.lightImage}
                                            alt={`${feature.title} - CeroCloud ${previewTheme === 'dark' ? 'Modo Oscuro' : 'Modo Claro'} - ${feature.subtitle}`}
                                            title={feature.title}
                                            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                                        />

                                        {/* Overlay gradient */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent pointer-events-none" />
                                    </Card>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Bottom CTA */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="mt-20 md:mt-32 p-8 md:p-12 rounded-3xl bg-muted/30 border border-primary/10 text-center relative overflow-hidden"
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5" />
                    <div className="relative z-10">
                        <h2 className="text-3xl font-bold mb-6">¿Listo para modernizar tu negocio?</h2>
                        <Button
                            size="lg"
                            className="text-lg px-10 py-6 shadow-xl shadow-primary/20"
                            onClick={() => navigate("/releases")}
                        >
                            <Zap className="mr-2 h-5 w-5 fill-current" />
                            Descargar CeroCloud Gratis
                        </Button>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
