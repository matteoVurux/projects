import { NestFactory } from '@nestjs/core';
import { MainModule } from './main.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(MainModule, {
    logger: ['error', 'warn', 'debug', 'log', 'verbose']
  });


  const config = new DocumentBuilder()
    .setTitle('Football demo')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('swagger', app, document);
  
  app.enableCors();

  await app.listen(3000);
}
bootstrap();
