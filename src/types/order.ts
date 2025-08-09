
import type { Timestamp } from "firebase/firestore";
import type { CartItem } from "@/context/CartContext";

export type OrderStatus = 'Pending' | 'Preparing' | 'Out for Delivery' | 'Completed' | 'Cancelled';
export type DeliveryType = 'Home Delivery' | 'Take Away';

export interface Order {
  id: string;
  customerName: string;
  phoneNumber: string;
  address: string;
  pincode: string;
  deliveryType: DeliveryType;
  orderItems: CartItem[];
  totalAmount: number;
  paymentMethod: 'Cash on Delivery';
  orderStatus: OrderStatus;
  orderDate: Timestamp;
}
