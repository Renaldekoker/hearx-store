import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ID } from '@datorama/akita';
import { tap } from 'rxjs/operators';
import { IProduct } from './product.model';
import { ProductStore } from './product.store';
import {of, timer} from 'rxjs/index';
import {mapTo, timeout} from 'rxjs/internal/operators';
import {products} from '../../mock-data/products.data';

@Injectable({ providedIn: 'root' })
export class ProductService {

  constructor(private productStore: ProductStore) {
  }

  // get all products from data file (mock api call)
  get() {
    timer(1500).pipe(mapTo(products))
      .subscribe( products =>{
        this.productStore.set(products);
      });
  }
}
