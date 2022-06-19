import React, { useCallback, useEffect, useState } from 'react'
import WeekManager from './week-manager'
import { ISpending } from '../../interfaces'
import SpendingService from '../../services'
import AddSpending from './add-spending'

const Spending = () => {
    const [spendings, setSpendings] = useState([])
    const [data, setData] = useState({})

    const getSpendings = useCallback(async () => {
        const res = await SpendingService.getSpendings()
        setSpendings(res.spendings)
        setData(res.data)
    }, [])

    useEffect(() => {
        getSpendings()
    }, [])

    const rerender = async () => {
        await getSpendings()
    }
   
    return (
        <div className='w-full h-[calc(100vh-56px)] p-2 flex bg-white rounded shadow'>
            <div className='w-4/5 h-full pr-2 overflow-y-scroll'>
                <div className='my-5'>
                    <AddSpending data={data} rerender={rerender} />
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
                            <div key={index} className={`mb-1 p-1 shadow rounded ${item?.status === 'good' ? 'bg-green-100' : 'bg-orange-100'}`}>
                                <div className='flex items-center justify-between'>
                                    <p className=''>{item?.time}</p>
                                    <div className='flex items-center'>
                                        <p className='w-2 h-2 mr-2 rounded-full bg-blue-500'></p>
                                        <p className='w-2 h-2 rounded-full bg-red-500'></p>
                                    </div>
                                </div>
                                <div className=''>
                                    <p className=''>{item?.name}</p>
                                    <p className=''>{item?.price}</p>
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