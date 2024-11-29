import { createAction, props } from '@ngrx/store';

export const PRODUCT_ACTION = {
    GET_PRODUCT_DATA: 'Get [Product Data]'
}

export const getProductData = createAction(PRODUCT_ACTION.GET_PRODUCT_DATA);