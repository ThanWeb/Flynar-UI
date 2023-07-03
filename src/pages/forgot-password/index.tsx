import { type ReactElement, useState, useEffect } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import axios from 'axios'
import AuthPageLayout from '@/layouts/auth'
import { useRouter } from 'next/router'

const ForgotPassword = (): ReactElement => {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const router = useRouter()

  useEffect(() => {
    if (errorMessage !== '') {
      setErrorMessage('')
    }
    if (successMessage !== '') {
      setSuccessMessage('')
    }
  }, [email])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()

    if (email === '') {
      setErrorMessage('Mohon Lengkapi Data')
      return
    }

    try {
      setIsLoading(true)
      setErrorMessage('')
      const response = await axios.put('http://localhost:8000/api/v1/forgot-password', { email })
      setSuccessMessage(response.data.message)
      setTimeout(() => {
        void router.push('/reset-password')
      }, 2000)
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.data?.message !== undefined && error.response?.data?.message !== null) {
          setErrorMessage(error.response.data.message)
        } else {
          setErrorMessage('Terjadi Kesalahan, Coba Lagi')
          console.error(error)
        }
      } else {
        console.error(error)
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <Head>
        <title>Forgot Password</title>
        <meta name='description' content='Reset Your password' />
      </Head>
      <div id='forgot-password-page' className='flex h-screen overflow-hidden'>
        <div className='hidden lg:w-1/2 relative lg:flex lg:px-8'>
          <Image src='/images/auth-background.png' fill={true} sizes='100%' priority={true} alt='Auth Page Background' className='object-cover'/>
          <Image src='/images/flynar-logo.png' width={200} height={200} loading='lazy' alt='Flynar Logo' className='absolute bottom-0'/>
        </div>
        <div className='w-full h-full flex px-6 py-4 lg:p-0 lg:w-1/2 auth-bg-2'>
          <div className='m-auto w-full md:w-3/6 lg:w-4/6'>
            <form onSubmit={(e) => { void handleSubmit(e) } } action=''>
              <h5 className='font-bold text-2xl leading-9 mb-6'>Forgot Password</h5>
              <div className='flex flex-col gap-y-3 text-sm'>
                <div className='flex flex-col gap-y-2'>
                  <label htmlFor='email'>Email/No Telepon</label>
                  <input type='text' autoComplete='off' autoCorrect='false' value={email} onChange={(e) => { setEmail(e.target.value) }} placeholder='Contoh: johndoe@gmail.com' id='email' className='border rounded-2xl px-4 py-3'/>
                </div>
              </div>
              <button type='submit' className={`w-full text-white rounded-2xl px-6 py-3 text-sm mt-8 ${isLoading ? 'bg-slate-400 cursor-not-allowed' : 'bg-purple-600'}`} disabled={isLoading}>
                {
                  isLoading
                    ? 'Tunggu Sebentar'
                    : 'Kirim Token'
                }
              </button>
              <div className='flex mt-6'>
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
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

ForgotPassword.getLayout = function getLayout (page: ReactElement) {
  return (
    <AuthPageLayout>
      {page}
    </AuthPageLayout>
  )
}

export default ForgotPassword
