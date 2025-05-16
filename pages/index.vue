<template>
    <div class="min-h-screen bg-[#FFF7E3] flex flex-col items-center justify-center px-6 text-gray-800">
        <div class="max-w-xl text-center space-y-6">
        <AppLogo size="text-3xl xl:text-5xl" />
        <p class="text-main-950 font-text xl:text-xl">
            Conectando pessoas para transformar resíduos em recursos. Doe, troque ou venda materiais recicláveis com impacto
            social e ambiental.
        </p>

        <img src="/ecomunidade-illust.svg" alt="People recycling together" class="mx-auto w-72" />

        <div class="flex gap-4 justify-center">
            <NuxtLink to="/register" class="bg-primary hover:bg-primary-dark text-white
            px-5 py-2 rounded-xl shadow-md font-title transition">
                Criar Conta
            </NuxtLink>
            <NuxtLink to="/login" class="border border-primary text-primary-dark px-5 py-2 
            rounded-xl hover:bg-main-100 font-title transition">
                Entrar
            </NuxtLink>
        </div>
        </div>
    </div>
</template>

<script setup lang='js'>
    // DEFININDO DETALHES ------------------------------------------------------
    definePageMeta({ layout: false })

    // IMPORTANDO COMPONENTES --------------------------------------------------
    import checkAuth from '~/composables/checkAuth'

    // LÓGICA PRINCIPAL --------------------------------------------------------
    checkAuth()

</script>