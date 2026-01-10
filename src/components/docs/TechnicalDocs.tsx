import { Database, Lock, Code2, Layers, Cpu, Server } from "lucide-react";
import { useTranslation } from "react-i18next";
import DocFeedback from "./DocFeedback";

export default function TechnicalDocs() {
    const { t } = useTranslation('docs');

    return (
        <div className="space-y-12 max-w-4xl animate-in fade-in duration-500">
            <div>
                <h1 className="text-4xl font-extrabold mb-4">{t('technical.hero.title')}</h1>
                <p className="text-xl text-muted-foreground">
                    {t('technical.hero.subtitle')}
                </p>
            </div>

            {/* Architecture */}
            <section className="space-y-6">
                <h2 className="text-2xl font-bold flex items-center gap-2">
                    <Layers className="w-6 h-6 text-primary" /> {t('technical.architecture.title')}
                </h2>
                <div className="prose dark:prose-invert max-w-none">
                    <p>
                        {t('technical.architecture.description_start')} <strong>{t('technical.architecture.hybrid')}</strong> {t('technical.architecture.description_mid')}
                        <br />
                        {t('technical.architecture.description_end')}
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-card border p-6 rounded-xl">
                        <h3 className="font-bold mb-4 flex items-center gap-2">
                            <Cpu className="w-5 h-5 text-blue-500" /> {t('technical.architecture.backend.title')}
                        </h3>
                        <ul className="text-sm space-y-2 text-muted-foreground">
                            {/* @ts-ignore */}
                            {(t('technical.architecture.backend.list', { returnObjects: true }) as string[]).map((item, i) => (
                                <li key={i}>{item}</li>
                            ))}
                        </ul>
                    </div>
                    <div className="bg-card border p-6 rounded-xl">
                        <h3 className="font-bold mb-4 flex items-center gap-2">
                            <MonitorIcon className="w-5 h-5 text-purple-500" /> {t('technical.architecture.frontend.title')}
                        </h3>
                        <ul className="text-sm space-y-2 text-muted-foreground">
                            {/* @ts-ignore */}
                            {(t('technical.architecture.frontend.list', { returnObjects: true }) as string[]).map((item, i) => (
                                <li key={i}>{item}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>

            {/* Database */}
            <section className="space-y-6">
                <h2 className="text-2xl font-bold flex items-center gap-2">
                    <Database className="w-6 h-6 text-primary" /> {t('technical.database.title')}
                </h2>
                <p className="text-muted-foreground">
                    {t('technical.database.description_start')} <strong>SQLite</strong> {t('technical.database.description_end')}
                </p>
                <div className="grid sm:grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-muted/20 rounded-lg">
                        <span className="block font-bold text-foreground">{t('technical.database.features.zero_config.title')}</span>
                        <span className="text-xs text-muted-foreground">{t('technical.database.features.zero_config.desc')}</span>
                    </div>
                    <div className="text-center p-4 bg-muted/20 rounded-lg">
                        <span className="block font-bold text-foreground">{t('technical.database.features.acid.title')}</span>
                        <span className="text-xs text-muted-foreground">{t('technical.database.features.acid.desc')}</span>
                    </div>
                    <div className="text-center p-4 bg-muted/20 rounded-lg">
                        <span className="block font-bold text-foreground">{t('technical.database.features.portability.title')}</span>
                        <span className="text-xs text-muted-foreground">{t('technical.database.features.portability.desc')}</span>
                    </div>
                </div>

                <div className="mt-4">
                    <h3 className="font-bold mb-2">{t('technical.database.schema_title')}</h3>
                    <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-xs font-mono">
                        {`
// Products
CREATE TABLE products (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  sku TEXT UNIQUE,
  name TEXT NOT NULL,
  price DECIMAL(10,2),
  cost DECIMAL(10,2),
  stock INTEGER DEFAULT 0
);

// Sales
CREATE TABLE sales (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  date DATETIME DEFAULT CURRENT_TIMESTAMP,
  total DECIMAL(10,2),
  payment_method TEXT
);
`}
                    </pre>
                </div>
            </section>

            {/* Security */}
            <section className="space-y-6">
                <h2 className="text-2xl font-bold flex items-center gap-2">
                    <Lock className="w-6 h-6 text-primary" /> {t('technical.security.title')}
                </h2>
                <div className="space-y-4">
                    <div className="flex gap-4 items-start">
                        <div className="mt-1 bg-green-500/10 p-2 rounded-lg text-green-500">
                            <Server className="w-5 h-5" />
                        </div>
                        <div>
                            <h3 className="font-bold">{t('technical.security.local_first.title')}</h3>
                            <p className="text-sm text-muted-foreground">
                                {t('technical.security.local_first.description')}
                            </p>
                        </div>
                    </div>
                    <div className="flex gap-4 items-start">
                        <div className="mt-1 bg-green-500/10 p-2 rounded-lg text-green-500">
                            <Code2 className="w-5 h-5" />
                        </div>
                        <div>
                            <h3 className="font-bold">{t('technical.security.isolation.title')}</h3>
                            <p className="text-sm text-muted-foreground">
                                <code>contextBridge</code> {t('common.and')} <code>nodeIntegration: false</code> {t('technical.security.isolation.description')}
                            </p>
                        </div>
                    </div>
                </div>

            </section >

            <DocFeedback articleId="technical-docs" />
        </div >
    );
}

function MonitorIcon({ className }: { className?: string }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24" height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            <rect width="20" height="14" x="2" y="3" rx="2" />
            <line x1="8" x2="16" y1="21" y2="21" />
            <line x1="12" x2="12" y1="17" y2="21" />
        </svg>
    )
}
