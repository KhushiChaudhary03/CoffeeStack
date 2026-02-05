import { useEffect, useState } from "react";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    orders: 0,
    revenue: 0,
    popular: [],
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    const token = localStorage.getItem("token");

    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const orders = await fetch(
      "http://localhost:5000/api/admin/stats/orders",
      { headers }
    );
    const revenue = await fetch(
      "http://localhost:5000/api/admin/stats/revenue",
      { headers }
    );
    const popular = await fetch(
      "http://localhost:5000/api/admin/stats/popular",
      { headers }
    );

    setStats({
      orders: (await orders.json()).totalOrders,
      revenue: (await revenue.json()).revenue,
      popular: await popular.json(),
    });
  };

  return (
    <div className="min-h-screen bg-[#F5EFE6] px-6 py-20">
      <h1 className="text-4xl font-bold mb-10">Admin Analytics</h1>

      {/* SUMMARY CARDS */}
      <div className="grid md:grid-cols-2 gap-6 mb-10">
        <div className="bg-white p-6 rounded-xl shadow">
          <p>Total Orders</p>
          <p className="text-2xl font-bold">{stats.orders}</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <p>Total Revenue</p>
          <p className="text-2xl font-bold">₹{stats.revenue}</p>
        </div>
      </div>

      {/* POPULAR ITEMS */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="font-semibold mb-4">Most Ordered Items</h2>

        {stats.popular.map((item) => (
          <div key={item._id} className="flex justify-between">
            <span>{item._id}</span>
            <span>{item.quantity}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
