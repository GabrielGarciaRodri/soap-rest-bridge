import { Module } from '@nestjs/common';
import { RestToSoapService } from './rest-to-soap.service';

@Module({
  providers: [RestToSoapService],
  exports: [RestToSoapService],
})
export class RestToSoapModule {}