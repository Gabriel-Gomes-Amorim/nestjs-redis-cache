import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configurando o uso de pipes globais para validação de dados
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // Transforma os payloads recebidos em objetos das classes correspondentes
      whitelist: true, // Remove propriedades não definidas nos DTOs
      forbidNonWhitelisted: true, // Rejeita payloads com propriedades não definidas nos DTOs
    }),
  );

  app.enableCors();

  // congiguração do swagger
  const config = new DocumentBuilder()
    .setTitle('api nestjs')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.API_PORT);
}
bootstrap();
