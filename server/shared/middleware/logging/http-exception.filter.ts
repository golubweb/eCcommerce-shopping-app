import { ArgumentsHost, Catch, ExceptionFilter, HttpException, Logger } from '@nestjs/common';
import { Request, response, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    private logger = new Logger('HttpExceptionFilter');

    catch(_exception: HttpException, _host: ArgumentsHost) {
        let context  = _host.switchToHttp(),
            response = context.getResponse<Response>(),
            request  = context.getRequest<Request>(),
            status   = _exception.getStatus();

        this.logger.error(`${request.method}: [route: ${request.originalUrl}] ${status} error: ${_exception.message}`);

        let errorDetails = _exception.getResponse() as any;

        response.status(status).json({
            error: {
                status:  status,
                message: errorDetails.message
            }
        });
    }
}