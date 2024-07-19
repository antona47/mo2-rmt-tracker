import { cookies } from 'next/headers'
import axios from 'axios'
import { ISessionResponse } from '@@/interface/request/session'





const getSession = async (admin?:boolean):Promise<ISessionResponse | null> => {
  //grab session cookie
  const sessionCookie = cookies().get('session')
  if (!sessionCookie) return null

  //fetch session data
  const url = `${process.env.INTERNAL_API_PATH}/getSession`
  const body = { admin }
  const options = {
    headers: {
      'cookie': `session=${sessionCookie.value}`,
      'x-internal-secret': `${process.env.INTERNAL_API_SECRET}`
    }
  }

  const resp = await axios.post(url, body, options).catch((err) => {
    if (err.response.status === 400) throw Error(err.response.data.message)
    if (err.response.status === 403) throw Error(`Internal secret mismatch.`)
  })

  //did the request succeed?
  if (!resp || resp.status !== 201) return null

  //did we receive the session data?
  const session = resp.data
  if (session.status !== 1) return null

  //success
  return session
}





export default getSession