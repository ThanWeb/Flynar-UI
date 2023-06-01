import type { ReactElement } from 'react'
import DefaultLayout from '@/layouts/default'

const Home = (): ReactElement => {
  return (
    <main className='flex min-h-screen flex-col p-6 container m-auto'>
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
