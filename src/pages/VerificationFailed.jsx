// export default function VerificationFailed() {
//   return (
//     <div className="max-w-lg mx-auto mt-20 bg-white shadow rounded-lg p-8 text-center">
//       <h2 className="text-2xl font-semibold text-red-600 mb-3">Verification Failed</h2>
//       <p className="text-gray-600">
//         We could not verify your Google account. Please go back to your original link and try again.
//       </p>
//     </div>
//   );
// }


import { Link } from "react-router-dom";

export default function VerificationFailed() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-16">
      <div className="max-w-md w-full bg-white shadow-[0_1px_2px_rgba(15,23,42,0.04),0_24px_48px_-24px_rgba(15,23,42,0.18)] border border-slate-200/70 rounded-2xl p-10 text-center">
        <div className="h-14 w-14 rounded-full bg-red-100 text-red-600 grid place-items-center mx-auto mb-5">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-7 w-7">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M18 6 6 18" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-slate-900">Verification failed</h2>
        <p className="text-slate-500 mt-2.5 leading-relaxed">
          We could not verify your Google account. Please go back to your original link and try again.
        </p>
        <Link
          to="/"
          className="inline-flex items-center justify-center gap-2 mt-7 bg-brand hover:bg-brand-dark text-white font-semibold text-sm px-6 py-2.5 rounded-xl transition"
        >
          Return home
        </Link>
      </div>
    </div>
  );
}