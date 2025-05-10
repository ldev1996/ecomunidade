export const useUserCommunities = () => {
    const client = useSupabaseClient()

    const createRelationUC = async (userId, communityIds) => {
        const relations = communityIds.map(communityId => ({
            user_id: userId,
            community_id: communityId
        }))

        const { data, error } = await client
            .from('user_communities')
            .insert(relations)

        if (error) throw error
        return { data, error }
    }

    return { createRelationUC }
}