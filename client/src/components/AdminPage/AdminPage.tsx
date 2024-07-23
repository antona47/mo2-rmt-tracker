'use client'

import { useEffect, useReducer, useState } from 'react'
import { sessionContext, sessionConstructor } from '@/context/session.context'
import { adminContext, adminConstructor, adminDefaults, adminUsersConstructor } from '@/context/admin.context'

import { ISessionResponse } from '@@/interface/request/internal/session'
import getUsers from '@/request/admin/users'

import style from './AdminPage.module.scss'

import Announcement from './Announcement'
import Header from './Header'
import Body from './Body'





interface IAdminPage {
  sessionData: ISessionResponse
}





const AdminPage = ({ sessionData }:IAdminPage) => {
  //initialize contexts
  const session = sessionConstructor(sessionData)

  const admin = adminConstructor(
    ...useState(adminDefaults.tab.value),
    ...useState(adminDefaults.announcement.value),
    adminUsersConstructor(
      ...useState(adminDefaults.users.data.value),
      ...useState(adminDefaults.users.filters.sortBy.value),
      ...useState(adminDefaults.users.filters.search.value)
    )
  )


  //data
  useEffect(() => {
    getUsers({
      session,
      onSuccess: ((resp) => admin.users.data.set(resp.data))
    })
  }, [])


  //return frame
  return (
    <sessionContext.Provider value={session}>
    <adminContext.Provider value={admin}>

    <main className={`flex min-h-screen flex-col ${style.main}`}>
      <Announcement/>
      <Header/>
      <Body/>
    </main>

    </adminContext.Provider>
    </sessionContext.Provider>
  )
}





export default AdminPage