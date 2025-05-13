<template>
    <div class="w-full h-full">
        <div v-if="loading">
            <p>Carregando...</p>
        </div>
        <div v-else-if="offer && item" class="w-full flex flex-col gap-2">
            <h1 class="text-primary dark:text-primary-light text-2xl">{{ item.name }}</h1>
            <span class="font-title text-sm text-main-800 dark:text-main-200
                bg-main-200 dark:bg-main-800 rounded-lg shadow p-2 w-auto">
                {{ item.category }}<br>
                <b>Quantidade:</b> {{ offer.quantity }}
            </span>
            <p class="w-full"
                :class="!offer.description ? 'text-alert dark:text-alert-light' : ''">
                {{ offer.description || 'Não há uma descrição para esta oferta. Cuidado!' }}
            </p>

        </div>
    </div>
</template>

<script setup lang='js'>
    // DEFININDO DETALHES ------------------------------------------------------
    definePageMeta({ layout: 'card' })
    useHead({ title: 'Carregando...' })

    // IMPORTANDO COMPONENTES --------------------------------------------------

    // DEFININDO VARIÁVEIS E CONSTANTES ----------------------------------------
    const { id } = useRoute().params
    const { fetchOfferById } = useOffers()
    const { fetchItemById } = useItems()
    const offer = ref(null)
    const item = ref(null)
    const loading = ref(true)
    // MONTANDO ----------------------------------------------------------------
    onMounted(async () => {
        try {
            offer.value = await fetchOfferById(id)
            console.log("Oferta obtida: ", offer.value)

            item.value = await fetchItemById(offer.value.item_id)
            console.log("Item obtido: ", item.value)

            useHead({ title: "Oferta de " + item.value.name })
        } catch (error) {
            console.error("Erro ao buscar item ou oferta: ", error)
            useHead({ title: 'Oferta não encontrada' })
        } finally {
            loading.value = false
        }
    })
    // LÓGICA PRINCIPAL --------------------------------------------------------
</script>