import Provider from "@@/enum/provider"





interface ISelectProviderOption {
  value: Provider
  label: string
}


interface ISelectProvider {
  value: Provider
  setValue: (a:Provider) => void
  options: ISelectProviderOption[]
}





const SelectProvider = ({ value, setValue, options }:ISelectProvider) => {
  //controls
  const onChange = (event:any) => {
    const newValue = Number(event.target.value) as Provider
    setValue(newValue)
  }

  //return frame
  return (
    <select value={value} onChange={onChange} className="min-w-40 bg-gray-900 px-1 py-0.5">
      {options.map((option, i) => (
        <option key={i} value={option.value}>{option.label}</option>
      ))}
    </select>
  )
}





export default SelectProvider