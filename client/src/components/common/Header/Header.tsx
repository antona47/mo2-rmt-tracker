import { useContext } from 'react'
import { sessionContext } from '@/context/session.context'

import discordUri from './discordUri'
import logout from '@/request/session/logout'

import style from './Header.module.scss'

import Image from "next/image"
import If from "@/components/abstract/If"





interface IHeader {
  isPrivate?: boolean
}






const Header = ({ isPrivate }:IHeader) => {
  const session = useContext(sessionContext)

  const avatarUrl = `${process.env.NEXT_PUBLIC_API_PATH}/image/avatar/${session.id}`
  const avatarStyle = { backgroundImage: `url(${avatarUrl})` }


  //controls
  const onLogin = () => {
    window.location.href = discordUri
  }

  const onLogout = async () => {
    await logout(session)
    window.location.href = '/'
  }

  const onHome = () => {
    window.location.href = '/'
  }

  const onPrivate = () => {
    window.location.href = '/private'
  }

  const onAdmin = () => {
    window.location.href = '/admin'
  }


  //return frame
  return (
    <div className="w-full">
      <div className="flex flex-row w-full max-w-5xl m-auto py-10 px-2">

        <div className="w-40"></div>

        <div className="grow flex justify-center">
          <Image src="/henrik.png" alt="Henrique" width="152" height="187" className="mt-4 mr-20 cursor-pointer" priority onClick={onHome} />
        </div>

        <div className="w-40 flex justify-end">
          <div className="flex flex-col text-xs">

            <If condition={!session.status}>
              <div className="hover:underline cursor-pointer py-0.5 px-1 bg-slate-900 h-fit" onClick={onLogin}>
                Login
              </div>
            </If>

            <If condition={session.status}>

              <div className="self-center p-1 bg-slate-900 w-fit rounded-full cursor-pointer" onClick={onPrivate}>
                <div className={style.avatar} style={avatarStyle} />
              </div>

              <If condition={session.isAdmin}>
                <div className="hover:underline cursor-pointer py-0.5 px-1 mt-2 bg-slate-900 h-fit text-center" onClick={onAdmin}>
                  Admin
                </div>
              </If>

              <If condition={isPrivate}>
                <div className="hover:underline cursor-pointer py-0.5 px-1 mt-2 bg-slate-900 h-fit text-center" onClick={onLogout}>
                  Logout
                </div>
              </If>

            </If>

          </div>
        </div>

      </div>
    </div>
  )
}





export default Header