import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class SoapExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(SoapExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest();

    // Si es una HttpException la dejamos pasar tal cual
    if (exception instanceof HttpException) {
      const exceptionResponse = exception.getResponse();
      return response.status(exception.getStatus()).json({
        statusCode: exception.getStatus(),
        message:
          typeof exceptionResponse === 'object' && 'message' in exceptionResponse
            ? (exceptionResponse as any).message
            : exception.message,
        path: request.url,
        timestamp: new Date().toISOString(),
      });
    }

    // Errores propios del cliente SOAP 
    const soapError = exception as any;
    this.logger.error(`SOAP Error: ${soapError?.message}`, soapError?.stack);

    // SOAP Fault especifico
    if (soapError?.root?.Envelope?.Body?.Fault) {
      const fault = soapError.root.Envelope.Body.Fault;
      return response.status(HttpStatus.BAD_GATEWAY).json({
        statusCode: HttpStatus.BAD_GATEWAY,
        error: 'SOAP Fault',
        faultCode: fault.faultcode ?? 'Unknown',
        faultMessage: fault.faultstring ?? 'Unknown SOAP fault',
        path: request.url,
        timestamp: new Date().toISOString(),
      });
    }

    return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      error: 'Internal Server Error',
      message: soapError?.message ?? 'Unexpected error calling SOAP service',
      path: request.url,
      timestamp: new Date().toISOString(),
    });
  }
}