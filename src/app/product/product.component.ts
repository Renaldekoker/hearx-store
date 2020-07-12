import {Component, Input, OnInit} from '@angular/core';
import {ProductQuery} from './state/product.query';
import {IProduct} from './state/product.model';
import {Observable} from 'rxjs/index';
import {CartQuery} from '../cart/state/cart.query';
import {ICart} from '../cart/state/cart.model';
import {CartService} from '../cart/state/cart.service';
import {ID} from '@datorama/akita';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  @Input('productId') productId: IProduct['id'];
  product: IProduct;
  // bind to product loading observable
  cartItem$: Observable<ICart>;
  isLoading$: Observable<boolean>;

  constructor(
    private productQuery: ProductQuery,
    private cartQuery: CartQuery,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    // fetch this product from store
    this.product = this.productQuery.getEntity(this.productId);
    // check if product exists in cart
    this.cartItem$ = this.cartQuery.selectEntity(this.product.id);
    // get this product's UI loading state
    this.isLoading$ = this.productQuery.selectLoadingEntity(this.productId);
    // check if cart has expired every 15 sec
    let interval = setInterval(() => {
      this.cartService.hasExpired();
    }, 15000)
  }
  // increment item quantity
  addProductToCart() {
    // check if cart has expired
    if (!this.cartService.hasExpired()) {
      this.cartService.addProductToCart(this.product.id);
    }
  }
  // decrement item quantity
  removeProductFromCart() {
    if (!this.cartService.hasExpired()) {
      this.cartService.removeProductFromCart(this.product.id);
    }
  }

}
