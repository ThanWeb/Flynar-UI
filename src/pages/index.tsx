import { useState, type ReactElement, useEffect, SetStateAction } from 'react'
import DefaultLayout from '@/layouts/default'
import axios from 'axios'
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarDays, faCouch, faMagnifyingGlass, faPlaneDeparture, faRetweet } from '@fortawesome/free-solid-svg-icons'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import CustomSelectSearch from '@/components/CustomSelectSearch'
import CustomSelectClass from '@/components/CustomSelectClass'
import CustomSelectPassenger from '@/components/CustomSelectPassenger'


const Home = (): ReactElement => {
  const [departureDate, setDepartureDate] = useState(new Date())
  const [returnDate, setReturnDate] = useState(new Date())

  const [isClicked, setIsClicked] = useState(false)

  const handleClickButtonReturn = () => {
    setIsClicked(!isClicked)
    if (returnDate === null) {
      setReturnDate(new Date())
    } else {
      setReturnDate(null)
    }
  }

  const [flightData, setFlightData] = useState([])
  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/v1/flights')
      const data = response.data.flights
      setFlightData(data)
      console.log(data)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    fetchData()
  }, [])

  type Flight = {
    id: number
    flightNumber: string
    departureCity: string
    arrivalCity: string
    airline: string
    price: number
    departureDate: string
    arrivalDate: string
    arrivalAirport: string
  }
  const cityButtons: string[] = ['Bandara Soekarno Hatta', 'Bandara Djuanda', 'Bandara Internasional Ngurah Rai']
  const [activeButton, setActiveButton] = useState<string | null>(null)
  const [filteredFlightData, setFilteredFlightData] = useState<Flight[]>([])
  const handleClickButton = (airport: string) => {
    setActiveButton(airport)
    const filteredData = flightData.filter((flight: Flight) => flight.arrivalAirport === airport)
    setFilteredFlightData(filteredData);
  }
  
  const [departureCity, setDepartureCity] = useState<string>('');
  const [arrivalCity, setArrivalCity] = useState<string>('');
  const handleDepartureCityChange = (city: string) => {
    setDepartureCity(city)
  }
  const handleArrivalCityChange = (city: string) => {
    setArrivalCity(city)
  }

  const handleSwapCities = () => {
    const tempCity = departureCity
    setDepartureCity(arrivalCity)
    setArrivalCity(tempCity)
  }

  const [passengerCounts, setPassengerCounts] = useState([0, 0, 0])
  const handlePassengerCountsChange = (counts: SetStateAction<number[]>) => {
    setPassengerCounts(counts)
  }

  const [selectedClass, setSelectedClass] = useState<string>('')
  const handleClassChange = (option: string) => {
    setSelectedClass(option)
  }
  return (
    <main>
      <div className='flex justify-center relative w-full'>
        <div className='w-4/5 absolute h-[232px] top-[32px] bg-no-repeat bg-right rounded-[20px]' style={{ backgroundImage: 'url("/Assets/bgRumahadat.png")' }}></div>
        <div className='flex items-center w-4/5 absolute h-[232px] top-[32px] rounded-[20px] bg-gradient-to-r from-[#FFF0DC] via-[#FFF8ED] to-transparent'>
          <p className='ml-5 font-bold text-3xl leading-9'>
            <i>Diskon Hari ini</i>
            <br />
            <span className='text-purple-700'>85%!</span>
          </p>
        </div>
        <div className='h-[150px] w-full bg-gradient-to-r from-[#A06ECE] to-[#D0B7E6] mt-[64px]'></div>
      </div>
      <div className='flex justify-center relative'>
        <div className='absolute w-[70%] '>
          <form action=''>
            <div className='container bg-white p-5 shadow-md rounded-t-lg'>
              <p className='font-bold text-2xl leading-9 mb-5'>
                Pilih Jadwal Penerbangan Spesial di 
                <span className='text-purple-700'> Flynar!</span>
              </p>
              <div className='flex justify-between'>
                <div className='flex items-center'>
                  <div className='flex items-center text-gray-400 mr-3 w-[65px]'>
                    <FontAwesomeIcon icon={faPlaneDeparture} className='mr-2 w-[20px]' />
                    <p className='font-normal text-sm leading-5'>From</p>
                  </div>
                  <div className='border-b-2 border-gray-400 w-[300px] py-3'>
                    <CustomSelectSearch selectedCity={departureCity} onSelectCity={handleDepartureCityChange} placeholder={'Pilih Lokasi'}/>
                  </div>
                </div>
                <div className=''>
                  <div onClick={handleSwapCities} className='flex items-center justify-center cursor-pointer bg-black rounded-md border-none h-8 w-8 m-5'>
                    <FontAwesomeIcon icon={faRetweet} className='text-white p-1 text-lg' />
                  </div>
                </div>
                <div className='flex items-center'>
                  <div className='flex items-center text-gray-400 mr-3 w-[65px]'>
                    <FontAwesomeIcon icon={faPlaneDeparture} className='mr-2 w-[20px]' />
                    <p className='font-normal text-sm leading-5'>To</p>
                  </div>
                  <div className='border-b-2 border-gray-400 w-[300px] py-3'>
                    <CustomSelectSearch selectedCity={arrivalCity} onSelectCity={handleArrivalCityChange} placeholder='Pilih Lokasi'/>
                  </div>
                </div>
              </div>
              <div className='flex justify-between mt-4'>
                <div className='flex items-center'>
                  <div className='flex items-center text-gray-400 mr-3 w-[65px]'>
                    <FontAwesomeIcon icon={faCalendarDays} className='me-2 text-lg w-[20px]'/>
                    <p className='font-normal text-sm leading-5'>Date</p>
                  </div>
                  <div className='flex justify-between w-[300px]'>
                    <div className='w-[49%] border-b-2 border-gray-400'>
                      <p className='text-gray-400 font-normal text-base leading-6'>Departure</p>
                      <DatePicker
                        className='border-0 bg-transparent focus:outline-none cursor-pointer w-[80%] py-3'
                        selected={departureDate}
                        onChange={(date) => setDepartureDate(date)}
                      />
                    </div>
                    <div className='w-[49%] border-b-2 border-gray-400'>
                      <div className='flex items-center justify-between'>
                        <p className='text-gray-400 font-normal text-base leading-6'>Return</p>
                        <div
                          className={`w-9 h-6 rounded-full relative cursor-pointer ${isClicked ? 'bg-slate-400' : 'bg-purple-700'}`}
                          onClick={handleClickButtonReturn}
                        >
                          <span
                            className={`block w-4 h-4 rounded-full bg-slate-300 absolute top-1/2 transform -translate-y-1/2  ${
                              isClicked ? 'left-1' : 'right-1'
                            }`}
                          ></span>
                        </div>
                      </div>
                      <DatePicker
                        className='border-0 bg-transparent focus:outline-none cursor-pointer w-[80%] py-3'
                        selected={returnDate}
                        onChange={(date) => setReturnDate(date)}
                        disabled={isClicked}
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <div className='flex items-center'>
                    <div className='inputanFlight flex text-gray-400 me-3' style={{ width: '65px' }}>
                      <FontAwesomeIcon icon={faCouch} className='me-2' style={{ fontSize: '20px', width: '20px' }} />
                      <p className='font-normal text-base leading-6'>To</p>
                    </div>
                    <div className='flex justify-between w-[300px]' style={{ width: '300px' }}>
                      <div className='w-[49%] border-b-2 border-gray-400'>
                        <p className='text-gray-400 font-normal text-base leading-6'>Passengers</p>
                        <div className='py-3'>
                          <CustomSelectPassenger value={passengerCounts} onChange={handlePassengerCountsChange}/>
                        </div>
                      </div>
                      <div className='w-[49%] border-b-2 border-gray-400'>
                        <p className='text-gray-400 font-normal text-base leading-6'>Seat Class</p>
                        <div className='py-3'>
                          <CustomSelectClass value={selectedClass} onChange={handleClassChange} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <button className='w-full px-4 py-2 text-white font-bold text-base leading-6 bg-purple-700 rounded-b-lg' type='submit'>
                Cari Penerbangan
              </button>
            </div>
          </form>
          <div className='mt-6'>
            <div className='container '>
            <p className='font-bold text-lg leading-6 mb-2'>Destinasi Favorit</p>
              {cityButtons.map((airport: string) => (
                <button
                  key={airport}
                  onClick={() => handleClickButton(airport)}
                  className={`mr-3 mb-3 px-3 py-2 shadow rounded-lg ${
                    activeButton === airport ? 'bg-purple-700 text-white' : 'bg-purple-40000 text-gray-600'
                  }`}
                >
                  <FontAwesomeIcon icon={faMagnifyingGlass} className='me-2'/>
                  {airport}
                </button>
              ))}
            </div>
            <div className='flex justify-center flex-wrap'>
              {filteredFlightData.map((flight: Flight) => (
                <div
                  key={flight.id}
                  className='p-2 mt-3 mr-7 mb-4 w-[170px] h-48 shadow-md'
                >
                  <div>
                    <img src='/assets/logoFlynarbaru.png' alt='' className='w-[150px] h-[100px]object-cover' />
                  </div>
                  <p className='mt-1 font-semibold text-xs'>{flight.departureCity} -{'>'} {flight.arrivalCity}</p>
                  <p className='font-bold text-xs text-purple-700'>{flight.airline}</p>
                  <p className='mb-1 font-normal text-xs'>{flight.departureDate} - {flight.arrivalDate}</p>
                  <p className='mt-1 font-bold text-xs text-center text-blue-700 bg-slate-200 p-1 rounded-md'>{flight.arrivalAirport}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

Home.getLayout = function getLayout (page: ReactElement) {
  return (
    <DefaultLayout>
      {page}
    </DefaultLayout>
  )
}

export default Home
