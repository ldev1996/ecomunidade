<template>
    <article
        class="w-full p-2 roundex-xl bg-main-100 dark:bg-main-900 flex flex-col gap-2
            rounded-xl shadow-md">
        <div class="w-full flex justify-between items-center">
            <h2 class="font-bold text-lg text-primary dark:text-primary-light">
                {{ offer.title || 'Item não encontrado' }}
            </h2>
            <span class="font-title text-sm text-main-800 dark:text-main-200">
                {{ offer.material }}    
            </span>
        </div>

        <div class="w-full flex justify-between items-start gap-2">
            <p class="italic text-sm w-full">
                {{ offer.description || 'Não há uma descrição para esta oferta' }}
            </p>
            <button v-if="isMine"
                @click="handleDelete()"
                class="w-10 aspect-1/1 bg-alert dark:bg-alert-light flex items-center justify-center transition
                hover:bg-alert-dark dark:hover:bg-alert rounded-xl text-xl text-main-100 dark:text-main-900">
                <Icon name="lucide:trash-2" />
            </button>
            <NuxtLink v-else :to="'/offer/' + offer.id"
                class="w-10 aspect-1/1 bg-primary dark:bg-primary-light flex items-center justify-center transition
                hover:bg-primary-dark dark:hover:bg-primary rounded-xl text-xl text-main-100 dark:text-main-900">
                <Icon name="lucide:search" />
            </NuxtLink>
        </div>

        <div
            class="flex items-baseline gap-2 *:font-text border-t-2
                border-t-main-200 dark:border-t-main-800 pt-2 mt-4">
            <dt class="text-sm text-main-500 dark:text-main-400">Quantidade</dt>
            <dd class="text-main-900 dark:text-main-100">{{ offer.quantity || 'N/D' }}</dd>
        </div>
    </article>
</template>

<script setup lang='js'>
    // DEFININDO DETALHES ------------------------------------------------------
    const emit = defineEmits(['deletedOffer'])
    const props = defineProps({
        offer: {
            type: Object,
            default: {},
            required: true
        },
        isMine: {
            type: Boolean,
            defualt: false
        }
    })
    // DEFININDO VARIÁVEIS E CONSTANTES ----------------------------------------
    const { deleteOffer } = useOffers()
    const offerId = props.offer.id

    // LÓGICA PRINCIPAL --------------------------------------------------------
    const handleDelete = async () => {
        try {
            await deleteOffer(offerId)
        } catch(error) {
            console.error(error)
        } finally {
            emit('deletedOffer', '')
        }
    }

</script>