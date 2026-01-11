import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { capturePageView } from '@/lib/analytics';

export default function AnalyticsTracker() {
    const location = useLocation();

    useEffect(() => {
        // Capture page view on route change
        capturePageView();
    }, [location]);

    return null;
}
