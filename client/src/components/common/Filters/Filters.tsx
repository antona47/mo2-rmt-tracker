import Provider from "@@/enum/provider"

import Selector from "@/components/abstract/Selector"
import BuyerButton from "./BuyerButton"
import DatePicker from "react-datepicker"
import If from "@/components/abstract/If"
import "react-datepicker/dist/react-datepicker.css"





interface IFilters {
  provider: Provider
  setProvider: (a:Provider) => void
  startDate: Date
  setStartDate: (a:Date) => void
  endDate: Date
  setEndDate: (a:Date) => void
  buyer?: string | null
  buyerSelectActive?: boolean
  onBuyerClick?: () => void
}





const Filters = ({ provider, setProvider, startDate, setStartDate, endDate, setEndDate, buyer, buyerSelectActive, onBuyerClick }:IFilters) => {
  const maxDateRange = Number(process.env.NEXT_PUBLIC_MAX_DATE_RANGE)


  //controls
  const onProviderChange = (value:any) => {
    setProvider(Number(value))
  }

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
    <div className="flex flex-row w-full justify-between border-b-2 border-slate-900 pb-2">

      <div className="flex flex-row">
        <Selector className="min-w-40 bg-gray-900 px-1 py-0.5 cursor-pointer outline-none" options={[
          { value: Provider.NONE, label: "All Sites" },
          { value: Provider.PLAYER_AUCTIONS, label: "Player Auctions" }
        ]} value={provider} setValue={onProviderChange} />
        <If condition={buyer || onBuyerClick}>
          <BuyerButton buyer={buyer} isActive={buyerSelectActive} onBuyerClick={onBuyerClick} />
        </If>
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
  )
}





export default Filters