import { IUserState } from "../store/user/user.interface";

export const initialStateData: IUserState = {
    userData:     null,
    token:        null,
    refreshToken: null,
    error:        false,
    message:      ''
};