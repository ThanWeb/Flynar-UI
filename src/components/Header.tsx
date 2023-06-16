import type { ReactElement } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRightToBracket, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import Image from 'next/image'
import Link from 'next/link'
import 'bootstrap/dist/css/bootstrap.css'

const Header = (): ReactElement => {
  return (
    <>
      <header>
        <nav style={{ boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)' }}>
          <div className='d-flex w-100 align-items-center justify-content-between container' style={{ padding: '12px 0' }}>
            <div className='d-flex align-items-center'>
              <Image src='/assets/logoTiketku.png' width={98} height={53} alt='' className='img-fluid' style={{ marginRight: '34px' }} />
              <form className='d-flex input-group'>
                <input
                  className='border-0'
                  type='text'
                  placeholder='Cari di sini..'
                  style={{
                    width: '400px',
                    height: '48px',
                    color: '#000',
                    backgroundColor: '#EEEEEE',
                    padding: '12px 16px',
                    outline: 'none',
                    borderRadius: '16px 0 0 16px'
                  }}
                />
                <button className='border-0' style={{ backgroundColor: '#EEEEEE', border: '1px solid #D0D0D0', borderRadius: '0 16px 16px 0' }} type='submit'>
                  <FontAwesomeIcon icon={faMagnifyingGlass} className='text-black-50 pe-3'/>
                </button>
              </form>
            </div>
            <Link href='/auth/login' className='d-flex align-items-center justify-content-center' style={{ padding: '12px 16px', borderRadius: '12px', fontWeight: '400', fontSize: '14px', lineHeight: '20px', color: '#fff', textDecoration: 'none', backgroundColor: '#7126B5' }}>
              <FontAwesomeIcon icon={faArrowRightToBracket} className='me-2' /> Masuk
            </Link>
          </div>
        </nav>
      </header>
    </>
  )
}

export default Header
