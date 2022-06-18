import React from 'react'
import WeekManager from './week-manager'
import { ISpending } from '../../interfaces'

const Spending = () => {

    const spendings: ISpending[] = [
        {
            name: 'An Sang',
            price: 15000,
            time: '06/01/2022',
            status: 'good'
        },
        {
            name: 'An Sang',
            price: 15000,
            time: '06/12/2022',
            status: 'good'
        },
        {
            name: 'An Sang',
            price: 15000,
            time: '06/26/2022',
            status: 'good'
        },
        {
            name: 'An Sang',
            price: 15000,
            time: '06/26/2021',
            status: 'good'
        },
        {
            name: 'An Sang',
            price: 15000,
            time: '02/26/2022',
            status: 'good'
        },
    ]

    return (
        <div className='w-full h-[calc(100vh-56px)] p-2 flex bg-white rounded shadow'>
            <div className='w-4/5 h-full pr-2 overflow-y-scroll'>
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
                        spendings?.map((item, index) => (
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