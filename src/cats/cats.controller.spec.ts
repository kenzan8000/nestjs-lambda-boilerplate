import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { RateLimiterModule } from 'nestjs-rate-limiter';
import * as mysql from 'mysql2';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';
import { MockRepository } from '../common/database/mock-repository';
import { HttpStatus } from '@nestjs/common';

describe('CatsController', () => {
  let controller: CatsController;
  let service: CatsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        RateLimiterModule.register({
          for: 'Fastify',
          type: 'MySQL',
          storeClient: mysql.createPool({
            host: process.env.DB_HOST,
            port: Number(process.env.DB_PORT),
            user: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
          }),
          dbName: process.env.DB_NAME,
          tableName: 'ratelimit',
        })
      ],
      controllers: [CatsController],
      providers: [
        CatsService,
        /*
        {
          provide: getRepositoryToken(Cats),
          useValue: new MockRepository(),
        },
        */
      ]
    }).compile();

    controller = module.get<CatsController>(CatsController);
    service = module.get<CatsService>(CatsService);

    controller = module.get<CatsController>(CatsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  describe('CatsController#getIscat', () => {
    it(`should return statusCode OK`, async () => {
      jest.spyOn(service, 'getIscat').mockImplementation(() => Promise.resolve({ message: "Hello is a cat.", statusCode: HttpStatus.OK, result: true }))
      const res = await controller.getIscat({ q: 'Hello' })
      expect(res.statusCode).toEqual(HttpStatus.OK)
    })

    it(`should return statusCode BAD_REQUEST when query isn't set`, async () => {
      jest.spyOn(service, 'getIscat').mockImplementation(() => Promise.resolve({ message: "missing q query.", statusCode: HttpStatus.BAD_REQUEST, result: false }))
      const res = await controller.getIscat({ q: undefined })
      expect(res.statusCode).toEqual(HttpStatus.BAD_REQUEST)
    })
  })
});
