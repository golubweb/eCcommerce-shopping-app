import { CanActivate, ExecutionContext, Inject, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

import { AuthService } from "../authorization/auth.service";


@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private _jwtService: JwtService,
        private _authService: AuthService
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        return true;
    }
}