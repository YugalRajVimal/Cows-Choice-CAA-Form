import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";
import AdminNav from "../components/AdminNav";

const API_ORIGIN = (import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api").replace("/api", "");

const emptyRecipient = { name: "", email: "" };

export default function AdminApplicationView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [application, setApplication] = useState(null);
  const [signatureRequests, setSignatureRequests] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const [recipients, setRecipients] = useState([{ ...emptyRecipient }]);
  const [sending, setSending] = useState(false);
  const [requestMessage, setRequestMessage] = useState("");

  const load = async () => {
    try {
      const res = await api.get(`/admin/applications/${id}`);
      setApplication(res.data.application);
      setSignatureRequests(res.data.signatureRequests);
    } catch (err) {
      setError(err.response?.data?.message || "Unable to load application");
      if (err.response?.status === 401) navigate("/admin/login");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const updateRecipient = (index, field, value) => {
    setRecipients((prev) =>
      prev.map((r, i) => (i === index ? { ...r, [field]: value } : r))
    );
  };

  const addRecipient = () => {
    if (recipients.length >= 5) return;
    setRecipients((prev) => [...prev, { ...emptyRecipient }]);
  };

  const removeRecipient = (index) => {
    setRecipients((prev) => prev.filter((_, i) => i !== index));
  };

  const handleRequestSignatures = async (e) => {
    e.preventDefault();
    setError("");
    setRequestMessage("");

    const validRecipients = recipients.filter((r) => r.name && r.email);
    if (validRecipients.length === 0) {
      setError("Add at least one recipient with a name and email.");
      return;
    }

    setSending(true);
    try {
      await api.post(`/admin/applications/${id}/request-signatures`, {
        recipients: validRecipients,
      });
      setRequestMessage("Signature requests sent successfully.");
      setRecipients([{ ...emptyRecipient }]);
      load();
    } catch (err) {
      setError(err.response?.data?.message || "Unable to send signature requests");
    } finally {
      setSending(false);
    }
  };

  if (loading) return <div className="text-center mt-20 text-gray-500">Loading...</div>;
  if (!application) return <div className="text-center mt-20 text-red-600">{error}</div>;

  return (
    <div className="max-w-5xl mx-auto my-10 px-4 space-y-8">
      <AdminNav />

      <div className="bg-white shadow rounded-lg p-8 space-y-8">
        <header className="border-b pb-4">
          <h2 className="text-2xl font-bold text-brand">{application.customerDetails.companyName}</h2>
          <p className="text-sm text-gray-500 mt-1">
            Status: <span className="font-medium">{application.status.replace(/_/g, " ")}</span>
          </p>
        </header>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-md p-3">
            {error}
          </div>
        )}

        <SummarySection title="Requested By" data={application.requestedBy} />
        <SummarySection title="Customer Details" data={application.customerDetails} />
        <SummarySection title="Credit & Account Details" data={application.creditAccountDetails} />

        <section>
          <h3 className="text-lg font-semibold text-brand mb-3 border-b pb-2">Supporting Documents</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.entries(application.supportingDocuments || {}).map(([key, path]) =>
              path ? (
                <a
                  key={key}
                  href={`${API_ORIGIN}${path}`}
                  target="_blank"
                  rel="noreferrer"
                  className="border rounded-md p-3 text-center text-sm text-brand hover:bg-gray-50"
                >
                  {key.replace(/([A-Z])/g, " $1")}
                </a>
              ) : null
            )}
          </div>
        </section>

        <section>
          <h3 className="text-lg font-semibold text-brand mb-3 border-b pb-2">Google Verification</h3>
          {application.googleVerification ? (
            <p className="text-sm text-gray-700">
              {application.googleVerification.name} ({application.googleVerification.email})
            </p>
          ) : (
            <p className="text-sm text-gray-500">Not yet verified.</p>
          )}
        </section>

        <section>
          <h3 className="text-lg font-semibold text-brand mb-3 border-b pb-2">Customer Signature</h3>
          {application.customerSignature?.signatureImage ? (
            <div className="flex items-center gap-6">
              <img
                src={`${API_ORIGIN}${application.customerSignature.signatureImage}`}
                alt="Customer signature"
                className="h-24 border rounded-md bg-white p-2"
              />
              <div className="text-sm text-gray-600">
                <p>{application.customerSignature.authorisedSignatory}</p>
                <p>{application.customerSignature.position}</p>
                <p>{new Date(application.customerSignature.signedDate).toLocaleDateString("en-GB")}</p>
              </div>
            </div>
          ) : (
            <p className="text-sm text-gray-500">Not yet signed.</p>
          )}
        </section>

        <section>
          <h3 className="text-lg font-semibold text-brand mb-3 border-b pb-2">Additional Signatures</h3>
          {signatureRequests.length === 0 ? (
            <p className="text-sm text-gray-500">No additional signatures requested yet.</p>
          ) : (
            <div className="space-y-3">
              {signatureRequests.map((sr) => (
                <div key={sr._id} className="flex items-center justify-between border rounded-md p-3">
                  <div className="text-sm">
                    <p className="font-medium text-gray-800">
                      {sr.name} ({sr.email})
                    </p>
                    <p className="text-gray-500">
                      Status: {sr.status}
                      {sr.signedDate && ` - Signed ${new Date(sr.signedDate).toLocaleDateString("en-GB")}`}
                    </p>
                  </div>
                  {sr.signatureImage && (
                    <img
                      src={`${API_ORIGIN}${sr.signatureImage}`}
                      alt={`${sr.name} signature`}
                      className="h-14 border rounded-md bg-white p-1"
                    />
                  )}
                </div>
              ))}
            </div>
          )}
        </section>

        <section className="border-t pt-6">
          <h3 className="text-lg font-semibold text-brand mb-3">Request Additional Signatures (max 5)</h3>

          {requestMessage && (
            <div className="mb-4 bg-green-50 border border-green-200 text-green-700 text-sm rounded-md p-3">
              {requestMessage}
            </div>
          )}

          <form onSubmit={handleRequestSignatures} className="space-y-3">
            {recipients.map((r, index) => (
              <div key={index} className="flex gap-3 items-end">
                <div className="flex flex-col gap-1 flex-1">
                  <label className="text-xs font-medium text-gray-600">Name</label>
                  <input
                    value={r.name}
                    onChange={(e) => updateRecipient(index, "name", e.target.value)}
                    className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand"
                  />
                </div>
                <div className="flex flex-col gap-1 flex-1">
                  <label className="text-xs font-medium text-gray-600">Email</label>
                  <input
                    type="email"
                    value={r.email}
                    onChange={(e) => updateRecipient(index, "email", e.target.value)}
                    className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand"
                  />
                </div>
                {recipients.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeRecipient(index)}
                    className="text-sm text-red-500 hover:underline mb-2"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}

            <div className="flex items-center gap-4 pt-2">
              <button
                type="button"
                onClick={addRecipient}
                disabled={recipients.length >= 5}
                className="text-sm text-brand hover:underline disabled:text-gray-400"
              >
                + Add recipient
              </button>
              <span className="text-xs text-gray-400">{recipients.length}/5</span>
            </div>

            <button
              type="submit"
              disabled={sending}
              className="bg-brand hover:bg-brand-dark disabled:opacity-60 text-white font-medium px-6 py-2.5 rounded-md"
            >
              {sending ? "Sending..." : "Send Signature Requests"}
            </button>
          </form>
        </section>
      </div>
    </div>
  );
}

function SummarySection({ title, data }) {
  return (
    <section>
      <h3 className="text-lg font-semibold text-brand mb-3 border-b pb-2">{title}</h3>
      <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2 text-sm">
        {Object.entries(data || {}).map(([key, value]) =>
          value ? (
            <div key={key} className="flex justify-between border-b border-dashed pb-1">
              <dt className="text-gray-500">{key.replace(/([A-Z])/g, " $1")}</dt>
              <dd className="text-gray-800 font-medium text-right">{String(value)}</dd>
            </div>
          ) : null
        )}
      </dl>
    </section>
  );
}
