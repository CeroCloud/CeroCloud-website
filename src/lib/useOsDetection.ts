import { useState, useEffect } from 'react';

export type OS = 'windows' | 'linux' | 'mac' | 'unknown';

export function useOsDetection() {
    const [os, setOs] = useState<OS>('unknown');

    useEffect(() => {
        const userAgent = window.navigator.userAgent.toLowerCase();

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const platform = (window.navigator as any).userAgentData?.platform?.toLowerCase() || window.navigator.platform.toLowerCase();

        if (platform.includes('win') || userAgent.includes('windows')) {
            setOs('windows');
        } else if (platform.includes('mac') || userAgent.includes('mac')) {
            setOs('mac');
        } else if (platform.includes('linux') || userAgent.includes('linux')) {
            setOs('linux');
        }
    }, []);

    return os;
}
