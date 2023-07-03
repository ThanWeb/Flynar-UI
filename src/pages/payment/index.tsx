import { useState, type ReactElement } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faChevronDown, faChevronRight, faChevronUp, faLocationDot } from '@fortawesome/free-solid-svg-icons'
import Image from 'next/image'

const Payment = (): ReactElement => {
  const [clicked, setClicked] = useState(false)
  const [showForm, setShowForm] = useState(false)

  const handleClick = (): void => {
    setClicked(!clicked)
    setShowForm(!showForm)
  }

  const buttonClassName = `text-sm py-2 mt-3 ms-24 text-white w-[340px] rounded-lg ${clicked ? 'bg-[#7126B5]' : 'bg-[#3C3C3C]'}`
  return (
    <>
      {/* Header pas tampilan web */}
      <div className='border-b-2 mt-14 hidden md:block'></div>
      <div className='ms-64 mt-7 hidden md:block'>
        <p className='font-bold text-xl'> Isi Data Diri <FontAwesomeIcon icon={faChevronRight} style={{ color: '#8a8a8a' }} /> Bayar <FontAwesomeIcon icon={faChevronRight} style={{ color: '#8a8a8a' }} /> <span className='text-zinc-500'>Selesai</span> </p>
      </div>
      <div className='hidden md:block w-[936px] h-[40px] ms-64 px-4 py-[5px] mt-2 bg-[#FF0000] rounded-xl'>
        <p className=' text-white text-center mt-0.5'>Selesaikan Pembayaran sampai 10 Maret 2023 12:00</p>
      </div>
      <div className='border-b-2 mt-2'></div>
      <h1 className='text-sm bg-[#4B1979] text-white w-[500px] px-4 py-3 md:hidden'><FontAwesomeIcon icon={faArrowLeft} className='pe-2' style={{ color: '#ffffff' }} /> Proses Pembayaran</h1>
      <div className='box-border w-[340px] h-50 rounded-lg border-2 border-[#4B1979/50] mt-10 mx-24 px-4 py-3 md:hidden'>
        <h1 className='text-sm'>Passengers: <span className='text-[#4B1979] font-bold'>2 Adults, 1 Baby</span></h1>
        <div className='pt-3 flex'>
          <FontAwesomeIcon icon={faLocationDot} className='pt-1' style={{ color: '#8a8a8a' }} />
          <p className='text-sm ps-2 me-[18px]'><span className='font-bold'>Jakarta</span> <br /> 5 Maret 2023 <br /> 19.10</p>
          <p className='text-xs mt-2'>4h 0m</p>
          <Image src='/icons/arrow.svg' alt='panah' width={40} height={8} className='-ms-8 me-[18px]'></Image>
          <FontAwesomeIcon icon={faLocationDot} className='pt-1' style={{ color: '#8a8a8a' }} />
          <p className='text-sm ps-2 me-[18px]'><span className='font-bold'>Melbourne</span> <br /> 5 Maret 2023 <br /> 21.10 </p>
        </div>
        <hr className='my-2'/>
        <div className='flex'>
          <p className='text-xs me-2'><span className='font-bold'>Booking Code:</span> <br /> 453653657</p>
          <p className='text-xs'><span className='font-bold'>Class:</span><br />Economy</p>
          <p className='text-xs ms-20'><span className='font-bold ms-9'>TOTAL</span> <br /> <span className='text-purple-900'>IDR 9.850.000</span></p>
        </div>
      </div>
      <div className='grid grid-cols-2 gap-4'>
        <div className='md:col-span-1'>
          <div className='flex-col md:ms-[208px] container'>
            <h1 className='ms-24 mt-9 font-bold text-xl hidden md:block'>Isi Data Pembayaran</h1>
            <button className='bg-[#3C3C3C] text-sm py-2 mt-7 ms-24 text-white w-[340px] rounded-lg md:mt-3'>Gopay <FontAwesomeIcon icon={faChevronDown} className='ms-[250px]' style={{ color: '#ffffff' }} /></button>
            <button className='bg-[#3C3C3C] text-sm py-2 mt-7 ms-24 text-white w-[340px] rounded-lg md:mt-3 hidden md:block'>Virtual Accout<FontAwesomeIcon icon={faChevronDown} className='ms-[210px]' style={{ color: '#ffffff' }} /></button>
            <button onClick={handleClick} className={buttonClassName}>Credit Card <FontAwesomeIcon icon={clicked ? faChevronUp : faChevronDown} className='ms-[220px]' style={{ color: '#ffffff' }} /></button>
            {showForm && (
              <div className='mt-5 ms-24 text-sm w-[340px]'>
                <div className='mb-4'>
                  <label htmlFor='cardNumber' className='font-bold'>Card number</label> <br />
                  <input type='number' className='border-b-2 mt-1 w-[340px]' placeholder='4480 0000 0000 0000' />
                </div>
                <div className='mb-4'>
                  <label htmlFor='cardHolderName' className='font-bold'>Card holder name</label> <br />
                  <input type='text' className='border-b-2 mt-1 w-[340px]' placeholder='John Doe' />
                </div>
                <div className='flex gap-12'>
                  <div>
                    <label htmlFor='cvv' className='font-bold'>CVV</label> <br />
                    <input type='number' className='border-b-2 mt-1 w-[147px]' placeholder='000' />
                  </div>
                  <div>
                    <label htmlFor='expiryDate' className='font-bold'>Expiry date</label> <br />
                    <input type='text' className='border-b-2 mt-1 w-[147px]' placeholder='07/24' />
                  </div>
                </div>
                <div className='mt-8 flex gap-2 w-[340px] justify-center'>
                  <Image src='/images/mastercard.svg' width={30} height={30} alt='mastercard'/>
                  <Image src='/images/visa.svg' width={30} height={30} alt='visa'/>
                  <Image src='/images/amex.svg' width={30} height={30} alt='amex'/>
                  <Image src='/images/paypal.svg' width={30} height={30} alt='paypal'/>
                </div>
                <button className='bg-[#7126B5] text-sm py-2 mt-7 text-white w-[340px] rounded-xl'>Bayar</button>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className='md:col-span-1'>
        <div className='ms-[820px] -mt-[480px] hidden md:block'>
          <h1 className='font-bold text-lg'>Booking Code: <span className='text-[#7126B5]'>6723y2GHK</span></h1>
          <p className='text-sm'><span className='font-bold'>07:00</span> <span className='text-xs text-[#A06ECE] font-bold ms-60'>Keberangkatan</span> <br /> 3 Maret 2023 <br /> Soekarno Hatta - Terminal 1A Domestik </p>
          <div className='border-b-2 mt-2 w-[350px] mx-2'></div>
          <div className='flex flex-row'>
            <Image src='/images/logoPesawat.svg' width={30} height={30} alt='logo'/>
            <p className='ms-4 leading-tight text-sm mt-2'><span className='font-bold'>Jet Air - Economy <br /> JT - 203 <br /> <br /> Informasi: <br /></span> Baggage 20 kg <br /> Cabin baggage 7 kg <br /> In Flight Entertainment</p>
          </div>
          <div className='border-b-2 mt-2 w-[350px] mx-2'></div>
          <p className='text-sm mt-2'><span className='font-bold'>11:00</span> <span className='text-xs text-[#A06ECE] font-bold ms-60'>Kedatangan</span> <br /> 3 Maret 2023 <br /> Melbourne International Airport </p>
          <div className='border-b-2 mt-2 w-[350px] mx-2'></div>
          <div className='flex flex-row'>
            <p className='text-sm mt-2'><span className='font-bold'>Rincian Harga</span> <br /> 2 Adults <br /> 1 Baby <br /> Tax</p>
            <p className='text-sm mt-6 ms-40'>IDR 9.550.000 <br /> IDR 0 <br /> IDR 300.000</p>
          </div>
          <div className='border-b-2 mt-2 w-[350px] mx-2'></div>
          <p className='font-bold mt-2'>Total <span className='text-[#7126B5] ms-52'>IDR 9.850.000</span></p>
        </div>
      </div>
    </>
  )
}

export default Payment
