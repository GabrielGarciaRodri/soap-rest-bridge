import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as soap from 'soap';
import * as fs from 'fs';
import * as path from 'path';
import { RestToSoapService } from './rest-to-soap/rest-to-soap.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);

  // WSDL
  const wsdl = fs.readFileSync(
    path.join(__dirname, '..', 'src', 'rest-to-soap', 'calculator.wsdl'),
    'utf8',
  );

  // instancia del servicio desde el contenedor de Nest
  const restToSoapService = app.get(RestToSoapService);

  // implementación del servicio SOAP
  const soapService = {
    CalculatorService: {
      CalculatorPort: {
        Add: (args: any) => {
          return { result: restToSoapService.add(args.a, args.b) };
        },
        Subtract: (args: any) => {
          return { result: restToSoapService.subtract(args.a, args.b) };
        },
      },
    },
  };

  // Monta el servidor SOAP sobre el servidor HTTP de NestJS
  const httpServer = app.getHttpServer();
  soap.listen(httpServer, '/soap/calculator', soapService, wsdl);

  console.log('SOAP server running at http://localhost:3000/soap/calculator?wsdl');
}
bootstrap();