<template>
    <ClientOnly>
        <div class="w-full flex flex-col px-4 pt-4 *:text-center">
            <h1 class="text-lg text-primary">Quase lá!</h1>
            <p>Estamos preparando tudo para você...</p>
        </div>
    </ClientOnly>
</template>

<script setup lang='js'>
    // DEFININDO DETALHES ------------------------------------------------------
    definePageMeta({ layout: 'auth' })
    useHead({ title: 'Confirme sua Conta' })

    // IMPORTANDO COMPONENTES --------------------------------------------------
    import checkAuth from '~/composables/checkAuth'

    // LÓGICA PRINCIPAL --------------------------------------------------------
    checkAuth()

</script>