import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell } from '@fortawesome/free-solid-svg-icons'

const Notifications = (): ReactElement => {
  return (
    <div>
      <div className='w-[780px] sm:w-3/5 w-11/12 mx-auto p-[50px] border-b-2 shadow-b'>
        <div className=''>
          <div><FontAwesomeIcon className='bg-violet text-white p-[5px] rounded-[100%]' icon={faBell}/></div>
          <div>
            <div className='flex justify-between text-abuTua'>
              <p>Promosi</p>
              <p>20 Maret, 14:04</p>
            </div>
            <b>Dapatkan Potongan 50% Tiket!</b>
            <p className='text-abuTua'>Syarat dan Ketentuan berlaku!</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Notifications
