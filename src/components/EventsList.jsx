import React from 'react'
import { useEventsStore } from '../stores/EventsStore'

import EventCard from './EventCard'

const EventsList = ({ className, excludeId }) => {
  let events = useEventsStore((state) => state.events)
  const loading = useEventsStore((state) => state.loading)

  if (excludeId) events = events.filter((event) => event.id !== excludeId)

  return (
    <div
      className={
        'grid mx-auto gap-x-6 gap-y-10 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 3xl:grid-cols-4 ' +
        className
      }
    >
      {!loading &&
        (events.length !== 0 ? (
          events.map((event) => {
            return <EventCard key={event.id} {...event} />
          })
        ) : (
          <h1 className="text-4xl font-roboto font-black text-purple-700 col-span-3 text-center mt-10">
            Ne postoji događaj koji odgovara uvjetima pretrage.
          </h1>
        ))}
    </div>
  )
}

export default EventsList
