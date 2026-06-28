import React from "react";
import {
  LayoutDashboard,
  ClipboardList,
  Users,
  Settings,
  Sparkles,
} from "lucide-react";

const Sidebar = () => {
  const menuItems = [
    {
      icon: <LayoutDashboard size={20} />,
      title: "Dashboard",
      active: true,
    },
    {
      icon: <ClipboardList size={20} />,
      title: "Tasks",
    },
    {
      icon: <Users size={20} />,
      title: "Employees",
    },
    {
      icon: <Settings size={20} />,
      title: "Settings",
    },
  ];

  return (
    <aside className="w-72 h-screen bg-white border-r border-purple-100 flex flex-col justify-between">

      {/* Logo */}
      <div>
        <div className="px-8 py-8 flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-violet-500 to-pink-400 flex items-center justify-center text-white">
            <Sparkles size={22} />
          </div>

          <div>
            <h1 className="font-bold text-2xl text-slate-800">
              Bloom EMS
            </h1>

            <p className="text-sm text-slate-500">
              ADMIN
            </p>
          </div>
        </div>

        {/* Menu */}
        <div className="px-5 mt-8">

          <p className="text-xs uppercase text-slate-400 mb-4 tracking-widest">
            Workspace
          </p>

          {menuItems.map((item, index) => (
            <button
              key={index}
              className={`w-full flex items-center gap-3 rounded-xl px-4 py-3 mb-3 transition-all duration-300

              ${
                item.active
                  ? "bg-gradient-to-r from-violet-100 to-pink-100 text-violet-700 shadow"
                  : "hover:bg-slate-100 text-slate-600"
              }`}
            >
              {item.icon}

              <span className="font-medium">
                {item.title}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Bottom Card */}
      <div className="p-5">
        <div className="rounded-2xl bg-gradient-to-r from-violet-100 to-pink-100 p-4 flex items-center gap-3">

          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-violet-500 to-pink-500 text-white flex items-center justify-center font-bold">
            A
          </div>

          <div>
            <h2 className="font-semibold text-slate-800">
              Admin
            </h2>

            <p className="text-sm text-slate-500">
              Administrator
            </p>
          </div>

        </div>
      </div>

    </aside>
  );
};

export default Sidebar;