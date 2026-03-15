import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Send } from "lucide-react";
import API from "../services/api";
import DashboardLayout from "../layout/DashboardLyout";

export default function Dashboard() {
  const navigate = useNavigate();

  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(true);

  const [recent, setRecent] = useState([]);
  const [recentLoading, setRecentLoading] = useState(true);

  useEffect(() => {

    const getBalance = async () => {
      try {
        const res = await API.get("/account/balance");
        setBalance(res.data.balance || 0);
      } catch (error) {
        setBalance(0);
      } finally {
        setLoading(false);
      }
    };

    const getRecentTransactions = async () => {
      try {
        const res = await API.get("/account/statement");

        // show only latest 3
        setRecent(res.data.slice(0, 3));

      } catch (error) {
        setRecent([]);
      } finally {
        setRecentLoading(false);
      }
    };

    getBalance();
    getRecentTransactions();

  }, []);

  return (
    <DashboardLayout title="Dashboard">

      <div className="space-y-6">

        {/* Balance Card */}

        <section className="rounded-2xl bg-[#03163a] text-white shadow-lg px-6 py-8 sm:px-10 sm:py-10">

          <p className="text-xl font-semibold text-slate-300">
            Current Balance
          </p>

          <h2 className="mt-3 text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">

            ₹ {loading ? "Loading..." : Number(balance).toLocaleString("en-IN", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}

          </h2>

          <p className="mt-5 text-2xl text-slate-400">
            Welcome, user
          </p>

        </section>


        {/* Quick Transfer + Recent Activity */}

        <section className="grid grid-cols-1 xl:grid-cols-2 gap-6">

          {/* Quick Transfer */}

          <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">

            <h3 className="text-2xl font-bold text-[#071a3c]">
              Quick Transfer
            </h3>

            <p className="mt-6 text-lg text-slate-500">
              Send money to any registered user instantly.
            </p>

            <button
              onClick={() => navigate("/send")}
              className="mt-8 flex w-full items-center justify-center gap-3 rounded-xl bg-blue-500 px-5 py-4 text-xl font-semibold text-white transition hover:bg-blue-600"
            >
              <Send size={20} />
              Send Money
            </button>

          </div>


          {/* Recent Activity */}

          <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">

            <div className="flex items-center justify-between gap-3">

              <h3 className="text-2xl font-bold text-[#071a3c]">
                Recent Activity
              </h3>

              <button
                onClick={() => navigate("/statement")}
                className="text-lg font-medium text-blue-500 hover:text-blue-600"
              >
                View All
              </button>

            </div>

            <div className="mt-6 space-y-3">

              {recentLoading ? (

                <p className="text-xl text-slate-500">
                  Loading...
                </p>

              ) : recent.length === 0 ? (

                <p className="text-xl text-slate-500">
                  No transactions yet
                </p>

              ) : (

                recent.map((tx) => (

                  <div
                    key={tx.id}
                    className="flex items-center justify-between border-b pb-2"
                  >

                    <span
                      className={
                        tx.transaction_type === "credit"
                          ? "text-green-600 font-semibold"
                          : "text-red-600 font-semibold"
                      }
                    >
                      {tx.transaction_type.toUpperCase()}
                    </span>

                    <span className="text-slate-700 font-medium">
                      ₹ {tx.amount}
                    </span>

                  </div>

                ))

              )}

            </div>

          </div>

        </section>

      </div>

    </DashboardLayout>
  );
}