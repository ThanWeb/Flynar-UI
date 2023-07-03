import { useEffect, useState, type ReactElement } from 'react'
import DefaultLayout from '@/layouts/default'
import MenuHeader from '@/components/MenuHeader'
// import { FiEdit3, FiSettings, FiLogOut } from 'react-icons/fi'
import Header from '@/components/Header'
import Head from 'next/head'
import axios from 'axios'
import { useRouter } from 'next/router'
import NotificationItem from '../../components/NotificationItem'

const Notification = (): ReactElement => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const router = useRouter()
  const [notifications, setNotifications] = useState<Array<Record<string, any>>>([])

  useEffect(() => {
    void fetchNotifiaction()
  }, [])

  useEffect(() => {
    void checkLoggedIn()
  }, [])

  const checkLoggedIn = async (): Promise<void> => {
    try {
      const response = await axios.get('http://localhost:8000/api/v1/token', {
        withCredentials: true
      })
      sessionStorage.setItem('accessToken', response.data.accessToken)
      setIsLoggedIn(true)
    } catch (error) {
      console.error(error)
    }
  }

  const fetchNotifiaction = async (): Promise<void> => {
    const accessToken = sessionStorage.getItem('accessToken')
    try {
      const response = await axios.get('http://localhost:8000/api/v1/notification', {
        headers: {
          Authorization: `Bearer ${accessToken}`
        },
        withCredentials: true
      })
      setNotifications(response.data.data)
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.data?.message !== undefined && error.response?.data?.message !== null) {
          if (error.response.data.message === 'Silahkan Login') {
            setTimeout(() => {
              void router.push('/login')
            }, 2000)
          } else {
            console.error(error)
          }
        } else {
          console.error(error)
        }
      } else {
        console.error(error)
      }
    }
  }

  const readNotification = async (id: number): Promise<void> => {
    const accessToken = sessionStorage.getItem('accessToken')
    try {
      const response = await axios.put('http://localhost:8000/api/v1/notification', { id }, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        },
        withCredentials: true
      })
      await fetchNotifiaction()
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <Head>
        <title>Notification</title>
      </Head>
      <div id='notification-page' className=''>
        <Header isLoggedIn={isLoggedIn} login={async () => {}}/>
        <main className='mx-auto'>
          <MenuHeader pageTitle='Notifikasi' />
          <div className='container mx-auto w-4/5 flex flex-col gap-y-6'>
            {
              notifications.length > 0
                ? notifications.map((notification, index) =>
                  <NotificationItem key={index} id={notification.id} title={notification.title} label={notification.label} text={notification.text} isRead={notification.isRead} createdAt={notification.createdAt} readNotification={readNotification}/>
                )
                : <h2 className='text-center font-semibold text-lg'>Notifikasi kosong untuk saat ini</h2>
            }
          </div>
        </main>
      </div>
    </>
  )
}

Notification.getLayout = function getLayout (page: ReactElement) {
  return (
    <DefaultLayout>
      {page}
    </DefaultLayout>
  )
}

export default Notification
