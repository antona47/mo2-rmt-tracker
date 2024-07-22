interface ISelector<T> {
  value: T,
  setValue: (a:T) => void,
  options: Array<{
    value: T
    label: string
  }>,
  className?: string
}





const Selector = <T extends string | number>({ value, setValue, options, className }:ISelector<T>) => {
  const onChange = (event:any) => {
    setValue(event.target.value)
  }

  return (
    <select value={value} onChange={onChange} className={className}>
      {options.map((option, i) => (
        <option key={i} value={option.value}>{option.label}</option>
      ))}
    </select>
  )
}





export default Selector