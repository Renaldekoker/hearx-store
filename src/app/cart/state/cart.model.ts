import {IProduct} from '../../product/state/product.model';

export interface ICart {
  product_id: IProduct['id'] | null;
  quantity: number | null;
}

// create cart factory
export function createCart(params: Partial<ICart>) {
  return {
    quantity: 1,
    ...params
  } as ICart;
}
