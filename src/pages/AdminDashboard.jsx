// import { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import api from "../api/axios";
// import AdminNav from "../components/AdminNav";

// export default function AdminDashboard() {
//   const navigate = useNavigate();
//   const [stats, setStats] = useState(null);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const load = async () => {
//       try {
//         const res = await api.get("/admin/dashboard");
//         setStats(res.data);
//       } catch (err) {
//         setError(err.response?.data?.message || "Unable to load dashboard");
//         if (err.response?.status === 401) navigate("/admin/login");
//       }
//     };
//     load();
//   }, [navigate]);

//   return (
//     <div className="max-w-5xl mx-auto my-10 px-4">
//       <AdminNav />

//       <h2 className="text-2xl font-bold text-brand mb-6">Dashboard</h2>

//       {error && (
//         <div className="mb-4 bg-red-50 border border-red-200 text-red-700 text-sm rounded-md p-3">
//           {error}
//         </div>
//       )}

//       {stats && (
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           <StatCard label="Total Applications" value={stats.totalApplications} />
//           <StatCard label="Pending Signatures" value={stats.pendingSignatures} />
//           <StatCard label="Completed Signatures" value={stats.completedSignatures} />
//         </div>
//       )}

//       <div className="mt-8">
//         <Link
//           to="/admin/applications"
//           className="inline-block bg-brand hover:bg-brand-dark text-white font-medium px-5 py-2.5 rounded-md"
//         >
//           View All Applications
//         </Link>
//       </div>
//     </div>
//   );
// }

// function StatCard({ label, value }) {
//   return (
//     <div className="bg-white shadow rounded-lg p-6 text-center">
//       <p className="text-3xl font-bold text-brand">{value ?? "-"}</p>
//       <p className="text-sm text-gray-500 mt-1">{label}</p>
//     </div>
//   );
// }


import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";
import AdminNav from "../components/AdminNav";
import Button from "../components/ui/Button";
import { Alert } from "../components/ui/Field";

const statIcons = {
  total: (
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6M9 8h6M6 3.75h12A1.75 1.75 0 0 1 19.75 5.5v14a.75.75 0 0 1-1.14.64L15 18l-3.61 2.14a.75.75 0 0 1-.78 0L7 18l-3.61 2.14A.75.75 0 0 1 2.25 19.5v-14A1.75 1.75 0 0 1 4 3.75Z" />
  ),
  pending: (
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5v5l3 3M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
  ),
  completed: (
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
  ),
};

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

  const cards = [
    { key: "total", label: "Total applications", value: stats?.totalApplications, tone: "from-slate-800 to-slate-900", icon: statIcons.total },
    { key: "pending", label: "Pending signatures", value: stats?.pendingSignatures, tone: "from-amber-500 to-amber-600", icon: statIcons.pending },
    { key: "completed", label: "Completed signatures", value: stats?.completedSignatures, tone: "from-emerald-500 to-emerald-600", icon: statIcons.completed },
  ];

  return (
    <div className="max-w-6xl mx-auto py-10 px-4 sm:px-6">
      <AdminNav />

      <div className="mb-7">
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Dashboard</h2>
        <p className="text-sm text-slate-500 mt-1">An overview of customer applications and signature activity.</p>
      </div>

      {error && (
        <div className="mb-6">
          <Alert type="error">{error}</Alert>
        </div>
      )}

      {stats ? (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
          {cards.map((c) => (
            <div
              key={c.key}
              className="relative overflow-hidden bg-white rounded-2xl border border-slate-200/70 shadow-[0_1px_2px_rgba(15,23,42,0.04),0_12px_32px_-16px_rgba(15,23,42,0.12)] p-6"
            >
              <div className={`h-10 w-10 rounded-xl bg-gradient-to-br ${c.tone} text-white grid place-items-center mb-4 shadow-sm`}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5">
                  {c.icon}
                </svg>
              </div>
              <p className="text-3xl font-bold text-slate-900 tabular-nums">{c.value ?? "\u2013"}</p>
              <p className="text-sm text-slate-500 mt-1">{c.label}</p>
            </div>
          ))}
        </div>
      ) : (
        !error && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-32 rounded-2xl bg-white border border-slate-200/70 animate-pulse" />
            ))}
          </div>
        )
      )}

      <div className="mt-8 flex flex-col sm:flex-row gap-3">
        <Button as={Link} to="/admin/applications" size="lg">
          View all applications
        </Button>
        <Button as={Link} to="/admin/form" variant="secondary" size="lg">
          Create new application
        </Button>
      </div>
    </div>
  );
}