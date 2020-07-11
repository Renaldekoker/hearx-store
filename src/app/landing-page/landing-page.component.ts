import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs/index';
import {IProduct} from '../product/state/product.model';
import {ProductQuery} from '../product/state/product.query';
import {ProductService} from '../product/state/product.service';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {
  products$ = this.productQuery.selectAll();
  selectLoading$ = this.productQuery.selectLoading();
  sortBy = new FormControl();

  constructor(
    private productQuery: ProductQuery,
    private productService: ProductService
  ) {
    this.getProducts();
  }

  ngOnInit(): void {
  }

  getProducts() {
    // get all products from api
    this.productService.get();
  }

}
