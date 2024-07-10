import dynamic from 'next/dynamic'
import { useEffect, useState } from "react"

import Provider from "@@/enum/provider"

import getSales from "@/request/data/sales"
import { ISalesData } from "@@/interface/request/sales"

import SelectProvider from "./Filters/SelectProvider"

import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"
import Filters from './Filters'

const Chart = dynamic(() => import('./Chart'))





const Body = () => {
  //filter state
  const [provider, setProvider] = useState(Provider.NONE)
  const now = new Date()
  const [startDate, setStartDate] = useState(new Date(now.getFullYear(), now.getMonth() - 3, now.getDate()))
  const [endDate, setEndDate] = useState(new Date(now.getFullYear(), now.getMonth(), now.getDate()))

  //data state
  const [sales, setSales] = useState<ISalesData[]>([])


  //fetch
  useEffect(() => {
    getSales({
      pkg: { provider, startDate, endDate },
      onSuccess: (resp) => setSales(resp.data)
    })
  }, [provider, startDate, endDate])


  //return frame
  return (
    <div className="flex flex-col w-full max-w-5xl mx-auto justify-center relative py-16 px-2">

      <Filters
        provider={provider} setProvider={setProvider}
        startDate={startDate} setStartDate={setStartDate}
        endDate={endDate} setEndDate={setEndDate}
      />

      <div className="w-full justify-center pt-8">
        <Chart mode="gold" sales={sales} />
      </div>

    </div>
  )
}





export default Body