import dynamic from 'next/dynamic'
import { useEffect, useState } from "react"

import Provider from "@@/enum/provider"

import getSales from "@/request/data/sales"
import { ISalesData } from "@@/interface/request/sales"

import SelectProvider from "./SelectProvider"

import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"

const Chart = dynamic(() => import('./Chart'))





const Body = () => {
  const maxDateRange = Number(process.env.NEXT_PUBLIC_MAX_DATE_RANGE)

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
      pkg: {
        provider,
        startDate: startDate,
        endDate: endDate
      },
      onSuccess: (resp) => setSales(resp.data)
    })
  }, [provider, startDate, endDate])


  //controls
  const onStartDateChange = (date:Date | null) => {
    if (!date) return
    if (endDate.getTime() - date.getTime() > maxDateRange) {
      setEndDate(new Date(date.getTime() + maxDateRange))
    }
    setStartDate(date)
  }

  const onEndDateChange = (date:Date | null) => {
    if (!date) return
    if (date.getTime() - startDate.getTime() > maxDateRange) {
      setStartDate(new Date(date.getTime() - maxDateRange))
    }
    setEndDate(date)
  }


  //return frame
  return (
    <div className="flex flex-col w-full max-w-5xl mx-auto justify-center relative py-16 px-2">

      <div className="flex flex-row w-full justify-between">
        <div>
          <SelectProvider value={provider} setValue={setProvider} options={[
            { value: Provider.NONE, label: "All" },
            { value: Provider.PLAYER_AUCTIONS, label: "Player Auctions" }
          ]} />
        </div>
        <div className="flex flex-row">
          <div>
            From:
            <DatePicker className="bg-slate-900 text-center ml-2"
              dateFormat={"dd-MM-yyyy"}
              selected={startDate}
              onChange={onStartDateChange}
              selectsStart
              startDate={startDate}
              endDate={endDate}
            />
          </div>
          <div className="ml-4">
            To:
            <DatePicker className="bg-slate-900 text-center ml-2"
              dateFormat={"dd-MM-yyyy"}
              selected={endDate}
              onChange={onEndDateChange}
              selectsStart
              startDate={startDate}
              endDate={endDate}
            />
          </div>
        </div>
      </div>

      <div className="w-full justify-center pt-8">
        <Chart sales={sales} />
      </div>

    </div>
  )
}





export default Body