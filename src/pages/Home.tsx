import { Helmet } from "react-helmet-async";

import { useTranslation } from "react-i18next";
import Hero from "@/sections/Hero";
import Stats from "@/sections/Stats";
import Features from "@/sections/Features";
import Modules from "@/sections/Modules";
import Download from "@/sections/Download";

export default function Home() {
    const { t } = useTranslation('landing');

    return (
        <>
            <Helmet>
                <title>{t('home.title')}</title>
                <meta
                    name="description"
                    content={t('home.description')}
                />
                <meta
                    name="keywords"
                    content={t('home.keywords')}
                />

                {/* Facebook / Open Graph */}
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://cerocloud.github.io/CeroCloud-website/" />
                <meta property="og:title" content={t('home.og.title')} />
                <meta property="og:description" content={t('home.og.description')} />
                <meta property="og:image" content="https://cerocloud.github.io/CeroCloud-website/assets/dashboard-light.png" />
                <meta property="og:image:alt" content={t('home.og.image_alt')} />
                <meta property="og:image:width" content="1200" />
                <meta property="og:image:height" content="630" />

                {/* Twitter */}
                <meta property="twitter:card" content="summary_large_image" />
                <meta property="twitter:url" content="https://cerocloud.github.io/CeroCloud-website/" />
                <meta property="twitter:title" content={t('home.twitter.title')} />
                <meta property="twitter:description" content={t('home.twitter.description')} />
                <meta property="twitter:image" content="https://cerocloud.github.io/CeroCloud-website/assets/dashboard-light.png" />
                <meta property="twitter:image:alt" content={t('home.twitter.image_alt')} />

                <link rel="canonical" href="https://cerocloud.github.io/CeroCloud-website/" />
            </Helmet>

            <Hero />
            <Stats />
            <Features />
            <Modules />

            <Download />
        </>
    );
}
