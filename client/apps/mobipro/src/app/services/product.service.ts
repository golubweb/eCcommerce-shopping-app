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
        let url: string = `${environment.API_URL}/products/all`;

        console.log('URL: ', environment.API_URL);

        return this._http.get<IProduct[]>(url).pipe(
            tap((_products) => {
                console.log('Next: ', _products);
            }),
            catchError((_error) => {
                console.log('Error: ', _error);

                return throwError(_error);
            })
        );
    }
}