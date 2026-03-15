import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import DashboardLayout from "../layout/DashboardLyout";
import API from "../services/api";

export default function SendMoney() {

  const [users, setUsers] = useState([]);
  const [receiverId, setReceiverId] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {

    const getUsers = async () => {
      try {
        const res = await API.get("/account/users");
        setUsers(res.data || []);
      } catch {
        setUsers([]);
      }
    };

    getUsers();

  }, []);

  const handleSendMoney = async (e) => {

    e.preventDefault();

    if (!receiverId) {
      toast.error("Please select a user");
      return;
    }

    if (!amount || Number(amount) <= 0) {
      toast.error("Enter a valid amount");
      return;
    }

    try {

      setLoading(true);

      await API.post("/account/transfer", {
        receiverId,
        amount: Number(amount)
      });

      toast.success("Transfer successful");

      setReceiverId("");
      setAmount("");

    } catch (error) {

      toast.error(error.response?.data?.message || "Transfer failed");

    } finally {

      setLoading(false);

    }

  };

  return (

    <DashboardLayout>

      <div className="mt-10">

        {/* Centered Page Heading */}

        <h1 className="text-3xl font-bold text-center text-[#071a3c] mb-8">
          Send Money
        </h1>

        {/* Centered Card */}

        <div className="max-w-xl mx-auto">

          <div className="rounded-3xl border border-slate-300 bg-white p-8 shadow-sm">

            <h2 className="text-lg font-semibold text-[#071a3c] mb-6">
              Transfer Funds
            </h2>

            <form onSubmit={handleSendMoney} className="space-y-5">

              <div>

                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Select User
                </label>

                <select
                  value={receiverId}
                  onChange={(e) => setReceiverId(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
                >

                  <option value="">Choose a registered user</option>

                  {users.map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.name} ({user.email})
                    </option>
                  ))}

                </select>

              </div>

              <div>

                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Amount
                </label>

                <input
                  type="number"
                  min="1"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Enter amount"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
                />

              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-blue-500 px-5 py-4 text-lg font-semibold text-white transition hover:bg-blue-600 disabled:opacity-60"
              >

                {loading ? "Sending..." : "Send Money"}

              </button>

            </form>

          </div>

        </div>

      </div>

    </DashboardLayout>

  );

}