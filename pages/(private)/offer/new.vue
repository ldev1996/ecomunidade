<template>
    <ClientOnly>
        <form method="post" @submit.prevent="handleSubmit()"
            class="w-full h-full flex flex-col gap-4 px-4 py-2"
        >
            <h1 class="text-2xl text-center">Nova Oferta de Doação</h1>
            <div class="flex-1 overflow-y-auto min-h-0 space-y-2">
                <BaseInput
                    label="Nome da Oferta"
                    nameId="title" type="text"
                    v-model="form.title"
                    placeholder="O que você vai doar?"
                    required :disabled="loading"
                />
                <BaseSelect
                    v-model="form.material"
                    :required="!form.material" isRequired
                    :options="materials"
                    label="name" formLabel="Material"
                />
                <BaseTextarea
                    label="Detalhes do Item"
                    nameId="description"
                    :rows=5 :cols=30
                    :maxlength=350
                    v-model="form.description"
                    placeholder="Ex.: cor, tamanho, como está de uso, se está sujo ou danificado, etc."
                    required :disabled="loading"
                />
                <BaseInput
                    label="Quantidade"
                    nameId="quantity" type="text"
                    v-model="form.quantity"
                    placeholder="Informe a quantidade"
                    required :disabled="loading"          
                />
                <BaseSelect
                    v-model="form.community"
                    :required="!form.community" isRequired
                    :options="communities"
                    label="name" formLabel="Ofertar nesta Comunidade:"
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

    // DEFININDO VARIÁVEIS E CONSTANTES ----------------------------------------
    const supabase = useSupabaseClient()
    const user = useSupabaseUser()
    const { fetchUserCommunities } = useUserCommunities()
    const { fetchCommunityById } = useCommunities()
    const { createOffer } = useOffers()
    const userCommunities = ref([])
    const communities = ref([])
    const loading = ref(false)

    const form = ref({
        title: '',
        material: '',
        description: '',
        quantity: '',
        community: null
    })

    // MONTANDO ----------------------------------------------------------------
    onMounted(async () => {
        userCommunities.value = await fetchUserCommunities(user.value.id)
        const communitiesDetails = await Promise.all(
            userCommunities.value.map(async (community) => {
                return await fetchCommunityById(community.community_id)
            })
        )
        communities.value = communitiesDetails
        if (communities.value.length === 1) form.value.community = communities.value[0]
    })

    const materials = [
        'Plástico',
        'Papel/Papelão',
        'Metal',
        'Vidro',
        'Orgânico',
        'Eletrônico',
        'Tecido',
        'Outro'
    ]

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
                form.value.title,
                form.value.material,
                form.value.community.id,
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