export interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  stock_quantity: number;
  supplier: string;
}

export interface Supplier {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
}

export interface SaleOrder {
  id: string;
  product: string;
  quantity: number;
  total_price: number;
  sale_date: string;
  status: 'Pending' | 'Completed' | 'Cancelled';
}

export interface StockMovement {
  id: string;
  product: string;
  quantity: number;
  movement_type: 'In' | 'Out';
  movement_date: string;
  notes: string;
}