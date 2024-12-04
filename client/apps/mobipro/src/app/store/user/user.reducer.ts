import { createReducer, on, Action } from '@ngrx/store';

import { initialStateData } from '../../constants/initial-user';

import { IUserState }       from './user.interface';
import * as userActions     from './user.actions';

export const initialState: IUserState = Object.freeze(initialStateData);

const _userReducer = createReducer<IUserState>(
    initialState,
    on(userActions.getUserData, (state) => {
        return {
            userData:     state.userData,
            token:        state.token,
            refreshToken: state.refreshToken,
            error:        state.error,
            message:      state.message
        }    
    }),

    on(userActions.setUserData, (state, { userData, token, refreshToken, message }) => {
        return {
            userData:     userData,
            token:        (state.token == null || state.token !== token)                      ? token        : state.token,
            refreshToken: (state.refreshToken == null || state.refreshToken !== refreshToken) ? refreshToken : state.refreshToken,
            error:        state.error,
            message:      message
        }
    })
);

export function UserReducer(state: IUserState = initialState, action: Action) {
    return _userReducer(state, action);
}