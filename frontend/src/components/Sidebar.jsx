import { Link, useLocation, useNavigate } from "react-router-dom";
import { LogOut, LayoutDashboard, Send, ReceiptText, Wallet2, X } from "lucide-react";

export default function Sidebar({ isOpen, setIsOpen }) {
  const navigate = useNavigate();
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem("user"));
  const closeSidebar = () => {
    setIsOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsOpen(false);
    navigate("/");
  };

  const navItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <LayoutDashboard size={18} />,
    },
    {
      name: "Send Money",
      path: "/send",
      icon: <Send size={18} />,
    },
    {
      name: "Statement",
      path: "/statement",
      icon: <ReceiptText size={18} />,
    },
  ];

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={closeSidebar}
        />
      )}

      <aside
        className={`fixed top-0 left-0 z-50 h-screen w-[280px] bg-[#03163a] text-white flex flex-col justify-between border-r border-white/10 transform transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0`}
      >
        <div>
          <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-2xl bg-blue-500 flex items-center justify-center shadow-lg">
                <Wallet2 size={22} />
              </div>
              <h1 className="text-3xl font-bold">PayFlow</h1>
            </div>

            <button
              onClick={closeSidebar}
              className="md:hidden rounded-lg p-2 hover:bg-white/10"
            >
              <X size={20} />
            </button>
          </div>

          <nav className="px-4 py-6 space-y-2">
            {navItems.map((item) => {
              const active = location.pathname === item.path;

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={closeSidebar}
                  className={`flex items-center gap-3 rounded-2xl px-4 py-4 text-lg font-medium transition-all
                  ${
                    active
                      ? "bg-[#102b63] text-blue-400"
                      : "text-slate-300 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <span>{item.icon}</span>
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="border-t border-white/10 p-5">
          <p className="mb-4 truncate text-base text-slate-400">
            {user?.email || "User"}
          </p>

          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-2xl px-4 py-4 text-lg text-slate-300 transition hover:bg-white/5 hover:text-white"
          >
            <LogOut size={18} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>
    </>
  );
}