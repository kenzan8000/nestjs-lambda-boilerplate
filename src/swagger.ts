import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as requestIp from 'request-ip';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(requestIp.mw({ attributeName : 'ip' }))

  const options = new DocumentBuilder()
    .setTitle('q2a-api')
    .setDescription(`api server of ${process.env.DOMAIN_NAME}.`)
    .setVersion('1.0')
    .addTag('q2a-api')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
