import React from "react";
import {
  User,
  Mail,
  Phone,
  MapPin,
  CreditCard,
  Package,
  Settings,
} from "lucide-react";

const Account = () => {
  return (
    <div className="w-full min-h-screen bg-slate-50 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-slate-800 mb-8">My Account</h1>

        {/* Profile Section */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 mb-6">
          <div className="flex items-center mb-6">
            <div className="w-16 h-16 bg-slate-200 rounded-full flex items-center justify-center mr-4">
              <User className="w-8 h-8 text-slate-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-slate-800">John Doe</h2>
              <p className="text-slate-600">Customer since March 2023</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center">
                <Mail className="w-5 h-5 text-slate-500 mr-3" />
                <div>
                  <p className="text-sm text-slate-600">Email</p>
                  <p className="text-slate-800">john.doe@email.com</p>
                </div>
              </div>

              <div className="flex items-center">
                <Phone className="w-5 h-5 text-slate-500 mr-3" />
                <div>
                  <p className="text-sm text-slate-600">Phone</p>
                  <p className="text-slate-800">+1 (555) 123-4567</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center">
                <MapPin className="w-5 h-5 text-slate-500 mr-3" />
                <div>
                  <p className="text-sm text-slate-600">Address</p>
                  <p className="text-slate-800">
                    123 Main St, City, State 12345
                  </p>
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
                <p className="text-2xl font-bold text-slate-800">24</p>
                <p className="text-sm text-slate-600">Total Orders</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
            <div className="flex items-center">
              <CreditCard className="w-8 h-8 text-slate-600 mr-3" />
              <div>
                <p className="text-2xl font-bold text-slate-800">$1,247</p>
                <p className="text-sm text-slate-600">Total Spent</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
            <div className="flex items-center">
              <Settings className="w-8 h-8 text-slate-600 mr-3" />
              <div>
                <p className="text-2xl font-bold text-slate-800">3</p>
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

          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b border-slate-100">
              <div>
                <p className="font-medium text-slate-800">Order #12345</p>
                <p className="text-sm text-slate-600">March 15, 2024</p>
              </div>
              <div className="text-right">
                <p className="font-medium text-slate-800">$89.99</p>
                <span className="inline-block px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">
                  Delivered
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between py-3 border-b border-slate-100">
              <div>
                <p className="font-medium text-slate-800">Order #12344</p>
                <p className="text-sm text-slate-600">March 10, 2024</p>
              </div>
              <div className="text-right">
                <p className="font-medium text-slate-800">$156.50</p>
                <span className="inline-block px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                  Shipped
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between py-3">
              <div>
                <p className="font-medium text-slate-800">Order #12343</p>
                <p className="text-sm text-slate-600">March 5, 2024</p>
              </div>
              <div className="text-right">
                <p className="font-medium text-slate-800">$203.25</p>
                <span className="inline-block px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">
                  Delivered
                </span>
              </div>
            </div>
          </div>

          <button className="mt-4 text-slate-700 hover:text-slate-900 font-medium">
            View All Orders →
          </button>
        </div>
      </div>
    </div>
  );
};

export default Account;
