import React from 'react'
import PropTypes, { InferProps } from 'prop-types'
import SVG from 'react-inlinesvg'
import { v4 as uuidv4 } from 'uuid'
import '../../DateSwitcher.scss'
import { getMonths } from '../../../../utils'

const nowMonth = new Date().getMonth()

const propTypes = {
  yearLabel: PropTypes.string.isRequired,
  handleClickPrevYear: PropTypes.func.isRequired,
  handleClickLabel: PropTypes.func.isRequired,
  handleClickNextYear: PropTypes.func.isRequired,
  handleClickChangeMonth: PropTypes.func.isRequired,
  selectedMonth: PropTypes.number
}

export const EditingTemplate = ({
  yearLabel,
  handleClickPrevYear,
  handleClickLabel,
  handleClickNextYear,
  handleClickChangeMonth,
  selectedMonth
}: InferProps<typeof propTypes>) => {
  const getClassesMonthBtn = (monthNumber: number) => {
    const isNowMonth = getNowMonthClass(monthNumber)
    const isSelectedMonth = getNowSelectedClass(monthNumber)
    return `date-switcher__viewContainer__button ${isNowMonth} ${isSelectedMonth}`
  }

  const getNowMonthClass = (monthNumber: number) => {
    return monthNumber === nowMonth ? 'date-switcher__viewContainer__button-outlined' : ''
  }

  const getNowSelectedClass = (monthNumber: number) => {
    return monthNumber === selectedMonth ? 'date-switcher__viewContainer__button-fill' : ''
  }

  const months = getMonths()

  const renderMonths = () => {
    return months.map((month) => (
      <div
        key={uuidv4()}
        className='date-switcher__viewContainer__cell'
      >
        <button
          data-month={month.month()}
          title={month.format('MMMM')}
          className={getClassesMonthBtn(month.month())}
          onClick={handleClickChangeMonth}
        >
          {month.format('MMM')}
        </button>
      </div>
    ))
  }

  return (
    <>
      <div className='date-switcher__navigate'>
        <button
          className='date-switcher__navigate__arrow date-switcher__navigate__prev'
          onClick={handleClickPrevYear}
        >
          <SVG src='/images/icons/arrow-left.svg' />
        </button>

        <button
          className='date-switcher__navigate__label'
          onClick={handleClickLabel}
        >
          <span className='date-switcher__navigate__label-text'>
            {yearLabel}
          </span>
        </button>

        <button
          className='date-switcher__navigate__arrow date-switcher__navigate__next'
          onClick={handleClickNextYear}
        >
          <SVG src='/images/icons/arrow-right.svg' />
        </button>
      </div>

      <div className='date-switcher__viewContainer'>
        <div className='date-switcher__viewContainer__group'>
          {renderMonths()}
        </div>
      </div>
    </>
  )
}

EditingTemplate.propTypes = propTypes
