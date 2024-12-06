import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, map, Observable, tap, throwError } from "rxjs";

import { environment } from "../../../../../environments/environment";
import { IProduct }    from "../interfaces/product.interface";

@Injectable({
    providedIn: 'root'
})
export class ProductService {
    constructor(private _http: HttpClient) {}

    public getAllProducts(_limit?: number, _skip?: number): Observable<IProduct[]> {
        let productsURL: string = `${environment.API_URL}/${environment.FETCH_PRODUCTS}`,
            limit:       string = (!!_limit) ? `/${_limit}` : '',
            skip:        string = (!!_skip)  ? `/${_skip}`  : '';

            productsURL = `${productsURL}${limit}${skip}`;

        return this._http.get<{ error: boolean; message: string, productsData: IProduct[] }>(productsURL).pipe(
            map((_response) => {
                return _response.productsData;
            })
        )
    }

    public getProductByID(_productID: string): Observable<{ error: boolean; message: string; product: IProduct }> {
        let url: string = `${environment.API_URL}/products/${_productID}`;

        return this._http.get<{ error: boolean; message: string; product: IProduct }>(url);
    }   
}