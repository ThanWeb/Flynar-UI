import { type ReactElement } from 'react'
import 'flowbite/dist/flowbite.min.css'
import Image from 'next/image'

const AccordionTicket = (): ReactElement => {
  return (
    <>
      <div id='accordion-collapse' data-accordion='collapse' className='w-[657px] h-[127px] ms-[555px] mt-[173px]'>
        <h2 id='accordion-collapse-heading-1'>
          <button type='button' className='flex items-center justify-between w-full p-5 font-medium text-left border border-b-1 border-gray-200 rounded-t-xl focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800' data-accordion-target='#accordion-collapse-body-1' aria-expanded='true' aria-controls='accordion-collapse-body-1'>
            <div className='flex items-center'>
              <Image src='/images/logoPesawat.svg' width={30} height={30} alt='logo'/>
              <div className='ms-3'>
                <p className='text-xs font-semibold'>Jet Air - Economy</p>
                <div className='flex items-center'>
                  <p className='text-sm mt-3 font-bold'>07:00 <br /> <span className='text-xs'>JKT</span></p>
                  <div className='ml-auto flex items-center'>
                    <div className='relative'>
                      <p className='absolute -top-6 text-xs left-1/2 transform -translate-x-1/2'>4h 0m</p>
                      <Image src='/icons/panah.svg' width={200} height={50} alt='logo' className='ms-4'/>
                      <p className='absolute left-1/2 transform -translate-x-1/2 bottom-0 -mb-6 text-xs'>Direct</p>
                    </div>
                    <p className='text-sm mt-3 font-bold ml-2'>11:00 <br /> <span className='text-xs'>MLB</span></p>
                    <Image src='/icons/koper.svg' width={30} height={30} alt='logo' className='ml-7'/>
                    <div className='ml-14'>
                      <p className='font-bold text-purple-800'>IDR 4.950.000</p>
                      <button className='text-xs bg-[#4B1979] w-[100px] h-8 py-1 rounded-xl text-white px-2 mt-1 font-bold'>Pilih</button>
                    </div>
                  </div>
                </div>

              </div>
            </div>
            <svg data-accordion-icon className='w-6 h-6 rotate-180 shrink-0' fill='currentColor' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'><path fill-rule='evenodd' d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z' clip-rule='evenodd'></path></svg>
          </button>
        </h2>
        <div id='accordion-collapse-body-1' className='hidden' aria-labelledby='accordion-collapse-heading-1'>
          <div className='p-5 border border-b-1 border-gray-200 dark:border-gray-700 dark:bg-gray-900'>
            <p className='text-purple-900 text-sm font-bold'>Detail Penerbangan</p>
            <div>
              <p className='text-sm mt-2'><span className='font-bold'>07:00</span> <span className='ms-[470px] text-xs text-violet-500 font-bold'>Keberangkatan</span> <br /> 3 Maret 2023 <br /> Soekarno Hatta - Terminal 1A Domestik </p>
              <hr className='w-[400px] my-3 ms-24'/>
            </div>
            <div className='flex'>
              <Image src='/images/logoPesawat.svg' width={30} height={30} alt='logo'/>
              <p className='ms-4 leading-tight text-sm mt-2'><span className='font-bold'>Jet Air - Economy <br /> JT - 203 <br /> <br /> Informasi: <br /></span> Baggage 20 kg <br /> Cabin baggage 7 kg <br /> In Flight Entertainment</p>
            </div>
            <hr className='w-[400px] my-3 ms-24'/>
            <p className='text-sm mt-2'><span className='font-bold'>11:00</span> <span className='ms-[470px] text-xs text-violet-500 font-bold'>Kedatangan</span> <br /> 3 Maret 2023 <br /> Melbourne International Airport </p>
          </div>
        </div>
      </div>

    </>
  )
}

export default AccordionTicket
