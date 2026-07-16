// import { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import api from "../api/axios";

// export default function AdminForgotPassword() {
//   const navigate = useNavigate();
//   const [step, setStep] = useState(1); // 1: email, 2: otp, 3: new password
//   const [email, setEmail] = useState("");
//   const [otp, setOtp] = useState("");
//   const [resetToken, setResetToken] = useState("");
//   const [newPassword, setNewPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [error, setError] = useState("");
//   const [message, setMessage] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleSendOtp = async (e) => {
//     e.preventDefault();
//     setError("");
//     setLoading(true);
//     try {
//       const res = await api.post("/admin/forgot-password", { email });
//       setMessage(res.data.message);
//       setStep(2);
//     } catch (err) {
//       setError(err.response?.data?.message || "Unable to send OTP");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleVerifyOtp = async (e) => {
//     e.preventDefault();
//     setError("");
//     setLoading(true);
//     try {
//       const res = await api.post("/admin/verify-otp", { email, otp });
//       setResetToken(res.data.resetToken);
//       setStep(3);
//     } catch (err) {
//       setError(err.response?.data?.message || "Invalid OTP");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleResetPassword = async (e) => {
//     e.preventDefault();
//     setError("");

//     if (newPassword !== confirmPassword) {
//       setError("Passwords do not match");
//       return;
//     }

//     setLoading(true);
//     try {
//       await api.post("/admin/reset-password", { resetToken, newPassword });
//       navigate("/admin/login");
//     } catch (err) {
//       setError(err.response?.data?.message || "Unable to reset password");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto mt-20 bg-white shadow rounded-lg p-8">
//       <h2 className="text-xl font-bold text-brand text-center mb-6">Reset Admin Password</h2>

//       {error && (
//         <div className="mb-4 bg-red-50 border border-red-200 text-red-700 text-sm rounded-md p-3">
//           {error}
//         </div>
//       )}
//       {message && step !== 3 && (
//         <div className="mb-4 bg-green-50 border border-green-200 text-green-700 text-sm rounded-md p-3">
//           {message}
//         </div>
//       )}

//       {step === 1 && (
//         <form onSubmit={handleSendOtp} className="space-y-4">
//           <div className="flex flex-col gap-1">
//             <label className="text-sm font-medium text-gray-700">Admin Email</label>
//             <input
//               type="email"
//               required
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand"
//             />
//           </div>
//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full bg-brand hover:bg-brand-dark disabled:opacity-60 text-white font-semibold py-2.5 rounded-md transition"
//           >
//             {loading ? "Sending..." : "Send OTP"}
//           </button>
//         </form>
//       )}

//       {step === 2 && (
//         <form onSubmit={handleVerifyOtp} className="space-y-4">
//           <div className="flex flex-col gap-1">
//             <label className="text-sm font-medium text-gray-700">Enter 6-digit OTP</label>
//             <input
//               type="text"
//               required
//               maxLength={6}
//               value={otp}
//               onChange={(e) => setOtp(e.target.value)}
//               className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand tracking-widest text-center"
//             />
//           </div>
//           <p className="text-xs text-gray-500">The OTP expires 10 minutes after it was sent.</p>
//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full bg-brand hover:bg-brand-dark disabled:opacity-60 text-white font-semibold py-2.5 rounded-md transition"
//           >
//             {loading ? "Verifying..." : "Verify OTP"}
//           </button>
//         </form>
//       )}

//       {step === 3 && (
//         <form onSubmit={handleResetPassword} className="space-y-4">
//           <div className="flex flex-col gap-1">
//             <label className="text-sm font-medium text-gray-700">New Password</label>
//             <input
//               type="password"
//               required
//               minLength={8}
//               value={newPassword}
//               onChange={(e) => setNewPassword(e.target.value)}
//               className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand"
//             />
//           </div>
//           <div className="flex flex-col gap-1">
//             <label className="text-sm font-medium text-gray-700">Confirm New Password</label>
//             <input
//               type="password"
//               required
//               minLength={8}
//               value={confirmPassword}
//               onChange={(e) => setConfirmPassword(e.target.value)}
//               className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand"
//             />
//           </div>
//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full bg-brand hover:bg-brand-dark disabled:opacity-60 text-white font-semibold py-2.5 rounded-md transition"
//           >
//             {loading ? "Resetting..." : "Reset Password"}
//           </button>
//         </form>
//       )}

//       <div className="text-center mt-4">
//         <Link to="/admin/login" className="text-sm text-brand hover:underline">
//           Back to login
//         </Link>
//       </div>
//     </div>
//   );
// }


import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axios";
import Button from "../components/ui/Button";
import { Alert, TextInput } from "../components/ui/Field";

const steps = ["Email", "Verify", "New password"];

export default function AdminForgotPassword() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1: email, 2: otp, 3: new password
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [resetToken, setResetToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await api.post("/admin/forgot-password", { email });
      setMessage(res.data.message);
      setStep(2);
    } catch (err) {
      setError(err.response?.data?.message || "Unable to send OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await api.post("/admin/verify-otp", { email, otp });
      setResetToken(res.data.resetToken);
      setStep(3);
    } catch (err) {
      setError(err.response?.data?.message || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError("");

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      await api.post("/admin/reset-password", { resetToken, newPassword });
      navigate("/admin/login");
    } catch (err) {
      setError(err.response?.data?.message || "Unable to reset password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md">
        <div className="mb-8 flex items-center justify-center gap-2.5">
          <img
            src="/logo.png"
            alt="Cows Choice Logo"
            className="h-12 w-12 rounded-lg bg-gradient-to-br from-brand to-brand-dark text-white shadow object-cover"
            style={{ backgroundColor: "white" }}
          />
    
          <span className="font-bold text-slate-900 tracking-tight">Cows Choice Admin</span>
        </div>

        <div className="bg-white shadow-[0_1px_2px_rgba(15,23,42,0.04),0_20px_40px_-20px_rgba(15,23,42,0.15)] border border-slate-200/70 rounded-2xl p-8">
          <h2 className="text-xl font-bold text-slate-900 text-center">Reset admin password</h2>

          {/* Step indicator */}
          <div className="flex items-center justify-center gap-2 mt-5 mb-7">
            {steps.map((label, i) => {
              const n = i + 1;
              const active = n === step;
              const done = n < step;
              return (
                <div key={label} className="flex items-center gap-2">
                  <div className="flex flex-col items-center gap-1.5">
                    <span
                      className={`h-7 w-7 rounded-full grid place-items-center text-xs font-bold transition ${
                        done
                          ? "bg-brand text-white"
                          : active
                          ? "bg-brand/10 text-brand border-2 border-brand"
                          : "bg-slate-100 text-slate-400"
                      }`}
                    >
                      {done ? (
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="h-3.5 w-3.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                        </svg>
                      ) : (
                        n
                      )}
                    </span>
                    <span className={`text-[10px] font-medium ${active ? "text-brand" : "text-slate-400"}`}>{label}</span>
                  </div>
                  {i < steps.length - 1 && <span className={`h-px w-8 ${done ? "bg-brand" : "bg-slate-200"}`} />}
                </div>
              );
            })}
          </div>

          {error && (
            <div className="mb-4">
              <Alert type="error">{error}</Alert>
            </div>
          )}
          {message && step !== 3 && (
            <div className="mb-4">
              <Alert type="success">{message}</Alert>
            </div>
          )}

          {step === 1 && (
            <form onSubmit={handleSendOtp} className="space-y-4">
              <TextInput
                label="Admin email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@cowschoice.com"
              />
              <Button type="submit" loading={loading} loadingText="Sending..." className="w-full" size="lg">
                Send OTP
              </Button>
            </form>
          )}

          {step === 2 && (
            <form onSubmit={handleVerifyOtp} className="space-y-4">
              <TextInput
                label="Enter 6-digit OTP"
                type="text"
                required
                maxLength={6}
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="tracking-[0.5em] text-center font-semibold text-base"
                placeholder="000000"
              />
              <p className="text-xs text-slate-400">The OTP expires 10 minutes after it was sent.</p>
              <Button type="submit" loading={loading} loadingText="Verifying..." className="w-full" size="lg">
                Verify OTP
              </Button>
            </form>
          )}

          {step === 3 && (
            <form onSubmit={handleResetPassword} className="space-y-4">
              <TextInput
                label="New password"
                type="password"
                required
                minLength={8}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <TextInput
                label="Confirm new password"
                type="password"
                required
                minLength={8}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <Button type="submit" loading={loading} loadingText="Resetting..." className="w-full" size="lg">
                Reset password
              </Button>
            </form>
          )}
        </div>

        <div className="text-center mt-6">
          <Link to="/admin/login" className="text-sm font-medium text-slate-500 hover:text-brand transition">
            &larr; Back to login
          </Link>
        </div>
      </div>
    </div>
  );
}