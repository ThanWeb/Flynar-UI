import type { ReactElement } from 'react'
import Head from 'next/head'
import { Inter } from 'next/font/google'
import Header from '@/components/Header'

interface IDefaultLayoutProps {
  children: React.ReactNode
}

const inter = Inter({ subsets: ['latin'] })

const DefaultLayout = ({ children }: IDefaultLayoutProps): ReactElement => {
  return (
    <>
      <Head>
        <title>Flynar</title>
        <meta name='description' content='This is description' />
        {/* <link rel='icon' href='/images/favicon.png' sizes='any' /> */}
      </Head>
      <div className={inter.className}>
        <Header />
        {children}
      </div>
    </>
  )
}

export default DefaultLayout
