import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, HttpStatus } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { I18nModule, I18nJsonParser } from 'nestjs-i18n';
import * as multer from 'fastify-multer';
import * as path from 'path';
import * as request from 'supertest';
import * as requestIp from 'request-ip';
import { TypeOrmConfigService } from '../src/common/database/type-orm-config.service';
import { CatsModule } from '../src/cats/cats.module';

describe(`UsersController (e2e)`, () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          envFilePath: {local: `.env`, dev: `.env.dev`, prod: `env.prod`}[process.env.NODE_ENV],
          isGlobal: true,
        }),
        I18nModule.forRoot({
          fallbackLanguage: `ja`,
          parser: I18nJsonParser,
          parserOptions: {
            path: path.join(__dirname, `../src/i18n/`),
          },
        }),
        TypeOrmModule.forRootAsync({
          imports: [ConfigModule],
          useClass: TypeOrmConfigService, 
        }),
        CatsModule
      ],
    }).compile();

    //app = moduleFixture.createNestApplication()
    //await app.init()

    const fastifyAdapter = new FastifyAdapter()
    fastifyAdapter.register(multer.contentParser)
    app = moduleFixture.createNestApplication<NestFastifyApplication>(fastifyAdapter)
    await app.init()
    app.use(requestIp.mw({ attributeName : 'ip' }))
    await app.getHttpAdapter().getInstance().ready()
  });

  describe('/cats/iscat (GET)', () => {
    it(`should return statusCode OK`, async () => {
      return request(app.getHttpServer())
        .get(`/cats/iscat?q=${'Hello'}`)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(HttpStatus.OK)
    })

    it(`should return statusCode BAD_REQUEST when query parameter q isn't set`, async () => {
      return request(app.getHttpServer())
        .get(`/cats/iscat`)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(HttpStatus.BAD_REQUEST)
    })
  })
});
