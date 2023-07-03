import type { ReactElement } from 'react'
import React from 'react'
import Header from '@/components/Header'
import BadgeBeranda from '@/components/BadgeBeranda'
import Link from 'next/Link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserEdit, faGear, faSignOut } from '@fortawesome/free-solid-svg-icons'

const Setting = (): ReactElement => {
  return (
    <div>
      <Header/>
      <div className='container flex justify-center pt-[30px] pb-[20px] border-b-2 border-abu shadow-lg'>
        <div className='badge w-[980px]'>
          <div className='profile text-medium font-bold leading-short'>
                Akun
          </div>
          <BadgeBeranda/>
        </div>
      </div>
      <div className='container flex justify-center pt-[30px] pb-[20px]'>
        <div className='flex gap-16'>
          <div className='account-edit-option flex flex-col'>
            <div className='w-[328px]  border-b-2 border-abumuda'>
              <Link href={'/account/editAccount'}><button className='p-[15px]'><FontAwesomeIcon className='pr-[5px] text-darkPurple' icon={faUserEdit} /> Ubah Profil </button></Link>
            </div>
            <div className='w-[328px]  border-b-2 border-abumuda'>
              <Link href={'/account/editAccount'}><button className='p-[15px]'><FontAwesomeIcon className='pr-[5px] text-darkPurple' icon={faGear} /> Pengaturan Akun </button></Link>
            </div>
            <div className='w-[328px]  border-b-2 border-abumuda'>
              <Link href={'/'}><button className='p-[15px]'><FontAwesomeIcon className='pr-[5px] text-darkPurple' icon={faSignOut} /> Keluar </button></Link>
            </div>
          </div>
          <div className='setting w-[518px] h-[462px] py-[6px] px-[16px]'>
            <div className='shadow border-2'>
                cek
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Setting
