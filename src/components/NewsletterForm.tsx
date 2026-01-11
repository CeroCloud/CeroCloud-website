import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Mail, Loader2, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function NewsletterForm() {
    const { t } = useTranslation();
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email || !/\S+@\S+\.\S+/.test(email)) return;

        setStatus('loading');

        // Simulating API Call
        setTimeout(() => {
            setStatus('success');
            setEmail('');
            // Reset success message after 5 seconds
            setTimeout(() => setStatus('idle'), 5000);
        }, 1500);
    };

    return (
        <div className="w-full mt-4">
            <h4 className="font-semibold mb-2 text-sm uppercase tracking-wider flex items-center gap-2 text-foreground">
                <Mail className="w-4 h-4 text-primary" />
                {t('newsletter.title')}
            </h4>
            <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                {t('newsletter.description')}
            </p>

            <form onSubmit={handleSubmit} className="relative">
                <AnimatePresence mode='wait'>
                    {status === 'success' ? (
                        <motion.div
                            key="success"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="p-3 rounded-lg bg-green-500/10 border border-green-500/20 text-green-500 flex items-center gap-2 text-sm font-medium"
                        >
                            <Check className="w-4 h-4" />
                            {t('newsletter.success')}
                        </motion.div>
                    ) : (
                        <motion.div
                            key="form"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0, position: 'absolute' }}
                            className="flex flex-col sm:flex-row gap-2"
                        >
                            <input
                                type="email"
                                placeholder={t('newsletter.placeholder')}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                disabled={status === 'loading'}
                                className="flex-1 bg-background/40 border border-border/40 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-all placeholder:text-muted-foreground/50 disabled:opacity-50 text-foreground"
                            />
                            <Button
                                type="submit"
                                size="sm"
                                disabled={status === 'loading'}
                                className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/20 shrink-0"
                            >
                                {status === 'loading' ? (
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                ) : (
                                    t('newsletter.button')
                                )}
                            </Button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </form>
        </div>
    );
}
