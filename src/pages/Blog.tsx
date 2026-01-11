import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { blogPosts } from "@/content/blog";
import { Link } from "react-router-dom";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import icon from "@/assets/cerocloud-icon.png";

export default function Blog() {
    const { t, i18n } = useTranslation('blog');
    const currentLang = i18n.language.split('-')[0] as 'en' | 'es' | 'pt';

    return (
        <>
            <Helmet>
                <title>{t('title')} - CeroCloud</title>
                <meta name="description" content={t('subtitle')} />
            </Helmet>

            <div className="min-h-screen bg-background flex flex-col">
                {/* HERO SECTION */}
                <section className="relative pt-32 pb-20 px-4 overflow-hidden">
                    <div className="absolute inset-0 bg-primary/5 -skew-y-3 origin-top-left scale-110 pointer-events-none" />
                    <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

                    <div className="container mx-auto text-center relative z-10 max-w-3xl">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-semibold inline-block mb-6 border border-primary/20"
                        >
                            Blog & News
                        </motion.div>
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-4xl md:text-6xl font-black mb-6 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70"
                        >
                            {t('title')}
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="text-xl text-muted-foreground"
                        >
                            {t('subtitle')}
                        </motion.p>
                    </div>
                </section>

                {/* POSTS GRID */}
                <section className="py-12 px-4 bg-muted/20 flex-grow">
                    <div className="container mx-auto">
                        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                            {blogPosts.map((post, index) => {
                                const versions = post.versions as any;
                                const version = versions[currentLang] || versions['en'];
                                const { meta } = version;

                                return (
                                    <motion.article
                                        key={post.slug}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        className="group flex flex-col bg-card border border-border/50 rounded-2xl overflow-hidden hover:shadow-xl hover:shadow-primary/5 hover:border-primary/30 transition-all duration-300"
                                    >
                                        {/* Cover Image */}
                                        <Link to={`/blog/${post.slug}`} className="block overflow-hidden aspect-video relative">
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                            <img
                                                src={meta.image}
                                                alt={meta.title}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                loading="lazy"
                                            />
                                            {/* Category Badge on Image */}
                                            <div className="absolute top-4 left-4 z-20">
                                                <Badge variant="secondary" className="bg-background/90 backdrop-blur text-foreground shadow-sm">
                                                    {meta.tags?.[0] || 'General'}
                                                </Badge>
                                            </div>
                                        </Link>

                                        <div className="p-6 flex flex-col flex-grow relative">
                                            {/* Meta Header */}
                                            <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                                                <div className="flex items-center gap-1.5">
                                                    <Calendar className="w-3.5 h-3.5" />
                                                    <time>{meta.date}</time>
                                                </div>
                                                <div className="flex items-center gap-1.5">
                                                    <Clock className="w-3.5 h-3.5" />
                                                    <span>5 min read</span>
                                                </div>
                                            </div>

                                            <Link to={`/blog/${post.slug}`}>
                                                <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors leading-tight">
                                                    {meta.title}
                                                </h3>
                                            </Link>

                                            <p className="text-muted-foreground text-sm line-clamp-3 mb-6 flex-grow leading-relaxed">
                                                {meta.description}
                                            </p>

                                            {/* Footer */}
                                            <div className="pt-4 border-t border-border/30 flex items-center justify-between mt-auto">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-8 h-8 rounded-full bg-background border border-border/50 flex items-center justify-center overflow-hidden p-1">
                                                        <img src={icon} alt="CeroCloud" className="w-full h-full object-contain" />
                                                    </div>
                                                    <span className="text-xs font-medium text-foreground">{meta.author}</span>
                                                </div>
                                                <Link
                                                    to={`/blog/${post.slug}`}
                                                    className="text-sm font-semibold text-primary inline-flex items-center hover:underline"
                                                >
                                                    {t('read_article')} <ArrowRight className="w-4 h-4 ml-1" />
                                                </Link>
                                            </div>
                                        </div>
                                    </motion.article>
                                );
                            })}
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}
