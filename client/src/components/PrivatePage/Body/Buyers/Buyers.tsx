import { useEffect, useState } from "react"

import { IBuyerData } from "@@/interface/request/private/buyers"

import If from "@/components/abstract/If"
import Selector from "@/components/abstract/Selector"

import style from "./Buyers.module.scss"





enum SortBuyersBy {
  NAME, TRANSACTIONS, VOLUME, LATEST
}





interface IBuyers {
  buyers: IBuyerData[]
  loading: boolean
  selected: string | null
  setSelected: (a:string | null) => void
  buyerSelectActive: boolean
}





const Buyers = ({ buyers, loading, selected, setSelected, buyerSelectActive }:IBuyers) => {
  const [sortBy, setSortBy] = useState(SortBuyersBy.LATEST)
  const [search, setSearch] = useState('')

  const [displayed, setDisplayed] = useState<IBuyerData[]>([])


  //data
  useEffect(() => {
    const filtered = buyers.filter(filterBuyers(search))
    setDisplayed(filtered.sort(sortBuyers(sortBy)))
  }, [buyers, sortBy])


  //controls
  const onSortBuyersByChange = (value:any) => {
    setSortBy(Number(value))
  }


  //decorators
  const getContainerClass = () => {
    if (buyerSelectActive) return `mr-8`
    return `w-0`
  }

  const getBuyerClass = (buyer:IBuyerData | null) => {
    if (!buyer && !selected) return `font-bold underline`
    if (buyer?.buyer === selected) return `font-bold underline`
    return `cursor-pointer hover:underline`
  }


  //return
  return (
    <div className={`overflow-hidden ${style.container} ${getContainerClass()}`}>

      <div className="flex flex-row my-2">
        <Selector className="px-2 py-0.5 bg-slate-900 cursor-pointer outline-none" options={[
          { value: SortBuyersBy.NAME, label: "Name" },
          { value: SortBuyersBy.TRANSACTIONS, label: "Transactions" },
          { value: SortBuyersBy.VOLUME, label: "Volume" },
          { value: SortBuyersBy.LATEST, label: "Latest" }
        ]} value={sortBy} setValue={onSortBuyersByChange} />
      </div>

      <div className={`whitespace-nowrap bg-slate-900 py-1`}>
        <div className={`max-h-96 flex flex-col pl-4 pr-2 py-1 overflow-y-auto ${style.scroller}`}>

          <If condition={loading}>
            Loading...
          </If>

          <If condition={!loading}>

            <If condition={!displayed.length}>
              [no data]
            </If>

            <If condition={displayed.length}>
              <div className={`${getBuyerClass(null)}`} onClick={() => setSelected(null)}>
                All ({displayed.length})
              </div>
              {displayed.map((buyer, i) => (
                <div key={i} className={`${getBuyerClass(buyer)}`} onClick={() => setSelected(buyer.buyer)}>
                  {buyer.buyer}
                </div>
              ))}
            </If>

          </If>

        </div>
      </div>

    </div>
  )
}





export default Buyers





//HELPERS

const filterBuyers = (search:string) => (buyer:IBuyerData):boolean => {
  if (search.length) {
    const regExp = new RegExp(search, 'i')
    if (buyer.buyer.search(regExp) >= 0) return true
    return false
  }

  return true
}





const sortBuyers = (sortBy:SortBuyersBy) => (a:IBuyerData, b:IBuyerData):number => {
  if (sortBy === SortBuyersBy.NAME) return a.buyer.toLowerCase() < b.buyer.toLowerCase() ? -1 : 1
  if (sortBy === SortBuyersBy.TRANSACTIONS) return a.transactions < b.transactions ? 1 : -1
  if (sortBy === SortBuyersBy.VOLUME) return a.volume < b.volume ? 1 : -1
  if (sortBy === SortBuyersBy.LATEST) return a.latest < b.latest ? 1 : -1
  return a.latest < b.latest ? 1 : -1
}