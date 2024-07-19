export interface ISessionResponse {
  status: number
  id: string
  name: string
  csrf_token: string
  hasAccess: boolean
  isAdmin: boolean
}