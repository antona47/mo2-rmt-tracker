import dynamic from 'next/dynamic'
import { useEffect, useState } from "react"

import Provider from "@@/enum/provider"

import getSales from "@/request/data/sales"
import { ISalesData } from "@@/interface/request/sales"
import getQuotes from "@/request/data/quotes"
import { IQuotesData } from '@@/interface/request/quotes'

import Filters from './Filters'
import Sales from './Sales'
import Prices from './Prices'
import Offers from './Offers'

const Chart = dynamic(() => import('./Chart'))





const Body = () => {
  //filter state
  const [provider, setProvider] = useState(Provider.NONE)

  const now = new Date()
  const [startDate, setStartDate] = useState(new Date(now.getFullYear(), now.getMonth() - 3, now.getDate()))
  const [endDate, setEndDate] = useState(new Date(now.getFullYear(), now.getMonth(), now.getDate()))

  //data state
  const [sales, setSales] = useState<ISalesData[]>([])
  const [quotes, setQuotes] = useState<IQuotesData[]>([])


  //fetch
  useEffect(() => {
    getSales({
      pkg: { provider, startDate, endDate },
      onSuccess: (resp) => setSales(resp.data)
    })

    getQuotes({
      pkg: { provider, startDate, endDate },
      onSuccess: (resp) => setQuotes(resp.data)
    })
  }, [provider, startDate, endDate])


  //return frame
  return (
    <div className="flex flex-col w-full max-w-5xl mx-auto justify-center relative pt-4 pb-16 px-2">

      <Filters
        provider={provider} setProvider={setProvider}
        startDate={startDate} setStartDate={setStartDate}
        endDate={endDate} setEndDate={setEndDate}
      />

      <Sales sales={sales} Chart={Chart} />

      <Prices quotes={quotes} Chart={Chart} />

      <Offers quotes={quotes} Chart={Chart} />

    </div>
  )
}





export default Body