import { writeFileSync } from 'fs'
import { config } from 'node-config-ts'





const data = [
  `# config`,
  `PORT = ${config.client.port}`, //Next fails to read this. Port is baked into the package.json pending a better solution.
  ``,
  `# mo2 watch`,
  `NEXT_PUBLIC_API_PATH = "${config.client.api}"`,
  `NEXT_PUBLIC_OPG_LINK = "${config.client.opgLink}"`,
  `NEXT_PUBLIC_GA_MEASUREMENT_ID = "${config.client.ga_id}"`,
  ``,
  `# data`,
  `NEXT_PUBLIC_MAX_DATE_RANGE = ${config.data.exportMaxDateRange}`
]





writeFileSync(`.env.local`, data.join(`\r\n`))