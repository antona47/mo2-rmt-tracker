export interface IAUserData {
  id: number
  discordId: string
  discordUsername: string
  name: string
  hasAccess: boolean
  isAdmin: boolean
  firstLogin: Date
  lastLogin: Date
}



export interface IAUsersResponse {
  status: number
  data: IAUserData[]
}