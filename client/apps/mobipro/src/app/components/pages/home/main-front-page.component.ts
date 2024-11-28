import { Component, OnInit } from "@angular/core";
import { RouterModule }      from "@angular/router";
import { CommonModule }      from "@angular/common";
import { Observable }        from "rxjs";

import { ProductService }                from "../../../services/product.service";

import { SingleProductArticleComponent } from "../../product/product.component";
import { IProduct }                      from "../../../interfaces/product.interface";

@Component({
    selector:    '[front-page]',
    standalone:  true,
    imports:     [ 
        CommonModule, 
        RouterModule,
        SingleProductArticleComponent
    ],
    templateUrl: './main-front-page.component.html',
    styleUrls:   ['./main-front-page.component.scss']
})
export class FrontPageComponent implements OnInit {
    public products: IProduct[] = [];

    constructor(private _productService: ProductService) {}

    ngOnInit(): void {
        this.getAllProducts();
    }

    public getAllProducts(): void {
        this._productService.getAllProducts().subscribe((products: IProduct[]) => {
            this.products = products;
        });
    }
}