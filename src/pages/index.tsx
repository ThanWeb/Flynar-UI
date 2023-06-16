import { useEffect, useState } from 'react'
import axios from 'axios'
import type { ReactElement } from 'react'
import { createPortal } from 'react-dom';
import DefaultLayout from '@/layouts/default'
import Image from 'next/image'
import SearchPortal from '../components/SearchPortal';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlaneDeparture, faRetweet, faMagnifyingGlass, faCalendarDays, faCouch } from '@fortawesome/free-solid-svg-icons'

import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

import styles from '../styles/homePage.module.css'
import 'bootstrap/dist/css/bootstrap.css'

const Home = (): React.ReactElement => {
  // type Flight = {
  //   id: number
  //   flightNumber: string
  //   departureCity: string
  //   arrivalCity: string
  //   airline: string
  //   economyPrice: number
  //   departureDate: string
  //   arrivalDate: string
  // }

  // const [flightData, setFlightData] = useState([])

  // const fetchData = async () => {
  //   const response = await axios.get("http://localhost:8000/api/v1/flights")
  //   setFlightData(response.data)
  // }
  // useEffect(()=>{
  //   fetchData()
  // },[])

  const [departureDate, setDepartureDate] = useState(new Date());
  const [returnDate, setReturnDate] = useState(new Date());

  return (
    <main>
      <div className='d-flex justify-content-center position-relative'>
        <div className='container position-absolute w-100' style={{ height: '232px', top: '32px', backgroundImage: 'url("/Assets/bgRumahadat.png")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right', borderRadius: '20px' }}></div>
        <div className='container position-absolute w-100 d-flex align-items-center' style={{ height: '232px', top: '32px', borderRadius: '20px', backgroundImage: 'linear-gradient(to right, #FFF0DC, #FFF8ED, rgba(255, 233, 202, 0)' }}>
          <p className='ms-5' style={{ fontWeight: '800', fontSize: '36px', lineHeight: '54px' }}>
            <i>Diskon Hari ini</i>
            <br />
            <span style={{ color: '#7126B5' }}>85%!</span>
          </p>
        </div>
      </div>
      <div style={{ height: '150px', width: '100%', background: 'linear-gradient(to right, #A06ECE, #D0B7E6)', marginTop: '64px' }} ></div>
      <div className='d-flex justify-content-center position-relative'>
        <div className='position-absolute' style={{ width: '70%' }}>
          <form action=''>
            <div className='container bg-white p-5' style={{ boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.15)', borderRadius: '12px 12px 0 0' }}>
              <p className='' style={{ fontWeight: '700', fontSize: '20px', lineHeight: '30px' }} >Pilih Jadwal Penerbangan Spesial di <span style={{ color: '#7126B5' }} >Tiketku!</span></p>
              <div className='d-flex justify-content-between'>
                <div className='d-flex align-items-center'>
                  <div className='inputanFlight d-flex text-black-50 me-3' style={{ width: '65px' }}>
                    <FontAwesomeIcon icon={faPlaneDeparture} className='me-2' style={{ width: '20px' }}/>
                    <p style={{ fontWeight: '400', fontSize: '14px', lineHeight: '20px' }}>From</p>
                  </div>
                  <div className='inputanFlight' style={{ width: '300px', height: '40px', borderBottom: '2px solid #D0D0D0' }}>
                    <SearchPortal />
                  </div>
                </div>
                <button className='bg-black rounded-3' style={{ border: 'none', backgroundColor: 'transparent', height: '30px', width: '33px' }}>
                  <FontAwesomeIcon icon={faRetweet} className='text-white p-1 h5'/>
                </button>
                <div className='d-flex align-items-center'>
                  <div className='d-flex text-black-50 me-3' style={{ width: '65px' }}>
                    <FontAwesomeIcon icon={faPlaneDeparture} className='me-2' style={{ width: '20px' }}/>
                    <p style={{ fontWeight: '400', fontSize: '14px', lineHeight: '20px' }}>To</p>
                  </div>
                  <div style={{ width: '300px', height: '40px', borderBottom: '2px solid #D0D0D0' }}>
                    <input placeholder='Pilih Lokasi' type='text' className={`border-0 w-100 ${styles.placeholder}`} style={{ fontWeight: '500', fontSize: '18px', lineHeight: '26px', outline: 'none' }}/>
                  </div>
                </div>
              </div>
              <div className='d-flex align-items-center justify-content-between mt-5'>
                <div className='d-flex align-items-center'>
                  <div className='inputanFlight d-flex text-black-50 me-3' style={{ width: '65px' }}>
                    <FontAwesomeIcon icon={faCalendarDays} className='me-2' style={{ fontSize: '20px', width: '20px' }}/>
                    <p style={{ fontWeight: '400', fontSize: '14px', lineHeight: '20px' }}>Date</p>
                  </div>
                  <div className='d-flex justify-content-between' style={{ width: '300px' }}>
                    <div className='inputanFlight' style={{ width: '140px', borderBottom: '2px solid #D0D0D0' }}>
                      <p className='text-black-50' style={{ fontWeight: '400', fontSize: '16px', lineHeight: '24px' }}>Departure</p>
                      <DatePicker
                        className={`border-0 bg-transparent ${styles.datePicker}`}
                        selected={departureDate}
                        onChange={(date) => setDepartureDate(date)}
                        withPortal
                      />
                    </div>
                    <div className='inputanFlight' style={{ width: '140px', borderBottom: '2px solid #D0D0D0' }}>
                      <p className='text-black-50' style={{ fontWeight: '400', fontSize: '16px', lineHeight: '24px' }}>Return</p>
                      <DatePicker
                        className={`border-0 bg-transparent ${styles.datePicker}`}
                        selected={returnDate}
                        onChange={(date) => setReturnDate(date)}
                        withPortal
                      />
                    </div>
                  </div>
                </div>
                <div className='d-flex align-items-center'>
                  <div className='inputanFlight d-flex text-black-50 me-3' style={{ width: '65px' }}>
                    <FontAwesomeIcon icon={faCouch} className='me-2' style={{ fontSize: '20px', width: '20px' }}/>
                    <p style={{ fontWeight: '400', fontSize: '14px', lineHeight: '20px' }}>To</p>
                  </div>
                  <div className='d-flex justify-content-between' style={{ width: '300px' }}>
                    <div className='inputanFlight' style={{ width: '140px', borderBottom: '2px solid #D0D0D0' }}>
                      <p className='text-black-50' style={{ fontWeight: '400', fontSize: '16px', lineHeight: '24px' }}>Passengers</p>
                      <p style={{ fontWeight: '500', fontSize: '16px', lineHeight: '24px', color: '#7126B5', cursor: 'pointer' }}>Kategori</p>
                    </div>
                    <div className='inputanFlight' style={{ width: '140px', borderBottom: '2px solid #D0D0D0' }}>
                      <p className='text-black-50' style={{ fontWeight: '400', fontSize: '16px', lineHeight: '24px' }}>Seat Class</p>
                      <p style={{ fontWeight: '500', fontSize: '16px', lineHeight: '24px', color: '#7126B5', cursor: 'pointer' }}>Pilih Kelas</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <button className='w-100 p-2 text-white' type='submit' style={{ fontWeight: '700', fontSize: '16px', lineHeight: '24px', border: 'none', backgroundColor: '#7126B5', borderRadius: '0 0 12px 12px' }}>Cari Penerbangan</button>
            </div>
          </form>
          <div className='mt-3'>
            <p style={{ fontWeight: '700', fontSize: '16px', lineHeight: '24px' }}>Destinasi Favorit</p>
            <div className='d-flex justify-content-start flex-wrap'>
              <button className='border-0 text-white p-2 px-3 me-3 mb-3' style={{ backgroundColor: '#7126B5', borderRadius: '12px' }}>
                <FontAwesomeIcon icon={faMagnifyingGlass}/> Semua
              </button>
              <button className='border-0 text-black-50 p-2 px-3 me-4 mb-3' style={{ backgroundColor: '#E2D4F0', borderRadius: '12px' }}>
                <FontAwesomeIcon icon={faMagnifyingGlass}/> Asia
              </button>
              <button className='border-0 text-black-50 p-2 px-3 me-4 mb-3' style={{ backgroundColor: '#E2D4F0', borderRadius: '12px' }}>
                <FontAwesomeIcon icon={faMagnifyingGlass}/> Amerika
              </button>
              <button className='border-0 text-black-50 p-2 px-3 me-4 mb-3' style={{ backgroundColor: '#E2D4F0', borderRadius: '12px' }}>
                <FontAwesomeIcon icon={faMagnifyingGlass}/> Australia
              </button>
              <button className='border-0 text-black-50 p-2 px-3 me-4 mb-3' style={{ backgroundColor: '#E2D4F0', borderRadius: '12px' }}>
                <FontAwesomeIcon icon={faMagnifyingGlass}/> Eropa
              </button>
              <button className='border-0 text-black-50 p-2 px-3 me-4 mb-3' style={{ backgroundColor: '#E2D4F0', borderRadius: '12px' }}>
                <FontAwesomeIcon icon={faMagnifyingGlass}/> Afrika
              </button>
            </div>
            <div className='d-flex flex-wrap'>
            {/* {flightData.map((flight : Flight) => (
              <div
                key={flight.id}
                className='p-2 img-fluid mt-3 me-2'
                style={{ width: '166px', height: '194px', boxShadow: '0px 0px 4px rgba(0, 0, 0, 0.15)' }}
              >
                <div>
                  <Image src='/assets/bangkok.png' width={150} height={100} alt='' className='img-fluid' />
                </div>
                <p className='mb-1' style={{ fontWeight: '500', fontSize: '12px' }}>{flight.departureCity} {'->'} {flight.arrivalCity}</p>
                <p className='mb-1' style={{ fontWeight: '700', fontSize: '10px', color: '#7126B5' }}>{flight.airline}</p>
                <p className='mb-1' style={{ fontWeight: '500', fontSize: '10px' }}>{flight.departureDate} - {flight.arrivalDate}</p>
                <p className='mb-1' style={{ fontWeight: '400', fontSize: '12px' }}>Mulai dari <span className='fw-bold text-danger'>IDR {flight.economyPrice}</span></p>
              </div>
            ))} */}
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
