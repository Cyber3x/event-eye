import dayjs from 'dayjs'
import React, { useState, useEffect, useRef } from 'react'
import DatePicker, { registerLocale } from 'react-datepicker'
import { storage, firestore } from '../firebase'
import { useAuth } from '../contexts/AuthContext'
import enGb from 'date-fns/locale/en-GB'
registerLocale('en-gb', enGb)

// COMPS
import Input from '../components/Input'
import Card from '../components/Card'

const CreateEventPage = () => {
  const [showUploadButton, setShowUploadButton] = useState(false)
  const [showSuccesfulUpload, setShowSuccesfulUpload] = useState(false)
  const [imageFile, setImageFile] = useState('')
  const [imageFromatError, setImageFormatError] = useState('')
  const [imageSrc, setImageSrc] = useState(undefined)
  const imageInput = useRef(null)
  const { currentUser } = useAuth()
  const [data, setData] = useState({
    name: '',
    location: '',
    startDateTime: new Date(),
    minStartTime: new Date(),
    endDateTime: new Date(),
    minEndTime: new Date(),
    description: '',
    shortDescription: '',
    imageUrl: '',
    ticketNeeded: true,
    ticketPrice: '',
    ticketCurrency: 'HRK',
    ticketWhereToBuy: '',
  })

  const now = dayjs().format('DD. / MM. / YYYY. - HH:mm')

  const DatePickerButton = ({ value, onClick }) => {
    return (
      <button
        className={
          'border-gray-300 border-2 p-4 rounded-xl w-full text-left mt-2 font-opensans font-semibold text-xs focus:border-purple-700 focus:outline-none outline-none' +
          (value !== now ? ' text-purple-700' : ' text-gray-400')
        }
        onClick={onClick}
      >
        {value}
      </button>
    )
  }

  const setDataField = (fieldName) => {
    return (value) => {
      setData((prevData) => ({ ...prevData, [fieldName]: value }))
    }
  }

  useEffect(() => {
    if (data.startDateTime > data.endDateTime) {
      setDataField('endDateTime')(data.startDateTime)
    }

    // Makes sure that you can't select time in the past
    if (data.startDateTime.getDate() > new Date().getDate()) {
      setDataField('minStartTime')(dayjs().startOf('date').$d)
    } else {
      setDataField('minStartTime')(dayjs().$d)
    }

    // Makes sure that you can't select time before the starting time
    if (data.endDateTime.getDate() > data.startDateTime.getDate()) {
      setDataField('minEndTime')(dayjs().startOf('date').$d)
    } else {
      setDataField('minEndTime')(data.startDateTime)
    }
  }, [data.startDateTime, data.endDateTime])

  const handleImageSelection = (_imageFile) => {
    setImageFile(_imageFile)
    setImageFormatError('')
    setImageSrc(undefined)
    setShowSuccesfulUpload(false)
    const imageFormat = _imageFile.type.split('/')[1]
    if (['jpg', 'jpeg', 'png'].includes(imageFormat)) {
      setImageSrc(URL.createObjectURL(_imageFile))
      setShowUploadButton(true)
    } else {
      setImageFormatError('File format not supported. Use .jpg, .jpeg or .png')
    }
  }

  const handleImageUpload = async () => {
    const storageRef = storage.ref('headerPhotos/' + imageFile.name)
    setShowUploadButton(false)
    try {
      const snapshot = await storageRef.put(imageFile)
      setShowSuccesfulUpload(true)
      const downloadURL = await storageRef.getDownloadURL()
      const imageUrl = downloadURL.split('&')[0]
      setDataField('imageUrl')(imageUrl)
    } catch (error) {
      console.error('[UPLOAD IMAGE]:', error)
    }
  }

  const handleEventUpload = async () => {
    const {
      name,
      location,
      startDateTime,
      endDateTime,
      description,
      shortDescription,
      imageUrl,
      ticketNeeded,
      ticketCurrency,
      ticketPrice,
      ticketWhereToBuy,
    } = data

    let newEvent = {
      name,
      location,
      startDateTime,
      endDateTime,
      description,
      shortDescription,
      imageUrl,
      ticketNeeded,
      createdAt: new Date(),
      createdBy: currentUser.uid,
    }

    if (ticketNeeded)
      newEvent = { ...newEvent, ticketCurrency, ticketPrice, ticketWhereToBuy }

    try {
      const docRef = await firestore.collection('events').add(newEvent)
      console.log('event added, id:', docRef.id)
    } catch (error) {
      console.error('[ERROR, UPLOAD EVENT]:', error)
    }
  }

  return (
    <div className="w-1/2 mx-auto">
      <h1 className="my-10 text-3xl font-bold text-gray-400 font-opensans">
        Create an event
      </h1>
      {/* {JSON.stringify(data, null, 2)} */}
      {/* Basic info */}
      <Card>
        <Card.Header
          letter="B"
          title="Basic info"
          bg="from-red-600 to-yellow-400"
          description="Name your event, add starting and ending times. Mark the event
          location so people can find you."
        />
        <Card.Body>
          <Input
            lable="Name"
            placeholder="Short, recognizable and memorable"
            onChange={(value) => setDataField('name')(value)}
            value={data.name}
          />
          <Input
            lable="Location"
            placeholder="Search locations"
            onChange={(value) => setDataField('location')(value)}
            value={data.location}
          />
          <p className="mt-4 text-sm font-bold text-gray-600 font-opensans">
            Start date and time
          </p>
          <div className="w-full">
            <DatePicker
              dateFormat="dd. / MM. / yyyy. - HH:mm"
              timeFormat="HH:mm"
              selected={data.startDateTime}
              onChange={setDataField('startDateTime')}
              timeCaption="Start time"
              showTimeSelect
              timeIntervals={10}
              minDate={dayjs().$d}
              minTime={data.minStartTime}
              maxTime={dayjs().endOf('date').$d}
              customInput={<DatePickerButton />}
              shouldCloseOnSelect={false}
              showPopperArrow={false}
              locale="en-gb"
            />
          </div>
          <p className="mt-4 font-bold text-gray-600 font-opensans text-md">
            End date and time
          </p>
          <DatePicker
            dateFormat="dd. / MM. / yyyy. - HH:mm"
            timeFormat="HH:mm"
            selected={data.endDateTime}
            onChange={setDataField('endDateTime')}
            timeCaption="End time"
            showTimeSelect
            timeIntervals={10}
            minDate={data.startDateTime}
            minTime={data.minEndTime}
            maxTime={dayjs().endOf('date').$d}
            customInput={<DatePickerButton />}
            shouldCloseOnSelect={false}
            showPopperArrow={false}
            locale="en-gb"
          />
        </Card.Body>
      </Card>

      {/* More info */}
      <Card>
        <Card.Header
          letter="M"
          bg="from-blue-900 to-green-400"
          title="More info"
          description="Add description to your event so people know what’s going on."
        />
        <Card.Body>
          <Input
            multiline
            lable="Description"
            placeholder="Write down what’t happening and why people should come"
            onChange={(value) => setDataField('description')(value)}
            value={data.description}
          />
          <Input
            lable="Short description"
            placeholder="Short, catchy, memorable"
            onChange={(value) => setDataField('shortDescription')(value)}
            value={data.shortDescription}
          />
          <p className="mb-2 mt-4 text-sm font-bold text-gray-600 font-opensans">
            Is this event free?
          </p>
          <div className="w-full text-xs font-semibold text-purple-700 placeholder-gray-400 border-2 border-gray-300 outline-none rounded-xl font-opensans flex overflow-hidden">
            <div
              className={
                'flex-1 text-center p-4 ' +
                (data.ticketNeeded ? '' : ' bg-purple-700 text-white')
              }
              onClick={() => setDataField('ticketNeeded')(false)}
            >
              Yes, the event is free
            </div>
            <div
              className={
                'flex-1 text-center p-4 ' +
                (data.ticketNeeded ? ' bg-purple-700 text-white' : '')
              }
              onClick={() => setDataField('ticketNeeded')(true)}
            >
              No, tickets are needed
            </div>
          </div>
        </Card.Body>
      </Card>

      {/* Upload image */}
      <Card>
        <Card.Header
          letter="I"
          title="Upload Image"
          description="Add an image that represents your event and makes is more eye catching."
          bg="from-red-600 to-gray-800"
        />
        <Card.Body>
          <div
            className="bg-gray-200 text-center rounded-xl aspect-w-2 aspect-h-1 text-gray-400 flex overflow-hidden"
            onDrop={(e) => {
              e.preventDefault()
              handleImageSelection(e.dataTransfer.files[0])
            }}
            onDragOver={(e) => e.preventDefault()}
          >
            <div className="flex items-center justify-center">
              {imageSrc ? (
                <img
                  src={imageSrc}
                  onClick={() => imageInput.current.click()}
                  className="cursor-pointer object-cover"
                />
              ) : (
                <div>
                  <svg
                    className="w-14 h-14 mx-auto"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <p className="text-sm text-black font-bold pt-2 font-opensans">
                    Drag and drop an image
                  </p>
                  <p className="text-xs text-gray-500 mt-1 font-roboto">
                    Or{' '}
                    <span
                      className="text-purple-700 font-semibold cursor-pointer"
                      onClick={() => imageInput.current.click()}
                    >
                      browse
                    </span>{' '}
                    to chose a file
                  </p>
                  <p className="text-sm text-gray-400 w-5/6 mx-auto mt-4 font-opensans">
                    This is the first image attendies will see at the top of
                    your listing. Use a high qulity image: 2160x1080px (2:1
                    ratio){' '}
                  </p>
                </div>
              )}
            </div>
          </div>
          {showUploadButton && (
            <Card.Button
              className="mt-4 bg-purple-700 text-white hover:bg-purple-900"
              onClick={() => handleImageUpload()}
            >
              Upload
            </Card.Button>
          )}
          {showSuccesfulUpload && (
            <Card.Button className="mt-4 bg-green-700 text-white text-sm cursor-default">
              Image successfully uploaded
            </Card.Button>
          )}
          {imageFromatError && (
            <Card.Button className="mt-4 bg-red-800 text-white text-sm cursor-default">
              {imageFromatError}
            </Card.Button>
          )}
          <input
            type="file"
            accept="image/*"
            ref={imageInput}
            onChange={(e) => handleImageSelection(e.target.files[0])}
            hidden
          />
        </Card.Body>
      </Card>

      {/* Ticket info */}
      {data.ticketNeeded && (
        <Card>
          <Card.Header
            letter="T"
            title="Ticket info"
            description="Add information about tickets and payment methodes."
            bg="from-green-900 to-green-300"
          />

          <Card.Body>
            <Input
              lable="Price"
              placeholder="Ticket price"
              onChange={(value) => setDataField('ticketPrice')(value)}
              value={data.ticketPrice}
            />
            {/* <Dropdown text="Select currency">
            <Dropdown.Item>Hrk</Dropdown.Item>
            <Dropdown.Item>Eur</Dropdown.Item>
            <Dropdown.Item>Usd</Dropdown.Item>
            <Dropdown.Item>Cad</Dropdown.Item>
          </Dropdown> */}
            <Input
              lable="Where to buy tickets"
              placeholder="Write where can attendies buy tickets"
              multiline
              onChange={(value) => setDataField('ticketWhereToBuy')(value)}
              value={data.ticketWhereToBuy}
            />
          </Card.Body>
        </Card>
      )}

      {/* Buttons */}
      <Card className="mb-10">
        <Card.Button
          className="text-white bg-purple-700 hover:bg-purple-900"
          onClick={() => handleEventUpload()}
        >
          Finish event creation
        </Card.Button>
        <Card.Button className="border-2 border-gray-400 bg-white text-gray-500 hover:bg-gray-400 hover:text-white mt-6">
          Abandon
        </Card.Button>
      </Card>
    </div>
  )
}

export default CreateEventPage
