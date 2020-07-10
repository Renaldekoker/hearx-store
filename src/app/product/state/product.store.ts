import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { IProduct } from './product.model';

export interface ProductState extends EntityState<IProduct> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'product' })
export class ProductStore extends EntityStore<ProductState> {

  constructor() {
    super();
  }

}
