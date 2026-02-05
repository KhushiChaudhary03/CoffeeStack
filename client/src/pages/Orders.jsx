import { useEffect, useState } from "react";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch("http://localhost:5000/api/orders/my-orders", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Failed to fetch orders");
        return;
      }

      setOrders(data);
    } catch (err) {
      setError("Server error while fetching orders");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5EFE6] px-6 md:px-20 py-20 text-[#2B1B14]">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-12">
        My Orders
      </h1>

      {/* Loading */}
      {loading && (
        <p className="text-center text-gray-600">
          Loading your orders...
        </p>
      )}

      {/* Error */}
      {error && (
        <p className="text-center text-red-600">
          {error}
        </p>
      )}

      {/* No Orders */}
      {!loading && orders.length === 0 && !error && (
        <p className="text-center text-gray-600">
          You have not placed any orders yet.
        </p>
      )}

      {/* Orders List */}
      <div className="space-y-8 max-w-4xl mx-auto">
        {orders.map((order) => (
          <div
            key={order._id}
            className="bg-white rounded-2xl shadow-lg p-6"
          >
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between mb-4 gap-2">
              <p className="font-semibold">
                Order ID:
                <span className="font-normal ml-2 text-gray-600">
                  {order._id}
                </span>
              </p>

              <p className="text-sm text-gray-500">
                {new Date(order.createdAt).toLocaleDateString()}{" "}
                {new Date(order.createdAt).toLocaleTimeString()}
              </p>
            </div>

            {/* Items */}
            <div className="border-t border-b py-4 space-y-2">
              {order.items.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between text-sm"
                >
                  <span>
                    {item.name} × {item.quantity}
                  </span>
                  <span>
                    ₹{item.price * item.quantity}
                  </span>
                </div>
              ))}
            </div>

            {/* Total */}
            <div className="flex justify-between mt-4 font-bold text-lg">
              <span>Total</span>
              <span>₹{order.totalAmount}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
