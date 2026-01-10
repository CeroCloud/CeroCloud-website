import { useState, useEffect, useRef } from 'react';
import type { ReactNode } from 'react';

interface LazySectionProps {
    children: ReactNode;
    threshold?: number;
    rootMargin?: string;
    className?: string;
}

export default function LazySection({
    children,
    threshold = 0.01, // Trigger almost immediately when in margin
    rootMargin = "200px", // Load 200px before it enters viewport
    className = ""
}: LazySectionProps) {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (typeof window === 'undefined' || !window.IntersectionObserver) {
            setIsVisible(true);
            return;
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold, rootMargin }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => observer.disconnect();
    }, [threshold, rootMargin]);

    return (
        <div ref={ref} className={className}>
            {isVisible ? children : <div className="w-full h-32" />}
        </div>
    );
}
