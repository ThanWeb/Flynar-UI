import type { ReactElement } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCube, faHeart, faDollarSign, faArrowLeft, faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons'
import Image from 'next/image'
import Header from '../../components/Header'
import 'bootstrap/dist/css/bootstrap.min.css'

const SearchFlight = (): ReactElement => {
  return (
    <div>
      <Header />
      <div style={{ padding: ' 50px ' }} className='d-flex justify-content-center'>
        <div>
          <div className='d-flex gap-3' style={{ paddingBottom: '20px' }}>
            <span className='badge text' style={{ width: '700px', height: '50px', display: 'flex', alignItems: 'center', background: '#A06ECE', borderRadius: '12px', fontWeight: '500', fontSize: '16px', lineHeight: '24px' }}>
              <button style={{ background: 'none', border: 'none', paddingRight: '15px' }}><FontAwesomeIcon icon={faArrowLeft} style={{ color: 'white', padding: '5px', display: 'flex', alignItems: 'center' }} /></button>
            Fasilitas JKT {'>'} MLB  - 2 Penumpang - Economy</span>
            <div className='search-green-button'>
              <button style={{ width: '220px', height: '50px', background: '#73CA5C', boxShadow: '0px 0px 4px rgba(0, 0, 0, 0.15)', borderRadius: '12px', border: 'none' }}><span style={{ fontWeight: '700', fontSize: '16px', lineHeight: '24px' }} className='badge text'>Ubah Pencarian</span></button>
            </div>
          </div>
          <div className='flight-option d-flex justify-content-center' style={{ borderBottom: '1px groove #D0D0D0', padding: '15px' }}>
            {/* nanti badge nya di loop  */}
            <span className='badge text-black justify-content-center' style={{ width: '100px', height: '46px', textAlign: 'center', display: 'flex', alignItems: 'center', border: ' 1px solid black' }}>Senin</span>
          </div>
          <div className='filter-section'>
            <div className='price-filter-button' style={{ display: 'flex', justifyContent: 'end', padding: '30px 0 30px 0' }}>
              <button style={{ width: '108px', height: '32px', border: '1px solid #A06ECE', borderRadius: '16px ', color: '#7126B5', fontSize: '12px', marginLeft: 'auto' }}><FontAwesomeIcon icon={faArrowUp} style={{ color: '#7126B5' }} /><FontAwesomeIcon icon={faArrowDown} style={{ color: '#7126B5' }}/>Termurah</button>
            </div>
            <div className='fiter-box' style={{ display: 'flex' }}>
              <div className='accordion' style={{ width: '268px', padding: '20px', borderRadius: '16px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.15)' }} id='accordionPanelsStayOpenExample'>
                <p style={{ fontWeight: 'bold' }}>Filter</p>
                <div className='accordion-item'>
                  <h2 className='accordion-header'>
                    <button className='accordion-button' type='button' data-bs-toggle='collapse' data-bs-target='#panelsStayOpen-collapseOne' aria-expanded='true' aria-controls='panelsStayOpen-collapseOne'>
                      <FontAwesomeIcon icon={faCube} style={{ color: '#8A8A8A', padding: '5px' }} />Transit
                    </button>
                  </h2>
                  <div id='panelsStayOpen-collapseOne' className='accordion-collapse collapse show'>
                    <div className='accordion-body'>
                      <strong>This is the first item`s accordion body.</strong>Cek1
                    </div>
                  </div>
                </div>
                <div className='accordion-item'>
                  <h2 className='accordion-header'>
                    <button className='accordion-button collapsed' type='button' data-bs-toggle='collapse' data-bs-target='#panelsStayOpen-collapseTwo' aria-expanded='false' aria-controls='panelsStayOpen-collapseTwo'>
                      <FontAwesomeIcon icon={faHeart} style={{ color: '#8A8A8A', padding: '5px' }} />Fasilitas
                    </button>
                  </h2>
                  <div id='panelsStayOpen-collapseTwo' className='accordion-collapse collapse'>
                    <div className='accordion-body'>
                      <strong>This is the second item`s accordion body.</strong>Cek2
                    </div>
                  </div>
                </div>
                <div className='accordion-item'>
                  <h2 className='accordion-header'>
                    <button className='accordion-button collapsed' type='button' data-bs-toggle='collapse' data-bs-target='#panelsStayOpen-collapseThree' aria-expanded='false' aria-controls='panelsStayOpen-collapseThree'>
                      <FontAwesomeIcon icon={faDollarSign} style={{ color: '#8A8A8A', padding: '5px' }} />Harga
                    </button>
                  </h2>
                  <div id='panelsStayOpen-collapseThree' className='accordion-collapse collapse'>
                    <div className='accordion-body'>
                      <strong>This is the third item`s accordion body.</strong>Cek3
                    </div>
                  </div>
                </div>
              </div>
              <div className='ticket-section ms-1'>
                <div className='accordion accordion-flush' id='accordionFlushExample'>
                  <div className='accordion-item tiket'>
                    <h2 className='accordion-header'>
                      <button className='accordion-button collapsed' type='button' data-bs-toggle='collapse' data-bs-target='#flush-collapseOne' aria-expanded='false' aria-controls='flush-collapseOne' style={{ marginLeft: '50px', width: '657px', height: '127px', border: '2px solid #F2F2F2', borderRadius: '8px' }}>
                        <Image src='/assets/jetair.png' alt='lambang pesawat' width={24} height={24} className='me-3' style={{ marginTop: '-70px' }}/>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                          <p style={{ color: '#151515', fontWeight: '500', fontSize: '12px', marginTop: '5px' }}>Jet Air - Economy</p>
                          <p style={{ color: '#151515', lineHeight: '20px', fontSize: '14px', fontWeight: '700' }}>07:00</p>
                          <p style={{ color: '#151515', fontSize: '12px', fontWeight: '500', marginTop: '-10px' }}>JKT</p>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                          <p style={{ color: '#8A8A8A', fontSize: '12px', fontWeight: '500', margin: '25px 50px' }}>4h 0m</p> <br />
                          <Image src='/assets/Arrow.png' alt='panah' width={233} height={8} style={{ margin: '-40px 0 0 -50px' }}/>
                          <p style={{ color: '#8A8A8A', fontSize: '12px', fontWeight: '500', margin: '5px 50px' }}>Direct</p>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                          <p style={{ color: '#151515', lineHeight: '20px', fontSize: '14px', fontWeight: '700', marginTop: '30px', marginLeft: '20px' }}>11:00</p>
                          <p style={{ color: '#151515', fontSize: '12px', fontWeight: '500', marginTop: '-10px', marginLeft: '20px' }}>MLB</p>
                        </div>
                        <Image src='/assets/icon-baggage-delay.png' alt='icon-bag' width={24} height={24} style={{ marginTop: '15px', marginLeft: '30px' }} />
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                          <p style={{ color: '#7126B5', fontSize: '16px', fontWeight: '700', marginLeft: '20px', marginTop: '30px' }}>IDR 4.950.000</p>
                          <button style={{ border: 'none', borderRadius: '12px', width: '100px', height: '32px', padding: '4px 12px', background: '#7126B5', color: '#FFFF', marginLeft: '35px', marginTop: '-5px' }}>Pilih</button>
                        </div>
                      </button>
                    </h2>
                    <div id='flush-collapseOne' className='accordion-collapse collapse' data-bs-parent='#accordionFlushExample' style={{ marginLeft: '50px', width: '657px', borderRadius: '8px' }}>
                      <div className='accordion-body border border-top-0 rounded-bottom'>
                        <hr style={{ borderTop: '2px solid black' }}/>
                        <div className='row'>
                          <div className='col-6'>
                            <p style={{ color: '#4B1979', fontSize: '14px', fontWeight: '700' }}>Detail Penerbangan</p>
                            <p style={{ fontSize: '16px', marginTop: '-10px' }}> <span className='fw-bold'>07:00</span> <br /> 3 Maret 2023</p>
                            <p style={{ fontSize: '14px', fontWeight: '500', marginTop: '-10px' }}>Soekarno Hatta - Terminal 1A Domestik</p>
                          </div>
                          <div className='col-6 d-flex flex-row-reverse'>
                            <p style={{ color: '#A06ECE', fontSize: '12px', fontWeight: '700', marginRight: '10px', marginTop: '20px' }}>Keberangkatan</p>
                          </div>
                        </div>
                        <hr className='w-50 mx-auto mt-0' />
                        <div className='row'>
                          <div className='col-2'>
                            <Image src='/assets/jetair.png' alt='lambang pesawat' width={24} height={24} className='my-4'/>
                          </div>
                          <div className='col-10' style={{ marginLeft: '-70px' }}>
                            <p style={{ color: '#151515', fontSize: '14px' }}> <span className='fw-bold'>Jet Air - Economy <br />
                                JT - 203 <br />
                                Informasi: <br /> <br /> </span>
                                Baggage 20 kg <br />
                                Cabin baggage 7 kg <br />
                                In Flight Entertainment</p>
                          </div>
                        </div>
                        <hr className='w-50 mx-auto mt-0' />
                        <div>
                          <div className='row'>
                            <div className='col-6'>
                              <p style={{ color: '#151515', fontSize: '14px' }}><span className='fw-bold'>11:00</span> <br />
                              3 Maret 2023 <br />
                              Melbourne International Airport
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SearchFlight
