import { useState } from 'react'
import dayjs from 'dayjs'

const nowDate = dayjs().toDate()
const firstDate = dayjs().startOf('month').toDate()
const endDate = dayjs().endOf('month').toDate()

export interface DateSwitcherDate {
  activeDate: Date
  startDate: Date
  endDate: Date
}

export const useDateSwitcher = () => {
  const [date, setDate] = useState<DateSwitcherDate>({
    activeDate: nowDate,
    startDate: firstDate,
    endDate: endDate
  })

  const onChange = ({ activeDate, startDate, endDate }: DateSwitcherDate) => {
    setDate({ activeDate, startDate, endDate })
  }

  return {
    date,
    onChange
  }
}
