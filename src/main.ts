import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import * as soap from 'soap';
import * as fs from 'fs';
import * as path from 'path';
import { RestToSoapService } from './rest-to-soap/rest-to-soap.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT', 3000);

  await app.listen(port);

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
            throw {
              Fault: {
                faultcode: 'Client',
                faultstring: 'Missing required parameters: a and b',
              },
            };
          }
          return { result: restToSoapService.add(Number(args.a), Number(args.b)) };
        },
        Subtract: (args: any) => {
          if (args.a === undefined || args.b === undefined) {
            throw {
              Fault: {
                faultcode: 'Client',
                faultstring: 'Missing required parameters: a and b',
              },
            };
          }
          return { result: restToSoapService.subtract(Number(args.a), Number(args.b)) };
        },
      },
    },
  };

  const soapPath = configService.get<string>('SOAP_SERVER_PATH', '/soap/calculator');
  const httpServer = app.getHttpServer();
  soap.listen(httpServer, soapPath, soapService, wsdl);
  console.log(`App running at http://localhost:${port}`);
  console.log(`SOAP server running at http://localhost:${port}${soapPath}?wsdl`);
}
bootstrap();