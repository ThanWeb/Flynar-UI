import type { ReactElement} from 'react'
import { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCube, faHeart, faDollarSign, faArrowLeft, faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons'
import { IconContext } from 'react-icons'
import Header from '../../components/Header'
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios'
import { Modal } from 'react-bootstrap'

const SearchFlight = (): ReactElement => {
  const [filterParameter, setFilterParameter] = useState('Harga - Termurah')
  const [flightData, setFlightData] = useState([])

  const getFlightData = async () => {
    const response = await axios.get('http://localhost:8000/api/v1/flights')
    
    setFlightData( response )
  }
  console.log(flightData)
  console.log(flightData.data)
  useEffect(()=>{
    getFlightData()
  },[])
 
  const onOptionChange = e => {
    setFilterParameter(e.target.value)
  }
  return (
    <div>
      <Header />
      <div style={{ padding: ' 50px '}} className='d-flex justify-content-center'>
        <div>
          <div className='d-flex gap-3' style={{ paddingBottom: '20PX'}}>
            <span className='badge text' style={{ width: '700px', height: '50px', display: 'flex', alignItems: 'center', background: '#A06ECE', borderRadius: '12px', fontWeight: '500', fontSize: '16px', lineHeight: '24px' }}>
              <button style={{ background: 'none', border: 'none', paddingRight: '15px'}}><FontAwesomeIcon icon={faArrowLeft} style={{ color: 'white', display: 'flex', alignItems: 'center' }} /></button>
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
            <div className='price-filter-button' style={{ display: 'flex', justifyContent: 'end', padding: '30px 0 30px 0'}}>
              <button className='btn' data-bs-toggle='modal' data-bs-target='#exampleModal' style={{ width: 'full', height: '32px', border: '1px solid #A06ECE', borderRadius: '16px ', color: '#7126B5', fontSize: '12px', marginLeft: 'auto' }}><FontAwesomeIcon icon={faArrowUp} style={{ color: '#7126B5'}} /><FontAwesomeIcon icon={faArrowDown} style={{ color: '#7126B5', marginRight: '5px' }}/>{filterParameter} </button>
            </div>
            <div className='modal fade' id='exampleModal' tabIndex='-1' role='dialog' aria-labelledby='exampleModalLabel' ariaHidden='true'>
              <div className='modal-dialog'>
                <div className='modal-content'>
                  <div className='modal-header'>
                    <h5 className='modal-title' id='exampleModalLabel'></h5>
                    <button type='button' className='btn-close' data-bs-dismiss='modal' aria-label='Close'>
                      <span aria-hidden='true'></span>
                    </button>
                  </div>
                  <div className='modal-body'>
                    <div className='form-check' id='hover-popup' style={{ display: 'flex', justifyContent:'space-between', height: '48px', borderBottom: '1px solid #D0D0D0', alignItems: 'center', paddingRight:'15px'}}>
                      <label className='form-check-label' htmlFor='flexRadioDefault1'>
                        <b>Harga</b> - Termurah
                      </label>
                      <input className='form-check-input' type='radio' name='filterParameter' id='harga-termurah' value={'Harga - Termurah'} checked={filterParameter === 'Harga - Termurah'} onChange={onOptionChange} />
                    </div>
                    <div className='form-check' id='hover-popup' style={{ display: 'flex', justifyContent:'space-between', height: '48px', borderBottom: '1px solid #D0D0D0', alignItems: 'center', paddingRight:'15px'}}>
                      <label className='form-check-label' htmlFor='flexRadioDefault2'>
                        <b>Durasi</b> - Terpendek
                      </label>
                      <input className='form-check-input' type='radio' name='filterParameter' id='durasi-terpendek' value={'Durasi - Terpendek'} checked={filterParameter === 'Durasi - Terpendek'} onChange={onOptionChange} />
                    </div>
                    <div className='form-check' id='hover-popup' style={{ display: 'flex', justifyContent:'space-between', height: '48px', borderBottom: '1px solid #D0D0D0', alignItems: 'center', paddingRight:'15px'}}>
                      <label className='form-check-label' htmlFor='flexRadioDefault2'>
                        <b>Keberangkatan</b> - Paling Awal
                      </label>
                      <input className='form-check-input' type='radio' name='filterParameter' id='keberangkatan-paling-awal' value={'Keberangkatan - Paling Awal'} checked={filterParameter === 'Keberangkatan - Paling Awal'} onChange={onOptionChange} />
                    </div>
                    <div className='form-check' id='hover-popup' style={{ display: 'flex', justifyContent:'space-between', height: '48px', borderBottom: '1px solid #D0D0D0', alignItems: 'center', paddingRight:'15px'}}>
                      <label className='form-check-label' htmlFor='flexRadioDefault2'>
                        <b>Keberangkatan</b> - Paling Akhir
                      </label>
                      <input className='form-check-input' type='radio' name='filterParameter' id='keberangkatan-paling-akhir' value={'Keberangkatan - Paling Akhir'} checked={filterParameter === 'Keberangkatan - Paling Akhir'} onChange={onOptionChange} />
                    </div>
                    <div className='form-check' id='hover-popup' style={{ display: 'flex', justifyContent: 'space-between', height: '48px', borderBottom: '1px solid #D0D0D0', alignItems: 'center', paddingRight:'15px'}}>
                      <label className='form-check-label' htmlFor='flexRadioDefault2'>
                        <b>Kedatangan</b> - Paling Awal
                      </label>
                      <input className='form-check-input' type='radio' name='filterParameter' id='kedatangan-paling-awal' value={'Kedatangan - Paling Awal'} checked={filterParameter === 'Keberangkatan - Paling Awal'} onChange={onOptionChange} />
                    </div>
                    <div className='form-check' id='hover-popup' style={{ display: 'flex', justifyContent: 'space-between', height: '48px', borderBottom: '1px solid #D0D0D0', alignItems: 'center', paddingRight:'15px'}}>
                      <label className='form-check-label' htmlFor='flexRadioDefault2'>
                        <b>Kedatangan</b> - Paling Akhir
                      </label>
                      <input className='form-check-input' type='radio' name='filterParameter' id='kedatangan-paling-akhir' value={'Kedatangan - Paling Akhir'} checked={filterParameter === 'Kedatangan - Paling Akhir'} onChange={onOptionChange} />
                    </div>
                  </div>
                  <div className='modal-footer'>
                    <button type='submit' className='btn btn-primary' style={{backgroundColor: '#4B1979' }}>Pilih</button>
                  </div>
                </div>
              </div>
            </div>
            <div className='d-flex'>
              <div className='filter-box'>
                <div className='accordion' style={{ width: '268px', padding: '20px', borderRadius: '16px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.15)'}} id='accordionPanelsStayOpenExample'>
                  <p style={{ fontWeight: 'bold'}}>Filter</p>
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
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SearchFlight
