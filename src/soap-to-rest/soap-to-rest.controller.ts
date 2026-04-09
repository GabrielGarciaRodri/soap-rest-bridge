import { Controller, Get, Query, ParseIntPipe } from '@nestjs/common';
import { SoapToRestService } from './soap-to-rest.service';

@Controller('calculator')
export class SoapToRestController {
  constructor(private readonly soapToRestService: SoapToRestService) {}

  @Get('add')
  add(
    @Query('a', ParseIntPipe) a: number,
    @Query('b', ParseIntPipe) b: number,
  ) {
    return this.soapToRestService.add(a, b);
  }

  @Get('subtract')
  subtract(
    @Query('a', ParseIntPipe) a: number,
    @Query('b', ParseIntPipe) b: number,
  ) {
    return this.soapToRestService.subtract(a, b);
  }

  @Get('multiply')
  multiply(
    @Query('a', ParseIntPipe) a: number,
    @Query('b', ParseIntPipe) b: number,
  ) {
    return this.soapToRestService.multiply(a, b);
  }

  @Get('divide')
  divide(
    @Query('a', ParseIntPipe) a: number,
    @Query('b', ParseIntPipe) b: number,
  ) {
    return this.soapToRestService.divide(a, b);
  }
}