const tooltipStyle = {
  borderColor: '#333',
  backgroundColor: '#0F172A',
  padding: '0.25rem 0.5rem'
}





interface ITooltip {
  children: any
}





const Tooltip = ({ children }:ITooltip) => {
  return (
    <div style={tooltipStyle}>
      {children}
    </div>
  )
}





export default Tooltip