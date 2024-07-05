import { writeFileSync } from 'fs'
import { config } from 'node-config-ts'





const data = [
  `# config`,
  `PORT = ${config.client.port}` //Next fails to read this. Port is baked into the package.json pending a better solution.
]





writeFileSync(`.env.local`, data.join(`\r\n`))