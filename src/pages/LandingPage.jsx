import React from 'react'

// IMGS
import headerImg from '../assets/images/header.jpg'

// COMS
import SearchBar from '../components/SearchBar'
import Dropdown from '../components/Dropdown'
import EventsList from '../components/EventsList'

// Store
import { useEventsStore } from '../stores/EventsStore'

import { Skeleton } from '@chakra-ui/react'

const SortingSeparator = (props) => {
  const filterByDayType = useEventsStore((state) => state.filterByDayType)
  const filterByPriceRange = useEventsStore((state) => state.filterByPriceRange)

  return (
    <div className={'w-3/4 mx-auto flex ps-center ' + props.className}>
      <h1 className="flex-grow text-4xl font-bold text-gray-700 font-opensans xl:text-5xl">
        Nadolazeći događaji
      </h1>
      <Dropdown onChange={(id) => filterByDayType(id)}>
        <Dropdown.Item id={0}>Svi dani</Dropdown.Item>
        <Dropdown.Item id={1}>Radni dani</Dropdown.Item>
        <Dropdown.Item id={2}>Vikend</Dropdown.Item>
      </Dropdown>
      <Dropdown onChange={(id) => filterByPriceRange(id)}>
        <Dropdown.Item id={0}>Sve cijene</Dropdown.Item>
        <Dropdown.Item id={1}>Besplatno</Dropdown.Item>
        <Dropdown.Item id={2}>Manje od 20 kn</Dropdown.Item>
        <Dropdown.Item id={3}>20 - 50 kn</Dropdown.Item>
        <Dropdown.Item id={4}>50 - 100 kn</Dropdown.Item>
        <Dropdown.Item id={5}>Više od 100 kn</Dropdown.Item>
      </Dropdown>
      {/* <Dropdown text="Kategorija">
        <Dropdown.Item>Uživo</Dropdown.Item>
        <Dropdown.Item>Predstava</Dropdown.Item>
        <Dropdown.Item>Party</Dropdown.Item>
        <Dropdown.Item>Ples</Dropdown.Item>
      </Dropdown> */}
    </div>
  )
}

const LandingPage = () => {
  const fetchEvents = useEventsStore((state) => state.fetchEvents)
  const loading = useEventsStore((state) => state.loading)

  React.useEffect(() => {
    fetchEvents()
  }, [])

  return (
    <div className="h-full mb-28">
      <Skeleton
        isLoaded={!loading}
        className="aspect-w-5 aspect-h-2 w-5/6 mx-auto rounded-xl overflow-hidden"
      >
        <img
          src={headerImg}
          className="object-cover z-10"
          alt="people dancing infront of a dj stage"
        />
      </Skeleton>
      <SearchBar className="relative w-3/4 mx-auto -mt-14" />
      <SortingSeparator className="my-16" />
      <EventsList className="w-3/4" />
    </div>
  )
}

export default LandingPage
