import { createAction, props } from '@ngrx/store';

import { IUserData } from '../../interfaces/user.interface';

export const USER_ACTION = {
    GET_USER_DATA: 'Get [User Data]'
}

export const getUserData = createAction(USER_ACTION.GET_USER_DATA);

export const setUserData = createAction(
    USER_ACTION.GET_USER_DATA,
    props<{ userData: IUserData | null, token: string | null, refreshToken: string | null, message: string }>()
);