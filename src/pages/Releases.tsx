import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, Calendar, FileBox, Box, Terminal, ChevronDown, ChevronUp, History, ServerCrash } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";
import { es, enUS, ptBR } from "date-fns/locale";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import staticReleases from "@/content/releases_static.json";

interface ReleaseAsset {
    name: string;
    size: number;
    browser_download_url: string;
}

interface GithubRelease {
    tag_name: string;
    published_at: string;
    name: string;
    body: string;
    prerelease: boolean;
    assets: ReleaseAsset[];
}

export default function Releases() {
    const { t, i18n } = useTranslation('releases');
    const [releases, setReleases] = useState<GithubRelease[]>(staticReleases as unknown as GithubRelease[]);
    const [loading, setLoading] = useState(staticReleases.length === 0);
    const [error, setError] = useState<string | null>(null);
    const [expandedRelease, setExpandedRelease] = useState<string | null>(null);

    // Pagination State (Moved up to fix Hook Error)
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    useEffect(() => {
        const fetchReleases = async () => {
            try {
                const response = await fetch("https://api.github.com/repos/CeroCloud/CeroCloud-Desktop/releases", {
                    headers: {
                        'Accept': 'application/vnd.github.v3+json'
                    }
                });

                if (response.status === 403 || response.status === 429) {
                    throw new Error(t('error.rate_limit'));
                }

                if (!response.ok) throw new Error(t('error.load'));
                const data = await response.json();
                setReleases(data);
            } catch (err: any) {
                setError(err.message || t('error.history'));
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchReleases();
    }, [t]);

    const getDateLocale = () => {
        if (i18n.language.startsWith('es')) return es;
        if (i18n.language.startsWith('pt')) return ptBR;
        return enUS;
    };

    const formatSize = (bytes: number) => {
        if (bytes === 0) return "0 B";
        const k = 1024;
        const sizes = ["B", "KB", "MB", "GB"];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
    };

    const getAssetIcon = (filename: string) => {
        if (filename.endsWith(".exe")) return Box;
        if (filename.endsWith(".AppImage") || filename.endsWith(".deb") || filename.endsWith(".rpm")) return Terminal;
        if (filename.endsWith(".dmg")) return FileBox;
        return FileBox;
    };

    const getAssetLabel = (filename: string) => {
        if (filename.endsWith(".exe")) return t('assets.windows');
        if (filename.endsWith(".AppImage")) return t('assets.linux_appimage');
        if (filename.endsWith(".deb")) return t('assets.linux_deb');
        if (filename.endsWith(".rpm")) return t('assets.linux_rpm');
        if (filename.endsWith(".dmg")) return t('assets.mac');
        return filename;
    };

    const cleanBody = (body: string) => {
        return body.split("\n").filter(line => line.trim() !== "").filter(line => !line.startsWith("##"));
    };


    const toggleRelease = (tagName: string) => {
        setExpandedRelease(expandedRelease === tagName ? null : tagName);
    };



    if (loading) return (
        <div className="min-h-screen bg-background pt-8 pb-20">
            <div className="container mx-auto px-4 max-w-4xl">
                {/* Header Skeleton */}
                <div className="mb-12 text-center space-y-4">
                    <Skeleton className="h-10 w-48 mx-auto" />
                    <Skeleton className="h-4 w-96 mx-auto" />
                </div>

                {/* Latest Release Skeleton */}
                <div className="mb-16">
                    <div className="relative border border-border/50 rounded-2xl overflow-hidden shadow-sm h-[400px]">
                        <div className="p-8 md:p-10 space-y-8">
                            <div className="flex justify-between items-start">
                                <div className="space-y-3">
                                    <Skeleton className="h-10 w-32" />
                                    <Skeleton className="h-5 w-48" />
                                </div>
                                <Skeleton className="h-6 w-24 hidden md:block" />
                            </div>
                            <div className="grid md:grid-cols-3 gap-8">
                                <div className="md:col-span-2 space-y-4">
                                    <Skeleton className="h-6 w-40" />
                                    <Skeleton className="h-4 w-full" />
                                    <Skeleton className="h-4 w-3/4" />
                                    <Skeleton className="h-4 w-5/6" />
                                </div>
                                <div className="space-y-4">
                                    <Skeleton className="h-6 w-24" />
                                    <Skeleton className="h-12 w-full" />
                                    <Skeleton className="h-12 w-full" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Previous Releases List Skeleton */}
                <div className="space-y-4">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="h-px bg-border flex-1" />
                        <Skeleton className="h-4 w-32" />
                        <div className="h-px bg-border flex-1" />
                    </div>
                    {[1, 2, 3, 4, 5].map((i) => (
                        <div key={i} className="border border-border rounded-lg p-4 flex items-center justify-between">
                            <div className="space-y-2">
                                <Skeleton className="h-6 w-24" />
                                <Skeleton className="h-3 w-32" />
                            </div>
                            <Skeleton className="h-8 w-8 rounded-full" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

    if (error) return (
        <div className="min-h-screen bg-background pt-32 pb-20 px-4">
            <div className="container mx-auto max-w-md text-center">
                <div className="mx-auto w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mb-6">
                    <ServerCrash className="w-8 h-8 text-red-600 dark:text-red-400" />
                </div>
                <h2 className="text-2xl font-bold mb-3">{t('error.load')}</h2>
                <p className="text-muted-foreground mb-8">
                    {error}
                </p>
                <Button
                    onClick={() => window.location.reload()}
                    className="gap-2"
                >
                    <History className="w-4 h-4" /> {t('common.retry')}
                </Button>
            </div>
        </div>
    );

    const latestRelease = releases.find(r => !r.prerelease) || releases[0];

    // Separation Logic
    const stableReleases = releases.filter(r => !r.prerelease);
    // Limit beta to 2 items as requested
    const betaReleases = releases.filter(r => r.prerelease).slice(0, 2);

    // Pagination Logic (Only for Previous Stable Releases)
    // allPreviousReleases is derived from stableReleases state (excluding the featured one)
    const allPreviousReleases = stableReleases.filter(r => r.tag_name !== latestRelease?.tag_name);
    const totalPages = Math.ceil(allPreviousReleases.length / itemsPerPage);

    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentItems = allPreviousReleases.slice(startIndex, startIndex + itemsPerPage);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        document.getElementById('previous-releases')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className="min-h-screen bg-background pt-8 pb-20">
            <Helmet>
                <title>{t('seo.title')}</title>
                <meta name="description" content={t('seo.description')} />
                <meta name="keywords" content={t('landing:home.keywords')} />

                {/* Open Graph */}
                <meta property="og:title" content={t('seo.og_title')} />
                <meta property="og:description" content={t('seo.og_description')} />
                <meta property="og:url" content="https://cerocloud.github.io/CeroCloud-website/releases" />
                <meta property="og:image" content="https://cerocloud.github.io/CeroCloud-website/assets/dashboard-light.png" />
                <meta property="og:image:alt" content={t('seo.og_image_alt')} />
                <meta property="og:image:width" content="1200" />
                <meta property="og:image:height" content="630" />
                <meta property="og:type" content="website" />
                <link rel="canonical" href="https://cerocloud.github.io/CeroCloud-website/releases" />

            </Helmet>

            <div className="container mx-auto px-4 max-w-4xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-12 text-center"
                >
                    <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                        {t('title')}
                    </h1>
                    <p className="text-muted-foreground">
                        {t('subtitle')}
                    </p>
                </motion.div>

                {/* FEATURED LATEST RELEASE */}
                {latestRelease && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="mb-16"
                    >
                        <div className="relative bg-gradient-to-br from-primary/10 via-background to-muted/30 border border-primary/20 rounded-2xl overflow-hidden shadow-2xl">
                            <div className="absolute top-0 right-0 p-4">
                                <span className="px-3 py-1 bg-primary text-primary-foreground text-xs font-bold rounded-full shadow-lg animate-pulse">
                                    {t('latest_badge')}
                                </span>
                            </div>

                            <div className="p-8 md:p-10">
                                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8 border-b border-border/50 pb-8">
                                    <div>
                                        <h2 className="text-3xl md:text-4xl font-black text-foreground mb-2">{latestRelease.tag_name}</h2>
                                        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-primary font-medium">
                                            <div className="flex items-center gap-2">
                                                <Calendar className="w-4 h-4" />
                                                {format(new Date(latestRelease.published_at), "d 'de' MMMM, yyyy", { locale: getDateLocale() })}
                                            </div>
                                            <span className="md:hidden text-xs uppercase tracking-wider font-semibold text-muted-foreground bg-muted px-2 py-0.5 rounded border border-border">Stable</span>
                                        </div>
                                    </div>
                                    <div className="text-right hidden md:block">
                                        <p className="text-sm text-muted-foreground uppercase tracking-wider font-semibold">Stable Release</p>
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-3 gap-8">
                                    <div className="md:col-span-2 space-y-4">
                                        <h3 className="font-semibold text-lg flex items-center gap-2">
                                            <Terminal className="w-5 h-5 text-primary" /> {t('notes.title')}
                                        </h3>
                                        <div className="space-y-1">
                                            <ReleaseGroups body={latestRelease.body} defaultExpanded={true} t={t} />
                                        </div>
                                    </div>

                                    <div className="bg-card/50 rounded-xl p-4 border border-border/50 h-fit">
                                        <h3 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground mb-4 flex items-center gap-2">
                                            <Download className="w-4 h-4" /> {t('downloads')}
                                        </h3>
                                        <div className="space-y-3">
                                            {latestRelease.assets.filter(a => !a.name.endsWith('.yml') && !a.name.endsWith('.blockmap')).map((asset) => {
                                                const AssetIcon = getAssetIcon(asset.name);
                                                return (
                                                    <a
                                                        key={asset.name}
                                                        href={asset.browser_download_url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="flex items-center gap-3 p-3 rounded-lg bg-background hover:bg-primary/10 border border-border hover:border-primary/30 transition-all group"
                                                    >
                                                        <div className="p-2 bg-muted rounded-md text-primary group-hover:scale-110 transition-transform">
                                                            <AssetIcon className="w-5 h-5" />
                                                        </div>
                                                        <div className="min-w-0 flex-1">
                                                            <p className="font-semibold text-sm truncate">{getAssetLabel(asset.name)}</p>
                                                            <p className="text-xs text-muted-foreground">{formatSize(asset.size)}</p>
                                                        </div>
                                                        <Download className="w-4 h-4 text-muted-foreground group-hover:text-primary" />
                                                    </a>
                                                )
                                            })}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* BETA RELEASES (Limited to 2) */}
                {betaReleases.length > 0 && (
                    <div className="mb-12">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="h-px bg-border flex-1" />
                            <span className="text-sm font-semibold text-yellow-500/80 uppercase tracking-wider flex items-center gap-2">
                                <History className="w-4 h-4" /> {t('beta.title')}
                            </span>
                            <div className="h-px bg-border flex-1" />
                        </div>

                        <div className="space-y-4">
                            {betaReleases.map((release, index) => {
                                const isExpanded = expandedRelease === release.tag_name;
                                const releaseDate = new Date(release.published_at);
                                const changelogLines = cleanBody(release.body);

                                return (
                                    <motion.div
                                        key={release.tag_name}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                        className={`group border border-yellow-500/30 hover:border-yellow-500/50 bg-yellow-500/5 rounded-lg overflow-hidden transition-all duration-300 ${isExpanded ? 'ring-1 ring-yellow-500/20 shadow-lg' : ''}`}
                                    >
                                        <div
                                            onClick={() => toggleRelease(release.tag_name)}
                                            className="p-4 flex items-center justify-between cursor-pointer hover:bg-yellow-500/10 transition-colors"
                                        >
                                            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6">
                                                <div className="flex flex-col">
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-lg font-bold text-foreground group-hover:text-yellow-500 transition-colors">{release.tag_name}</span>
                                                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-yellow-500/20 text-yellow-600 dark:text-yellow-400 font-bold border border-yellow-500/20">
                                                            {t('beta.badge')}
                                                        </span>
                                                    </div>
                                                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                                                        <Calendar className="w-3 h-3" />
                                                        {format(releaseDate, "d MMM yyyy", { locale: getDateLocale() })}
                                                    </span>
                                                </div>
                                                <div className="mt-1 sm:mt-0">
                                                    <span className="text-xs px-2 py-1 rounded-full bg-background/50 text-muted-foreground border border-yellow-500/10">
                                                        {changelogLines.length > 0 ? t('changes_count', { count: changelogLines.length }) : t('maintenance')}
                                                    </span>
                                                </div>
                                            </div>
                                            <Button variant="ghost" size="sm" className="bg-transparent hover:bg-yellow-500/10 hover:text-yellow-500 text-muted-foreground">
                                                {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                                            </Button>
                                        </div>

                                        <AnimatePresence>
                                            {isExpanded && (
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: "auto", opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    transition={{ duration: 0.3 }}
                                                    className="overflow-hidden"
                                                >
                                                    <div className="p-4 pt-0 border-t border-yellow-500/20 bg-background/30 grid md:grid-cols-2 gap-6 mt-2">
                                                        <div className="py-4">
                                                            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">{t('changes_title')}</h4>
                                                            <div className="space-y-1">
                                                                <ReleaseGroups body={release.body} defaultExpanded={false} t={t} />
                                                            </div>
                                                        </div>
                                                        <div className="py-4">
                                                            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">{t('downloads')}</h4>
                                                            <div className="grid grid-cols-1 gap-2">
                                                                {release.assets.filter(a => !a.name.endsWith('.yml') && !a.name.endsWith('.blockmap')).map((asset) => (
                                                                    <a
                                                                        key={asset.name}
                                                                        href={asset.browser_download_url}
                                                                        target="_blank"
                                                                        rel="noopener noreferrer"
                                                                        className="flex items-center gap-2 p-2 rounded border border-yellow-500/20 hover:bg-yellow-500/10 hover:border-yellow-500/40 transition-colors text-xs"
                                                                    >
                                                                        <Download className="w-3.5 h-3.5 text-yellow-600 dark:text-yellow-400" />
                                                                        <span className="truncate flex-1">{getAssetLabel(asset.name)}</span>
                                                                        <span className="text-muted-foreground font-mono">{formatSize(asset.size)}</span>
                                                                    </a>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>
                )}

                {/* PREVIOUS RELEASES LIST */}
                <div id="previous-releases" className="space-y-4">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="h-px bg-border flex-1" />
                        <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
                            <History className="w-4 h-4" /> {t('previous.title')}
                        </span>
                        <div className="h-px bg-border flex-1" />
                    </div>

                    <div className="space-y-4 min-h-[400px]">
                        {currentItems.map((release, index) => {
                            const isExpanded = expandedRelease === release.tag_name;
                            const releaseDate = new Date(release.published_at);
                            const changelogLines = cleanBody(release.body);

                            return (
                                <motion.div
                                    key={release.tag_name}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                    className={`group border border-border hover:border-primary/40 bg-card rounded-lg overflow-hidden transition-all duration-300 ${isExpanded ? 'ring-1 ring-primary/20 shadow-lg' : ''}`}
                                >
                                    <div
                                        onClick={() => toggleRelease(release.tag_name)}
                                        className="p-4 flex items-center justify-between cursor-pointer hover:bg-muted/30 transition-colors"
                                    >
                                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6">
                                            <div className="flex flex-col">
                                                <span className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">{release.tag_name}</span>
                                                <span className="text-xs text-muted-foreground flex items-center gap-1">
                                                    <Calendar className="w-3 h-3" />
                                                    {format(releaseDate, "d MMM yyyy", { locale: getDateLocale() })}
                                                </span>
                                            </div>
                                            <div className="mt-1 sm:mt-0">
                                                <span className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground border border-border">
                                                    {changelogLines.length > 0 ? t('changes_count', { count: changelogLines.length }) : t('maintenance')}
                                                </span>
                                            </div>
                                        </div>
                                        <Button variant="ghost" size="sm" className="bg-transparent">
                                            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                                        </Button>
                                    </div>

                                    <AnimatePresence>
                                        {isExpanded && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.3 }}
                                                className="overflow-hidden"
                                            >
                                                <div className="p-4 pt-0 border-t border-border/40 bg-muted/10 grid md:grid-cols-2 gap-6 mt-2">
                                                    <div className="py-4">
                                                        <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">{t('changes_title')}</h4>
                                                        <div className="space-y-1">
                                                            <ReleaseGroups body={release.body} defaultExpanded={false} t={t} />
                                                        </div>
                                                    </div>
                                                    <div className="py-4">
                                                        <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">{t('downloads')}</h4>
                                                        <div className="grid grid-cols-1 gap-2">
                                                            {release.assets.filter(a => !a.name.endsWith('.yml') && !a.name.endsWith('.blockmap')).map((asset) => (
                                                                <a
                                                                    key={asset.name}
                                                                    href={asset.browser_download_url}
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    className="flex items-center gap-2 p-2 rounded border border-border/50 hover:bg-background hover:border-primary/40 transition-colors text-xs"
                                                                >
                                                                    <Download className="w-3.5 h-3.5 text-primary" />
                                                                    <span className="truncate flex-1">{getAssetLabel(asset.name)}</span>
                                                                    <span className="text-muted-foreground font-mono">{formatSize(asset.size)}</span>
                                                                </a>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.div>
                            );
                        })}
                    </div>

                    {/* PAGINATION CONTROLS */}
                    {totalPages > 1 && (
                        <div className="flex items-center justify-center gap-4 mt-8 pt-4">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                                className="w-24"
                            >
                                {t('common.prev')}
                            </Button>
                            <span className="text-sm text-muted-foreground font-medium">
                                {t('common.pagination', { current: currentPage, total: totalPages })}
                            </span>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                className="w-24"
                            >
                                {t('common.next')}
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

// SUB-COMPONENTS & HELPERS 
// (Moved outside main component to clean up and allow reuse)

const ChangeGroup = ({ title, items, defaultOpen }: { title: string, items: string[], defaultOpen: boolean }) => {
    const [isOpen, setIsOpen] = useState(defaultOpen && items.length > 0);

    if (items.length === 0) {
        return (
            <div className="border-b border-border/40 last:border-0 py-2 flex items-center justify-between opacity-40 cursor-not-allowed select-none">
                <span className="text-sm font-medium text-foreground">{title} (0)</span>
                <ChevronDown className="w-4 h-4 opacity-50" />
            </div>
        );
    }

    return (
        <div className="border-b border-border/40 last:border-0">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full py-2 flex items-center justify-between hover:bg-muted/50 transition-colors rounded px-1 -mx-1 group"
            >
                <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">{title} ({items.length})</span>
                {isOpen ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                    >
                        <ul className="pb-3 space-y-2 pl-1">
                            {items.map((line, idx) => (
                                <li key={idx} className="flex items-start gap-3 text-sm text-muted-foreground">
                                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                                    <span className="leading-relaxed">
                                        {cleanText(line)
                                            .replace(/^(feat|fix|chore|docs|style|refactor|perf|test|build|ci|revert)(\(.*\))?:/, '')
                                            .trim()
                                            .replace(/^\w/, c => c.toUpperCase())}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const ReleaseGroups = ({ body, defaultExpanded, t }: { body: string, defaultExpanded: boolean, t: any }) => {
    const lines = cleanBody(body);
    const categories = {
        improvements: [] as string[],
        fixes: [] as string[],
        others: [] as string[]
    };

    lines.forEach(line => {
        const lower = line.toLowerCase();
        if (lower.match(/fix|bug|resolve|patch|correct|hotfix|revert|repair/)) {
            categories.fixes.push(line);
        } else if (lower.match(/feat|enhance|improve|add|create|update|upgrade|refactor|optimize|style|perf|new/)) {
            categories.improvements.push(line);
        } else {
            categories.others.push(line);
        }
    });

    return (
        <>
            <ChangeGroup title={t('groups.improvements')} items={categories.improvements} defaultOpen={defaultExpanded} />
            <ChangeGroup title={t('groups.fixes')} items={categories.fixes} defaultOpen={defaultExpanded} />
            {categories.others.length > 0 && <ChangeGroup title={t('groups.others')} items={categories.others} defaultOpen={defaultExpanded} />}
        </>
    );
};

const cleanBody = (body: string) => {
    return body.split("\n").filter(line => line.trim() !== "").filter(line => !line.startsWith("##"));
};

const cleanText = (text: string) => {
    return text
        .replace(/^- /, '')
        .replace(/^\* /, '')
        .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '$1')
        .replace(/\*\*/g, '')
        .replace(/`/g, '')
        .replace(/\s*\([a-f0-9]+\)$/i, '')
        .replace(/\s*[a-f0-9]{7,}$/i, '')
        .trim()
        .replace(/^\w/, (c) => c.toUpperCase());
};
