import { type ReactElement, useState, useEffect } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import axios from 'axios'
import AuthPageLayout from '@/layouts/auth'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { FiEye, FiEyeOff } from 'react-icons/fi'

const ResetPassword = (): ReactElement => {
  const [token, setToken] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const router = useRouter()

  useEffect(() => {
    if (errorMessage !== '') {
      setErrorMessage('')
    }
    if (successMessage !== '') {
      setSuccessMessage('')
    }
  }, [token, newPassword, confirmPassword])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()

    if (token === '' || newPassword === '' || confirmPassword === '') {
      setErrorMessage('Mohon Lengkapi Data')
      return
    }

    if (newPassword.length < 8) {
      setErrorMessage('Password Minimal 8 Karakter')
      return
    }

    if (newPassword !== confirmPassword) {
      setErrorMessage('Password dan Konfirmasi Password Berbeda')
      return
    }

    try {
      setIsLoading(true)
      setErrorMessage('')
      const response = await axios.put(`${process.env.REST_API_ENDPOINT}reset-password`, { token, password: newPassword, confirmation: confirmPassword })
      setSuccessMessage(response.data.message)
      setTimeout(() => {
        void router.push('/login')
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
        <title>Reset Password</title>
        <meta name='description' content='Set Your new password and Reset Your old password' />
      </Head>
      <div id='reset-password-page' className='flex h-screen overflow-hidden'>
        <div className='hidden lg:w-1/2 relative lg:flex lg:px-8'>
          <Image src='/images/auth-background.png' fill={true} sizes='100%' priority={true} alt='Auth Page Background' className='object-cover'/>
          <Image src='/images/flynar-logo.png' width={200} height={200} loading='lazy' alt='Flynar Logo' className='absolute bottom-0'/>
        </div>
        <div className='w-full h-full flex px-6 py-4 lg:p-0 lg:w-1/2 auth-bg-2'>
          <div className='m-auto w-full md:w-3/6 lg:w-4/6'>
            <form onSubmit={(e) => { void handleSubmit(e) } } action=''>
              <h5 className='font-bold text-2xl leading-9 mb-6'>Reset Password</h5>
              <div className='flex flex-col gap-y-3 text-sm'>
                <div className='flex flex-col gap-y-2'>
                  <div className='flex items-center justify-between mb-1'>
                    <label htmlFor='token'>Token</label>
                    <Link href='forgot-password' className='font-medium text-xs leading-6 text-purple-700 no-underline'>Kirim Ulang Token</Link>
                  </div>
                  <input type='text' autoComplete='off' autoCorrect='false' value={token} onChange={(e) => { setToken(e.target.value) }} placeholder='Token dari Email' id='token' className='border rounded-2xl px-4 py-3'/>
                </div>
                <div className='flex flex-col gap-y-2'>
                  <div className='flex items-center justify-between mb-1'>
                    <label htmlFor='new-password'>Password Baru</label>
                  </div>
                  <div className='flex justify-between relative'>
                    <input value={newPassword} onChange={(e) => { setNewPassword(e.target.value) }} type={showNewPassword ? 'text' : 'password'} placeholder='Masukkan password baru' id='new-password' className={`${newPassword.length > 0 && newPassword.length < 8 && 'wrong-input'} rounded-2xl h-full w-full pl-4 py-3 border`}/>
                    <button type='button' className='py-3 px-4 rounded-2xl absolute right-0 h-full toggle-password' title='toggle-password' onClick={() => { setShowNewPassword(!showNewPassword) }}>
                      {showNewPassword
                        ? (<FiEye/>)
                        : ((<FiEyeOff/>))
                      }
                    </button>
                  </div>
                </div>
                <div className='flex flex-col gap-y-2'>
                  <div className='flex items-center justify-between mb-1'>
                    <label htmlFor='confirm-password'>Konfirmasi Password Baru</label>
                  </div>
                  <div className='flex justify-between relative'>
                    <input value={confirmPassword} onChange={(e) => { setConfirmPassword(e.target.value) }} type={showConfirmPassword ? 'text' : 'password'} placeholder='Masukkan password baru' id='confirm-password' className={`${confirmPassword.length > 0 && confirmPassword.length < 8 && 'wrong-input'} rounded-2xl h-full w-full pl-4 py-3 border`}/>
                    <button type='button' className='py-3 px-4 rounded-2xl absolute right-0 h-full toggle-password' title='toggle-password' onClick={() => { setShowConfirmPassword(!showConfirmPassword) }}>
                      {showConfirmPassword
                        ? (<FiEye/>)
                        : ((<FiEyeOff/>))
                      }
                    </button>
                  </div>
                </div>
              </div>
              <button type='submit' className={`w-full text-white rounded-2xl px-6 py-3 text-sm mt-8 ${isLoading ? 'bg-slate-400 cursor-not-allowed' : 'bg-purple-600'}`} disabled={isLoading}>
                {
                  isLoading
                    ? 'Tunggu Sebentar'
                    : 'Simpan Password'
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

ResetPassword.getLayout = function getLayout (page: ReactElement) {
  return (
    <AuthPageLayout>
      {page}
    </AuthPageLayout>
  )
}

export default ResetPassword
