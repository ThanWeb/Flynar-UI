import { useState, useEffect, type ReactElement } from 'react'
import Link from 'next/link'
import Head from 'next/head'
import Image from 'next/image'
import { FiEye, FiEyeOff } from 'react-icons/fi'
import axios from 'axios'
import AuthPageLayout from '@/layouts/auth'
import { useRouter } from 'next/router'
import { deleteCookie, setCookie } from 'cookies-next'

const Login = (): ReactElement => {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const togglePasswordVisibility = (): void => {
    setShowPassword(!showPassword)
  }

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    if (errorMessage !== '') {
      setErrorMessage('')
    }
  }, [email, password])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()

    if (email === '' || password === '') {
      setErrorMessage('Mohon Lengkapi Data')
      return
    }

    if (password.length < 8) {
      setErrorMessage('Password Minimal 8 Karakter')
      return
    }

    try {
      setIsLoading(true)
      setErrorMessage('')
      const response = await axios.post('http://localhost:8000/api/v1/login', { identifier: email, password })
      deleteCookie('loggedEmail')
      sessionStorage.setItem('accessToken', response.data.accessToken)
      if (response.status === 200) {
        await router.push('/')
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.data?.message !== undefined && error.response?.data?.message !== null) {
          if (error.response.data.message === 'Silahkan Verifikasi Akun Ini') {
            setCookie('loggedEmail', email)
            setErrorMessage(error.response.data.message)
            setTimeout(() => {
              void router.push('/verify-otp')
            }, 2000)
          } else {
            setErrorMessage(error.response.data.message)
          }
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
        <title>Sign In</title>
        <meta name='description' content='Sign in to flynar website' />
      </Head>
      <div id='login-page' className='flex h-screen overflow-hidden'>
        <div className='hidden lg:w-1/2 relative lg:flex lg:px-8'>
          <Image src='/images/auth-background.png' fill={true} sizes='100%' priority={true} alt='Auth Page Background' className='object-cover'/>
          <Image src='/images/flynar-logo.png' width={200} height={200} loading='lazy' alt='Flynar Logo' className='absolute bottom-0'/>
        </div>
        <div className='w-full h-full flex px-6 py-4 lg:p-0 lg:w-1/2 auth-bg-2'>
          <div className='m-auto w-full md:w-3/6 lg:w-4/6'>
            <form onSubmit={(e) => { void handleSubmit(e) } } action=''>
              <h5 className='font-bold text-2xl leading-9 mb-6'>Masuk</h5>
              <div className='flex flex-col gap-y-3 text-sm'>
                <div className='flex flex-col gap-y-2'>
                  <label htmlFor='email'>Email/No Telepon</label>
                  <input type='text' autoComplete='off' autoCorrect='false' value={email} onChange={(e) => { setEmail(e.target.value) }} placeholder='Contoh: johndoe@gmail.com' id='email' className='border rounded-2xl px-4 py-3'/>
                </div>
                <div className='flex flex-col gap-y-2'>
                  <div className='flex items-center justify-between mb-1'>
                    <label htmlFor='password'>Password</label>
                    <Link href='forgot-password' className='font-medium text-xs leading-6 text-purple-700 no-underline'>Lupa Kata Sandi</Link>
                  </div>
                  <div className='flex justify-between relative'>
                    <input value={password} onChange={(e) => { setPassword(e.target.value) }} type={showPassword ? 'text' : 'password'} placeholder='Masukkan password' id='password' className={`${password.length > 0 && password.length < 8 && 'wrong-input'} rounded-2xl h-full w-full pl-4 py-3 border`}/>
                    <button type='button' className='py-3 px-4 rounded-2xl absolute right-0 h-full toggle-password' title='toggle-password' onClick={togglePasswordVisibility}>
                      {showPassword
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
                    : 'Masuk'
                }
              </button>
              <p className='text-center text-sm mt-8'>Belum punya akun?{' '}
                <Link href='/register' className='font-bold text-purple-700'>Daftar di sini</Link>
              </p>
              <div className='flex mt-6'>
                <span className={`${errorMessage === '' ? 'h-0 w-0 opacity-0' : 'h-fit w-fit opacity-100 px-6 py-2 bg-red-600'} duration-300 text-sm mx-auto text-white rounded-2xl text-center`}>
                  {errorMessage}
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

Login.getLayout = function getLayout (page: ReactElement) {
  return (
    <AuthPageLayout>
      {page}
    </AuthPageLayout>
  )
}

export default Login
