import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
    compatibilityDate: '2024-11-01',
    devtools: { enabled: true },
    css: ['~/assets/css/main.css'],
    vite: {
        plugins: [
            tailwindcss(),
        ],
    },
    modules: [
        '@nuxtjs/google-fonts',
        '@nuxt/icon',
        '@nuxtjs/supabase'
    ],
    googleFonts: {
        families: {
            Poppins: [400, 600, 700],
            Inter: [400, 500, 700],
        },
        display: 'swap',
        download: true,
        preload: true
    },
    supabase: {
        redirectOptions: {
            login: '/login',
            callback: '/confirm',
            include: undefined,
            exclude: ['/', '/register'],
            saveRedirectToCookie: false,
        },
        url: process.env.SUPABASE_URL,
        key: process.env.SUPABASE_ANON_KEY
    },
    app: {
        head: {
            link: [
                { rel: 'icon', type: 'icon', href: '/favicon-light.ico', media: '(prefers-color-scheme: light)' },
                { rel: 'icon', type: 'icon', href: '/favicon-dark.ico', media: '(prefers-color-scheme: dark)' }
            ]
        }
    },
    runtimeConfig: {
        public: {
            supabaseRedirectUrl: process.env.PUBLIC_SUPABASE_REDIRECT_URL || 'http://localhost:3000/confirm'
        }
    }
})