<template>
    <ClientOnly>
        <div class="w-full h-full flex flex-col gap-4 px-4 py-2">
            <form  method="post" @submit.prevent="handleSubmit()"
                class="space-y-2">
                <BaseInput
                    label="Nome de Usuário"
                    nameId="username"
                    v-model="profileForm.username"
                    placeholder="Seu nome completo"
                    required :disabled="loading"
                />
                <BaseInput
                    label="E-mail"
                    nameId="email" type="email"
                    v-model="authForm.email"
                    placeholder="exemplo@email.com"
                    required :disabled="loading"
                />
                <BaseInput
                    label="Senha"
                    nameId="password" type="password"
                    v-model="authForm.password"
                    placeholder="Minímo de 8 caracteres"
                    required :disabled="loading"
                />
                <BaseSelect
                    v-model="profileForm.userCommunities"
                    :required="profileForm.userCommunities.length === 0" isRequired
                    :options="communities"
                    label="name" formLabel="Comunidades" multiple
                    :reduce="(community) => community.id"
                />
                <button
                    class="bg-primary hover:bg-primary-dark text-white mb-2 py-2
                        rounded-xl shadow-md transition w-full"
                    type="submit" :disabled="loading"
                >
                    {{ loading ? 'Preparando sua Conta...' : 'Começar a Reciclar' }}
                </button>
            </form>
            <p>Já tem uma conta? <NuxtLink class="text-primary underline" to="/login">Fazer login</NuxtLink></p>
        </div>
    </ClientOnly>
</template>

<script setup lang="js">
    // DEFININDO DETALHES ------------------------------------------------------
    definePageMeta({ layout: 'auth' })
    useHead({ title: 'Crie sua Conta' })

    // DEFININDO VARIÁVEIS E CONSTANTES ---------------------------------------- 
    const supabase = useSupabaseClient()
    const user = useSupabaseUser()
    const { createProfile } = useProfiles()
    const { createRelationUC } = useUserCommunities()
    const { fetchAllCommunities } = useCommunities()
    const communities = ref([])
    const loading = ref(false)

    const authForm = ref({
        email: '',
        password: '',
    })

    const profileForm = ref({
        username: '',
        userCommunities: []
    })

    // MONTANDO ----------------------------------------------------------------
    onMounted(async () => {
        communities.value = await fetchAllCommunities()
    })

    // LÓGICA PRINCIPAL --------------------------------------------------------
    const handleSubmit = async () => {
        if(profileForm.value.userCommunities.length === 0) {
            console.error("Selecione ao menos uma comunidade")
            return
        }
        loading.value = true

        try {
            // ----- Cria o usuário
            const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
                email: authForm.value.email,
                password: authForm.value.password,
                options: {
                    emailRedirectTo: useRuntimeConfig().public.supabaseRedirectUrl
                }
            })
            if (signUpError) throw signUpError

            // ----- Loga o usuário
            const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
                email: authForm.value.email,
                password: authForm.value.password
            })
            if (signInError) throw signInError

            // Garante o término do login
            await nextTick()

            // ----- Cria o perfil do usuário
            const { error: profileError } = await createProfile(
                user.value.id,
                profileForm.value.username,
                user.value.email
            )
            if (profileError) {
                // Deleta o usuário se não puder criar perfil
                const { error: deleteError } = await supabase.auth.admin.deleteUser(user.value.id)
                if (deleteError) console.error("Falha ao deletar usuário:", deleteError)
                else await supabase.auth.signOut()

                throw profileError
            } else {
                // ----- Cria a relação entre perfil do usuário e comunidades
                const { error: relationError } = await createRelationUC(
                    user.value.id,
                    profileForm.value.userCommunities
                )

                if (relationError) throw relationError
            }

            return navigateTo('/confirm')
        } catch (error) {
            console.error("Erro no casatro", error)
        } finally {
            loading.value = false
        }
    }
</script>