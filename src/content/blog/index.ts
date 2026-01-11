import * as WelcomeEn from './Welcome.mdx';
import * as WelcomeEs from './Welcome.es.mdx';
import * as WelcomePt from './Welcome.pt.mdx';

import * as OfflineEn from './OfflineAdvantage.mdx';
import * as OfflineEs from './OfflineAdvantage.es.mdx';
import * as OfflinePt from './OfflineAdvantage.pt.mdx';

import * as InventoryEn from './InventoryTips.mdx';
import * as InventoryEs from './InventoryTips.es.mdx';
import * as InventoryPt from './InventoryTips.pt.mdx';

import welcomeImg from '@/assets/blog/welcome.png';
import offlineImg from '@/assets/blog/offline.png';
import inventoryImg from '@/assets/blog/inventory.png';

export type BlogVersion = {
    component: any;
    meta: {
        title: string;
        date: string;
        description: string;
        author: string;
        tags: string[];
        image?: string;
    }
};

// Helper to create versions and inject image if missing
const createVersions = (baseEn: any, baseEs: any, basePt: any, image: string) => ({
    en: {
        component: baseEn.default,
        meta: { ...baseEn.meta, image }
    } as BlogVersion,
    es: {
        component: baseEs.default,
        meta: { ...baseEs.meta, image }
    } as BlogVersion,
    pt: {
        component: basePt.default,
        meta: { ...basePt.meta, image }
    } as BlogVersion,
});

export const blogPosts = [
    {
        slug: 'welcome',
        versions: createVersions(WelcomeEn, WelcomeEs, WelcomePt, welcomeImg)
    },
    {
        slug: 'offline-advantage',
        versions: createVersions(OfflineEn, OfflineEs, OfflinePt, offlineImg)
    },
    {
        slug: 'inventory-tips',
        versions: createVersions(InventoryEn, InventoryEs, InventoryPt, inventoryImg)
    }
];
