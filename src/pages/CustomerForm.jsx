import { useState } from "react";
import api from "../api/axios";
import FileUploadField from "../components/FileUploadField";

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

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

export default function CustomerForm() {
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

  const updateField = (setter) => (field, value) =>
    setter((prev) => ({ ...prev, [field]: value }));

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

      const res = await api.post("/applications", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setSubmittedApplicationId(res.data.applicationId);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong submitting the form.");
    } finally {
      setLoading(false);
    }
  };

  const startGoogleVerification = () => {
    window.location.href = `${API_BASE}/auth/google/customer_application/${submittedApplicationId}`;
  };

  if (submittedApplicationId) {
    return (
      <div className="max-w-2xl mx-auto mt-16 bg-white shadow rounded-lg p-8 text-center">
        <h2 className="text-2xl font-semibold text-brand mb-3">Application submitted</h2>
        <p className="text-gray-600 mb-6">
          Your application has been received. To complete the process, please verify your identity
          with Google and sign the form.
        </p>
        <button
          onClick={startGoogleVerification}
          className="bg-brand hover:bg-brand-dark text-white font-medium px-6 py-3 rounded-md"
        >
          Continue to Google Verification &amp; Signature
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-10  bg-white shadow rounded-lg p-8">
      <header className="mb-8 text-center border-b pb-6">
        <h1 className="text-2xl font-bold text-brand">COWS CHOICE LIMITED</h1>
        <h2 className="text-lg font-semibold text-gray-700 mt-1">
          CUSTOMER ACCOUNT APPLICATION FORM
        </h2>
        <p className="text-sm text-gray-500 mt-2">45 Fitzroy St, London W1T 6EB</p>
        <p className="text-sm text-gray-500">Email: info@cowschoice.com</p>
        <p className="text-sm text-gray-500">VAT Registration No.: 51 4149 706</p>
      </header>

      {/* Sample Data Fill Button */}
      <div className="mb-6 flex justify-end">
        <button
          type="button"
          onClick={fillSampleData}
          className="bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-300 font-medium px-4 py-2 rounded transition"
        >
          Fill Sample Data
        </button>
      </div>

      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 text-red-700 text-sm rounded-md p-3">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-10">
        <Section title="Section 1 - Requested By">
          <Grid>
            <Input label="Client Name" value={requestedBy.clientName} onChange={(v) => updateField(setRequestedBy)("clientName", v)} required />
            <Input label="Contact Person" value={requestedBy.contactPerson} onChange={(v) => updateField(setRequestedBy)("contactPerson", v)} required />
            <Input label="Telephone" value={requestedBy.telephone} onChange={(v) => updateField(setRequestedBy)("telephone", v)} required />
            <Input label="Email" type="email" value={requestedBy.email} onChange={(v) => updateField(setRequestedBy)("email", v)} required />
          </Grid>
        </Section>

        <Section title="Section 2 - Customer Details">
          <Grid>
            <Input label="Company Name" value={customerDetails.companyName} onChange={(v) => updateField(setCustomerDetails)("companyName", v)} required />
            <Input label="Company Registration Number" value={customerDetails.companyRegistrationNumber} onChange={(v) => updateField(setCustomerDetails)("companyRegistrationNumber", v)} required />
            <Input label="VAT Number" value={customerDetails.vatNumber} onChange={(v) => updateField(setCustomerDetails)("vatNumber", v)} />
            <Input label="EORI Number (if applicable)" value={customerDetails.eoriNumber} onChange={(v) => updateField(setCustomerDetails)("eoriNumber", v)} />
            <Input label="Account Number (if applicable)" value={customerDetails.accountNumber} onChange={(v) => updateField(setCustomerDetails)("accountNumber", v)} />
            <Input label="Registered Address" value={customerDetails.registeredAddress} onChange={(v) => updateField(setCustomerDetails)("registeredAddress", v)} required />
            <Input label="Invoice Address" value={customerDetails.invoiceAddress} onChange={(v) => updateField(setCustomerDetails)("invoiceAddress", v)} required />
            <Input label="Delivery Address (if different)" value={customerDetails.deliveryAddress} onChange={(v) => updateField(setCustomerDetails)("deliveryAddress", v)} />
            <Input label="Post Code" value={customerDetails.postCode} onChange={(v) => updateField(setCustomerDetails)("postCode", v)} required />
            <Input label="Country" value={customerDetails.country} onChange={(v) => updateField(setCustomerDetails)("country", v)} required />
            <Input label="Accounts Contact" value={customerDetails.accountsContact} onChange={(v) => updateField(setCustomerDetails)("accountsContact", v)} required />
            <Input label="Accounts Email" type="email" value={customerDetails.accountsEmail} onChange={(v) => updateField(setCustomerDetails)("accountsEmail", v)} required />
            <Input label="Purchasing Contact" value={customerDetails.purchasingContact} onChange={(v) => updateField(setCustomerDetails)("purchasingContact", v)} required />
            <Input label="Purchasing Email" type="email" value={customerDetails.purchasingEmail} onChange={(v) => updateField(setCustomerDetails)("purchasingEmail", v)} required />
            <Input label="Telephone" value={customerDetails.telephone} onChange={(v) => updateField(setCustomerDetails)("telephone", v)} required />
          </Grid>
        </Section>

        <Section title="Section 3 - Credit & Account Details">
          <Grid>
            <Input label="Expected Monthly Purchases" value={creditAccountDetails.expectedMonthlyPurchases} onChange={(v) => updateField(setCreditAccountDetails)("expectedMonthlyPurchases", v)} required />
            <Input label="Credit Terms Requested" value={creditAccountDetails.creditTermsRequested} onChange={(v) => updateField(setCreditAccountDetails)("creditTermsRequested", v)} required />
            <Input label="Credit Limit Requested" value={creditAccountDetails.creditLimitRequested} onChange={(v) => updateField(setCreditAccountDetails)("creditLimitRequested", v)} required />
            <Input label="Preferred Payment Method" value={creditAccountDetails.preferredPaymentMethod} onChange={(v) => updateField(setCreditAccountDetails)("preferredPaymentMethod", v)} required />
            <Input label="Accounts Payable Contact" value={creditAccountDetails.accountsPayableContact} onChange={(v) => updateField(setCreditAccountDetails)("accountsPayableContact", v)} required />
            <Input label="Delivery Instructions" value={creditAccountDetails.deliveryInstructions} onChange={(v) => updateField(setCreditAccountDetails)("deliveryInstructions", v)} />
          </Grid>
        </Section>

        <Section title="Section 4 - Supporting Documents">
          <Grid>
            <FileUploadField label="Company Letterhead" name="companyLetterhead" file={files.companyLetterhead} onChange={handleFileChange} />
            <FileUploadField label="Purchase Order" name="purchaseOrder" file={files.purchaseOrder} onChange={handleFileChange} />
            <FileUploadField label="Certificate of Incorporation" name="certificateOfIncorporation" file={files.certificateOfIncorporation} onChange={handleFileChange} />
            <FileUploadField label="VAT Certificate" name="vatCertificate" file={files.vatCertificate} onChange={handleFileChange} />
          </Grid>
        </Section>

        <Section title="GDPR Statement">
          <p className="text-sm text-gray-600 leading-relaxed">
            Cows Choice Limited processes the information provided on this form for customer account
            setup, credit administration, order fulfilment, invoicing, legal compliance and customer
            support. Your information is processed in accordance with the UK GDPR and the Data
            Protection Act 2018. We only share information where legally required or with trusted
            service providers acting on our behalf. You may request access to, correction of or
            deletion of your personal data, subject to applicable legal obligations.
          </p>

          <p className="text-sm font-medium text-gray-700 mt-4">Customer Declaration</p>
          <p className="text-sm text-gray-600 leading-relaxed">
            I/We certify that the information provided is accurate and complete and agree to abide by
            Cows Choice Limited's Terms and Conditions of Sale and agreed payment terms.
          </p>

          <label className="flex items-center gap-2 mt-4 text-sm text-gray-700">
            <input
              type="checkbox"
              checked={declarationAccepted}
              onChange={(e) => setDeclarationAccepted(e.target.checked)}
              className="h-4 w-4 text-brand border-gray-300 rounded"
            />
            I/We accept the declaration above
          </label>
        </Section>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-brand hover:bg-brand-dark disabled:opacity-60 text-white font-semibold py-3 rounded-md transition"
        >
          {loading ? "Submitting..." : "Submit Application"}
        </button>
      </form>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <section>
      <h3 className="text-lg font-semibold text-brand mb-4 border-b pb-2">{title}</h3>
      {children}
    </section>
  );
}

function Grid({ children }) {
  return <div className="grid grid-cols-1 md:grid-cols-2 gap-4">{children}</div>;
}

function Input({ label, value, onChange, type = "text", required }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        value={value}
        required={required}
        onChange={(e) => onChange(e.target.value)}
        className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand"
      />
    </div>
  );
}
