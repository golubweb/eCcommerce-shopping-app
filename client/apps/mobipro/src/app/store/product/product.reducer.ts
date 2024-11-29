import { createReducer, on, Action } from '@ngrx/store';

import { initialProductState } from '../../constants/initial-poduct';
import { IProductState }     from './product.interface'
import * as productActions   from './product.actions';

export const initialProduct: IProductState = Object.freeze(initialProductState);

const _configReducer = createReducer<IProductState>(
    initialProduct,
    on(productActions.getProductData, state => state)
);

export function ProductReducer(state: IProductState = initialProduct, action: Action) {
    return _configReducer(state, action);
}