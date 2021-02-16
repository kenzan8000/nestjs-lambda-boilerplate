import { Controller, Get, HttpStatus, Query } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { GetCatsIscatQuery, GetCatsIscatResponse } from './cats.dto';
import { CatsService } from './cats.service';

@Controller('cats')
export class CatsController {
  constructor(private readonly service: CatsService) {}

  @Get('/iscat')
  @ApiResponse({ status: HttpStatus.OK, type: GetCatsIscatResponse, description: 'API detecting if name of query.q is a cat.' })
  async getIscat(@Query() query: GetCatsIscatQuery): Promise<GetCatsIscatResponse> {
    return await this.service.getIscat(query)
  }

}
