import { Options, createProxyMiddleware } from 'http-proxy-middleware'
import { ClientRequest, IncomingMessage } from 'http'
import express from 'express'
import chalk from 'chalk'
import { config } from 'node-config-ts'
import { Request } from 'http-proxy-middleware/dist/types.js'





const app = express()


const options:Options = {
  router: {
    '/api/': `http://localhost:${config.server.port}`,
    '/': `http://localhost:${config.client.port}`
  },
  changeOrigin: false,
  ws: true,
  onProxyRes: (proxyRes:IncomingMessage, req:Request) => {
    logOutput(proxyRes.statusCode, req.path)
  }
}





export default () => {
  app.use('/', createProxyMiddleware(options))
  app.listen(config.proxy.port, config.proxy.host)

  console.log(`[${process.env.NODE_ENV.toUpperCase()}] starting on ${config.proxy.host}:${config.proxy.port}`)
}





const logOutput = (status:number, path:string) => {
  if (path.startsWith('/api/')) {
    return console.log(decorateStatus(status), chalk.cyan(path))
  }

  console.log(decorateStatus(status), path)
}





const decorateStatus = (status:number):string => {
  if (status >= 400) return `[${chalk.red(status)}]`
  if (status === 304) return `[${chalk.gray(status)}]`
  if (status >= 300) return `[${chalk.greenBright(status)}]`
  return `[${chalk.gray(status)}]`
}