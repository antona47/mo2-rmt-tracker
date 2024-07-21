import { redirect } from 'next/navigation'

import getSession from '@/request/internal/getSession'
import logout from '@/request/session/logout'

import AdminPage from '@/components/AdminPage'





const Page = async () => {
  const session = await getSession(true)

  //if not authenticated, logout and return home
  if (!session || !session.status) {
    await logout()
    redirect('/')
  }

  return (
    <AdminPage sessionData={session} />
  )
}





export default Page