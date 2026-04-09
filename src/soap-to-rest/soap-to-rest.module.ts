import { Module } from '@nestjs/common';
import { SoapModule } from 'nestjs-soap';
import { SoapToRestController } from './soap-to-rest.controller';
import { SoapToRestService } from './soap-to-rest.service';

@Module({
  imports: [
    SoapModule.register({
      clientName: 'CALCULATOR_CLIENT',
      uri: 'http://www.dneonline.com/calculator.asmx?wsdl',
    }),
  ],
  controllers: [SoapToRestController],
  providers: [SoapToRestService],
})
export class SoapToRestModule {}