import { Request, Response, NextFunction } from 'express';

function log(payload: Record<string, unknown>) {
  console.log(
    JSON.stringify({
      timestamp: new Date().toISOString(),
      ...payload,
    }),
  );
}

export function requestLoggingMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  log({
    level: 'info',
    message: 'request_started',
    correlationId: req.correlationId,
    method: req.method,
    path: req.originalUrl,
  });

  res.on('finish', () => {
    const durationMs = Date.now() - (req.requestStartTime ?? Date.now());

    log({
      level: 'info',
      message: 'request_finished',
      correlationId: req.correlationId,
      method: req.method,
      path: req.originalUrl,
      statusCode: res.statusCode,
      durationMs,
    });
  });

  next();
}