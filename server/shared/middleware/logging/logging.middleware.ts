
import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction }    from 'express';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
    private logger = new Logger('Logger => Response');

    constructor() {}

    use(_req: Request, _res: Response, next: NextFunction) {
        let { method, originalUrl: url } = _req, requestTime = new Date().getTime();

        _res.on('finish', () => {
            let { statusCode } = _res,
                responseTime: number = new Date().getTime() - requestTime;

            this.logger.log(`${method}: ${url} status: ${statusCode} (${responseTime} ms)`)
        });

        next();
    }
}