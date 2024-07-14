import Tooltip from "../Tooltip"





interface IPriceTooltip {
  active?: boolean
  payload?: any[]
  label?: string
}





const PriceTooltip = ({ active, payload, label }:IPriceTooltip) => {
  if (active && payload && payload.length) {
    const data = payload[0]

    return (
      <Tooltip>
        <p>
          {label}
        </p>
        <p style={{ color: data.stroke }}>
          ${data.payload.price.toLocaleString('en', { minimumFractionDigits: 2 })}
        </p>
      </Tooltip>
    )
  }

  return null
}





export default PriceTooltip