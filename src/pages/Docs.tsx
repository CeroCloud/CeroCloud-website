import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { Search, Book, Code, Terminal, FileText, Download, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { InstallationGuide } from "@/components/docs/InstallationGuide";
import { UserManual } from "@/components/docs/UserManual";
import { TechnicalDocs } from "@/components/docs/TechnicalDocs";

const docSections = [
    {
        title: "Empezando",
        items: [
            { id: "intro", title: "Introducción", icon: Book },
            { id: "install", title: "Guía de Instalación", icon: Terminal },
        ]
    },
    {
        title: "Guías de Uso",
        items: [
            { id: "manual", title: "Manual de Usuario", icon: FileText },
        ]
    },
    {
        title: "Desarrollo",
        items: [
            { id: "technical", title: "Documentación Técnica", icon: Code },
        ]
    }
];

export default function Docs() {
    const [searchParams, setSearchParams] = useSearchParams();
    // Initialize state directly from URL param to avoid content flash
    const [activeSection, setActiveSection] = useState(searchParams.get("section") || "intro");
    const [isMobileOpen, setIsMobileOpen] = useState(false);

    useEffect(() => {
        const section = searchParams.get("section");
        if (section) {
            setActiveSection(section);
        }
    }, [searchParams]);

    const handleSectionChange = (id: string) => {
        setActiveSection(id);
        setSearchParams({ section: id });
        setIsMobileOpen(false);
        window.scrollTo(0, 0);
    };

    const renderContent = () => {
        switch (activeSection) {
            case "install":
                return <InstallationGuide />;
            case "manual":
                return <UserManual />;
            case "technical":
                return <TechnicalDocs />;
            case "intro":
            default:
                return <IntroContent onNavigate={handleSectionChange} />;
        }
    };

    return (
        <div className="min-h-screen bg-background">
            <Helmet>
                <title>Documentación Oficial - CeroCloud POS</title>
                <meta name="description" content="Manual de usuario, guías de instalación y documentación técnica para CeroCloud. Aprende a gestionar tu inventario y ventas offline." />
                <meta name="keywords" content="documentación cerocloud, manual usuario pos, guia instalacion, ayuda cerocloud, soporte tecnico pos" />

                {/* Open Graph */}
                <meta property="og:title" content="Centro de Ayuda y Documentación - CeroCloud" />
                <meta property="og:description" content="Domina CeroCloud con nuestras guías completas. Instalación, configuración y trucos para maximizar tu negocio." />
                <meta property="og:url" content="https://cerocloud.github.io/CeroCloud-website/docs" />

                <link rel="canonical" href="https://cerocloud.github.io/CeroCloud-website/docs" />
            </Helmet>

            <div className="container mx-auto px-4 max-w-7xl flex flex-col md:flex-row gap-8 py-4 md:py-8">

                {/* Mobile Sidebar Trigger */}
                <div className="md:hidden mb-4">
                    <Button variant="outline" className="w-full justify-start gap-2" onClick={() => setIsMobileOpen(!isMobileOpen)}>
                        <Menu className="w-4 h-4" />
                        Menú de Documentación
                    </Button>

                    {isMobileOpen && (
                        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm" onClick={() => setIsMobileOpen(false)}>
                            <div className="fixed inset-y-0 left-0 w-3/4 max-w-sm bg-background border-r p-6 shadow-xl" onClick={e => e.stopPropagation()}>
                                <div className="flex justify-between items-center mb-6">
                                    <h3 className="font-bold text-lg">Documentación</h3>
                                    <Button variant="ghost" size="icon" onClick={() => setIsMobileOpen(false)}>
                                        <X className="w-4 h-4" />
                                    </Button>
                                </div>
                                <SidebarNav activeSection={activeSection} onNavigate={handleSectionChange} />
                            </div>
                        </div>
                    )}
                </div>

                {/* Desktop Sidebar Navigation */}
                <aside className="hidden md:block w-64 lg:w-72 flex-shrink-0 md:sticky md:top-24 h-auto md:h-[calc(100vh-8rem)]">
                    <SidebarNav activeSection={activeSection} onNavigate={handleSectionChange} />
                </aside>

                {/* Main Content Area */}
                <main className="flex-1 min-w-0 pb-12">
                    <motion.div
                        key={activeSection}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        {renderContent()}
                    </motion.div>
                </main>
            </div>
        </div>
    );
}

function SidebarNav({ activeSection, onNavigate }: { activeSection: string, onNavigate: (id: string) => void }) {
    return (
        <div className="space-y-4 h-full flex flex-col p-4 md:p-0">
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Buscar..." className="pl-9" />
            </div>

            <ScrollArea className="flex-1 md:pr-4">
                <div className="space-y-6">
                    {docSections.map((section) => (
                        <div key={section.title}>
                            <h4 className="font-semibold text-sm text-foreground mb-3 px-2">
                                {section.title}
                            </h4>
                            <div className="space-y-1">
                                {section.items.map((item) => (
                                    <Button
                                        key={item.id}
                                        variant={activeSection === item.id ? "secondary" : "ghost"}
                                        className={`w-full justify-start gap-2 h-9 ${activeSection === item.id
                                            ? "bg-primary/10 text-primary hover:bg-primary/15"
                                            : "text-muted-foreground hover:text-foreground"
                                            }`}
                                        onClick={() => onNavigate(item.id)}
                                    >
                                        <item.icon className="h-4 w-4" />
                                        {item.title}
                                    </Button>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </ScrollArea>
        </div>
    );
}

function IntroContent({ onNavigate }: { onNavigate: (id: string) => void }) {
    return (
        <div className="space-y-8 max-w-4xl animate-in fade-in duration-500">
            <div>
                <span className="text-primary font-bold tracking-wide uppercase text-sm">Bienvenido</span>
                <h1 className="text-4xl font-extrabold mt-2 mb-4">Documentación de CeroCloud</h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                    Tu guía completa para dominar el sistema de gestión empresarial más seguro y privado.
                    Sin internet. Sin suscripciones. 100% Tuyo.
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                <div
                    onClick={() => onNavigate('install')}
                    className="group cursor-pointer p-6 rounded-2xl border bg-card hover:border-primary/50 hover:shadow-lg transition-all"
                >
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <Download className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">Instalación</h3>
                    <p className="text-muted-foreground">
                        Guía paso a paso para instalar CeroCloud en Windows, macOS y Linux. Requisitos del sistema y solución de problemas.
                    </p>
                </div>

                <div
                    onClick={() => onNavigate('manual')}
                    className="group cursor-pointer p-6 rounded-2xl border bg-card hover:border-primary/50 hover:shadow-lg transition-all"
                >
                    <div className="w-12 h-12 bg-blue-500/10 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <Book className="w-6 h-6 text-blue-500" />
                    </div>
                    <h3 className="text-xl font-bold mb-2 group-hover:text-blue-500 transition-colors">Manual de Usuario</h3>
                    <p className="text-muted-foreground">
                        Aprende a registrar ventas, gestionar inventario, generar reportes y configurar tu negocio desde cero.
                    </p>
                </div>

                <div
                    onClick={() => onNavigate('technical')}
                    className="group cursor-pointer p-6 rounded-2xl border bg-card hover:border-primary/50 hover:shadow-lg transition-all"
                >
                    <div className="w-12 h-12 bg-purple-500/10 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <Code className="w-6 h-6 text-purple-500" />
                    </div>
                    <h3 className="text-xl font-bold mb-2 group-hover:text-purple-500 transition-colors">Para Desarrolladores</h3>
                    <p className="text-muted-foreground">
                        Explora la arquitectura técnica, esquema de base de datos y estándares de seguridad. ¡Contribuye al código!
                    </p>
                </div>
            </div>
        </div>
    );
}
