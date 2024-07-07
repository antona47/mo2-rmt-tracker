import { useState } from "react"

import Provider from "@@/enum/provider"

import SelectProvider from "./SelectProvider/SelectProvider"





const Body = () => {
  //filter state
  const [provider, setProvider] = useState(Provider.NONE)

  //return frame
  return (
    <div className="flex flex-col w-full max-w-5xl mx-auto justify-center relative py-16 px-2">

      <div className="flex flex-row w-full justify-left">
        <SelectProvider value={provider} setValue={setProvider} options={[
          { value: Provider.NONE, label: "All" },
          { value: Provider.PLAYER_AUCTIONS, label: "Player Auctions" }
        ]} />
      </div>

      <div className="w-full justify-center pt-8">
        
      </div>

    </div>
  )
}





export default Body