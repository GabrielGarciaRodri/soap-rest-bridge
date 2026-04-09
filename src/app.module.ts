import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SoapToRestModule } from './soap-to-rest/soap-to-rest.module';
import { RestToSoapModule } from './rest-to-soap/rest-to-soap.module';

@Module({
  imports: [SoapToRestModule, RestToSoapModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
