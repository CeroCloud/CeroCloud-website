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

export function useLatestRelease() {
    const [release, setRelease] = useState<GithubRelease | null>(cachedRelease);
    const [loading, setLoading] = useState(cachedRelease === null);

    useEffect(() => {
        if (cachedRelease) {
            setLoading(false);
            return;
        }

        if (!pendingPromise) {
            console.log("Fetching GitHub release...");
            pendingPromise = fetch("https://api.github.com/repos/DaaNiieeL123/CeroCloud/releases")
                .then(async res => {
                    if (!res.ok) throw new Error(`Status: ${res.status}`);
                    return res.json();
                })
                .then(data => {
                    const latest = Array.isArray(data) ? data[0] : data;
                    cachedRelease = latest;
                    return latest;
                })
                .catch(err => {
                    console.error("Failed to fetch latest release:", err);
                    pendingPromise = null; // Reset on error so we can retry
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
    }, []);

    return { release, loading };
}
