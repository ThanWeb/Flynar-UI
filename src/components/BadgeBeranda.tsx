import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faSearch, faFilter } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/Link'

const BadgeBeranda = (): ReactElement => {
  return (
    <div>
      <div className='pt-[50px] pr-[10px] pl-[10px] flex justify-center items-center gap-[20px]'>
        <span className='flex bg-violet text-white text-base font-medium border rounded-md items-center w-[777px] h-[50px]'>
          <Link href={'/'}><button className='px-[15px]' ><FontAwesomeIcon icon={faArrowLeft} /></button></Link>
            Beranda </span>
        <div className='border-2 border-darkPurple items-center flex rounded-lg h-[32px]'>
          <button className='px-[15px]' ><FontAwesomeIcon className='text-abuTua pr-[8px]' icon={faFilter} />Filter</button>
        </div>
        <div className=''>
          <button><FontAwesomeIcon className='' icon={faSearch}/></button>
        </div>
      </div>
    </div>
  )
}

export default BadgeBeranda

// import React, { ReactElement } from 'react'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faArrowLeft, faSearch } from '@fortawesome/free-solid-svg-icons'
// import Link from 'next/Link'

// const badgeBeranda = (): ReactElement => {
//   return (
//     <div>
      // <div className='pt-[50px] pr-[10px] pl-[10px] flex justify-center items-center gap-[20px]'>
      //   <span className='flex bg-violet text-white text-base font-medium border rounded-md items-center w-[777px] h-[50px]'>
      //     <Link href={'/'}><button className='px-[15px]' ><FontAwesomeIcon icon={faArrowLeft} /></button></Link>
      //       Beranda </span>
      //   <div className='border-2 border-darkPurple items-center flex rounded-lg h-[32px]'>
      //     <button className='px-[15px]' ><FontAwesomeIcon className='text-abuTua pr-[8px]' icon={faFilter} />Filter</button>
      //   </div>
      //   <div className=''>
      //     <button><FontAwesomeIcon className='' icon={faSearch}/></button>
      //   </div>
      // </div>
//     </div>
//   )
// }

// export default badgeBeranda
