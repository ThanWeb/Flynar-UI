import type { ReactElement } from 'react'
import DefaultLayout from '@/layouts/default'

const Home = (): ReactElement => {
  return (
    <main>
      <p>Welcome to Flynar</p>
    </main>
  )
}

Home.getLayout = function getLayout (page: ReactElement) {
  return (
    <DefaultLayout>
      {page}
    </DefaultLayout>
  )
}

export default Home
