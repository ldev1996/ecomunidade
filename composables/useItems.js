export const useItems = () => {
    const client = useSupabaseClient()

    const fetchAllItems = async () => {
        const { data, error } = await client
            .from('items')
            .select('*')

        if (error) throw error
        return data
    }

    return { fetchAllItems }
}