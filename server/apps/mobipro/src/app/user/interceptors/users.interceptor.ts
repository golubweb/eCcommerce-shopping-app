import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { map, Observable } from "rxjs";

export class UsersInterceptor implements NestInterceptor {
    intercept(_context: ExecutionContext, _next: CallHandler): Observable<any> {
        console.log('Before... ', _context.getClass().name);

        return _next.handle().pipe(
            map(data => ({ data: data }))
        );
    }
}