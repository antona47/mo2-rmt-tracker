import Provider from "@@/enum/provider"

import SelectProvider from "./SelectProvider"
import DatePicker from "react-datepicker"

import "react-datepicker/dist/react-datepicker.css"





interface IFilters {
  provider: Provider
  setProvider: (a:Provider) => void
  startDate: Date
  setStartDate: (a:Date) => void
  endDate: Date
  setEndDate: (a:Date) => void
}





const Filters = ({ provider, setProvider, startDate, setStartDate, endDate, setEndDate }:IFilters) => {
  const maxDateRange = Number(process.env.NEXT_PUBLIC_MAX_DATE_RANGE)


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
  )
}





export default Filters