import React, { useState } from "react";
import {
  User,
  Mail,
  Phone,
  MapPin,
  CreditCard,
  Package,
  Settings,
  ArrowLeft,
} from "lucide-react";
import { Link } from "react-router-dom";
import OrderHistory from "../components/Orders/OrderHistory";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

const Account = () => {
  const { user } = useAuth();
  const {cartItems} = useCart();
  const [orderNumber, setOrderNumber] = useState(0);
  const [totalSpent, setTotalSpent] = useState(0);

  console.log(user);
  return (
    <div className="w-full min-h-screen bg-slate-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-3xl font-bold text-slate-800 mb-8 flex items-center gap-6">
          <Link to={"/"}>
            <ArrowLeft
              size={34}
              className="p-1 rounded-full hover:bg-slate-600 hover:text-white transition-all duration-100"
            />
          </Link>
          <h3>My Account</h3>
        </div>

        {/* Profile Section */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 mb-6">
          <div className="flex items-center mb-6">
            <div className="w-16 h-16 bg-slate-200 rounded-full flex items-center justify-center mr-4">
              <User className="w-8 h-8 text-slate-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-slate-800">
                {user.username}
              </h2>
              <p className="text-slate-600">Customer since March 1199</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center">
                <Mail className="w-5 h-5 text-slate-500 mr-3" />
                <div>
                  <p className="text-sm text-slate-600">Email</p>
                  <p className="text-slate-800">{user.email}</p>
                </div>
              </div>

              <div className="flex items-center">
                <Phone className="w-5 h-5 text-slate-500 mr-3" />
                <div>
                  <p className="text-sm text-slate-600">Phone</p>
                  <p className="text-slate-800">{user.phone}</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center">
                <MapPin className="w-5 h-5 text-slate-500 mr-3" />
                <div>
                  <p className="text-sm text-slate-600">Address</p>
                  <p className="text-slate-800">{user.address}</p>
                </div>
              </div>

              <div className="flex items-center">
                <CreditCard className="w-5 h-5 text-slate-500 mr-3" />
                <div>
                  <p className="text-sm text-slate-600">Payment Method</p>
                  <p className="text-slate-800">•••• •••• •••• 1234</p>
                </div>
              </div>
            </div>
          </div>

          <button className="mt-6 px-4 py-2 bg-slate-700 text-white rounded-md hover:bg-slate-800 transition-colors">
            Edit Profile
          </button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
            <div className="flex items-center">
              <Package className="w-8 h-8 text-slate-600 mr-3" />
              <div>
                <p className="text-2xl font-bold text-slate-800">
                  {orderNumber}
                </p>
                <p className="text-sm text-slate-600">Total Orders</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
            <div className="flex items-center">
              <CreditCard className="w-8 h-8 text-slate-600 mr-3" />
              <div>
                <p className="text-2xl font-bold text-slate-800">
                  ${parseFloat(totalSpent).toLocaleString()}
                </p>
                <p className="text-sm text-slate-600">Total Spent</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
            <div className="flex items-center">
              <Settings className="w-8 h-8 text-slate-600 mr-3" />
              <div>
                <p className="text-2xl font-bold text-slate-800">{cartItems.length}</p>
                <p className="text-sm text-slate-600">Saved Items</p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Orders */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
          <h3 className="text-xl font-semibold text-slate-800 mb-4">
            Recent Orders
          </h3>

          <OrderHistory
            setOrderNumber={setOrderNumber}
            setTotalSpent={setTotalSpent}
          />

          <button className="mt-4 text-slate-700 hover:text-slate-900 font-medium">
            View All Orders →
          </button>
        </div>
      </div>
    </div>
  );
};

export default Account;
