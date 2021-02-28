import React, { useState } from 'react'
import { Text, Tooltip } from '@chakra-ui/react'
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
    <Link
      to={{ pathname: `/event/${id}`, state: { resetScroll: true } }}
      className="z-40"
    >
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
              // TODO: Implement share logic
              onClick={(e) => e.preventDefault()}
              onMouseDown={(e) => e.preventDefault()}
            >
              <ShareIcon className="w-6 h-6" />
            </div>
            <div
              className="bg-white p-2 rounded-full mr-5 z-50"
              onClick={(e) => {
                e.preventDefault()
                setLiked(!liked)
              }}
              onMouseDown={(e) => e.preventDefault()}
            >
              {liked ? (
                <HeartIconFilled className="w-6 h-6 text-red-600" />
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
          className="grid px-6 pt-4 mb-2 h-28"
          style={{
            gridTemplateColumns: '15% 5% 80%',
            gridAutoRows: '40% 50%',
          }}
        >
          <p className="col-start-1 text-purple-700 font-bold font-opensans text-lg text-center">
            {startDateTimeParsed.format('MMM').toUpperCase()}
          </p>
          <Tooltip label={name} placement="top-start">
            <p className="col-start-3  font-opensans font-semibold text-md mb-2 truncate">
              {name}
            </p>
          </Tooltip>
          <p className="col-start-1 justify-around flex items-center font-roboto text-2xl font-medium">
            {startDateTimeParsed.format('DD')}
          </p>
          <Tooltip label={shortDescription} placement="top-start">
            <Text
              className="col-start-3 font-opensans text-md text-gray-400 font-semibold"
              isTruncated
              noOfLines={2}
            >
              {shortDescription}
            </Text>
          </Tooltip>
        </section>
      </article>
    </Link>
  )
}

export default EventCard
