'use client'

import { GoogleAnalytics } from 'nextjs-google-analytics'

import MainPage from '@/components/MainPage'





const Page = () => {
  return (
    <>
      <GoogleAnalytics trackPageViews />
      <MainPage />
    </>
  )
}





export default Page