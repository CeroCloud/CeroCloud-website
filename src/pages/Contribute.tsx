import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { MessageSquare, Bug, Heart, Code, Globe, Star } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function Contribute() {
    const { t } = useTranslation('about');

    return (
        <div className="min-h-screen bg-background pt-24 pb-20">
            <Helmet>
                <title>{t('contribute.seo.title')}</title>
                <meta name="description" content={t('contribute.seo.description')} />
            </Helmet>

            <div className="container mx-auto px-4 max-w-4xl">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center mb-20"
                >
                    <div className="flex justify-center gap-4 mb-8">
                        <span className="px-4 py-1.5 rounded-full bg-green-500/10 text-green-500 text-sm font-bold border border-green-500/20">
                            PRs Welcome
                        </span>
                        <span className="px-4 py-1.5 rounded-full bg-blue-500/10 text-blue-500 text-sm font-bold border border-blue-500/20">
                            Help Wanted
                        </span>
                    </div>
                    <h1 className="text-5xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-500">
                        {t('contribute.hero.title')}
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        {t('contribute.hero.subtitle')}
                    </p>
                </motion.div>

                {/* Ways to contribute */}
                <div className="grid md:grid-cols-2 gap-6 mb-24">
                    <ContributionCard
                        icon={Bug}
                        title={t('contribute.cards.bugs.title')}
                        desc={t('contribute.cards.bugs.description')}
                        action={t('contribute.cards.bugs.action')}
                        href="https://github.com/CeroCloud/CeroCloud-Desktop/issues/new"
                    />
                    <ContributionCard
                        icon={Code}
                        title={t('contribute.cards.code.title')}
                        desc={t('contribute.cards.code.description')}
                        action={t('contribute.cards.code.action')}
                        href="https://github.com/CeroCloud/CeroCloud-Desktop"
                    />
                    <ContributionCard
                        icon={MessageSquare}
                        title={t('contribute.cards.discuss.title')}
                        desc={t('contribute.cards.discuss.description')}
                        action={t('contribute.cards.discuss.action')}
                        href="https://github.com/CeroCloud/CeroCloud-Desktop/discussions"
                    />
                    <ContributionCard
                        icon={Star}
                        title={t('contribute.cards.spread.title')}
                        desc={t('contribute.cards.spread.description')}
                        action={t('contribute.cards.spread.action')}
                        href="https://github.com/CeroCloud/CeroCloud-Desktop"
                    />
                </div>

                {/* Steps */}
                <div className="relative border-l border-border ml-4 md:ml-8 pl-8 md:pl-12 space-y-12 mb-20">
                    <Step
                        number="1"
                        title={t('contribute.steps.step1.title')}
                        desc={t('contribute.steps.step1.description')}
                    />
                    <Step
                        number="2"
                        title={t('contribute.steps.step2.title')}
                        desc={t('contribute.steps.step2.description')}
                    />
                    <Step
                        number="3"
                        title={t('contribute.steps.step3.title')}
                        desc={t('contribute.steps.step3.description')}
                    />
                    <Step
                        number="4"
                        title={t('contribute.steps.step4.title')}
                        desc={t('contribute.steps.step4.description')}
                    />
                </div>

                {/* Thank you */}
                <div className="text-center bg-muted/30 rounded-3xl p-12 border border-border">
                    <Heart className="w-12 h-12 text-red-500 fill-red-500 mx-auto mb-6 animate-pulse" />
                    <h2 className="text-3xl font-bold mb-4">{t('contribute.thanks.title')}</h2>
                    <p className="text-muted-foreground mb-8 text-lg">
                        {t('contribute.thanks.description')}
                    </p>
                    <a
                        href="https://github.com/CeroCloud/CeroCloud-Desktop/graphs/contributors"
                        target="_blank"
                        rel="noreferrer"
                        className="text-primary hover:underline font-medium"
                    >
                        {t('contribute.thanks.link')} →
                    </a>
                </div>
            </div>
        </div>
    );
}

function ContributionCard({ icon: Icon, title, desc, action, href }: { icon: any, title: string, desc: string, action: string, href: string }) {
    return (
        <motion.div
            whileHover={{ y: -5 }}
            className="p-8 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all shadow-sm group"
        >
            <Icon className="w-8 h-8 text-primary mb-4" />
            <h3 className="text-xl font-bold mb-3">{title}</h3>
            <p className="text-muted-foreground mb-6 h-20">{desc}</p>
            <a
                href={href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-sm font-bold text-primary group-hover:gap-3 transition-all"
            >
                {action} <Globe className="w-4 h-4" />
            </a>
        </motion.div>
    );
}

function Step({ number, title, desc }: { number: string, title: string, desc: string }) {
    return (
        <div className="relative">
            <div className="absolute -left-[45px] md:-left-[61px] top-0 flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold text-sm ring-4 ring-background">
                {number}
            </div>
            <h3 className="text-xl font-bold mb-2">{title}</h3>
            <p className="text-muted-foreground">{desc}</p>
        </div>
    );
}
