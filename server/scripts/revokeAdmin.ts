import env from "@/util/env"
env

import { DataSource } from "typeorm"
import { dbConfig } from "@/db/config"

import { User } from "@/module/user/user.entity"





const args = process.argv.slice(2)

const discord_id = args.shift()





const init = async () => {
  if (!discord_id) return console.log(`ERR: no discord id provided.`)

  //init db
  const db = new DataSource(dbConfig)
  await db.initialize()

  //find user
  const userRepository = db.getRepository(User)
  const user = await userRepository.findOne({ where: { discord_id } })

  //what if they don't exist?
  if (!user) return console.log(`ERR: no user found with id ${discord_id}`)

  //update user
  user.isAdmin = false
  await userRepository.save(user)

  //end
  await db.destroy()
  console.log(`User ${user.name} has had admin privileges revoked.`)
}


init()