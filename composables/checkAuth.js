export default function checkAuth() {
    const user = useSupabaseUser()

    watch(user, () => {
        if (user.value && user.value.id) {
            return navigateTo('/feed')
        }
    }, { immediate: true })
}