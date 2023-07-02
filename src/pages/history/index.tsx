import type { ReactElement } from 'react'
import DefaultLayout from '@/layouts/default'
import Link from 'next/link'
import { faArrowLeft, faClock, faFilter, faGlobe, faLocationDot, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const History = (): ReactElement => {
  return (
    <main>
      <div className='w-full px-0 md:px-[5%] lg:px-[15%] shadow-sm'>
				<h2 className='font-extrabold text-base md:text-base lg:text-lg my-2 md:my-4 lg:my-7'>Riwayat Pemesanan</h2>
				<div className='w-full p-3 flex justify-between items-center bg-purple-500 rounded-0 md:rounded-xl mr-2'>
					<div>
						<Link href='/' className='flex items-center text-white'>
							<FontAwesomeIcon icon={faArrowLeft} className='mr-2 text-sm md:text-base lg:text-base' />
							<p className='text-sm md:text-base lg:text-base'>Beranda</p>
						</Link>
					</div>
					<div className='flex text-white justify-between items-center'>
						<div className='px-2 py-0.5 mr-2 flex items-center border-2 border-slate-100 rounded-xl'>
							<FontAwesomeIcon icon={faFilter} className='mr-2' />
							<p className='text-sm md:text-base lg:text-base'>Filter</p>	
						</div>
						<div className='px-2 py-0 border-2 border-slate-100 rounded-xl'>
							<FontAwesomeIcon icon={faMagnifyingGlass} className='text-slate-100 text-sm md:text-base lg:text-base' />
						</div>
					</div>
				</div>
			</div>
			<div className='w-full flex justify-center px-0 md:px-[5%] lg:px-[15%] p-3'>
				<div className='w-fit md:w-1/2 p-2'>
					<div>
						<h3 className='font-extrabold text-md mb-4'>Maret 2023</h3>
						<div className='p-2 mb-3 border-2 border-gray-300 rounded-xl w-fit md:w-full'>
							<div className='px-2 md:px-3 py-0.5 w-fit bg-green-500 rounded-xl'>
								<p className='text-white text-xs md:text-sm'>Issued</p>
							</div>
							<div>
								<div className='p-2 flex flex-col md:flex-row md:justify-between border-b-2 border-slate-300'>
									<div className='flex items-center'>
										<div className='mr-2 text-slate-500'><FontAwesomeIcon icon={faLocationDot} /></div>
										<div className='flex mb-1 md:mb-0 flex-col sm:flex-row md:flex-col'>
											<p className='font-extrabold text-xs mr-2 md:mr-0 md:text-sm'>Jakarta</p>
											<p className='font-semibold text-xs mr-2 md:mr-0'>5 Maret 2023</p>
											<p className='font-semibold text-xs mr-2 md:mr-0'>19.00</p>
										</div>
									</div>
									<div className='flex justify-start mb-1 md:mb-0 md:justify-center items-center'>
										<div className='flex items-center justify-start md:justify-center'>
											<FontAwesomeIcon icon={faClock} className='mr-2 text-xs text-slate-500' />
											<p className='text-xs'>4h 0m</p>
										</div>
									</div>
									<div className='flex items-center'>
										<div className='mr-2 text-slate-500'><FontAwesomeIcon icon={faLocationDot} /></div>
										<div className='flex flex-col sm:flex-row md:flex-col'>
											<p className='font-extrabold text-xs mr-2 md:mr-0 md:text-sm'>Melbourne</p>
											<p className='font-semibold text-xs mr-2 md:mr-0'>5 Maret 2023</p>
											<p className='font-semibold text-xs mr-2 md:mr-0'>21.10</p>
										</div>
									</div>
								</div>
								<div className='p-2 flex flex-col md:flex-row md:justify-between'>
									<div>
										<p className='font-extrabold text-xs mr-2 md:mr-0 md:text-sm'>Booking Code :</p>
										<p className='font-semibold text-xs mr-2 md:mr-0'>6723y2GHK</p>
									</div>
									<div>
										<p className='font-extrabold text-xs mr-2 md:mr-0 md:text-sm'>Class :</p>
										<p className='font-semibold text-xs mr-2 md:mr-0'>Economy</p>
									</div>
									<div>
										<p className='text-base md:text-lg font-bold text-purple-800'>IDR 9.850.000</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className='p-2 ml-1 w-1/2'>
					<div>
						<div className='flex justify-between items-center'>
							<h2 className='py-2 font-extrabold text-sm md:text-lg'>Detail Pesanan</h2>
							<div className='px-2 md:px-3 py-0.5 w-fit bg-green-500 rounded-xl'>
								<p className='text-white text-xs md:text-sm'>Issued</p>
							</div>
						</div>
						<div>
							<p className='py-2 text-sm md:text-md'>Booking Code: <span className='py-2 font-extrabold text-sm text-purple-800 md:text-md'>6723y2GHK</span></p>	
						</div>	
						<div>
							<div className='m-2'>
								<div className='flex justify-between'>
									<p className='font-extrabold text-xs md:text-sm'>07.00</p>
									<p className='font-semibold text-xs text-purple-400'>Keberangkatan</p>
								</div>
								<p className='font-normal text-xs md:text-sm'>3 Maret 2023</p>
								<p className='font-medium text-xs md:text-sm'>Soearno Hatta - Terminal 1A Domestik</p>
							</div>
							<div className='mb-3'>
								<div className='flex mx-2 pb-2 border-y-2 border-slate-300'>
									<div className='w-6 mr-2 flex items-center'>
										<FontAwesomeIcon icon={faGlobe} className='text-[#ffd900ef] text-lg' />
									</div>
									<div>
										<div className='py-2'>
											<p className='font-extrabold text-sm md:text-md'>Jet Air - Economy</p>
											<p className='font-extrabold text-sm md:text-md'>JT - 203</p>
										</div>
										<div>
											<p className='font-extrabold text-xs md:text-sm'>Informasi :</p>
											<p className='text-xs md:text-sm'>Baggage 20 kg</p>
											<p className='text-xs md:text-sm'>Cabbin Baggage 7 kg</p>
											<p className='text-xs md:text-sm'>In Flight Entertainment</p>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className='p-2'>
							<div className='pb-2'>
								<div className='flex justify-between'>
									<p className='font-extrabold text-xs md:text-sm'>11.00</p>
									<p className='font-semibold text-xs text-purple-400'>Kedatangan</p>
								</div>
								<p className='font-normal text-xs md:text-sm'>3 Maret 2023</p>
								<p className='font-medium text-xs md:text-sm'>Melbourne International Airport</p>
							</div>
						</div>
						<div className='p-2'>
							<div className='py-2 border-y-2 border-slate-300'>
								<p className='font-extrabold text-sm md:text-md'>Rincian Harga</p>
								<div className='flex justify-between mb-1'>
									<p className='font-medium text-sm md:text-md'>2 Adults</p>
									<p className='font-medium text-sm md:text-md'>IDR 9.550.000</p>
								</div>
								<div className='flex justify-between mb-1'>
									<p className='font-medium text-sm md:text-md'>1 Baby</p>
									<p className='font-medium text-sm md:text-md'>IDR 0</p>
								</div>
								<div className='flex justify-between mb-1'>
									<p className='font-medium text-sm md:text-md'>Tax</p>
									<p className='font-medium text-sm md:text-md'>IDR 300.000</p>
								</div>
							</div>
						</div>
						<div className='flex justify-between p-2'>
							<p className='font-extrabold text-md md:text-lg lg:text-xl'>Total</p>
							<p className='font-extrabold text-md md:text-lg lg:text-xl text-purple-700'>IDR 9.850.000</p>
						</div>
					</div>
					<div className='p-3 bg-purple-700 rounded-xl text-center'>
						<p className='text-white text-lg font-semibold'>Cetak Tiket</p>
					</div>
				</div>
			</div>
    </main>
  )
}

History.getLayout = function getLayout (page: ReactElement) {
  return (
    <DefaultLayout>
      {page}
    </DefaultLayout>
  )
}

export default History
