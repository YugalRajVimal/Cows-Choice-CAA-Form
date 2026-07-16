import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import api from "../api/axios";
import SignaturePad from "../components/SignaturePad";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

export default function SigningPage() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const verificationToken = searchParams.get("verificationToken");

  const [application, setApplication] = useState(null);
  const [verification, setVerification] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const [authorisedSignatory, setAuthorisedSignatory] = useState("");
  const [position, setPosition] = useState("");
  const [signatureDataUrl, setSignatureDataUrl] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const appRes = await api.get(`/applications/${id}`);
        setApplication(appRes.data);

        if (verificationToken) {
          const verifyRes = await api.get(`/auth/verification/${verificationToken}`);
          setVerification(verifyRes.data);
        }
      } catch (err) {
        setError(err.response?.data?.message || "Unable to load application.");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id, verificationToken]);

  const startGoogleVerification = () => {
    window.location.href = `${API_BASE}/auth/google/customer_application/${id}`;
  };

  const handleSign = async (e) => {
    e.preventDefault();
    setError("");

    if (!signatureDataUrl) {
      setError("Please draw your signature before submitting.");
      return;
    }

    setSubmitting(true);
    try {
      await api.post(`/applications/${id}/sign`, {
        authorisedSignatory,
        position,
        signatureDataUrl,
        verificationToken,
      });
      setSuccess(true);
    } catch (err) {
      setError(err.response?.data?.message || "Unable to submit signature.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div className="text-center mt-20 text-gray-500">Loading application...</div>;
  }

  if (!application) {
    return <div className="text-center mt-20 text-red-600">{error || "Application not found."}</div>;
  }

  if (success) {
    return (
      <div className="max-w-2xl mx-auto mt-16 bg-white shadow rounded-lg p-8 text-center">
        <h2 className="text-2xl font-semibold text-brand mb-3">Thank you</h2>
        <p className="text-gray-600">Your application has been signed and submitted successfully.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto my-10 bg-white shadow rounded-lg p-8 space-y-8">
      <header className="border-b pb-6 text-center">
        <h1 className="text-2xl font-bold text-brand">COWS CHOICE LIMITED</h1>
        <h2 className="text-lg font-semibold text-gray-700 mt-1">Review &amp; Sign Application</h2>
      </header>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-md p-3">
          {error}
        </div>
      )}

      <SummarySection title="Requested By" data={application.requestedBy} />
      <SummarySection title="Customer Details" data={application.customerDetails} />
      <SummarySection title="Credit & Account Details" data={application.creditAccountDetails} />

      {!verification ? (
        <div className="text-center border rounded-md p-6 bg-gray-50">
          <p className="text-gray-600 mb-4">
            Please verify your identity with Google before signing this application.
          </p>
          <button
            onClick={startGoogleVerification}
            className="bg-brand hover:bg-brand-dark text-white font-medium px-6 py-3 rounded-md"
          >
            Verify with Google
          </button>
        </div>
      ) : (
        <form onSubmit={handleSign} className="space-y-4 border-t pt-6">
          <h3 className="text-lg font-semibold text-brand">Customer Signature</h3>
          <p className="text-sm text-gray-500">
            Verified as <span className="font-medium">{verification.name}</span> ({verification.email})
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-700">Authorised Signatory *</label>
              <input
                required
                value={authorisedSignatory}
                onChange={(e) => setAuthorisedSignatory(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-700">Position *</label>
              <input
                required
                value={position}
                onChange={(e) => setPosition(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">Signature *</label>
            <SignaturePad onChange={setSignatureDataUrl} />
          </div>

          <p className="text-sm text-gray-500">Date: {new Date().toLocaleDateString("en-GB")}</p>

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-brand hover:bg-brand-dark disabled:opacity-60 text-white font-semibold py-3 rounded-md transition"
          >
            {submitting ? "Submitting..." : "Submit Signature"}
          </button>
        </form>
      )}
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
              <dt className="text-gray-500 capitalize">{formatLabel(key)}</dt>
              <dd className="text-gray-800 font-medium text-right">{String(value)}</dd>
            </div>
          ) : null
        )}
      </dl>
    </section>
  );
}

function formatLabel(key) {
  return key.replace(/([A-Z])/g, " $1").replace(/^./, (s) => s.toUpperCase());
}
