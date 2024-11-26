import { CanActivate, ExecutionContext, Injectable, Logger, UnauthorizedException } from "@nestjs/common";
import { Reflector }   from "@nestjs/core";
import { JwtService }  from "@nestjs/jwt";
import { InjectModel } from "@nestjs/mongoose";
import { Model }       from "mongoose";

import { ROLES_KEY } from "../authorization/decorators/roles.decorator";
import { User }      from "../schemas/users/User.schema";
import { ERoles }    from "shared/enums/role.enum";

@Injectable()
export class AuthGuardUser implements CanActivate {
    constructor(
        private _reflector:  Reflector,
        private _jwtService: JwtService,
        @InjectModel('User') private _userModel: Model<User>
    ) {}

    async canActivate(_context: ExecutionContext): Promise<boolean> {
        let payloadToken: { [key: string]: any }  = null,
            request: Request  = _context.switchToHttp().getRequest(),
            token:   string   = this.extractTokenFromRequest(request),
            roles:   string[] = this._reflector.get<string[]>(ROLES_KEY, _context.getHandler());

        console.log('Token: ', `|${token}|`);
        console.log('Roles: ', roles);

        if (!roles) {
            return true;
        }

        if (!token) {
            throw new UnauthorizedException({
                error:    false,
                message:  'Token not found',
                userData: null,
                token:    null
            });
        }
        
        try {
            payloadToken = this._jwtService.verify(token);

            console.log('Payload token: ', payloadToken);

            (request as any).id = payloadToken.id;

            let userRoles = await this.getUserRoleFromDB(payloadToken.id);

            if (!userRoles || !userRoles.some(role => roles.includes(role))) {
                throw new UnauthorizedException({
                    error:    false,
                    message:  'Invalid role for user',
                    userData: null,
                    token:    null
                });
            }

        } catch (error) {
            Logger.error('Error in AuthGuard: ', error);

            throw new UnauthorizedException({
                error:    false,
                message:  error.message,
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

    private async getUserRoleFromDB(_userId: string): Promise<ERoles[]> {
        const user = await this._userModel.findById(_userId).select('role'); //.select([ 'role', 'lastname']);

        console.log('User ===>: ', user);

        return user?.role ? user.role : [];
    }
}