import { randomBytes } from 'crypto'





export const generateBase64Token = async (length:number):Promise<string> => {
  length = length || 256
  const byteLength = Math.ceil(length / 8 * 6)

  return new Promise((resolve, reject) => {
    randomBytes(byteLength, (err, buf:Buffer) => {
      if (err) return reject(err)

      resolve(buf.toString('base64').slice(0, length))
    })
  })
}