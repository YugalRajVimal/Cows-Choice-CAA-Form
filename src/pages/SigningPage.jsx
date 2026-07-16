// import { useEffect, useState } from "react";
// import { useParams, useSearchParams } from "react-router-dom";
// import api from "../api/axios";
// import SignaturePad from "../components/SignaturePad";

// const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

// export default function SigningPage() {
//   const { id } = useParams();
//   const [searchParams] = useSearchParams();
//   const verificationToken = searchParams.get("verificationToken");

//   const [application, setApplication] = useState(null);
//   const [verification, setVerification] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [submitting, setSubmitting] = useState(false);
//   const [success, setSuccess] = useState(false);

//   const [authorisedSignatory, setAuthorisedSignatory] = useState("");
//   const [position, setPosition] = useState("");
//   const [signatureDataUrl, setSignatureDataUrl] = useState(null);

//   useEffect(() => {
//     const load = async () => {
//       try {
//         const appRes = await api.get(`/applications/${id}`);
//         setApplication(appRes.data);

//         if (verificationToken) {
//           const verifyRes = await api.get(`/auth/verification/${verificationToken}`);
//           setVerification(verifyRes.data);
//         }
//       } catch (err) {
//         setError(err.response?.data?.message || "Unable to load application.");
//       } finally {
//         setLoading(false);
//       }
//     };
//     load();
//   }, [id, verificationToken]);

//   const startGoogleVerification = () => {
//     window.location.href = `${API_BASE}/auth/google/customer_application/${id}`;
//   };

//   const handleSign = async (e) => {
//     e.preventDefault();
//     setError("");

//     if (!signatureDataUrl) {
//       setError("Please draw your signature before submitting.");
//       return;
//     }

//     setSubmitting(true);
//     try {
//       await api.post(`/applications/${id}/sign`, {
//         authorisedSignatory,
//         position,
//         signatureDataUrl,
//         verificationToken,
//       });
//       setSuccess(true);
//     } catch (err) {
//       setError(err.response?.data?.message || "Unable to submit signature.");
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   if (loading) {
//     return <div className="text-center mt-20 text-gray-500">Loading application...</div>;
//   }

//   if (!application) {
//     return <div className="text-center mt-20 text-red-600">{error || "Application not found."}</div>;
//   }

//   if (success) {
//     return (
//       <div className="max-w-2xl mx-auto mt-16 bg-white shadow rounded-lg p-8 text-center">
//         <h2 className="text-2xl font-semibold text-brand mb-3">Thank you</h2>
//         <p className="text-gray-600">Your application has been signed and submitted successfully.</p>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-4xl mx-auto py-10  bg-white shadow rounded-lg p-8 space-y-8">
//       <header className="border-b pb-6 text-center">
//         <h1 className="text-2xl font-bold text-brand">COWS CHOICE LIMITED</h1>
//         <h2 className="text-lg font-semibold text-gray-700 mt-1">Review &amp; Sign Application</h2>
//       </header>

//       {error && (
//         <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-md p-3">
//           {error}
//         </div>
//       )}

//       <SummarySection title="Requested By" data={application.requestedBy} />
//       <SummarySection title="Customer Details" data={application.customerDetails} />
//       <SummarySection title="Credit & Account Details" data={application.creditAccountDetails} />

//       {!verification ? (
//         <div className="text-center border rounded-md p-6 bg-gray-50">
//           <p className="text-gray-600 mb-4">
//             Please verify your identity with Google before signing this application.
//           </p>
//           <button
//             onClick={startGoogleVerification}
//             className="bg-brand hover:bg-brand-dark text-white font-medium px-6 py-3 rounded-md"
//           >
//             Verify with Google
//           </button>
//         </div>
//       ) : (
//         <form onSubmit={handleSign} className="space-y-4 border-t pt-6">
//           <h3 className="text-lg font-semibold text-brand">Customer Signature</h3>
//           <p className="text-sm text-gray-500">
//             Verified as <span className="font-medium">{verification.name}</span> ({verification.email})
//           </p>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div className="flex flex-col gap-1">
//               <label className="text-sm font-medium text-gray-700">Authorised Signatory *</label>
//               <input
//                 required
//                 value={authorisedSignatory}
//                 onChange={(e) => setAuthorisedSignatory(e.target.value)}
//                 className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand"
//               />
//             </div>
//             <div className="flex flex-col gap-1">
//               <label className="text-sm font-medium text-gray-700">Position *</label>
//               <input
//                 required
//                 value={position}
//                 onChange={(e) => setPosition(e.target.value)}
//                 className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand"
//               />
//             </div>
//           </div>

//           <div>
//             <label className="text-sm font-medium text-gray-700 mb-1 block">Signature *</label>
//             <SignaturePad onChange={setSignatureDataUrl} />
//           </div>

//           <p className="text-sm text-gray-500">Date: {new Date().toLocaleDateString("en-GB")}</p>

//           <button
//             type="submit"
//             disabled={submitting}
//             className="w-full bg-brand hover:bg-brand-dark disabled:opacity-60 text-white font-semibold py-3 rounded-md transition"
//           >
//             {submitting ? "Submitting..." : "Submit Signature"}
//           </button>
//         </form>
//       )}
//     </div>
//   );
// }

// function SummarySection({ title, data }) {
//   return (
//     <section>
//       <h3 className="text-lg font-semibold text-brand mb-3 border-b pb-2">{title}</h3>
//       <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2 text-sm">
//         {Object.entries(data || {}).map(([key, value]) =>
//           value ? (
//             <div key={key} className="flex justify-between border-b border-dashed pb-1">
//               <dt className="text-gray-500 capitalize">{formatLabel(key)}</dt>
//               <dd className="text-gray-800 font-medium text-right">{String(value)}</dd>
//             </div>
//           ) : null
//         )}
//       </dl>
//     </section>
//   );
// }

// function formatLabel(key) {
//   return key.replace(/([A-Z])/g, " $1").replace(/^./, (s) => s.toUpperCase());
// }


import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import api from "../api/axios";
import SignaturePad from "../components/SignaturePad";
import Button from "../components/ui/Button";
import { Alert, TextInput } from "../components/ui/Field";

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
    return (
      <div className="min-h-screen bg-slate-50 grid place-items-center px-4">
        <div className="flex flex-col items-center gap-3 text-slate-400">
          <svg className="animate-spin h-8 w-8 text-brand" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-20" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
            <path className="opacity-90" d="M22 12a10 10 0 0 0-10-10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
          </svg>
          <p className="text-sm">Loading application&hellip;</p>
        </div>
      </div>
    );
  }

  if (!application) {
    return (
      <div className="min-h-screen bg-slate-50 grid place-items-center px-4">
        <div className="max-w-md w-full">
          <Alert type="error">{error || "Application not found."}</Alert>
        </div>
      </div>
    );
  }

  if (success) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-16">
        <div className="max-w-lg w-full bg-white shadow-[0_1px_2px_rgba(15,23,42,0.04),0_24px_48px_-24px_rgba(15,23,42,0.18)] border border-slate-200/70 rounded-2xl p-10 text-center">
          <div className="h-14 w-14 rounded-full bg-emerald-100 text-emerald-600 grid place-items-center mx-auto mb-5">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-7 w-7">
              <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-slate-900">Thank you</h2>
          <p className="text-slate-500 mt-2.5">Your application has been signed and submitted successfully.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto bg-white shadow-[0_1px_2px_rgba(15,23,42,0.04),0_24px_48px_-24px_rgba(15,23,42,0.15)] border border-slate-200/70 rounded-2xl overflow-hidden">
        <header className="bg-gradient-to-br from-brand to-brand-dark text-white px-6 sm:px-10 py-9 text-center">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">COWS CHOICE LIMITED</h1>
          <h2 className="text-base sm:text-lg font-medium text-white/90 mt-2">Review &amp; Sign Application</h2>
        </header>

        <div className="p-6 sm:p-10 space-y-8">
          {error && <Alert type="error">{error}</Alert>}

          <SummarySection title="Requested by" data={application.requestedBy} />
          <SummarySection title="Customer details" data={application.customerDetails} />
          <SummarySection title="Credit & account details" data={application.creditAccountDetails} />

          {!verification ? (
            <div className="text-center border border-dashed border-slate-200 rounded-2xl p-8 bg-slate-50">
              <div className="h-11 w-11 rounded-full bg-brand/10 text-brand grid place-items-center mx-auto mb-4">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 9h10.5a2.25 2.25 0 0 0 2.25-2.25v-6a2.25 2.25 0 0 0-2.25-2.25H6.75A2.25 2.25 0 0 0 4.5 11.25v6a2.25 2.25 0 0 0 2.25 2.25Z" />
                </svg>
              </div>
              <p className="text-slate-600 mb-5">Please verify your identity with Google before signing this application.</p>
              <Button onClick={startGoogleVerification} size="lg">
                Verify with Google
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSign} className="space-y-5 border-t border-slate-100 pt-7">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Customer signature</h3>
                <p className="text-sm text-slate-500 mt-1">
                  Verified as <span className="font-semibold text-slate-700">{verification.name}</span> ({verification.email})
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <TextInput
                  label="Authorised Signatory"
                  required
                  value={authorisedSignatory}
                  onChange={(e) => setAuthorisedSignatory(e.target.value)}
                />
                <TextInput label="Position" required value={position} onChange={(e) => setPosition(e.target.value)} />
              </div>

              <div>
                <label className="text-[13px] font-semibold text-slate-700 mb-1.5 block">
                  Signature <span className="text-brand">*</span>
                </label>
                <SignaturePad onChange={setSignatureDataUrl} />
              </div>

              <p className="text-sm text-slate-400">Date: {new Date().toLocaleDateString("en-GB")}</p>

              <Button type="submit" loading={submitting} loadingText="Submitting..." size="lg" className="w-full">
                Submit Signature
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

function SummarySection({ title, data }) {
  const entries = Object.entries(data || {}).filter(([, v]) => v);
  return (
    <section>
      <h3 className="text-base font-bold text-slate-900 mb-3 border-b border-slate-100 pb-2">{title}</h3>
      <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2.5 text-sm">
        {entries.map(([key, value]) => (
          <div key={key} className="flex justify-between gap-4 border-b border-dashed border-slate-100 pb-2">
            <dt className="text-slate-500 capitalize">{formatLabel(key)}</dt>
            <dd className="text-slate-800 font-medium text-right">{String(value)}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

function formatLabel(key) {
  return key.replace(/([A-Z])/g, " $1").replace(/^./, (s) => s.toUpperCase());
}