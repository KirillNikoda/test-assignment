export interface IProduct {
  _id: string;
  name: string;
  price: number;
  remainingCount: number;
}

export interface IUpdateProduct {
  name: string;
  price: number;
  remainingCount: number;
}
