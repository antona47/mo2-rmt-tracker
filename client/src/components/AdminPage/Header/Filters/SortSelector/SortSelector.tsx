interface ISortSelector {
  sort: {
    value: number,
    set: (a:number) => void
  },
  options: Array<{
    value: number
    label: string
  }>
}





const SortSelector = ({ sort, options }:ISortSelector) => {
  const onChange = (event:any) => {
    sort.set(Number(event.target.value))
  }

  return (
    <select value={sort.value} onChange={onChange} className="ml-2 py-0.5 pl-2 bg-slate-900">
      {options.map((option) => (
        <option key={option.value} value={option.value}>{option.label}</option>
      ))}
    </select>
  )
}





export default SortSelector