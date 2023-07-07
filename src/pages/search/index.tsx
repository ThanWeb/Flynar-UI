import type { ReactElement } from 'react'
import { useEffect, useState, Fragment } from 'react'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faDollarSign, faArrowLeft, faArrowUp, faArrowDown, faCube, faCubes, faChevronRight, faChevronDown, faGlobe, faClock } from '@fortawesome/free-solid-svg-icons'
import Image from 'next/image'
import Header from '../../components/Header'
import axios from 'axios'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'
import DefaultLayout from '@/layouts/default'
import checkLoggedIn from '@/utils/checkLoggedIn'
import { Accordion, Button, Modal } from 'flowbite-react'
// import type {   Accordion,  AccordionButton, AccordionPanel, AccordionHeader, AccordionBodyAccordionOptions, AccordionItem, AccordionInterface } from 'flowbite'

// const Accordion = dynamic(() => import('flowbite').then((module) => module.Accordion), {
//   ssr: false,
// })


const SearchFlight = (): ReactElement => {
  const [openModal, setOpenModal] = useState<string | undefined>()
  const props = { openModal, setOpenModal }

  const router = useRouter()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const { departureCity, arrivalCity, selectedClass, passengerSum, classSeat } = router.query

  const [filterParameter, setFilterParameter] = useState('Harga - Termurah')
  const [searchFlightTickets, setSearchFlightTickets] = useState([])

  const onOptionChange = e => {
    setFilterParameter(e.target.value)
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type

  const getSearchFlightTickets = async (): Promise<void> => {
    try {
      const response = await axios.get(`${process.env.REST_API_ENDPOINT}search?departureCity=${departureCity}&arrivalCity=${arrivalCity}&classSeat=${classSeat}`, {
        withCredentials: false
      })
      console.log(response.data.data)
      setSearchFlightTickets(response.data.data.slice(0, 4))
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(error)
      } else {
        console.error(error)
      }
    }
  }

  useEffect(() => {
    void getSearchFlightTickets()
  }, [])

  useEffect(() => {
    const status = checkLoggedIn()
    setIsLoggedIn(status)
  }, [])

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

  const [showFlightDetails, setShowFlightDetails] = useState(false)
  const toggleFlightDetails = (): void => {
    setShowFlightDetails(!showFlightDetails)
  }
  return (
    <div>
      <Header isLoggedIn={isLoggedIn} login={login}/>
      <div className='w-full px-[1%] sm:px-[5%] md:px-[10%] lg:px-[15%] mt-4'>
        <div>
          <div className='flex justify-between gap-3 pb-[20px]'>
            <span className='flex bg-purple-700 p-4 text-white text-base font-medium border rounded-md items-center w-4/5'>Destinasi {departureCity} {'>'} {arrivalCity}</span>
            <div className='search-green-button p-4 bg-green-600 rounded-md border'>
              <Link href={'/'}><span className='font-bold text-base text-white'>Ubah Pencarian</span></Link>
            </div>
          </div>

          <div className='flex justify-end pt-[20px] pb-[20px]'>
            <Button onClick={() => props.setOpenModal('dismissible') }>
              <div className = 'h-[32px] flex justify-center items-center border-2 border-purple rounded-lg text-darkPurple text-sm ml-auto pr-[10px]'><FontAwesomeIcon className='pl-[10px]' icon={faArrowUp} /><FontAwesomeIcon className='pr-[5px]' icon={faArrowDown} />
                {filterParameter}
              </div></Button>
          </div>

          <Modal dismissible show={openModal === 'dismissible'} onClose={() => props.setOpenModal(undefined)}>

            <Modal.Header>

            </Modal.Header>
            <Modal.Body className=''>
              <div className='p-6 space-y-6'>
                <div className='flex items-center mb-4 justify-between h-[20px] border-b-2 border-abu items-center pr-[15px]'>
                  <label className='ml-2 text-sm font-medium text-gray-900 dark:text-gray-300'><b>Harga</b> - Termurah</label>
                  <input type='radio' name='filterParameter' id='harga-termurah' value={'Harga - Termurah'} checked={filterParameter === 'Harga - Termurah'} onChange={onOptionChange} className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'/>
                </div>
                <div className='flex items-center mb-4 justify-between h-[20px] border-b-2 border-abu items-center pr-[15px]'>
                  <label className='ml-2 text-sm font-medium text-gray-900 dark:text-gray-300'><b>Durasi</b> - Terpendek</label>
                  <input type='radio' name='filterParameter' id='durasi-terpendek' value={'Durasi - Terpendek'} checked={filterParameter === 'Durasi - Terpendek'} onChange={onOptionChange} className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'/>
                </div>
                <div className='flex items-center mb-4 justify-between h-[20px] border-b-2 border-abu items-center pr-[15px]'>
                  <label className='ml-2 text-sm font-medium text-gray-900 dark:text-gray-300'><b>Keberangkatan</b> - Paling Awal</label>
                  <input type='radio' name='filterParameter' id='keberangkatan-awal' value={'Keberangkatan - Paling Awal'} checked={filterParameter === 'Keberangkatan - Paling Awal'} onChange={onOptionChange} className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'/>
                </div>
                <div className='flex items-center mb-4 justify-between h-[20px] border-b-2 border-abu items-center pr-[15px]'>
                  <label className='ml-2 text-sm font-medium text-gray-900 dark:text-gray-300'><b>Keberangkatan</b> - Paling Akhir</label>
                  <input type='radio' name='filterParameter' id='keberangkatan-akhir' value={'Keberangkatan - Paling Akhir'} checked={filterParameter === 'Keberangkatan - Paling Akhir'} onChange={onOptionChange} className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'/>
                </div>
                <div className='flex items-center mb-4 justify-between h-[20px] border-b-2 border-abu items-center pr-[15px]'>
                  <label className='ml-2 text-sm font-medium text-gray-900 dark:text-gray-300'><b>Kedatangan</b> - Paling Awal</label>
                  <input type='radio' name='filterParameter' id='kedatangan-awal' value={'Kedatangan - Paling Awal'} checked={filterParameter === 'Kedatangan - Paling Awal'} onChange={onOptionChange} className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'/>
                </div>
                <div className='flex items-center mb-4 justify-between h-[20px] border-b-2 border-abu items-center pr-[15px]'>
                  <label className='ml-2 text-sm font-medium text-gray-900 dark:text-gray-300'><b>Kedatangan</b> - Paling Akhir</label>
                  <input type='radio' name='filterParameter' id='kedatangan-akhir' value={'Kedatangan - Paling Akhir'} checked={filterParameter === 'Kedatangan - Paling Akhir'} onChange={onOptionChange} className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'/>
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={() => props.setOpenModal(undefined)}>I accept</Button>
              <Button color='gray' onClick={() => props.setOpenModal(undefined)}>
            Decline
              </Button>
            </Modal.Footer>
          </Modal>

          <div id='defaultModal' tabIndex='-1' aria-hidden='true' className='fixed top-0 left-0 right-0 z-50 hidden p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full'>
            <div className='relative w-[300px] max-h-full'>
              <div className='relative bg-white rounded-lg shadow dark:bg-gray-700'>
                <div className='flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600'>
                  <h3 className='text-xl font-semibold text-gray-900 dark:text-white'>
                  </h3>
                  <button type='button' className='text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white' data-modal-hide='defaultModal'>
                    <svg aria-hidden='true' className='w-5 h-5' fill='currentColor' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'><path fill-rule='evenodd' d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z' clip-rule='evenodd'></path></svg>
                    <span className='sr-only'>Close modal</span>
                  </button>
                </div>
                <div className='p-6 space-y-6'>
                  <div className='flex items-center mb-4 justify-between h-[20px] border-b-2 border-abu items-center pr-[15px]'>
                    <label className='ml-2 text-sm font-medium text-gray-900 dark:text-gray-300'><b>Harga</b> - Termurah</label>
                    <input type='radio' name='filterParameter' id='harga-termurah' value={'Harga - Termurah'} checked={filterParameter === 'Harga - Termurah'} onChange={onOptionChange} className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'/>
                  </div>
                  <div className='flex items-center mb-4 justify-between h-[20px] border-b-2 border-abu items-center pr-[15px]'>
                    <label className='ml-2 text-sm font-medium text-gray-900 dark:text-gray-300'><b>Durasi</b> - Terpendek</label>
                    <input type='radio' name='filterParameter' id='durasi-terpendek' value={'Durasi - Terpendek'} checked={filterParameter === 'Durasi - Terpendek'} onChange={onOptionChange} className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'/>
                  </div>
                  <div className='flex items-center mb-4 justify-between h-[20px] border-b-2 border-abu items-center pr-[15px]'>
                    <label className='ml-2 text-sm font-medium text-gray-900 dark:text-gray-300'><b>Keberangkatan</b> - Paling Awal</label>
                    <input type='radio' name='filterParameter' id='keberangkatan-awal' value={'Keberangkatan - Paling Awal'} checked={filterParameter === 'Keberangkatan - Paling Awal'} onChange={onOptionChange} className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'/>
                  </div>
                  <div className='flex items-center mb-4 justify-between h-[20px] border-b-2 border-abu items-center pr-[15px]'>
                    <label className='ml-2 text-sm font-medium text-gray-900 dark:text-gray-300'><b>Keberangkatan</b> - Paling Akhir</label>
                    <input type='radio' name='filterParameter' id='keberangkatan-akhir' value={'Keberangkatan - Paling Akhir'} checked={filterParameter === 'Keberangkatan - Paling Akhir'} onChange={onOptionChange} className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'/>
                  </div>
                  <div className='flex items-center mb-4 justify-between h-[20px] border-b-2 border-abu items-center pr-[15px]'>
                    <label className='ml-2 text-sm font-medium text-gray-900 dark:text-gray-300'><b>Kedatangan</b> - Paling Awal</label>
                    <input type='radio' name='filterParameter' id='kedatangan-awal' value={'Kedatangan - Paling Awal'} checked={filterParameter === 'Kedatangan - Paling Awal'} onChange={onOptionChange} className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'/>
                  </div>
                  <div className='flex items-center mb-4 justify-between h-[20px] border-b-2 border-abu items-center pr-[15px]'>
                    <label className='ml-2 text-sm font-medium text-gray-900 dark:text-gray-300'><b>Kedatangan</b> - Paling Akhir</label>
                    <input type='radio' name='filterParameter' id='kedatangan-akhir' value={'Kedatangan - Paling Akhir'} checked={filterParameter === 'Kedatangan - Paling Akhir'} onChange={onOptionChange} className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'/>
                  </div>
                </div>
                <div className='flex items-center mb-4 justify-end h-[48px] border-b-2 border-abu pr-[15px] p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600'>
                  <button data-modal-hide='defaultModal' type='button' className='text-white bg-[#4B1979] hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'>Pilih</button>
                </div>
              </div>
            </div>
          </div>
          {/* <div className='flight-option flex p-[15px] border-b-2 border-gray-300 gap-[5px]'>
                        <button type='button' className='px-5 py-2.5 text-sm font-medium text-center text-black rounded-lg focus:ring-4 focus:outline-none border-2 border-grey'>
                            <b>Senin</b><br />02/05/2023
                        </button>
                        <button type='button' className='px-5 py-2.5 text-sm font-medium text-center text-black rounded-lg focus:ring-4 focus:outline-none border-2 border-grey'>
                            <b>Senin</b><br />02/05/2023
                        </button>
                        <button type='button' className='px-5 py-2.5 text-sm font-medium text-center text-black rounded-lg focus:ring-4 focus:outline-none border-2 border-grey'>
                            <b>Senin</b><br />02/05/2023
                        </button>
                        <button type='button' className='px-5 py-2.5 text-sm font-medium text-center text-black rounded-lg focus:ring-4 focus:outline-none border-2 border-grey'>
                            <b>Senin</b><br />02/05/2023
                        </button>
                        <button type='button' className='px-5 py-2.5 text-sm font-medium text-center text-black rounded-lg focus:ring-4 focus:outline-none border-2 border-grey'>
                            <b>Senin</b><br />02/05/2023
                        </button>
                        <button type='button' className='px-5 py-2.5 text-sm font-medium text-center text-black rounded-lg focus:ring-4 focus:outline-none border-2 border-grey'>
                            <b>Senin</b><br />02/05/2023
                        </button>
                        <button type='button' className='px-5 py-2.5 text-sm font-medium text-center text-black rounded-lg focus:ring-4 focus:outline-none border-2 border-grey'>
                            <b>Senin</b><br />02/05/2023
                        </button>
                        <button type='button' className='px-5 py-2.5 text-sm font-medium text-center text-black rounded-lg focus:ring-4 focus:outline-none border-2 border-grey'>
                            <b>Senin</b><br />02/05/2023
                        </button>
                    </div> */}

          <div className='flex'>
            <div className='filter-box flex'>
              <div className='accordion w-[268px] p-[20px] rounded-lg' style={{ width: '268px', padding: '20px', borderRadius: '16px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.15)' }}>
                <p style={{ fontWeight: 'bold' }}>Filter</p>
                <Accordion collapseAll className=''>
                  <Accordion.Panel border-none>
                    <Accordion.Title>
                      <FontAwesomeIcon className='pr-[5px]' icon={faDollarSign}/>Harga
                    </Accordion.Title>
                    <Accordion.Content>
                      <div className='p-5'>
                        <div className='start-from'>
                          <form>
                            <div className='grid md:grid-cols-2 md:gap-6'>
                              <div className='relative z-0 w-full mb-6 group'>
                                <input type='text' name='floating_first_name' id='floating_first_name' className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer' placeholder=' ' required />
                                <label className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'>Mulai</label>
                              </div>
                              <div className='relative z-0 w-full mb-6 group'>
                                <input type='text' name='floating_last_name' id='floating_last_name' className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer' placeholder=' ' required />
                                <label className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'>Sampai</label>
                              </div>
                            </div>
                            <button type='submit' className='text-white bg-darkPurple hover:bg-violet focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'>Cari</button>
                          </form>
                        </div>
                      </div>
                    </Accordion.Content>
                  </Accordion.Panel>
                </Accordion>
              </div>
            </div>


            <div className='ml-4 w-full md:w-3/4'>
              
              <div className='w-fit px-2 py-1 mb-2 cursor-pointer flex items-center border-2 border-slate-500 rounded-full' onClick={toggleFlightDetails}>
                <p>see all details ticket</p>
                <FontAwesomeIcon icon={faChevronDown} className='w-3 h-3 ml-2 text-gray-500' />
              </div>
              {searchFlightTickets.map((ticket: any, index) => (
                <div key={ticket.id} className='p-4 mb-3 border-2 border-slate-300 rounded-lg'>
                  <div>
                    <div className='flex justify-between items-center'>
                      <div className='flex items-center'>
                        <FontAwesomeIcon icon={faGlobe} className='w-4 text-yellow-400 mr-2' />
                        <p className='font-semibold text-sm'><span>{ticket.flight.airline} - {ticket.classSeat}</span></p>
                      </div>
                    </div>
                    <div className='flex justify-between items-center'>
                      <div className='flex justify-between items-center w-3/5'>
                        <div>
                          <p className='font-semibold text-sm'>{ticket.flight.departureTime.slice(0, 5)}</p>
                          <p className='font-semibold text-sm'>{ticket.flight.departureCity}</p>
                        </div>
                        <div className='flex items-center'>
                          <FontAwesomeIcon icon={faClock} className='w-3 text-gray-400 mr-1' />
                          <p className='text-xs text-gray-400'>{ticket.flight.duration.slice(0, 5)} h</p>
                        </div>
                        <div>
                          <p className='font-semibold text-sm'>{ticket.flight.arrivalTime.slice(0, 5)}</p>
                          <p className='font-semibold text-sm'>{ticket.flight.arrivalCity}</p>
                        </div>
                      </div>
                      <div className='flex flex-col items-end'>
                        <p className='font-extrabold text-base text-blue-600'>IDR {ticket.price}</p>
                        <Link href={`/checkout/${ticket.id}`}>
                          <button className='px-5 py-1 text-sm text-white bg-blue-700 rounded-lg'>
                            <span className='font-medium text-base text-white'>Pilih</span>
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                  {showFlightDetails && (
                    <div>
                      <p className='font-bold text-sm'>Detail Penerbangan</p>
                      <div className='p-2'>
                        <div className='flex justify-between'>
                          <p className='font-semibold text-sm'>{ticket.flight.departureTime.slice(0, 5)}</p>
                          <p className='font-extrabold text-xs text-blue-500'>keberangkatan</p>
                        </div>
                        <p className='font-medium text-sm'>{ticket.flight.departureDate}</p>
                        <p className='font-medium text-sm'>{ticket.flight.departureAirport}</p>
                      </div>
                      <div className='py-2 mx-5 border-y-2 border-slate-400 '>
                        <div>
                          <p className='font-bold text-sm'>{ticket.flight.airline} - {ticket.classSeat}</p>
                          <p className='font-bold text-sm'>{ticket.flight.flightCode}</p>
                        </div>
                        <div>
                          <p className='font-semibold text-sm'>informasi :</p>
                          <p className='font-medium text-sm'>{ticket.additionalInformation.split(',').join(', ')}</p>
                        </div>
                      </div>
                      <div className='p-2'>
                        <div className='flex justify-between'>
                          <p className='font-semibold text-sm'>{ticket.flight.arrivalTime.slice(0, 5)}</p>
                          <p className='font-extrabold text-xs text-blue-500'>keberangkatan</p>
                        </div>
                        <p className='font-medium text-sm'>{ticket.flight.arrivalDate}</p>
                        <p className='font-medium text-sm'>{ticket.flight.arrivalAirport}</p>
                      </div>
                    </div>
                  )}

                </div>
                // <u key={ticket.id} className='border'>
                //     <li className='text-center'>maskapai : {ticket.flight.airline}
                //         <Link href={`/checkout/${ticket.id}`}>
                //             <button className='p-1 m-1 text-sm text-white bg-blue-700 rounded-lg'>
                //                 <span className='font-bold text-base text-white'>Pilih</span>
                //             </button>
                //         </Link>
                //     </li>
                //     <li className='w-40 text-center'>departure : {ticket.flight.departureCity}</li>
                //     <li className='w-40 text-center'>arrival : {ticket.flight.arrivalCity}</li>
                //     <li className='w-40 text-center'>seat : {ticket.classSeat}</li>
                //     <li className='w-40 text-center'>harga : {ticket.price}</li>
                // </u>
              ))}
            </div>
          </div>

          <div className='w-full filter-section'>
            <div className='flex items-center justify-end pt-[20px] pb-[20px]'>
              <div data-modal-target='defaultModal' data-modal-toggle='defaultModal' className='h-fit w-fit p-2 border-2 border-purple-700 rounded-lg text-sm'>
                {filterParameter}
              </div>
            </div>
            <div className='w-full flex'>
              <div className='filter-box flex'>
                <div className='accordion w-[268px] p-[20px] rounded-lg' style={{ width: '268px', padding: '20px', borderRadius: '16px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.15)' }} id='accordionPanelsStayOpenExample'>
                  <p style={{ fontWeight: 'bold' }}>Filter</p>
                  <div id='accordion-collapse-filter-box' data-accordion='collapse'>
                    <h2 id='accordion-collapse-filter-box-heading-1'>
                      <button type='button' className='flex items-center justify-between w-full p-5 font-medium text-left text-gray-500 rounded-t-xl dark:text-gray-400' data-accordion-target='#accordion-collapse-body-1' aria-expanded='true' aria-controls='accordion-collapse-body-1'>
                        <span><FontAwesomeIcon className='pr-[5px]' icon={faCube}/>Fasilitas</span>
                        <svg data-accordion-icon className='w-6 h-6 rotate-180 shrink-0' fill='currentColor' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'><path fill-rule='evenodd' d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z' clip-rule='evenodd'></path></svg>
                      </button>
                    </h2>
                    <div id='accordion-collapse-filter-box-body-1' className='hidden' aria-labelledby='accordion-collapse-heading-1'>
                      <div className='flex items-center mr-4 p-2'>
                        <input id='checkbox-fasilitas-1' type='checkbox' value='' className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'/>
                        <label className='ml-2 text-sm font-medium text-gray-900 dark:text-gray-300'>Baggage</label>
                      </div>
                      <div className='flex items-center mr-4 p-2'>
                        <input id='checkbox-fasilitas-2' type='checkbox' value='' className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'/>
                        <label className='ml-2 text-sm font-medium text-gray-900 dark:text-gray-300'>Cabin</label>
                      </div>
                      <div className='flex items-center mr-4 p-2'>
                        <input id='checkbox-fasilitas-3' type='checkbox' value='' className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'/>
                        <label className='ml-2 text-sm font-medium text-gray-900 dark:text-gray-300'>In Flight Entertaiment</label>
                      </div>
                    </div>
                    <h2 id='accordion-collapse-filter-box-heading-2'>
                      <button type='button' className='flex items-center justify-between w-full p-5 font-medium text-left text-gray-500' data-accordion-target='#accordion-collapse-body-2' aria-expanded='false' aria-controls='accordion-collapse-body-2'>
                        <span><FontAwesomeIcon className='pr-[5px]' icon={faDollarSign}/>Harga</span>
                        <svg data-accordion-icon className='w-6 h-6 shrink-0' fill='currentColor' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'><path fill-rule='evenodd' d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z' clip-rule='evenodd'></path></svg>
                      </button>
                    </h2>
                    <div id='accordion-collapse-filter-box-body-2' className='hidden' aria-labelledby='accordion-collapse-heading-2'>
                      <div className='price-filter-section p-5'>
                        <div className='start-from'>
                          <form>
                            <div className='grid md:grid-cols-2 md:gap-6'>
                              <div className='relative z-0 w-full mb-6 group'>
                                <input type='text' name='floating_first_name' id='floating_first_name' className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer' placeholder=' ' required />
                                <label className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'>Mulai</label>
                              </div>
                              <div className='relative z-0 w-full mb-6 group'>
                                <input type='text' name='floating_last_name' id='floating_last_name' className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer' placeholder=' ' required />
                                <label className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'>Sampai</label>
                              </div>
                            </div>
                            <button type='submit' className='text-white bg-darkPurple hover:bg-violet focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'>Cari</button>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>


              <div className='ml-4 w-full md:w-3/4'>
                <div className='w-fit px-2 py-1 mb-2 cursor-pointer flex items-center border-2 border-slate-500 rounded-full' onClick={toggleFlightDetails}>
                  <p>see all details ticket</p>
                  <FontAwesomeIcon icon={faChevronDown} className='w-3 h-3 ml-2 text-gray-500' />
                </div>
                {searchFlightTickets.map((ticket: any, index) => (
                  <div key={ticket.id} className='p-4 mb-3 border-2 border-slate-300 rounded-lg'>
                    <div>
                      <div className='flex justify-between items-center'>
                        <div className='flex items-center'>
                          <FontAwesomeIcon icon={faGlobe} className='w-4 text-yellow-400 mr-2' />
                          <p className='font-semibold text-sm'><span>{ticket.flight.airline} - {ticket.classSeat}</span></p>
                        </div>
                      </div>
                      <div className='flex justify-between items-center'>
                        <div className='flex justify-between items-center w-3/5'>
                          <div>
                            <p className='font-semibold text-sm'>{ticket.flight.departureTime.slice(0, 5)}</p>
                            <p className='font-semibold text-sm'>{ticket.flight.departureCity}</p>
                          </div>
                          <div className='flex items-center'>
                            <FontAwesomeIcon icon={faClock} className='w-3 text-gray-400 mr-1' />
                            <p className='text-xs text-gray-400'>{ticket.flight.duration.slice(0, 5)} h</p>
                          </div>
                          <div>
                            <p className='font-semibold text-sm'>{ticket.flight.arrivalTime.slice(0, 5)}</p>
                            <p className='font-semibold text-sm'>{ticket.flight.arrivalCity}</p>
                          </div>
                        </div>
                        <div className='flex flex-col items-end'>
                          <p className='font-extrabold text-base text-blue-600'>IDR {ticket.price}</p>
                          <Link href={`/checkout/${ticket.id}`}>
                            <button className='px-5 py-1 text-sm text-white bg-blue-700 rounded-lg'>
                              <span className='font-medium text-base text-white'>Pilih</span>
                            </button>
                          </Link>
                        </div>
                      </div>
                    </div>
                    {showFlightDetails && (
                      <div>
                        <p className='font-bold text-sm'>Detail Penerbangan</p>
                        <div className='p-2'>
                          <div className='flex justify-between'>
                            <p className='font-semibold text-sm'>{ticket.flight.departureTime.slice(0, 5)}</p>
                            <p className='font-extrabold text-xs text-blue-500'>keberangkatan</p>
                          </div>
                          <p className='font-medium text-sm'>{ticket.flight.departureDate}</p>
                          <p className='font-medium text-sm'>{ticket.flight.departureAirport}</p>
                        </div>
                        <div className='py-2 mx-5 border-y-2 border-slate-400 '>
                          <div>
                            <p className='font-bold text-sm'>{ticket.flight.airline} - {ticket.classSeat}</p>
                            <p className='font-bold text-sm'>{ticket.flight.flightCode}</p>
                          </div>
                          <div>
                            <p className='font-semibold text-sm'>informasi :</p>
                            <p className='font-medium text-sm'>{ticket.additionalInformation.split(',').join(', ')}</p>
                          </div>
                        </div>
                        <div className='p-2'>
                          <div className='flex justify-between'>
                            <p className='font-semibold text-sm'>{ticket.flight.arrivalTime.slice(0, 5)}</p>
                            <p className='font-extrabold text-xs text-blue-500'>keberangkatan</p>
                          </div>
                          <p className='font-medium text-sm'>{ticket.flight.arrivalDate}</p>
                          <p className='font-medium text-sm'>{ticket.flight.arrivalAirport}</p>
                        </div>
                      </div>
                    )}

                  </div>
                  // <u key={ticket.id} className='border'>
                  //     <li className='text-center'>maskapai : {ticket.flight.airline}
                  //         <Link href={`/checkout/${ticket.id}`}>
                  //             <button className='p-1 m-1 text-sm text-white bg-blue-700 rounded-lg'>
                  //                 <span className='font-bold text-base text-white'>Pilih</span>
                  //             </button>
                  //         </Link>
                  //     </li>
                  //     <li className='w-40 text-center'>departure : {ticket.flight.departureCity}</li>
                  //     <li className='w-40 text-center'>arrival : {ticket.flight.arrivalCity}</li>
                  //     <li className='w-40 text-center'>seat : {ticket.classSeat}</li>
                  //     <li className='w-40 text-center'>harga : {ticket.price}</li>
                  // </u>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default dynamic(async () => await Promise.resolve(SearchFlight), { ssr: false })
