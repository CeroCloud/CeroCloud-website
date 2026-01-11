/// <reference types="vite/client" />

declare module '*.mdx' {
    import type { ComponentType } from 'react'
    export const meta: Record<string, any>
    const component: ComponentType
    export default component
}
