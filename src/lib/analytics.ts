import posthog from 'posthog-js';

// Environment variables should be set in .env
const API_KEY = import.meta.env.VITE_POSTHOG_KEY;
const API_HOST = import.meta.env.VITE_POSTHOG_HOST || 'https://app.posthog.com';

export const initAnalytics = () => {
    if (API_KEY) {
        try {
            posthog.init(API_KEY, {
                api_host: API_HOST,
                capture_pageview: false, // We will handle pageviews manually for the SPA
                autocapture: true,       // Capture clicks, etc.
                persistence: 'localStorage+cookie',
                loaded: (ph) => {
                    if (import.meta.env.DEV) ph.opt_out_capturing(); // Optional: Disable in DEV
                }
            });
        } catch (error) {
            console.error("Failed to initialize PostHog analytics", error);
        }
    }
};

export const capturePageView = () => {
    if (API_KEY) {
        posthog.capture('$pageview');
    }
};

export const analytics = posthog;
