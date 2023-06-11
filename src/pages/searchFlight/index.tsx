import type { ReactElement } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCube, faHeart, faDollarSign, faArrowLeft, faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons'
import { IconContext } from 'react-icons';
import Header from '../../components/Header'
import 'bootstrap/dist/css/bootstrap.min.css'

const SearchFlight = (): ReactElement => {
  return (
    <div>
      <Header />
      <div style={{ padding: ' 50px '}} className='d-flex justify-content-center'>
        <div>
          <div className='d-flex gap-3' style={{ paddingBottom: '20PX'}}>
            <span className='badge text' style={{ width: '700px', height: '50px', display: 'flex', alignItems: 'center', background: '#A06ECE', borderRadius: '12px', fontWeight: '500', fontSize: '16px', lineHeight: '24px' }}>
              <button style={{ background: 'none', border: 'none', paddingRight: '15px'}}><FontAwesomeIcon icon={faArrowLeft} style={{ color: 'white', padding: '5px', display: 'flex', alignItems: 'center' }} /></button>
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
              <button style={{ width: '108px', height: '32px', border: '1px solid #A06ECE', borderRadius: '16px ', color: '#7126B5', fontSize: '12px', marginLeft: 'auto' }}><FontAwesomeIcon icon={faArrowUp} style={{ color: '#7126B5'}} /><FontAwesomeIcon icon={faArrowDown} style={{ color: '#7126B5'}}/>Termurah</button>
            </div>
            <div className='fiter-box'>
              <div className='accordion' style={{ width: '268px', padding: '20px', borderRadius: '16px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.15)'}} id='accordionPanelsStayOpenExample'>
                <p style={{ fontWeight: 'bold'}}>Filter</p>
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
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SearchFlight
