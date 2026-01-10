import { ShoppingCart, Package, BarChart3, AlertCircle, Plus, Printer } from "lucide-react";

import { useTheme } from "@/contexts/ThemeContext";
import welcomeLight from "@/assets/docs/welcome-light.png";
import welcomeDark from "@/assets/docs/welcome-dark.png";
import posLight from "@/assets/docs/pos-light.png";
import posDark from "@/assets/docs/pos-dark.png";
import { useTranslation } from "react-i18next";

export default function UserManual() {
    const { theme } = useTheme();
    const { t } = useTranslation('docs');



    return (
        <div className="space-y-16 max-w-4xl animate-in fade-in duration-500">
            {/* Header */}
            <div>
                <h1 className="text-4xl font-extrabold mb-6">{t('manual.hero.title')}</h1>
                <p className="text-xl text-muted-foreground mb-8">
                    {t('manual.hero.subtitle')}
                </p>
                <div className="flex gap-4 flex-wrap">
                    <a href="#primer-inicio" className="px-4 py-2 bg-muted rounded-lg text-sm font-medium hover:bg-muted/80 transition-colors">{t('manual.nav.setup')}</a>
                    <a href="#inventario" className="px-4 py-2 bg-muted rounded-lg text-sm font-medium hover:bg-muted/80 transition-colors">{t('manual.nav.inventory')}</a>
                    <a href="#pos" className="px-4 py-2 bg-muted rounded-lg text-sm font-medium hover:bg-muted/80 transition-colors">{t('manual.nav.pos')}</a>
                    <a href="#reportes" className="px-4 py-2 bg-muted rounded-lg text-sm font-medium hover:bg-muted/80 transition-colors">{t('manual.nav.reports')}</a>
                </div>
            </div>

            {/* Primer Inicio */}
            <section id="primer-inicio" className="space-y-6 scroll-mt-24">
                <h2 className="text-3xl font-bold border-b pb-4">{t('manual.setup.title')}</h2>
                <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div>
                        <p className="text-muted-foreground mb-4 leading-relaxed">
                            {t('manual.setup.description')}
                        </p>
                        <ul className="space-y-3">
                            <li className="flex items-start gap-3">
                                <span className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs font-bold mt-0.5">1</span>
                                <div>
                                    <strong className="block text-foreground">{t('manual.setup.steps.step1.title')}</strong>
                                    <span className="text-sm text-muted-foreground">{t('manual.setup.steps.step1.text')}</span>
                                </div>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs font-bold mt-0.5">2</span>
                                <div>
                                    <strong className="block text-foreground">{t('manual.setup.steps.step2.title')}</strong>
                                    <span className="text-sm text-muted-foreground">{t('manual.setup.steps.step2.text')}</span>
                                </div>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs font-bold mt-0.5">3</span>
                                <div>
                                    <strong className="block text-foreground">{t('manual.setup.steps.step3.title')}</strong>
                                    <span className="text-sm text-muted-foreground">{t('manual.setup.steps.step3.text')}</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div className="rounded-xl overflow-hidden border border-border shadow-md">
                        <img
                            loading="lazy"
                            src={theme === "dark" ? welcomeDark : welcomeLight}
                            alt={t('manual.setup.image_alt')}
                            className="w-full h-auto object-cover transition-all duration-300"
                        />
                    </div>
                </div>
            </section>

            {/* Inventario */}
            <section id="inventario" className="space-y-6 scroll-mt-24">
                <div className="flex items-center gap-3 mb-2">
                    <Package className="w-8 h-8 text-blue-500" />
                    <h2 className="text-3xl font-bold">{t('manual.inventory.title')}</h2>
                </div>
                <p className="text-muted-foreground text-lg">
                    {t('manual.inventory.subtitle')}
                </p>

                <div className="bg-card border rounded-xl overflow-hidden">
                    <div className="p-6 border-b bg-muted/30">
                        <h3 className="font-bold text-lg mb-2">{t('manual.inventory.actions.title')}</h3>
                    </div>
                    <div className="divide-y">
                        <div className="p-6 flex gap-4">
                            <div className="p-3 bg-green-500/10 text-green-500 rounded-lg h-fit">
                                <Plus className="w-6 h-6" />
                            </div>
                            <div>
                                <h4 className="font-bold mb-1">{t('manual.inventory.actions.add_product.title')}</h4>
                                <p className="text-sm text-muted-foreground mb-2">{t('manual.inventory.actions.add_product.description')}</p>
                                <ul className="text-sm list-disc pl-5 text-muted-foreground space-y-1">
                                    <li><strong>{t('manual.inventory.actions.add_product.fields.name.label')}:</strong> {t('manual.inventory.actions.add_product.fields.name.desc')}</li>
                                    <li><strong>{t('manual.inventory.actions.add_product.fields.sku.label')}:</strong> {t('manual.inventory.actions.add_product.fields.sku.desc')}</li>
                                    <li><strong>{t('manual.inventory.actions.add_product.fields.price.label')}:</strong> {t('manual.inventory.actions.add_product.fields.price.desc')}</li>
                                    <li><strong>{t('manual.inventory.actions.add_product.fields.stock.label')}:</strong> {t('manual.inventory.actions.add_product.fields.stock.desc')}</li>
                                </ul>
                            </div>
                        </div>
                        <div className="p-6 flex gap-4">
                            <div className="p-3 bg-orange-500/10 text-orange-500 rounded-lg h-fit">
                                <AlertCircle className="w-6 h-6" />
                            </div>
                            <div>
                                <h4 className="font-bold mb-1">{t('manual.inventory.actions.low_stock.title')}</h4>
                                <p className="text-sm text-muted-foreground">
                                    {t('manual.inventory.actions.low_stock.description')}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* POS */}
            <section id="pos" className="space-y-6 scroll-mt-24">
                <div className="flex items-center gap-3 mb-2">
                    <ShoppingCart className="w-8 h-8 text-green-500" />
                    <h2 className="text-3xl font-bold">{t('manual.pos.title')}</h2>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    <div className="rounded-xl overflow-hidden border border-border shadow-md">
                        <img
                            loading="lazy"
                            src={theme === "dark" ? posDark : posLight}
                            alt={t('manual.pos.image_alt')}
                            className="w-full h-auto object-cover transition-all duration-300"
                        />
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-xl font-bold">{t('manual.pos.flow.title')}</h3>
                        <ol className="space-y-4">
                            <li className="flex gap-3">
                                <span className="font-mono bg-primary/10 text-primary px-2 rounded">01</span>
                                <p className="text-sm text-muted-foreground"><strong>{t('manual.pos.flow.step1.label')}:</strong> {t('manual.pos.flow.step1.text')}</p>
                            </li>
                            <li className="flex gap-3">
                                <span className="font-mono bg-primary/10 text-primary px-2 rounded">02</span>
                                <p className="text-sm text-muted-foreground"><strong>{t('manual.pos.flow.step2.label')}:</strong> {t('manual.pos.flow.step2.text')}</p>
                            </li>
                            <li className="flex gap-3">
                                <span className="font-mono bg-primary/10 text-primary px-2 rounded">03</span>
                                <p className="text-sm text-muted-foreground"><strong>{t('manual.pos.flow.step3.label')}:</strong> {t('manual.pos.flow.step3.text')}</p>
                            </li>
                            <li className="flex gap-3">
                                <span className="font-mono bg-primary/10 text-primary px-2 rounded">04</span>
                                <p className="text-sm text-muted-foreground"><strong>{t('manual.pos.flow.step4.label')}:</strong> {t('manual.pos.flow.step4.text')}</p>
                            </li>
                        </ol>
                    </div>
                </div>

                <div className="bg-blue-500/5 p-6 rounded-xl border border-blue-500/10 flex gap-4">
                    <Printer className="w-6 h-6 text-blue-500 flex-shrink-0" />
                    <div>
                        <h4 className="font-bold text-blue-500 mb-1">{t('manual.pos.tip.title')}</h4>
                        <p className="text-sm text-muted-foreground">
                            {t('manual.pos.tip.text')} {'>'} {t('manual.pos.tip.path')}
                        </p>
                    </div>
                </div>
            </section>

            {/* Reports */}
            <section id="reportes" className="space-y-6 scroll-mt-24">
                <div className="flex items-center gap-3 mb-2">
                    <BarChart3 className="w-8 h-8 text-purple-500" />
                    <h2 className="text-3xl font-bold">{t('manual.reports.title')}</h2>
                </div>
                <p className="text-muted-foreground mb-6">
                    {t('manual.reports.subtitle')}
                </p>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <ReportCard title={t('manual.reports.cards.cutoff.title')} desc={t('manual.reports.cards.cutoff.desc')} />
                    <ReportCard title={t('manual.reports.cards.top_products.title')} desc={t('manual.reports.cards.top_products.desc')} />
                    <ReportCard title={t('manual.reports.cards.history.title')} desc={t('manual.reports.cards.history.desc')} />
                    <ReportCard title={t('manual.reports.cards.inventory_value.title')} desc={t('manual.reports.cards.inventory_value.desc')} />
                    <ReportCard title={t('manual.reports.cards.profits.title')} desc={t('manual.reports.cards.profits.desc')} />
                    <ReportCard title={t('manual.reports.cards.export.title')} desc={t('manual.reports.cards.export.desc')} />
                </div>
            </section>
        </div>
    );
}

function ReportCard({ title, desc }: { title: string, desc: string }) {
    return (
        <div className="p-4 rounded-xl bg-card border hover:border-primary/50 transition-colors">
            <h4 className="font-bold mb-2">{title}</h4>
            <p className="text-xs text-muted-foreground">{desc}</p>
        </div>
    )
}
