import { useState } from "react";
import { ThumbsUp, ThumbsDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";

interface DocFeedbackProps {
    articleId: string;
}

export default function DocFeedback({ articleId }: DocFeedbackProps) {
    const { t } = useTranslation('docs');
    const [status, setStatus] = useState<'idle' | 'helpful' | 'not-helpful'>('idle');

    const handleVote = (vote: 'helpful' | 'not-helpful') => {
        setStatus(vote);
        // Todo: Send analytics event
        console.log(`User voted ${vote} for ${articleId}`);
    };

    return (
        <div className="mt-16 pt-8 border-t border-border">
            <AnimatePresence mode="wait">
                {status === 'idle' ? (
                    <motion.div
                        key="question"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex flex-col sm:flex-row items-center gap-4 justify-between bg-muted/20 p-6 rounded-xl border border-border"
                    >
                        <span className="font-semibold text-foreground">
                            {t('feedback.question')}
                        </span>
                        <div className="flex gap-2">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleVote('helpful')}
                                className="group hover:border-green-500 hover:bg-green-500/10"
                            >
                                <ThumbsUp className="w-4 h-4 mr-2 group-hover:text-green-500" />
                                {t('common.yes', { defaultValue: 'Sí' })}
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleVote('not-helpful')}
                                className="group hover:border-red-500 hover:bg-red-500/10"
                            >
                                <ThumbsDown className="w-4 h-4 mr-2 group-hover:text-red-500" />
                                {t('common.no', { defaultValue: 'No' })}
                            </Button>
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        key="thanks"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`p-6 rounded-xl border flex items-center gap-3 ${status === 'helpful'
                            ? 'bg-green-500/10 border-green-500/20 text-green-600 dark:text-green-400'
                            : 'bg-muted/30 border-border text-muted-foreground'
                            }`}
                    >
                        {status === 'helpful' ? (
                            <>
                                <ThumbsUp className="w-5 h-5" />
                                <span className="font-medium">{t('feedback.thanks')}</span>
                            </>
                        ) : (
                            <>
                                <ThumbsDown className="w-5 h-5" />
                                <span className="font-medium">{t('feedback.improved')}</span>
                            </>
                        )}
                        <Button
                            variant="ghost"
                            size="sm"
                            className="ml-auto text-xs opacity-70 hover:opacity-100"
                            onClick={() => setStatus('idle')}
                        >
                            {t('common.undo', { defaultValue: 'Deshacer' })}
                        </Button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
