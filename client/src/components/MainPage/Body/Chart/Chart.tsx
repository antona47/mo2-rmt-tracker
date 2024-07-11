import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts'
import { ISalesData } from '@@/interface/request/sales'
import { IQuotesData } from '@@/interface/request/quotes'

import If from '@/components/abstract/If'
import GoldTooltip from './Tooltip/GoldTooltip'
import FiatTooltip from './Tooltip/FiatTooltip'
import PriceTooltip from './Tooltip/PriceTooltip'
import OffersTooltip from './Tooltip/OffersTooltip'





interface IChart {
  mode: "gold" | "fiat" | "price" | "offers"
  data: ISalesData[] | IQuotesData[]
}





const Chart = ({ mode, data }:IChart) => {
  //return frame
  return (
    <>

      <If condition={mode === "gold"}>
        <LineChart width={800} height={400} data={data}>
          <CartesianGrid stroke="#222" strokeDasharray="5 5" />
          <Line type="step" dataKey="amount" stroke="#FFD700" dot={false} />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip content={<GoldTooltip />} />
        </LineChart>
      </If>

      <If condition={mode === "fiat"}>
        <LineChart width={800} height={400} data={data}>
          <CartesianGrid stroke="#222" strokeDasharray="5 5" />
          <Line type="step" dataKey="value" stroke="#47B33D" dot={false} />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip content={<FiatTooltip />} />
        </LineChart>
      </If>

      <If condition={mode === "price"}>
        <LineChart width={800} height={400} data={data}>
          <CartesianGrid stroke="#222" strokeDasharray="5 5" />
          <Line type="step" dataKey="price" stroke="#F58B00" dot={false} />
          <XAxis dataKey="date" />
          <YAxis type="number" domain={['dataMin - 2', 'dataMax + 2']} unit=" $" />
          <Tooltip content={<PriceTooltip />} />
        </LineChart>
      </If>

      <If condition={mode === "offers"}>
        <LineChart width={800} height={400} data={data}>
          <CartesianGrid stroke="#222" strokeDasharray="5 5" />
          <Line type="step" dataKey="offers" stroke="#B837A9" dot={false} />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip content={<OffersTooltip />} />
        </LineChart>
      </If>

    </>
  )
}





export default Chart