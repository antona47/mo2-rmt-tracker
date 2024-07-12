import { execSync } from 'child_process'





const args = process.argv.slice(2)

const migrationName = args.shift()





const init = async () => {
  if (!migrationName) return console.log(`ERR: no migration name provided.`)

  execSync(`typeorm migration:create src/db/migrations/${ migrationName }`, { stdio: 'inherit' })
}


init()