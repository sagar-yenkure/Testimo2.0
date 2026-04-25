import { treaty } from '@elysiajs/eden'
import type { App } from '@/app/api/[[...slugs]]/route'

// 🌍 Determine the base URL
const getBaseUrl = () => {
    if (typeof window !== 'undefined') return window.location.origin
    return process.env.NEXT_PUBLIC_APP_URL! || `http://localhost:${process.env.PORT || 3000}`
}

/**
 * 🚀 Eden Treaty Client
 * This uses ONLY the type info of your App, 
 * so it won't pull server-only code into the client bundle.
 */
export const api = treaty<App>(getBaseUrl()).api