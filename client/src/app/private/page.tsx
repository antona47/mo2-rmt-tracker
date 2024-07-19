import { redirect } from 'next/navigation'

import getSession from '@/request/internal/getSession'
import logout from '@/request/session/logout'

import PrivatePage from '@/components/PrivatePage'





const Page = async () => {
  const session = await getSession()

  //if not authenticated, logout and return home
  if (!session || !session.status) {
    await logout()
    redirect('/')
  }

  return (
    <PrivatePage sessionData={session} />
  )
}





export default Page