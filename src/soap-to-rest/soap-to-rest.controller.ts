import {
  Controller,
  Get,
  Query,
  UseFilters,
  BadRequestException,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { SoapToRestService } from './soap-to-rest.service';
import { SoapExceptionFilter } from '../common/filters/soap-exception.filter';
import { CalculatorQueryDto, DivideQueryDto } from './dto/calculator-query.dto';

@ApiTags('calculator')
@Controller('calculator')
@UseFilters(SoapExceptionFilter)
export class SoapToRestController {
  constructor(private readonly soapToRestService: SoapToRestService) {}

  @Get('add')
  @ApiOperation({ summary: 'Suma dos números via servicio SOAP externo' })
  @ApiResponse({ status: 200, description: 'Resultado de la suma', schema: { example: 27 } })
  @ApiResponse({ status: 400, description: 'Parámetros inválidos' })
  @ApiResponse({ status: 502, description: 'Error en el servicio SOAP externo' })
  add(@Query() query: CalculatorQueryDto) {
    return this.soapToRestService.add(query.a, query.b);
  }

  @Get('subtract')
  @ApiOperation({ summary: 'Resta dos números via servicio SOAP externo' })
  @ApiResponse({ status: 200, description: 'Resultado de la resta', schema: { example: 13 } })
  @ApiResponse({ status: 400, description: 'Parámetros inválidos' })
  @ApiResponse({ status: 502, description: 'Error en el servicio SOAP externo' })
  subtract(@Query() query: CalculatorQueryDto) {
    return this.soapToRestService.subtract(query.a, query.b);
  }

  @Get('multiply')
  @ApiOperation({ summary: 'Multiplica dos números via servicio SOAP externo' })
  @ApiResponse({ status: 200, description: 'Resultado de la multiplicación', schema: { example: 50 } })
  @ApiResponse({ status: 400, description: 'Parámetros inválidos' })
  @ApiResponse({ status: 502, description: 'Error en el servicio SOAP externo' })
  multiply(@Query() query: CalculatorQueryDto) {
    return this.soapToRestService.multiply(query.a, query.b);
  }

  @Get('divide')
  @ApiOperation({ summary: 'Divide dos números via servicio SOAP externo' })
  @ApiResponse({ status: 200, description: 'Resultado de la división', schema: { example: 2 } })
  @ApiResponse({ status: 400, description: 'División por cero o parámetros inválidos' })
  @ApiResponse({ status: 502, description: 'Error en el servicio SOAP externo' })
  divide(@Query() query: DivideQueryDto) {
    if (query.b === 0) throw new BadRequestException('Division by zero is not allowed');
    return this.soapToRestService.divide(query.a, query.b);
  }
}