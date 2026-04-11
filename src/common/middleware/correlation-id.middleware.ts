import { randomUUID } from 'crypto';
import { Request, Response, NextFunction } from 'express';

export const CORRELATION_ID_HEADER = 'x-correlation-id';

declare module 'express-serve-static-core' {
  interface Request {
    correlationId?: string;
    requestStartTime?: number;
  }
}

export function correlationIdMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const incoming = req.header(CORRELATION_ID_HEADER)?.trim();
  const correlationId = incoming || randomUUID();

  req.correlationId = correlationId;
  req.requestStartTime = Date.now();

  res.setHeader(CORRELATION_ID_HEADER, correlationId);
  next();
}