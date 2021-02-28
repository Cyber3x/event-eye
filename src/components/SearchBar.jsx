import React from 'react'
import enGb from 'date-fns/locale/en-GB'
import DatePicker, { registerLocale } from 'react-datepicker'
import dayjs from 'dayjs'
registerLocale('en-gb', enGb)
import { useEventsStore } from '../stores/EventsStore'

const now = dayjs().format('DD. / MM. / YYYY.')

const Input = (props) => {
  return (
    <div className="w-full">
      <p className="pb-2 text-md font-medium text-purple-700 font-robot 3xl:text-lg">
        {props.lable}
      </p>
      <input
        type="text"
        className="w-11/12 py-2 text-lg font-medium placeholder-gray-400 transition-colors border-b-2 border-gray-500 font-opensans focus:outline-white focus:border-purple-700 3xl:text-xl text-gray-800"
        value={props.value}
        onClick={props.onClick}
        placeholder={props.placeholder}
        readOnly={props.readOnly}
      />
    </div>
  )
}

// TODO: Date picker needs to open on focus
const DatePickerInput = ({ value, onClick, onClear }) => {
  return (
    <div className="flex">
      <Input
        placeholder="11. / 12. / 2020."
        lable="Event date"
        onClick={onClick}
        value={value === now ? '' : value}
        readOnly
      />
      {value !== now && (
        <svg
          onClick={onClear}
          className="w-10 h-10 absolute right-1/12 bottom-2 text-gray-700 p-2 cursor-pointer z-50"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      )}
    </div>
  )
}

const SearchBar = (props) => {
  const filterByDate = useEventsStore((state) => state.filterByDate)
  const [searchDate, setSearchDate] = React.useState(dayjs().$d)

  const handleNewSearchDate = (date) => {
    setSearchDate(date)
    filterByDate(date)
  }

  const onClear = () => {
    handleNewSearchDate(dayjs().$d)
  }

  const className = props.className ? props.className : ''

  return (
    <div
      className={
        'flex px-10 py-6 shadow-lg bg-white z-50 rounded-xl  3xl:py-10 3xl:px-12' +
        ' ' +
        className
      }
    >
      <div className="flex justify-around flex-grow">
        <Input placeholder="Travis Scot concert" lable="Event name" />
        <Input placeholder="Zagreb" lable="Event location" />
        <DatePicker
          customInput={<DatePickerInput onClear={onClear} />}
          dateFormat="dd. / MM. / yyyy."
          selected={searchDate}
          onChange={(date) => handleNewSearchDate(date)}
          minDate={dayjs().$d}
          shouldCloseOnSelect={false}
          closeOnScroll={false}
          showPopperArrow={false}
          locale="en-gb"
        />
      </div>
      <button className="p-5 text-purple-700 transition-colors bg-purple-300 rounded-lg hover:bg-purple-700 hover:text-white w-20 h-20 focus:outline-none focus:border-purple-700 border-2 border-purple-300 hover:border-purple-700 3xl:w-22 3xl:h-22">
        <svg
          className="stroke-current"
          fill="none"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </button>
    </div>
  )
}

export default SearchBar
