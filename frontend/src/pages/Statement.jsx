import { useEffect, useState } from "react";
import DashboardLayout from "../layout/DashboardLyout";
import API from "../services/api";

export default function Statement() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const getTransactions = async () => {
      try {
        const res = await API.get("/account/statement");
        setTransactions(res.data || []);
      } catch (error) {
        setTransactions([]);
      }
    };

    getTransactions();
  }, []);

  return (
    <DashboardLayout title="Statement">
      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Date</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Type</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Amount</th>
              </tr>
            </thead>

            <tbody>
              {transactions.length > 0 ? (
                transactions.map((item) => (
                  <tr key={item.id} className="border-t border-slate-100">
                    <td className="px-6 py-4 text-slate-600">
                      {new Date(item.created_at).toLocaleDateString()}
                    </td>
                    <td
                      className={`px-6 py-4 font-semibold ${
                        item.transaction_type === "credit"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {item.transaction_type}
                    </td>
                    <td className="px-6 py-4 text-slate-700">
                      ₹{item.amount}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="px-6 py-12 text-center text-slate-500">
                    No transaction history found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}