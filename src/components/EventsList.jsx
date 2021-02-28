import React from 'react'
import { useEventsStore } from '../stores/EventsStore'

import EventCard from './EventCard'

const EventsList = ({ className, excludeId }) => {
  let events = useEventsStore((state) => state.events)

  if (excludeId) events = events.filter((event) => event.id !== excludeId)

  return (
    <div
      className={
        'grid mx-auto gap-x-6 gap-y-10 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 3xl:grid-cols-4 ' +
        className
      }
    >
      {events.map((event) => {
        return <EventCard key={event.id} {...event} />
      })}
    </div>
  )
}

export default EventsList
