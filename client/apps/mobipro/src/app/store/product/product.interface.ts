import { IProduct } from "../../interfaces/product.interface";

export interface IProductState {
    product: IProduct | null;
    error:   boolean;
}