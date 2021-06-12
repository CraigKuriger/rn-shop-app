import { ProductShape } from "./Product";

export interface OrderShape {
  id: string;
  items: ProductShape[];
  totalAmount: number;
  date: Date;
}

class Order implements OrderShape {
  id;
  items;
  totalAmount;
  date;
  constructor(
    id: string,
    items: ProductShape[],
    totalAmount: number,
    date: Date
  ) {
    this.id = id;
    this.items = items;
    this.totalAmount = totalAmount;
    this.date = date;
  }
}

export default Order;
