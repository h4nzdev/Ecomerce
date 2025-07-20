import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { Delete, Trash, X } from "lucide-react";
import axios from "axios";

const OrderHistory = ({ setOrderNumber, setTotalSpent }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        console.log("Fetching orders for user:", user);
        const response = await fetch(
          `http://127.0.0.1:5000/api/orders/${user.id}`
        );
        const data = await response.json();
        console.log("Received orders data:", data);

        if (data.success) {
          setOrders(data.orders);
        } else {
          console.error("Failed to fetch orders:", data.message);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchOrders();
    } else {
      console.log("No user found");
    }
  }, [user]);

  if (loading) {
    return <div className="text-center">Loading orders...</div>;
  }

  if (!orders.length) {
    return (
      <div className="text-center p-4">
        <h2 className="text-xl font-semibold mb-2">Order History</h2>
        <p>You haven't placed any orders yet.</p>
      </div>
    );
  }

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `http://127.0.0.1:5000/api/delete/${id}`
      );

      if (response.data.success) {
        setOrders((prevOrders) =>
          prevOrders.filter((order) => order.id !== id)
        );
        console.log(response.data);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  const totalAmount = orders.reduce(
    (acc, order) => acc + order.total_amount,
    0
  );
  setTotalSpent(totalAmount);
  setOrderNumber(orders.length);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Order History</h2>
      <div className="space-y-4">
        {orders.map((order) => (
          <div key={order.id} className="border rounded-lg p-4 shadow-sm">
            <div className="flex justify-between mb-2">
              <div>
                <span className="font-medium">Order #{order.id}</span>
                <span className="ml-4 text-gray-600">
                  {new Date(order.order_date).toLocaleDateString()}
                </span>
              </div>
              <div className="flex items-center gap-4">
                <span
                  className={`px-2 py-1 rounded text-sm ${
                    order.status === "completed"
                      ? "bg-green-100 text-green-800"
                      : order.status === "processing"
                      ? "bg-blue-100 text-blue-800"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {order.status}
                </span>
                <X onClick={() => handleDelete(order.id)} />
              </div>
            </div>

            <div className="border-t pt-2 mt-2">
              <div className="grid grid-cols-3 gap-4 text-sm text-gray-600 mb-2">
                <div>
                  <span className="font-medium">Payment Method:</span>
                  <span className="ml-1">{order.payment_method}</span>
                </div>
                <div>
                  <span className="font-medium">Delivery Method:</span>
                  <span className="ml-1">{order.delivery_method}</span>
                </div>
                <div>
                  <span className="font-medium">Total:</span>
                  <span className="ml-1">${order.total_amount.toFixed(2)}</span>
                </div>
              </div>

              <div className="mt-3">
                <h4 className="font-medium mb-2">Items:</h4>
                <div className="space-y-2">
                  {order.items.map((item, index) => (
                    <div key={index} className="flex justify-between text-sm">
                      <span>
                        {item.title} x {item.quantity}
                      </span>
                      <span>${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderHistory;
