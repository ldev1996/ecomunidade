export const useProfiles = () => {
    const client = useSupabaseClient()
    const user = useSupabaseUser()

    const createProfile = async (userId, username, community, phone) => {
        const { data, error } = await client
            .from('profiles')
            .insert({
                id: userId,
                username: username,
                community: community,
                phone: phone
            })

        if (error) throw error
        return data
    }

    return { createProfile }
}