import { NestInterceptor } from "@nestjs/common";


export class UsersInterceptors implements NestInterceptor {
    intercept(_context: any, _next: any) {
        console.log('Before... ', _context.getClass().name);

        return _next.handle();
    }
}