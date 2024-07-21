import { useContext, useEffect, useState } from "react"
import { adminContext } from "@/context/admin.context"

import { IAUserData } from "@@/interface/request/admin/users"

import UserCard from "./UserCard"





const Users = () => {
  const admin = useContext(adminContext)


  //data
  const [withAccess, setWithAccess] = useState<IAUserData[]>([])
  const [withoutAccess, setWithoutAccess] = useState<IAUserData[]>([])

  useEffect(() => {
    const withList:IAUserData[] = []
    const withoutList:IAUserData[] = []

    admin.users.data.value.forEach((user) => {
      if (user.hasAccess || user.isAdmin) withList.push(user)
      else withoutList.push(user)
    })

    setWithAccess(withList)
    setWithoutAccess(withoutList)
  }, admin.users.data.value)


  //return
  return (
    <div className="w-full flex flex-col">

      <div className="w-full flex flex-row mt-4">
        {withAccess.map((user) => (
          <UserCard user={user} />
        ))}
      </div>

      <div className="w-full flex flex-row mt-4">
        {withoutAccess.map((user) => (
          <UserCard user={user} />
        ))}
      </div>

    </div>
  )
}





export default Users