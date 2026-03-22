import { app } from '@/app/api/[[...slugs]]/route'
import { treaty } from '@elysiajs/eden'

// .api to enter /api prefix
export const api =
    // process is defined on server side and build time
    typeof window === 'undefined'
        ? treaty(app).api
        : treaty<typeof app>(process.env.NEXT_PUBLIC_APP_URL!).api