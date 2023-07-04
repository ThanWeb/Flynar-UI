'use client'

import { useState, useEffect, type ReactElement, type SetStateAction, FormEventHandler } from 'react'
import DefaultLayout from '@/layouts/default'
import Head from 'next/head'
import Header from '@/components/Header'
import axios from 'axios'
import { useRouter } from 'next/router'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { FiArrowLeft } from 'react-icons/fi'
import TicketItem from '@/components/TicketItem'

const Search = (): ReactElement => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const cities = { Jakarta: 'Jakarta', Medan: 'Medan', Makassar: 'Makassar', Surabaya: 'Surabaya', Denpasar: 'Denpasar' }
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const departureCity = searchParams.get('departureCity')
  const arrivalCity = searchParams.get('arrivalCity')
  const departureDate = searchParams.get('departureDate')
  const arrivalDate = searchParams.get('arrivalDate')
  let total: any = searchParams.get('total')
  total = parseInt(total)
  const classSeat = searchParams.get('classSeat')
  let isRoundTrip: any = searchParams.get('isRoundTrip')
  if (isRoundTrip === 'true') {
    isRoundTrip = true
  } else {
    isRoundTrip = false
  }
  // const [departureCity, setDepartureCity] = useState<SetStateAction<any>>('')
  // const [arrivalCity, setArrivalCity] = useState<SetStateAction<any>>('')
  // const [departureDate, setDepartureDate] = useState<SetStateAction<any>>('')
  // const [arrivalDate, setArrivalDate] = useState<SetStateAction<any>>('')
  // const [total, setTotal] = useState<SetStateAction<number>>(1)
  // const [classSeat, setClassSeat] = useState<SetStateAction<string>>('Economy')
  // const [isRoundTrip, setIsRoundTrip] = useState<SetStateAction<boolean>>(false)
  const [tickets, setTickets] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [ticketIds, setTicketIds] = useState('')

  useEffect(() => {
    void checkLoggedIn()
    void fetchTickets()
  }, [])

  useEffect(() => {
    if (ticketIds !== '') {
      const ticketIdsArray = ticketIds.split(',')
      if (isRoundTrip === true) {
        if (ticketIdsArray.length === 2) {
          void router.push(`/checkout?isRoundTrip=true&ticketIds=${ticketIds}`)
        }
      } else {
        if (ticketIdsArray.length === 1) {
          void router.push(`/checkout?isRoundTrip=false&ticketIds=${ticketIds}`)
        }
      }
    }
  }, [ticketIds])

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

  const fetchTickets = async (): Promise<void> => {
    try {
      // if (departureDate === '' && departureCity === '' && arrivalCity === '' && arrivalDate === '' && total === 0 && classSeat === '') {
      console.log(departureDate, departureCity, arrivalCity, arrivalDate, total, classSeat)
      const response = await axios.get(`http://localhost:8000/api/v1/search?departureCity=${departureCity}&arrivalCity=${arrivalCity}&classSeat=${classSeat}&total=${total.toString()}&departureDate=${departureDate}&arrivalDate=${arrivalDate}`, {
        withCredentials: true
      })
      setTickets(response.data.data)
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(error)
      } else {
        console.error(error)
      }
    } finally {
      setIsLoading(false)
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
      void router.push('/login')
      if (axios.isAxiosError(error)) {
        if (error.response?.data?.message !== undefined && error.response?.data?.message !== null) {
          console.log(error.response.data.message)
        }
      } else {
        console.error(error)
      }
    }
  }

  const chooseTickets = (ticketId: number): void => {
    if (ticketIds !== '') {
      const temp = ticketIds + ',' + ticketId.toString()
      setTicketIds(temp)
    } else {
      setTicketIds(ticketId.toString())
    }
  }

  return (
    <>
      <Head>
        <title>Search</title>
      </Head>
      <div id='search-page'>
        <Header isLoggedIn={isLoggedIn} login={login}/>
        <main className='mx-auto'>
          <div>
            <h2>Pilih Penerbangan</h2>
            <Link href={'/'} className='w-full flex items-center p-2 rounded-md text-base bg-purple-600 text-white font-medium'>
              <FiArrowLeft />
              {
                isRoundTrip === true && !isLoading
                  ? <span className='ml-3'>{departureCity} - {arrivalCity} | {arrivalCity} - {departureCity} - {total.toString()} Penumpang - {classSeat} </span>
                  : <span className='ml-3'>{departureCity} - {arrivalCity} - {total.toString()} Penumpang - {classSeat} </span>
              }
            </Link>
            <button>Ubah Pencarian</button>
          </div>
          <div>

          </div>
          <div>
            <p>
              {
                isLoading
                  ? 'Tunggu sebentar'
                  : tickets.length === 0
                    ? 'Maaf tidak ada hasil pencarian'
                    : `Total ${tickets.length} hasil pencarian`

              }
            </p>
            {
              tickets.map((ticket: any, index) => (
                <TicketItem key={index} data={ticket} chooseTickets={chooseTickets} />
              ))
            }
          </div>
        </main>
      </div>
    </>
  )
}

Search.getLayout = function getLayout (page: ReactElement) {
  return (
    <DefaultLayout>
      {page}
    </DefaultLayout>
  )
}

export default Search
