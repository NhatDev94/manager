import moment from 'moment'
import React, { useState } from 'react'
import { ISpending, TotalSpending } from '../../../interfaces'

interface Props {
    spendings: ISpending[]
}

const WeekManager = ({ spendings }: Props) => {
    const now = new Date()
    const formatMoney = new Intl.NumberFormat('IN-en')

    const getDate = (day: number, month: number, year: number) => new Date(year, month, day)

    const [currentMonth, setCurrentMonth] = useState(now.getMonth())
    const [currentYear, setCurrentYear] = useState(now.getFullYear())

    const generateWeek = (month: number, year: number) => {
        let weeks: any = []
        let dayInWeeks: any[] = []
        const days = getDate(0, month - 1, year).getDate()

        for (let i = 1; i <= days; i++) {
            const dayInWeek = getDate(i, month, year).getDay()
            dayInWeeks = [...dayInWeeks, getDate(i, month, year)]

            if (i !== 0 && dayInWeek === 0) {
                weeks = [...weeks, dayInWeeks]
                dayInWeeks = []
            }
            if (i === days) {
                weeks = [...weeks, dayInWeeks]
            }
        }
        return weeks
    }

    const getSpendingInWeek = (dayInWeeks: any[]) => {
        let spendingInWeek: ISpending[] = []
        const totalSpending: TotalSpending = {
            food: 0,
            coffee: 0,
            hangOUt: 0,
            oil: 0,
            waste: 0,
            house: 0,
            good: 0,
            bad: 0,
            other: 0,
            total: 0
        }

        const spendingInYearAndMonth = spendings.filter(item => {
            const time = new Date(item.time)
            if (time.getFullYear() === currentYear && time.getMonth() === currentMonth) {
                return time
            }
        })

        dayInWeeks.forEach(dayOfWeek => {
            spendingInYearAndMonth.map(spending => {
                const time = new Date(spending.time)
                if (moment(time).format('L') === moment(dayOfWeek).format('L')) spendingInWeek = [...spendingInWeek, spending]
                return spending
            })
        })

        spendingInWeek.map(item => {
            totalSpending.total += item.price
            if (item.name === 'food') totalSpending.food += item.price
            if (item.name === 'coffee') totalSpending.coffee += item.price
            if (item.name === 'hangOut') totalSpending.hangOUt += item.price
            if (item.name === 'oil') totalSpending.oil += item.price
            if (item.name === 'house') totalSpending.house += item.price
            if (item.name === 'waste') totalSpending.waste += item.price
            if (item.status === 'good') totalSpending.good += item.price
            if (item.status ==="bad") totalSpending.bad += item.price
            if (item.name === 'other') totalSpending.other += item.price
        })
        return totalSpending
    }

    return (
        <div className='grid grid-cols-2 gap-2'>
            {
                generateWeek(currentMonth, currentYear).map((week: any, index: number) => {
                    const data: TotalSpending = getSpendingInWeek(week)
                    return data.total === 0 ? null : (
                        <div className='bg-white rounded-md shadow p-2' key={index}>
                            <div className='mb-4 flex items-center justify-between'>
                                <h2 className='font-bold text-sm'>{`${moment(week[0]).format('MM/DD/YYYY')} - ${moment(week[week.length - 1]).format('MM/DD/YYYY')}`}</h2>
                                <p className='text-sm font-bold'>Total: {formatMoney.format(data?.total)}</p>
                            </div>    
                            <div className='flex items-center'>
                                <div className='w-3/5'>
                                   <div className='flex items-center mb-2'>
                                        <p className='min-w-[80px] text-xs'>Food</p>
                                        <p className='text-xs font-semibold'>{new Intl.NumberFormat('IN-en').format(data?.food)}</p>
                                    </div> 
                                    <div className='flex items-center mb-2'>
                                        <p className='min-w-[80px] text-xs'>Coffee</p>
                                        <p className='text-xs font-semibold'>{new Intl.NumberFormat('IN-en').format(data?.coffee)}</p>
                                    </div> 
                                    <div className='flex items-center mb-2'>
                                        <p className='min-w-[80px] text-xs'>Hang Out</p>
                                        <p className='text-xs font-semibold'>{new Intl.NumberFormat('IN-en').format(data?.hangOUt)}</p>
                                    </div> 
                                    <div className='flex items-center mb-2'>
                                        <p className='min-w-[80px] text-xs'>Oil</p>
                                        <p className='text-xs font-semibold'>{new Intl.NumberFormat('IN-en').format(data?.oil)}</p>
                                    </div> 
                                    <div className='flex items-center mb-2'>
                                        <p className='min-w-[80px] text-xs'>House</p>
                                        <p className='text-xs font-semibold'>{new Intl.NumberFormat('IN-en').format(data?.house)}</p>
                                    </div> 
                                    <div className='flex items-center mb-2'>
                                        <p className='min-w-[80px] text-xs'>Other</p>
                                        <p className='text-xs font-semibold'>{new Intl.NumberFormat('IN-en').format(data?.other)}</p>
                                    </div> 
                                </div>
                                <div className='w-2/5'>
                                    <div className='flex items-center mb-5'>
                                        <span className='mr-5 rounded inline-block w-5 h-5 bg-green-500'></span>
                                        <span className='text-xs font-semibold'>{new Intl.NumberFormat('IN-en').format(data?.good)}</span>
                                    </div>
                                    <div className='flex items-center'>
                                        <span className='mr-5 rounded inline-block w-5 h-5 bg-orange-500'></span>
                                        <span className='text-xs font-semibold'>{new Intl.NumberFormat('IN-en').format(data?.bad)}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )

                })
            }
        </div>
    )
}

export default WeekManager