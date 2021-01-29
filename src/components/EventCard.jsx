import React, { useState } from 'react'
import { Text } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { HeartIconFilled, ShareIcon, HeartIcon } from '../components/Icons'
import dayjs from 'dayjs'

const EventCard = ({
  name,
  imageUrl,
  shortDescription,
  id,
  ticketNeeded,
  ticketPrice,
  startDateTime,
}) => {
  const [liked, setLiked] = useState(false)
  const startDateTimeParsed = dayjs(startDateTime.toDate())

  return (
    <Link to={`/event/${id}`} className="z-40">
      <article className="shadow-xl rounded-lg overflow-hidden relative">
        <section className="absolute top-5 flex justify-between w-full">
          <p
            className="bg-white ml-5 items-center flex px-4 rounded-md text-sm font-opensans z-50 font-semibold cursor-default text-gray-700 3xl:text-base"
            onClick={(e) => e.preventDefault()}
          >
            {ticketNeeded ? ticketPrice + ' kn' : 'FREE'}
          </p>
          <div className="flex">
            <div
              className="bg-white p-2 rounded-full mr-4 z-50 text-gray-700"
              onClick={(e) => e.preventDefault()}
            >
              <ShareIcon className="w-6 h-6" />
            </div>
            <div
              className="bg-white p-2 rounded-full mr-5 z-50"
              onClick={(e) => {
                e.preventDefault()
                setLiked(!liked)
              }}
            >
              {liked ? (
                <HeartIconFilled className="w-7 h-7 text-red-600" />
              ) : (
                <HeartIcon className="w-6 h-6 text-gray-700" />
              )}
            </div>
          </div>
        </section>

        <div className="aspect-w-2 aspect-h-1">
          <img src={imageUrl} className="object-fill" />
        </div>

        <section
          className="grid px-6 py-4 h-34"
          style={{
            gridTemplateColumns: '15% 5% 80%',
            gridAutoRows: '1fr',
          }}
        >
          <p className="col-start-1 text-purple-700 font-bold font-opensans text-lg text-center">
            {startDateTimeParsed.format('MMM').toUpperCase()}
          </p>
          <Text
            className="col-start-3 font-opensans font-semibold text-md mb-2"
            isTruncated
            noOfLines={2}
          >
            {name}
          </Text>
          <p className="col-start-1 text-center font-roboto text-2xl font-medium">
            {startDateTimeParsed.format('DD')}
          </p>
          <Text
            className="col-start-3 font-opensans text-md text-gray-400 font-semibold"
            isTruncated
            noOfLines={2}
          >
            {shortDescription}
          </Text>
        </section>
        {/* <section className="px-6 py-4 flex">
          <div className="mr-6">
            <p className="text-center text-purple-700 font-bold font-opensans text-lg mb-2">
              {startDateTimeParsed.format('MMM').toUpperCase()}
            </p>
            <p className="text-center font-roboto text-2xl font-medium">
              {startDateTimeParsed.format('DD')}
            </p>
          </div>
          <div>
            <Text
              className="font-opensans font-semibold text-lg mb-2"
              isTruncated
              noOfLines={2}
            >
              {name}
            </Text>
            <Text
              className="font-opensans text-md text-gray-400 font-semibold"
              isTruncated
              noOfLines={2}
            >
              {shortDescription}
            </Text>
          </div>
        </section> */}
      </article>
    </Link>
  )
}

export default EventCard
