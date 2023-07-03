import type { ReactElement } from 'react'
import { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faDollarSign, faArrowLeft, faArrowUp, faArrowDown, faCube, faCubes } from '@fortawesome/free-solid-svg-icons'
import Image from 'next/image'
import Header from '../../components/Header'
import axios from 'axios'
import { Modal } from 'flowbite'
import type { ModalOptions, ModalInterface } from 'flowbite'
import Link from 'next/Link'
import { useRouter } from 'next/router'

const SearchFlight = (): ReactElement => {
  const router = useRouter()
  const { departureCity, arrivalCity, selectedClass, passengerSum } = router.query

  const [filterParameter, setFilterParameter] = useState('Harga - Termurah')
  const [flightData, setFlightData] = useState([])
  const [ticketData, setTicketData] = useState([])
  const [searchData, setSearchData] = useState([])
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type

  const getFlightData = async () => {
    const response = await axios.get('http://localhost:8000/api/v1/flights')
    setFlightData(response.data.flights)
  }

  const getTicketData = async () => {
    const response = await axios.get('http://localhost:8000/api/v1/tickets')
    setTicketData(response)
  }

  const getSearchData = async () => {
    const response = await axios.get('http://localhost:8000/api/v1/search?arrivalCity=Surabaya&classSeat=Economy&departureCity=Jakarta')
    setSearchData(response)
  }

  useEffect(() => {
    getFlightData()
    getTicketData()
    getSearchData()
  }, [])

  console.log(flightData)

  const onOptionChange = e => {
    setFilterParameter(e.target.value)
  }
  const [showModal, setShowModal] = useState(false)

  return (
    <div>
      <Header />
      <div className='flex justify-center p-[50px]'>
        <div>
          <div className='flex gap-3 pb-[20px]'>
            <span className='flex bg-violet text-white text-base font-medium border rounded-md items-center w-[700px] h-[50px]'>
              <Link href={'/'}><button className='px-[15px]' ><FontAwesomeIcon icon={faArrowLeft} /></button></Link>
            Fasilitas {departureCity} {'>'} {arrivalCity} - {passengerSum} Penumpang - {selectedClass}</span>
            <div className='search-green-button'>
              <Link href={'/'}> <button className='w-[220px] h-[50px] bg-hijau shadow-3xl border rounded-md '><span className='font-bold text-base text-white'>Ubah Pencarian</span></button></Link> 
            </div>
          </div>
          <div className='flight-option flex justify-center p-[15px] border-b-2 border-abu gap-[5px]'>
            <button type='button' className='px-5 py-2.5 text-sm font-medium text-center text-black rounded-lg focus:ring-4 focus:outline-none border-2 border-grey'>
              <b>Senin</b><br/>02/05/2023
            </button>
            <button type='button' className='px-5 py-2.5 text-sm font-medium text-center text-black rounded-lg focus:ring-4 focus:outline-none border-2 border-grey'>
              <b>Senin</b><br/>02/05/2023
            </button>
            <button type='button' className='px-5 py-2.5 text-sm font-medium text-center text-black rounded-lg focus:ring-4 focus:outline-none border-2 border-grey'>
              <b>Senin</b><br/>02/05/2023
            </button>
            <button type='button' className='px-5 py-2.5 text-sm font-medium text-center text-black rounded-lg focus:ring-4 focus:outline-none border-2 border-grey'>
              <b>Senin</b><br/>02/05/2023
            </button>
            <button type='button' className='px-5 py-2.5 text-sm font-medium text-center text-black rounded-lg focus:ring-4 focus:outline-none border-2 border-grey'>
              <b>Senin</b><br/>02/05/2023
            </button>
            <button type='button' className='px-5 py-2.5 text-sm font-medium text-center text-black rounded-lg focus:ring-4 focus:outline-none border-2 border-grey'>
              <b>Senin</b><br/>02/05/2023
            </button>
            <button type='button' className='px-5 py-2.5 text-sm font-medium text-center text-black rounded-lg focus:ring-4 focus:outline-none border-2 border-grey'>
              <b>Senin</b><br/>02/05/2023
            </button>
            <button type='button' className='px-5 py-2.5 text-sm font-medium text-center text-black rounded-lg focus:ring-4 focus:outline-none border-2 border-grey'>
              <b>Senin</b><br/>02/05/2023
            </button>
          </div>
          <div className='filter-section'>
            <div className='flex justify-end pt-[20px] pb-[20px]'>
              <button data-modal-target='defaultModal' data-modal-toggle='defaultModal' className='h-[32px] border-2 border-purple rounded-lg text-darkPurple text-sm ml-auto pr-[10px]' type='button'><FontAwesomeIcon className='pl-[10px]' icon={faArrowUp} /><FontAwesomeIcon className='pr-[5px]' icon={faArrowDown} />
                {filterParameter}
              </button>
            </div>
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
            <div className='filter-box flex'>
              <div className='accordion w-[268px] p-[20px] rounded-lg' style={{ width: '268px', padding: '20px', borderRadius: '16px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.15)' }} id='accordionPanelsStayOpenExample'>
                <p style={{ fontWeight: 'bold' }}>Filter</p>
                <div id='accordion-collapse' data-accordion='collapse'>
                  <h2 id='accordion-collapse-heading-2'>
                    <button type='button' className='flex items-center justify-between w-full p-5 font-medium text-left text-gray-500' data-accordion-target='#accordion-collapse-body-2' aria-expanded='false' aria-controls='accordion-collapse-body-2'>
                      <span><FontAwesomeIcon className='pr-[5px]' icon={faDollarSign}/>Harga</span>
                      <svg data-accordion-icon className='w-6 h-6 shrink-0' fill='currentColor' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'><path fill-rule='evenodd' d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z' clip-rule='evenodd'></path></svg>
                    </button>
                  </h2>
                  <div id='accordion-collapse-body-2' className='hidden' aria-labelledby='accordion-collapse-heading-2'>
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
          </div>
        </div>
      </div>
      <div>
        <table className='flex table-fixed justify-center py-2 overflow-y-auto h-80 pb-5'>
          <tbody>
            {flightData.map((flights) => {
              if (flights.airline === 'Jet Air') {
                return (
                  <tr key={flights.id} className='border-b-2 h-16'>
                    <td className='w-40 text-center'>
                      {flights.airline}
                    </td>
                  </tr>
                )
              }
            }
            )
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default SearchFlight
