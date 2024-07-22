import { IAUserData } from "@@/interface/request/admin/users"

import If from "@/components/abstract/If"





interface IAccessSection {
  user: IAUserData
}





const AccessSection = ({ user }:IAccessSection) => {
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

      <div className="ml-2">
        <If condition={!user.isAdmin}>
          <If condition={user.hasAccess}>
            (revoke)
          </If>
          <If condition={!user.hasAccess}>
            (grant)
          </If>
        </If>
      </div>

    </div>
  )
}





export default AccessSection