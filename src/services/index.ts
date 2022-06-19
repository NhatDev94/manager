import axios from "axios"
import { ISpending } from "../interfaces"

const SpendingService = {
    url: 'https://61986846164fa60017c23067.mockapi.io/pv/1',
    getSpendings: async () => {
        const {data} = await axios.get(SpendingService.url)
        return {
            spendings: data?.spendings,
            data
        }
    },
    addSpending: async (spending: ISpending, data: any) => {
        data.spendings = [spending, ...data.spendings]
        const res = await axios.put(SpendingService.url, data)
        return res
    },
    deleteSpending: async (id: number | undefined, data: any) => {
        data.spendings = data.spendings.filter((item: ISpending) => item.id !== id)
        const res = await axios.put(SpendingService.url, data)
        return res
    },
    editSpending: async (id: number, spending: ISpending, data: any) => {
        data.spendings = data.spendings.map((item: ISpending) => {
            if (item?.id === id) item = spending
            return item
        })
        const res = await axios.put(SpendingService.url, data)
        return res
    },
}

export default SpendingService