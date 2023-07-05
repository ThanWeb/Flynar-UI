import type { ReactElement } from 'react'
import Image from 'next/image'
import { FiLogIn, FiUser, FiList, FiBell } from 'react-icons/fi'
import Link from 'next/link'

interface IHeaderProps {
  isLoggedIn: boolean
  login: () => Promise<void>
}

const Header = ({ isLoggedIn, login }: IHeaderProps): ReactElement => {
  return (
    <>
      <header className='flex w-full h-fit border-b-2 py-1 md:py-2 lg:py-4 lg:px-0'>
        <div className='container px-[2%] lg:px-[5%] mx-auto flex justify-between h-12 items-center'>
          <Link href='/'>
            <Image src='/images/flynar-logo-crop.png' width={100} height={100} loading='lazy' alt='Flynar Logo' className='w-14 xl:w-20 lg:w-16 md:w-16'/>
          </Link>
          {
            isLoggedIn
              ? <div className='flex gap-x-4 h-full py-3'>
                <Link href='/history' className='h-full'>
                  <FiList className='h-full w-full' />
                </Link>
                <Link href='/notification' className='h-full'>
                  <FiBell className='h-full w-full' />
                </Link>
                <Link href='/account' className='h-full'>
                  <FiUser className='h-full w-full' />
                </Link>
              </div>
              : <Link href='/login'>
                <button onClick={() => { void login() }} className='bg-blue-600 flex items-center gap-x-2 text-white p-2 px-4 rounded-lg'>
                  <FiLogIn className='h-full'/>
                  <span className='hidden xl:block lg:block md:block sm:block'>Masuk</span>
                </button>
              </Link>
          }
        </div>
      </header>
    </>
  )
}

export default Header
