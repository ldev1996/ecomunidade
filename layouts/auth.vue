<template>
    <div class="min-h-screen flex flex-col items-center justify-center px-6">
        <main
            class="w-100 max-w-[90vw] min-h-[90dvh] m-2 rounded-2xl flex flex-col          
            bg-main-100 dark:bg-main-900 shadow-xl overflow-hidden"
        >
            <AppLogo size="text-xl md:text-3xl"
                class="mx-4 py-4 border-b-2 border-b-main-200 shrink-0 dark:border-b-main-800"
            />
            <slot />
        </main>        
    </div>
</template>