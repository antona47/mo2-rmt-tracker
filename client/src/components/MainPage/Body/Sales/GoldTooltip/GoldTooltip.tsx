import Tooltip from "@/components/MainPage/Body/common/Chart/Tooltip"





interface IGoldTooltip {
  active?: boolean
  payload?: any[]
  label?: string
}





const GoldTooltip = ({ active, payload, label }:IGoldTooltip) => {
  if (active && payload && payload.length) {
    const data = payload[0]

    return (
      <Tooltip>
        <p>
          {label}
        </p>
        <p style={{ color: data.stroke }}>
          {data.payload.amount.toLocaleString('en')}g
        </p>
      </Tooltip>
    )
  }

  return null
}





export default GoldTooltip