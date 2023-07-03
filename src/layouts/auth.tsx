import type { ReactElement } from 'react'
import { Poppins } from 'next/font/google'
import Head from 'next/head'

interface IAuthPageLayoutProps {
  children: React.ReactNode
}

const poppins = Poppins({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
  subsets: ['devanagari']
})

const AuthPageLayout = ({ children }: IAuthPageLayoutProps): ReactElement => {
  return (
    <>
      <Head>
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
        <link rel='icon' href='/favicon/favicon.ico' sizes='any' />
        <link rel='apple-touch-icon' href='/favicon/apple-touch-icon.png' type='image/png' sizes='any' />
      </Head>
      <div className={poppins.className}>
        {children}
      </div>
    </>
  )
}

export default AuthPageLayout
