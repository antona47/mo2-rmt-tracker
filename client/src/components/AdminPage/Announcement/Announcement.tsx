import { useContext, useEffect, useState } from 'react'
import { adminContext } from '@/context/admin.context'

import If from '@/components/abstract/If'





const Announcement = () => {
  const admin = useContext(adminContext)

  const [visible, setVisible] = useState(false)


  //visibility controls
  useEffect(() => {
    if (!admin.announcement.value.length) return

    setVisible(true)

    const timeout = setTimeout(() => {
      setVisible(false)
      admin.announcement.set('')
    }, 5000)

    return () => clearTimeout(timeout)
  }, [admin.announcement.value])


  //return frame
  return (
    <If condition={visible}>
      <div className="w-full relative flex justify-center">
        <div className="absolute top-6 bg-slate-900 border border-red-700 px-10 py-5 rounded-2xl">
          {admin.announcement.value}
        </div>
      </div>
    </If>
  )
}





export default Announcement