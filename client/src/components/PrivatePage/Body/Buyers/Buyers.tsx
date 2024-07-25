import { IBuyerData } from "@@/interface/request/private/buyers"





interface IBuyers {
  buyers: IBuyerData[]
  buyer: string | null
  setBuyer: (a:string | null) => void
  buyerSelectActive: boolean
}





const Buyers = ({ buyers, buyer, setBuyer, buyerSelectActive }:IBuyers) => {
  const getClass = () => {
    if (buyerSelectActive) return `mr-4 border-slate-700`
    return `w-0 border-transparent`
  }

  return (
    <div className={`border overflow-hidden whitespace-nowrap ${getClass()}`}>
      <div className="px-2 py-1">
        bla*** (4)
      </div>
    </div>
  )
}





export default Buyers