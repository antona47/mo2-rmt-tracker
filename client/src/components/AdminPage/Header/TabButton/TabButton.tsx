import { useContext } from "react"
import { adminContext, AdminTab } from "@/context/admin.context"





interface ITabButton {
  tab: AdminTab
  label: string
}





const TabButton = ({ tab, label }:ITabButton) => {
  const admin = useContext(adminContext)


  //controls
  const onClick = () => {
    if (tab === admin.tab.value) return
    admin.tab.set(tab)
  }


  //decorators
  const getClass = ():string => {
    if (tab === admin.tab.value) return `underline`
    return `cursor-pointer hover:underline`
  }


  //return frame
  return (
    <div className={`py-0.5 px-4 mr-2 bg-slate-900 ${getClass()}`} onClick={onClick}>
      {label}
    </div>
  )
}





export default TabButton