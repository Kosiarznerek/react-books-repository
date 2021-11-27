import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      forbidUnknownValues: true,
    }),
  );

  const swaggerDocumentOptions = new DocumentBuilder().addBearerAuth().build();
  const openAPIObject = SwaggerModule.createDocument(
    app,
    swaggerDocumentOptions,
  );
  SwaggerModule.setup('docs', app, openAPIObject);

  await app.listen(3001);
}
bootstrap();
