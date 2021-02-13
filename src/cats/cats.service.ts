import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GetCatsIscatQuery, GetCatsIscatResponse } from './cats.dto';

@Injectable()
export class CatsService {
  constructor(
    /*
    @InjectRepository(Cats)
    private catsRepository: Repository<Cats>,
    */
  ) {}

  async getIscat(query: GetCatsIscatQuery): Promise<GetCatsIscatResponse> {
    if (!query.cat) {
      return { result: false, statusCode: HttpStatus.BAD_REQUEST, message: 'missing cat query.' }
    }

    return {
      result: true,
      statusCode: HttpStatus.OK,
      message: `${query.cat} is a cat.`
    }
  }

}
