import { Injectable } from '@nestjs/common'
import { config } from 'node-config-ts'
import axios from 'axios'





const DiscordOauth2 = require('discord-oauth2')

const discord = new DiscordOauth2({
  clientId: config.discord.appId,
  clientSecret: config.discord.appKey
})





interface IDiscordUserInfo {
  id: string
  discord_username: string
  name: string
  avatarToken: string
}





@Injectable()
export class DiscordService {
  constructor() {}

  async getAccessToken(code:string):Promise<string | null> {
    //request access token from discord
    const resp = await discord.tokenRequest({
      code: code,
      scope: config.discord.scope,
      redirectUri: config.discord.redirectPath,
      grantType: "authorization_code"
    }).catch(console.error)

    //bail if we got no valid response
    if (!resp) return

    //success
    return resp.access_token
  }





  async getUserInfo(access_token:string):Promise<IDiscordUserInfo | null> {
    //request user info from discord
    const resp = await discord.getUser(access_token)
      .catch(console.error)

    //didn't get a good response?
    if (!resp || !resp.id || !resp.global_name) return

    //success
    return {
      id: resp.id,
      discord_username: resp.username,
      name: resp.global_name,
      avatarToken: resp.avatar
    }
  }





  async getAvatar(userId:string, avatarToken?:string):Promise<Buffer | null> {
    if (!avatarToken) return

    //request avatar from discord
    const resp = await axios.get(`https://cdn.discordapp.com/avatars/${userId}/${avatarToken}?size=${config.discord.avatarSize}`, {
      responseType: 'arraybuffer'
    }).catch(console.error)

    //bail if request failed
    if (!resp || resp.status !== 200) return

    //success
    return Buffer.from(resp.data, 'binary')
  }

}