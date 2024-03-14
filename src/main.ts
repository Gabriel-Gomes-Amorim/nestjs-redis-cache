import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

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

  await app.listen(3000);
}
bootstrap();
