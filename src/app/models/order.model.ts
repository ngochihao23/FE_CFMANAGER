export interface CreatedByUser {
  id: string;
  username: string;
  fullname: string;
  email: string;
  phoneNumber: string | null;
  role: number;
}

export interface OrderItem {
  id: string;
  tableId: string;
  menuItemId: string;
  menuItemName: string;
  quantity: number;
  unitPrice: number;
}

export interface Order {
  id: string;
  orderTime: string;
  status: number;
  tableId: string;
  tableName: string;
  paymentMethod: number;
  totalAmount: number;
  createdByUserId: string;
  createdByUser: CreatedByUser;
  isPaid: boolean;
  orderStatus: string;
  orderItems: OrderItem[];
}
