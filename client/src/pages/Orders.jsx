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
      console.log("TOKEN SENT:", token);

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
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-10">
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
          You haven’t placed any orders yet ☕
        </p>
      )}

      {/* Orders List */}
      <div className="max-w-4xl mx-auto space-y-8">
        {orders.map((order, index) => (
          <div
            key={order._id}
            className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition"
          >
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
              <div>
                <p className="text-sm text-gray-500">
                  Order #{index + 1}
                </p>
                <p className="text-sm font-medium text-gray-700 break-all">
                  {order._id}
                </p>
              </div>

              <span className="text-xs bg-[#F5EFE6] px-3 py-1 rounded-full mt-2 sm:mt-0">
                {new Date(order.createdAt).toLocaleDateString()}
              </span>
            </div>

            {/* Items */}
            <div className="border rounded-lg p-4 space-y-3 mb-4">
              {order.items.map((item, i) => (
                <div
                  key={i}
                  className="flex justify-between items-center text-sm"
                >
                  <span className="font-medium">
                    {item.name}
                    <span className="text-gray-500"> × {item.quantity}</span>
                  </span>

                  <span className="font-semibold">
                    ₹{item.price * item.quantity}
                  </span>
                </div>
              ))}
            </div>

            {/* Total */}
            <div className="flex justify-between items-center text-lg font-bold">
              <span>Total Paid</span>
              <span className="text-[#3E2723]">
                ₹{order.totalAmount}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
