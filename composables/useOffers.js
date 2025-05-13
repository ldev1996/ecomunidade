export const useOffers = () => {
    const client = useSupabaseClient()
    const user = useSupabaseUser()

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
            .neq('user_id', user.value.id)
            .order('created_at', { ascending: false })

        if (error) throw error
        return data
    }

    const fetchMyOffers = async () => {
        const { data, error } = await client
            .from('offers')
            .select('*')
            .eq('user_id', user.value.id)
            .order('created_at', { ascending: true })

        if (error) throw error
        return data
    }

    const fetchOfferById = async (offerId) => {
        const { data, error } = await client
            .from('offers')
            .select('*')
            .eq('id', offerId)
            .single()

        if (error) throw error
        return data
    }

    return { createOffer, fetchOffersByCommunity, fetchMyOffers, fetchOfferById }
}