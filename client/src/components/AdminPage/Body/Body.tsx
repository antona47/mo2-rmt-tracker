import { useContext } from "react"
import { adminContext, AdminTab } from "@/context/admin.context"

import If from "@/components/abstract/If"
import Users from "./Users"





const Body = () => {
  const admin = useContext(adminContext)


  //return frame
  return (
    <div className="w-full px-20">

      <If condition={AdminTab.USERS === admin.tab.value}>
        <Users/>
      </If>

    </div>
  )
}





export default Body