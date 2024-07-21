'use client'

import { GoogleAnalytics } from 'nextjs-google-analytics'

import { ISessionResponse } from '@@/interface/request/internal/session'
import { sessionContext, sessionConstructor } from '@/context/session.context'

import styles from './MainPage.module.scss'

import Announcement from './Announcement'
import Header from '@/components/common/Header'
import Body from './Body'





interface IMainPage {
  sessionData: ISessionResponse | null
}





const MainPage = ({ sessionData }:IMainPage) => {
  //initialize session context
  const session = sessionConstructor(sessionData)


  //return frame
  return (
    <sessionContext.Provider value={session}>

    <main className={`flex min-h-screen flex-col ${styles.main}`}>
      <GoogleAnalytics trackPageViews />
      <Announcement/>
      <Header/>
      <Body/>
    </main>

    </sessionContext.Provider>
  )
}





export default MainPage