import React, { useEffect, useState } from 'react'
import { useParams, Link, useHistory, useLocation } from 'react-router-dom'
import dayjs from 'dayjs'
import EventsList from '../components/EventsList'
import { useEventsStore } from '../stores/EventsStore'

const EventDetailsPage = () => {
  const [event, setEvent] = useState({})
  const { id } = useParams()
  const history = useHistory()
  const _location = useLocation()

  const fetchEvents = useEventsStore((state) => state.fetchEvents)
  const events = useEventsStore((state) => state.events)
  const loading = useEventsStore((state) => state.loading)

  useEffect(async () => {
    fetchEvents()
  }, [])

  useEffect(() => {
    if (events.length) {
      let response = events.filter((event) => event.id === id)

      if (response.length === 1) {
        setEvent(response[0])
      } else if (response.length < 1) {
        history.push('/404')
      } else {
        console.error('[GET EVENT]: got more than one event for id: ', id)
      }
    }

    if (_location.state.resetScroll) {
      window.scrollTo(0, 0)
      _location.state = {}
    }
  }, [events, id])

  const {
    imageUrl,
    name,
    createdBy,
    startDateTime,
    description,
    endDateTime,
    ticketNeeded,
    ticketPrice,
    ticketCurrency,
    ticketWhereToBuy,
    location,
  } = event
  const startDateTimeParsed = dayjs(startDateTime?.toDate())
  const endDateTimeParsed = dayjs(endDateTime?.toDate())

  return !loading ? (
    <div className="mb-40">
      <div className="w-5/6 mx-auto aspect-w-5 aspect-h-2 rounded-xl overflow-hidden relative">
        <img src={imageUrl} className="object-cover" />
      </div>
      <div className="grid grid-cols-10 w-3/4 mx-auto bg-white shadow-xl py-6 -mt-20 rounded-xl relative z-50">
        <div className="col-span-6 ml-10 flex flex-col justify-between">
          <h1 className="text-4xl font-bold text-gray-700 font-opensans">
            {name}
          </h1>
          <p className="text-lg font-medium text-gray-500 font-roboto">
            By:{' '}
            <Link
              className="text-purple-700 hover:text-purple-900 hover:font-medium"
              to={`/users/${createdBy}`}
            >
              {createdBy}
            </Link>
          </p>
        </div>
        <div className="col-span-3 col-start-8 mr-10">
          <h1 className="text-2xl font-bold text-gray-700 font-opensans">
            {startDateTimeParsed.format('dddd, MMM D, YYYY, [at] HH:mm')}
          </h1>
          <div className="flex font-roboto justify-between mt-4">
            <button className="py-2 w-0.45 font-opensans border-2 rounded-lg border-purple-700 text-sm ">
              Mark as going
            </button>
            <button className="py-2 w-0.45 font-opensans text-sm rounded-lg bg-purple-700 text-white ">
              Add to calendar
            </button>
          </div>
        </div>
      </div>
      <div className="w-3/4 mx-auto grid grid-cols-10 mt-4">
        <section className="col-span-6">
          <TextHeader text="Description" />
          <TextBody>{description}</TextBody>
          <TextHeader text="Hours" />
          <TextBody>
            Hours:
            <span className="font-bold text-gray-700 ml-2">
              {startDateTimeParsed.format('HH:mm')} -{' '}
              {endDateTimeParsed.format('HH:mm')}
            </span>
          </TextBody>
          <TextHeader text="Tickets" />
          <TextBody>
            Price:{' '}
            <span className="font-bold text-gray-700 ml-2">
              {ticketNeeded ? ticketPrice : 'FREE'} {ticketCurrency}
            </span>
          </TextBody>
          <TextBody>
            <span className="font-bold -mt-4">Where to buy them?</span>
          </TextBody>
          <TextBody>{ticketWhereToBuy}</TextBody>
        </section>
        <section className="col-span-3 col-start-8">
          <TextHeader text="Location" />
          <div className="aspect-w-4 aspect-h-3 rounded-xl overflow-hidden mt-8">
            <img src={imageUrl} className="object-cover" />
          </div>
          <TextHeader text={name} className="text-xl" />
          <TextBody>{location}</TextBody>
          {/* <TextHeader text="Tags" /> */}
          <TextHeader text="Share with friends" />
        </section>
      </div>
      <h1 className="w-3/4 mx-auto text-3xl font-semibold text-gray-700 font-opensans mt-28 mb-14">
        Other events you may like
      </h1>
      <EventsList className="w-3/4" excludeId={id} />
    </div>
  ) : null
}

const TextHeader = ({ text, className }) => {
  className = className ? className : 'text-2xl'
  return (
    <h1
      className={
        'font-bold text-gray-600 font-opensans mt-12' + ' ' + className
      }
    >
      {text}
    </h1>
  )
}

const TextBody = ({ children, className }) => {
  return (
    <p
      className={
        'mt-8 font-opensans font-semibold text-lg text-gray-500' +
        ' ' +
        className
      }
    >
      {children}
    </p>
  )
}
export default EventDetailsPage
