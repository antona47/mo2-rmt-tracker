export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import axios from 'axios'





const apiURL = `${process.env.INTERNAL_API_PATH}/oauth2/discord`
const apiSecret = `${process.env.INTERNAL_API_SECRET}`

const successURL = `${process.env.LOGIN_SUCCESS_URL}`
const failURL = `${process.env.LOGIN_FAIL_URL}#auth_fail`





export async function GET(req:NextRequest) {
  //extract code
  const code = req.nextUrl.searchParams.get('code')
  if (!code) return NextResponse.redirect(failURL)

  //authenticate and get session
  const resp = await axios.post(apiURL, { code }, {
    headers: { 'x-internal-secret': apiSecret }
  })
  if (!resp || resp.status !== 201) return NextResponse.redirect(failURL)

  const data = resp.data
  if (data.status !== 1) return NextResponse.redirect(failURL)

  //check for session cookie
  const setCookie = resp.headers['set-cookie']
  if (!setCookie || !setCookie.length) return NextResponse.redirect(failURL)
  
  //set cookie and respond
  const response = NextResponse.redirect(successURL)
  response.headers.set('set-cookie', setCookie[0])

  return response
}