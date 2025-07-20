import React, { useState } from "react";
import axios from "axios";
import { CreditCard, Smartphone, Truck, X } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";
import Swal from "sweetalert2";

const PaymentModal = ({ isOpen, onClose, total }) => {
  const [paymentMethod, setPaymentMethod] = useState("gcash");
  const [deliveryMethod, setDeliveryMethod] = useState("online");
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(null);

  const { user } = useAuth();
  const { cartItems, clearCart } = useCart();
  //   const { cart, clearCart } = useCart();

  const handleSubmit = async () => {
    setProcessing(true);
    setError(null);

    try {
      const response = await axios.post("http://127.0.0.1:5000/api/orders", {
        user_id: user.id,
        items: cartItems.map((item) => ({
          id: item.id,
          title: item.title,
          quantity: item.quantity,
          price: item.price,
        })),
        total_amount: total,
        payment_method: paymentMethod,
        delivery_method: deliveryMethod,
      });

      if (response.data.success) {
        clearCart();
        Swal.fire({
          icon: "success",
          title: "Payment Successful!",
          text: `Order placed!`,
          timer: 1500,
          showConfirmButton: false,
        }).then(() => {
          clearCart();
          onClose();
          setIsPaymentModalOpen(false);
        });
      } else {
        setError(response.data.message || "Failed to place order.");
      }
    } catch (err) {
      console.error("Payment error:", err);
      setError("An error occurred while processing your payment.");
    } finally {
      setProcessing(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex bg-black/50 backdrop-blur-xs items-center justify-center p-4 z-50">
      <div className="bg-slate-100 rounded-lg shadow-xl md:max-w-200 max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-200">
          <h2 className="text-xl font-semibold text-slate-800">
            Payment Options
          </h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Error Display */}
        {error && (
          <div className="bg-red-100 text-red-700 p-3 text-sm mx-6 mt-4 rounded border border-red-300">
            {error}
          </div>
        )}

        {/* Modal Content */}
        <div className="p-6 space-y-6">
          {/* Payment Method */}
          <div>
            <h3 className="text-lg font-medium text-slate-800 mb-4">
              Choose Payment Method
            </h3>
            <div className="space-y-3">
              {[
                {
                  value: "gcash",
                  label: "GCash",
                  icon: Smartphone,
                  color: "bg-blue-600",
                },
                {
                  value: "paymaya",
                  label: "PayMaya",
                  icon: Smartphone,
                  color: "bg-green-600",
                },
                {
                  value: "bpi",
                  label: "BPI Online",
                  icon: CreditCard,
                  color: "bg-red-600",
                },
                {
                  value: "bdo",
                  label: "BDO Online",
                  icon: CreditCard,
                  color: "bg-blue-800",
                },
                {
                  value: "metrobank",
                  label: "Metrobank",
                  icon: CreditCard,
                  color: "bg-yellow-600",
                },
              ].map(({ value, label, icon: Icon, color }) => (
                <label
                  key={value}
                  className="flex items-center p-4 border border-slate-200 rounded-lg cursor-pointer hover:bg-slate-50 transition-colors"
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value={value}
                    checked={paymentMethod === value}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-4 h-4 text-slate-600 border-slate-300"
                  />
                  <div className="ml-3 flex items-center">
                    <div
                      className={`w-8 h-8 ${color} rounded flex items-center justify-center mr-3`}
                    >
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="font-medium text-slate-800">{label}</div>
                      <div className="text-sm text-slate-600">
                        Pay via {label}
                      </div>
                    </div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Delivery Method */}
          <div>
            <label
              htmlFor="deliveryMethod"
              className="block text-sm font-medium text-slate-700 mb-2"
            >
              Delivery Method
            </label>
            <select
              id="deliveryMethod"
              value={deliveryMethod}
              onChange={(e) => setDeliveryMethod(e.target.value)}
              className="w-full px-4 py-3 rounded-md border border-slate-300 focus:border-slate-500 focus:ring-1 focus:ring-slate-500 outline-none transition-colors"
            >
              <option value="online">Pay Online</option>
              <option value="cod">Cash on Delivery</option>
            </select>
          </div>

          {/* Order Summary */}
          <div className="bg-slate-50 rounded-lg p-4">
            <h4 className="font-medium text-slate-800 mb-2">Order Summary</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-600">Subtotal</span>
                <span className="text-slate-800">
                  ${(total * 0.92).toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Tax (8%)</span>
                <span className="text-slate-800">
                  ${(total * 0.08).toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Shipping</span>
                <span className="text-green-600">Free</span>
              </div>
              <hr className="border-slate-200" />
              <div className="flex justify-between font-medium">
                <span className="text-slate-800">Total</span>
                <span className="text-slate-800">${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex space-x-3 p-6 border-t border-slate-200">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-3 border border-slate-300 text-slate-700 rounded-md hover:bg-slate-50 transition-colors"
            disabled={processing}
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="flex-1 px-4 py-3 bg-slate-700 text-white rounded-md hover:bg-slate-800 transition-colors font-medium disabled:opacity-60"
            disabled={processing}
          >
            {processing ? "Processing..." : "Confirm Payment"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;
