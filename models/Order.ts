import Moment from "moment";
import { CartItemShape } from "./Cart";

export interface OrderShape {
  id: string;
  items: CartItemShape[];
  totalAmount: number;
  date: Date;
  formattedDate: string;
}

class Order implements OrderShape {
  id;
  items;
  totalAmount;
  date;
  constructor(
    id: string,
    items: CartItemShape[],
    totalAmount: number,
    date: Date
  ) {
    this.id = id;
    this.items = items;
    this.totalAmount = totalAmount;
    this.date = date;
  }

  //  A function that you access like a property
  get formattedDate() {
    // return this.date.toLocaleDateString("en-EN", {
    //   year: "numeric",
    //   month: "long",
    //   day: "numeric",
    //   hour: "2-digit",
    //   minute: "2-digit",
    // });
    return Moment(this.date).format("MMMM Do YYYY, hh:mm");
    // Because React natives Android JS engine doesn't support JS Date functions
  }
}

export default Order;
