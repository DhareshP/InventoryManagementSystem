import axios from 'axios';
import { Product, Supplier, SaleOrder, StockMovement } from '../types';

const API_URL = 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const productApi = {
  getAll: () => api.get<Product[]>('/products/'),
  getOne: (id: string) => api.get<Product>(`/products/${id}/`),
  create: (data: Omit<Product, 'id'>) => api.post<Product>('/products/', data),
  update: (id: string, data: Partial<Product>) => api.put<Product>(`/products/${id}/`, data),
  delete: (id: string) => api.delete(`/products/${id}/`),
};

export const supplierApi = {
  getAll: () => api.get<Supplier[]>('/suppliers/'),
  getOne: (id: string) => api.get<Supplier>(`/suppliers/${id}/`),
  create: (data: Omit<Supplier, 'id'>) => api.post<Supplier>('/suppliers/', data),
  update: (id: string, data: Partial<Supplier>) => api.put<Supplier>(`/suppliers/${id}/`, data),
  delete: (id: string) => api.delete(`/suppliers/${id}/`),
};

export const saleOrderApi = {
  getAll: () => api.get<SaleOrder[]>('/sales/'),
  create: (data: Omit<SaleOrder, 'id'>) => api.post<SaleOrder>('/sales/', data),
  updateStatus: (id: string, status: SaleOrder['status']) => 
    api.patch<SaleOrder>(`/sales/${id}/`, { status }),
};

export const stockMovementApi = {
  getAll: () => api.get<StockMovement[]>('/stock-movements/'),
  create: (data: Omit<StockMovement, 'id'>) => 
    api.post<StockMovement>('/stock-movements/', data),
};