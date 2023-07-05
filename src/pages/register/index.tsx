import React, { useState, useEffect } from 'react'
import type { ReactElement, FormEvent } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import axios from 'axios'
import { FiEye, FiEyeOff } from 'react-icons/fi'
import AuthPageLayout from '@/layouts/auth'
import isEmailValid from '@/utils/isEmailValid'
import { setCookie } from 'cookies-next'

const Register = (): ReactElement => {
  const [showPassword, setShowPassword] = useState(false)

  const togglePasswordVisibility = (): void => {
    setShowPassword(!showPassword)
  }

  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const router = useRouter()

  useEffect(() => {
    if (errorMessage !== '') {
      setErrorMessage('')
    }
  }, [name, email, password, phoneNumber])

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()

    if (name === '' || email === '' || password === '' || phoneNumber === '') {
      setErrorMessage('Mohon Lengkapi Data')
      return
    }

    if (isNaN(parseInt(phoneNumber))) {
      setErrorMessage('Nomor Telepon Wajib Angka')
      return
    }

    if (password.length < 8) {
      setErrorMessage('Password Minimal 8 Karakter')
      return
    }

    try {
      setIsLoading(true)
      setErrorMessage('')
      setSuccessMessage('')
      const response = await axios.post(`${process.env.REST_API_ENDPOINT}register`, {
        name,
        email,
        password,
        phoneNumber
      })
      setCookie('loggedEmail', email)
      setSuccessMessage('Registrasi Berhasil')
      setTimeout(() => {
        void router.push('/verify-otp')
      }, 2000)
    } catch (error: unknown) {
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
        <title>Sign Up</title>
        <meta name='description' content='Sign up to flynar website' />
      </Head>
      <div id='register-page'>
        <div className='flex h-screen overflow-hidden'>
          <div className='hidden lg:w-1/2 relative lg:flex lg:px-8'>
            <Image src='/images/auth-background.png' fill={true} sizes='100%' priority={true} alt='Auth Page Background' className='object-cover'/>
            <Image src='/images/flynar-logo.png' width={200} height={200} loading='lazy' alt='Flynar Logo' className='absolute bottom-0'/>
          </div>
          <div className='w-full h-full flex px-6 py-4 lg:p-0 lg:w-1/2 auth-bg-2'>
            <div className='m-auto w-full md:w-3/6 lg:w-4/6'>
              <form action='' autoComplete='off' onSubmit={(e) => { void handleSubmit(e) } }>
                <h5 className='text-2xl leading-9 mb-6 font-bold'>Daftar</h5>
                <div className='flex flex-col gap-y-3 text-sm'>
                  <div className='flex flex-col gap-y-2'>
                    <label htmlFor='name'>Nama</label>
                    <input type='text' value={name} autoComplete='off' autoCorrect='false' placeholder='Nama Lengkap' id='name' className='border rounded-2xl px-4 py-3' onChange={(e) => { setName(e.target.value) }}/>
                  </div>
                  <div className='flex flex-col gap-y-2'>
                    <label htmlFor='email'>Email</label>
                    <input type='text' value={email} autoComplete='off' autoCorrect='false' placeholder='Contoh: johndoe@gmail.com' id='email' className={`${isEmailValid(email) === null && 'wrong-input'} border rounded-2xl px-4 py-3`} onChange={(e) => { setEmail(e.target.value) }}/>
                  </div>
                  <div className='flex flex-col gap-y-2'>
                    <label htmlFor='phoneNumber'>Nomor Telepon</label>
                    <input type='number' value={phoneNumber} autoComplete='off' autoCorrect='false' placeholder='08...' id='phoneNumber' className={`${isNaN(parseInt(phoneNumber)) && phoneNumber.length > 0 && 'wrong-input'} border rounded-2xl px-4 py-3`} onChange={(e) => { setPhoneNumber(e.target.value) }}/>
                  </div>
                  <div className='flex flex-col gap-y-2'>
                    <label htmlFor='password'>Password</label>
                    <div className='flex justify-between relative'>
                      <input type={showPassword ? 'text' : 'password'} value={password} placeholder='Buat password' id='password' className={`${password.length > 0 && password.length < 8 && 'wrong-input'} rounded-2xl h-full w-full pl-4 py-3 border`} onChange={(e) => { setPassword(e.target.value) }}/>
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
                      : 'Daftar'
                  }
                </button>
                <p className='text-sm text-center mt-8'>Sudah punya akun?{' '}
                  <Link href='/login' className='text-purple-700 font-bold'>Masuk di sini</Link>
                </p>
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
      </div>
    </>
  )
}

Register.getLayout = function getLayout (page: ReactElement) {
  return (
    <AuthPageLayout>
      {page}
    </AuthPageLayout>
  )
}

export default Register
