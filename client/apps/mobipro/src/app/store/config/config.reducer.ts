import { createReducer, on, Action } from '@ngrx/store';

import { initialStateData } from '../../constants/initial-config';
import { IConfigState }     from './config.interface';
import * as configActions   from './config.actions';

export const initialState: IConfigState = Object.freeze(initialStateData);

const _configReducer = createReducer<IConfigState>(
    initialState,
    on(configActions.getConfigData, state => state)
);

export function ConfigReducer(state: IConfigState = initialState, action: Action) {
    return _configReducer(state, action);
}