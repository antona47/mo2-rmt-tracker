import { useContext } from "react"
import { sessionContext } from "@/context/session.context"
import { AdminTab } from "@/context/admin.context"

import TabButton from "./TabButton"
import Filters from "./Filters"
import UserAvatar from "@/components/common/UserAvatar"





const Header = () => {
  const session = useContext(sessionContext)


  //controls
  const onPrivate = () => {
    window.location.href = '/private'
  }


  //return frame
  return (
    <div className="w-full px-20">

      <div className="flex flex-row w-full justify-end mt-4 mb-2">
        <div className="self-center p-1 bg-slate-900 h-fit rounded-full cursor-pointer" onClick={onPrivate}>
          <UserAvatar userId={session.id} size={50} />
        </div>
      </div>

      <div className="flex flex-row justify-between py-2 border-b-2 border-slate-900">
        <div className="flex flex-row w-full justify-start">
          <TabButton label="Users" tab={AdminTab.USERS} />
        </div>
        <Filters/>
      </div>

    </div>
  )
}





export default Header