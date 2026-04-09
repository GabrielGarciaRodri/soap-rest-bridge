import {
  Controller,
  Get,
  Query,
  ParseIntPipe,
  UseFilters,
  BadRequestException,
} from '@nestjs/common';
import { SoapToRestService } from './soap-to-rest.service';
import { SoapExceptionFilter } from '../common/filters/soap-exception.filter';

@Controller('calculator')
@UseFilters(SoapExceptionFilter)
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
    if (b === 0) throw new BadRequestException('Division by zero is not allowed');
    return this.soapToRestService.divide(a, b);
  }
}