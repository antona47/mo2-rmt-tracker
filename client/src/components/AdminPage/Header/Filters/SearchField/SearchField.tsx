import { useState } from "react"





let timer: NodeJS.Timeout





interface ISearchField {
  prop: {
    value: string
    set: (a:string) => void
  },
  className?: string
}





const SearchField = ({ prop, className }:ISearchField) => {
  const [search, setSearch] = useState(prop.value)

  const submitTimer = (e:any) => {
    setSearch(e.target.value)
    clearTimeout(timer)
    timer = setTimeout(() => prop.set(e.target.value), 300)
  }

  return (
    <input type="search" placeholder="Search"
      className={className}
      value={search} onChange={submitTimer}
    />
  )
}





export default SearchField