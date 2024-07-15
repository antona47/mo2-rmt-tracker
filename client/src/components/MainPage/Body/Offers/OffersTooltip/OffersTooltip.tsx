import Tooltip from "@/components/MainPage/Body/common/Chart/Tooltip"





interface IOffersTooltip {
  active?: boolean
  payload?: any[]
  label?: string
}





const OffersTooltip = ({ active, payload, label }:IOffersTooltip) => {
  if (active && payload && payload.length) {
    const data = payload[0]

    return (
      <Tooltip>
        <p>
          {label}
        </p>
        <p style={{ color: data.stroke }}>
          {data.payload.offers}
        </p>
      </Tooltip>
    )
  }

  return null
}





export default OffersTooltip