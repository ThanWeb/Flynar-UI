import type { ReactElement } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRightToBracket, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import Image from 'next/image'
import Link from 'next/link'

const Header = (): ReactElement => {
  return (
    <>
      <header>
      <nav className='shadow-md'>
          <div className='flex items-center justify-between px-[5%] p-2'>
            <div className='flex items-center'>
              <Image src='/assets/logoFlynarbaru.png' width={98} height={53} alt='' className='object-contain mr-8' />
              <form className='flex items-center'>
                <div className='bg-gray-300 rounded-lg'>  
                  <input
                    className='border-0 w-64 h-10 px-4 text-black bg-transparent outline-none'
                    type='text'
                    placeholder='Cari di sini..'
                  />
                  <button className='border-0 bg-transparent' type='submit'>
                    <FontAwesomeIcon icon={faMagnifyingGlass} className='text-slate-400 pr-2' />
                  </button>
                </div>
              </form>
            </div>
            <Link href='/login' className='flex items-center justify-center px-5 py-2 rounded-md font-medium text-base text-white bg-purple-700'>
              <FontAwesomeIcon icon={faArrowRightToBracket} className='me-2' /> Masuk
            </Link>
          </div>
        </nav>
      </header>
    </>
  )
}

export default Header
