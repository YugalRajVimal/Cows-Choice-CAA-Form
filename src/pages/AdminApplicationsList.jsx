// import { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import api from "../api/axios";
// import AdminNav from "../components/AdminNav";

// const statusStyles = {
//   pending_signature: "bg-yellow-100 text-yellow-800",
//   signed: "bg-blue-100 text-blue-800",
//   additional_signatures_pending: "bg-orange-100 text-orange-800",
//   completed: "bg-green-100 text-green-800",
// };

// export default function AdminApplicationsList() {
//   const navigate = useNavigate();
//   const [applications, setApplications] = useState([]);
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const load = async () => {
//       try {
//         const res = await api.get("/admin/applications");
//         setApplications(res.data);
//       } catch (err) {
//         setError(err.response?.data?.message || "Unable to load applications");
//         if (err.response?.status === 401) navigate("/admin/login");
//       } finally {
//         setLoading(false);
//       }
//     };
//     load();
//   }, [navigate]);

//   return (
//     <div className="max-w-6xl mx-auto my-10 px-4">
//       <AdminNav />
//       <h2 className="text-2xl font-bold text-brand mb-6">Applications</h2>

//       {error && (
//         <div className="mb-4 bg-red-50 border border-red-200 text-red-700 text-sm rounded-md p-3">
//           {error}
//         </div>
//       )}

//       {loading ? (
//         <p className="text-gray-500">Loading...</p>
//       ) : (
//         <div className="bg-white shadow rounded-lg overflow-hidden">
//           <table className="w-full text-sm">
//             <thead className="bg-gray-50 text-left text-gray-600">
//               <tr>
//                 <th className="px-4 py-3">Company</th>
//                 <th className="px-4 py-3">Requested By</th>
//                 <th className="px-4 py-3">Submitted</th>
//                 <th className="px-4 py-3">Status</th>
//                 <th className="px-4 py-3"></th>
//               </tr>
//             </thead>
//             <tbody>
//               {applications.map((app) => (
//                 <tr key={app._id} className="border-t">
//                   <td className="px-4 py-3 font-medium text-gray-800">
//                     {app.customerDetails?.companyName}
//                   </td>
//                   <td className="px-4 py-3 text-gray-600">{app.requestedBy?.clientName}</td>
//                   <td className="px-4 py-3 text-gray-600">
//                     {new Date(app.createdAt).toLocaleDateString("en-GB")}
//                   </td>
//                   <td className="px-4 py-3">
//                     <span
//                       className={`px-2 py-1 rounded-full text-xs font-medium ${statusStyles[app.status] || "bg-gray-100 text-gray-700"}`}
//                     >
//                       {app.status.replace(/_/g, " ")}
//                     </span>
//                   </td>
//                   <td className="px-4 py-3 text-right">
//                     <Link to={`/admin/applications/${app._id}`} className="text-brand hover:underline">
//                       View
//                     </Link>
//                   </td>
//                 </tr>
//               ))}
//               {applications.length === 0 && (
//                 <tr>
//                   <td colSpan={5} className="px-4 py-6 text-center text-gray-500">
//                     No applications yet.
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// }


import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";
import AdminNav from "../components/AdminNav";
import { Alert, Badge } from "../components/ui/Field";

const statusTone = {
  pending_signature: "yellow",
  signed: "blue",
  additional_signatures_pending: "orange",
  completed: "green",
};

export default function AdminApplicationsList() {
  const navigate = useNavigate();
  const [applications, setApplications] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await api.get("/admin/applications");
        setApplications(res.data);
      } catch (err) {
        setError(err.response?.data?.message || "Unable to load applications");
        if (err.response?.status === 401) navigate("/admin/login");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [navigate]);

  return (
    <div className="max-w-6xl mx-auto py-10 px-4 sm:px-6">
      <AdminNav />

      <div className="mb-6 flex items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Applications</h2>
          <p className="text-sm text-slate-500 mt-1">
            {loading ? "Loading applications\u2026" : `${applications.length} application${applications.length === 1 ? "" : "s"} on file`}
          </p>
        </div>
      </div>

      {error && (
        <div className="mb-5">
          <Alert type="error">{error}</Alert>
        </div>
      )}

      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-16 rounded-xl bg-white border border-slate-200/70 animate-pulse" />
          ))}
        </div>
      ) : applications.length === 0 ? (
        <div className="bg-white border border-dashed border-slate-200 rounded-2xl p-14 text-center">
          <div className="h-12 w-12 rounded-full bg-slate-100 text-slate-400 grid place-items-center mx-auto mb-4">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-6 w-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6M9 8h6M6 3.75h12A1.75 1.75 0 0 1 19.75 5.5v14a.75.75 0 0 1-1.14.64L15 18l-3.61 2.14a.75.75 0 0 1-.78 0L7 18l-3.61 2.14A.75.75 0 0 1 2.25 19.5v-14A1.75 1.75 0 0 1 4 3.75Z" />
            </svg>
          </div>
          <p className="font-semibold text-slate-700">No applications yet</p>
          <p className="text-sm text-slate-500 mt-1">New customer applications will appear here once submitted.</p>
        </div>
      ) : (
        <>
          {/* Desktop table */}
          <div className="hidden md:block bg-white shadow-[0_1px_2px_rgba(15,23,42,0.04),0_12px_32px_-16px_rgba(15,23,42,0.12)] border border-slate-200/70 rounded-2xl overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-slate-50/80 text-left text-slate-500 border-b border-slate-100">
                <tr>
                  <th className="px-5 py-3.5 font-semibold text-xs uppercase tracking-wide">Company</th>
                  <th className="px-5 py-3.5 font-semibold text-xs uppercase tracking-wide">Requested by</th>
                  <th className="px-5 py-3.5 font-semibold text-xs uppercase tracking-wide">Submitted</th>
                  <th className="px-5 py-3.5 font-semibold text-xs uppercase tracking-wide">Status</th>
                  <th className="px-5 py-3.5"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {applications.map((app) => (
                  <tr key={app._id} className="hover:bg-slate-50/60 transition">
                    <td className="px-5 py-4 font-semibold text-slate-800">{app.customerDetails?.companyName}</td>
                    <td className="px-5 py-4 text-slate-500">{app.requestedBy?.clientName}</td>
                    <td className="px-5 py-4 text-slate-500">{new Date(app.createdAt).toLocaleDateString("en-GB")}</td>
                    <td className="px-5 py-4">
                      <Badge tone={statusTone[app.status] || "slate"}>{app.status.replace(/_/g, " ")}</Badge>
                    </td>
                    <td className="px-5 py-4 text-right">
                      <Link
                        to={`/admin/applications/${app._id}`}
                        className="inline-flex items-center gap-1 text-brand font-semibold hover:text-brand-dark transition"
                      >
                        View
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-3.5 w-3.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                        </svg>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="md:hidden space-y-3">
            {applications.map((app) => (
              <Link
                key={app._id}
                to={`/admin/applications/${app._id}`}
                className="block bg-white border border-slate-200/70 rounded-2xl p-4 shadow-sm active:scale-[0.99] transition"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="font-semibold text-slate-800 truncate">{app.customerDetails?.companyName}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{app.requestedBy?.clientName}</p>
                  </div>
                  <Badge tone={statusTone[app.status] || "slate"}>{app.status.replace(/_/g, " ")}</Badge>
                </div>
                <p className="text-xs text-slate-400 mt-3">
                  Submitted {new Date(app.createdAt).toLocaleDateString("en-GB")}
                </p>
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  );
}