import { Injectable } from '@angular/core';
import {EntityState, EntityStore, EntityUIStore, ID, StoreConfig} from '@datorama/akita';
import { IProduct, IProductUI } from './product.model';

export interface ProductState extends EntityState<IProduct> {}
export interface ProductUIState extends EntityState<IProductUI> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'product' })
export class ProductStore extends EntityStore<ProductState> {
  ui: EntityUIStore<ProductUIState>;
  constructor() {
    super();
    this.createUIStore();
  }
}
