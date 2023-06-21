import type { ReactElement } from 'react'
import Header from '../../../components/Header'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const OTP = (): ReactElement => {
  return (
    <div>
      <Header/>
      <div className='d-flex justify-content-center'>
        <div id='back-button' className='w-50 border border-primary pt-4'>
          <button style={{ background: 'none', border: 'none', paddingRight: '15px'}}><FontAwesomeIcon icon={faArrowLeft} style={{ color: 'black', display: 'flex', alignItems: 'center' }}/></button>
          <div className='d-flex justify-content-center'>
            <div className='w-75 border border-primary '>
              <b>Masukkan OTP</b>
              <div className='d-flex justify-content-center pt-4'>Ketik 6 digit kode yang dikirimkan ke J*****@gmail.com</div>
              <div className='d-flex justify-content-center pt-5'>
                <button style={{ width: '568px', height: '48px', borderRadius: '16px', padding: '12px, 24px, 12px, 24px', fontSize: '14px', backgroundColor: '#7126B5', border: 'none', color: 'white'}}>Simpan</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OTP
