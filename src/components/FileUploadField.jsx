// export default function FileUploadField({ label, name, onChange, required, file }) {
//   return (
//     <div className="flex flex-col gap-1">
//       <label className="text-sm font-medium text-gray-700">
//         {label} {required && <span className="text-red-500">*</span>}
//       </label>
//       <input
//         type="file"
//         name={name}
//         accept="image/jpeg,image/png,image/webp,application/pdf"
//         onChange={(e) => onChange(name, e.target.files?.[0] || null)}
//         required={required}
//         className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-brand file:text-white hover:file:bg-brand-dark border border-gray-300 rounded-md cursor-pointer"
//       />
//       {file && (
//         <span className="text-xs text-gray-500 truncate">Selected: {file.name}</span>
//       )}
//     </div>
//   );
// }


import { useRef, useState } from "react";

export default function FileUploadField({ label, name, onChange, required, file }) {
  const inputRef = useRef(null);
  const [dragOver, setDragOver] = useState(false);

  const handleFiles = (fileList) => {
    onChange(name, fileList?.[0] || null);
  };

  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[13px] font-semibold text-slate-700">
        {label} {required && <span className="text-brand">*</span>}
      </label>

      <div
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragOver(false);
          handleFiles(e.dataTransfer.files);
        }}
        className={`group relative flex items-center gap-3 rounded-xl border-2 border-dashed px-4 py-3.5 cursor-pointer transition ${
          dragOver
            ? "border-brand bg-brand/5"
            : file
            ? "border-slate-200 bg-slate-50"
            : "border-slate-200 bg-white hover:border-brand/50 hover:bg-brand/[0.03]"
        }`}
      >
        <span
          className={`h-9 w-9 shrink-0 rounded-lg grid place-items-center transition ${
            file ? "bg-emerald-100 text-emerald-600" : "bg-slate-100 text-slate-400 group-hover:bg-brand/10 group-hover:text-brand"
          }`}
        >
          {file ? (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4.5 w-4.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4.5 w-4.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V4.5m0 0L7 9.5m5-5 5 5M4.5 16.5v2A2.5 2.5 0 0 0 7 21h10a2.5 2.5 0 0 0 2.5-2.5v-2" />
            </svg>
          )}
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium text-slate-700 truncate">
            {file ? file.name : "Click to upload or drag & drop"}
          </p>
          <p className="text-xs text-slate-400">{file ? "Selected \u00b7 click to replace" : "PDF, JPG, PNG or WEBP"}</p>
        </div>
      </div>

      <input
        ref={inputRef}
        type="file"
        name={name}
        accept="image/jpeg,image/png,image/webp,application/pdf"
        onChange={(e) => handleFiles(e.target.files)}
        required={required}
        className="hidden"
      />
    </div>
  );
}