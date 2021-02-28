import dayjs from 'dayjs'
import create from 'zustand'
import { firestore } from '../firebase'

export const useEventsStore = create((set, get) => ({
  eventsStorage: [],
  events: [],
  loading: false,
  fetchEvents: async () => {
    if (get().events.length === 0) {
      set({ loading: true })
      try {
        const events = []
        const docs = await firestore
          .collection('events')
          .orderBy('createdAt', 'desc')
          .get()
        docs.forEach((doc) => events.push({ ...doc.data(), id: doc.id }))
        set({ events })
        set({ eventsStorage: events })
        set({ loading: false })
        console.log('ZUSTAND FETCHED')
      } catch (error) {
        console.error('[GETTING EVENTS STORE]:', error)
      }
    } else {
      console.log('store has events')
    }
  },

  filterByDate: (date) => {
    const events = get().eventsStorage.filter((event) => {
      const eventDate = dayjs(
        dayjs(event.startDateTime.toDate()).format('DD. / MM. / YYYY.')
      )
      const targetDate = dayjs(date)
      return eventDate.isAfter(targetDate) || eventDate.isSame(targetDate)
      // FIXME: event picking broken
    })

    set({ events })
  },
}))
