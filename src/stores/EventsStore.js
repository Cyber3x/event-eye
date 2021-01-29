import create from 'zustand'

const useEventsStore = create((set) => ({
  events: [],
  fetchEvents: async,
}))

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
