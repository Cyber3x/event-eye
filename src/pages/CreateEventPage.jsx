import dayjs from 'dayjs'
import React, { useState, useEffect, useRef } from 'react'
import DatePicker, { registerLocale } from 'react-datepicker'
import { storage, firestore } from '../firebase'
import { useAuth } from '../contexts/AuthContext'
import enGb from 'date-fns/locale/en-GB'
import hrHr from 'date-fns/locale/hr'
registerLocale('hr', hrHr)
import { useHistory } from 'react-router-dom'
import { useEventsStore } from '../stores/EventsStore'

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
  const history = useHistory()
  const clearEvents = useEventsStore((state) => state.clearEvents)
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
    ticketNeeded: false,
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
      newEvent = { ...newEvent, id: docRef.id }
      clearEvents()
      console.log(newEvent)
      history.push('/')
    } catch (error) {
      console.error('[ERROR, UPLOAD EVENT]:', error)
    }
  }

  return (
    <div className="w-1/2 mx-auto">
      <h1 className="my-10 text-3xl font-bold text-gray-400 font-opensans">
        Izradi događaj
      </h1>
      {/* {JSON.stringify(data, null, 2)} */}
      {/* Basic info */}
      <Card>
        <Card.Header
          letter="O"
          title="Osnovne informacije"
          bg="from-red-600 to-yellow-400"
          description="Daj naziv, vrijeme i mjesto svome događaju da bi ga ljudi mogli lakše pronaći."
        />
        <Card.Body>
          <Input
            lable="Naziv"
            placeholder="Kratko, prepoznatljivo i pamtljivo"
            onChange={(value) => setDataField('name')(value)}
            value={data.name}
          />
          <Input
            lable="Lokacija"
            placeholder="Pretraži lokacije"
            onChange={(value) => setDataField('location')(value)}
            value={data.location}
          />
          <p className="mt-4 text-sm font-bold text-gray-600 font-opensans">
            Datum i vrijeme početka
          </p>
          <div className="w-full">
            <DatePicker
              dateFormat="dd. / MM. / yyyy. - HH:mm"
              timeFormat="HH:mm"
              selected={data.startDateTime}
              onChange={setDataField('startDateTime')}
              timeCaption="Vrijeme početka"
              showTimeSelect
              timeIntervals={15}
              minDate={dayjs().$d}
              minTime={data.minStartTime}
              maxTime={dayjs().endOf('date').$d}
              customInput={<DatePickerButton />}
              shouldCloseOnSelect={false}
              showPopperArrow={false}
              locale="hr"
            />
          </div>
          <p className="mt-4 font-bold text-gray-600 font-opensans text-md">
            Datum i vrijeme kraja
          </p>
          <DatePicker
            dateFormat="dd. / MM. / yyyy. - HH:mm"
            timeFormat="HH:mm"
            selected={data.endDateTime}
            onChange={setDataField('endDateTime')}
            timeCaption="Vrijeme kraja"
            showTimeSelect
            timeIntervals={15}
            minDate={data.startDateTime}
            minTime={data.minEndTime}
            maxTime={dayjs().endOf('date').$d}
            customInput={<DatePickerButton />}
            shouldCloseOnSelect={false}
            showPopperArrow={false}
            locale="hr"
          />
        </Card.Body>
      </Card>

      {/* More info */}
      <Card>
        <Card.Header
          letter="V"
          bg="from-blue-900 to-green-400"
          title="Više informacija"
          description="Dodaj opis da ljudi znaju zašto bi baš trebali doći na tvoj događaj."
        />
        <Card.Body>
          <Input
            multiline
            lable="Opis"
            placeholder="Ukratko opiši što se događa i kako će to izgledati"
            onChange={(value) => setDataField('description')(value)}
            value={data.description}
          />
          <Input
            lable="Kratki opis"
            placeholder="Kratak, pamtljiv, jednostavan"
            onChange={(value) => setDataField('shortDescription')(value)}
            value={data.shortDescription}
          />
          <p className="mb-2 mt-4 text-sm font-bold text-gray-600 font-opensans">
            Je li događaj besplatan?
          </p>
          <div className="w-full text-xs font-semibold text-purple-700 placeholder-gray-400 border-2 border-gray-300 outline-none rounded-xl font-opensans flex overflow-hidden">
            <div
              className={
                'flex-1 text-center p-4 ' +
                (data.ticketNeeded ? '' : ' bg-purple-700 text-white')
              }
              onClick={() => setDataField('ticketNeeded')(false)}
            >
              Da, događaj je besplatan
            </div>
            <div
              className={
                'flex-1 text-center p-4 ' +
                (data.ticketNeeded ? ' bg-purple-700 text-white' : '')
              }
              onClick={() => setDataField('ticketNeeded')(true)}
            >
              Ne, karte su potrebne
            </div>
          </div>
        </Card.Body>
      </Card>

      {/* Upload image */}
      <Card>
        <Card.Header
          letter="U"
          title="Učitaj fotografiju"
          description="Dodaj fotografiju vezanu uz svoj dogaaj kako bi lakše ulovila oko potencijalnih posjetitelja."
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
                    Povuci i baci fotografiju
                  </p>
                  <p className="text-xs text-gray-500 mt-1 font-roboto">
                    Ili{' '}
                    <span
                      className="text-purple-700 font-semibold cursor-pointer"
                      onClick={() => imageInput.current.click()}
                    >
                      izaberi
                    </span>{' '}
                    fotografiju s računala.
                  </p>
                  <p className="text-sm text-gray-400 w-5/6 mx-auto mt-4 font-opensans">
                    Ovo je prva slika koju će tvoji posjetitelji vidjeti na vrhu
                    stranice tvojeg događaja. Koristi fotografiju visoke
                    rezulucije. Preporučamo: 2160x1080px (2:1 omjer)
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
              Učitaj
            </Card.Button>
          )}
          {showSuccesfulUpload && (
            <Card.Button className="mt-4 bg-green-700 text-white text-sm cursor-default">
              Fotografija uspješno učitana
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
            letter="K"
            title="Informacije o kratama"
            description="Dodaj informacije gdje i kako se mogu kupiti karte."
            bg="from-green-900 to-green-300"
          />

          <Card.Body>
            <Input
              lable="Cijena"
              placeholder="Cijena karte"
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
              lable="Gdje kupiti"
              placeholder="Napiši gdje se mogu kupiti krate"
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
          Završi izradu događaja
        </Card.Button>
        <Card.Button className="border-2 border-gray-400 bg-white text-gray-500 hover:bg-gray-400 hover:text-white mt-6">
          Napusti
        </Card.Button>
      </Card>
    </div>
  )
}

export default CreateEventPage
