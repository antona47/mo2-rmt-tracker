'use client'

import { GoogleAnalytics } from 'nextjs-google-analytics'

import { sessionContext, sessionDataDefaults, ISessionData, sessionConstructor } from '@/context/session.context'

import styles from './MainPage.module.scss'

import Announcement from './Announcement'
import Header from './Header'
import Body from './Body'





interface IMainPage {
  sessionData: ISessionData | null
}





const MainPage = ({ sessionData }:IMainPage) => {
  //initialize session context
  const session = sessionConstructor(sessionData || sessionDataDefaults)


  //return frame
  return (
    <main className={`flex min-h-screen flex-col ${styles.main}`}>
      <GoogleAnalytics trackPageViews />

      <sessionContext.Provider value={session}>
        <Announcement />
        <Header/>
        <Body/>
      </sessionContext.Provider>

    </main>
  )
}





export default MainPage