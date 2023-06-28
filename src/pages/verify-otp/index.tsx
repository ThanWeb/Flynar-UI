import { type ReactElement, useState, useEffect, type SetStateAction } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import axios from 'axios'
import AuthPageLayout from '@/layouts/auth'
import { useRouter } from 'next/router'
import { getCookie } from 'cookies-next'
import OtpInput from '@/components/OtpInput'
import { start } from 'repl'
import { count } from 'console'

const VerifyOtp = (): ReactElement => {
  const router = useRouter()
  const [loggedEmail, setLoggedEmail] = useState('')
  const [otp, setOtp] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [startCountdown, setStartCountdown] = useState<SetStateAction<any>>(null)

  const onChangeOtp = (value: string): void => { setOtp(value) }

  useEffect(() => {
    if (errorMessage !== '') {
      setErrorMessage('')
    }
    if (successMessage !== '') {
      setSuccessMessage('')
    }
  }, [otp])

  useEffect(() => {
    void setLoggedEmailFromCookie()
  }, [])

  useEffect(() => {
    void resendOtp()
  }, [loggedEmail])

  const setLoggedEmailFromCookie = async (): Promise<void> => {
    const email: any = getCookie('loggedEmail')
    if (email !== undefined && email !== null && email !== '') {
      setLoggedEmail(email)
    } else {
      await router.push('/')
    }
  }

  const stopCountdown = (): void => {
    setStartCountdown(false)
  }

  const resendOtp = async (): Promise<void> => {
    try {
      setIsLoading(true)
      setErrorMessage('')
      setSuccessMessage('')
      setStartCountdown(null)
      if (loggedEmail !== '') {
        const response = await axios.put('http://localhost:8000/api/v1/resend-otp', { email: loggedEmail })
        setSuccessMessage(response.data.message)
        setStartCountdown(true)
        setTimeout(stopCountdown, 60000)
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.data?.message !== undefined && error.response?.data?.message !== null) {
          setErrorMessage(error.response.data.message)
        } else {
          setErrorMessage('Terjadi Kesalahan, Coba Lagi')
        }
        if (error.response?.data.message === 'Email Sudah Diverifikasi') {
          await router.push('/login')
        }
        console.error(error)
      } else {
        console.error(error)
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()

    try {
      setIsLoading(true)
      setErrorMessage('')
      const response = await axios.post('http://localhost:8000/api/v1/verify', { email: loggedEmail, otp: parseInt(otp) })
      setSuccessMessage(response.data.message)
      await router.push('/login')
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.data?.message !== undefined && error.response?.data?.message !== null) {
          setErrorMessage(error.response.data.message)
        } else {
          setErrorMessage('Terjadi Kesalahan, Coba Lagi')
        }
        console.error(error)
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
        <title>Verify OTP</title>
        <meta name='description' content='Verify Your account with OTP' />
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      </Head>
      <div id='verify-otp-page' className='h-screen overflow-hidden flex flex-col'>
        <header className='w-full bg-white h-20 shadow-md'>
          <div className='h-full container px-12 flex'>
            <Image src='/images/flynar-logo.png' width={200} height={200} loading='lazy' alt='Flynar Logo' className='h-full w-auto'/>
          </div>
        </header>
        <div className='w-full px-6 py-4 lg:p-0 mt-10'>
          <form action='' autoComplete='off' onSubmit={(e) => { void handleSubmit(e) } } className='flex'>
            <div className='mx-auto text-center flex flex-col gap-y-6'>
              {
                loggedEmail !== '' &&
                  <p>Ketik 6 digit kode yang dikirimkan ke <span className='font-bold'>{loggedEmail}</span></p>
              }
              {
                startCountdown === true
                  ? <p>Kirim ulang OTP dalam beberapa saat</p>
                  : startCountdown === false
                    ? <button type='button' onClick={() => { void resendOtp() }} className='text-white rounded-2xl px-6 py-3 text-sm bg-purple-600 w-fit mx-auto'>Kirim Ulang</button>
                    : null
              }
              <OtpInput value={otp} valueLength={6} onChange={onChangeOtp} />
              <button type='submit' className={`w-full text-white rounded-2xl px-6 py-3 text-sm ${isLoading ? 'bg-slate-400 cursor-not-allowed' : 'bg-purple-600'}`} disabled={isLoading}>
                {
                  isLoading
                    ? 'Tunggu Sebentar'
                    : 'Verifikasi'
                }
              </button>
              <div className='flex'>
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
          </form>
        </div>
      </div>
    </>
  )
}

VerifyOtp.getLayout = function getLayout (page: ReactElement) {
  return (
    <AuthPageLayout>
      {page}
    </AuthPageLayout>
  )
}

export default VerifyOtp
