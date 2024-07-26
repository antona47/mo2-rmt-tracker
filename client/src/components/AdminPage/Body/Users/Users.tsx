import { useContext, useEffect, useState } from "react"
import { adminContext, SortUsersBy } from "@/context/admin.context"

import { IAUserData } from "@@/interface/request/admin/users"

import UserCard from "./UserCard"
import Inspector from "./Inspector"





const Users = () => {
  const admin = useContext(adminContext)

  const [inspectorOpen, setInspectorOpen] = useState(false)
  const [inspectorData, setInspectorData] = useState<IAUserData>(dummyUser)


  //controls
  const onInspect = (user:IAUserData) => {
    setInspectorData(user)
    setInspectorOpen(true)
  }

  const onInspectorClose = () => {
    setInspectorOpen(false)
  }


  //data
  const [withAccess, setWithAccess] = useState<IAUserData[]>([])
  const [withoutAccess, setWithoutAccess] = useState<IAUserData[]>([])

  useEffect(() => {
    const withList:IAUserData[] = []
    const withoutList:IAUserData[] = []

    //popoulate
    admin.users.data.value.forEach((user) => {
      if (!userPassesFilter(user, admin.users.filters.search.value)) return
      if (user.hasAccess || user.isAdmin) withList.push(user)
      else withoutList.push(user)
    })

    //sort
    withList.sort(sortUsers(admin.users.filters.sortBy.value))
    withoutList.sort(sortUsers(admin.users.filters.sortBy.value))

    //apply
    setWithAccess(withList)
    setWithoutAccess(withoutList)
  }, [admin.users.data.value, admin.users.filters])


  //return
  return (
    <div className="w-full flex flex-col">

      <div className="w-full flex flex-row mt-4">
        {withAccess.map((user, i) => (
          <UserCard user={user} key={i} onInspect={onInspect} />
        ))}
      </div>

      <div className="w-full flex flex-row mt-4">
        {withoutAccess.map((user, i) => (
          <UserCard user={user} key={i} onInspect={onInspect} />
        ))}
      </div>

      <Inspector isOpen={inspectorOpen} user={inspectorData} onClose={onInspectorClose} />

    </div>
  )
}





export default Users





//HELPERS

const userPassesFilter = (user:IAUserData, search:string):boolean => {
  if (search.length) {
    const regExp = new RegExp(search, 'i')
    if (user.name.search(regExp) < 0) return false
  }

  return true
}



const sortUsers = (sortBy:SortUsersBy) => (a:IAUserData, b:IAUserData):number => {
  if (sortBy === SortUsersBy.NAME) return a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1
  if (sortBy === SortUsersBy.FIRST_LOGIN) return a.firstLogin < b.firstLogin ? -1 : 1
  if (sortBy === SortUsersBy.LAST_LOGIN) return a.lastLogin > b.lastLogin ? -1 : 1
  return a.id < b.id ? -1 : 1
}



const dummyUser:IAUserData = {
  id: 0,
  discordId: '',
  discordUsername: '',
  name: '',
  hasAccess: false,
  isAdmin: false,
  firstLogin: new Date(),
  lastLogin: new Date()
}