export const useProfiles = () => {
    const client = useSupabaseClient()

    const createProfile = async (userId, username, contact) => {
        const { data, error } = await client
            .from('profiles')
            .insert({
                id: userId,
                username: username,
                contact: contact
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
        return data
    }

    return { createProfile, fetchProfileById }
}