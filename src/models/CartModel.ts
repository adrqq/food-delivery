import { CartItemModel } from './CartItemModel';

export interface CartModel {
  userId: string,
  itemsData: CartItemModel[],
}

// const ItemSchema = new Schema({
//   productId: { type: Number, required: true },
//   count: { type: Number, required: true },
// });

// const CartSchema = new Schema({
//   userId: String,
//   itemsData: [ItemSchema],
// });
