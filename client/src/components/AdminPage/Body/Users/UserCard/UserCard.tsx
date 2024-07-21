import { useContext } from 'react'
import { SortUsersBy, adminContext } from '@/context/admin.context'
import { dateString } from '@/components/AdminPage/utils'

import { IAUserData } from '@@/interface/request/admin/users'

import UserAvatar from '@/components/common/UserAvatar'





interface IUserCard {
  user: IAUserData
}





const UserCard = ({ user }:IUserCard) => {
  const admin = useContext(adminContext)

  const firstLogin = dateString(new Date(user.firstLogin))
  const lastLogin = dateString(new Date(user.lastLogin))


  //decorator
  const getDecorator = ():string => {
    if (user.isAdmin) return `border-green-600`
    if (user.hasAccess) return `border-slate-600`
    return `border-slate-900`
  }


  //populate final line
  const getStatLine = ():string => {
    const sortBy = admin.users.filters.sortBy.value
    if (sortBy === SortUsersBy.NAME) return `Last login: ${lastLogin}`
    if (sortBy === SortUsersBy.FIRST_LOGIN) return `First login: ${firstLogin}`
    if (sortBy === SortUsersBy.LAST_LOGIN) return `Last login: ${lastLogin}`
    return ``
  }


  //return frame
  return (
    <div className={`flex flex-row p-2 mr-2 mb-2 bg-slate-900 border rounded-xl ${getDecorator()}`}>
      <div className='self-top cursor-pointer'>
        <UserAvatar userId={user.discordId} size={80} />
      </div>
      <div className='flex flex-col self-center mx-4'>
        <div className='font-bold cursor-pointer hover:underline'>
          {user.name}
        </div>
        <div>
          Discord: {user.discordUsername}
        </div>
        <div>
          {getStatLine()}
        </div>
      </div>
    </div>
  )
}





export default UserCard