<template>
    <NuxtLayout name="default">
        <div class="h-full flex flex-col items-center justify-center px-6">
            <div class="w-100 max-w-[90vw] min-h-[70dvh] m-2 rounded-2xl flex flex-col gap-2 p-2          
                bg-main-100 dark:bg-main-900 shadow-xl items-center justify-start">
                <slot />
            </div>
        </div>
    </NuxtLayout>
</template>