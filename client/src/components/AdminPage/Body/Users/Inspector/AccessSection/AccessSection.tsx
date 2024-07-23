import { useContext, useState } from "react"
import { sessionContext } from "@/context/session.context"
import { adminContext } from "@/context/admin.context"

import { IAUserData } from "@@/interface/request/admin/users"
import setAccess from "@/request/admin/setAccess"

import If from "@/components/abstract/If"





interface IAccessSection {
  user: IAUserData
}





const AccessSection = ({ user }:IAccessSection) => {
  const session = useContext(sessionContext)
  const admin = useContext(adminContext)

  const [accessLoading, setAccessLoading] = useState(false)


  //controls
  const onSetAccess = async (value:boolean) => {
    if (accessLoading) return
    setAccessLoading(true)

    await setAccess({
      session,
      pkg: { userId: user.id, setAccess: value },
      onSuccess: () => {
        admin.users.data.set(admin.users.data.value.map((u) => {
          if (u.id === user.id) u.hasAccess = value
          return u
        }))
      },
      onFail: (data) => admin.announcement.set(`[${data.err_code}] ${data.err_message}`),
      onError: (resp) => admin.announcement.set(`[${resp.status}] ${resp.data.message} - ${resp.config.url}`)
    })

    setAccessLoading(false)
  }


  //decorators
  const getAccessButtonClass = ():string => {
    if (accessLoading) return ``
    return `hover:underline cursor-pointer`
  }


  //return
  return (
    <div className='flex flex-row'>

      <div>
        Access:&nbsp;
        <If condition={user.isAdmin}>
          ADMIN
        </If>
        <If condition={!user.isAdmin}>
          <If condition={user.hasAccess}>
            GRANTED
          </If>
          <If condition={!user.hasAccess}>
            NONE
          </If>
        </If>
      </div>

      <div>
        &nbsp;
        <If condition={!user.isAdmin}>
          <If condition={user.hasAccess}>
            (
            <span className={`hover:text-red-600 ${getAccessButtonClass()}`} onClick={() => onSetAccess(false)} >
              revoke
            </span>
            )
          </If>
          <If condition={!user.hasAccess}>
            (
            <span className={`hover:text-green-400 ${getAccessButtonClass()}`} onClick={() => onSetAccess(true)} >
              grant
            </span>
            )
          </If>
        </If>
      </div>

    </div>
  )
}





export default AccessSection