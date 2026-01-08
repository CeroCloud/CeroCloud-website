import { Github, ExternalLink, Heart, FileText, BookOpen, Download } from "lucide-react";
import icon from "@/assets/cerocloud-icon.png";
import { Link } from "react-router-dom";
import { useLatestRelease } from "@/lib/useLatestRelease";


export default function Footer() {
    const { release, loading } = useLatestRelease();
    return (
        <div className="dark bg-[hsl(222.2_47.4%_11.2%)] text-[hsl(210_40%_98%)]">
            <footer className="relative bg-gradient-to-b from-transparent via-muted/20 to-muted/40 border-t border-border/50 overflow-hidden">
                {/* Animated background elements */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px]" />
                <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />

                <div className="container mx-auto px-4 py-8 md:py-12 relative z-10">
                    <div className="grid md:grid-cols-12 gap-8 md:gap-12 mb-8">
                        {/* Brand Column - Larger */}
                        <div className="md:col-span-5">
                            <div className="flex items-center gap-4 md:gap-5 mb-6">
                                <div className="relative w-16 h-16">
                                    {/* Glow effect */}
                                    <div className="absolute inset-0 bg-primary/20 rounded-2xl blur-xl" />
                                    {/* Icon */}
                                    <img src={icon} alt="CeroCloud Icon" className="relative w-full h-full drop-shadow-xl" />
                                </div>
                                <div>
                                    <h3 className="text-3xl font-black">CeroCloud</h3>
                                    <p className="text-sm text-primary font-semibold">Local. Seguro. Profesional.</p>
                                </div>
                            </div>
                            <p className="text-sm text-muted-foreground mb-6 max-w-md leading-relaxed">
                                Sistema integral de ventas e inventario de escritorio. 100% local, gratuito y sin dependencia de la nube.
                                <span className="block mt-2 font-semibold text-foreground">Tu negocio. Tus datos. Sin límites.</span>
                            </p>
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full">
                                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                                <span className="text-xs font-semibold">
                                    {loading ? "Cargando versión..." : (release?.tag_name || "Unknown") + " - " + (release?.name || "Release")}
                                </span>
                            </div>
                        </div>

                        {/* Links Columns */}
                        <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8 text-left">
                            {/* Resources Column */}
                            <div>
                                <h4 className="font-bold mb-4 text-sm uppercase tracking-wider flex items-center gap-2">
                                    <FileText className="w-4 h-4 text-primary" />
                                    Recursos
                                </h4>
                                <ul className="space-y-3 text-sm">
                                    <li>
                                        <Link to="/docs" className="text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-2 group">
                                            <BookOpen className="w-3.5 h-3.5" />
                                            Documentación
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/docs?section=manual" className="text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-2 group">
                                            <BookOpen className="w-3.5 h-3.5" />
                                            Manual de Usuario
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/docs?section=install" className="text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-2 group">
                                            <Download className="w-3.5 h-3.5" />
                                            Guía de Instalación
                                        </Link>
                                    </li>
                                </ul>
                            </div>

                            {/* Project Column */}
                            <div>
                                <h4 className="font-bold mb-4 text-sm uppercase tracking-wider flex items-center gap-2">
                                    <Github className="w-4 h-4 text-primary" />
                                    Proyecto
                                </h4>
                                <ul className="space-y-3 text-sm">
                                    <li>
                                        <a
                                            href="https://github.com"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-2 group"
                                        >
                                            <Github className="w-3.5 h-3.5" />
                                            GitHub
                                            <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                                        </a>
                                    </li>
                                    <li>
                                        <Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">
                                            Acerca de
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/license" className="text-muted-foreground hover:text-primary transition-colors">
                                            Licencia MIT
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/releases" className="text-muted-foreground hover:text-primary transition-colors">
                                            Changelog
                                        </Link>
                                    </li>
                                </ul>
                            </div>

                            {/* Community Column */}
                            <div>
                                <h4 className="font-bold mb-4 text-sm uppercase tracking-wider flex items-center gap-2">
                                    <Heart className="w-4 h-4 text-primary" />
                                    Comunidad
                                </h4>
                                <ul className="space-y-3 text-sm">
                                    <li>
                                        <Link to="/contribute" className="text-muted-foreground hover:text-primary transition-colors">
                                            Contribuir
                                        </Link>
                                    </li>
                                    <li>
                                        <a href="https://github.com/DaaNiieeL123/CeroCloud/issues/new" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-1">
                                            Reportar Issues <ExternalLink className="w-3 h-3" />
                                        </a>
                                    </li>
                                    <li>
                                        <Link to="/roadmap" className="text-muted-foreground hover:text-primary transition-colors">
                                            Roadmap
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Bar */}
                    <div className="pt-6 border-t border-border/50">
                        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                            <div className="flex flex-col md:flex-row items-center gap-3 text-sm text-muted-foreground">
                                <span className="font-semibold">© {new Date().getFullYear()} CeroCloud.</span>
                                <span className="hidden md:inline text-border">•</span>
                                <span>Gestión empresarial 100% local.</span>
                                <span className="hidden md:inline text-border">•</span>
                                <span className="text-xs">Sin nube. Sin suscripciones.</span>
                            </div>
                            <div className="flex items-center gap-6">
                                <Link to="/license" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                                    Privacidad
                                </Link>
                                <Link to="/license" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                                    Términos
                                </Link>
                                <div className="flex items-center gap-2 text-sm">
                                    <span className="text-muted-foreground">Hecho con</span>
                                    <Heart className="w-4 h-4 text-red-500 fill-red-500 animate-pulse" />
                                    <span className="text-muted-foreground">para negocios locales</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
