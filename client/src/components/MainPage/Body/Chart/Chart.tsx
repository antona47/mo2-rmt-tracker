import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts'
import { ISalesData } from '@@/interface/request/sales'
import { IQuotesData } from '@@/interface/request/quotes'

import If from '@/components/abstract/If'





const tooltipStyle = {
  borderColor: '#333',
  backgroundColor: '#111'
}





interface IChart {
  mode: "gold" | "fiat"
  sales?: ISalesData[]
  prices?: IQuotesData[]
}





const Chart = ({ mode, sales, prices }:IChart) => {
  //return frame
  return (
    <>

      <If condition={sales}>

        <If condition={mode === "gold"}>
          <LineChart width={800} height={400} data={sales}>
            <Line type="step" dataKey="amount" stroke="#8884d8" dot={false} />
            <CartesianGrid stroke="#333" strokeDasharray="5 5" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip contentStyle={tooltipStyle} />
          </LineChart>
        </If>

        <If condition={mode === "fiat"}>
          <LineChart width={800} height={400} data={sales}>
            <Line type="step" dataKey="value" stroke="#8884d8" dot={false} />
            <CartesianGrid stroke="#333" strokeDasharray="5 5" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip contentStyle={tooltipStyle} />
          </LineChart>
        </If>
        
      </If>

    </>
  )
}





export default Chart