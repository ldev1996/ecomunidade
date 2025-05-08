export default defineNuxtConfig({
    compatibilityDate: '2024-11-01',
    devtools: { enabled: true },
    css: ['@/assets/css/main.css'],
    modules: [
        '@nuxt/icon',
        '@nuxtjs/tailwindcss',
        '@nuxtjs/supabase'
    ],
    supabase: {
        redirectOptions: {
            login: '/login',
            callback: '/confirm',
            include: undefined,
            exclude: ['/', '/register'],
            saveRedirectToCookie: true,
        },
        url: process.env.SUPABASE_URL,
        key: process.env.SUPABASE_ANON_KEY
    }
})