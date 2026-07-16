import { Link, useNavigate } from "react-router-dom";

export default function AdminNav() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  };

  return (
    <nav className="flex items-center justify-between mb-8 bg-white shadow rounded-lg px-5 py-3">
      <div className="flex items-center gap-6">
        <Link to="/admin/dashboard" className="font-bold text-brand">
          Cows Choice Admin
        </Link>
        <Link to="/admin/dashboard" className="text-sm text-gray-600 hover:text-brand">
          Dashboard
        </Link>
        <Link to="/admin/applications" className="text-sm text-gray-600 hover:text-brand">
          Applications
        </Link>
      </div>
      <button onClick={handleLogout} className="text-sm text-gray-600 hover:text-red-600">
        Logout
      </button>
    </nav>
  );
}
