import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import api from "../api/axios";
import SignaturePad from "../components/SignaturePad";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

export default function SignatureRequestPage() {
  const { token } = useParams();
  const [searchParams] = useSearchParams();
  const verificationToken = searchParams.get("verificationToken");
  const accessDenied = searchParams.get("accessDenied");

  const [data, setData] = useState(null);
  const [verification, setVerification] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const [signatoryName, setSignatoryName] = useState("");
  const [position, setPosition] = useState("");
  const [signatureDataUrl, setSignatureDataUrl] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await api.get(`/signatures/${token}`);
        setData(res.data);
        setSignatoryName(res.data.signatureRequest.name);

        if (verificationToken) {
          const verifyRes = await api.get(`/auth/verification/${verificationToken}`);
          setVerification(verifyRes.data);
        }
      } catch (err) {
        setError(err.response?.data?.message || "Unable to load signature request.");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [token, verificationToken]);

  const startGoogleVerification = () => {
    window.location.href = `${API_BASE}/auth/google/signature_request/${token}`;
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
      await api.post(`/signatures/${token}/sign`, {
        signatoryName,
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
    return <div className="text-center mt-20 text-gray-500">Loading...</div>;
  }

  if (error && !data) {
    return <div className="text-center mt-20 text-red-600">{error}</div>;
  }

  if (success) {
    return (
      <div className="max-w-2xl mx-auto mt-16 bg-white shadow rounded-lg p-8 text-center">
        <h2 className="text-2xl font-semibold text-brand mb-3">Thank you</h2>
        <p className="text-gray-600">Your signature has been submitted successfully.</p>
      </div>
    );
  }

  const application = data.application;

  return (
    <div className="max-w-4xl mx-auto my-10 bg-white shadow rounded-lg p-8 space-y-8">
      <header className="border-b pb-6 text-center">
        <h1 className="text-2xl font-bold text-brand">COWS CHOICE LIMITED</h1>
        <h2 className="text-lg font-semibold text-gray-700 mt-1">Signature Request</h2>
        <p className="text-sm text-gray-500 mt-2">
          Company: {application.customerDetails.companyName}
        </p>
      </header>

      {accessDenied && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-md p-3">
          Access denied: the Google account you used does not match the email this request was sent
          to. Please sign in with the correct Google account.
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-md p-3">
          {error}
        </div>
      )}

      <SummarySection title="Customer Details" data={application.customerDetails} />

      {application.customerSignature?.signatureImage && (
        <section>
          <h3 className="text-lg font-semibold text-brand mb-3 border-b pb-2">Customer Signature</h3>
          <img
            src={`${API_BASE.replace("/api", "")}${application.customerSignature.signatureImage}`}
            alt="Customer signature"
            className="h-24 border rounded-md bg-white p-2"
          />
        </section>
      )}

      {!verification ? (
        <div className="text-center border rounded-md p-6 bg-gray-50">
          <p className="text-gray-600 mb-4">
            Please verify your identity with Google using the email address this request was sent to
            ({data.signatureRequest.email}) before signing.
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
          <h3 className="text-lg font-semibold text-brand">Your Signature</h3>
          <p className="text-sm text-gray-500">
            Verified as <span className="font-medium">{verification.name}</span> ({verification.email})
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-700">Signatory Name *</label>
              <input
                required
                value={signatoryName}
                onChange={(e) => setSignatoryName(e.target.value)}
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
              <dt className="text-gray-500 capitalize">{key.replace(/([A-Z])/g, " $1")}</dt>
              <dd className="text-gray-800 font-medium text-right">{String(value)}</dd>
            </div>
          ) : null
        )}
      </dl>
    </section>
  );
}
