export default defineNuxtConfig({

    css: [
        '~/assets/css/main.css',
    ],

    devtools: { enabled: false },

    image: {
        domains: [
            'http://placekitten.com/'
        ],
    },

    modules: [
        '@nuxtjs/supabase',
        // '@nuxtjs/tailwindcss',
        '@nuxt/image-edge',
        "@nuxt/image"
    ],

    runtimeConfig: {
        public: {
            URL: process.env.URL,
        }
    },

    ssr: false,

    supabase: {
        redirectOptions: {
            login: '/',
            callback: '/dashboard',
        }
    }
})
