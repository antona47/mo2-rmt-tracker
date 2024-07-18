import { writeFileSync } from 'fs'
import { config } from 'node-config-ts'





const data = [
  `# config`,
  `PORT = ${config.client.port}`, //Next fails to read this. Port is baked into the package.json pending a better solution.
  ``,
  `# mo2 watch`,
  `NEXT_PUBLIC_API_PATH = "${config.client.api}"`,
  `INTERNAL_API_PATH = "${config.client.internal.api}"`,
  `INTERNAL_API_SECRET = "${config.client.internal.secret}"`,
  `NEXT_PUBLIC_OPG_LINK = "${config.client.opgLink}"`,
  `NEXT_PUBLIC_GA_MEASUREMENT_ID = "${config.client.ga_id}"`,
  ``,
  `# discord`,
  `NEXT_PUBLIC_APP_ID = "${config.discord.appId}"`,
  `NEXT_PUBLIC_APP_SCOPE = "${config.discord.scope}"`,
  `NEXT_PUBLIC_APP_CALLBACK = "${config.discord.redirectPath}"`,
  `LOGIN_SUCCESS_URL = "${config.discord.successUrl}"`,
  `LOGIN_FAIL_URL = "${config.discord.failUrl}"`,
  ``,
  `# data`,
  `NEXT_PUBLIC_MAX_DATE_RANGE = ${config.data.exportMaxDateRange}`
]





writeFileSync(`.env.local`, data.join(`\r\n`))