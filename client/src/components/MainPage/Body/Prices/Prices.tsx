import { IQuotesData } from '@@/interface/request/quotes'

import Totals from './Totals'





interface IPrices {
  quotes: IQuotesData[]
  Chart: any
}





const Prices = ({ quotes, Chart }:IPrices) => {
  return (
    <div className="mx-auto mt-16">

      <div className="flex flex-row w-full my-2">
        <p className='min-w-32 px-4 text-center border border-slate-900 bg-slate-900'>
          Price
        </p>
      </div>

      <Chart mode="price" data={quotes} />

      <Totals quotes={quotes} />

    </div>
  )
}





export default Prices