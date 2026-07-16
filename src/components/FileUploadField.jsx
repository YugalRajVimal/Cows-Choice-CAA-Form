export default function FileUploadField({ label, name, onChange, required, file }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type="file"
        name={name}
        accept="image/jpeg,image/png,image/webp,application/pdf"
        onChange={(e) => onChange(name, e.target.files?.[0] || null)}
        required={required}
        className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-brand file:text-white hover:file:bg-brand-dark border border-gray-300 rounded-md cursor-pointer"
      />
      {file && (
        <span className="text-xs text-gray-500 truncate">Selected: {file.name}</span>
      )}
    </div>
  );
}
