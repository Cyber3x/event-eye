import dayjs from 'dayjs'
import create from 'zustand'
import { firestore } from '../firebase'

export const useEventsStore = create((set, get) => ({
  eventsStorage: [],
  events: [],
  loading: false,
  filters: {},
  fetchEvents: async () => {
    if (get().events.length === 0) {
      set({ loading: true })
      try {
        const events = []
        const docs = await firestore
          .collection('events')
          .where('startDateTime', '>=', new Date())
          .orderBy('startDateTime', 'asc')
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

  // TODO: MAIN -------------------------------------------------------------------
  runFilters: () => {
    let events = get().eventsStorage
    const filters = get().filters
    console.log('runnign filters\n', filters)

    for (const filterName in filters) {
      const currentFilter = filters[filterName]
      if (currentFilter) events = events.filter(currentFilter)
    }

    set({ events })
  },

  filterByDate: (date) => {
    const targetDate = dayjs(date)
    const filters = get().filters

    filters.dateFilter = (event) => {
      const eventDate = dayjs(event.startDateTime.toDate())
      return (
        eventDate.isAfter(targetDate, 'date') ||
        eventDate.isSame(targetDate, 'date')
      )
    }

    set({ filters })
    get().runFilters()
  },

  filterByName: (searchText) => {
    const filters = get().filters

    filters.nameFilter = (event) =>
      event.name.toLowerCase().includes(searchText.toLowerCase())

    set({ filters })
    get().runFilters()
  },

  filterByLocation: (searchText) => {
    const filters = get().filters

    filters.locationFilter = (event) =>
      event.location.toLowerCase().includes(searchText.toLowerCase())

    set({ filters })
    get().runFilters()
  },

  filterByDayType: (id) => {
    const filters = get().filters

    let dayTypeFilter

    if (id === 1) {
      dayTypeFilter = (event) => {
        const eventDate = dayjs(event.startDateTime.toDate())
        return eventDate.day() < 5
      }
    } else if (id === 2) {
      dayTypeFilter = (event) => {
        const eventDate = dayjs(event.startDateTime.toDate())
        return eventDate.day() > 4
      }
    } else {
      delete filters.dayTypeFilter
    }

    filters.dayTypeFilter = dayTypeFilter
    set({ filters })
    get().runFilters()
  },

  filterByPriceRange: (id) => {
    const filters = get().filters

    let priceRangeFilter

    switch (id) {
      case 1:
        priceRangeFilter = (event) => !event.ticketNeeded
        break
      case 2:
        priceRangeFilter = (event) =>
          !event.ticketNeeded ||
          (event.ticketNeeded && parseFloat(event.ticketPrice) < 20)
        break
      case 3:
        priceRangeFilter = (event) =>
          parseFloat(event.ticketPrice) >= 20 &&
          parseFloat(event.ticketPrice) < 50
        break
      case 4:
        priceRangeFilter = (event) =>
          parseFloat(event.ticketPrice) >= 50 &&
          parseFloat(event.ticketPrice) < 100
        break
      case 5:
        priceRangeFilter = (event) => parseFloat(event.ticketPrice) >= 100
        break
      default:
        delete filters.priceRangeFilter
        break
    }

    filters.priceRangeFilter = priceRangeFilter
    set({ filters })
    get().runFilters()
  },

  clearEvents: () => {
    const events = []
    set({ events })
  },
}))
