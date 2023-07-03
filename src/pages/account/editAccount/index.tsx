import type { ReactElement } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Notifications from '@/components/Notifications'
import BadgeBeranda from '@/components/BadgeBeranda'
import React from 'react'
import Link from 'next/Link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserEdit, faGear, faSignOut } from '@fortawesome/free-solid-svg-icons'

const Akun = (): ReactElement => {
  return (
    <div>
      <Header/>
      <div className='container flex justify-center pt-[30px] pb-[20px] border-b-2 border-abu shadow-lg'>
        <div className='badge w-[980px]'>
          <div className='akun text-medium font-bold leading-short'>
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
          <div className='editable-account-option w-[518px] h-[462px] py-[6px] px-[16px]'>
            <div className='shadow border-2'>
              <div className='p-[16px]'>
                <p className='text-medium font-bold'>Ubah Data Profil</p>
                <div className='py-[20px]'>
                  <div className='bg-violet text-white px-[16px] py-[8px] rounded-t-[10px]'>Data Diri</div>
                  <div className='p-[10px]'>
                    <form>
                      <div className='mb-6'>
                        <label className='block mb-2 text-[14px] text-brightPurple font-bold text-gray-900 dark:text-white'>Nama Lengkap </label>
                        <input type='name' id='name' className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-[4px] focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' placeholder='' required/>
                      </div>
                      <div className='mb-6'>
                        <label className='block mb-2 text-[14px] text-brightPurple font-bold text-gray-900 dark:text-white'>Nomor Telepon</label>
                        <input type='tel' id='tel' className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-[4px] focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' required/>
                      </div>
                      <div className='mb-6'>
                        <label className='block mb-2 text-[14px] text-brightPurple font-bold text-gray-900 dark:text-white'>Email</label>
                        <input type='email' id='email' className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-[4px] focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' required/>
                      </div>
                      <div className='flex justify-center'>
                        <button type='submit' className='text-white bg-darkPurple hover:bg-violet focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'>Submit</button>
                      </div>
                    </form>
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

export default Akun
