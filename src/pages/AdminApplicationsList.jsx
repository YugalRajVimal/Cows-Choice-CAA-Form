import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";
import AdminNav from "../components/AdminNav";

const statusStyles = {
  pending_signature: "bg-yellow-100 text-yellow-800",
  signed: "bg-blue-100 text-blue-800",
  additional_signatures_pending: "bg-orange-100 text-orange-800",
  completed: "bg-green-100 text-green-800",
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
    <div className="max-w-6xl mx-auto my-10 px-4">
      <AdminNav />
      <h2 className="text-2xl font-bold text-brand mb-6">Applications</h2>

      {error && (
        <div className="mb-4 bg-red-50 border border-red-200 text-red-700 text-sm rounded-md p-3">
          {error}
        </div>
      )}

      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : (
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-left text-gray-600">
              <tr>
                <th className="px-4 py-3">Company</th>
                <th className="px-4 py-3">Requested By</th>
                <th className="px-4 py-3">Submitted</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {applications.map((app) => (
                <tr key={app._id} className="border-t">
                  <td className="px-4 py-3 font-medium text-gray-800">
                    {app.customerDetails?.companyName}
                  </td>
                  <td className="px-4 py-3 text-gray-600">{app.requestedBy?.clientName}</td>
                  <td className="px-4 py-3 text-gray-600">
                    {new Date(app.createdAt).toLocaleDateString("en-GB")}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${statusStyles[app.status] || "bg-gray-100 text-gray-700"}`}
                    >
                      {app.status.replace(/_/g, " ")}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Link to={`/admin/applications/${app._id}`} className="text-brand hover:underline">
                      View
                    </Link>
                  </td>
                </tr>
              ))}
              {applications.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-4 py-6 text-center text-gray-500">
                    No applications yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
