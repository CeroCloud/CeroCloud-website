import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { Scale, Check, X, Info } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function License() {
    const { t } = useTranslation('legal');

    const allowedItems = [
        "use",
        "install",
        "modify",
        "study",
        "share"
    ];

    const restrictedItems = [
        "sell",
        "charge",
        "saas",
        "package",
        "remove_notice"
    ];

    return (
        <div className="min-h-screen bg-background pt-24 pb-20">
            <Helmet>
                <title>{t('license.seo.title')}</title>
                <meta name="description" content={t('license.seo.description')} />
            </Helmet>

            <div className="container mx-auto px-4 max-w-4xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center justify-center p-3 bg-yellow-500/10 rounded-full mb-6 text-yellow-500">
                        <Scale className="w-8 h-8" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">{t('license.hero.title')}</h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        {t('license.hero.subtitle_start')} <strong className="text-foreground">{t('license.hero.subtitle_opensource')}</strong> {t('license.hero.subtitle_under')} <span className="text-foreground font-semibold">MIT + Commons Clause</span>.
                        <br />{t('license.hero.subtitle_end')}
                    </p>
                </motion.div>

                {/* License Comparison Grid */}
                <div className="grid md:grid-cols-2 gap-8 mb-20">
                    {/* Allowed */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="bg-green-500/5 border border-green-500/20 rounded-3xl p-8"
                    >
                        <h3 className="text-2xl font-bold text-green-500 mb-6 flex items-center gap-3">
                            <Check className="w-6 h-6 border-2 border-green-500 rounded-full p-0.5" />
                            {t('license.allowed.title')}
                        </h3>
                        <ul className="space-y-4">
                            {allowedItems.map((item, i) => (
                                <li key={i} className="flex items-start gap-3 text-muted-foreground">
                                    <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                                    <span>{t(`license.allowed.items.${item}`)}</span>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Restricted */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="bg-red-500/5 border border-red-500/20 rounded-3xl p-8"
                    >
                        <h3 className="text-2xl font-bold text-red-500 mb-6 flex items-center gap-3">
                            <X className="w-6 h-6 border-2 border-red-500 rounded-full p-0.5" />
                            {t('license.restricted.title')}
                        </h3>
                        <div className="mb-4 text-xs font-semibold uppercase tracking-wider text-red-500/80">{t('license.restricted.badge')}</div>
                        <ul className="space-y-4">
                            {restrictedItems.map((item, i) => (
                                <li key={i} className="flex items-start gap-3 text-muted-foreground">
                                    <X className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                                    <span>{t(`license.restricted.items.${item}`)}</span>
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                </div>

                {/* FAQ Section */}
                <div className="space-y-8 mb-20 bg-muted/20 p-8 rounded-2xl border border-border">
                    <h2 className="text-2xl font-bold ">{t('license.faq.title')}</h2>

                    <div className="space-y-6">
                        <div>
                            <h4 className="font-bold text-lg mb-2">{t('license.faq.q1.question')}</h4>
                            <p className="text-muted-foreground">
                                {t('license.faq.q1.answer')}
                            </p>
                        </div>
                        <div>
                            <h4 className="font-bold text-lg mb-2">{t('license.faq.q2.question')}</h4>
                            <p className="text-muted-foreground">
                                {t('license.faq.q2.answer')}
                            </p>
                        </div>
                        <div>
                            <h4 className="font-bold text-lg mb-2">{t('license.faq.q3.question')}</h4>
                            <p className="text-muted-foreground">
                                {t('license.faq.q3.answer')}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Disclaimer */}
                <div className="flex bg-blue-500/10 border border-blue-500/20 p-6 rounded-xl gap-4 items-start">
                    <Info className="w-6 h-6 text-blue-500 flex-shrink-0 mt-1" />
                    <div>
                        <h4 className="font-bold text-blue-500 mb-1">{t('license.disclaimer.title')}</h4>
                        <p className="text-sm text-muted-foreground">
                            {t('license.disclaimer.text')}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
