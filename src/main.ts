import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import * as soap from 'soap';
import * as fs from 'fs';
import * as path from 'path';
import { RestToSoapService } from './rest-to-soap/rest-to-soap.service';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
  new ValidationPipe({
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: true,
  }),
);

  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT', 3000);

  const swaggerConfig = new DocumentBuilder()
    .setTitle('SOAP ↔ REST Bridge')
    .setDescription('API que demuestra integración bidireccional entre SOAP y REST')
    .setVersion('1.0')
    .addTag('calculator', 'Operaciones matemáticas via SOAP externo')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api/docs', app, document);

  const wsdl = fs.readFileSync(
    path.join(__dirname, '..', 'src', 'rest-to-soap', 'calculator.wsdl'),
    'utf8',
  );

  const restToSoapService = app.get(RestToSoapService);

  const soapService = {
    CalculatorService: {
      CalculatorPort: {
        Add: (args: any) => {
          if (args.a === undefined || args.b === undefined) {
            throw { Fault: { faultcode: 'Client', faultstring: 'Missing required parameters: a and b' } };
          }
          return { result: restToSoapService.add(Number(args.a), Number(args.b)) };
        },
        Subtract: (args: any) => {
          if (args.a === undefined || args.b === undefined) {
            throw { Fault: { faultcode: 'Client', faultstring: 'Missing required parameters: a and b' } };
          }
          return { result: restToSoapService.subtract(Number(args.a), Number(args.b)) };
        },
      },
    },
  };

  const soapPath = configService.get<string>('SOAP_SERVER_PATH', '/soap/calculator');
  const httpServer = app.getHttpServer();
  soap.listen(httpServer, soapPath, soapService, wsdl);


  await app.listen(port);
  console.log(`App running at http://localhost:${port}`);
  console.log(`SOAP server running at http://localhost:${port}${soapPath}?wsdl`);
  console.log(`Swagger docs at http://localhost:${port}/api/docs`);
}
bootstrap();