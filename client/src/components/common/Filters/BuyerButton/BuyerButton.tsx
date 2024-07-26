interface IBuyerButton {
  buyer?: string | null
  onBuyerClick?: () => void
  isActive?: boolean
}





const BuyerButton = ({ buyer, onBuyerClick, isActive }:IBuyerButton) => {
  const getClass = () => {
    if (isActive) return `border-slate-400`
    return `border-slate-900`
  }

  return (
    <div className={`min-w-40 px-2 py-0.5 ml-6 bg-slate-900 border cursor-pointer ${getClass()}`} onClick={onBuyerClick}>
      {buyer || "All Buyers"}
    </div>
  )
}





export default BuyerButton