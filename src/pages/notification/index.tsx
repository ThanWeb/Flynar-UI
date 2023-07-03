import type { ReactElement } from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import Notifications from '../../components/Notifications'
import BadgeBeranda from '../../components/BadgeBeranda'
import React from 'react'

const Notifikasi = (): ReactElement => {
  return (
    <div>
      <Header/>
      <div className='container flex justify-center pt-[30px] pb-[20px] border-b-2 border-abu shadow-lg'>
        <div className='badge w-[980px]'>
          <div className='notifikasi text-medium font-bold leading-short'>
                Notifikasi
          </div>
          <BadgeBeranda/>
        </div>
      </div>
      <Notifications/>
      <Footer/>
    </div>
  )
}

export default Notifikasi
