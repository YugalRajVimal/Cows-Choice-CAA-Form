// import { useState } from "react";
// import api from "../api/axios";
// import FileUploadField from "../components/FileUploadField";
// import AdminNav from "../components/AdminNav";

// const emptyRequestedBy = { clientName: "", contactPerson: "", telephone: "", email: "" };
// const emptyCustomerDetails = {
//   companyName: "",
//   companyRegistrationNumber: "",
//   vatNumber: "",
//   eoriNumber: "",
//   accountNumber: "",
//   registeredAddress: "",
//   invoiceAddress: "",
//   deliveryAddress: "",
//   postCode: "",
//   country: "",
//   accountsContact: "",
//   accountsEmail: "",
//   purchasingContact: "",
//   purchasingEmail: "",
//   telephone: "",
// };
// const emptyCreditDetails = {
//   expectedMonthlyPurchases: "",
//   creditTermsRequested: "",
//   creditLimitRequested: "",
//   preferredPaymentMethod: "",
//   accountsPayableContact: "",
//   deliveryInstructions: "",
// };

// // Sample data for filling the form
// const sampleRequestedBy = {
//   clientName: "Acme Industries Ltd",
//   contactPerson: "Jane Doe",
//   telephone: "01234 567890",
//   email: "jane.doe@acme.com",
// };
// const sampleCustomerDetails = {
//   companyName: "Acme Industries Ltd",
//   companyRegistrationNumber: "12345678",
//   vatNumber: "GB123456789",
//   eoriNumber: "GB987654321000",
//   accountNumber: "ACC998877",
//   registeredAddress: "12 Example Road, Manchester, M1 2AB",
//   invoiceAddress: "Accounts Dept, 12 Example Road, Manchester, M1 2AB",
//   deliveryAddress: "Warehouse, 99 Industrial Park, Manchester, M20 3XY",
//   postCode: "M1 2AB",
//   country: "United Kingdom",
//   accountsContact: "Bill Smith",
//   accountsEmail: "accounts@acme.com",
//   purchasingContact: "Sally Buyer",
//   purchasingEmail: "sally.buyer@acme.com",
//   telephone: "01234 567891",
// };
// const sampleCreditDetails = {
//   expectedMonthlyPurchases: "8000",
//   creditTermsRequested: "30 days",
//   creditLimitRequested: "10000",
//   preferredPaymentMethod: "Bank Transfer",
//   accountsPayableContact: "Chris Booker",
//   deliveryInstructions: "Deliver to goods-in, 8am-4pm Mon-Fri",
// };

// const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

// export default function AdminForm() {
//   const [requestedBy, setRequestedBy] = useState(emptyRequestedBy);
//   const [customerDetails, setCustomerDetails] = useState(emptyCustomerDetails);
//   const [creditAccountDetails, setCreditAccountDetails] = useState(emptyCreditDetails);
//   const [files, setFiles] = useState({
//     companyLetterhead: null,
//     purchaseOrder: null,
//     certificateOfIncorporation: null,
//     vatCertificate: null,
//   });
//   const [declarationAccepted, setDeclarationAccepted] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [submittedApplicationId, setSubmittedApplicationId] = useState(null);

//   const updateField = (setter) => (field, value) =>
//     setter((prev) => ({ ...prev, [field]: value }));

//   const handleFileChange = (name, file) => setFiles((prev) => ({ ...prev, [name]: file }));

//   // Button handler to fill the form with sample data
//   const fillSampleData = () => {
//     setRequestedBy(sampleRequestedBy);
//     setCustomerDetails(sampleCustomerDetails);
//     setCreditAccountDetails(sampleCreditDetails);
//     setDeclarationAccepted(true); // Optionally check declaration for sample
//     // Files are not filled in sample mode
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");

//     if (!declarationAccepted) {
//       setError("You must accept the customer declaration to continue.");
//       return;
//     }

//     setLoading(true);
//     try {
//       const formData = new FormData();
//       formData.append("requestedBy", JSON.stringify(requestedBy));
//       formData.append("customerDetails", JSON.stringify(customerDetails));
//       formData.append("creditAccountDetails", JSON.stringify(creditAccountDetails));
//       formData.append("declarationAccepted", "true");

//       Object.entries(files).forEach(([key, file]) => {
//         if (file) formData.append(key, file);
//       });

//       const res = await api.post("/admin/form", formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });


//       setSubmittedApplicationId(res.data.applicationId);
//     } catch (err) {
//       setError(err.response?.data?.message || "Something went wrong submitting the form.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const viewApplication = () => {
//     window.location.href = `/admin/applications/${submittedApplicationId}`;
//   };

//   if (submittedApplicationId) {
//     return (
//       <div className="max-w-2xl mx-auto mt-16 bg-white shadow rounded-lg p-8 text-center">
//         <h2 className="text-2xl font-semibold text-brand mb-3">Application submitted</h2>
//         <p className="text-gray-600 mb-6">
//           Your application has been received. To complete the process, please verify your identity
//           with Google and sign the form.
//         </p>
//         <button
//           onClick={viewApplication}
//           className="bg-brand hover:bg-brand-dark text-white font-medium px-6 py-3 rounded-md"
//         >
//           View Application
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-4xl mx-auto py-10  bg-white shadow rounded-lg p-8">
//           <AdminNav />
//       <header className="mb-8 text-center border-b pb-6">
//         <h1 className="text-2xl font-bold text-brand">COWS CHOICE LIMITED</h1>
//         <h2 className="text-lg font-semibold text-gray-700 mt-1">
//           CUSTOMER ACCOUNT APPLICATION FORM
//         </h2>
//         <p className="text-sm text-gray-500 mt-2">45 Fitzroy St, London W1T 6EB</p>
//         <p className="text-sm text-gray-500">Email: info@cowschoice.com</p>
//         <p className="text-sm text-gray-500">VAT Registration No.: 51 4149 706</p>
//       </header>

//       {/* Sample Data Fill Button */}
//       <div className="mb-6 flex justify-end">
//         <button
//           type="button"
//           onClick={fillSampleData}
//           className="bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-300 font-medium px-4 py-2 rounded transition"
//         >
//           Fill Sample Data
//         </button>
//       </div>

//       {error && (
//         <div className="mb-6 bg-red-50 border border-red-200 text-red-700 text-sm rounded-md p-3">
//           {error}
//         </div>
//       )}

//       <form onSubmit={handleSubmit} className="space-y-10">
//         <Section title="Section 1 - Requested By">
//           <Grid>
//             <Input label="Client Name" value={requestedBy.clientName} onChange={(v) => updateField(setRequestedBy)("clientName", v)} required />
//             <Input label="Contact Person" value={requestedBy.contactPerson} onChange={(v) => updateField(setRequestedBy)("contactPerson", v)} required />
//             <Input label="Telephone" value={requestedBy.telephone} onChange={(v) => updateField(setRequestedBy)("telephone", v)} required />
//             <Input label="Email" type="email" value={requestedBy.email} onChange={(v) => updateField(setRequestedBy)("email", v)} required />
//           </Grid>
//         </Section>

//         <Section title="Section 2 - Customer Details">
//           <Grid>
//             <Input label="Company Name" value={customerDetails.companyName} onChange={(v) => updateField(setCustomerDetails)("companyName", v)} required />
//             <Input label="Company Registration Number" value={customerDetails.companyRegistrationNumber} onChange={(v) => updateField(setCustomerDetails)("companyRegistrationNumber", v)} required />
//             <Input label="VAT Number" value={customerDetails.vatNumber} onChange={(v) => updateField(setCustomerDetails)("vatNumber", v)} />
//             <Input label="EORI Number (if applicable)" value={customerDetails.eoriNumber} onChange={(v) => updateField(setCustomerDetails)("eoriNumber", v)} />
//             <Input label="Account Number (if applicable)" value={customerDetails.accountNumber} onChange={(v) => updateField(setCustomerDetails)("accountNumber", v)} />
//             <Input label="Registered Address" value={customerDetails.registeredAddress} onChange={(v) => updateField(setCustomerDetails)("registeredAddress", v)} required />
//             <Input label="Invoice Address" value={customerDetails.invoiceAddress} onChange={(v) => updateField(setCustomerDetails)("invoiceAddress", v)} required />
//             <Input label="Delivery Address (if different)" value={customerDetails.deliveryAddress} onChange={(v) => updateField(setCustomerDetails)("deliveryAddress", v)} />
//             <Input label="Post Code" value={customerDetails.postCode} onChange={(v) => updateField(setCustomerDetails)("postCode", v)} required />
//             <Input label="Country" value={customerDetails.country} onChange={(v) => updateField(setCustomerDetails)("country", v)} required />
//             <Input label="Accounts Contact" value={customerDetails.accountsContact} onChange={(v) => updateField(setCustomerDetails)("accountsContact", v)} required />
//             <Input label="Accounts Email" type="email" value={customerDetails.accountsEmail} onChange={(v) => updateField(setCustomerDetails)("accountsEmail", v)} required />
//             <Input label="Purchasing Contact" value={customerDetails.purchasingContact} onChange={(v) => updateField(setCustomerDetails)("purchasingContact", v)} required />
//             <Input label="Purchasing Email" type="email" value={customerDetails.purchasingEmail} onChange={(v) => updateField(setCustomerDetails)("purchasingEmail", v)} required />
//             <Input label="Telephone" value={customerDetails.telephone} onChange={(v) => updateField(setCustomerDetails)("telephone", v)} required />
//           </Grid>
//         </Section>

//         <Section title="Section 3 - Credit & Account Details">
//           <Grid>
//             <Input label="Expected Monthly Purchases" value={creditAccountDetails.expectedMonthlyPurchases} onChange={(v) => updateField(setCreditAccountDetails)("expectedMonthlyPurchases", v)} required />
//             <Input label="Credit Terms Requested" value={creditAccountDetails.creditTermsRequested} onChange={(v) => updateField(setCreditAccountDetails)("creditTermsRequested", v)} required />
//             <Input label="Credit Limit Requested" value={creditAccountDetails.creditLimitRequested} onChange={(v) => updateField(setCreditAccountDetails)("creditLimitRequested", v)} required />
//             <Input label="Preferred Payment Method" value={creditAccountDetails.preferredPaymentMethod} onChange={(v) => updateField(setCreditAccountDetails)("preferredPaymentMethod", v)} required />
//             <Input label="Accounts Payable Contact" value={creditAccountDetails.accountsPayableContact} onChange={(v) => updateField(setCreditAccountDetails)("accountsPayableContact", v)} required />
//             <Input label="Delivery Instructions" value={creditAccountDetails.deliveryInstructions} onChange={(v) => updateField(setCreditAccountDetails)("deliveryInstructions", v)} />
//           </Grid>
//         </Section>

//         <Section title="Section 4 - Supporting Documents">
//           <Grid>
//             <FileUploadField label="Company Letterhead" name="companyLetterhead" file={files.companyLetterhead} onChange={handleFileChange} />
//             <FileUploadField label="Purchase Order" name="purchaseOrder" file={files.purchaseOrder} onChange={handleFileChange} />
//             <FileUploadField label="Certificate of Incorporation" name="certificateOfIncorporation" file={files.certificateOfIncorporation} onChange={handleFileChange} />
//             <FileUploadField label="VAT Certificate" name="vatCertificate" file={files.vatCertificate} onChange={handleFileChange} />
//           </Grid>
//         </Section>

//         <Section title="GDPR Statement">
//           <p className="text-sm text-gray-600 leading-relaxed">
//             Cows Choice Limited processes the information provided on this form for customer account
//             setup, credit administration, order fulfilment, invoicing, legal compliance and customer
//             support. Your information is processed in accordance with the UK GDPR and the Data
//             Protection Act 2018. We only share information where legally required or with trusted
//             service providers acting on our behalf. You may request access to, correction of or
//             deletion of your personal data, subject to applicable legal obligations.
//           </p>

//           <p className="text-sm font-medium text-gray-700 mt-4">Customer Declaration</p>
//           <p className="text-sm text-gray-600 leading-relaxed">
//             I/We certify that the information provided is accurate and complete and agree to abide by
//             Cows Choice Limited's Terms and Conditions of Sale and agreed payment terms.
//           </p>

//           <label className="flex items-center gap-2 mt-4 text-sm text-gray-700">
//             <input
//               type="checkbox"
//               checked={declarationAccepted}
//               onChange={(e) => setDeclarationAccepted(e.target.checked)}
//               className="h-4 w-4 text-brand border-gray-300 rounded"
//             />
//             I/We accept the declaration above
//           </label>
//         </Section>

//         <button
//           type="submit"
//           disabled={loading}
//           className="w-full bg-brand hover:bg-brand-dark disabled:opacity-60 text-white font-semibold py-3 rounded-md transition"
//         >
//           {loading ? "Submitting..." : "Submit Application"}
//         </button>
//       </form>
//     </div>
//   );
// }

// function Section({ title, children }) {
//   return (
//     <section>
//       <h3 className="text-lg font-semibold text-brand mb-4 border-b pb-2">{title}</h3>
//       {children}
//     </section>
//   );
// }

// function Grid({ children }) {
//   return <div className="grid grid-cols-1 md:grid-cols-2 gap-4">{children}</div>;
// }

// function Input({ label, value, onChange, type = "text", required }) {
//   return (
//     <div className="flex flex-col gap-1">
//       <label className="text-sm font-medium text-gray-700">
//         {label} {required && <span className="text-red-500">*</span>}
//       </label>
//       <input
//         type={type}
//         value={value}
//         required={required}
//         onChange={(e) => onChange(e.target.value)}
//         className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand"
//       />
//     </div>
//   );
// }


import { useState } from "react";
import api from "../api/axios";
import FileUploadField from "../components/FileUploadField";
import AdminNav from "../components/AdminNav";
import Button from "../components/ui/Button";
import { Alert, TextInput } from "../components/ui/Field";

const emptyRequestedBy = { clientName: "", contactPerson: "", telephone: "", email: "" };
const emptyCustomerDetails = {
  companyName: "",
  companyRegistrationNumber: "",
  vatNumber: "",
  eoriNumber: "",
  accountNumber: "",
  registeredAddress: "",
  invoiceAddress: "",
  deliveryAddress: "",
  postCode: "",
  country: "",
  accountsContact: "",
  accountsEmail: "",
  purchasingContact: "",
  purchasingEmail: "",
  telephone: "",
};
const emptyCreditDetails = {
  expectedMonthlyPurchases: "",
  creditTermsRequested: "",
  creditLimitRequested: "",
  preferredPaymentMethod: "",
  accountsPayableContact: "",
  deliveryInstructions: "",
};

// Sample data for filling the form
const sampleRequestedBy = {
  clientName: "Acme Industries Ltd",
  contactPerson: "Jane Doe",
  telephone: "01234 567890",
  email: "jane.doe@acme.com",
};
const sampleCustomerDetails = {
  companyName: "Acme Industries Ltd",
  companyRegistrationNumber: "12345678",
  vatNumber: "GB123456789",
  eoriNumber: "GB987654321000",
  accountNumber: "ACC998877",
  registeredAddress: "12 Example Road, Manchester, M1 2AB",
  invoiceAddress: "Accounts Dept, 12 Example Road, Manchester, M1 2AB",
  deliveryAddress: "Warehouse, 99 Industrial Park, Manchester, M20 3XY",
  postCode: "M1 2AB",
  country: "United Kingdom",
  accountsContact: "Bill Smith",
  accountsEmail: "accounts@acme.com",
  purchasingContact: "Sally Buyer",
  purchasingEmail: "sally.buyer@acme.com",
  telephone: "01234 567891",
};
const sampleCreditDetails = {
  expectedMonthlyPurchases: "8000",
  creditTermsRequested: "30 days",
  creditLimitRequested: "10000",
  preferredPaymentMethod: "Bank Transfer",
  accountsPayableContact: "Chris Booker",
  deliveryInstructions: "Deliver to goods-in, 8am-4pm Mon-Fri",
};

export default function AdminForm() {
  const [requestedBy, setRequestedBy] = useState(emptyRequestedBy);
  const [customerDetails, setCustomerDetails] = useState(emptyCustomerDetails);
  const [creditAccountDetails, setCreditAccountDetails] = useState(emptyCreditDetails);
  const [files, setFiles] = useState({
    companyLetterhead: null,
    purchaseOrder: null,
    certificateOfIncorporation: null,
    vatCertificate: null,
  });
  const [declarationAccepted, setDeclarationAccepted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [submittedApplicationId, setSubmittedApplicationId] = useState(null);

  const updateField = (setter) => (field, value) => setter((prev) => ({ ...prev, [field]: value }));

  const handleFileChange = (name, file) => setFiles((prev) => ({ ...prev, [name]: file }));

  // Button handler to fill the form with sample data
  const fillSampleData = () => {
    setRequestedBy(sampleRequestedBy);
    setCustomerDetails(sampleCustomerDetails);
    setCreditAccountDetails(sampleCreditDetails);
    setDeclarationAccepted(true); // Optionally check declaration for sample
    // Files are not filled in sample mode
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!declarationAccepted) {
      setError("You must accept the customer declaration to continue.");
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("requestedBy", JSON.stringify(requestedBy));
      formData.append("customerDetails", JSON.stringify(customerDetails));
      formData.append("creditAccountDetails", JSON.stringify(creditAccountDetails));
      formData.append("declarationAccepted", "true");

      Object.entries(files).forEach(([key, file]) => {
        if (file) formData.append(key, file);
      });

      const res = await api.post("/admin/form", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setSubmittedApplicationId(res.data.applicationId);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong submitting the form.");
    } finally {
      setLoading(false);
    }
  };

  const viewApplication = () => {
    window.location.href = `/admin/applications/${submittedApplicationId}`;
  };

  if (submittedApplicationId) {
    return (
      <div className="max-w-4xl mx-auto my-8 px-4 sm:px-6">
        <AdminNav />
        <div className="max-w-lg mx-auto bg-white shadow-[0_1px_2px_rgba(15,23,42,0.04),0_24px_48px_-24px_rgba(15,23,42,0.18)] border border-slate-200/70 rounded-2xl p-10 text-center">
          <div className="h-14 w-14 rounded-full bg-emerald-100 text-emerald-600 grid place-items-center mx-auto mb-5">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-7 w-7">
              <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-slate-900">Application submitted</h2>
          <p className="text-slate-500 mt-2.5 leading-relaxed">
            Your application has been received. To complete the process, please verify your identity
            with Google and sign the form.
          </p>
          <Button onClick={viewApplication} size="lg" className="w-full mt-7">
            View application
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-10 px-4 sm:px-6">
      <AdminNav />

      <div className="bg-white shadow-[0_1px_2px_rgba(15,23,42,0.04),0_24px_48px_-24px_rgba(15,23,42,0.15)] border border-slate-200/70 rounded-2xl overflow-hidden">
        <header className="relative bg-gradient-to-br from-brand to-brand-dark text-white px-6 sm:px-10 py-10 text-center overflow-hidden">
          <div
            className="absolute inset-0 opacity-[0.08]"
            style={{ backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize: "24px 24px" }}
          />
          <div className="relative">
          <img
                src="/logo.png"
                alt="Cows Choice Logo"
                className="mx-auto mb-5 h-40 rounded-lg shadow-lg object-cover bg-white"
                style={{ backgroundColor: "white" }}
              />
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">COWS CHOICE LIMITED</h1>
            <h2 className="text-base sm:text-lg font-medium text-white/90 mt-2">
              Customer Account Application Form
            </h2>
            <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs text-white/70 mt-4">
              <span>45 Fitzroy St, London W1T 6EB</span>
              <span className="hidden sm:inline">&middot;</span>
              <span>info@cowschoice.com</span>
              <span className="hidden sm:inline">&middot;</span>
              <span>VAT Reg. No. 51 4149 706</span>
            </div>
          </div>
        </header>

        <div className="p-6 sm:p-10">
          <div className="mb-6 flex justify-end">
            <button
              type="button"
              onClick={fillSampleData}
              className="text-xs font-semibold text-slate-500 border border-slate-200 rounded-lg px-3.5 py-2 hover:border-slate-300 hover:bg-slate-50 transition"
            >
              Fill sample data
            </button>
          </div>

          {error && (
            <div className="mb-8">
              <Alert type="error">{error}</Alert>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-10">
            <Section index="01" title="Requested By">
              <Grid>
                <TextInput label="Client Name" value={requestedBy.clientName} onChange={(e) => updateField(setRequestedBy)("clientName", e.target.value)} required />
                <TextInput label="Contact Person" value={requestedBy.contactPerson} onChange={(e) => updateField(setRequestedBy)("contactPerson", e.target.value)} required />
                <TextInput label="Telephone" value={requestedBy.telephone} onChange={(e) => updateField(setRequestedBy)("telephone", e.target.value)} required />
                <TextInput label="Email" type="email" value={requestedBy.email} onChange={(e) => updateField(setRequestedBy)("email", e.target.value)} required />
              </Grid>
            </Section>

            <Section index="02" title="Customer Details">
              <Grid>
                <TextInput label="Company Name" value={customerDetails.companyName} onChange={(e) => updateField(setCustomerDetails)("companyName", e.target.value)} required />
                <TextInput label="Company Registration Number" value={customerDetails.companyRegistrationNumber} onChange={(e) => updateField(setCustomerDetails)("companyRegistrationNumber", e.target.value)} required />
                <TextInput label="VAT Number" value={customerDetails.vatNumber} onChange={(e) => updateField(setCustomerDetails)("vatNumber", e.target.value)} />
                <TextInput label="EORI Number (if applicable)" value={customerDetails.eoriNumber} onChange={(e) => updateField(setCustomerDetails)("eoriNumber", e.target.value)} />
                <TextInput label="Account Number (if applicable)" value={customerDetails.accountNumber} onChange={(e) => updateField(setCustomerDetails)("accountNumber", e.target.value)} />
                <TextInput label="Registered Address" value={customerDetails.registeredAddress} onChange={(e) => updateField(setCustomerDetails)("registeredAddress", e.target.value)} required />
                <TextInput label="Invoice Address" value={customerDetails.invoiceAddress} onChange={(e) => updateField(setCustomerDetails)("invoiceAddress", e.target.value)} required />
                <TextInput label="Delivery Address (if different)" value={customerDetails.deliveryAddress} onChange={(e) => updateField(setCustomerDetails)("deliveryAddress", e.target.value)} />
                <TextInput label="Post Code" value={customerDetails.postCode} onChange={(e) => updateField(setCustomerDetails)("postCode", e.target.value)} required />
                <TextInput label="Country" value={customerDetails.country} onChange={(e) => updateField(setCustomerDetails)("country", e.target.value)} required />
                <TextInput label="Accounts Contact" value={customerDetails.accountsContact} onChange={(e) => updateField(setCustomerDetails)("accountsContact", e.target.value)} required />
                <TextInput label="Accounts Email" type="email" value={customerDetails.accountsEmail} onChange={(e) => updateField(setCustomerDetails)("accountsEmail", e.target.value)} required />
                <TextInput label="Purchasing Contact" value={customerDetails.purchasingContact} onChange={(e) => updateField(setCustomerDetails)("purchasingContact", e.target.value)} required />
                <TextInput label="Purchasing Email" type="email" value={customerDetails.purchasingEmail} onChange={(e) => updateField(setCustomerDetails)("purchasingEmail", e.target.value)} required />
                <TextInput label="Telephone" value={customerDetails.telephone} onChange={(e) => updateField(setCustomerDetails)("telephone", e.target.value)} required />
              </Grid>
            </Section>

            <Section index="03" title="Credit & Account Details">
              <Grid>
                <TextInput label="Expected Monthly Purchases" value={creditAccountDetails.expectedMonthlyPurchases} onChange={(e) => updateField(setCreditAccountDetails)("expectedMonthlyPurchases", e.target.value)} required />
                <TextInput label="Credit Terms Requested" value={creditAccountDetails.creditTermsRequested} onChange={(e) => updateField(setCreditAccountDetails)("creditTermsRequested", e.target.value)} required />
                <TextInput label="Credit Limit Requested" value={creditAccountDetails.creditLimitRequested} onChange={(e) => updateField(setCreditAccountDetails)("creditLimitRequested", e.target.value)} required />
                <TextInput label="Preferred Payment Method" value={creditAccountDetails.preferredPaymentMethod} onChange={(e) => updateField(setCreditAccountDetails)("preferredPaymentMethod", e.target.value)} required />
                <TextInput label="Accounts Payable Contact" value={creditAccountDetails.accountsPayableContact} onChange={(e) => updateField(setCreditAccountDetails)("accountsPayableContact", e.target.value)} required />
                <TextInput label="Delivery Instructions" value={creditAccountDetails.deliveryInstructions} onChange={(e) => updateField(setCreditAccountDetails)("deliveryInstructions", e.target.value)} />
              </Grid>
            </Section>

            <Section index="04" title="Supporting Documents">
              <Grid>
                <FileUploadField label="Company Letterhead" name="companyLetterhead" file={files.companyLetterhead} onChange={handleFileChange} />
                <FileUploadField label="Purchase Order" name="purchaseOrder" file={files.purchaseOrder} onChange={handleFileChange} />
                <FileUploadField label="Certificate of Incorporation" name="certificateOfIncorporation" file={files.certificateOfIncorporation} onChange={handleFileChange} />
                <FileUploadField label="VAT Certificate" name="vatCertificate" file={files.vatCertificate} onChange={handleFileChange} />
              </Grid>
            </Section>

            <section className="bg-slate-50 rounded-2xl border border-slate-100 p-6">
              <h3 className="text-base font-bold text-slate-900 mb-3">GDPR Statement</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Cows Choice Limited processes the information provided on this form for customer account
                setup, credit administration, order fulfilment, invoicing, legal compliance and customer
                support. Your information is processed in accordance with the UK GDPR and the Data
                Protection Act 2018. We only share information where legally required or with trusted
                service providers acting on our behalf. You may request access to, correction of or
                deletion of your personal data, subject to applicable legal obligations.
              </p>

              <p className="text-sm font-semibold text-slate-800 mt-5">Customer Declaration</p>
              <p className="text-sm text-slate-600 leading-relaxed mt-1">
                I/We certify that the information provided is accurate and complete and agree to abide by
                Cows Choice Limited's Terms and Conditions of Sale and agreed payment terms.
              </p>

              <label className="flex items-start gap-2.5 mt-4 text-sm text-slate-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={declarationAccepted}
                  onChange={(e) => setDeclarationAccepted(e.target.checked)}
                  className="mt-0.5 h-4 w-4 text-brand border-slate-300 rounded focus:ring-brand/30"
                />
                I/We accept the declaration above
              </label>
            </section>

            <Button type="submit" loading={loading} loadingText="Submitting..." size="lg" className="w-full">
              Submit Application
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

function Section({ index, title, children }) {
  return (
    <section>
      <div className="flex items-baseline gap-3 mb-5 border-b border-slate-100 pb-3">
        <span className="text-xs font-bold text-brand/60 tracking-widest">{index}</span>
        <h3 className="text-base font-bold text-slate-900">{title}</h3>
      </div>
      {children}
    </section>
  );
}

function Grid({ children }) {
  return <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-4">{children}</div>;
}