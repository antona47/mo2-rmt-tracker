import { IQuotesData } from '@@/interface/request/quotes'

import Totals from './Totals'
import If from '@/components/abstract/If'





interface IOffers {
  quotes: IQuotesData[]
  Chart: any
}





const Offers = ({ quotes, Chart }:IOffers) => {
  return (
    <div className="mx-auto mt-16">

      <div className="flex flex-row w-full my-2">
        <p className='min-w-32 px-4 text-center border border-slate-900 bg-slate-900'>
          Offers
        </p>
      </div>

      

      <If condition={quotes.length}>
        <Chart mode="offers" data={quotes} />
        <Totals quotes={quotes} />
      </If>

      <If condition={!quotes.length}>
        <div className="w-full text-center my-8">
          Loading...
        </div>
      </If>

    </div>
  )
}





export default Offers