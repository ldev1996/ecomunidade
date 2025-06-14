<template>
    <UContainer
        as="header"
        class="border-b border-neutral-200 dark:border-neutral-700 flex flex-row items-center justify-between py-2"
    >
        <div class="flex flex-row items-center gap-4">
            <Logo />
            <UNavigationMenu
                v-if="!isMobile"
                :items="navItems"
                variant="link"
                color="primary"
            />
        </div>
    </UContainer>
    <UContainer as="main" class="mt-2">
        <slot />
    </UContainer>
    <UContainer
        v-if="isMobile"
        as="footer"
        class="fixed left-0 bottom-0 z-10 border-t border-neutral-200 dark:border-neutral-700 flex flex-row items-center justify-center py-2"
    >
        <UNavigationMenu
            :items="navItems"
            variant="link"
            color="primary"
            labelKey=""
        />
    </UContainer>
</template>

<script setup lang="js">
    import { useBreakpoints, breakpointsTailwind } from '@vueuse/core'

    const breakpoints = useBreakpoints(breakpointsTailwind)
    const isMobile = breakpoints.smallerOrEqual('sm')

    const navItems = [
        {
            label: 'Home',
            icon: 'lucide:house',
            to: '/'
        }
    ]
</script>
