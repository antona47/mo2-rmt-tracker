import { useContext, useEffect, useState } from "react"
import { sessionContext } from "@/context/session.context"

import Provider from "@@/enum/provider"

import Filters from '@/components/common/Filters'
import If from "@/components/abstract/If"





const Body = () => {
  const session = useContext(sessionContext)

  const hasAccess = session.hasAccess || session.isAdmin


  //filter state
  const [provider, setProvider] = useState(Provider.NONE)

  const now = new Date()
  const [startDate, setStartDate] = useState(new Date(now.getFullYear(), now.getMonth() - 3, now.getDate()))
  const [endDate, setEndDate] = useState(new Date(now.getFullYear(), now.getMonth(), now.getDate()))

  //data state


  //fetch
  useEffect(() => {
    
  }, [provider, startDate, endDate])


  //return frame
  return (
    <div className="flex flex-col w-full max-w-5xl mx-auto justify-center relative pt-4 pb-16 px-2">

      <Filters
        provider={provider} setProvider={setProvider}
        startDate={startDate} setStartDate={setStartDate}
        endDate={endDate} setEndDate={setEndDate}
      />

      <div className="w-full max-w-4xl m-auto">

        <If condition={!hasAccess}>
          <div className="w-full flex justify-center mt-40">
            Access request pending.
          </div>
        </If>

      </div>

    </div>
  )
}





export default Body