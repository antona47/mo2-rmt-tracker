import { useContext } from "react"
import { adminContext, AdminTab, SortUsersBy } from "@/context/admin.context"

import SearchField from "./SearchField"
import Selector from "@/components/abstract/Selector"
import If from "@/components/abstract/If"





const Filters = () => {
  const admin = useContext(adminContext)


  //return
  return (
    <div className="flex flex-row text-nowrap">

      <If condition={admin.tab.value === AdminTab.USERS}>
        <div>
          <SearchField className="w-40 px-2 py-0.5 rounded-xl bg-slate-900"
            prop={admin.users.filters.search}
          />
        </div>
        <div className="ml-4">
          Sort by:
          <Selector<SortUsersBy> className="ml-2 py-0.5 pl-1 bg-slate-900"
            options={[
              { value: SortUsersBy.NAME, label: "Name" },
              { value: SortUsersBy.FIRST_LOGIN, label: "First Login" },
              { value: SortUsersBy.LAST_LOGIN, label: "Last Login" },
            ]}
            value={admin.users.filters.sortBy.value}
            setValue={admin.users.filters.sortBy.set}
          />
        </div>
      </If>

    </div>
  )
}





export default Filters