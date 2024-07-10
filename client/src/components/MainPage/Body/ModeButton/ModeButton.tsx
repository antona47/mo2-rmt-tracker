interface IModeButton {
  value: string
  label: string
  mode: string
  setMode: (a:string) => void
}





const ModeButton = ({ value, label, mode, setMode }:IModeButton) => {
  const onClick = () => {
    setMode(value)
  }

  const getClassName = ():string => {
    if (mode === value) return 'bg-slate-900'
    return 'cursor-pointer'
  }
  
  return (
    <p className={`px-12 border border-slate-900 ${getClassName()}`} onClick={onClick}>
      {label}
    </p>
  )
}





export default ModeButton