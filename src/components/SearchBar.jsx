import React from 'react'
import enGb from 'date-fns/locale/en-GB'
import hrHr from 'date-fns/locale/hr'
import DatePicker, { registerLocale } from 'react-datepicker'
import dayjs from 'dayjs'
registerLocale('en-gb', enGb)
registerLocale('hr', hrHr)
import { useEventsStore } from '../stores/EventsStore'

const now = dayjs().format('DD. / MM. / YYYY.')

const Input = (props) => {
  return (
    <div className="w-full relative">
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
        onChange={(e) => props.onChange(e.target.value)}
        onFocus={props.onFocus}
        onBlur={props.onBlur}
      />
      {props.value !== props.defaultValue && (
        <svg
          onClick={props.onClear}
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

const DatePickerInput = ({ value, onClick, onClear }) => {
  return (
    <div className="flex">
      <Input
        placeholder={now}
        lable="Datum događaja"
        onClick={onClick}
        value={value}
        defaultValue={now}
        readOnly
        onClear={onClear}
        onFocus={() => onClick()}
      />
    </div>
  )
}

const SearchBar = (props) => {
  const filterByDate = useEventsStore((state) => state.filterByDate)
  const filterByName = useEventsStore((state) => state.filterByName)
  const filterByLocation = useEventsStore((state) => state.filterByLocation)
  const [searchDate, setSearchDate] = React.useState(dayjs().$d)
  const [searchName, setSearchName] = React.useState('')
  const [searchLocation, setSearchLocation] = React.useState('')

  const handleNewSearchDate = (date) => {
    setSearchDate(date)
    filterByDate(date)
  }

  const handleNameSearch = (text) => {
    setSearchName(text)
    filterByName(text)
  }

  const handleLocationSearch = (text) => {
    setSearchLocation(text)
    filterByLocation(text)
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
        <Input
          placeholder="Pixel trash party"
          lable="Naziv događaja"
          value={searchName}
          defaultValue=""
          onChange={(text) => handleNameSearch(text)}
          onClear={() => handleNameSearch('')}
        />
        <Input
          placeholder="Koprivnica"
          lable="Lokacija događaja"
          value={searchLocation}
          defaultValue=""
          onChange={(text) => handleLocationSearch(text)}
          onClear={() => handleLocationSearch('')}
        />
        <DatePicker
          customInput={
            <DatePickerInput onClear={() => handleNewSearchDate(dayjs().$d)} />
          }
          dateFormat="dd. / MM. / yyyy."
          selected={searchDate}
          onChange={(date) => handleNewSearchDate(date)}
          minDate={dayjs().$d}
          shouldCloseOnSelect={false}
          closeOnScroll={false}
          showPopperArrow={false}
          locale="hr"
        />
      </div>
      {/* <button className="p-5 text-purple-700 transition-colors bg-purple-300 rounded-lg hover:bg-purple-700 hover:text-white w-20 h-20 focus:outline-none focus:border-purple-700 border-2 border-purple-300 hover:border-purple-700 3xl:w-22 3xl:h-22">
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
      </button> */}
    </div>
  )
}

export default SearchBar
