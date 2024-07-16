export class GenericResponse {
  status: number
}



export class ErrorResponse extends GenericResponse {
  err_code: string
  err_message: string
}