import { useEffect, useState, type ReactElement } from 'react'
import DefaultLayout from '@/layouts/default'
import MenuHeader from '@/components/MenuHeader'
import { FiEdit3, FiSettings, FiLogOut } from 'react-icons/fi'
import Head from 'next/head'
import axios from 'axios'
import Header from '@/components/Header'
import { useRouter } from 'next/router'
import checkLoggedIn from '@/utils/checkLoggedIn'

const Account = (): ReactElement => {
  useEffect(() => {
    void fetchUser()
    const status = checkLoggedIn()
    setIsLoggedIn(status)
  }, [])

  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const router = useRouter()
  const [name, setName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  useEffect(() => {
    if (errorMessage !== '') {
      setErrorMessage('')
    }
    if (successMessage !== '') {
      setSuccessMessage('')
    }
  }, [name, phoneNumber])

  const fetchUser = async (): Promise<void> => {
    const accessToken = sessionStorage.getItem('accessToken')
    try {
      setIsLoading(true)
      setErrorMessage('')
      const response = await axios.get(`${process.env.REST_API_ENDPOINT}profile`, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })
      setName(response.data.data.name)
      setPhoneNumber(response.data.data.phoneNumber)
      setEmail(response.data.data.email)
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.data?.message !== undefined && error.response?.data?.message !== null) {
          if (error.response.data.message === 'Silahkan Login') {
            setErrorMessage(error.response.data.message)
            setTimeout(() => {
              void router.push('/login')
            }, 2000)
          } else {
            setErrorMessage(error.response.data.message)
          }
        } else {
          console.error(error)
        }
      } else {
        console.error(error)
      }
    } finally {
      setIsLoading(false)
    }
  }

  const updateProfile = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()
    const accessToken = sessionStorage.getItem('accessToken')
    setIsLoading(true)
    setErrorMessage('')
    setSuccessMessage('')
    try {
      const response = await axios.put(`${process.env.REST_API_ENDPOINT}profile/update`, { name, phoneNumber }, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })
      setSuccessMessage('Profil Berhasil Diubah')
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.data?.message !== undefined && error.response?.data?.message !== null) {
          if (error.response.data.message === 'Silahkan Login') {
            setErrorMessage(error.response.data.message)
            setTimeout(() => {
              void router.push('/login')
            }, 2000)
          } else {
            setErrorMessage(error.response.data.message)
          }
        } else {
          console.error(error)
        }
      } else {
        console.error(error)
      }
    } finally {
      setIsLoading(false)
    }
  }

  const logout = async (): Promise<void> => {
    sessionStorage.removeItem('accessToken')
    setSuccessMessage('Terima Kasih')
    setTimeout(() => {
      void router.push('/login')
    }, 2000)
  }

  return (
    <>
      <Head>
        <title>Account</title>
      </Head>
      <div id='account-page' className=''>
        <Header isLoggedIn={isLoggedIn} login={async () => {}}/>
        <main className='mx-auto'>
          <MenuHeader pageTitle={'Akun'} />
          <div className='container flex justify-center flex-col gap-y-4 lg:flex-row lg:gap-y-0 w-4/5 mx-auto gap-x-8'>
            <div className='lg:w-2/5 flex flex-col'>
              <div className='border-b-2'>
                <button className='flex gap-x-2 items-center py-4'>
                  <FiEdit3 />
                  Ubah Profil
                </button>
              </div>
              <div className='border-b-2'>
                <button className='flex gap-x-2 items-center py-4'>
                  <FiSettings />
                  Pengaturan Akun
                </button>
              </div>
              <div className='border-b-2'>
                <button className='flex gap-x-2 items-center py-4' onClick={() => { void logout() }}>
                  <FiLogOut />
                  Keluar
                </button>
              </div>
              <div className='flex mt-6 mb-2'>
                <span className={`${errorMessage === '' && successMessage === '' ? 'h-0 w-0 opacity-0' : 'h-fit w-fit opacity-100 px-6 py-2'} duration-300 text-sm mx-auto text-white rounded-2xl text-center ${errorMessage !== '' && 'bg-red-600'} ${successMessage !== '' && 'bg-green-400'}`}>
                  {
                    errorMessage === '' && successMessage === ''
                      ? ''
                      : errorMessage !== ''
                        ? errorMessage
                        : successMessage
                  }
                </span>
              </div>
            </div>
            <div className='lg:w-3/5'>
              <div className='border-2'>
                <div className='p-6'>
                  <p className='font-bold'>Ubah Data Profil</p>
                  <div className='pt-5'>
                    <div className='bg-blue-700 text-white px-4 py-2 rounded-t-[10px] mb-4'>Data Diri</div>
                    <div className='px-3 pt-3'>
                      <form className='flex flex-col gap-y-6' onSubmit={(e) => { void updateProfile(e) } } action=''>
                        <div>
                          <label className='block mb-2 font-bold' htmlFor='name'>Nama Lengkap</label>
                          <input type='name' value={name} id='name' onChange={(e) => { setName(e.target.value) }} className='w-full border rounded-md p-2' placeholder='' required/>
                        </div>
                        <div>
                          <label className='block mb-2 font-bold' htmlFor='tel'>Nomor Telepon</label>
                          <input type='number' value={phoneNumber} id='tel' onChange={(e) => { setPhoneNumber(e.target.value) }} className='w-full border rounded-md p-2' placeholder='' required/>
                        </div>
                        <div>
                          <label className='block mb-2 font-bold' htmlFor='email'>Email</label>
                          <input type='email' value={email} id='email' onChange={(e) => { setEmail(e.target.value) }} className='w-full border rounded-md p-2 bg-gray-100' placeholder='' required disabled={true}/>
                        </div>
                        <div className='flex justify-center'>
                          <button type='submit' className={`text-white font-medium rounded-lg text-sm w-fit px-5 py-2.5 text-center ${isLoading ? 'bg-slate-400 cursor-not-allowed' : 'bg-blue-700'}`} disabled={isLoading}>
                            {
                              isLoading
                                ? 'Tunggu Sebentar'
                                : 'Simpan'
                            }
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  )
}

Account.getLayout = function getLayout (page: ReactElement) {
  return (
    <DefaultLayout>
      {page}
    </DefaultLayout>
  )
}

export default Account
