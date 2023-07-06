import { useState, useEffect } from 'react';
import type { ReactElement, SetStateAction } from 'react';
import DefaultLayout from '@/layouts/default'
import axios from 'axios'
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarDays, faCouch, faPlane, faPlaneDeparture, faRetweet } from '@fortawesome/free-solid-svg-icons'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import CustomSelectSearch from '@/components/CustomSelectSearch'
import CustomSelectClass from '@/components/CustomSelectClass'
import CustomSelectPassenger from '@/components/CustomSelectPassenger'
import Link from 'next/link'
import { useRouter } from 'next/router';

const Home = (): ReactElement => {
  const router = useRouter()

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
  const [passengerTotal, setPassengerTotal] = useState(0);
  const handlePassengerCountsChange = (counts: SetStateAction<number[]>) => {
    setPassengerCounts(counts)
    const total = counts.reduce((sum, count) => sum + count, 0);
    setPassengerTotal(total); // Update passengerTotal state
  }

  let passengerSum = 0;
  for (const count of Object.values(passengerCounts)) {
    passengerSum += count;
  }
  
  console.log(passengerSum);


  const [selectedClass, setSelectedClass] = useState<string>('')
  const handleClassChange = (option: string) => {
    setSelectedClass(option)
  }

  return (
    <main>
      <div className='flex justify-center relative w-full'>
        <div className='w-4/5 absolute h-[232px] top-[32px] bg-no-repeat bg-right rounded-[20px] hidden xl:block lg:block md:block sm:hidden' style={{ backgroundImage: 'url("/Assets/bgRumahadat.png")' }}></div>
        <div className='hidden items-center w-4/5 absolute h-[232px] top-[32px] rounded-[20px] bg-gradient-to-r from-[#FFF0DC] via-[#FFF8ED] to-transparent xl:flex lg:flex md:flex sm:hidden'>
          <p className='ml-5 font-bold text-3xl leading-9'>
            <i>Welcome to </i>
            <span className='text-purple-700'>Flynar</span>
          </p>
        </div>
        <div className='flex items-center h-[150px] w-full bg-gradient-to-r from-[#A06ECE] to-[#D0B7E6] mt-0 xl:mt-[64px] lg:mt-[64px] md:mt-[64px]'>
          <p className='block ml-5 font-bold text-xl leading-9 xl:hidden lg:hidden md:hidden sm:block sm:ml-[10%]'>
            <i>Welcome to </i>
            <span className='text-purple-800'>Flynar</span>
          </p>
        </div>
      </div>
      <div className='flex justify-center relative'>
        <div className='-top-[55px] absolute w-[90%] xl:top-0 xl:w-[70%] lg:top-0 lg:w-[70%] md:top-0 md:w-[70%] sm:-top-[45px] sm:w-[70%]'>
          <form action=''>
            <div className='container bg-white p-5 shadow-md rounded-t-lg'>
              <p className='text-sm font-bold leading-9 mb-5 xl:text-2xl lg:text-2xl md:text-xl sm:text-lg'>
                Pilih Jadwal Penerbangan Spesial di 
                <span className='text-purple-700'> Flynar!</span>
              </p>
              <div className='flex flex-col relative xl:flex-row xl:justify-between lg:relative lg:flex-col lg:items-center md:relative md:flex-col md:items-center sm:relative sm:flex-col sm:items-center'>
                <div className='flex items-center'>
                  <div className='flex items-center text-gray-400 mr-3 w-[65px]'>
                    <FontAwesomeIcon icon={faPlaneDeparture} className='mr-2 w-[20px]' />
                    <p className='font-normal text-sm leading-5'>From</p>
                  </div>
                  <div className='w-5/6 border-b-2 border-gray-400 py-3 xl:z-10 xl:w-[300px] lg:w-[600px] md:w-[400px] sm:w-[300px]'>
                    <CustomSelectSearch selectedCity={departureCity} onSelectCity={handleDepartureCityChange} placeholder={'Pilih Lokasi'}/>
                  </div>
                </div>
                <div className='w-full flex justify-end absolute top-1/2 transform -translate-y-1/2 xl:w-full xl:justify-center lg:absolute lg:top-1/2 lg:transform lg:-translate-y-1/2 lg:w-[700px] lg:flex lg:justify-end md:absolute md:top-1/2 md:transform md:-translate-y-1/2 md:w-[500px] md:flex md:justify-end sm:absolute sm:top-1/2 sm:transform sm:-translate-y-1/2 sm:w-[400px] sm:flex sm:justify-end'>
                  <div onClick={handleSwapCities} className='flex items-center justify-center cursor-pointer bg-black rounded-md border-none h-8 w-8'>
                    <FontAwesomeIcon icon={faRetweet} className='text-white p-1 text-lg' />
                  </div>
                </div>
                <div className='flex items-center'>
                  <div className='flex items-center text-gray-400 mr-3 w-[65px]'>
                    <FontAwesomeIcon icon={faPlaneDeparture} className='mr-2 w-[20px]' />
                    <p className='font-normal text-sm leading-5'>To</p>
                  </div>
                  <div className='w-5/6 border-b-2 border-gray-400 py-3 xl:z-10 xl:w-[300px] lg:w-[600px] md:w-[400px] sm:w-[300px]'>
                    <CustomSelectSearch selectedCity={arrivalCity} onSelectCity={handleArrivalCityChange} placeholder='Pilih Lokasi'/>
                  </div>
                </div>
              </div>
              <div className='flex flex-col mt-4 xl:justify-between xl:flex-row lg:items-center lg:flex-col md:items-center md:flex-col sm:items-center sm:flex-col'>
                <div className='flex items-center'>
                  <div className='flex items-center text-gray-400 mr-3 w-[65px]'>
                    <FontAwesomeIcon icon={faCalendarDays} className='me-2 text-lg w-[20px]'/>
                    <p className='font-normal text-sm leading-5'>Date</p>
                  </div>
                  <div className='flex flex-col w-5/6 xl:w-[300px] xl:justify-between xl:flex-row lg:w-[600px] lg:justify-between lg:flex-row md:w-[400px] md:justify-between md:flex-row sm:w-[300px] sm:items-center sm:flex-col'>
                    <div className='mb-2 border-b-2 border-gray-400 xl:w-[49%] lg:w-[49%] md:w-[49%] sm:w-[100%]'>
                      <p className='text-gray-400 font-normal text-base leading-6'>Departure</p>
                      <DatePicker
                        className='border-0 bg-transparent focus:outline-none cursor-pointer w-[80%] py-3'
                        selected={departureDate}
                        onChange={(date:Date) => setDepartureDate(date)}
                      />
                    </div>
                    <div className='mb-2 border-b-2 border-gray-400 xl:w-[49%] lg:w-[49%] md:w-[49%] sm:w-[100%]'>
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
                        onChange={(date:Date) => setReturnDate(date)}
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
                    <div className='flex flex-col w-5/6 xl:w-[300px] xl:justify-between xl:flex-row lg:w-[600px] lg:justify-between lg:flex-row md:w-[400px] md:justify-between md:flex-row sm:w-[300px] sm:items-center sm:flex-col'>
                      <div className='mb-2 border-b-2 border-gray-400 xl:w-[49%] lg:w-[49%] md:w-[49%] sm:w-[100%]'>
                        <p className='text-gray-400 font-normal text-base leading-6'>Passengers</p>
                        <div className='py-3'>
                          <CustomSelectPassenger value={passengerCounts} onChange={handlePassengerCountsChange}/>
                        </div>
                      </div>
                      <div className='mb-2 border-b-2 border-gray-400 xl:w-[49%] lg:w-[49%] md:w-[49%] sm:w-[100%]'>
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
              <Link href={`/searchFlight?departureCity=${departureCity}&arrivalCity=${arrivalCity}&passengerSum=${passengerSum}&selectedClass=${selectedClass}`}><button className='w-full px-4 py-2 text-white font-bold text-base leading-6 bg-purple-700 rounded-b-lg' type='submit'>
                Cari Penerbangan
              </button></Link>
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
                  <FontAwesomeIcon icon={faPlane} className='me-2'/>
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
                    <img src='/assets/logoFlynarbaruCrop.png' alt='' className='w-[150px] h-[100px]object-cover' />
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
