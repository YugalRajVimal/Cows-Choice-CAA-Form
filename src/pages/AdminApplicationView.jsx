// import { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import api from "../api/axios";
// import AdminNav from "../components/AdminNav";

// const API_ORIGIN = (import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api").replace("/api", "");

// const emptyRecipient = { name: "", email: "" };

// export default function AdminApplicationView() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [application, setApplication] = useState(null);
//   const [signatureRequests, setSignatureRequests] = useState([]);
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(true);

//   const [recipients, setRecipients] = useState([{ ...emptyRecipient }]);
//   const [sending, setSending] = useState(false);
//   const [requestMessage, setRequestMessage] = useState("");

//   const load = async () => {
//     try {
//       const res = await api.get(`/admin/applications/${id}`);
//       setApplication(res.data.application);
//       setSignatureRequests(res.data.signatureRequests);
//     } catch (err) {
//       setError(err.response?.data?.message || "Unable to load application");
//       if (err.response?.status === 401) navigate("/admin/login");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     load();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [id]);

//   const updateRecipient = (index, field, value) => {
//     setRecipients((prev) =>
//       prev.map((r, i) => (i === index ? { ...r, [field]: value } : r))
//     );
//   };

//   const addRecipient = () => {
//     if (recipients.length >= 5) return;
//     setRecipients((prev) => [...prev, { ...emptyRecipient }]);
//   };

//   const removeRecipient = (index) => {
//     setRecipients((prev) => prev.filter((_, i) => i !== index));
//   };

//   const handleRequestSignatures = async (e) => {
//     e.preventDefault();
//     setError("");
//     setRequestMessage("");

//     const validRecipients = recipients.filter((r) => r.name && r.email);
//     if (validRecipients.length === 0) {
//       setError("Add at least one recipient with a name and email.");
//       return;
//     }

//     setSending(true);
//     try {
//       await api.post(`/admin/applications/${id}/request-signatures`, {
//         recipients: validRecipients,
//       });
//       setRequestMessage("Signature requests sent successfully.");
//       setRecipients([{ ...emptyRecipient }]);
//       load();
//     } catch (err) {
//       setError(err.response?.data?.message || "Unable to send signature requests");
//     } finally {
//       setSending(false);
//     }
//   };

//   if (loading) return <div className="text-center mt-20 text-gray-500">Loading...</div>;
//   if (!application) return <div className="text-center mt-20 text-red-600">{error}</div>;

//   return (
//     <div className="max-w-5xl mx-auto my-10 px-4 space-y-8">
//       <AdminNav />

//       <div className="bg-white shadow rounded-lg p-8 space-y-8">
//         <header className="border-b pb-4">
//           <h2 className="text-2xl font-bold text-brand">{application.customerDetails.companyName}</h2>
//           <p className="text-sm text-gray-500 mt-1">
//             Status: <span className="font-medium">{application.status.replace(/_/g, " ")}</span>
//           </p>
//         </header>

//         {error && (
//           <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-md p-3">
//             {error}
//           </div>
//         )}

//         <SummarySection title="Requested By" data={application.requestedBy} />
//         <SummarySection title="Customer Details" data={application.customerDetails} />
//         <SummarySection title="Credit & Account Details" data={application.creditAccountDetails} />

//         <section>
//           <h3 className="text-lg font-semibold text-brand mb-3 border-b pb-2">Supporting Documents</h3>
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//             {Object.entries(application.supportingDocuments || {}).map(([key, path]) =>
//               path ? (
//                 <a
//                   key={key}
//                   href={`${API_ORIGIN}${path}`}
//                   target="_blank"
//                   rel="noreferrer"
//                   className="border rounded-md p-3 text-center text-sm text-brand hover:bg-gray-50"
//                 >
//                   {key.replace(/([A-Z])/g, " $1")}
//                 </a>
//               ) : null
//             )}
//           </div>
//         </section>

//         <section>
//           <h3 className="text-lg font-semibold text-brand mb-3 border-b pb-2">Google Verification</h3>
//           {application.googleVerification ? (
//             <p className="text-sm text-gray-700">
//               {application.googleVerification.name} ({application.googleVerification.email})
//             </p>
//           ) : (
//             <p className="text-sm text-gray-500">Not yet verified.</p>
//           )}
//         </section>

//         <section>
//           <h3 className="text-lg font-semibold text-brand mb-3 border-b pb-2">Customer Signature</h3>
//           {application.customerSignature?.signatureImage ? (
//             <div className="flex items-center gap-6">
//               <img
//                 src={`${API_ORIGIN}${application.customerSignature.signatureImage}`}
//                 alt="Customer signature"
//                 className="h-24 border rounded-md bg-white p-2"
//               />
//               <div className="text-sm text-gray-600">
//                 <p>{application.customerSignature.authorisedSignatory}</p>
//                 <p>{application.customerSignature.position}</p>
//                 <p>{new Date(application.customerSignature.signedDate).toLocaleDateString("en-GB")}</p>
//               </div>
//             </div>
//           ) : (
//             <p className="text-sm text-gray-500">Not yet signed.</p>
//           )}
//         </section>

//         <section>
//           <h3 className="text-lg font-semibold text-brand mb-3 border-b pb-2">Additional Signatures</h3>
//           {signatureRequests.length === 0 ? (
//             <p className="text-sm text-gray-500">No additional signatures requested yet.</p>
//           ) : (
//             <div className="space-y-3">
//               {signatureRequests.map((sr) => (
//                 <div key={sr._id} className="flex items-center justify-between border rounded-md p-3">
//                   <div className="text-sm">
//                     <p className="font-medium text-gray-800">
//                       {sr.name} ({sr.email})
//                     </p>
//                     <p className="text-gray-500">
//                       Status: {sr.status}
//                       {sr.signedDate && ` - Signed ${new Date(sr.signedDate).toLocaleDateString("en-GB")}`}
//                     </p>
//                   </div>
//                   {sr.signatureImage && (
//                     <img
//                       src={`${API_ORIGIN}${sr.signatureImage}`}
//                       alt={`${sr.name} signature`}
//                       className="h-14 border rounded-md bg-white p-1"
//                     />
//                   )}
//                 </div>
//               ))}
//             </div>
//           )}
//         </section>

//         <section className="border-t pt-6">
//           <h3 className="text-lg font-semibold text-brand mb-3">Request Additional Signatures (max 5)</h3>

//           {requestMessage && (
//             <div className="mb-4 bg-green-50 border border-green-200 text-green-700 text-sm rounded-md p-3">
//               {requestMessage}
//             </div>
//           )}

//           <form onSubmit={handleRequestSignatures} className="space-y-3">
//             {recipients.map((r, index) => (
//               <div key={index} className="flex gap-3 items-end">
//                 <div className="flex flex-col gap-1 flex-1">
//                   <label className="text-xs font-medium text-gray-600">Name</label>
//                   <input
//                     value={r.name}
//                     onChange={(e) => updateRecipient(index, "name", e.target.value)}
//                     className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand"
//                   />
//                 </div>
//                 <div className="flex flex-col gap-1 flex-1">
//                   <label className="text-xs font-medium text-gray-600">Email</label>
//                   <input
//                     type="email"
//                     value={r.email}
//                     onChange={(e) => updateRecipient(index, "email", e.target.value)}
//                     className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand"
//                   />
//                 </div>
//                 {recipients.length > 1 && (
//                   <button
//                     type="button"
//                     onClick={() => removeRecipient(index)}
//                     className="text-sm text-red-500 hover:underline mb-2"
//                   >
//                     Remove
//                   </button>
//                 )}
//               </div>
//             ))}

//             <div className="flex items-center gap-4 pt-2">
//               <button
//                 type="button"
//                 onClick={addRecipient}
//                 disabled={recipients.length >= 5}
//                 className="text-sm text-brand hover:underline disabled:text-gray-400"
//               >
//                 + Add recipient
//               </button>
//               <span className="text-xs text-gray-400">{recipients.length}/5</span>
//             </div>

//             <button
//               type="submit"
//               disabled={sending}
//               className="bg-brand hover:bg-brand-dark disabled:opacity-60 text-white font-medium px-6 py-2.5 rounded-md"
//             >
//               {sending ? "Sending..." : "Send Signature Requests"}
//             </button>
//           </form>
//         </section>
//       </div>
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
//               <dt className="text-gray-500">{key.replace(/([A-Z])/g, " $1")}</dt>
//               <dd className="text-gray-800 font-medium text-right">{String(value)}</dd>
//             </div>
//           ) : null
//         )}
//       </dl>
//     </section>
//   );
// }


import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";
import AdminNav from "../components/AdminNav";
import Button from "../components/ui/Button";
import { Alert, Badge, Card, SectionHeading, TextInput } from "../components/ui/Field";

const API_ORIGIN = (import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api").replace("/api", "");

const emptyRecipient = { name: "", email: "" };

const statusTone = {
  pending_signature: "yellow",
  signed: "blue",
  additional_signatures_pending: "orange",
  completed: "green",
};

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
    setRecipients((prev) => prev.map((r, i) => (i === index ? { ...r, [field]: value } : r)));
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
      await api.post(`/admin/applications/${id}/request-signatures`, { recipients: validRecipients });
      setRequestMessage("Signature requests sent successfully.");
      setRecipients([{ ...emptyRecipient }]);
      load();
    } catch (err) {
      setError(err.response?.data?.message || "Unable to send signature requests");
    } finally {
      setSending(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto my-10 px-4 space-y-4">
        <div className="h-16 rounded-2xl bg-white border border-slate-200/70 animate-pulse" />
        <div className="h-80 rounded-2xl bg-white border border-slate-200/70 animate-pulse" />
      </div>
    );
  }

  if (!application) {
    return (
      <div className="max-w-md mx-auto mt-24 px-4 text-center">
        <Alert type="error">{error || "Application not found."}</Alert>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-10 px-4 sm:px-6">
      <AdminNav />

      <Card className="p-6 sm:p-8">
        <header className="border-b border-slate-100 pb-5 mb-6 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              {application.customerDetails.companyName}
            </h2>
            <p className="text-sm text-slate-500 mt-1">Application #{id.slice(-6).toUpperCase()}</p>
          </div>
          <Badge tone={statusTone[application.status] || "slate"}>{application.status.replace(/_/g, " ")}</Badge>
        </header>

        {error && (
          <div className="mb-6">
            <Alert type="error">{error}</Alert>
          </div>
        )}

        <div className="space-y-8">
          <SummarySection title="Requested by" data={application.requestedBy} />
          <SummarySection title="Customer details" data={application.customerDetails} />
          <SummarySection title="Credit & account details" data={application.creditAccountDetails} />

          <section>
            <SectionHeading title="Supporting documents" />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {Object.entries(application.supportingDocuments || {}).map(([key, path]) =>
                path ? (
                  <a
                    key={key}
                    href={`${API_ORIGIN}${path}`}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex flex-col items-center gap-2 border border-slate-200 rounded-xl p-4 text-center hover:border-brand/50 hover:bg-brand/[0.03] transition"
                  >
                    <span className="h-9 w-9 rounded-lg bg-slate-100 text-slate-500 group-hover:bg-brand/10 group-hover:text-brand grid place-items-center transition">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-4.5 w-4.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6M9 8h6M6 3.75h12A1.75 1.75 0 0 1 19.75 5.5v14a.75.75 0 0 1-1.14.64L15 18l-3.61 2.14a.75.75 0 0 1-.78 0L7 18l-3.61 2.14A.75.75 0 0 1 2.25 19.5v-14A1.75 1.75 0 0 1 4 3.75Z" />
                      </svg>
                    </span>
                    <span className="text-xs font-medium text-slate-600 leading-snug">
                      {key.replace(/([A-Z])/g, " $1")}
                    </span>
                  </a>
                ) : null
              )}
            </div>
          </section>

          <section>
            <SectionHeading title="Google verification" />
            {application.googleVerification ? (
              <div className="flex items-center gap-2 text-sm text-slate-700">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4 text-emerald-500">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                </svg>
                {application.googleVerification.name} ({application.googleVerification.email})
              </div>
            ) : (
              <p className="text-sm text-slate-400">Not yet verified.</p>
            )}
          </section>

          <section>
            <SectionHeading title="Customer signature" />
            {application.customerSignature?.signatureImage ? (
              <div className="flex flex-wrap items-center gap-6 bg-slate-50 rounded-xl p-4 border border-slate-100">
                <img
                  src={`${API_ORIGIN}${application.customerSignature.signatureImage}`}
                  alt="Customer signature"
                  className="h-20 border border-slate-200 rounded-md bg-white p-2"
                />
                <div className="text-sm text-slate-600">
                  <p className="font-semibold text-slate-800">{application.customerSignature.authorisedSignatory}</p>
                  <p>{application.customerSignature.position}</p>
                  <p className="text-slate-400">{new Date(application.customerSignature.signedDate).toLocaleDateString("en-GB")}</p>
                </div>
              </div>
            ) : (
              <p className="text-sm text-slate-400">Not yet signed.</p>
            )}
          </section>

          <section>
            <SectionHeading title="Additional signatures" />
            {signatureRequests.length === 0 ? (
              <p className="text-sm text-slate-400">No additional signatures requested yet.</p>
            ) : (
              <div className="space-y-2.5">
                {signatureRequests.map((sr) => (
                  <div
                    key={sr._id}
                    className="flex flex-wrap items-center justify-between gap-3 border border-slate-100 bg-slate-50/60 rounded-xl p-3.5"
                  >
                    <div className="text-sm">
                      <p className="font-semibold text-slate-800">
                        {sr.name} <span className="font-normal text-slate-400">({sr.email})</span>
                      </p>
                      <p className="text-slate-500 mt-0.5">
                        Status: <span className="font-medium">{sr.status}</span>
                        {sr.signedDate && ` \u00b7 Signed ${new Date(sr.signedDate).toLocaleDateString("en-GB")}`}
                      </p>
                    </div>
                    {sr.signatureImage && (
                      <img
                        src={`${API_ORIGIN}${sr.signatureImage}`}
                        alt={`${sr.name} signature`}
                        className="h-12 border border-slate-200 rounded-md bg-white p-1"
                      />
                    )}
                  </div>
                ))}
              </div>
            )}
          </section>

          <section className="border-t border-slate-100 pt-7">
            <h3 className="text-lg font-bold text-slate-900 mb-1">Request additional signatures</h3>
            <p className="text-sm text-slate-500 mb-4">Add up to 5 recipients to collect further signatures.</p>

            {requestMessage && (
              <div className="mb-4">
                <Alert type="success">{requestMessage}</Alert>
              </div>
            )}

            <form onSubmit={handleRequestSignatures} className="space-y-3">
              {recipients.map((r, index) => (
                <div key={index} className="flex flex-col sm:flex-row gap-3 sm:items-end bg-slate-50/60 sm:bg-transparent rounded-xl p-3 sm:p-0">
                  <div className="flex-1">
                    <TextInput
                      label="Name"
                      value={r.name}
                      onChange={(e) => updateRecipient(index, "name", e.target.value)}
                    />
                  </div>
                  <div className="flex-1">
                    <TextInput
                      label="Email"
                      type="email"
                      value={r.email}
                      onChange={(e) => updateRecipient(index, "email", e.target.value)}
                    />
                  </div>
                  {recipients.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeRecipient(index)}
                      className="text-sm font-medium text-red-500 hover:text-red-600 sm:mb-2.5 self-start sm:self-auto"
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}

              <div className="flex items-center gap-4 pt-1">
                <button
                  type="button"
                  onClick={addRecipient}
                  disabled={recipients.length >= 5}
                  className="text-sm font-semibold text-brand hover:text-brand-dark disabled:text-slate-300 transition"
                >
                  + Add recipient
                </button>
                <span className="text-xs text-slate-400">{recipients.length}/5</span>
              </div>

              <Button type="submit" loading={sending} loadingText="Sending..." size="lg">
                Send signature requests
              </Button>
            </form>
          </section>
        </div>
      </Card>
    </div>
  );
}

function SummarySection({ title, data }) {
  const entries = Object.entries(data || {}).filter(([, v]) => v);
  return (
    <section>
      <SectionHeading title={title} />
      <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2.5 text-sm">
        {entries.map(([key, value]) => (
          <div key={key} className="flex justify-between gap-4 border-b border-dashed border-slate-100 pb-2">
            <dt className="text-slate-500">{key.replace(/([A-Z])/g, " $1")}</dt>
            <dd className="text-slate-800 font-medium text-right">{String(value)}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}