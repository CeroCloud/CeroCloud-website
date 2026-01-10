import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { Download, Menu, X, Github, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import icon from "@/assets/cerocloud-icon.png";
import { useTheme } from "@/contexts/ThemeContext";
import { useLocation, useNavigate } from "react-router-dom";
import LanguageSelector from "./LanguageSelector";

export default function Navbar() {
    const { t } = useTranslation();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState("hero");
    const { theme, toggleTheme } = useTheme();
    const location = useLocation();
    const navigate = useNavigate();
    const isHome = location.pathname === "/";
    const GITHUB_REPO = "https://github.com/CeroCloud/CeroCloud-Desktop";

    const navLinks = [
        { name: t('navbar.home'), href: "/" },
        { name: t('navbar.tour'), href: "/tour" },
        { name: t('navbar.security'), href: "/security" },
        { name: t('navbar.roadmap'), href: "/roadmap" },
        { name: t('navbar.docs'), href: "/docs" },
    ];

    // Optimized Scroll Listener (Only for Navbar Background)
    useEffect(() => {
        const handleScroll = () => {
            const scrolled = window.scrollY > 20;
            if (isScrolled !== scrolled) {
                setIsScrolled(scrolled);
            }
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, [isScrolled]);

    // Intersection Observer for Active Section (High Performance)
    useEffect(() => {
        if (!isHome) return;

        const observerOptions = {
            root: null,
            rootMargin: "-20% 0px -50% 0px", // Trigger when section is in the middle-ish viewport
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setActiveSection(entry.target.id);
                }
            });
        }, observerOptions);

        // Observe all sections defined in navLinks
        navLinks.forEach((link) => {
            if (link.href.startsWith("/#")) {
                const id = link.href.substring(2);
                const element = document.getElementById(id);
                if (element) observer.observe(element);
            } else if (link.href === "/") {
                const hero = document.getElementById("hero");
                if (hero) observer.observe(hero);
            }
        });

        return () => observer.disconnect();
    }, [isHome, navLinks]);

    // Handle initial scroll if URL has hash
    useEffect(() => {
        if (location.hash && isHome) {
            const element = document.querySelector(location.hash);
            if (element) {
                setTimeout(() => {
                    element.scrollIntoView({ behavior: "smooth" });
                }, 100);
            }
        }
    }, [location, isHome]);

    const handleNavigation = (href: string) => {
        setIsMobileMenuOpen(false);

        if (href.startsWith("/#")) {
            const hash = href.substring(1);
            if (isHome) {
                const element = document.querySelector(hash);
                if (element) {
                    element.scrollIntoView({ behavior: "smooth" });
                }
            } else {
                navigate(href);
            }
        } else {
            navigate(href);
        }
    };

    return (
        <div className="dark">
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.6 }}
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${isScrolled
                        ? "bg-background/95 backdrop-blur-md shadow-lg border-border/40"
                        : "bg-transparent border-transparent"
                    }`}
            >
                <div className="container mx-auto px-4">
                    <div className="flex items-center h-16 md:h-20">
                        {/* Logo - Left */}
                        <div
                            onClick={() => handleNavigation("/#hero")}
                            className="flex items-center gap-3 cursor-pointer group mr-auto text-foreground"
                        >
                            <div className="flex items-center gap-3">
                                <div className="relative w-10 h-10">
                                    {/* Glow effect */}
                                    <div className="absolute inset-0 bg-primary/20 rounded-xl blur-lg group-hover:bg-primary/30 transition-colors" />
                                    {/* Icon */}
                                    <img src={icon} alt="CeroCloud Icon" loading="lazy" className="relative w-full h-full drop-shadow-lg" />
                                </div>
                                <div>
                                    <span className="text-xl font-bold text-foreground">CeroCloud</span>
                                    <p className="text-xs text-primary font-semibold hidden md:block">{t('navbar.brand_slogan')}</p>
                                </div>
                            </div>
                        </div>

                        {/* Desktop Navigation - Center (Visible on LG+) */}
                        <div className="hidden lg:flex items-center gap-1 absolute left-1/2 -translate-x-1/2">
                            {navLinks.map((link) => {
                                const isHash = link.href.startsWith("/#");
                                const sectionId = isHash ? link.href.substring(2) : (link.href === "/" ? "hero" : link.href);
                                const isActive = (isHome && activeSection === sectionId) || (!isHome && location.pathname === link.href);

                                return (
                                    <button
                                        key={link.name}
                                        onClick={() => handleNavigation(link.href)}
                                        className={`px-4 py-2 text-sm font-medium rounded-lg transition-all relative group ${isActive
                                            ? "text-primary bg-primary/10"
                                            : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                                            }`}
                                    >
                                        {link.name}
                                        {isActive && (
                                            <motion.span
                                                layoutId="activeSection"
                                                className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                transition={{ duration: 0.3 }}
                                            />
                                        )}
                                    </button>
                                );
                            })}
                        </div>

                        {/* Right Actions (Visible on LG+) */}
                        <div className="hidden lg:flex items-center gap-2 ml-auto">
                            <LanguageSelector />

                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={toggleTheme}
                                className="flex items-center justify-center w-10 h-10 rounded-lg hover:bg-accent/50 transition-colors mr-2 text-foreground"
                                aria-label="Toggle theme"
                            >
                                {theme === "dark" ? (
                                    <Sun className="h-5 w-5 text-primary" />
                                ) : (
                                    <Moon className="h-5 w-5 text-primary" />
                                )}
                            </motion.button>

                            <Button
                                variant="ghost"
                                className="gap-2 text-foreground hover:text-foreground/80 hover:bg-accent/50"
                                onClick={() => window.open(GITHUB_REPO, "_blank", "noopener,noreferrer")}
                                aria-label="Abrir repositorio en GitHub"
                            >
                                <Github className="h-5 w-5" />
                                GitHub
                            </Button>
                            <Button
                                onClick={() => handleNavigation("/releases")}
                                className="gap-2 bg-primary hover:bg-primary/90 shadow-lg shadow-primary/25 text-primary-foreground"
                            >
                                <Download className="h-4 w-4" />
                                {t('navbar.download')}
                            </Button>
                        </div>

                        {/* Mobile/Tablet Menu Button - Right */}
                        <button
                            className="lg:hidden p-2 text-foreground ml-auto"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        >
                            {isMobileMenuOpen ? <X /> : <Menu />}
                        </button>
                    </div>
                </div>
            </motion.nav>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="fixed top-16 md:top-20 left-0 right-0 z-40 bg-background/95 backdrop-blur-2xl border-b border-border/40 lg:hidden shadow-2xl overflow-hidden"
                    >
                        <div className="container mx-auto px-4 py-6">
                            <div className="flex flex-col gap-2">
                                {/* Mobile Navigation Links */}
                                {navLinks.map((link, index) => (
                                    <motion.a
                                        key={link.name}
                                        href={link.href}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            handleNavigation(link.href);
                                        }}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                        className="text-base font-medium text-muted-foreground hover:text-foreground transition-colors py-3 px-4 hover:bg-accent/50 rounded-lg"
                                    >
                                        {link.name}
                                    </motion.a>
                                ))}

                                {/* Mobile CTAs */}
                                <div className="flex flex-col gap-3 mt-4 pt-4 border-t border-border/40">
                                    <div className="flex items-center justify-between gap-4 px-2">
                                        <span className="text-sm font-medium text-muted-foreground">Tema</span>
                                        <div className="flex items-center gap-2">
                                            <LanguageSelector />

                                            <div className="flex bg-accent/50 p-1 rounded-lg border border-border/20">
                                                <button
                                                    onClick={() => theme === 'dark' && toggleTheme()}
                                                    className={`p-2 rounded-md transition-all ${theme === 'light' ? 'bg-primary text-primary-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
                                                >
                                                    <Sun className="h-4 w-4" />
                                                </button>
                                                <button
                                                    onClick={() => theme === 'light' && toggleTheme()}
                                                    className={`p-2 rounded-md transition-all ${theme === 'dark' ? 'bg-primary text-primary-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
                                                >
                                                    <Moon className="h-4 w-4" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <Button
                                        variant="outline"
                                        className="w-full gap-2 justify-center border-border/40 text-muted-foreground hover:bg-accent/50 hover:text-foreground bg-transparent"
                                        onClick={() => window.open(GITHUB_REPO, "_blank", "noopener,noreferrer")}
                                        aria-label="Ver repositorio en GitHub"
                                    >
                                        <Github className="h-4 w-4" />
                                        Ver en GitHub
                                    </Button>
                                    <Button
                                        onClick={() => handleNavigation("/releases")}
                                        className="w-full gap-2 justify-center bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/20 border-0"
                                    >
                                        <Download className="h-4 w-4" />
                                        {t('navbar.download')}
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Spacer to prevent content from going under navbar */}
            <div className="h-16 md:h-20" />
        </div>
    );
}
