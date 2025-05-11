<template>
    <h1
        :class="size"
        class="font-poppins font-bold text-primary dark:text-primary-light
            text-center flex items-center justify-center gap-2"
    >
        <span>
            <img src="/icon-light.svg" alt="ECOmunidade's logo" class="inline-block align-middle h-[1.4em] min-w-[1.6em]">
        </span>
        <slot>
            {{ name }}
        </slot>
    </h1>
</template>

<script setup>
    defineProps({
        size: {
            type: String,
            default: 'text-3xl',
        },
        name: {
            type: String,
            default: 'ECOmunidade'
        }
    })
</script>