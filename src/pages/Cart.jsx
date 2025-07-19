import React, { useState } from "react";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";

const Cart = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Premium Wireless Headphones",
      price: 199.99,
      quantity: 1,
      image: "/api/placeholder/80/80",
    },
    {
      id: 2,
      name: "Smart Fitness Watch",
      price: 299.99,
      quantity: 2,
      image: "/api/placeholder/80/80",
    },
    {
      id: 3,
      name: "Bluetooth Speaker",
      price: 89.99,
      quantity: 1,
      image: "/api/placeholder/80/80",
    },
  ]);

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity <= 0) return;
    setCartItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  return (
    <div className="w-full min-h-screen bg-slate-50 p-6">
      <div className="w-[90%] mx-auto">
        <h1 className="text-3xl font-bold text-slate-800 mb-8">
          Shopping Cart
        </h1>

        {cartItems.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-12 text-center">
            <ShoppingBag className="w-16 h-16 text-slate-400 mx-auto mb-4" />
            <p className="text-slate-600 text-lg mb-4">Your cart is empty</p>
            <button className="px-6 py-3 bg-slate-700 text-white rounded-md hover:bg-slate-800 transition-colors">
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm border border-slate-200">
                <div className="p-6 border-b border-slate-200">
                  <h2 className="text-xl font-semibold text-slate-800">
                    Cart Items ({cartItems.length})
                  </h2>
                </div>

                <div className="p-6 space-y-6">
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center space-x-4 pb-6 border-b border-slate-100 last:border-b-0 last:pb-0"
                    >
                      <div className="w-20 h-20 bg-slate-200 rounded-lg flex items-center justify-center">
                        <div className="w-16 h-16 bg-slate-300 rounded"></div>
                      </div>

                      <div className="flex-1">
                        <h3 className="font-medium text-slate-800 mb-1">
                          {item.name}
                        </h3>
                        <p className="text-slate-600">
                          ${item.price.toFixed(2)}
                        </p>
                      </div>

                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          className="w-8 h-8 rounded-full border border-slate-300 flex items-center justify-center hover:bg-slate-100"
                        >
                          <Minus className="w-4 h-4 text-slate-600" />
                        </button>

                        <span className="w-8 text-center font-medium text-slate-800">
                          {item.quantity}
                        </span>

                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          className="w-8 h-8 rounded-full border border-slate-300 flex items-center justify-center hover:bg-slate-100"
                        >
                          <Plus className="w-4 h-4 text-slate-600" />
                        </button>
                      </div>

                      <div className="text-right">
                        <p className="font-medium text-slate-800">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>

                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-slate-500 hover:text-red-600 p-1"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 sticky top-6">
                <h2 className="text-xl font-semibold text-slate-800 mb-6">
                  Order Summary
                </h2>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-slate-600">Subtotal</span>
                    <span className="text-slate-800">
                      ${subtotal.toFixed(2)}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-slate-600">Tax</span>
                    <span className="text-slate-800">${tax.toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-slate-600">Shipping</span>
                    <span className="text-green-600">Free</span>
                  </div>

                  <hr className="border-slate-200" />

                  <div className="flex justify-between text-lg font-semibold">
                    <span className="text-slate-800">Total</span>
                    <span className="text-slate-800">${total.toFixed(2)}</span>
                  </div>
                </div>

                <button className="w-full py-3 bg-slate-700 text-white rounded-md hover:bg-slate-800 transition-colors font-medium mb-3">
                  Proceed to Checkout
                </button>

                <Link to={"/"}>
                  <button className="cursor-pointer w-full py-3 border border-slate-300 text-slate-700 rounded-md hover:bg-slate-50 transition-colors">
                    Continue Shopping
                  </button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
