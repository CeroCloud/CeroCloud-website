import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { FileQuestion, ArrowLeft, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";

export default function NotFound() {
    const { t } = useTranslation('notfound');

    return (
        <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 relative overflow-hidden">
            <Helmet>
                <title>{t('seo.title')}</title>
                <meta name="robots" content="noindex" />
            </Helmet>

            {/* Background Effects */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[100px] pointer-events-none" />

            <div className="relative z-10 text-center max-w-md mx-auto">
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="mb-8 relative inline-block"
                >
                    <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full" />
                    <div className="relative bg-background p-6 rounded-3xl border-2 border-primary/20 shadow-2xl">
                        <FileQuestion className="w-20 h-20 text-primary" />
                    </div>
                </motion.div>

                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                >
                    <h1 className="text-8xl font-black text-transparent bg-clip-text bg-gradient-to-b from-foreground to-foreground/50 mb-2">
                        404
                    </h1>
                    <h2 className="text-2xl font-bold mb-4 text-foreground">
                        {t('title')}
                    </h2>
                    <p className="text-muted-foreground mb-8 text-lg">
                        {t('description')}
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link to="/">
                            <Button size="lg" className="w-full sm:w-auto gap-2 group">
                                <Home className="w-4 h-4" />
                                {t('buttons.home')}
                            </Button>
                        </Link>
                        <button onClick={() => window.history.back()}>
                            <Button variant="outline" size="lg" className="w-full sm:w-auto gap-2 group">
                                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                                {t('buttons.back')}
                            </Button>
                        </button>
                    </div>
                </motion.div>
            </div>

            <div className="absolute bottom-8 text-xs text-muted-foreground font-mono">
                Error Code: 404_NOT_FOUND
            </div>
        </div>
    );
}
