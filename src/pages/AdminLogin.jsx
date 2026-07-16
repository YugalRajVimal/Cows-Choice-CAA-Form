// import { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import api from "../api/axios";

// export default function AdminLogin() {
//   const navigate = useNavigate();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     setLoading(true);
//     try {
//       const res = await api.post("/admin/login", { email, password });
//       localStorage.setItem("adminToken", res.data.token);
//       navigate("/admin/dashboard");
//     } catch (err) {
//       setError(err.response?.data?.message || "Login failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto mt-20 bg-white shadow rounded-lg p-8">
//       <h2 className="text-xl font-bold text-brand text-center mb-6">Admin Login</h2>

//       {error && (
//         <div className="mb-4 bg-red-50 border border-red-200 text-red-700 text-sm rounded-md p-3">
//           {error}
//         </div>
//       )}

//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div className="flex flex-col gap-1">
//           <label className="text-sm font-medium text-gray-700">Email</label>
//           <input
//             type="email"
//             required
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand"
//           />
//         </div>
//         <div className="flex flex-col gap-1">
//           <label className="text-sm font-medium text-gray-700">Password</label>
//           <input
//             type="password"
//             required
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand"
//           />
//         </div>
//         <button
//           type="submit"
//           disabled={loading}
//           className="w-full bg-brand hover:bg-brand-dark disabled:opacity-60 text-white font-semibold py-2.5 rounded-md transition"
//         >
//           {loading ? "Signing in..." : "Sign In"}
//         </button>
//       </form>

//       <div className="text-center mt-4">
//         <Link to="/admin/forgot-password" className="text-sm text-brand hover:underline">
//           Forgot password?
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

export default function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await api.post("/admin/login", { email, password });
      localStorage.setItem("adminToken", res.data.token);
      navigate("/admin/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full grid lg:grid-cols-2">
      {/* Brand panel */}
      <div className="hidden lg:flex relative flex-col justify-between overflow-hidden bg-gradient-to-br from-brand via-brand to-brand-dark px-12 py-12 text-white">
        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
            backgroundSize: "28px 28px",
          }}
        />
        <div className="relative flex items-center gap-2.5">
          {/* Brand icon - added logo */}
          <img
            src="/logo.png"
            alt="Cows Choice Logo"
            className="h-10 w-10 rounded-xl bg-white/15 backdrop-blur shadow object-cover"
            style={{ backgroundColor: "white" }}
          />
          <span className="font-bold text-lg tracking-tight">Cows Choice</span>
        </div>
        <div className="relative max-w-sm">
        <img
                src="/logo.png"
                alt="Cows Choice Logo"
                className=" mb-5 h-40 rounded-lg shadow-lg object-cover bg-white"
                style={{ backgroundColor: "white" }}
              />
          <p className="text-2xl font-semibold leading-snug">
            Manage customer accounts, credit applications and e-signatures from one place.
          </p>
          <p className="mt-4 text-sm text-white/70">
            Secure admin access for the Cows Choice operations team.
          </p>
        </div>
        <p className="relative text-xs text-white/50">&copy; {new Date().getFullYear()} Cows Choice Limited</p>
      </div>

      {/* Form panel */}
      <div className="flex items-center justify-center px-4 sm:px-8 py-16 bg-slate-50">
        <div className="w-full max-w-sm">
          <div className="mb-8 lg:hidden flex items-center gap-2.5">
            {/* Logo icon - added logo */}
            <img
              src="/logo.png"
              alt="Cows Choice Logo"
              className="h-9 w-9 rounded-lg bg-gradient-to-br from-brand to-brand-dark text-white shadow object-cover"
              style={{ backgroundColor: "white" }}
            />
            <span className="font-bold text-slate-900 tracking-tight">Cows Choice</span>
          </div>

          <h2 className="text-2xl font-bold text-slate-900">Welcome back</h2>
          <p className="text-sm text-slate-500 mt-1 mb-7">Sign in to the admin dashboard.</p>

          {error && (
            <div className="mb-5">
              <Alert type="error">{error}</Alert>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <TextInput
              label="Email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@cowschoice.com"
            />
            <TextInput
              label="Password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022"
            />

            <Button type="submit" loading={loading} loadingText="Signing in..." className="w-full mt-2" size="lg">
              Sign in
            </Button>
          </form>

          <div className="text-center mt-6">
            <Link to="/admin/forgot-password" className="text-sm font-medium text-brand hover:text-brand-dark transition">
              Forgot password?
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}