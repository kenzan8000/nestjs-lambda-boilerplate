import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GetCatsIscatQuery, GetCatsIscatResponse } from './cats.dto';

@Injectable()
export class CatsService {
  constructor(
    // @InjectRepository(Cats)
    // private catsRepository: Repository<Cats>,
  ) {}

  async getIscat(query: GetCatsIscatQuery): Promise<GetCatsIscatResponse> {
    if (!query.q) {
      throw new HttpException('missing q query.', HttpStatus.BAD_REQUEST);
    }
    /*
    const cats = await this.catsRepository
      .createQueryBuilder('cat')
      .where('cat.name = :cat', { cat: query.q })
      .getMany()
    */
    return {
      result: true,
      statusCode: HttpStatus.OK,
      message: `${query.q} is a cat.`
    }
  }

}
