// import { Routes, Route, Navigate } from "react-router-dom";
// import CustomerForm from "./pages/CustomerForm";
// import SigningPage from "./pages/SigningPage";
// import SignatureRequestPage from "./pages/SignatureRequestPage";
// import VerificationFailed from "./pages/VerificationFailed";
// import AdminLogin from "./pages/AdminLogin";
// import AdminForgotPassword from "./pages/AdminForgotPassword";
// import AdminDashboard from "./pages/AdminDashboard";
// import AdminApplicationsList from "./pages/AdminApplicationsList";
// import AdminApplicationView from "./pages/AdminApplicationView";
// import ProtectedAdminRoute from "./components/ProtectedAdminRoute";
// import AdminForm from "./pages/AdminForm";

// export default function App() {
//   return (
//     <div className="min-h-screen bg-gray-100">
//       <Routes>
//         <Route path="/" element={<CustomerForm />} />
//         <Route path="/apply/:id/sign" element={<SigningPage />} />
//         <Route path="/signature-request/:token" element={<SignatureRequestPage />} />
//         <Route path="/verification-failed" element={<VerificationFailed />} />

//         <Route path="/admin/login" element={<AdminLogin />} />
//         <Route path="/admin/forgot-password" element={<AdminForgotPassword />} />
//         <Route
//           path="/admin/dashboard"
//           element={
//             <ProtectedAdminRoute>
//               <AdminDashboard />
//             </ProtectedAdminRoute>
//           }
//         />
//           <Route
//           path="/admin/form"
//           element={
//             <ProtectedAdminRoute>
//               <AdminForm />
//             </ProtectedAdminRoute>
//           }
//         />


//         <Route
//           path="/admin/applications"
//           element={
//             <ProtectedAdminRoute>
//               <AdminApplicationsList />
//             </ProtectedAdminRoute>
//           }
//         />
//         <Route
//           path="/admin/applications/:id"
//           element={
//             <ProtectedAdminRoute>
//               <AdminApplicationView />
//             </ProtectedAdminRoute>
//           }
//         />

//         <Route path="*" element={<Navigate to="/" replace />} />
//       </Routes>
//     </div>
//   );
// }


import { Routes, Route, Navigate } from "react-router-dom";
import CustomerForm from "./pages/CustomerForm";
import SigningPage from "./pages/SigningPage";
import SignatureRequestPage from "./pages/SignatureRequestPage";
import VerificationFailed from "./pages/VerificationFailed";
import AdminLogin from "./pages/AdminLogin";
import AdminForgotPassword from "./pages/AdminForgotPassword";
import AdminDashboard from "./pages/AdminDashboard";
import AdminApplicationsList from "./pages/AdminApplicationsList";
import AdminApplicationView from "./pages/AdminApplicationView";
import ProtectedAdminRoute from "./components/ProtectedAdminRoute";
import AdminForm from "./pages/AdminForm";

export default function App() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 antialiased">
      <Routes>
        <Route path="/" element={<CustomerForm />} />
        <Route
          path="/admin"
          element={<Navigate to="/admin/login" replace />}
        />
  
        <Route path="/apply/:id/sign" element={<SigningPage />} />
        <Route path="/signature-request/:token" element={<SignatureRequestPage />} />
        <Route path="/verification-failed" element={<VerificationFailed />} />

        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/forgot-password" element={<AdminForgotPassword />} />
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedAdminRoute>
              <AdminDashboard />
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="/admin/form"
          element={
            <ProtectedAdminRoute>
              <AdminForm />
            </ProtectedAdminRoute>
          }
        />

        <Route
          path="/admin/applications"
          element={
            <ProtectedAdminRoute>
              <AdminApplicationsList />
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="/admin/applications/:id"
          element={
            <ProtectedAdminRoute>
              <AdminApplicationView />
            </ProtectedAdminRoute>
          }
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}