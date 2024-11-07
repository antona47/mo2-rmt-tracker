import { IQuotesData } from '@@/interface/request/quotes'

import ModeButton from '@/components/common/ModeButton'
import If from '@/components/abstract/If'
import Totals from './Totals'





interface IPrices {
  data: IQuotesData
  loading: boolean
  Chart: any
}





const Prices = ({ data, loading, Chart }:IPrices) => {
  return (
    <div className="w-full mt-16">

      <div className="flex flex-row w-full my-2">
        <ModeButton value="price" label="Price" mode={"price"} setMode={() => {}} />
      </div>

      <div className="flex w-full h-96 justify-center">

        <If condition={loading}>
          <span className="self-center">
            Loading...
          </span>
        </If>

        <If condition={!loading}>

          <If condition={data.quotes.length}>
            <Chart mode="price" data={data.quotes} />
          </If>

          <If condition={!data.quotes.length}>
            <span className="self-center">
              [no data]
            </span>
          </If>

        </If>

      </div>

      <Totals data={data} />

    </div>
  )
}





export default Prices