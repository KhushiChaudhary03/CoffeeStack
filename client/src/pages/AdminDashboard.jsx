import { useEffect, useState } from "react";

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    mostOrderedItems: [],
  });

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const [ordersRes, revenueRes, popularRes] = await Promise.all([
        fetch("http://localhost:5000/api/admin/stats/orders", { headers }),
        fetch("http://localhost:5000/api/admin/stats/revenue", { headers }),
        fetch("http://localhost:5000/api/admin/stats/popular", { headers }),
      ]);

      if (!ordersRes.ok || !revenueRes.ok || !popularRes.ok) {
        throw new Error("Failed to load admin analytics");
      }

      const ordersData = await ordersRes.json();
      const revenueData = await revenueRes.json();
      const popularData = await popularRes.json();

      setStats({
        totalOrders: ordersData.totalOrders,
        totalRevenue: revenueData.revenue,
        mostOrderedItems: popularData.map((item) => ({
          name: item._id,
          count: item.quantity,
        })),
      });
    } catch (err) {
      setError("Unable to load admin analytics");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-[#C8A97E] border-t-transparent mb-4"></div>
          <p className="text-gray-600 text-lg font-medium">Loading analytics...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md text-center">
          <div className="text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-red-600 mb-2">Error</h2>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  const maxCount = Math.max(
    ...stats.mostOrderedItems.map((i) => i.count),
    1
  );

  const totalItemsOrdered = stats.mostOrderedItems.reduce(
    (sum, item) => sum + item.count,
    0
  );

  const topItem = stats.mostOrderedItems[0];
  const topPercentage = topItem
    ? Math.round((topItem.count / totalItemsOrdered) * 100)
    : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 px-4 md:px-8 lg:px-20 py-12 md:py-20">
      <div className="max-w-7xl mx-auto">
        {/* Header with Animation */}
        <div className="mb-10 animate-fadeIn">
  <div className="flex items-center gap-4 mb-1">
    <div className="bg-[#EADDC8] p-2.5 rounded-xl shadow-sm">
      <span className="text-xl">📊</span>
    </div>

    <div>
      <h1 className="text-2xl md:text-3xl font-semibold text-[#2B1B14] tracking-tight">
        Admin Dashboard
      </h1>
      <p className="text-gray-600 text-sm mt-0.5">
        Orders & revenue analytics
      </p>
    </div>
  </div>

  <div className="h-0.5 w-16 bg-[#C8A97E] rounded mt-3" />
</div>

        {/* Stats Cards with Gradient Backgrounds */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-12">
          
          {/* Total Orders Card */}
          <div className="group bg-gradient-to-br from-blue-500 to-blue-600 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div className="text-white">
                <p className="text-sm font-medium opacity-90 mb-1">Total Orders</p>
                <h2 className="text-5xl font-bold mb-2">{stats.totalOrders}</h2>
                <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 w-fit">
                  <span className="text-xs font-semibold">↑ 12.5%</span>
                  <span className="text-xs opacity-90">vs last month</span>
                </div>
              </div>
              <div className="bg-white/20 backdrop-blur-md p-5 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                <span className="text-5xl">📦</span>
              </div>
            </div>
            <div className="mt-6 h-1.5 bg-white/30 rounded-full overflow-hidden">
              <div className="h-full bg-white rounded-full w-3/4 animate-pulse"></div>
            </div>
          </div>

          {/* Total Revenue Card */}
          <div className="group bg-gradient-to-br from-emerald-500 to-teal-600 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div className="text-white">
                <p className="text-sm font-medium opacity-90 mb-1">Total Revenue</p>
                <h2 className="text-5xl font-bold mb-2">₹{stats.totalRevenue.toLocaleString()}</h2>
                <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 w-fit">
                  <span className="text-xs font-semibold">↑ 18.3%</span>
                  <span className="text-xs opacity-90">vs last month</span>
                </div>
              </div>
              <div className="bg-white/20 backdrop-blur-md p-5 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                <span className="text-5xl">💰</span>
              </div>
            </div>
            <div className="mt-6 h-1.5 bg-white/30 rounded-full overflow-hidden">
              <div className="h-full bg-white rounded-full w-4/5 animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Donut Chart with Enhanced Design */}
        {topItem && (
          <div className="bg-white rounded-3xl shadow-xl p-8 mb-12 hover:shadow-2xl transition-shadow duration-300 border border-gray-100">
            <div className="flex items-center gap-3 mb-8">
              <div className="bg-gradient-to-br from-purple-400 to-pink-500 p-2 rounded-lg">
                <span className="text-2xl">🏆</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-800">Top Performing Item</h3>
            </div>

            <div className="flex flex-col md:flex-row items-center gap-8">
              {/* Donut Chart */}
              <div className="relative">
                <div className="relative w-44 h-44">
                  {/* Outer glow ring */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-amber-200 to-orange-200 opacity-30 blur-xl"></div>
                  
                  {/* Main donut */}
                  <div
                    className="absolute inset-0 rounded-full shadow-2xl"
                    style={{
                      background: `conic-gradient(#C8A97E ${topPercentage}%, #e5e7eb 0)`,
                    }}
                  />
                  
                  {/* Inner white circle */}
                  <div className="absolute inset-6 bg-white rounded-full flex items-center justify-center shadow-inner">
                    <div className="text-center">
                      <p className="text-3xl font-bold bg-gradient-to-br from-amber-600 to-orange-600 bg-clip-text text-transparent">
                        {topPercentage}%
                      </p>
                      <p className="text-xs text-gray-500 font-medium mt-1">Market Share</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Item Details */}
              <div className="flex-1 text-center md:text-left">
                <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-6 border-2 border-amber-200">
                  <p className="text-sm text-gray-500 font-medium mb-2">BEST SELLER</p>
                  <p className="font-bold text-2xl mb-2 text-gray-800">{topItem.name}</p>
                  <p className="text-gray-600 mb-3">Leading product in your catalog</p>
                  <div className="flex items-center justify-center md:justify-start gap-4 text-sm">
                    <div className="bg-white rounded-lg px-4 py-2 shadow-sm">
                      <span className="text-gray-500">Orders: </span>
                      <span className="font-bold text-amber-600">{topItem.count}</span>
                    </div>
                    <div className="bg-white rounded-lg px-4 py-2 shadow-sm">
                      <span className="text-gray-500">Revenue: </span>
                      <span className="font-bold text-emerald-600">₹{(topItem.count * 150).toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Most Ordered Items */}
          <div className="bg-white rounded-3xl shadow-xl p-8 hover:shadow-2xl transition-shadow duration-300 border border-gray-100">
            <div className="flex items-center gap-3 mb-8">
              <div className="bg-gradient-to-br from-orange-400 to-red-500 p-2 rounded-lg">
                <span className="text-2xl">☕</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-800">Most Ordered Items</h3>
            </div>

            <div className="space-y-6">
              {stats.mostOrderedItems.map((item, index) => (
                <div key={item.name} className="group">
                  <div className="flex justify-between items-center mb-2">
                    <span className="flex items-center gap-2 font-medium text-gray-700">
                      {index === 0 && <span className="text-xl">⭐</span>}
                      {index === 1 && <span className="text-xl">🥈</span>}
                      {index === 2 && <span className="text-xl">🥉</span>}
                      <span className="text-sm md:text-base">{item.name}</span>
                    </span>
                    <span className="font-bold text-amber-600 bg-amber-50 px-3 py-1 rounded-full text-sm">
                      {item.count} orders
                    </span>
                  </div>

                  <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden shadow-inner">
                    <div
                      className="h-3 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 transition-all duration-1000 ease-out group-hover:from-amber-500 group-hover:to-orange-600"
                      style={{
                        width: `${(item.count / maxCount) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Revenue Contribution */}
          <div className="bg-white rounded-3xl shadow-xl p-8 hover:shadow-2xl transition-shadow duration-300 border border-gray-100">
            <div className="flex items-center gap-3 mb-8">
              <div className="bg-gradient-to-br from-green-400 to-emerald-500 p-2 rounded-lg">
                <span className="text-2xl">📈</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-800">Revenue Contribution</h3>
            </div>

            <div className="space-y-6">
              {stats.mostOrderedItems.map((item, index) => (
                <div key={item.name} className="group">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium text-gray-700 text-sm md:text-base">{item.name}</span>
                    <span className="font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full text-sm">
                      ₹{(item.count * 150).toLocaleString()}
                    </span>
                  </div>

                  <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden shadow-inner">
                    <div
                      className="h-3 rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 transition-all duration-1000 ease-out group-hover:from-emerald-600 group-hover:to-teal-700"
                      style={{
                        width: `${(item.count / maxCount) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Stats Summary */}
        <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-3xl shadow-2xl p-8 text-white">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div>
              <p className="text-sm opacity-75 mb-2">Average Order Value</p>
              <p className="text-3xl font-bold">
                ₹{stats.totalOrders > 0 ? Math.round(stats.totalRevenue / stats.totalOrders) : 0}
              </p>
            </div>
            <div>
              <p className="text-sm opacity-75 mb-2">Total Items Sold</p>
              <p className="text-3xl font-bold">{totalItemsOrdered}</p>
            </div>
            <div>
              <p className="text-sm opacity-75 mb-2">Product Catalog</p>
              <p className="text-3xl font-bold">{stats.mostOrderedItems.length}</p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out;
        }
      `}</style>
    </div>
  );
}
