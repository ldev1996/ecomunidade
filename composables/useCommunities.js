export const useCommunities = () => {
    const client = useSupabaseClient()

    const fetchAllCommunities = async () => {
        const { data, error } = await client
            .from('communities')
            .select('*')
            .order('name', { ascending: true })

        if (error) throw error
        return data
    }

    const fetchCommunityById = async (communityId) => {
        const { data, error } = await client
            .from('communities')
            .select('*')
            .eq('id', communityId)

        if (error) throw error
        return data
    }

    return { fetchAllCommunities, fetchCommunityById }
}