import dynamic from 'next/dynamic'
import { useEffect, useState } from "react"

import Provider from "@@/enum/provider"
import Period from '@@/enum/period'

import getSales from "@/request/data/sales"
import { ISalesData } from "@@/interface/request/sales"
import getQuotes from "@/request/data/quotes"
import { IQuotesData } from '@@/interface/request/quotes'

import Filters from '@/components/common/Filters'
import Sales from '@/components/common/Sales'
import Prices from '@/components/common/Prices'
import Offers from '@/components/common/Offers'

const Chart = dynamic(() => import('@/components/common/Chart'))





const Body = () => {
  //filter state
  const [provider, setProvider] = useState(Provider.NONE)
  const [period, setPeriod] = useState(Period.DAY)

  const now = new Date()
  const [startDate, setStartDate] = useState(new Date(now.getFullYear(), now.getMonth() - 3, now.getDate()))
  const [endDate, setEndDate] = useState(new Date(now.getFullYear(), now.getMonth(), now.getDate()))

  //data state
  const [sales, setSales] = useState<ISalesData[]>([])
  const [quotes, setQuotes] = useState<IQuotesData>({ minPrice: 0, maxPrice: 0, quotes: [] })

  const [loadingSales, setLoadingSales] = useState(true)
  const [loadingQuotes, setLoadingQuotes] = useState(true)


  //fetch
  useEffect(() => {
    setLoadingSales(true)
    setLoadingQuotes(true)

    getSales({
      pkg: { provider, period, startDate, endDate },
      onSuccess: (resp) => {
        setSales(resp.data)
        setLoadingSales(false)
      }
    })

    getQuotes({
      pkg: { provider, period, startDate, endDate },
      onSuccess: (resp) => {
        setQuotes(resp.data)
        setLoadingQuotes(false)
      }
    })
  }, [provider, period, startDate, endDate])


  //return
  return (
    <div className="flex flex-col w-full max-w-5xl mx-auto justify-center relative pt-4 pb-16 px-2">

      <Filters
        provider={provider} setProvider={setProvider}
        period={period} setPeriod={setPeriod}
        startDate={startDate} setStartDate={setStartDate}
        endDate={endDate} setEndDate={setEndDate}
      />

      <div className="w-full max-w-4xl m-auto mt-16">

        <Sales sales={sales} loading={loadingSales} Chart={Chart} />

        <Prices data={quotes} loading={loadingQuotes} Chart={Chart} />

        <Offers data={quotes} loading={loadingQuotes} Chart={Chart} />

      </div>

    </div>
  )
}





export default Body