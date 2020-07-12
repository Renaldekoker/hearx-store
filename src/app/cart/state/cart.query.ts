import { Injectable } from '@angular/core';
import {EntityUIQuery, ID, QueryEntity} from '@datorama/akita';
import {CartStore, CartState} from './cart.store';
import {combineLatest, Observable} from 'rxjs/index';
import { ProductQuery } from '../../product/state/product.query';
import {ICart} from './cart.model';
import { map } from 'rxjs/internal/operators';

@Injectable({providedIn: 'root'})
export class CartQuery extends QueryEntity<CartState, ICart> {
  constructor(
    protected store: CartStore,
    private productQuery: ProductQuery
  ) {
    super(store);
  }

  // Combine cart items and product
  selectItems$ = combineLatest([
      this.selectAll(),
      this.productQuery.selectAll({asObject: true})
    ]
  ).pipe(map(joinItems));
}

// Join CartStore and ProductStore
function joinItems([cartItems, products]) {
  return cartItems.map(item => {
    const product = products[item.product_id];
    return {
      ...item,
      ...product
    };
  });

}
