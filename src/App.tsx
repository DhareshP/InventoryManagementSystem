import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { LayoutGrid, Users, ShoppingCart, BarChart3 } from 'lucide-react';
import Products from './pages/Products';
import Suppliers from './pages/Suppliers';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <nav className="bg-white shadow-md">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex justify-between h-16">
              <div className="flex space-x-8">
                <Link to="/" className="flex items-center text-gray-900">
                  <LayoutGrid className="w-6 h-6 mr-2" />
                  <span className="font-semibold">Inventory System</span>
                </Link>
                <div className="flex space-x-4">
                  <Link to="/products" className="flex items-center px-3 py-2 text-gray-700 hover:text-gray-900">
                    <BarChart3 className="w-5 h-5 mr-1" />
                    Products
                  </Link>
                  <Link to="/suppliers" className="flex items-center px-3 py-2 text-gray-700 hover:text-gray-900">
                    <Users className="w-5 h-5 mr-1" />
                    Suppliers
                  </Link>
                  <Link to="/sales" className="flex items-center px-3 py-2 text-gray-700 hover:text-gray-900">
                    <ShoppingCart className="w-5 h-5 mr-1" />
                    Sales
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </nav>

        <main className="max-w-7xl mx-auto py-6 px-4">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/products" element={<Products />} />
            <Route path="/suppliers" element={<Suppliers />} />
            <Route path="/sales" element={<div>Sales page coming soon</div>} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

function Dashboard() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <DashboardCard
        title="Total Products"
        value="0"
        icon={<BarChart3 className="w-8 h-8 text-blue-500" />}
      />
      <DashboardCard
        title="Active Suppliers"
        value="0"
        icon={<Users className="w-8 h-8 text-green-500" />}
      />
      <DashboardCard
        title="Pending Orders"
        value="0"
        icon={<ShoppingCart className="w-8 h-8 text-yellow-500" />}
      />
      <DashboardCard
        title="Low Stock Items"
        value="0"
        icon={<LayoutGrid className="w-8 h-8 text-red-500" />}
      />
    </div>
  );
}

function DashboardCard({ title, value, icon }: { title: string; value: string; icon: React.ReactNode }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-500 text-sm">{title}</p>
          <p className="text-2xl font-semibold mt-1">{value}</p>
        </div>
        {icon}
      </div>
    </div>
  );
}

export default App;