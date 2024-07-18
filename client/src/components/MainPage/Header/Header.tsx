import { useContext } from 'react'
import { sessionContext } from '@/context/session.context'

import discordUri from './discordUri'

import style from './Header.module.scss'

import Image from "next/image"
import If from "@/components/abstract/If"






const Header = () => {
  const session = useContext(sessionContext)

  const avatarUrl = `${process.env.NEXT_PUBLIC_API_PATH}/image/avatar/${session.id}`
  const avatarStyle = { backgroundImage: `url(${avatarUrl})` }


  //controls
  const onLogin = () => {
    window.location.href = discordUri
  }

  const onPrivate = () => {
    window.location.href = '/private'
  }


  //return frame
  return (
    <div className="w-full">
      <div className="flex flex-row w-full max-w-5xl m-auto py-10 px-2">

        <div className="w-40"></div>

        <div className="grow flex justify-center">
          <Image src="/henrik.png" alt="Henrique" width="152" height="187" className="mt-4 mr-20" priority />
        </div>

        <div className="w-40 flex justify-end">

          <If condition={session.status}>
            <div className="p-1 bg-slate-900 h-fit rounded-full cursor-pointer" onClick={onPrivate}>
              <div className={style.avatar} style={avatarStyle} />
            </div>
          </If>

          <If condition={!session.status}>
            <div className="hover:underline cursor-pointer py-1 px-2 bg-slate-900 h-fit" onClick={onLogin}>
              Login
            </div>
          </If>

        </div>

      </div>
    </div>
  )
}





export default Header