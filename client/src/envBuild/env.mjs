import { writeFileSync } from 'fs'
import { config } from 'node-config-ts'





const data = [
  `# config`,
  `PORT = ${config.client.port}`, //Next fails to read this. Port is baked into the package.json pending a better solution.
  ``,
  `# mo2 watch`,
  `NEXT_PUBLIC_API_PATH = "${config.client.api}"`,
  `NEXT_PUBLIC_SELF = "${config.client.self}"`,
  ``,
  `# data`,
  `NEXT_PUBLIC_MAX_DATE_RANGE = ${config.data.exportMaxDateRange}`
]





writeFileSync(`.env.local`, data.join(`\r\n`))