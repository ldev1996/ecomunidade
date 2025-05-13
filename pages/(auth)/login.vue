<template>
    <ClientOnly>
        <div class="w-full h-full flex flex-col gap-4 px-4 py-2">
            <form  method="post" @submit.prevent="handleSubmit()"
            class="flex-1 overflow-y-auto min-h-0 space-y-2">
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
                    placeholder="Sua senha"
                    required :disabled="loading"
                />
                <button
                    class="bg-primary hover:bg-primary-dark text-white mb-2 py-2
                        rounded-xl shadow-md transition w-full"
                    type="submit" :disabled="loading"
                >
                    {{ loading ? 'Conectando sua conta...' : 'Fazer Login' }}
                </button>
            </form>
            <p>Não tem uma conta? <NuxtLink class="text-primary underline" to="/register">Criar uma conta</NuxtLink></p>
        </div>
    </ClientOnly>
</template>

<script setup lang='js'>
    // DEFININDO DETALHES ------------------------------------------------------
    definePageMeta({ layout: 'auth' })
    useHead({ title: 'Login' })

    // IMPORTANDO COMPONENTES --------------------------------------------------

    // DEFININDO VARIÁVEIS E CONSTANTES ----------------------------------------
    const supabase = useSupabaseClient()
    const user = useSupabaseUser()
    const loading = ref(false)

    const authForm = ref({
        email: '',
        password: '',
    })
    // MONTANDO ----------------------------------------------------------------

    // LÓGICA PRINCIPAL --------------------------------------------------------
    const handleSubmit = async () => {
        loading.value = true

        try {
            const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
                email: authForm.value.email,
                password: authForm.value.password
            })
            if (signInError) throw signInError

            return navigateTo('/confirm')
        } catch (error) {
            console.error("Erro no login", error)
        } finally {
            loading.value = false
        }
    }
</script>