import getSession from '@/request/internal/getSession'

import MainPage from '@/components/MainPage'





const Page = async () => {
  const session = await getSession()

  return (
    <MainPage sessionData={session} />
  )
}





export default Page