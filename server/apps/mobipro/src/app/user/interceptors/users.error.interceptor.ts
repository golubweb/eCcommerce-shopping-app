import { CallHandler, ExecutionContext, HttpException, NestInterceptor } from "@nestjs/common";
import { catchError, map, Observable, throwError } from "rxjs";

export class UsersErrorInterceptor implements NestInterceptor {
    intercept(_context: ExecutionContext, _next: CallHandler): Observable<any> {
        console.log('Error Before... ');

        return _next.handle().pipe(
            catchError(() => throwError(() => new HttpException('Error interceptor 404', 404)))
        );
    }
}