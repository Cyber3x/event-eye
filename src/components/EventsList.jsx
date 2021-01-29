import React, { useState, useEffect } from 'react'
import { firestore } from '../firebase'

import EventCard from './EventCard'

const EventsList = ({ className }) => {
  const [events, setEvents] = useState([])

  useEffect(async () => {
    try {
      const _events = []
      const docs = await firestore
        .collection('events')
        .orderBy('createdAt', 'desc')
        .get()
      docs.forEach((doc) => _events.push({ ...doc.data(), id: doc.id }))
      setEvents(_events)
    } catch (error) {
      console.error('[GETTING EVENTS]:', error)
    }
  }, [])

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
