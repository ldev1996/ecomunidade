<template>
    <header
        class="h-14 w-full flex items-center p-4 fixed z-10 top-0 left-0
            backdrop-blur-md bg-main-100 dark:bg-main-900 gap-8 shadow-md"
    >
        <NuxtLink to="/feed">
            <AppLogo size="text-2xl" />
        </NuxtLink>
        <nav class="h-full w-full flex-row items-center justify-start gap-8 hidden lg:flex">
            <NuxtLink
                v-for="item in navItems"
                :key="item.to"
                :to="item.to"
                :aria-current="isActiveRoute(item.to) ? 'page' : undefined"
                :aria-label="item.label"
                :class="[
                    isActiveRoute(item.to) ?
                    'text-primary dark:text-primary-light underline underline-offset-8':
                    'text-main-900 dark:text-main-100',
                    'text-xl flex items-center justify-center transition duration-200 font-title'
                ]"
            >
                <span class="flex items-center gap-2">
                    <Icon :name="item.icon" />
                    {{ item.label }}
                </span>
            </NuxtLink>
        </nav>
    </header>
    <main class="mb-18 mt-18 lg:mb-2 lg:mt-18 w-full h-full px-4">
        <slot />
    </main>
    <footer
        class="h-14 w-full block lg:hidden p-2 fixed z-10 bottom-0 left-0
            backdrop-blur-md bg-main-100 dark:bg-main-900"
    >
        <nav class="h-full w-full flex flex-row items-center justify-evenly gap-4">
            <NuxtLink
                v-for="item in navItems"
                :key="item.to"
                :to="item.to"
                :aria-current="isActiveRoute(item.to) ? 'page' : undefined"
                :aria-label="item.label"
                :class="[
                    isActiveRoute(item.to) ? 'text-primary dark:text-primary-light' :
                    'text-main-900 dark:text-main-100',
                    'text-2xl flex items-center justify-center w-full h-full transition duration-200'
                ]"
            >
                <Icon :name="item.icon" />
            </NuxtLink>
        </nav>
    </footer>
</template>

<script setup lang='js'>
    const route = useRoute()
    const currentPath = computed(() => route.path)
    const isActiveRoute = (to) => currentPath.value === to

    const navItems = [
        {
            to: '/feed',
            label: 'Ofertas',
            icon: 'lucide:home'
        },
        {
            to: '/offer/new',
            label: 'Nova Oferta',
            icon: 'lucide:circle-plus'
        },
        {
            to: '/profile/me',
            label: 'Meu Perfil',
            icon: 'lucide:user-round'
        }
    ]
</script>