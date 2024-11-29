import { createAction, props } from '@ngrx/store';

export const CONFIG_ACTION = {
    GET_DATA: 'Get [Config Data]'
}

export const getConfigData = createAction(CONFIG_ACTION.GET_DATA);