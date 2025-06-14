<template>
    <div :class="['flex flex-row items-center space-2', size, ui]">
        <img
            src="/icon.svg"
            alt="Logo da ECOmunidade"
            class="w-auto h-[1.4em]"
        />
        <span class="text-primary">
            {{ name }}
        </span>
    </div>
</template>

<script setup lang="js">
    const props = defineProps({
        name: {
            type: String,
            default: 'ECOmunidade'
        },
        size: {
            type: String,
            default: 'text-2xl'
        },
        ui: {
            type: String,
            default: ''
        }
    })
</script>
