import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SoapModule } from 'nestjs-soap';
import { SoapToRestController } from './soap-to-rest.controller';
import { SoapToRestService } from './soap-to-rest.service';
import axios from 'axios';

@Module({
  imports: [
    SoapModule.forRootAsync({
      clientName: 'CALCULATOR_CLIENT',
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('CALCULATOR_WSDL_URL', 'http://www.dneonline.com/calculator.asmx?wsdl'),
        clientOptions: {
          request: axios.create({
            timeout: configService.get<number>('SOAP_TIMEOUT_MS', 10000),
          }),
        },
      }),
    }),
  ],
  controllers: [SoapToRestController],
  providers: [SoapToRestService],
})
export class SoapToRestModule {}