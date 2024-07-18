import { useEffect, useState } from 'react'

import If from '@/components/abstract/If'





const Announcement = () => {
  //visibility controls
  const [visible, setVisible] = useState(false)
  const [displayAuthFail, setDisplayAuthFail] = useState(false)


  //state
  useEffect(() => {
    let activate = false
    const hash = window.location.hash

    if (hash === '#auth_fail') {
      activate = true
      setDisplayAuthFail(true)
    }

    if (!activate) return

    //visibility controls
    setVisible(true)

    const timeout = setTimeout(() => {
      setVisible(false)
    }, 4000)

    return () => clearTimeout(timeout)
  }, [])


  //return frame
  return (
    <If condition={visible}>
      <div className="w-full relative flex justify-center">

        <If condition={displayAuthFail}>
          <div className="absolute top-6 bg-slate-900 border border-slate-600 px-10 py-5 rounded-2xl">
            Authorization through Discord unsuccessful.
          </div>
        </If>
        
      </div>
    </If>
  )
}





export default Announcement