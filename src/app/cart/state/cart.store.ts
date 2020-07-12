import { Injectable } from '@angular/core';
import {EntityState, EntityStore, EntityUIStore, StoreConfig} from '@datorama/akita';
import {ICart} from './cart.model';
import {IProduct} from '../../product/state/product.model';

export interface CartState extends EntityState<ICart> {}

@Injectable({ providedIn: 'root'})
@StoreConfig({ name: 'cart', idKey: 'product_id', resettable: true })
export class CartStore extends EntityStore<CartState, ICart> {
  constructor() {
    super();
  }

  updateCartQuantity(product_id: IProduct['id'], qty) {
    // use super update function
    this.update(product_id, cart => {
      const newQuantity = cart.quantity + qty;
      return {
        ...cart,
        quantity: newQuantity
      };
    });
  }

}
