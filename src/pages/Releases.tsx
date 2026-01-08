import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, Calendar, FileBox, Box, Terminal, ChevronDown, ChevronUp, History } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";

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
    const [releases, setReleases] = useState<GithubRelease[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [expandedRelease, setExpandedRelease] = useState<string | null>(null);

    // Pagination State (Moved up to fix Hook Error)
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    useEffect(() => {
        const fetchReleases = async () => {
            try {
                const response = await fetch("https://api.github.com/repos/CeroCloud/CeroCloud-Desktop/releases");

                if (!response.ok) throw new Error("No se pudieron cargar las versiones");
                const data = await response.json();
                setReleases(data);
            } catch (err) {
                setError("Error cargando historial de versiones.");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchReleases();
    }, []);

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
        if (filename.endsWith(".exe")) return "Windows Installer";
        if (filename.endsWith(".AppImage")) return "Linux AppImage";
        if (filename.endsWith(".deb")) return "Linux Deb";
        if (filename.endsWith(".rpm")) return "Linux RPM";
        if (filename.endsWith(".dmg")) return "macOS Installer";
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
        <div className="min-h-screen bg-background pt-32 text-center text-red-500">
            {error}
        </div>
    );

    const latestRelease = releases[0];

    // Pagination Logic
    // allPreviousReleases is derived from releases state
    const allPreviousReleases = releases.slice(1);
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
                <title>Descargar CeroCloud - Última Versión Estable (Gratis)</title>
                <meta name="description" content="Descarga la última versión de CeroCloud (Windows, Linux, macOS). Software POS e Inventario gratuito y seguro. Consulta el historial de cambios y novedades." />
                <meta name="keywords" content="descargar cerocloud, cerocloud download, pos gratis descargar, software inventario open source, releases, github releases" />

                {/* Open Graph */}
                <meta property="og:title" content="Descargar CeroCloud - Software POS Gratuito" />
                <meta property="og:description" content="Obtén la última versión estable de CeroCloud. Sin virus, sin publicidad, 100% código abierto y local." />
                <meta property="og:url" content="https://cerocloud.github.io/CeroCloud-website/releases" />
                <link rel="canonical" href="https://cerocloud.github.io/CeroCloud-website/releases" />

            </Helmet>

            <div className="container mx-auto px-4 max-w-4xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-12 text-center"
                >
                    <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                        Versiones
                    </h1>
                    <p className="text-muted-foreground">
                        Descarga la versión más reciente o explora el historial.
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
                                    LATEST
                                </span>
                            </div>

                            <div className="p-8 md:p-10">
                                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8 border-b border-border/50 pb-8">
                                    <div>
                                        <h2 className="text-3xl md:text-4xl font-black text-foreground mb-2">{latestRelease.tag_name}</h2>
                                        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-primary font-medium">
                                            <div className="flex items-center gap-2">
                                                <Calendar className="w-4 h-4" />
                                                {format(new Date(latestRelease.published_at), "d 'de' MMMM, yyyy", { locale: es })}
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
                                            <Terminal className="w-5 h-5 text-primary" /> Notas de Lanzamiento
                                        </h3>
                                        <div className="space-y-1">
                                            <ReleaseGroups body={latestRelease.body} defaultExpanded={true} />
                                        </div>
                                    </div>

                                    <div className="bg-card/50 rounded-xl p-4 border border-border/50 h-fit">
                                        <h3 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground mb-4 flex items-center gap-2">
                                            <Download className="w-4 h-4" /> Descargas
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

                {/* PREVIOUS RELEASES LIST */}
                <div id="previous-releases" className="space-y-4">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="h-px bg-border flex-1" />
                        <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
                            <History className="w-4 h-4" /> Versiones Anteriores
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
                                                    {format(releaseDate, "d MMM yyyy", { locale: es })}
                                                </span>
                                            </div>
                                            <div className="mt-1 sm:mt-0">
                                                <span className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground border border-border">
                                                    {changelogLines.length > 0 ? `${changelogLines.length} cambios` : 'Mantenimiento'}
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
                                                        <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">Cambios</h4>
                                                        <div className="space-y-1">
                                                            <ReleaseGroups body={release.body} defaultExpanded={false} />
                                                        </div>
                                                    </div>
                                                    <div className="py-4">
                                                        <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">Descargas</h4>
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
                                Anterior
                            </Button>
                            <span className="text-sm text-muted-foreground font-medium">
                                Página {currentPage} de {totalPages}
                            </span>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                className="w-24"
                            >
                                Siguiente
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

const ReleaseGroups = ({ body, defaultExpanded }: { body: string, defaultExpanded: boolean }) => {
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
            <ChangeGroup title="Mejoras e Integraciones" items={categories.improvements} defaultOpen={defaultExpanded} />
            <ChangeGroup title="Correcciones" items={categories.fixes} defaultOpen={defaultExpanded} />
            {categories.others.length > 0 && <ChangeGroup title="Otros" items={categories.others} defaultOpen={defaultExpanded} />}
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
