import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useCart } from '../../contexts/CartContext';

const PaymentModal = ({ isOpen, onClose, onSuccess }) => {
    const [processing, setProcessing] = useState(false);
    const [error, setError] = useState(null);
    const [paymentMethod, setPaymentMethod] = useState('credit_card');
    const [deliveryMethod, setDeliveryMethod] = useState('standard');
    
    const { user } = useAuth();
    const { cart, total } = useCart();

    if (!isOpen) return null;

    const handlePayment = async () => {
        setProcessing(true);
        try {
            const response = await fetch('http://127.0.0.1:5000/api/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    user_id: user.id,
                    items: cart.map(item => ({
                        id: item.id,
                        title: item.title,
                        quantity: item.quantity,
                        price: item.price
                    })),
                    total_amount: total,
                    payment_method: paymentMethod,
                    delivery_method: deliveryMethod
                })
            });

            const data = await response.json();
            
            if (data.success) {
                onSuccess();
            } else {
                setError(data.message || 'Failed to create order');
            }
        } catch (error) {
            console.error('Error creating order:', error);
            setError('Failed to process payment. Please try again.');
        } finally {
            setProcessing(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
                <h2 className="text-2xl font-semibold mb-4">Checkout</h2>
                
                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                        {error}
                    </div>
                )}

                <div className="mb-4">
                    <h3 className="font-medium mb-2">Payment Method</h3>
                    <select
                        value={paymentMethod}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="w-full p-2 border rounded"
                        disabled={processing}
                    >
                        <option value="credit_card">Credit Card</option>
                        <option value="paypal">PayPal</option>
                        <option value="bank_transfer">Bank Transfer</option>
                    </select>
                </div>

                <div className="mb-4">
                    <h3 className="font-medium mb-2">Delivery Method</h3>
                    <select
                        value={deliveryMethod}
                        onChange={(e) => setDeliveryMethod(e.target.value)}
                        className="w-full p-2 border rounded"
                        disabled={processing}
                    >
                        <option value="standard">Standard Delivery (3-5 days)</option>
                        <option value="express">Express Delivery (1-2 days)</option>
                        <option value="pickup">Store Pickup</option>
                    </select>
                </div>

                <div className="mb-4">
                    <h3 className="font-medium mb-2">Order Summary</h3>
                    <div className="bg-gray-50 p-3 rounded">
                        <div className="flex justify-between mb-2">
                            <span>Subtotal:</span>
                            <span>${total.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between font-medium">
                            <span>Total:</span>
                            <span>${total.toFixed(2)}</span>
                        </div>
                    </div>
                </div>

                <div className="flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-gray-600 hover:text-gray-800"
                        disabled={processing}
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handlePayment}
                        disabled={processing}
                        className={`px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 ${
                            processing ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                    >
                        {processing ? 'Processing...' : `Pay $${total.toFixed(2)}`}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PaymentModal;
