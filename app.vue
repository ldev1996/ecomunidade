<template>
    <NuxtLayout>
        <NuxtPage />
    </NuxtLayout>
</template>

<script setup lang="js">
    useHead({
        titleTemplate: (titleChunk) => {
            return titleChunk ? `${titleChunk} - ECOmunidade` : 'ECOmunidade';
        }
    })
</script>