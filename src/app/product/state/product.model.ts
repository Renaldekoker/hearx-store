import {ID} from '@datorama/akita';

export interface IProduct {
  id: ID | null;
  image: string | null;
  name: string | null;
  price: number | null;
}

export interface IProductUI {
  isLoading: boolean;
}

export function createProduct(params: Partial<IProduct>) {
  return {

  } as IProduct;
}
