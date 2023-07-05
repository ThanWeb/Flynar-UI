import { useState, useEffect, type ReactElement, type SetStateAction, FormEventHandler } from 'react'
import DefaultLayout from '@/layouts/default'
import Head from 'next/head'
import Header from '@/components/Header'
import axios from 'axios'
import { useRouter } from 'next/router'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import Image from 'next/image'
import { faCalendarDays, faCouch, faPlaneDeparture, faRetweet, faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import checkLoggedIn from '@/utils/checkLoggedIn'

const Home = (): ReactElement => {
  const router = useRouter()
  const cities = { Jakarta: 'Jakarta', Medan: 'Medan', Makassar: 'Makassar', Surabaya: 'Surabaya', Denpasar: 'Denpasar' }
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [departureCity, setDepartureCity] = useState(cities.Jakarta)
  const [arrivalCity, setArrivalCity] = useState(cities.Denpasar)
  const [departureDate, setDepartureDate] = useState<SetStateAction<any>>(new Date())
  const [arrivalDate, setArrivalDate] = useState<SetStateAction<any>>(new Date())
  const [adult, setAdult] = useState(1)
  const [child, setChild] = useState(0)
  const [baby, setBaby] = useState(0)
  const [showPassenger, setShowPassenger] = useState(false)
  const [totalPassenger, setTotalPassenger] = useState(1)
  const [classSeat, setClassSeat] = useState('Economy')
  const [isRoundTrip, setIsRoundTrip] = useState(false)
  const [tickets, setTickets] = useState([])
  const [favoriteDestination, setFavoriteDestination] = useState('')

  useEffect(() => {
    void fetchTickets()
  }, [])

  useEffect(() => {
    const status = checkLoggedIn()
    setIsLoggedIn(status)
  }, [])

  useEffect(() => {
    if (arrivalDate <= departureDate && isRoundTrip) {
      setArrivalDate(departureDate)
    }
  }, [departureDate])

  useEffect(() => {
    if (arrivalDate < departureDate && isRoundTrip) {
      setDepartureDate(arrivalDate)
    }
  }, [arrivalDate])

  useEffect(() => {
    void fetchTickets()
  }, [favoriteDestination])

  useEffect(() => {
    if (!isRoundTrip) {
      setArrivalDate('')
    } else {
      if (arrivalDate === '') {
        setArrivalDate(departureDate)
      }
    }
  }, [isRoundTrip])

  const login = async (): Promise<void> => {
    try {
      const response = await axios.post(`${process.env.REST_API_ENDPOINT}login`, { identifier: '', password: '' })
      sessionStorage.setItem('accessToken', response.data.accessToken)
      setIsLoggedIn(true)
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.data?.message !== undefined && error.response?.data?.message !== null) {
          if (error.response.data.message === 'Sesi Login Expired, Silahkan Login Ulang') {
            void router.push('/login')
          }
        }
      } else {
        console.error(error)
      }
    }
  }

  const handleIsRoundTripChange = (): void => {
    setIsRoundTrip(!isRoundTrip)
  }

  const fetchTickets = async (): Promise<void> => {
    try {
      const response = await axios.get(`${process.env.REST_API_ENDPOINT}search?arrivalCity=${favoriteDestination}`)
      setTickets(response.data.data.slice(0, 4))
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(error)
      } else {
        console.error(error)
      }
    }
  }

  const changeFavoriteDestination = (value: string): void => {
    setFavoriteDestination(value)
  }

  const formatDate = (date: any = ''): string => {
    if (date === '') {
      return ''
    }
    return `${date.getFullYear()}-${date.getMonth() < 10 ? `0${date.getMonth()}` : date.getMonth()}-${date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()}`
  }

  const searchFlight = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    const total = adult + child + baby
    void router.push(`/search?departureCity=${departureCity}&arrivalCity=${arrivalCity}&classSeat=${classSeat}&total=${total}&departureDate=${formatDate(departureDate)}&arrivalDate=${formatDate(arrivalDate)}&isRoundTrip=${isRoundTrip}`)
  }

  return (
    <>
      <Head>
        <title>Flynar</title>
      </Head>
      <div id='home-page'>
        <Header isLoggedIn={isLoggedIn} login={login}/>
        <main className=''>
          <div>
            <div className='flex justify-center relative w-full'>
              <div className='w-4/5 absolute h-[232px] top-[32px] bg-no-repeat bg-right rounded-[20px] hidden xl:block lg:block md:block sm:hidden' style={{ backgroundImage: 'url("/images/bgRumahadat.png")' }}></div>
              <div className='hidden items-center w-4/5 absolute h-[232px] top-[32px] rounded-[20px] bg-gradient-to-r from-[#FFF0DC] via-[#FFF8ED] to-transparent xl:flex lg:flex md:flex sm:hidden'>
                <p className='ml-5 font-bold text-3xl leading-9'>
                  <i>Welcome to </i>
                  <span className='text-blue-700'>Flynar</span>
                </p>
              </div>
              <div className='flex items-center h-[150px] w-full bg-gradient-to-r from-blue-400 to-blue-300 mt-0 xl:mt-[64px] lg:mt-[64px] md:mt-[64px]'>
                <p className='block ml-5 font-bold text-xl leading-9 xl:hidden lg:hidden md:hidden sm:block sm:ml-[10%]'>
                  <i>Welcome to </i>
                  <span className='text-slate-100'>Flynar</span>
                </p>
              </div>
            </div>
            <div className='flex justify-center relative'>
              <div className='-top-[55px] absolute w-[90%] xl:top-0 xl:w-[70%] lg:top-0 lg:w-[70%] md:top-0 md:w-[70%] sm:-top-[45px] sm:w-[70%]'>
                <form onSubmit={(e) => { searchFlight(e) }} action=''>
                  <div className='container bg-white p-5 shadow-md rounded-t-lg'>
                    <p className='text-xs font-bold leading-9 mb-5 xl:text-2xl lg:text-xl md:text-lg sm:text-sm'>
                      Pilih Jadwal Penerbangan Spesial di
                      <span className='text-blue-700'> Flynar!</span>
                    </p>
                    <div className='flex flex-col relative xl:flex-row xl:justify-between lg:relative lg:flex-col lg:items-center md:relative md:flex-col md:items-center sm:relative sm:flex-col sm:items-center'>
                      <div className='flex items-center'>
                        <div className='flex items-center text-gray-400 mr-3 w-[65px]'>
                          <FontAwesomeIcon icon={faPlaneDeparture} className='mr-2 w-[20px]' />
                          <label htmlFor='from' className='font-normal text-sm leading-5'>From</label>
                        </div>
                        <div className='w-5/6 border-b-2 border-gray-400 py-3 xl:w-[300px] xl:z-10 lg:w-[600px] md:w-[400px] sm:w-[300px]'>
                          <select className='focus:outline-none' id='from' value={departureCity} onChange={e => { setDepartureCity(e.target.value) }}>
                            {Object.entries(cities).map((city, index) => (
                              <option className='text-base' key={index} value={city[1]}>{city[0]}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div className='w-full flex justify-end absolute top-1/2 transform -translate-y-1/2 xl:w-full xl:justify-center lg:absolute lg:top-1/2 lg:transform lg:-translate-y-1/2 lg:w-[700px] lg:flex lg:justify-end md:absolute md:top-1/2 md:transform md:-translate-y-1/2 md:w-[500px] md:flex md:justify-end sm:absolute sm:top-1/2 sm:transform sm:-translate-y-1/2 sm:w-[400px] sm:flex sm:justify-end'>
                        <div onClick={handleSwapCities} className='flex items-center justify-center cursor-pointer bg-blue-700 rounded-md border-none w-6 h-6 md:h-7 md:w-7 lg:h-8 lg:w-8'>
                          <FontAwesomeIcon icon={faRetweet} className='text-white p-1 w-6 md:w-7 lg:w-8' />
                        </div>
                      </div>
                      <div className='flex items-center'>
                        <div className='flex items-center text-gray-400 mr-3 w-[65px]'>
                          <FontAwesomeIcon icon={faPlaneDeparture} className='mr-2 w-[20px]' />
                          <label htmlFor='to' className='font-normal text-sm leading-5'>To</label>
                        </div>
                        <div className='w-5/6 border-b-2 border-gray-400 py-3 xl:w-[300px] xl:z-10 lg:w-[600px] md:w-[400px] sm:w-[300px]'>
                          <select className='focus:outline-none' id='to' value={arrivalCity} onChange={e => { setArrivalCity(e.target.value) }}>
                            {Object.entries(cities).map((city, index) => (
                              <option className='text-base' key={index} value={city[1]}>{city[0]}</option>
                            ))}
                          </select>
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
                          <div className='mb-2 border-b-2 border-gray-400 xl:w-[49%] xl:z-10 lg:w-[49%] md:w-[49%] sm:w-[100%]'>
                            <div>
                              <label htmlFor='departureDate' className='text-gray-400 font-normal text-base leading-6'>Departure</label>
                            </div>
                            <DatePicker
                              id='departureDate'
                              className='border-0 bg-transparent focus:outline-none cursor-pointer w-[80%] py-3'
                              selected={departureDate}
                              onChange={(date: Date) => { setDepartureDate(date) }}
                            />
                          </div>
                          <div className='mb-2 border-b-2 border-gray-400 xl:w-[49%] xl:z-10 lg:w-[49%] md:w-[49%] sm:w-[100%]'>
                            <div className='flex items center'>
                              <label htmlFor='arrivalDate' className='mr-2 text-gray-400 font-normal text-base leading-6'>Return</label>
                              <input type='checkbox' onChange={handleIsRoundTripChange}></input>
                            </div>
                            <DatePicker
                              id='arrivalDate'
                              className='border-0 bg-transparent focus:outline-none cursor-pointer w-[80%] py-3'
                              selected={arrivalDate}
                              onChange={(date: Date) => { setArrivalDate(date) }}
                              disabled={!isRoundTrip}
                            />
                          </div>
                        </div>
                      </div>
                      <div>
                        <div className='flex items-center'>
                          <div className='inputanFlight w-[65px] flex text-gray-400 me-3'>
                            <FontAwesomeIcon icon={faCouch} className='mr-2 w-[20px]' />
                            <label htmlFor='to' className='font-normal text-sm leading-5'>To</label>
                          </div>
                          <div className='flex flex-col w-5/6 xl:w-[300px] xl:justify-between xl:flex-row lg:w-[600px] lg:justify-between lg:flex-row md:w-[400px] md:justify-between md:flex-row sm:w-[300px] sm:items-center sm:flex-col'>
                            <div className='mb-2 border-b-2 border-gray-400 xl:w-[49%] lg:w-[49%] md:w-[49%] sm:w-[100%]'>
                              <p className='text-gray-400 font-normal text-base leading-6'>Passengers</p>
                              <div className='py-3 relative'>
                                <span onClick={togglePassenger} className='cursor-pointer'>{totalPassenger} Penumpang</span>
                                {showPassenger && (
                                  <div className='bg-white rounded-md shadow-md absolute w-full'>
                                    <div className='relative'>
                                      <div className='w-fit px-0.5 rounded-full bg-slate-300 hover:bg-slate-200 absolute -top-2 -right-2'>
                                        <FontAwesomeIcon icon={faTimes} className='cursor-pointer w-3 text-semibold text-red-600 hover:text-red-800' onClick={handleClosePassenger} />
                                      </div>
                                    </div>
                                    <div className='w-full flex justify-between p-2'>
                                      <label htmlFor='adult'>Adult</label>
                                      <input className='w-[45px] pl-2 border-2 border-gray-300 rounded-lg' type='number' id='adult' value={adult} onChange={(e) => { setAdult(parseInt(e.target.value)) }}/>
                                    </div>
                                    <div className='w-full flex justify-between p-2'>
                                      <label htmlFor='child'>Child</label>
                                      <input className='w-[45px] pl-2 border-2 border-gray-300 rounded-lg' type='number' id='child' value={child} onChange={(e) => { setChild(parseInt(e.target.value)) }}/>
                                    </div>
                                    <div className='w-full flex justify-between p-2'>
                                      <label htmlFor='baby'>Baby</label>
                                      <input className='w-[45px] pl-2 border-2 border-gray-300 rounded-lg' type='number' id='baby' value={baby} onChange={(e) => { setBaby(parseInt(e.target.value)) }}/>
                                    </div>
                                    <div className='flex justify-end'>
                                      <button className='p-1 m-1 text-sm text-white bg-blue-700 rounded-lg' onClick={handleSave}>
                                          simpan
                                      </button>
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                            <div className='mb-2 border-b-2 border-gray-400 xl:w-[49%] lg:w-[49%] md:w-[49%] sm:w-[100%]'>
                              <label htmlFor='classSeat' className='text-gray-400 font-normal text-base leading-6'>Seat Class</label>
                              <div className='py-3'>
                                <select className='w-[103px] focus:outline-none' name='classSeat' id='classSeat' value={classSeat} onChange={e => { setClassSeat(e.target.value) }}>
                                  <option value='Economy'>Economy</option>
                                  <option value='Premium Economy'>Premium Economy</option>
                                  <option value='Business'>Business</option>
                                  <option value='First Class'>First Class</option>
                                </select>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <button type='submit' className='w-full px-4 py-2 text-white font-bold text-base leading-6 bg-purple-700 rounded-b-lg'>
                      Cari Penerbangan
                    </button>
                  </div>
                </form>
                <div className='mt-6'>
                  <div className=''>
                    <p className='font-bold text-lg leading-6 mb-2'>Destinasi Favorit</p>
                    <div>
                      <button className='text-sm lg:text-base mr-3 mb-3 px-2 lg:px-3 py-1 lg:py-2 shadow rounded-lg bg-blue-200 text-gray-500' onClick={() => { changeFavoriteDestination('') }} value={''}>Semua</button>
                      {Object.entries(cities).map((city, index) => (
                        <button className='text-sm lg:text-base mr-3 mb-3 px-2 lg:px-3 py-1 lg:py-2 shadow rounded-lg bg-blue-200 text-gray-500' onClick={() => { changeFavoriteDestination(city[1]) }} key={index} value={city[1]}>{city[0]}</button>
                      ))}
                    </div>
                    <div className='mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 justify-start gap-6'>
                      {
                        tickets.map((ticket: any, index) => (
                          <div key={index} className='card p-2 h-fit shadow-sm w-full border-2 rounded-md'>
                            <Image src={`/images/destination/${ticket.flight.arrivalCity}.jpg`} width={200} height={200} loading='lazy' alt={ticket.flight.arrivalCity} className='w-full rounded-lg'/>
                            <div className='text-sm font-semibold'>
                              <span>{ticket.flight.departureCity} {' '}</span>
                              <span>{'-> '}</span>
                              <span>{ticket.flight.arrivalCity}</span>
                            </div>
                            <p className='text-sm font-semibold'>{ticket.flight.departureDate}</p>
                            <p className='font-semibold text-sm text-red-700'>IDR {ticket.price}</p>
                          </div>
                        ))
                      }
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
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
