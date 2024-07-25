import dynamic from "next/dynamic"
import { useContext, useEffect, useState } from "react"
import { sessionContext } from "@/context/session.context"

import Provider from "@@/enum/provider"
import { ISalesData, ISalesRequest } from "@@/interface/request/sales"
import { IQuotesData } from "@@/interface/request/quotes"

import getSales from "@/request/data/sales"
import getQuotes from "@/request/data/quotes"

import If from "@/components/abstract/If"
import Filters from '@/components/common/Filters'
import Buyers from "./Buyers"
import Sales from "./Sales"

const Chart = dynamic(() => import('@/components/common/Chart'))





const Body = () => {
  const session = useContext(sessionContext)

  const hasAccess = session.hasAccess || session.isAdmin


  //filter state
  const [provider, setProvider] = useState(Provider.NONE)
  const [buyer, setBuyer] = useState<string | null>(null)
  const [buyerSelectActive, setBuyerSelectActive] = useState(false)

  const now = new Date()
  const [startDate, setStartDate] = useState(new Date(now.getFullYear(), now.getMonth() - 3, now.getDate()))
  const [endDate, setEndDate] = useState(new Date(now.getFullYear(), now.getMonth(), now.getDate()))

  //data state
  const [sales, setSales] = useState<ISalesData[]>([])
  const [quotes, setQuotes] = useState<IQuotesData[]>([])

  const [loadingSales, setLoadingSales] = useState(true)
  const [loadingQuotes, setLoadingQuotes] = useState(true)


  //fetch
  useEffect(() => {
    setLoadingSales(true)
    setLoadingQuotes(true)

    const salesPkg:ISalesRequest = { provider, startDate, endDate }
    if (buyer) salesPkg.buyer = buyer

    getSales({
      pkg: salesPkg,
      onSuccess: (resp) => {
        setSales(resp.data)
        setLoadingSales(false)
      }
    })
  }, [provider, buyer, startDate, endDate])


  useEffect(() => {
    setLoadingQuotes(true)

    getQuotes({
      pkg: { provider, startDate, endDate },
      onSuccess: (resp) => {
        setQuotes(resp.data)
        setLoadingQuotes(false)
      }
    })
  }, [provider, startDate, endDate])


  //controls
  const onBuyerClick = () => {
    setBuyerSelectActive(!buyerSelectActive)
  }


  //return frame
  return (
    <div className="flex flex-col w-full max-w-5xl mx-auto justify-center relative pt-4 pb-16 px-2">

      <Filters
        provider={provider} setProvider={setProvider}
        startDate={startDate} setStartDate={setStartDate}
        endDate={endDate} setEndDate={setEndDate}
        buyer={buyer} buyerSelectActive={buyerSelectActive} onBuyerClick={onBuyerClick}
      />

      <div className="w-full max-w-4xl m-auto">

        <If condition={!hasAccess}>
          <div className="w-full flex justify-center mt-40">
            Access request pending.
          </div>
        </If>

        <If condition={hasAccess}>
          <div className="flex flex-row w-full mt-16">
            <Buyers buyers={[]} buyer={buyer} setBuyer={setBuyer} buyerSelectActive={buyerSelectActive} />
            <Sales sales={sales} loading={loadingSales} Chart={Chart} />
          </div>
        </If>

      </div>

    </div>
  )
}





export default Body