import { NestFactory } from '@nestjs/core';
import * as requestIp from 'request-ip';
import { AppModule } from './app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import * as fastify from 'fastify';
import * as multer from 'fastify-multer';

async function bootstrap() {
  const serverOptions: fastify.ServerOptionsAsHttp = {
    logger: true,
    ignoreTrailingSlash: true,
  }
  const instance: fastify.FastifyInstance = fastify(serverOptions)
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(instance),
  )
  app.register(multer.contentParser)
  app.enableCors()
  app.use(requestIp.mw({ attributeName : 'ip' }))
  await app.init();
  const server = await instance
  server.listen(3000, '0.0.0.0')
}

bootstrap();
