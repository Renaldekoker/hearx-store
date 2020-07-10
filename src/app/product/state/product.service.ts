import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ID } from '@datorama/akita';
import { tap } from 'rxjs/operators';
import { IProduct } from './product.model';
import { ProductStore } from './product.store';

@Injectable({ providedIn: 'root' })
export class ProductService {

  constructor(private productStore: ProductStore, private http: HttpClient) {
  }


  get() {
    return this.http.get<IProduct[]>('https://api.com').pipe(tap(entities => {
      this.productStore.set(entities);
    }));
  }

  add(product: IProduct) {
    this.productStore.add(product);
  }

  update(id, product: Partial<IProduct>) {
    this.productStore.update(id, product);
  }

  remove(id: ID) {
    this.productStore.remove(id);
  }

}
