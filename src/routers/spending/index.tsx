import React, { useCallback, useEffect, useState } from 'react'
import WeekManager from './week-manager'
import { ISpending } from '../../interfaces'
import SpendingService from '../../services'
import AddSpending from './add-spending'
import Spin from '../../components/spin'

const Spending = () => {
    const [spendings, setSpendings] = useState([])
    const [data, setData] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    const [spending, setSpending] = useState<ISpending>({
        id: 0,
        name: '',
        status: '',
        price: 0,
        time: ''
    })

    const getSpendings = useCallback(async () => {
        const res = await SpendingService.getSpendings()
        setSpendings(res.spendings)
        setData(res.data)
        setIsLoading(false)
    }, [])

    useEffect(() => {
        setIsLoading(true)
        getSpendings()
    }, [])

    const rerender = () => {
        getSpendings()
        setSpending({
            id: 0,
            name: '',
            status: '',
            price: 0,
            time: ''
        })
    }

    const deleteSpending = async (id: number) => {
        setIsLoading(true)
        const res = await SpendingService.deleteSpending(id, data)
        if (res.status === 200) getSpendings()
    }

    const editSpending = async (id: number) => {
        spendings.map((item: ISpending) => {
            if (item.id === id) setSpending({ ...item })
            return item
        })
    }

    return (
        <div className='w-full h-[calc(100vh-56px)] p-2 flex bg-white rounded shadow'>
            {isLoading && <Spin />}
            <div className='w-4/5 h-full pr-2 overflow-y-scroll'>
                <div className='my-5'>
                    <AddSpending spending={spending} data={data} rerender={rerender} setIsLoading={setIsLoading} />
                </div>
                <WeekManager spendings={spendings} />
            </div>
            <div className='w-1/5 p-2 h-full bg-red-400 relative'>
                <div className='w-full h-10 p-1 flex items-center justify-between absolute top-0 left-0'>
                    <p className=''>Today</p>
                    <p className=''>Week</p>
                    <p className=''>Month</p>
                </div>
                <div className='w-full h-[calc(100%-40px)] py-1 bg-blue-300 px-1 absolute top-10 left-0 overflow-y-scroll'>
                    {
                        spendings && spendings?.map((item: ISpending, index) => (
                            <div key={index} className={`mb-1 py-1 px-2 shadow rounded ${item?.status === 'good' ? 'bg-green-100' : 'bg-orange-100'}`}>
                                <div className='flex items-center justify-between'>
                                    <p className='text-xs font-semibold'>{item?.time}</p>
                                    <div className='flex items-center'>
                                        <p
                                            className='w-2 h-2 mr-2 rounded-full bg-blue-500 cursor-pointer'
                                            onClick={() => editSpending(item?.id)}
                                        ></p>
                                        <p
                                            className='w-2 h-2 rounded-full bg-red-500 cursor-pointer'
                                            onClick={() => deleteSpending(item?.id)}
                                        ></p>
                                    </div>
                                </div>
                                <div className='mt-1 flex items-center justify-between'>
                                    <p className='capitalize text-xs font-semibold'>{item?.name === 'hangOut' ? 'Hang Out' : item?.name}</p>
                                    <p className='font-semibold'>{item?.price}</p>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default Spending