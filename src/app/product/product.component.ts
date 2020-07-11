import {Component, Input, OnInit} from '@angular/core';
import {ProductQuery} from './state/product.query';
import {IProduct} from './state/product.model';
import {Observable} from 'rxjs/index';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  @Input('productId') productId;
  product: IProduct;
  isLoading: Observable<boolean>;

  constructor(
    private productQuery: ProductQuery,
  ) { }

  ngOnInit(): void {
    // fetch this product from store
    this.product = this.productQuery.getEntity(this.productId);
    // bind to loading observable
    this.isLoading = this.productQuery.selectLoading();
  }

}
