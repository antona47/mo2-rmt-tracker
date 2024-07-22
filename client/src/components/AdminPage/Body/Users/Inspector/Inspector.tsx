import { dateString } from '@/components/AdminPage/utils'

import { IAUserData } from '@@/interface/request/admin/users'

import style from './Inspector.module.scss'

import Modal from '@/components/abstract/Modal'
import UserAvatar from '@/components/common/UserAvatar'
import AccessSection from './AccessSection'






interface IInspector {
  isOpen: boolean
  onClose: () => void
  user: IAUserData
}





const Inspector = ({ isOpen, onClose, user }:IInspector) => {
  const firstLogin = dateString(new Date(user.firstLogin))
  const lastLogin = dateString(new Date(user.lastLogin))


  //decorator
  const getBorderClass = () => {
    if (user.isAdmin) return `border-green-600`
    if (user.hasAccess) return `border-slate-600`
    return `border-slate-900`
  }


  //return
  return (
    <Modal label="Inspect User" isOpen={isOpen} className={`max-w-2xl py-8 px-12 text-white bg-slate-900 border rounded-xl outline-none ${getBorderClass()}`} overlayClassName={style.overlayBG}>
      <div className='flex flex-col'>

        <div className='flex flex-row'>
          <div className='self-top'>
            <UserAvatar userId={user.discordId} size={100} />
          </div>
          <div className='flex flex-col self-top ml-6'>
            <div className='font-bold'>
              {user.name}
            </div>
            <div>
              Id: {user.discordId}
            </div>
            <div>
              Discord: {user.discordUsername}
            </div>
            <AccessSection user={user} />
          </div>
        </div>

        <div className='flex flex-row justify-between mt-4'>
          <div className='flex flex-col'>
            <div>
              First login:
            </div>
            <div>
              {firstLogin}
            </div>
          </div>
          <div className='flex flex-col text-right'>
            <div>
              Last login:
            </div>
            <div>
              {lastLogin}
            </div>
          </div>
        </div>

        <div className='flex flex-row justify-center mt-6'>
          <div className='cursor-pointer hover:underline mr-8' onClick={onClose}>
            Close
          </div>
        </div>

      </div>
    </Modal>
  )
}





export default Inspector