'use client'

import { GoogleAnalytics } from 'nextjs-google-analytics'

import { ISessionResponse } from '@@/interface/request/internal/session'
import { sessionContext, sessionConstructor } from '@/context/session.context'

import styles from './PrivatePage.module.scss'

import Header from '@/components/common/Header'
import Body from './Body'





interface IPrivatePage {
  sessionData: ISessionResponse
}





const PrivatePage = ({ sessionData }:IPrivatePage) => {
  //initialize session context
  const session = sessionConstructor(sessionData)


  //return frame
  return (
    <sessionContext.Provider value={session}>

    <main className={`flex min-h-screen flex-col ${styles.main}`}>
      <GoogleAnalytics trackPageViews />
      <Header isPrivate />
      <Body/>
    </main>

    </sessionContext.Provider>
  )
}





export default PrivatePage