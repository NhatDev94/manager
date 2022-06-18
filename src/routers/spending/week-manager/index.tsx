import moment from 'moment'
import React, { useState } from 'react'
import { ISpending } from '../../../interfaces'

interface Props {
    spendings: ISpending[]
}

const WeekManager = ({ spendings }: Props) => {
    const now = new Date()

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
        let result: ISpending[] = []
        
        const yearAndMonthFilter = spendings.filter(item => {
            const time = new Date(item.time)
            if (time.getFullYear() === currentYear && time.getMonth() === currentMonth) {
                return time
            }
        })
        
        dayInWeeks.forEach(dayOfWeek => {
            yearAndMonthFilter.map(spending => {
                const time = new Date(spending.time)
                if (moment(time).format('L') === moment(dayOfWeek).format('L')) result = [...result, spending]
            return spending
            })
        })

        // tinh tong tien
    }

    return (
        <div className=''>
            {
                generateWeek(currentMonth, currentYear).map((week: any, index: number) => {
                    getSpendingInWeek(week)
                })
            }
        </div>
    )
}

export default WeekManager