import { Repository } from 'typeorm'
import { config, Config } from 'node-config-ts'





export const insertUnlessDuplicate = async function(repo:Repository<any>, entity:any):Promise<boolean> {
  try {
    await repo.insert(entity)
    return true
  } catch (err) {
    if (err.code === '23505') return false
    throw err
  }
}





export const compareConfigWith = function(path:string) {
  try {
    var envConfig:Config = require(`config/${path}.json`)
  } catch {
    return
  }

  const defConfig:Config = require(`config/default.json`)

  const host = envConfig.db?.host || defConfig.db.host
  const port = envConfig.db?.port || defConfig.db.port
  const database = envConfig.db?.database || defConfig.db.database

  if (
    config.db.host === host &&
    config.db.port === port &&
    config.db.database === database
  ) {
    console.log(`Selected database config matches that of "${path}". Tests must be run on a dedicated test database.`)
    process.exit(1)
  }
}