import { useState, useEffect, type ReactElement, type SetStateAction, FormEventHandler } from 'react'
import DefaultLayout from '@/layouts/default'
import Head from 'next/head'
import Header from '@/components/Header'
import axios from 'axios'
import { useRouter } from 'next/router'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import Image from 'next/image'

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
  const [classSeat, setClassSeat] = useState('Economy')
  const [isRoundTrip, setIsRoundTrip] = useState(false)
  const [tickets, setTickets] = useState([])
  const [favoriteDestination, setFavoriteDestination] = useState('')

  useEffect(() => {
    void checkLoggedIn()
    void fetchTickets()
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

  const checkLoggedIn = async (): Promise<void> => {
    try {
      const response = await axios.get('http://localhost:8000/api/v1/token', {
        withCredentials: true
      })
      sessionStorage.setItem('accessToken', response.data.accessToken)
      setIsLoggedIn(true)
    } catch (error) {
      console.error(error)
    }
  }

  const login = async (): Promise<void> => {
    try {
      const response = await axios.post('http://localhost:8000/api/v1/login', { identifier: '', password: '' }, {
        withCredentials: true
      })
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
      const response = await axios.get(`http://localhost:8000/api/v1/search?arrivalCity=${favoriteDestination}`, {
        withCredentials: true
      })
      setTickets(response.data.data.slice(0, 5))
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
    // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
    const month = date.getMonth() + 1
    return `${date.getFullYear()}-${month < 10 ? `0${month}` : month}-${date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()}`
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
        <main className='mx-auto'>
          <div>Banner</div>
          <div>
            <h2>Pilih Jadwal Penerbangan di Flynar</h2>
            <form onSubmit={(e) => { searchFlight(e) }}>
              <div>
                <div>
                  <label htmlFor='from'>From</label>
                  <select id='from' value={departureCity} onChange={e => { setDepartureCity(e.target.value) }}>
                    {Object.entries(cities).map((city, index) => (
                      <option key={index} value={city[1]}>{city[0]}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <button>Tukar Tempat</button>
                </div>
                <div>
                  <label htmlFor='to'>To</label>
                  <select id='to' value={arrivalCity} onChange={e => { setArrivalCity(e.target.value) }}>
                    {Object.entries(cities).map((city, index) => (
                      <option key={index} value={city[1]}>{city[0]}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <div>
                  <div>
                    <label htmlFor='date'>Date</label>
                  </div>
                  <div>
                    <label htmlFor='departureDate'>Departure</label>
                    <DatePicker
                      id='departureDate'
                      selected={departureDate}
                      onChange={(date: Date) => { setDepartureDate(date) }}
                    />
                  </div>
                  <div>
                    <label htmlFor='arrivalDate'>Return</label>
                    <DatePicker
                      id='arrivalDate'
                      selected={arrivalDate}
                      onChange={(date: Date) => { setArrivalDate(date) }}
                      disabled={!isRoundTrip}
                    />
                  </div>
                </div>
                <div>
                  <input type='checkbox' onChange={handleIsRoundTripChange}></input>
                </div>
                <div>
                  <div>
                    <div>
                      <label htmlFor='adult'>Adult</label>
                      <input type='number' id='adult' value={adult} onChange={(e) => { setAdult(parseInt(e.target.value)) }}/>
                    </div>
                    <div>
                      <label htmlFor='child'>Child</label>
                      <input type='number' id='child' value={child} onChange={(e) => { setChild(parseInt(e.target.value)) }}/>
                    </div>
                    <div>
                      <label htmlFor='baby'>Baby</label>
                      <input type='number' id='baby' value={baby} onChange={(e) => { setBaby(parseInt(e.target.value)) }}/>
                    </div>
                  </div>
                  <div>
                    <label htmlFor='classSeat'>Seat Class</label>
                    <select name='classSeat' id='classSeat' value={classSeat} onChange={e => { setClassSeat(e.target.value) }}>
                      <option value='Economy'>Economy</option>
                      <option value='Premium Economy'>Premium Economy</option>
                      <option value='Business'>Business</option>
                      <option value='First Class'>First Class</option>
                    </select>
                  </div>
                </div>
              </div>
              <div>
                <button type='submit'>Cari Penerbangan</button>
              </div>
            </form>
          </div>
          <div>
            <h2>Destinasi Favorit</h2>
            <div>
              <button onClick={() => { changeFavoriteDestination('') }} value={''}>Semua</button>
              {Object.entries(cities).map((city, index) => (
                <button onClick={() => { changeFavoriteDestination(city[1]) }} key={index} value={city[1]}>{city[0]}</button>
              ))}
            </div>
            <div>
              {
                tickets.map((ticket: any, index) => (
                  <div key={index}>
                    <Image src={`/images/destination/${ticket.flight.arrivalCity}.jpg`} width={200} height={200} loading='lazy' alt={ticket.flight.arrivalCity}/>
                    <div>
                      <span>{ticket.flight.departureCity}</span>
                      <span>{ticket.flight.arrivalCity}</span>
                    </div>
                    <p>{ticket.flight.departureDate}</p>
                    <p>{ticket.price}</p>
                  </div>
                ))
              }
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
