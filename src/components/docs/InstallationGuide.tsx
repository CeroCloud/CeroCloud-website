import { Terminal, Download, Monitor, Laptop, AlertTriangle, CheckCircle2 } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function InstallationGuide() {
    const { t } = useTranslation('docs');

    return (
        <div className="space-y-12 max-w-4xl animate-in fade-in duration-500">
            {/* Header */}
            <div>
                <h1 className="text-4xl font-extrabold mb-4">{t('installation.hero.title')}</h1>
                <p className="text-xl text-muted-foreground">
                    {t('installation.hero.subtitle')}
                </p>
            </div>

            {/* System Requirements */}
            <section className="space-y-6">
                <h2 className="text-2xl font-bold border-b pb-2">{t('installation.requirements.title')}</h2>
                <div className="grid md:grid-cols-3 gap-6">
                    <div className="p-6 bg-card border rounded-xl">
                        <Monitor className="w-8 h-8 text-primary mb-4" />
                        <h3 className="font-bold mb-2">Windows</h3>
                        <ul className="text-sm text-muted-foreground space-y-2">
                            {/* @ts-ignore */}
                            {(t('installation.requirements.windows', { returnObjects: true }) as string[]).map((req, i) => (
                                <li key={i}>{req}</li>
                            ))}
                        </ul>
                    </div>
                    <div className="p-6 bg-card border rounded-xl">
                        <Laptop className="w-8 h-8 text-primary mb-4" />
                        <h3 className="font-bold mb-2">macOS</h3>
                        <ul className="text-sm text-muted-foreground space-y-2">
                            {/* @ts-ignore */}
                            {(t('installation.requirements.macos', { returnObjects: true }) as string[]).map((req, i) => (
                                <li key={i}>{req}</li>
                            ))}
                        </ul>
                    </div>
                    <div className="p-6 bg-card border rounded-xl">
                        <Terminal className="w-8 h-8 text-primary mb-4" />
                        <h3 className="font-bold mb-2">Linux</h3>
                        <ul className="text-sm text-muted-foreground space-y-2">
                            {/* @ts-ignore */}
                            {(t('installation.requirements.linux', { returnObjects: true }) as string[]).map((req, i) => (
                                <li key={i}>{req}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>

            {/* Windows Installation */}
            <section className="space-y-6" id="install-windows">
                <h2 className="text-2xl font-bold flex items-center gap-2">
                    <Monitor className="w-6 h-6" /> {t('installation.windows.title')}
                </h2>
                <div className="space-y-6 border-l-2 border-primary/20 pl-10 ml-4 md:ml-6">
                    <div className="relative">
                        <span className="absolute -left-14 top-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-sm">1</span>
                        <h3 className="text-lg font-bold mb-2">{t('installation.windows.step1.title')}</h3>
                        <p className="text-muted-foreground mb-4">
                            {t('installation.windows.step1.text_start')} <a href="/releases" className="text-primary hover:underline">{t('installation.windows.step1.link_text')}</a> {t('installation.windows.step1.text_end')}
                            <code className="bg-muted px-2 py-1 rounded mx-1 text-sm">CeroCloud-Setup-1.2.0.exe</code>.
                        </p>
                    </div>

                    <div className="relative">
                        <span className="absolute -left-14 top-0 w-8 h-8 bg-muted text-muted-foreground rounded-full flex items-center justify-center font-bold text-sm border-2 border-background">2</span>
                        <h3 className="text-lg font-bold mb-2">{t('installation.windows.step2.title')}</h3>
                        <p className="text-muted-foreground mb-4">
                            {t('installation.windows.step2.text')}
                        </p>
                        <div className="bg-yellow-500/10 border border-yellow-500/20 p-4 rounded-lg flex gap-3 text-sm">
                            <AlertTriangle className="w-5 h-5 text-yellow-500 flex-shrink-0" />
                            <div>
                                <p className="font-bold text-yellow-500 mb-1">{t('installation.windows.step2.warning.title')}</p>
                                <p className="text-muted-foreground">
                                    {t('installation.windows.step2.warning.text')}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="relative">
                        <span className="absolute -left-14 top-0 w-8 h-8 bg-muted text-muted-foreground rounded-full flex items-center justify-center font-bold text-sm border-2 border-background">3</span>
                        <h3 className="text-lg font-bold mb-2">{t('installation.windows.step3.title')}</h3>
                        <p className="text-muted-foreground">
                            {t('installation.windows.step3.text')}
                        </p>
                    </div>
                </div>
            </section>

            {/* macOS Installation */}
            <section className="space-y-6" id="install-mac">
                <hr className="border-border" />
                <h2 className="text-2xl font-bold flex items-center gap-2 mt-8">
                    <Laptop className="w-6 h-6" /> {t('installation.macos.title')}
                </h2>
                <div className="space-y-4">
                    <p className="text-muted-foreground">
                        {t('installation.macos.step1')} <code className="bg-muted px-2 py-1 rounded text-sm">CeroCloud-1.2.0.dmg</code> (Intel) {t('common.or')} <code className="bg-muted px-2 py-1 rounded text-sm">CeroCloud-1.2.0-arm64.dmg</code> (Apple Silicon).
                    </p>
                    <p className="text-muted-foreground">
                        {t('installation.macos.step2')} <strong>{t('installation.macos.apps_folder')}</strong>.
                    </p>
                    <p className="text-muted-foreground">
                        {t('installation.macos.step3')}
                    </p>
                </div>
            </section>

            {/* Updates */}
            <section className="bg-primary/5 p-8 rounded-2xl border border-primary/10">
                <div className="flex gap-4">
                    <Download className="w-8 h-8 text-primary flex-shrink-0" />
                    <div>
                        <h3 className="text-xl font-bold mb-2">{t('installation.updates.title')}</h3>
                        <p className="text-muted-foreground mb-4">
                            {t('installation.updates.text')}
                        </p>
                        <div className="flex items-center gap-2 text-sm text-green-500 font-medium">
                            <CheckCircle2 className="w-4 h-4" />
                            {t('installation.updates.badge')}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
