import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
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
  const formatDate = (date:string):string => {
    return date.slice(0, date.lastIndexOf('/'))
  }

  //return frame
  return (
    <>

      <If condition={mode === "gold"}>
        <ResponsiveContainer>
          <LineChart data={data}>
            <CartesianGrid stroke="#222" strokeDasharray="5 5" />
            <Line type="step" dataKey="amount" stroke="#FFD700" dot={false} />
            <XAxis dataKey="date" tickFormatter={formatDate} />
            <YAxis />
            <Tooltip content={<GoldTooltip />} />
          </LineChart>
        </ResponsiveContainer>
      </If>

      <If condition={mode === "fiat"}>
        <ResponsiveContainer>
          <LineChart data={data}>
            <CartesianGrid stroke="#222" strokeDasharray="5 5" />
            <Line type="step" dataKey="value" stroke="#47B33D" dot={false} />
            <XAxis dataKey="date" tickFormatter={formatDate} />
            <YAxis />
            <Tooltip content={<FiatTooltip />} />
          </LineChart>
        </ResponsiveContainer>
      </If>

      <If condition={mode === "price"}>
        <ResponsiveContainer>
          <LineChart width={800} height={400} data={data}>
            <CartesianGrid stroke="#222" strokeDasharray="5 5" />
            <Line type="step" dataKey="price" stroke="#F58B00" dot={false} />
            <XAxis dataKey="date" tickFormatter={formatDate} />
            <YAxis type="number" domain={['dataMin - 2', 'dataMax + 2']} unit=" $" />
            <Tooltip content={<PriceTooltip />} />
          </LineChart>
        </ResponsiveContainer>
      </If>

      <If condition={mode === "offers"}>
        <ResponsiveContainer>
          <LineChart width={800} height={400} data={data}>
            <CartesianGrid stroke="#222" strokeDasharray="5 5" />
            <Line type="natural" dataKey="offers" stroke="#B837A9" dot={false} />
            <XAxis dataKey="date" tickFormatter={formatDate} />
            <YAxis />
            <Tooltip content={<OffersTooltip />} />
          </LineChart>
        </ResponsiveContainer>
      </If>

    </>
  )
}





export default Chart