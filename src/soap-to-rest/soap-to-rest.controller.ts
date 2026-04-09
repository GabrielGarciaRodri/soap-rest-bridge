import {
  Controller,
  Get,
  Query,
  ParseIntPipe,
  UseFilters,
  BadRequestException,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiQuery,
  ApiResponse,
} from '@nestjs/swagger';
import { SoapToRestService } from './soap-to-rest.service';
import { SoapExceptionFilter } from '../common/filters/soap-exception.filter';

@ApiTags('calculator')
@Controller('calculator')
@UseFilters(SoapExceptionFilter)
export class SoapToRestController {
  constructor(private readonly soapToRestService: SoapToRestService) {}

  @Get('add')
  @ApiOperation({ summary: 'Suma dos números via servicio SOAP externo' })
  @ApiQuery({ name: 'a', type: Number, description: 'Primer operando' })
  @ApiQuery({ name: 'b', type: Number, description: 'Segundo operando' })
  @ApiResponse({ status: 200, description: 'Resultado de la suma', schema: { example: 27 } })
  @ApiResponse({ status: 400, description: 'Parámetros inválidos' })
  @ApiResponse({ status: 502, description: 'Error en el servicio SOAP externo' })
  add(
    @Query('a', ParseIntPipe) a: number,
    @Query('b', ParseIntPipe) b: number,
  ) {
    return this.soapToRestService.add(a, b);
  }

  @Get('subtract')
  @ApiOperation({ summary: 'Resta dos números via servicio SOAP externo' })
  @ApiQuery({ name: 'a', type: Number, description: 'Primer operando' })
  @ApiQuery({ name: 'b', type: Number, description: 'Segundo operando' })
  @ApiResponse({ status: 200, description: 'Resultado de la resta', schema: { example: 13 } })
  @ApiResponse({ status: 400, description: 'Parámetros inválidos' })
  @ApiResponse({ status: 502, description: 'Error en el servicio SOAP externo' })
  subtract(
    @Query('a', ParseIntPipe) a: number,
    @Query('b', ParseIntPipe) b: number,
  ) {
    return this.soapToRestService.subtract(a, b);
  }

  @Get('multiply')
  @ApiOperation({ summary: 'Multiplica dos números via servicio SOAP externo' })
  @ApiQuery({ name: 'a', type: Number, description: 'Primer operando' })
  @ApiQuery({ name: 'b', type: Number, description: 'Segundo operando' })
  @ApiResponse({ status: 200, description: 'Resultado de la multiplicación', schema: { example: 50 } })
  @ApiResponse({ status: 400, description: 'Parámetros inválidos' })
  @ApiResponse({ status: 502, description: 'Error en el servicio SOAP externo' })
  multiply(
    @Query('a', ParseIntPipe) a: number,
    @Query('b', ParseIntPipe) b: number,
  ) {
    return this.soapToRestService.multiply(a, b);
  }

  @Get('divide')
  @ApiOperation({ summary: 'Divide dos números via servicio SOAP externo' })
  @ApiQuery({ name: 'a', type: Number, description: 'Dividendo' })
  @ApiQuery({ name: 'b', type: Number, description: 'Divisor (no puede ser 0)' })
  @ApiResponse({ status: 200, description: 'Resultado de la división', schema: { example: 2 } })
  @ApiResponse({ status: 400, description: 'División por cero o parámetros inválidos' })
  @ApiResponse({ status: 502, description: 'Error en el servicio SOAP externo' })
  divide(
    @Query('a', ParseIntPipe) a: number,
    @Query('b', ParseIntPipe) b: number,
  ) {
    if (b === 0) throw new BadRequestException('Division by zero is not allowed');
    return this.soapToRestService.divide(a, b);
  }
}