import get from '../get'
import { ISession } from '@/context/session.context'





const logout = async (session?:ISession) => {
  const onSuccess = () => {}

  const onFail = () => {}

  const onError = (err:any) => {
    const status = err.response.status
    if (status !== 403) throw Error(err)
  }

  await get('/logout', { session, onSuccess, onFail, onError })
}





export default logout