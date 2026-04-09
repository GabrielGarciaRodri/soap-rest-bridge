import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SoapToRestModule } from './soap-to-rest/soap-to-rest.module';
import { RestToSoapModule } from './rest-to-soap/rest-to-soap.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // disponible en todos los modulos
    }),
    SoapToRestModule,
    RestToSoapModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
