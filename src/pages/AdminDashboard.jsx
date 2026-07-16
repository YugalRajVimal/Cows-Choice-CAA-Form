import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";
import AdminNav from "../components/AdminNav";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const res = await api.get("/admin/dashboard");
        setStats(res.data);
      } catch (err) {
        setError(err.response?.data?.message || "Unable to load dashboard");
        if (err.response?.status === 401) navigate("/admin/login");
      }
    };
    load();
  }, [navigate]);

  return (
    <div className="max-w-5xl mx-auto my-10 px-4">
      <AdminNav />

      <h2 className="text-2xl font-bold text-brand mb-6">Dashboard</h2>

      {error && (
        <div className="mb-4 bg-red-50 border border-red-200 text-red-700 text-sm rounded-md p-3">
          {error}
        </div>
      )}

      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard label="Total Applications" value={stats.totalApplications} />
          <StatCard label="Pending Signatures" value={stats.pendingSignatures} />
          <StatCard label="Completed Signatures" value={stats.completedSignatures} />
        </div>
      )}

      <div className="mt-8">
        <Link
          to="/admin/applications"
          className="inline-block bg-brand hover:bg-brand-dark text-white font-medium px-5 py-2.5 rounded-md"
        >
          View All Applications
        </Link>
      </div>
    </div>
  );
}

function StatCard({ label, value }) {
  return (
    <div className="bg-white shadow rounded-lg p-6 text-center">
      <p className="text-3xl font-bold text-brand">{value ?? "-"}</p>
      <p className="text-sm text-gray-500 mt-1">{label}</p>
    </div>
  );
}
