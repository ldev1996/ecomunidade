<template>
    <ClientOnly>
        <form method="post" @submit.prevent="handleSubmit()"
            class="w-full h-full flex flex-col gap-4 px-4 py-2"
        >
            <div class="flex-1 overflow-y-auto min-h-0 space-y-2">
                <BaseSelect
                    v-model="form.item"
                    :required="!form.item" isRequired
                    :options="items"
                    label="name" formLabel="Tipo de item"
                    :reduce="(item) => item.id"
                />
                <BaseInput
                    label="Descrição"
                    nameId="description" type="text"
                    v-model="form.description"
                    placeholder="Adicione uma descrição"
                    required :disabled="loading"          
                />
                <BaseInput
                    label="Quantidade"
                    nameId="quantity" type="text"
                    v-model="form.quantity"
                    placeholder="Descreva a quantidade"
                    required :disabled="loading"          
                />
                <BaseSelect
                    v-model="form.community"
                    :required="!form.community" isRequired
                    :options="communities"
                    label="name" formLabel="Ofertar nesta Comunidade:"
                    :reduce="(community) => community.id"
                />
                <button
                    class="bg-primary hover:bg-primary-dark text-white mb-2 py-2
                        rounded-xl shadow-md transition w-full"
                    type="submit" :disabled="loading"
                >
                    {{ loading ? 'Preparando a Oferta...' : 'Oferecer' }}
                </button>
            </div>
        </form>
    </ClientOnly>
</template>

<script setup lang='js'>
    // DEFININDO DETALHES ------------------------------------------------------
    definePageMeta({ layout: 'card' })
    useHead({ title: 'Nova Oferta' })

    // IMPORTANDO COMPONENTES --------------------------------------------------
    import vSelect from 'vue-select'
    import 'vue-select/dist/vue-select.css'

    // DEFININDO VARIÁVEIS E CONSTANTES ----------------------------------------
    const supabase = useSupabaseClient()
    const user = useSupabaseUser()
    const { fetchAllItems } = useItems()
    const { fetchUserCommunities } = useUserCommunities()
    const { fetchCommunityById } = useCommunities()
    const { createOffer } = useOffers()
    const items = ref([])
    const userCommunities = ref([])
    const communities = ref([])
    const loading = ref(false)

    const form = ref({
        item: null,
        description: '',
        quantity: '',
        community: null
    })

    // MONTANDO ----------------------------------------------------------------
    onMounted(async () => {
        items.value = await fetchAllItems()
        userCommunities.value = await fetchUserCommunities(user.value.id)
        const communitiesDetails = await Promise.all(
            userCommunities.value.map(async (community) => {
                return await fetchCommunityById(community.community_id)
            })
        )
        communities.value = communitiesDetails
    })
    // LÓGICA PRINCIPAL --------------------------------------------------------
    const handleSubmit = async () => {
        loading.value = true

        try {
            if (!user.value?.id) {
                throw new Error('Usuário não autenticado!')
                return navigateTo('/login')
            }

            const { error } = await createOffer(
                user.value.id,
                form.value.item,
                form.value.community,
                form.value.description,
                form.value.quantity
            )
            if (error) throw error
            
            return navigateTo('/profile/me')
        } catch (error) {
            console.error("Erro ao criar a oferta", error)
        } finally {
            loading.value = false
        }
    }
</script>