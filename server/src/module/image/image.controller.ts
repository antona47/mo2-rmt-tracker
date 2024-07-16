import { Controller, Get, Param, Res } from '@nestjs/common'
import { ImageService } from '../image/image.service'
import { Response } from 'express'





@Controller()
export class ImageController {
  constructor(
    private readonly imageService: ImageService
  ) {}





  @Get('/image/avatar/:id')
  async avatar(@Param() params:any, @Res() response:Response) {
    const file = await this.imageService.getAvatar(params.id)
    response.send(file || this.imageService.defaultAvatar)
  }

}