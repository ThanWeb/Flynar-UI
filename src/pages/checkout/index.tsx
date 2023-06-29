import { useState, type ReactElement } from 'react'
import DefaultLayout from '@/layouts/default'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import CustomSelectTitle from '@/components/CustomSelectTitle'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGlobe } from '@fortawesome/free-solid-svg-icons'

const Checkout = (): ReactElement => {
	const [selectedTitle, setSelectedTitle] = useState<string>('')
  const handleTitleChange = (option: string) => {
    setSelectedTitle(option)
  }

	const [birthDate, setBirthDate] = useState(new Date())
	const [pasporDate, setPasporDate] = useState(new Date())

	const [customerSurname, setCustomerSurname] = useState<string | null>(null)
  const [isClickedCustomerSurname, setIsClickedCustomerSurname] = useState(false)
  const handleClickButtonCustomerSurname = () => {
    setIsClickedCustomerSurname(!isClickedCustomerSurname)
    if (customerSurname === null) {
      setCustomerSurname('')
    } else {
      setCustomerSurname(null)
    }
  }
	const [passengerSurname, setPassengerSurname] = useState<string | null>(null)
  const [isClickedPassengerSurname, setIsClickedPassengerSurname] = useState(false)
  const handleClickButtonPassengerSurname = () => {
    setIsClickedPassengerSurname(!isClickedPassengerSurname)
    if (passengerSurname === null) {
      setPassengerSurname('')
    } else {
      setPassengerSurname(null)
    }
  }
  return (
    <main>
			<div className='px-[15%] py-2 my-2 md:my-4 lg:my-6 shadow-sm'>
				<ul className='flex items-center'>
					<li>
						<a href='' className='font-extrabold text-xs md:text-lg lg:text-lg mr-2'>Isi Data Diri</a>
					</li>
					<li className='flex'>
						<p className='font-extrabold text-xs md:text-lg lg:text-lg text-gray-500 mr-2'>{'>'}</p>
						<a href='' className='font-extrabold text-xs md:text-lg lg:text-lg text-gray-500 mr-2'>Bayar</a>
					</li>
					<li className='flex'>
						<p className='font-extrabold text-xs md:text-lg lg:text-lg text-gray-500 mr-2'>{'>'}</p>
						<a href=''  className='font-extrabold text-xs md:text-lg lg:text-lg text-gray-500 mr-2'>Selesai</a>
					</li>
				</ul>
			</div>
			<div className='mx-[15%] flex flex-col items-center md:flex-col md:items-center lg:flex-row lg:items-start lg:justify-between'>
				<form action='' className='w-11/12 mr-1 md:w-4/5 lg:w-1/2'>
					<div className='p-2 mb-3 border-2 border-gray-300 rounded-md'>
						<h2 className='font-extrabold py-2 text-md md:text-md lg:text-lg'>Isi Data Pemesan</h2>
						<div>
							<div className='bg-gray-800 rounded-t-lg'>
								<p className='p-2 text-white text-normal text-sm md:text-sm lg:text-md'>Data Diri Pemesan</p>
							</div>
							<div className='p-2 text-sm'>
								<div>
									<div className='mb-1'>
										<label htmlFor='nama' className='font-bold text-purple-900 text-sm md:text-sm lg:text-md'>Nama Lengkap</label>
									</div>
									<input className='w-full p-2 border-2 border-gray-200 focus:border-purple-700 rounded-md focus:outline-none' type='text' placeholder='Isi nama' />
								</div>
							</div>
							<div className='p-2 text-sm'>
								<div>
									<div className='mb-1 flex justify-between'>
										<label htmlFor='nama' className='font-bold text-purple-900 text-sm md:text-sm lg:text-md'>Punya Nama Keluarga?</label>
										<div
											className={`w-7 h-4 md:w-7 md:h-4 lg:w-8 lg:h-5 rounded-full relative cursor-pointer ${isClickedCustomerSurname ? 'bg-slate-400' : 'bg-purple-700'}`}
											onClick={handleClickButtonCustomerSurname}
										>
											<span
												className={`w-2.5 h-2.5 md:w-2.5 md:h-2.5 lg:w-3 lg:h-3 rounded-full bg-slate-300 absolute top-1/2 transform -translate-y-1/2  ${
													isClickedCustomerSurname ? 'left-1' : 'right-1'
												}`}
											></span>
										</div>
									</div>
									<input className={`w-full p-2 border-2 border-gray-200 focus:border-purple-700 rounded-md focus:outline-none ${isClickedCustomerSurname ? 'border-slate-100 placeholder:text-slate-200 bg-slate-100' : ''}`} disabled={isClickedCustomerSurname} type='text' placeholder='Nama Keluarga' />
								</div>
							</div>
							<div className='p-2 text-sm'>
								<div>
									<div className='mb-1'>
										<label htmlFor='nama' className='font-bold text-purple-900 text-sm md:text-sm lg:text-md'>No Telpon</label>
									</div>
									<input className='w-full p-2 border-2 border-gray-200 focus:border-purple-700 rounded-md focus:outline-none' type='text' placeholder='08...' />
								</div>
							</div>
							<div className='p-2 text-sm'>
								<div>
									<div className='mb-1'>
										<label htmlFor='nama' className='font-bold text-purple-900 text-sm md:text-sm lg:text-md'>Email</label>
									</div>
									<input className='w-full p-2 border-2 border-gray-200 focus:border-purple-700 rounded-md focus:outline-none' type='text' placeholder='johndoe@gmail.com' />
								</div>
							</div>
						</div>
					</div>
					<div className='p-2 mb-3 border-2 border-gray-300 rounded-md'>
						<h2 className='font-extrabold py-4 text-md md:text-md lg:text-lg'>Isi Data Penumpang</h2>
						<div>
							<div className='bg-gray-800 rounded-t-lg'>
								<p className='p-2 text-white text-normal text-sm md:text-sm lg:text-md'>Data Diri Penumpang 1 - adult</p>
							</div>
							<div className='p-2 text-sm'>
								<div>
									<div className='mb-1'>
										<label htmlFor='nama' className='font-bold text-purple-900 text-sm md:text-sm lg:text-md'>Title</label>
									</div>
									<CustomSelectTitle value={selectedTitle} onChange={handleTitleChange} />
								</div>
							</div>
							<div className='p-2 text-sm'>
								<div>
									<div className='mb-1'>
										<label htmlFor='nama' className='font-bold text-purple-900 text-sm md:text-sm lg:text-md'>Nama Lengkap</label>
									</div>
									<input className='w-full p-2 border-2 border-gray-200 focus:border-purple-700 rounded-md focus:outline-none' type='text' placeholder='Isi nama' />
								</div>
							</div>
							<div className='p-2 text-sm'>
								<div>
									<div className='mb-1 flex justify-between'>
										<label htmlFor='nama' className='font-bold text-purple-900 text-sm md:text-sm lg:text-md'>Punya Nama Keluarga?</label>
										<div
											className={`w-7 h-4 md:w-7 md:h-4 lg:w-8 lg:h-5 rounded-full relative cursor-pointer ${isClickedPassengerSurname ? 'bg-slate-400' : 'bg-purple-700'}`}
											onClick={handleClickButtonPassengerSurname}
										>
											<span
												className={`w-2.5 h-2.5 md:w-2.5 md:h-2.5 lg:w-3 lg:h-3 rounded-full bg-slate-300 absolute top-1/2 transform -translate-y-1/2  ${
													isClickedPassengerSurname ? 'left-1' : 'right-1'
												}`}
											></span>
										</div>
									</div>
									<input className={`w-full p-2 border-2 border-gray-200 focus:border-purple-700 rounded-md focus:outline-none ${isClickedPassengerSurname ? 'border-slate-100 placeholder:text-slate-200 bg-slate-100' : ''}`} disabled={isClickedCustomerSurname} type='text' placeholder='Nama Keluarga' />
								</div>
							</div>
							<div className='p-2 text-sm'>
								<div>
									<div className='mb-1'>
										<label htmlFor='nama' className='font-bold text-purple-900 text-sm md:text-sm lg:text-md'>Tanggal Lahir</label>
									</div>
									<div className=' border-2 border-gray-200 rounded-md focus-within:border-purple-700'>
										<DatePicker dateFormat='dd-MMMM-yyyy' selected={birthDate} onChange={(date:Date) => setBirthDate(date)} className='p-2 focus:outline-none'/>
									</div>
								</div>
							</div>
							<div className='p-2 text-sm'>
								<div>
									<div className='mb-1'>
										<label htmlFor='nama' className='font-bold text-purple-900 text-sm md:text-sm lg:text-md'>Kewarganegaraan</label>
									</div>
									<input className='w-full p-2 border-2 border-gray-200 focus:border-purple-700 rounded-md focus:outline-none' type='text' placeholder='Nama Keluarga' />
								</div>
							</div>
							<div className='p-2 text-sm'>
								<div>
									<div className='mb-1'>
										<label htmlFor='nama' className='font-bold text-purple-900 text-sm md:text-sm lg:text-md'>KTP/Paspor</label>
									</div>
									<input className='w-full p-2 border-2 border-gray-200 focus:border-purple-700 rounded-md focus:outline-none' type='text' placeholder='Nama Negara' />
								</div>
							</div>
							<div className='p-2 text-sm'>
								<div>
									<div className='mb-1'>
										<label htmlFor='nama' className='font-bold text-purple-900 text-sm md:text-sm lg:text-md'>Negara Penerbit</label>
									</div>
									<input className='w-full p-2 border-2 border-gray-200 focus:border-purple-700 rounded-md focus:outline-none' type='text' placeholder='Nama Negara' />
								</div>
							</div>
							<div className='p-2 text-sm'>
								<div>
									<div className='mb-1'>
										<label htmlFor='nama' className='font-bold text-purple-900 text-sm md:text-sm lg:text-md'>Berlaku Sampai</label>
									</div>
									<div className=' border-2 border-gray-200 focus-within:border-purple-700 rounded-md'>
										<DatePicker dateFormat='dd-MMMM-yyyy' selected={pasporDate} onChange={(date:Date) => setPasporDate(date)} className='p-2 focus:outline-none'/>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className='p-2 mb-3 border-2 border-gray-300 rounded-md'>
						<h2 className='font-extrabold py-4 text-md md:text-md lg:text-lg'>Pilih Kursi</h2>
						<div>
							<div className='bg-green-500 rounded-t-lg'>
								<p className='p-2 text-white text-normal text-center text-sm md:text-sm lg:text-md'>Economy - 64 Seats Available</p>
							</div>
							<div>
								<div className='flex justify-center mx-1'>
									<div className='w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 lg:w-10 lg:h-10 m-1 flex justify-center items-center text-[10px] sm:text-sm md:text-md lg:text-lg font-medium lg:font-semibold text-gray-400 rounded-md'>A</div>
									<div className='w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 lg:w-10 lg:h-10 m-1 flex justify-center items-center text-[10px] sm:text-sm md:text-md lg:text-lg font-medium lg:font-semibold text-gray-400 rounded-md'>B</div>
									<div className='w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 lg:w-10 lg:h-10 m-1 flex justify-center items-center text-[10px] sm:text-sm md:text-md lg:text-lg font-medium lg:font-semibold text-gray-400 rounded-md'>C</div>
									<div className='w-3 h-7 sm:w-4 sm:h-8 md:w-5 md:h-9 lg:w-6 lg:h-10 m-1 flex justify-center items-center text-[10px] sm:text-sm md:text-md lg:text-lg font-medium lg:font-semibold text-gray-400 rounded-md'></div>
									<div className='w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 lg:w-10 lg:h-10 m-1 flex justify-center items-center text-[10px] sm:text-sm md:text-md lg:text-lg font-medium lg:font-semibold text-gray-400 rounded-md'>D</div>
									<div className='w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 lg:w-10 lg:h-10 m-1 flex justify-center items-center text-[10px] sm:text-sm md:text-md lg:text-lg font-medium lg:font-semibold text-gray-400 rounded-md'>E</div>
									<div className='w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 lg:w-10 lg:h-10 m-1 flex justify-center items-center text-[10px] sm:text-sm md:text-md lg:text-lg font-medium lg:font-semibold text-gray-400 rounded-md'>F</div>
								</div>
								<div className='flex justify-center mx-1'>
									<div className='w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 lg:w-10 lg:h-10 m-1 flex justify-center items-center text-[10px] sm:text-sm md:text-md lg:text-lg font-medium lg:font-semibold text-slate-50 bg-gray-300 rounded-md'>X</div>
									<div className='w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 lg:w-10 lg:h-10 m-1 flex justify-center items-center text-[10px] sm:text-sm md:text-md lg:text-lg font-medium lg:font-semibold text-slate-50 bg-gray-300 rounded-md'>X</div>
									<div className='w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 lg:w-10 lg:h-10 m-1 flex justify-center items-center text-[10px] sm:text-sm md:text-md lg:text-lg font-medium lg:font-semibold text-slate-50 bg-gray-300 rounded-md'>X</div>
									<div className='w-3 h-7 sm:w-4 sm:h-8 md:w-5 md:h-9 lg:w-6 lg:h-10 m-1 flex justify-center items-center text-[10px] sm:text-sm md:text-md lg:text-lg font-medium lg:font-semibold text-slate-50 bg-gray-300 rounded-md'>1</div>
									<div className='w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 lg:w-10 lg:h-10 m-1 flex justify-center items-center text-[10px] sm:text-sm md:text-md lg:text-lg font-medium lg:font-semibold text-slate-50 bg-gray-300 rounded-md'>X</div>
									<div className='w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 lg:w-10 lg:h-10 m-1 flex justify-center items-center text-[10px] sm:text-sm md:text-md lg:text-lg font-medium lg:font-semibold text-slate-50 bg-gray-300 rounded-md'>X</div>
									<div className='w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 lg:w-10 lg:h-10 m-1 flex justify-center items-center text-[10px] sm:text-sm md:text-md lg:text-lg font-medium lg:font-semibold text-slate-50 bg-gray-300 rounded-md'>X</div>
								</div>
								<div className='flex justify-center mx-1'>
									<div className='w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 lg:w-10 lg:h-10 m-1 flex justify-center items-center text-[10px] sm:text-sm md:text-md lg:text-lg font-medium lg:font-semibold text-slate-50 bg-gray-300 rounded-md'>X</div>
									<div className='w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 lg:w-10 lg:h-10 m-1 flex justify-center items-center text-[10px] sm:text-sm md:text-md lg:text-lg font-medium lg:font-semibold text-slate-50 bg-gray-300 rounded-md'>X</div>
									<div className='w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 lg:w-10 lg:h-10 m-1 flex justify-center items-center text-[10px] sm:text-sm md:text-md lg:text-lg font-medium lg:font-semibold text-slate-50 bg-gray-300 rounded-md'>X</div>
									<div className='w-3 h-7 sm:w-4 sm:h-8 md:w-5 md:h-9 lg:w-6 lg:h-10 m-1 flex justify-center items-center text-[10px] sm:text-sm md:text-md lg:text-lg font-medium lg:font-semibold text-slate-50 bg-gray-300 rounded-md'>2</div>
									<div className='w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 lg:w-10 lg:h-10 m-1 flex justify-center items-center text-[10px] sm:text-sm md:text-md lg:text-lg font-medium lg:font-semibold text-slate-50 bg-gray-300 rounded-md'>X</div>
									<div className='w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 lg:w-10 lg:h-10 m-1 flex justify-center items-center text-[10px] sm:text-sm md:text-md lg:text-lg font-medium lg:font-semibold text-slate-50 bg-gray-300 rounded-md'>X</div>
									<div className='w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 lg:w-10 lg:h-10 m-1 flex justify-center items-center text-[10px] sm:text-sm md:text-md lg:text-lg font-medium lg:font-semibold text-slate-50 bg-gray-300 rounded-md'>X</div>
								</div>
								<div className='flex justify-center mx-1'>
									<div className='w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 lg:w-10 lg:h-10 m-1 flex justify-center items-center text-[10px] sm:text-sm md:text-md lg:text-lg font-medium lg:font-semibold text-slate-50 bg-gray-300 rounded-md'>X</div>
									<div className='w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 lg:w-10 lg:h-10 m-1 flex justify-center items-center text-[10px] sm:text-sm md:text-md lg:text-lg font-medium lg:font-semibold text-slate-50 bg-gray-300 rounded-md'>X</div>
									<div className='w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 lg:w-10 lg:h-10 m-1 flex justify-center items-center text-[10px] sm:text-sm md:text-md lg:text-lg font-medium lg:font-semibold text-slate-50 bg-gray-300 rounded-md'>X</div>
									<div className='w-3 h-7 sm:w-4 sm:h-8 md:w-5 md:h-9 lg:w-6 lg:h-10 m-1 flex justify-center items-center text-[10px] sm:text-sm md:text-md lg:text-lg font-medium lg:font-semibold text-slate-50 bg-gray-300 rounded-md'>3</div>
									<div className='w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 lg:w-10 lg:h-10 m-1 flex justify-center items-center text-[10px] sm:text-sm md:text-md lg:text-lg font-medium lg:font-semibold text-slate-50 bg-gray-300 rounded-md'>X</div>
									<div className='w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 lg:w-10 lg:h-10 m-1 flex justify-center items-center text-[10px] sm:text-sm md:text-md lg:text-lg font-medium lg:font-semibold text-slate-50 bg-gray-300 rounded-md'>X</div>
									<div className='w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 lg:w-10 lg:h-10 m-1 flex justify-center items-center text-[10px] sm:text-sm md:text-md lg:text-lg font-medium lg:font-semibold text-slate-50 bg-gray-300 rounded-md'>X</div>
								</div>
								<div className='flex justify-center mx-1'>
									<div className='w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 lg:w-10 lg:h-10 m-1 flex justify-center items-center text-[10px] sm:text-sm md:text-md lg:text-lg font-medium lg:font-semibold text-slate-50 bg-gray-300 rounded-md'>X</div>
									<div className='w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 lg:w-10 lg:h-10 m-1 flex justify-center items-center text-[10px] sm:text-sm md:text-md lg:text-lg font-medium lg:font-semibold text-slate-50 bg-gray-300 rounded-md'>X</div>
									<div className='w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 lg:w-10 lg:h-10 m-1 flex justify-center items-center text-[10px] sm:text-sm md:text-md lg:text-lg font-medium lg:font-semibold text-slate-50 bg-gray-300 rounded-md'>X</div>
									<div className='w-3 h-7 sm:w-4 sm:h-8 md:w-5 md:h-9 lg:w-6 lg:h-10 m-1 flex justify-center items-center text-[10px] sm:text-sm md:text-md lg:text-lg font-medium lg:font-semibold text-slate-50 bg-gray-300 rounded-md'>4</div>
									<div className='w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 lg:w-10 lg:h-10 m-1 flex justify-center items-center text-[10px] sm:text-sm md:text-md lg:text-lg font-medium lg:font-semibold text-slate-50 bg-gray-300 rounded-md'>X</div>
									<div className='w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 lg:w-10 lg:h-10 m-1 flex justify-center items-center text-[10px] sm:text-sm md:text-md lg:text-lg font-medium lg:font-semibold text-slate-50 bg-gray-300 rounded-md'>X</div>
									<div className='w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 lg:w-10 lg:h-10 m-1 flex justify-center items-center text-[10px] sm:text-sm md:text-md lg:text-lg font-medium lg:font-semibold text-slate-50 bg-gray-300 rounded-md'>X</div>
								</div>
								<div className='flex justify-center mx-1'>
									<div className='w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 lg:w-10 lg:h-10 m-1 flex justify-center items-center text-[10px] sm:text-sm md:text-md lg:text-lg font-medium lg:font-semibold text-slate-50 bg-gray-300 rounded-md'>X</div>
									<div className='w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 lg:w-10 lg:h-10 m-1 flex justify-center items-center text-[10px] sm:text-sm md:text-md lg:text-lg font-medium lg:font-semibold text-slate-50 bg-gray-300 rounded-md'>X</div>
									<div className='w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 lg:w-10 lg:h-10 m-1 flex justify-center items-center text-[10px] sm:text-sm md:text-md lg:text-lg font-medium lg:font-semibold text-slate-50 bg-gray-300 rounded-md'>X</div>
									<div className='w-3 h-7 sm:w-4 sm:h-8 md:w-5 md:h-9 lg:w-6 lg:h-10 m-1 flex justify-center items-center text-[10px] sm:text-sm md:text-md lg:text-lg font-medium lg:font-semibold text-slate-50 bg-gray-300 rounded-md'>5</div>
									<div className='w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 lg:w-10 lg:h-10 m-1 flex justify-center items-center text-[10px] sm:text-sm md:text-md lg:text-lg font-medium lg:font-semibold text-slate-50 bg-gray-300 rounded-md'>X</div>
									<div className='w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 lg:w-10 lg:h-10 m-1 flex justify-center items-center text-[10px] sm:text-sm md:text-md lg:text-lg font-medium lg:font-semibold text-slate-50 bg-gray-300 rounded-md'>X</div>
									<div className='w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 lg:w-10 lg:h-10 m-1 flex justify-center items-center text-[10px] sm:text-sm md:text-md lg:text-lg font-medium lg:font-semibold text-slate-50 bg-gray-300 rounded-md'>X</div>
								</div>
								<div className='flex justify-center mx-1'>
									<div className='w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 lg:w-10 lg:h-10 m-1 flex justify-center items-center text-[10px] sm:text-sm md:text-md lg:text-lg font-medium lg:font-semibold text-slate-50 bg-gray-300 rounded-md'>X</div>
									<div className='w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 lg:w-10 lg:h-10 m-1 flex justify-center items-center text-[10px] sm:text-sm md:text-md lg:text-lg font-medium lg:font-semibold text-slate-50 bg-gray-300 rounded-md'>X</div>
									<div className='w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 lg:w-10 lg:h-10 m-1 flex justify-center items-center text-[10px] sm:text-sm md:text-md lg:text-lg font-medium lg:font-semibold text-slate-50 bg-gray-300 rounded-md'>X</div>
									<div className='w-3 h-7 sm:w-4 sm:h-8 md:w-5 md:h-9 lg:w-6 lg:h-10 m-1 flex justify-center items-center text-[10px] sm:text-sm md:text-md lg:text-lg font-medium lg:font-semibold text-slate-50 bg-gray-300 rounded-md'>6</div>
									<div className='w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 lg:w-10 lg:h-10 m-1 flex justify-center items-center text-[10px] sm:text-sm md:text-md lg:text-lg font-medium lg:font-semibold text-slate-50 bg-gray-300 rounded-md'>X</div>
									<div className='w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 lg:w-10 lg:h-10 m-1 flex justify-center items-center text-[10px] sm:text-sm md:text-md lg:text-lg font-medium lg:font-semibold text-slate-50 bg-gray-300 rounded-md'>X</div>
									<div className='w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 lg:w-10 lg:h-10 m-1 flex justify-center items-center text-[10px] sm:text-sm md:text-md lg:text-lg font-medium lg:font-semibold text-slate-50 bg-gray-300 rounded-md'>X</div>
								</div>
								<div className='flex justify-center mx-1'>
									<div className='w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 lg:w-10 lg:h-10 m-1 flex justify-center items-center text-[10px] sm:text-sm md:text-md lg:text-lg font-medium lg:font-semibold text-slate-50 bg-gray-300 rounded-md'>X</div>
									<div className='w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 lg:w-10 lg:h-10 m-1 flex justify-center items-center text-[10px] sm:text-sm md:text-md lg:text-lg font-medium lg:font-semibold text-slate-50 bg-gray-300 rounded-md'>X</div>
									<div className='w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 lg:w-10 lg:h-10 m-1 flex justify-center items-center text-[10px] sm:text-sm md:text-md lg:text-lg font-medium lg:font-semibold text-slate-50 bg-gray-300 rounded-md'>X</div>
									<div className='w-3 h-7 sm:w-4 sm:h-8 md:w-5 md:h-9 lg:w-6 lg:h-10 m-1 flex justify-center items-center text-[10px] sm:text-sm md:text-md lg:text-lg font-medium lg:font-semibold text-slate-50 bg-gray-300 rounded-md'>7</div>
									<div className='w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 lg:w-10 lg:h-10 m-1 flex justify-center items-center text-[10px] sm:text-sm md:text-md lg:text-lg font-medium lg:font-semibold text-slate-50 bg-gray-300 rounded-md'>X</div>
									<div className='w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 lg:w-10 lg:h-10 m-1 flex justify-center items-center text-[10px] sm:text-sm md:text-md lg:text-lg font-medium lg:font-semibold text-slate-50 bg-gray-300 rounded-md'>X</div>
									<div className='w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 lg:w-10 lg:h-10 m-1 flex justify-center items-center text-[10px] sm:text-sm md:text-md lg:text-lg font-medium lg:font-semibold text-slate-50 bg-gray-300 rounded-md'>X</div>
								</div>
								<div className='flex justify-center mx-1'>
									<div className='w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 lg:w-10 lg:h-10 m-1 flex justify-center items-center text-[10px] sm:text-sm md:text-md lg:text-lg font-medium lg:font-semibold text-slate-50 bg-gray-300 rounded-md'>X</div>
									<div className='w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 lg:w-10 lg:h-10 m-1 flex justify-center items-center text-[10px] sm:text-sm md:text-md lg:text-lg font-medium lg:font-semibold text-slate-50 bg-gray-300 rounded-md'>X</div>
									<div className='w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 lg:w-10 lg:h-10 m-1 flex justify-center items-center text-[10px] sm:text-sm md:text-md lg:text-lg font-medium lg:font-semibold text-slate-50 bg-gray-300 rounded-md'>X</div>
									<div className='w-3 h-7 sm:w-4 sm:h-8 md:w-5 md:h-9 lg:w-6 lg:h-10 m-1 flex justify-center items-center text-[10px] sm:text-sm md:text-md lg:text-lg font-medium lg:font-semibold text-slate-50 bg-gray-300 rounded-md'>8</div>
									<div className='w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 lg:w-10 lg:h-10 m-1 flex justify-center items-center text-[10px] sm:text-sm md:text-md lg:text-lg font-medium lg:font-semibold text-slate-50 bg-gray-300 rounded-md'>X</div>
									<div className='w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 lg:w-10 lg:h-10 m-1 flex justify-center items-center text-[10px] sm:text-sm md:text-md lg:text-lg font-medium lg:font-semibold text-slate-50 bg-gray-300 rounded-md'>X</div>
									<div className='w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 lg:w-10 lg:h-10 m-1 flex justify-center items-center text-[10px] sm:text-sm md:text-md lg:text-lg font-medium lg:font-semibold text-slate-50 bg-gray-300 rounded-md'>X</div>
								</div>
								<div className='flex justify-center mx-1'>
									<div className='w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 lg:w-10 lg:h-10 m-1 flex justify-center items-center text-[10px] sm:text-sm md:text-md lg:text-lg font-medium lg:font-semibold text-slate-50 bg-gray-300 rounded-md'>X</div>
									<div className='w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 lg:w-10 lg:h-10 m-1 flex justify-center items-center text-[10px] sm:text-sm md:text-md lg:text-lg font-medium lg:font-semibold text-slate-50 bg-gray-300 rounded-md'>X</div>
									<div className='w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 lg:w-10 lg:h-10 m-1 flex justify-center items-center text-[10px] sm:text-sm md:text-md lg:text-lg font-medium lg:font-semibold text-slate-50 bg-gray-300 rounded-md'>X</div>
									<div className='w-3 h-7 sm:w-4 sm:h-8 md:w-5 md:h-9 lg:w-6 lg:h-10 m-1 flex justify-center items-center text-[10px] sm:text-sm md:text-md lg:text-lg font-medium lg:font-semibold text-slate-50 bg-gray-300 rounded-md'>9</div>
									<div className='w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 lg:w-10 lg:h-10 m-1 flex justify-center items-center text-[10px] sm:text-sm md:text-md lg:text-lg font-medium lg:font-semibold text-slate-50 bg-gray-300 rounded-md'>X</div>
									<div className='w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 lg:w-10 lg:h-10 m-1 flex justify-center items-center text-[10px] sm:text-sm md:text-md lg:text-lg font-medium lg:font-semibold text-slate-50 bg-gray-300 rounded-md'>X</div>
									<div className='w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 lg:w-10 lg:h-10 m-1 flex justify-center items-center text-[10px] sm:text-sm md:text-md lg:text-lg font-medium lg:font-semibold text-slate-50 bg-gray-300 rounded-md'>X</div>
								</div>
								<div className='flex justify-center mx-1'>
									<div className='w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 lg:w-10 lg:h-10 m-1 flex justify-center items-center text-[10px] sm:text-sm md:text-md lg:text-lg font-medium lg:font-semibold text-slate-50 bg-gray-300 rounded-md'>X</div>
									<div className='w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 lg:w-10 lg:h-10 m-1 flex justify-center items-center text-[10px] sm:text-sm md:text-md lg:text-lg font-medium lg:font-semibold text-slate-50 bg-gray-300 rounded-md'>X</div>
									<div className='w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 lg:w-10 lg:h-10 m-1 flex justify-center items-center text-[10px] sm:text-sm md:text-md lg:text-lg font-medium lg:font-semibold text-slate-50 bg-gray-300 rounded-md'>X</div>
									<div className='w-3 h-7 sm:w-4 sm:h-8 md:w-5 md:h-9 lg:w-6 lg:h-10 m-1 flex justify-center items-center text-[10px] sm:text-sm md:text-md lg:text-lg font-medium lg:font-semibold text-slate-50 bg-gray-300 rounded-md'>10</div>
									<div className='w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 lg:w-10 lg:h-10 m-1 flex justify-center items-center text-[10px] sm:text-sm md:text-md lg:text-lg font-medium lg:font-semibold text-slate-50 bg-gray-300 rounded-md'>X</div>
									<div className='w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 lg:w-10 lg:h-10 m-1 flex justify-center items-center text-[10px] sm:text-sm md:text-md lg:text-lg font-medium lg:font-semibold text-slate-50 bg-gray-300 rounded-md'>X</div>
									<div className='w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 lg:w-10 lg:h-10 m-1 flex justify-center items-center text-[10px] sm:text-sm md:text-md lg:text-lg font-medium lg:font-semibold text-slate-50 bg-gray-300 rounded-md'>X</div>
								</div>
								<div className='flex justify-center mx-1'>
									<div className='w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 lg:w-10 lg:h-10 m-1 flex justify-center items-center text-[10px] sm:text-sm md:text-md lg:text-lg font-medium lg:font-semibold text-slate-50 bg-gray-300 rounded-md'>X</div>
									<div className='w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 lg:w-10 lg:h-10 m-1 flex justify-center items-center text-[10px] sm:text-sm md:text-md lg:text-lg font-medium lg:font-semibold text-slate-50 bg-gray-300 rounded-md'>X</div>
									<div className='w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 lg:w-10 lg:h-10 m-1 flex justify-center items-center text-[10px] sm:text-sm md:text-md lg:text-lg font-medium lg:font-semibold text-slate-50 bg-gray-300 rounded-md'>X</div>
									<div className='w-3 h-7 sm:w-4 sm:h-8 md:w-5 md:h-9 lg:w-6 lg:h-10 m-1 flex justify-center items-center text-[10px] sm:text-sm md:text-md lg:text-lg font-medium lg:font-semibold text-slate-50 bg-gray-300 rounded-md'>11</div>
									<div className='w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 lg:w-10 lg:h-10 m-1 flex justify-center items-center text-[10px] sm:text-sm md:text-md lg:text-lg font-medium lg:font-semibold text-slate-50 bg-gray-300 rounded-md'>X</div>
									<div className='w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 lg:w-10 lg:h-10 m-1 flex justify-center items-center text-[10px] sm:text-sm md:text-md lg:text-lg font-medium lg:font-semibold text-slate-50 bg-gray-300 rounded-md'>X</div>
									<div className='w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 lg:w-10 lg:h-10 m-1 flex justify-center items-center text-[10px] sm:text-sm md:text-md lg:text-lg font-medium lg:font-semibold text-slate-50 bg-gray-300 rounded-md'>X</div>
								</div>
								<div className='flex justify-center mx-1'>
									<div className='w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 lg:w-10 lg:h-10 m-1 flex justify-center items-center text-[10px] sm:text-sm md:text-md lg:text-lg font-medium lg:font-semibold text-slate-50 bg-gray-300 rounded-md'>X</div>
									<div className='w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 lg:w-10 lg:h-10 m-1 flex justify-center items-center text-[10px] sm:text-sm md:text-md lg:text-lg font-medium lg:font-semibold text-slate-50 bg-gray-300 rounded-md'>X</div>
									<div className='w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 lg:w-10 lg:h-10 m-1 flex justify-center items-center text-[10px] sm:text-sm md:text-md lg:text-lg font-medium lg:font-semibold text-slate-50 bg-gray-300 rounded-md'>X</div>
									<div className='w-3 h-7 sm:w-4 sm:h-8 md:w-5 md:h-9 lg:w-6 lg:h-10 m-1 flex justify-center items-center text-[10px] sm:text-sm md:text-md lg:text-lg font-medium lg:font-semibold text-slate-50 bg-gray-300 rounded-md'>12</div>
									<div className='w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 lg:w-10 lg:h-10 m-1 flex justify-center items-center text-[10px] sm:text-sm md:text-md lg:text-lg font-medium lg:font-semibold text-slate-50 bg-gray-300 rounded-md'>X</div>
									<div className='w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 lg:w-10 lg:h-10 m-1 flex justify-center items-center text-[10px] sm:text-sm md:text-md lg:text-lg font-medium lg:font-semibold text-slate-50 bg-gray-300 rounded-md'>X</div>
									<div className='w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 lg:w-10 lg:h-10 m-1 flex justify-center items-center text-[10px] sm:text-sm md:text-md lg:text-lg font-medium lg:font-semibold text-slate-50 bg-gray-300 rounded-md'>X</div>
								</div>
							</div>
						</div>
					</div>
					<div className='bg-purple-800 p-2 mt-4 mb-4 rounded-lg text-center'>
						<button type='submit' className='font-normal text-md text-white'>Simpan</button>
					</div>
				</form>
				<div className='p-2 ml-1 w-11/12 md:w-4/5 lg:w-1/2'>
					<h2 className='py-2 font-extrabold text-sm md:text-md'>Detail Penerbangan</h2>
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
							<div className='flex justify-between'>
								<p className='font-medium text-sm md:text-md'>2 Adults</p>
								<p className='font-medium text-sm md:text-md'>IDR 9.550.000</p>
							</div>
							<div className='flex justify-between'>
								<p className='font-medium text-sm md:text-md'>1 Baby</p>
								<p className='font-medium text-sm md:text-md'>IDR 0</p>
							</div>
							<div className='flex justify-between'>
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
			</div>
    </main>
  )
}

Checkout.getLayout = function getLayout (page: ReactElement) {
  return (
    <DefaultLayout>
      {page}
    </DefaultLayout>
  )
}

export default Checkout