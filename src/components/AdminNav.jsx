// import { Link, useNavigate } from "react-router-dom";

// export default function AdminNav() {
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     localStorage.removeItem("adminToken");
//     navigate("/admin/login");
//   };

//   return (
//     <nav className="flex items-center justify-between mb-8 bg-white shadow rounded-lg px-5 py-3">
//       <div className="flex items-center gap-6">
//         <Link to="/admin/dashboard" className="font-bold text-brand">
//           Cows Choice Admin
//         </Link>
//         <Link to="/admin/dashboard" className="text-sm text-gray-600 hover:text-brand">
//           Dashboard
//         </Link>
//         <Link to="/admin/applications" className="text-sm text-gray-600 hover:text-brand">
//           Applications
//         </Link>
//         <Link to="/admin/form" className="text-sm text-gray-600 hover:text-brand">
//           Create Form
//         </Link>
 
//       </div>
//       <button onClick={handleLogout} className="text-sm text-gray-600 hover:text-red-600">
//         Logout
//       </button>
//     </nav>
//   );
// }


import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const links = [
  { to: "/admin/dashboard", label: "Dashboard" },
  { to: "/admin/applications", label: "Applications" },
  { to: "/admin/form", label: "Create Form" },
];

export default function AdminNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  };

  return (
    <nav className="mb-8 bg-white/90 backdrop-blur border border-slate-200/70 shadow-sm rounded-2xl px-4 sm:px-5 py-3">
      <div className="flex items-center justify-between">
        <Link to="/admin/dashboard" className="flex items-center gap-2.5">
          <img
            src="/logo.png"
            alt="Cows Choice Logo"
            className="h-12 w-12 rounded-lg shadow-sm object-cover bg-white"
            style={{ backgroundColor: "white" }}
          />
    
          <span className="font-bold text-slate-900 tracking-tight">
            Cows Choice <span className="text-slate-400 font-medium">Admin</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-1">
          {links.map((l) => {
            const active = location.pathname === l.to;
            return (
              <Link
                key={l.to}
                to={l.to}
                className={`px-3.5 py-2 rounded-lg text-sm font-medium transition ${
                  active ? "bg-brand/10 text-brand" : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                }`}
              >
                {l.label}
              </Link>
            );
          })}
          <button
            onClick={handleLogout}
            className="ml-2 px-3.5 py-2 rounded-lg text-sm font-medium text-slate-500 hover:text-red-600 hover:bg-red-50 transition"
          >
            Logout
          </button>
        </div>

        <button
          onClick={() => setMenuOpen((v) => !v)}
          className="md:hidden h-9 w-9 grid place-items-center rounded-lg border border-slate-200 text-slate-600"
          aria-label="Toggle menu"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5">
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M18 6 6 18" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 7h16M4 12h16M4 17h16" />
            )}
          </svg>
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden mt-3 pt-3 border-t border-slate-100 flex flex-col gap-1">
          {links.map((l) => {
            const active = location.pathname === l.to;
            return (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setMenuOpen(false)}
                className={`px-3.5 py-2.5 rounded-lg text-sm font-medium transition ${
                  active ? "bg-brand/10 text-brand" : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                {l.label}
              </Link>
            );
          })}
          <button
            onClick={handleLogout}
            className="text-left px-3.5 py-2.5 rounded-lg text-sm font-medium text-slate-500 hover:text-red-600 hover:bg-red-50"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}