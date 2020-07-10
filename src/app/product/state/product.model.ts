export interface IProduct {
  id: number | string;
  image: string | null;
  name: string | null;
}

export function createProduct(params: Partial<IProduct>) {
  return {

  } as IProduct;
}
