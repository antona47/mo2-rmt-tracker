import { execSync } from 'child_process'





const args = process.argv.slice(2)

const migrationName = args.shift()

const dataSource = `dist/server/src/db/cliDataSource.js`





const init = async () => {
  if (!migrationName) return console.log(`ERR: no migration name provided.`)

  execSync(`typeorm migration:generate src/db/migrations/${ migrationName } --dataSource ${dataSource}`, { stdio: 'inherit' })
}


init()