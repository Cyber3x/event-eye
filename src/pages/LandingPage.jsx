import React from 'react'

// IMGS
import headerImg from '../assets/images/header.jpg'

// COMS
import SearchBar from '../components/SearchBar'
import Dropdown from '../components/Dropdown'
import EventsList from '../components/EventsList'

const SortingSeparator = (props) => {
  return (
    <div className={'w-3/4 mx-auto flex items-center ' + props.className}>
      <h1 className="flex-grow text-4xl font-bold text-gray-700 font-opensans xl:text-5xl">
        Upcoming events
      </h1>
      <Dropdown text="Any day">
        <Dropdown.Item>Weekday</Dropdown.Item>
        <Dropdown.Item>Weekend</Dropdown.Item>
      </Dropdown>
      <Dropdown text="Price range">
        <Dropdown.Item>Free</Dropdown.Item>
        <Dropdown.Item>less than 20 kn</Dropdown.Item>
        <Dropdown.Item>20 - 50 kn</Dropdown.Item>
        <Dropdown.Item>50 - 100 kn</Dropdown.Item>
        <Dropdown.Item>More than 100 kn</Dropdown.Item>
      </Dropdown>
      <Dropdown text="Any category">
        <Dropdown.Item>Live show</Dropdown.Item>
        <Dropdown.Item>Theatre</Dropdown.Item>
        <Dropdown.Item>Party</Dropdown.Item>
        <Dropdown.Item>Dance</Dropdown.Item>
      </Dropdown>
    </div>
  )
}

const LandingPage = () => {
  return (
    <div className="h-full mb-52">
      <div className=" aspect-w-5 aspect-h-2">
        <img
          src={headerImg}
          className="object-cover z-10 w-5/6 mx-auto overflow-hidden rounded-xl"
          alt="people dancing infront of a dj stage"
        />
      </div>
      <SearchBar className="relative w-3/4 mx-auto -mt-14" />
      <SortingSeparator className="my-16" />
      <EventsList className="w-3/4" />
    </div>
  )
}

export default LandingPage
