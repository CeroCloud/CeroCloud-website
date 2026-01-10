import { useState, useEffect } from 'react';

interface GithubRelease {
    tag_name: string;
    name: string;
    assets: Array<{
        name: string;
        browser_download_url: string;
    }>;
}

// Global cache to prevent multiple requests
let cachedRelease: GithubRelease | null = null;
let pendingPromise: Promise<GithubRelease> | null = null;

const CACHE_KEY = 'github_release_cache';
const CACHE_DURATION = 1000 * 60 * 60; // 1 hour

interface CacheData {
    data: GithubRelease;
    timestamp: number;
}

export function useLatestRelease() {
    const [release, setRelease] = useState<GithubRelease | null>(() => {
        // Try to initialize from cache
        if (cachedRelease) return cachedRelease;

        try {
            const stored = localStorage.getItem(CACHE_KEY);
            if (stored) {
                const { data, timestamp }: CacheData = JSON.parse(stored);
                if (Date.now() - timestamp < CACHE_DURATION) {
                    cachedRelease = data;
                    return data;
                }
            }
        } catch (e) {
            console.error("Failed to read from cache", e);
        }
        return null;
    });

    const [loading, setLoading] = useState(release === null);

    useEffect(() => {
        if (release) {
            setLoading(false);
            return;
        }

        if (cachedRelease) {
            setRelease(cachedRelease);
            setLoading(false);
            return;
        }

        if (!pendingPromise) {
            const stored = localStorage.getItem(CACHE_KEY);
            let validCacheFound = false;

            if (stored) {
                try {
                    const { data, timestamp }: CacheData = JSON.parse(stored);
                    if (Date.now() - timestamp < CACHE_DURATION) {
                        cachedRelease = data;
                        setRelease(data);
                        setLoading(false);
                        validCacheFound = true;
                    }
                } catch (e) { /* ignore */ }
            }

            if (validCacheFound) return;

            console.log("Fetching GitHub release...");
            pendingPromise = fetch("https://api.github.com/repos/CeroCloud/CeroCloud-Desktop/releases")
                .then(async res => {
                    if (!res.ok) throw new Error(`Status: ${res.status}`);
                    return res.json();
                })
                .then(data => {
                    const latest = Array.isArray(data) ? data[0] : data;
                    cachedRelease = latest;

                    // Update cache
                    try {
                        localStorage.setItem(CACHE_KEY, JSON.stringify({
                            data: latest,
                            timestamp: Date.now()
                        }));
                    } catch (e) {
                        console.error("Failed to write to cache", e);
                    }

                    return latest;
                })
                .catch(err => {
                    console.error("Failed to fetch latest release:", err);
                    pendingPromise = null;
                    throw err;
                });
        }

        pendingPromise
            .then(data => {
                setRelease(data);
                setLoading(false);
            })
            .catch(() => {
                setLoading(false);
            });
    }, [release]);

    return { release, loading };
}
