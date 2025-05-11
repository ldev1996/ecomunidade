export const useOffers = () => {
    const client = useSupabaseClient()

    const createOffer = async (userId, itemId, communityId, description, quantity) => {
        const { data, error } = await client
            .from('offers')
            .insert({
                user_id: userId,
                item_id: itemId,
                community_id: communityId,
                description: description,
                quantity: quantity
            })

        if (error) throw error
        return { data, error }
    }

    const fetchOffersByCommunity = async (communityId) => {
        const { data, error } = await client
            .from('offers')
            .select('*')
            .eq('community_id', communityId)
            .eq('active', true)

        if (error) throw error
        return data
    }

    return { createOffer, fetchOffersByCommunity }
}