import { useState, type ReactElement } from 'react'
import Image from 'next/image'

const tiketSuccess = (): ReactElement => {
  return (
    <>
      <button className='bg-[#73CA5C] rounded-xl text-white text-xs p-2 mx-24 mt-5 md:hidden'>Issued</button>
      <div className='box-border w-[343px] h-[310px] rounded-lg border-2 border-[#4B1979/50] mt-10 mx-24 px-4 py-3 md:hidden'>
        <div>
          <p className='text-sm mt-2'><span className='font-bold'>07:00</span><span className='text-[#A06ECE] font-bold ms-40'>Keberangakatan</span><br /> 3 Maret 2023 <br /> Soekarno Hatta - Terminal 1A Domestik </p>
          <hr className='w-[250px] my-2 ms-8'/>
        </div>
        <div className='flex'>
          <Image src='/images/logoPesawat.svg' width={30} height={30} alt='logo'/>
          <p className='font-bold ms-3 text-xs'>Jet Air - Economy <br /> JT - 203 <br /> <br /> Informasi: <br /> <span className='text-[#4B1979]'>Penumpang 1: Mr. Harry Potter</span><br /> <p>ID: 1234567</p> <span className='text-[#4B1979]'>Penumpang 2: Miss Hermione</span> <p>ID: 789658</p></p>
        </div>
        <hr className='w-[250px] my-2 ms-8'/>
        <div>
          <p className='text-sm mt-2'><span className='font-bold'>11:00</span><span className='text-[#A06ECE] font-bold ms-40'>Kedatangan</span><br /> 3 Maret 2023 <br /> Melbourne International Airport </p>
        </div>
      </div>
      <div className='ms-24 mt-2 md:hidden'>
        <p className='font-bold'>Rincian Harga</p>
        <p>2 Adults <span className='ms-40'>IDR 9.550.000</span></p>
        <p>1 Baby <span className='ms-56'>IDR 0</span></p>
        <p>Tax <span className='ms-48'>IDR 300.000</span></p>
        <p className='font-bold'>Total <span className='ms-44'>IDR 9.850.000</span></p>
        <button className='p-2 bg-[#7126B5] mt-3 text-white rounded-xl w-[343px]'>Beranda</button>
      </div>
    </>
  )
}

export default tiketSuccess
