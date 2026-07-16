export default function VerificationFailed() {
  return (
    <div className="max-w-lg mx-auto mt-20 bg-white shadow rounded-lg p-8 text-center">
      <h2 className="text-2xl font-semibold text-red-600 mb-3">Verification Failed</h2>
      <p className="text-gray-600">
        We could not verify your Google account. Please go back to your original link and try again.
      </p>
    </div>
  );
}
