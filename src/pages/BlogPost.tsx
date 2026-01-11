import { useParams, Navigate, Link } from 'react-router-dom';
import { blogPosts } from '@/content/blog';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, Calendar, Clock, Share2, Facebook, Twitter, Linkedin, ArrowRight, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, useScroll, useSpring } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import icon from "@/assets/cerocloud-icon.png";
import { useEffect, useState } from 'react';

export default function BlogPost() {
    const { slug } = useParams();
    const { t, i18n } = useTranslation('blog');
    const [scrolled, setScrolled] = useState(false);
    const [isCopied, setIsCopied] = useState(false);

    const post = blogPosts.find(p => p.slug === slug);
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleShare = async () => {
        const url = window.location.href;
        const shareData = {
            title: post?.versions.en.meta.title || "CeroCloud Blog",
            text: "Check out this article from CeroCloud!",
            url
        };

        if (navigator.share) {
            try {
                await navigator.share(shareData);
                return;
            } catch (err) {
                console.log("Error sharing:", err);
            }
        }

        try {
            await navigator.clipboard.writeText(url);
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000);
        } catch (err) {
            console.error("Failed to copy:", err);
        }
    };

    if (!post) {
        return <Navigate to="/404" replace />;
    }

    // Select localized version
    const currentLang = i18n.language.split('-')[0] as 'en' | 'es' | 'pt';
    const versions = post.versions as any;
    const version = versions[currentLang] || versions['en'];
    const { component: Component, meta } = version;

    // Find next post for recommendation
    const currentIndex = blogPosts.findIndex(p => p.slug === slug);
    const nextPost = blogPosts[(currentIndex + 1) % blogPosts.length];
    const nextPostVersion = (nextPost.versions as any)[currentLang] || (nextPost.versions as any)['en'];

    return (
        <>
            <Helmet>
                <title>{meta.title} - {t('title')}</title>
                <meta name="description" content={meta.description} />
                <meta property="og:image" content={meta.image} />
            </Helmet>

            {/* Reading Progress Bar */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-1.5 bg-primary origin-left z-50"
                style={{ scaleX }}
            />

            <div className="min-h-screen bg-background">
                {/* Floating Back Button & Header */}
                <header className={`fixed top-0 inset-x-0 z-40 transition-all duration-300 ${scrolled ? 'bg-background/80 backdrop-blur-md border-b border-border/50 py-3' : 'bg-transparent py-6'}`}>
                    <div className="container mx-auto px-4 flex items-center justify-between">
                        <Link to="/blog">
                            <Button variant="ghost" className="gap-2 pl-0 hover:pl-2 transition-all">
                                <ArrowLeft className="w-4 h-4" />
                                {scrolled ? <span className="font-semibold">{meta.title}</span> : t('back_to_blog')}
                            </Button>
                        </Link>
                        <div className="flex gap-2">
                            <Button size="icon" variant="ghost" className="rounded-full" onClick={handleShare}>
                                {isCopied ? <Check className="w-4 h-4 text-green-500" /> : <Share2 className="w-4 h-4" />}
                            </Button>
                        </div>
                    </div>
                </header>

                <main className="pt-24 pb-20">
                    {/* Hero Section with Image */}
                    <div className="container mx-auto px-4 max-w-4xl mb-12">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="aspect-video rounded-3xl overflow-hidden shadow-2xl mb-10 relative group"
                        >
                            <img
                                src={meta.image}
                                alt={meta.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />

                            {/* Floating Meta on Image */}
                            <div className="absolute bottom-0 left-0 p-6 md:p-10 w-full text-white">
                                <div className="flex flex-wrap items-center gap-4 mb-3 text-sm font-medium opacity-90">
                                    <span className="bg-primary px-3 py-1 rounded-full text-primary-foreground">
                                        {meta.tags?.[0]}
                                    </span>
                                    <span className="flex items-center gap-1.5">
                                        <Calendar className="w-4 h-4" /> {meta.date}
                                    </span>
                                    <span className="flex items-center gap-1.5">
                                        <Clock className="w-4 h-4" /> 5 min read
                                    </span>
                                </div>
                                <h1 className="text-3xl md:text-5xl font-bold leading-tight shadow-sm text-balance">
                                    {meta.title}
                                </h1>
                            </div>
                        </motion.div>

                        {/* Content Row */}
                        <div className="flex flex-col lg:flex-row gap-12">
                            {/* Article Body */}
                            <article className="prose prose-lg dark:prose-invert prose-headings:font-bold prose-a:text-primary hover:prose-a:underline prose-img:rounded-xl max-w-none flex-grow">
                                <Component />
                            </article>

                            {/* Sidebar / Author */}
                            <aside className="lg:w-72 flex-shrink-0 space-y-8">
                                <div className="sticky top-28">
                                    <div className="bg-card border border-border/50 rounded-2xl p-6 shadow-sm">
                                        <h4 className="font-semibold mb-4 text-sm uppercase tracking-wide text-muted-foreground">{t('author_label') || 'Author'}</h4>
                                        <div className="flex items-center gap-4 mb-4">
                                            <div className="w-12 h-12 rounded-full border border-border p-1 bg-background overflow-hidden relative">
                                                <img src={icon} alt="CeroCloud" className="w-full h-full object-contain" />
                                            </div>
                                            <div>
                                                <p className="font-bold text-foreground">{meta.author}</p>
                                                <p className="text-xs text-muted-foreground">{t('team_label')}</p>
                                            </div>
                                        </div>
                                        <div className="flex gap-2 justify-center pt-4 border-t border-border/30">
                                            <Button size="icon" variant="outline" className="h-8 w-8 rounded-full"><Twitter className="w-4 h-4" /></Button>
                                            <Button size="icon" variant="outline" className="h-8 w-8 rounded-full"><Linkedin className="w-4 h-4" /></Button>
                                            <Button size="icon" variant="outline" className="h-8 w-8 rounded-full"><Facebook className="w-4 h-4" /></Button>
                                        </div>
                                    </div>

                                    {/* Next Recommendation */}
                                    <div className="mt-8">
                                        <h4 className="font-semibold mb-4 text-sm uppercase tracking-wide text-muted-foreground">{t('up_next')}</h4>
                                        <Link to={`/ blog / ${nextPost.slug} `} className="group">
                                            <div className="bg-card border border-border/50 rounded-2xl overflow-hidden hover:border-primary/50 transition-colors">
                                                <div className="aspect-[2/1] overflow-hidden">
                                                    <img src={nextPostVersion.meta.image} alt="" className="w-full h-full object-cover" />
                                                </div>
                                                <div className="p-4">
                                                    <h5 className="font-bold leading-tight group-hover:text-primary transition-colors">{nextPostVersion.meta.title}</h5>
                                                    <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground font-medium text-primary">
                                                        {t('read_now')} <ArrowRight className="w-3 h-3" />
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                            </aside>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}
