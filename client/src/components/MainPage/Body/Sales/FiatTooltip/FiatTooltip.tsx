import Tooltip from "@/components/MainPage/Body/common/Chart/Tooltip"





interface IFiatTooltip {
  active?: boolean
  payload?: any[]
  label?: string
}





const FiatTooltip = ({ active, payload, label }:IFiatTooltip) => {
  if (active && payload && payload.length) {
    const data = payload[0]

    return (
      <Tooltip>
        <p>
          {label}
        </p>
        <p style={{ color: data.stroke }}>
          ${data.payload.value.toLocaleString('en', { minimumFractionDigits: 2 })}
        </p>
      </Tooltip>
    )
  }

  return null
}





export default FiatTooltip