import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, tap, throwError } from "rxjs";

import { environment } from "../../../../../environments/environment";
import { IProduct }    from "../interfaces/product.interface";

@Injectable({
    providedIn: 'root'
})
export class ProductService {
    constructor(private _http: HttpClient) {}

    public getAllProducts(): Observable<IProduct[]> {
        let url: string = `${environment.API_URL}/${environment.FETCH_PRODUCTS}`;

        return this._http.get<IProduct[]>(url);
    }

    public getProductByID(_productID: string): Observable<{ error: boolean; message: string; product: IProduct }> {
        let url: string = `${environment.API_URL}/products/${_productID}`;

        return this._http.get<{ error: boolean; message: string; product: IProduct }>(url);
    }   
}