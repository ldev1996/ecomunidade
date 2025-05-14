<template>
    <div class="w-full h-full">
        <div v-if="loading">
            <p>Carregando...</p>
        </div>
        <div v-else-if="offer && item" class="w-full flex flex-col gap-2">
            <h1 class="text-primary dark:text-primary-light text-2xl">{{ item.name }}</h1>
            <span class="font-title text-sm text-main-800 dark:text-main-200
                bg-main-200 dark:bg-main-800 rounded-lg shadow p-2 w-auto">
                <b>Ofertante: </b>{{ profile.username }}<br>
                <b>Contato: </b>
                <span class="text-primary dark:text-primary-light">
                    {{ profile.contact }}
                </span>
            </span>
            <span class="font-title text-sm text-main-800 dark:text-main-200
                bg-main-200 dark:bg-main-800 rounded-lg shadow p-2 w-auto">
                <b>Material: </b>{{ item.category }}<br>
                <b>Quantidade: </b>{{ offer.quantity }}
            </span>
            <h2 class="text-primary dark:text-primary-light text-lg">Descrição:</h2>
            <p class="w-full"
                :class="!offer.description ? 'text-alert dark:text-alert-light' : ''">
                {{ offer.description || 'Não há uma descrição para esta oferta. Cuidado!' }}
            </p>
            <h2 class="text-primary dark:text-primary-light text-lg mt-4">Quando você pode retirar?</h2>
            <div class="grid grid-cols-2 gap-4 w-full">
                <BaseInput
                    v-model="date"
                    nameId="date"
                    type="date"
                    label="Data"
                    required
                />
                <BaseInput
                    v-model="time"
                    nameId="time"
                    type="time"
                    label="Horário"
                    required
                />
            </div>

            <button
                class="bg-primary hover:bg-primary-dark dark:bg-primary-light dark:hover:bg-primary
                text-main-50 mb-2 py-2 rounded-xl shadow-md transition w-full flex items-center justify-center gap-2"
                @click="openGmail"
            >
                <Icon name="lucide:mail" class="text-xl" />
                Solicitar por e-mail
            </button>
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
    const supabase = useSupabaseClient()
    const user = useSupabaseUser()

    const { fetchOfferById } = useOffers()
    const { fetchItemById } = useItems()
    const { fetchProfileById } = useProfiles()

    const offer = ref(null)
    const item = ref(null)
    const profile = ref(null)
    const userProfile = ref(null)
    const loading = ref(true)

    const date = ref(null)
    const time = ref(null)
    const formattedDate = ref(null)
    // MONTANDO ----------------------------------------------------------------
    onMounted(async () => {
        try {
            // Obtém os dados da oferta
            offer.value = await fetchOfferById(id)
            console.log("Oferta obtida!")

            // Obtém os dados do item relacionado
            item.value = await fetchItemById(offer.value.item_id)
            console.log("Item obtido!")

            // Obtém os detlhes do ofertante
            profile.value = await fetchProfileById(offer.value.user_id)
            console.log("Perfil ofertante obtido!")

            // Obtém os dados do perfil dp usuário atual
            userProfile.value = await fetchProfileById(user.value.id)
            console.log("Perifl do usuário obtido!")

            if (profile.value.id === user.value.id) {
                throw new Error('Erro: Usuário tentando solicitar os próprios itens!')
                return navigateTo('/feed')
            }

            // Atualiza o título conforme a oferta
            useHead({ title: "Oferta de " + item.value.name })
        } catch (error) {
            console.error("Erro ao buscar item ou oferta: ", error)
            useHead({ title: 'Oferta não encontrada' })
        } finally {
            loading.value = false
        }
    })
    // LÓGICA PRINCIPAL --------------------------------------------------------      
    const formatDate = (date) => {
        const [yyyy, mm, dd] = date.split('-')
        return `${dd}/${mm}/${yyyy}`
    }

    const getMailText = () => {
        return `
        Olá, ${profile.value.username || 'ofertante'}!

        Vi sua oferta de "${item.value.name}" na ECOmunidade e gostaria de retirá-la.  
        Aqui estão meus dados para combinarmos:

        • Meu nome: ${userProfile.value.username}  
        • Melhor horário para retirada: ${formattedDate.value} às ${time.value}
        • Meu contato: ${user.value.email} 

        Atenciosamente,  
        ${userProfile.value.username} 
        `.trim()
    }

    const openGmail = async () => {
        if (!date.value || !time.value) {
            alert('Por favor, selecione data e horário para retirada!')
            return
        }
        formattedDate.value = formatDate(date.value)
        const subject = `Interesse no item ${item.value.name}`
        const body = getMailText()

        // Abre o Gmail com tudo preenchido
        window.open(
            `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(profile.value?.contact)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`,
            '_blank'
        )
    }
</script>