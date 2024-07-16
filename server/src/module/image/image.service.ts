import { Injectable } from '@nestjs/common'
import { mkdirpSync } from 'mkdirp'
import { writeFile, readFile } from 'fs/promises'
import { readFileSync } from 'fs'
import { join } from 'path'
import { config } from 'node-config-ts'





const avatarPath = config.server.userDataPath + '/avatar'





@Injectable()
export class ImageService {
  constructor() {
    //ensure paths exist
    mkdirpSync(avatarPath)

    //load defaults
    this.defaultAvatar = readFileSync(`./public/avatar/default.png`)
  }





  defaultAvatar: Buffer





  async storeAvatar(id:string, data:Buffer):Promise<void> {
    const fileName = `${join(avatarPath, id)}.png`
    await writeFile(fileName, data)
  }


  async getAvatar(id:string):Promise<Buffer | null> {
    const fileName = `${join(avatarPath, id)}.png`
    const file = await readFile(fileName).catch(() => {})
    return file || null
  }

}