import { createContext } from 'react'
import { IAUserData } from '@@/interface/request/admin/users'





//ENUMS

export enum AdminTab {
  USERS
}



export enum SortUsersBy {
  NAME, FIRST_LOGIN, LAST_LOGIN
}





//INTERFACES

interface IAdmin {
  tab: { value: AdminTab, set: (a:AdminTab) => void }
  announcement: { value: string, set: (a:string) => void }
  users: IAdminUsers
}



interface IAdminUsers {
  data: { value: IAUserData[], set: (a:IAUserData[]) => void }
  filters: {
    sortBy: { value: SortUsersBy, set: (a:SortUsersBy) => void },
    search: { value: string, set: (a:string) => void }
  }
}





//DEFALUTS

const set = () => {} //dummy function

export const adminDefaults:IAdmin = {
  tab: { value: AdminTab.USERS, set },
  announcement: { value: '', set },
  users: {
    data: { value: [], set },
    filters: {
      sortBy: { value: SortUsersBy.LAST_LOGIN, set },
      search: { value: '', set }
    }
  }
}





//CONTEXT

export const adminContext = createContext(adminDefaults)



export const adminConstructor = (
  tab: AdminTab, setTab: (a:AdminTab) => void,
  announcement: string, setAnnouncement: (a:string) => void,
  users: IAdminUsers
):IAdmin => ({
  tab: { value: tab, set: setTab },
  announcement: { value: announcement, set: setAnnouncement },
  users
})



export const adminUsersConstructor = (
  data: IAUserData[], setData: (a:IAUserData[]) => void,
  sortBy: SortUsersBy, setSortBy: (a:SortUsersBy) => void,
  search: string, setSearch: (a:string) => void
):IAdminUsers => ({
  data: { value: data, set: setData },
  filters: {
    sortBy: { value: sortBy, set: (a) => setSortBy(Number(a)) },
    search: { value: search, set: setSearch}
  }
})