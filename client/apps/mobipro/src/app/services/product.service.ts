import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, tap, throwError } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class ProductService {
    constructor(private _http: HttpClient) {}

    public getAllProducts(): Observable<any> {
        let url: string = 'http://localhost:4400/mobipro/api/products/all';

        return this._http.get(url).pipe(
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