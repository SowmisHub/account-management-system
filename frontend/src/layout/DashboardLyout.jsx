import { useState } from "react";
import { Menu } from "lucide-react";
import Sidebar from "../components/Sidebar";

export default function DashboardLayout({ title, children }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#f4f7fb]">
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

      <div className="md:ml-[280px] min-h-screen">
        <header className="sticky top-0 z-30 bg-[#f4f7fb]/95 backdrop-blur px-4 sm:px-6 lg:px-10 pt-4 sm:pt-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl sm:text-4xl font-bold text-[#071a3c]">
              {title}
            </h1>

            <button
              onClick={() => setIsOpen(true)}
              className="md:hidden inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white p-3 shadow-sm"
            >
              <Menu size={22} />
            </button>
          </div>
        </header>

        <main className="px-4 sm:px-6 lg:px-10 py-6 sm:py-8">
          {children}
        </main>
      </div>
    </div>
  );
}