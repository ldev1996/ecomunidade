export const useItems = () => {
    const client = useSupabaseClient()

    const fetchAllItems = async () => {
        const { data, error } = await client
            .from('items')
            .select('*')

        if (error) throw error
        return data
    }

    const fetchItemById = async (itemId) => {
        const { data, error } = await client
            .from('items')
            .select('*')
            .eq('id', itemId)
            .single()

        if (error) throw error
        return data
    }

    return { fetchAllItems, fetchItemById }
}