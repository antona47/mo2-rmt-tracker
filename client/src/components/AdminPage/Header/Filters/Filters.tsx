import { useContext } from "react"
import { adminContext, AdminTab, SortUsersBy } from "@/context/admin.context"

import If from "@/components/abstract/If"
import SortSelector from "./SortSelector"





const Filters = () => {
  const admin = useContext(adminContext)


  //return
  return (
    <div className="text-nowrap">

      <If condition={admin.tab.value === AdminTab.USERS}>
        Sort by:
        <SortSelector sort={admin.users.filters.sortBy} options={[
          { value: SortUsersBy.NAME, label: "Name" },
          { value: SortUsersBy.FIRST_LOGIN, label: "First Login" },
          { value: SortUsersBy.LAST_LOGIN, label: "Last Login" },
        ]} />
      </If>

    </div>
  )
}





export default Filters