import { IUserData } from '../../interfaces/user.interface';

export interface IUserState {
    userData:     IUserData | null;
    token:        string | null;
    refreshToken: string | null;
    error:        boolean;
    message:      string;
}

export interface IUserLogin {
    error:        boolean;
    message:      string;
    refreshToken: string;
    token:        string;
    userData:     IUserData;
}