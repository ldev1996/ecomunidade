<template>
    <nav class="w-full p-2 mb-4">
        <v-select
            v-model="filter.community"
            :options="communityOptions"
            label="name"
            
            @update:modelValue="handleSelectCommunity"
        />
    </nav>
    <div v-if="loading">
        <p>Carregando...</p>
    </div>
    <div v-else-if="offers.length > 0"
        class="w-full h-full flex flex-col md:grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        <OfferCard
            v-for="offer in offers"
            :key="offer.id"
            :offer="offer"
        />
    </div>
    <div v-else>
        <p>{{ filter.community ?
        `Ops, parece que não há nenhuma oferta na comunidade  ${filter.community.name}!` :
        "Não há nenhuma comunidade selecionada..." }}</p>
    </div>
</template>

<script setup lang='js'>
    // IMPORTANDO COMPONENTES --------------------------------------------------
    import vSelect from 'vue-select'
    import 'vue-select/dist/vue-select.css'

    // DEFININDO VARIÁVEIS E CONSTANTES ----------------------------------------
    const user = useSupabaseUser()
    const { fetchOffersByCommunity } = useOffers()
    const { fetchUserCommunities } = useUserCommunities()
    const { fetchCommunityById } = useCommunities()
    const loading = ref(true)
    const offers = ref([])
    const userCommunities = ref([])
    const communityOptions = ref([])

    const filter = ref({
        community: {}
    })

    // MONTANDO ----------------------------------------------------------------
    onMounted(async () => {
        userCommunities.value = await fetchUserCommunities(user.value.id)
        const communitiesDetails = await Promise.all(
            userCommunities.value.map(async (community) => {
                const { data, error } = await fetchCommunityById(community.community_id)
                if (error) throw error
                return data
            })
        )
        communityOptions.value = communitiesDetails

        filter.value.community = communityOptions.value[0]
        handleSelectCommunity()
    })
    // LÓGICA PRINCIPAL --------------------------------------------------------
    const handleSelectCommunity = async () => {
        loading.value = true
        try {
            if (filter.value.community) offers.value = await fetchOffersByCommunity(filter.value.community.id)
            else offers.value = []
        } catch (error) {
            console.error("Erro ao buscar ofertas: ", error)
            offers.value = []
        }
        loading.value = false
    }
</script>