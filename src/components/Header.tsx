import { useState, type ReactElement } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRightToBracket, faBars, faBell, faMagnifyingGlass, faUser } from '@fortawesome/free-solid-svg-icons'
import Image from 'next/image'
import Link from 'next/link'

const Header = (): ReactElement => {
  const [isLoggedIn, setIsLoggedIn] = useState(true)

  return (
    <>
      <header>
        <nav className='shadow-md'>
          <div className='flex items-center justify-between px-[5%] py-2'>
            <div className='flex items-center'>
              <Image src='/assets/logoFlynarbaruCrop.png' width={98} height={53} alt='' className='w-12 xl:w-20 lg:w-16 md:w-14 sm:w-12 object-contain mr-8' />
              <form className='flex items-center'>
                <div className='bg-gray-200 rounded-lg'>
                  <input
                    className='border-0 w-28 h-8 px-4 text-black bg-transparent outline-none placeholder:text-sm xl:w-64 xl:h-10 lg:w-64 lg:h-8 lg:placeholder:text-md md:w-64 md:h-8 md:placeholder:text-md sm:w-48 sm:placeholder:text-sm'
                    type='text'
                    placeholder='Cari di sini..'
                  />
                  <button className='border-0 bg-transparent' type='submit'>
                    <FontAwesomeIcon icon={faMagnifyingGlass} className='text-slate-400 pr-2' />
                  </button>
                </div>
              </form>
            </div>
            <div>
              {isLoggedIn ?(
                <div className='headerLogin flex justify-between items-center w-20 md:w-24'>
                <Link href=''>
                  <FontAwesomeIcon icon={faBars} className='text-gray-500'/>
                </Link>
                <Link href=''>
                  <FontAwesomeIcon icon={faBell} className='text-gray-500'/>
                  </Link>
                <Link href=''>
                  <FontAwesomeIcon icon={faUser} className='text-gray-500'/>
                </Link>
              </div>
              ) : (
                <div>
                <Link href='/login' className='headerNonLogin flex items-center justify-center px-3 py-2 rounded-md font-normal text-sm text-white bg-purple-700'>
                  <FontAwesomeIcon icon={faArrowRightToBracket} className='mr-1' /> <p className='hidden xl:block lg:block md:block sm:block' >Masuk</p>
                </Link>
              </div>
              )}
            </div>
          </div>
        </nav>
      </header>
    </>
  )
}

export default Header
