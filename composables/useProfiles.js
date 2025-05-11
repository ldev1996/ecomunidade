export const useProfiles = () => {
    const client = useSupabaseClient()

    const createProfile = async (userId, username, phone) => {
        const { data, error } = await client
            .from('profiles')
            .insert({
                id: userId,
                username: username,
                phone: phone
            })

        if (error) throw error
        return { data, error }
    }

    const fetchProfileById = async (userId) => {
        const { data, error } = await client
            .from('profiles')
            .select('*')
            .eq('id', userId)
            .single()

        if (error) throw error
        return { data, error }
    }

    return { createProfile, fetchProfileById }
}