import {
  APIGatewayProxyHandler,
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  Context,
} from 'aws-lambda';
import { NestFactory } from '@nestjs/core';
import * as fastify from 'fastify';
import * as multer from 'fastify-multer';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { proxy } from 'aws-serverless-fastify';
import { AppModule } from './app.module';
import * as requestIp from 'request-ip';

let fastifyServer: fastify.FastifyInstance

const bootstrap = async (): Promise<fastify.FastifyInstance> => {
  const serverOptions: fastify.ServerOptionsAsHttp = { ignoreTrailingSlash: true }
  const instance: fastify.FastifyInstance = fastify(serverOptions)
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(instance),
  )
  app.register(multer.contentParser)
  app.enableCors()
  app.use(requestIp.mw({ attributeName : 'ip' }))
  await app.init()
  return instance
}

export const handler: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent,
  context: Context,
): Promise<APIGatewayProxyResult> => {
  if (!fastifyServer) {
    fastifyServer = await bootstrap()
  }
  return proxy(fastifyServer, event, context)
}
