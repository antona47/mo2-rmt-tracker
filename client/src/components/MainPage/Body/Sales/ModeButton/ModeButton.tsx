interface IModeButton {
  value: "gold"|"fiat"
  label: string
  mode: string
  setMode: (a:"gold"|"fiat") => void
}





const ModeButton = ({ value, label, mode, setMode }:IModeButton) => {
  const onClick = () => {
    setMode(value)
  }

  const getClassName = ():string => {
    const className = `min-w-32 px-4 text-center border border-slate-900`
    if (mode === value) return className + ' bg-slate-900'
    return className + ' cursor-pointer'
  }
  
  return (
    <p className={getClassName()} onClick={onClick}>
      {label}
    </p>
  )
}





export default ModeButton