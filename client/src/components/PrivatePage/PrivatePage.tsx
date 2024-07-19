'use client'

import { GoogleAnalytics } from 'nextjs-google-analytics'

import { ISessionResponse } from '@@/interface/request/session'
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
    <main className={`flex min-h-screen flex-col ${styles.main}`}>
      <GoogleAnalytics trackPageViews />

      <sessionContext.Provider value={session}>
        <Header isPrivate />
        <Body/>
      </sessionContext.Provider>

    </main>
  )
}





export default PrivatePage