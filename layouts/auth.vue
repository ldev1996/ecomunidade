<template>
    <div class="min-h-screen flex flex-col items-center justify-center px-6">
        <main
            class="w-100 max-w-[90vw] max-h-[90vh] m-2 rounded-2xl flex flex-col          
            bg-main-100 dark:bg-main-900 shadow-xl aspect-[9/13] overflow-hidden"
        >
            <AppLogo size="text-xl md:text-3xl" class="mx-4 py-4 border-b-2 border-b-main-200 shrink-0" />
            <div class="flex-1 min-h-0 overflow-hidden">
                <slot></slot>
            </div>
        </main>        
    </div>
</template>