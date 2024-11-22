import { CanActivate, ExecutionContext, Injectable, Logger, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";

@Injectable()
export class AuthGuardUser implements CanActivate {
    constructor(private _jwtService: JwtService) {}

    async canActivate(_context: ExecutionContext): Promise<boolean> {
        let request: Request = _context.switchToHttp().getRequest(),
            token:   string   = this.extractTokenFromRequest(request);

        console.log('Token: ', `|${token}|`);

        if (!token) {
            throw new UnauthorizedException({
                error:    false,
                message:  'Token not found',
                userData: null,
                token:    null
            });
        }
        
        try {
            let payloadToken = this._jwtService.verify(token);

            console.log('Payload token: ', payloadToken);
            
            (request as any).id = payloadToken.id;

        } catch (error) {
            Logger.error('Error in AuthGuard: ', error);

            throw new UnauthorizedException({
                error:    false,
                message:  'Invalid token',
                userData: null,
                token:    null
            });
        }

        return true;
    }

    private extractTokenFromRequest(_request: Request): string {
        let token: string = _request.headers['authorization'];

        if (!token) {
            return null;
        }

        return token.replace('Bearer ', '');
    }
}