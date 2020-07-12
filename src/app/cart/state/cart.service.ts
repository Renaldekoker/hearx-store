import {Inject, Injectable} from '@angular/core';
import {createCart, ICart} from './cart.model';
import {CartStore} from './cart.store';
import {IProduct} from '../../product/state/product.model';
import {CartQuery} from './cart.query';
import {ProductStore} from '../../product/state/product.store';
import {PersistState} from '@datorama/akita';

@Injectable({providedIn: 'root'})
export class CartService {

  constructor(
    private cartStore: CartStore,
    private cartQuery: CartQuery,
    private productStore: ProductStore,
    @Inject('persistStorage') private persistStorage
    ) {
  }
  private setExpiry() {
    // set expiry one hour from now in milliseconds
    const EXPIRY = Date.now() + 60*60*1000;
    localStorage.setItem('cart_expiry', JSON.stringify(EXPIRY))
  }

  private createNewCartItem(product_id) {
    // if cart is pristine set cart expiry
    if (!this.cartQuery.getHasCache()) {
      this.setExpiry();
    }
    // make sure has cache is set when product gets added to cart
    this.cartStore.setHasCache(true);
    const cart_item = createCart({
      product_id
    });
    // add new product to cart store
    return this.cartStore.add(cart_item);
  }

  hasExpired() {
    // check if cart expired every 15 seconds
    if(Date.now() > parseInt(localStorage.getItem('cart_expiry'))) {
      // clear storage and store
      alert('Your shopping cart has expired. Clearing cart.');
      this.persistStorage.clearStore();
      this.cartStore.reset();
      localStorage.clear();
      return true;
    }
    return false;
  }

  async addProductToCart(product_id: IProduct['id']) {
    // set product ui loading state
    this.productStore.ui.upsert(product_id, {isLoading: true});
    // set timeout to mock async call
    setTimeout(() => {
      // Get item in cart id it already exists
      const product = this.cartQuery.getEntity(product_id);
      // set product ui loading state
      this.productStore.ui.upsert(product_id, {isLoading: false});
      // if product exists in cart, increment the quantity
      if (product) {
        return this.cartStore.updateCartQuantity(product_id, 1);
      }
      // or else create new product in cart
      return this.createNewCartItem(product_id);
    }, 1000);
  }

  async removeProductFromCart(product_id: IProduct['id']) {
    // set product ui loading state
    this.productStore.ui.upsert(product_id, {isLoading: true});
    setTimeout(() => {
      // Get item in cart id it already exists
      const product = this.cartQuery.getEntity(product_id);
      // set product ui loading state
      this.productStore.ui.upsert(product_id, {isLoading: false});
      // if product exists in cart, decrement or remove completely if quantity becomes 0
      if (product) {
        if (product.quantity > 1) {
          return this.cartStore.updateCartQuantity(product_id, -1);
        } else {
          return this.cartStore.remove(product_id);
        }
      }
      // or else do nothing
      return null;
    }, 1000);
  }
}
