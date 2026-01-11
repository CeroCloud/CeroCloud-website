import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Download, Github, ExternalLink, Shield, Rocket, HardDrive, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useOsDetection } from "@/lib/useOsDetection";
import { useLatestRelease } from "@/lib/useLatestRelease";
import { useTranslation } from "react-i18next";

export default function DownloadSection() {
    const navigate = useNavigate();
    const os = useOsDetection();
    const { release, loading } = useLatestRelease();
    const { t } = useTranslation('landing');

    const getDownloadButtonText = () => {
        switch (os) {
            case 'windows': return t('download.button.windows');
            case 'mac': return t('download.button.mac');
            case 'linux': return t('download.button.linux');
            default: return t('download.button.default');
        }
    };

    const handleDownload = () => {
        if (!release) {
            navigate("/releases");
            return;
        }

        let assetUrl = "";

        // Try to find specific asset based on OS
        if (os === 'windows') {
            const asset = release.assets.find(a => a.name.endsWith('.exe'));
            if (asset) assetUrl = asset.browser_download_url;
        } else if (os === 'linux') {
            // Prefer AppImage for Linux as it's most universal
            const asset = release.assets.find(a => a.name.endsWith('.AppImage')) || release.assets.find(a => a.name.endsWith('.deb'));
            if (asset) assetUrl = asset.browser_download_url;
        } else if (os === 'mac') {
            const asset = release.assets.find(a => a.name.endsWith('.dmg'));
            if (asset) assetUrl = asset.browser_download_url;
        }

        // Fallback to releases page if asset not found or OS unknown
        if (assetUrl) {
            window.open(assetUrl, '_blank');
        } else {
            navigate("/releases");
        }
    };

    return (
        <section id="download" className="py-20 bg-muted/30 relative overflow-hidden">
            {/* Animated background */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5" />

            <div className="container mx-auto px-4 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="max-w-4xl mx-auto"
                >
                    <Card className="border-2 border-primary/20 shadow-2xl overflow-hidden">

                        <CardHeader className="text-center pb-6">
                            <motion.div
                                initial={{ scale: 0 }}
                                whileInView={{ scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                                className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-primary to-primary/60 rounded-2xl flex items-center justify-center"
                            >
                                <Download className="w-10 h-10 text-white" />
                            </motion.div>

                            <CardTitle className="text-3xl md:text-4xl mb-4">
                                {t('download.title')}
                            </CardTitle>
                            <CardDescription className="text-lg">
                                {loading ? (
                                    <span className="flex items-center justify-center gap-2">
                                        <Loader2 className="w-4 h-4 animate-spin" /> {t('download.loading_version')}
                                    </span>
                                ) : (
                                    <>
                                        {t('download.version_prefix')} <span className="font-bold text-foreground">{release?.tag_name === release?.name ? release?.tag_name : `${release?.tag_name} - ${release?.name || "Release"}`}</span>
                                    </>
                                )}
                            </CardDescription>
                        </CardHeader>

                        <CardContent className="space-y-6">
                            {/* Download Buttons */}
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Button
                                    size="lg"
                                    className="text-lg px-8 py-6 group shadow-xl shadow-primary/20 hover:shadow-primary/40 hover:-translate-y-1 transition-all bg-primary hover:bg-primary/90"
                                    onClick={handleDownload}
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                    ) : (
                                        <Download className="mr-2 h-5 w-5 group-hover:animate-bounce" />
                                    )}
                                    {getDownloadButtonText()}
                                </Button>
                                <a href="https://github.com/CeroCloud/CeroCloud-Desktop" target="_blank" rel="noreferrer">
                                    <Button size="lg" variant="outline" className="text-lg px-8 py-6 group w-full">
                                        <Github className="mr-2 h-5 w-5" />
                                        {t('download.github')}
                                        <ExternalLink className="ml-2 h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </Button>
                                </a>
                            </div>

                            {/* System Requirements */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.4 }}
                                className="bg-muted/50 rounded-lg p-6 mt-6"
                            >
                                <h4 className="font-semibold mb-3 text-center">{t('download.requirements.title')}</h4>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-4 text-sm text-center">
                                    <div>
                                        <p className="font-medium mb-1">{t('download.requirements.os.label')}</p>
                                        <p className="text-muted-foreground">{t('download.requirements.os.value')}</p>
                                    </div>
                                    <div>
                                        <p className="font-medium mb-1">{t('download.requirements.disk.label')}</p>
                                        <p className="text-muted-foreground">{t('download.requirements.disk.value')}</p>
                                    </div>
                                    <div>
                                        <p className="font-medium mb-1">{t('download.requirements.connection.label')}</p>
                                        <p className="text-muted-foreground">{t('download.requirements.connection.value')}</p>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Features Highlight */}
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-4 pt-4">
                                {[
                                    { Icon: Shield, text: t('download.features.free') },
                                    { Icon: Rocket, text: t('download.features.install') },
                                    { Icon: HardDrive, text: t('download.features.local') },
                                ].map((item, index) => (
                                    <motion.div
                                        key={item.text}
                                        initial={{ opacity: 0, y: 10 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.5 + index * 0.1 }}
                                        className="text-center"
                                    >
                                        <div className="w-12 h-12 mx-auto mb-3 bg-primary/10 rounded-xl flex items-center justify-center">
                                            <item.Icon className="w-6 h-6 text-primary" />
                                        </div>
                                        <p className="text-sm font-medium">{item.text}</p>
                                    </motion.div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>
        </section>
    );
}
