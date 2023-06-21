import type { AppProps } from 'next/app'
import type { ReactElement } from 'react'
import { Fragment, useEffect } from 'react'
import type { Page } from '../types/page'
import '@/styles/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'

config.autoAddCss = false

type Props = AppProps & {
  Component: Page
}

export default function App ({ Component, pageProps }: Props): ReactElement {
  useEffect(() => {
    require('bootstrap/dist/js/bootstrap.bundle.min.js')
  }, [])
  const getLayout = Component.getLayout ?? (page => page)
  const Layout = Component.layout ?? Fragment
  return (
    <Layout>
      {getLayout(<Component {...pageProps} />)}
    </Layout>
  )
}
