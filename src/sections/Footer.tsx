import { ExternalLink, Heart, BookOpen } from "lucide-react";
import icon from "@/assets/cerocloud-icon.png";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useLatestRelease } from "@/lib/useLatestRelease";
import NewsletterForm from "@/components/NewsletterForm";

export default function Footer() {
    const { t } = useTranslation();
    const { release, loading } = useLatestRelease();
    const currentYear = new Date().getFullYear();

    return (
        <div className="dark bg-[hsl(222.2_47.4%_11.2%)] text-[hsl(210_40%_98%)]">
            <footer className="relative bg-background border-t border-border/50 overflow-hidden pt-10 pb-6">
                {/* RESTORED: Background Grid & Effects */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
                <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

                <div className="container mx-auto px-4 relative z-10">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12 mb-10">
                        {/* 1. BRAND COLUMN */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <img src={icon} alt="CeroCloud" className="w-10 h-10 drop-shadow-md" />
                                <div>
                                    <h3 className="font-bold text-lg leading-none">CeroCloud</h3>
                                    <p className="text-xs text-muted-foreground mt-1">{t('footer.brand.slogan')}</p>
                                </div>
                            </div>
                            <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">
                                {t('footer.brand.description')}
                            </p>

                            <div className="inline-flex items-center gap-2 px-3 py-1 bg-secondary/50 rounded-full border border-border/50">
                                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                                <span className="text-xs font-mono text-muted-foreground">
                                    {loading ? "..." : (release?.tag_name || "v1.0.0")}
                                </span>
                            </div>
                        </div>

                        {/* 2. RESOURCES */}
                        <div>
                            <h4 className="font-semibold text-sm mb-4 text-foreground flex items-center gap-2">
                                <BookOpen className="w-4 h-4 text-primary" />
                                {t('footer.columns.resources.title')}
                            </h4>
                            <ul className="space-y-2.5 text-sm md:text-[13px] text-muted-foreground">
                                <li><Link to="/docs" className="hover:text-primary transition-colors">{t('footer.columns.resources.docs')}</Link></li>
                                <li><Link to="/docs?section=manual" className="hover:text-primary transition-colors">{t('footer.columns.resources.user_manual')}</Link></li>
                                <li><Link to="/docs?section=install" className="hover:text-primary transition-colors">{t('footer.columns.resources.install_guide')}</Link></li>
                            </ul>
                        </div>

                        {/* 3. COMMUNITY */}
                        <div>
                            <h4 className="font-semibold text-sm mb-4 text-foreground flex items-center gap-2">
                                <Heart className="w-4 h-4 text-primary" />
                                {t('footer.columns.community.title')}
                            </h4>
                            <ul className="space-y-2.5 text-sm md:text-[13px] text-muted-foreground">
                                <li><Link to="/contribute" className="hover:text-primary transition-colors">{t('footer.columns.community.contribute')}</Link></li>
                                <li><a href="https://github.com/CeroCloud/CeroCloud-Desktop" target="_blank" className="hover:text-primary transition-colors inline-flex items-center gap-1">GitHub <ExternalLink className="w-3 h-3" /></a></li>
                                <li><Link to="/roadmap" className="hover:text-primary transition-colors">{t('footer.columns.community.roadmap')}</Link></li>
                            </ul>
                        </div>

                        {/* 4. NEWSLETTER (Compact) */}
                        <div className="bg-muted/10 rounded-xl p-5 border border-border/30">
                            <NewsletterForm />
                        </div>
                    </div>

                    {/* Bottom Bar - Corrected Translations */}
                    <div className="pt-6 border-t border-border/50 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
                        <div className="flex items-center gap-2">
                            <span>© {currentYear} CeroCloud</span>
                            <span className="w-1 h-1 bg-border rounded-full" />
                            <span>{t('footer.bottom.tagline1')}</span>
                        </div>

                        <div className="flex items-center gap-6">
                            <Link to="/license" className="hover:text-foreground">{t('footer.bottom.privacy')}</Link>
                            <Link to="/license" className="hover:text-foreground">{t('footer.bottom.terms')}</Link>
                            <div className="flex items-center gap-1.5 opacity-80">
                                <span>{t('footer.bottom.made_with')}</span>
                                <Heart className="w-3 h-3 text-red-500 fill-red-500" />
                                <span>{t('footer.bottom.for_local')}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
