import { IQuotesData } from '@@/interface/request/quotes'

import ModeButton from '@/components/common/ModeButton'
import Totals from './Totals'
import If from '@/components/abstract/If'





interface IOffers {
  quotes: IQuotesData[]
  loading: boolean
  Chart: any
}





const Offers = ({ quotes, loading, Chart }:IOffers) => {
  return (
    <div className="w-full mt-16">

      <div className="flex flex-row w-full my-2">
        <ModeButton value="offers" label="Offers" mode={"offers"} setMode={() => {}} />
      </div>

      <div className="flex w-full h-96 justify-center">

        <If condition={loading}>
          <span className="self-center">
            Loading...
          </span>
        </If>

        <If condition={!loading}>

          <If condition={quotes.length}>
            <Chart mode="offers" data={quotes} />
          </If>

          <If condition={!quotes.length}>
            <span className="self-center">
              [no data]
            </span>
          </If>

        </If>

      </div>

      <Totals quotes={quotes} />

    </div>
  )
}





export default Offers