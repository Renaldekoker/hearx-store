import { Injectable } from '@angular/core';
import {EntityUIQuery, ID, QueryEntity} from '@datorama/akita';
import { ProductStore, ProductState, ProductUIState } from './product.store';
import {IProduct, IProductUI} from './product.model';
import {Observable} from 'rxjs/index';

@Injectable({ providedIn: 'root' })
export class ProductQuery extends QueryEntity<ProductState> {
  ui: EntityUIQuery<ProductUIState>;
  constructor(protected store: ProductStore) {
    super(store);
    this.createUIQuery();
  }

  selectLoadingEntity(id: ID): Observable<boolean> {
    return this.ui.selectEntity(id, 'isLoading');
  }
}
