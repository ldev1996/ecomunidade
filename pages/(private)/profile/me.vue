<template>
    <div v-if="loading">
        <p>Carregando...</p>
    </div>
    <div v-else-if="profile" class="h-full w-full flex flex-col items-start justify-start gap-4">

        <h1 class="text-xl lg:text-3xl text-primary dark:text-primary-light">Bem-vind@, {{ profile.username }}!</h1>

        <div class="flex flex-col bg-main-100 dark:bg-main-900 w-full rounded-xl p-2 gap-2 shadow-md">
            <h2 class="text-lg lg:text-xl">Minhas Comunidades</h2>
            <ul class="w-full flex flex-row items-start justify-start flex-wrap gap-2">
                <li
                    v-for="community in communities" :key="community.name"
                    class="bg-primary/20 dark:bg-primary-light/20 border border-primary-dark dark:border-primary
                        rounded-2xl text-primary-dark dark:text-primary font-title py-1 px-2 text-sm"
                >{{ community.name }}</li>
            </ul>            
        </div>

        <button
            @click="handleSignOut"
            class="bg-alert hover:bg-alert-dark text-white
            dark:bg-alert-light dark:hover:bg-alert w-auto
            px-5 py-2 rounded-xl shadow-md transition font-title"
            :disabled="btnLoading"
        >Desconetar</button>
        
    </div>
    <div v-else>
        <p>Desculpe, não encontramos seu perfil.</p>
    </div>
</template>

<script setup lang='js'>
    // DEFININDO DETALHES ------------------------------------------------------
    useHead({ title: 'Meu Perfil' })

    // DEFININDO VARIÁVEIS E CONSTANTES ----------------------------------------
    const supabase = useSupabaseClient()
    const user = useSupabaseUser()
    const { fetchProfileById } = useProfiles()
    const { fetchUserCommunities } = useUserCommunities()
    const { fetchCommunityById } = useCommunities()
    const profile = ref(null)
    const communities = ref([])
    const loading = ref(true)
    const btnLoading = ref(false)

    // MONTANDO ----------------------------------------------------------------
    onMounted(async () => {
        try {
            if (!user.value?.id) {
                throw new Error('Usuário não autenticado!')
                return navigateTo('/login')
            }
            // Obtém o perfil
            const { data: profileData, error: profileFetchError } = await fetchProfileById(user.value.id)
            if (profileFetchError) throw profileFetchError

            profile.value = profileData
            console.log("Perfil carregado!")

            // Obtém as comunidades
            const { data: UCData, error: UCFetchError } = await fetchUserCommunities(user.value.id)
            if (UCFetchError) throw UCFetchError

            console.log("Comunidades obtidas!")

            // Obtém os detalhes das comunidades
            const communitiesDetails = await Promise.all(
                UCData.map(async (community) => {
                    const { data, error } = await fetchCommunityById(community.id)
                    if (error) throw error
                    return data
                })
            )

            communities.value = communitiesDetails
            console.log("Detalhes obtidos para as comunidades!")

        } catch (error) {
            console.error("Erro ao carregar o perfil ou comunidades:", error)
        } finally {
            loading.value = false
        }
    })
    // LÓGICA PRINCIPAL --------------------------------------------------------
    const handleSignOut = async () => {
        try {
            btnLoading.value = true
            const { error } = await supabase.auth.signOut()
            if (error) throw error
        } catch (error) {
            console.error("Erro ao desconectar o usuário:", error)
        } finally {
            console.log("Usuário desconectado com sucesso!")
            return navigateTo('/login')
        }
    }

</script>