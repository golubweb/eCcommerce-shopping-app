import { createSelector, createFeatureSelector, State } from '@ngrx/store';
import { IUserState } from './user.interface';

export const getUserState = createFeatureSelector<IUserState>('user');

export const selectUserData = createSelector(
    getUserState, 
    (state: IUserState) => {
        return state;
    }
);