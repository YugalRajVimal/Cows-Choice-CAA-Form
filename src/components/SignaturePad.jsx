// import { useRef } from "react";
// import SignatureCanvas from "react-signature-canvas";

// export default function SignaturePad({ onChange }) {
//   const sigRef = useRef(null);

//   const handleEnd = () => {
//     if (sigRef.current && !sigRef.current.isEmpty()) {
//       const dataUrl = sigRef.current.getTrimmedCanvas().toDataURL("image/png");
//       onChange(dataUrl);
//     }
//   };

//   const handleClear = () => {
//     sigRef.current?.clear();
//     onChange(null);
//   };

//   return (
//     <div className="flex flex-col gap-2">
//       <div className="border border-gray-300 rounded-md bg-white">
//         <SignatureCanvas
//           ref={sigRef}
//           penColor="black"
//           canvasProps={{ className: "w-full h-40 rounded-md" }}
//           onEnd={handleEnd}
//         />
//       </div>
//       <button
//         type="button"
//         onClick={handleClear}
//         className="self-start text-sm text-gray-600 underline hover:text-brand"
//       >
//         Clear signature
//       </button>
//     </div>
//   );
// }


import { useRef, useState } from "react";
import SignatureCanvas from "react-signature-canvas";

export default function SignaturePad({ onChange }) {
  const sigRef = useRef(null);
  const [hasSignature, setHasSignature] = useState(false);

  const handleEnd = () => {
    if (sigRef.current && !sigRef.current.isEmpty()) {
      const dataUrl = sigRef.current.getTrimmedCanvas().toDataURL("image/png");
      setHasSignature(true);
      onChange(dataUrl);
    }
  };

  const handleClear = () => {
    sigRef.current?.clear();
    setHasSignature(false);
    onChange(null);
  };

  return (
    <div className="flex flex-col gap-2.5">
      <div className="relative rounded-xl border-2 border-dashed border-slate-200 bg-white overflow-hidden focus-within:border-brand/60 transition">
        <SignatureCanvas
          ref={sigRef}
          penColor="#0f172a"
          canvasProps={{ className: "w-full h-40 rounded-xl touch-none" }}
          onEnd={handleEnd}
        />
        {!hasSignature && (
          <div className="pointer-events-none absolute inset-0 flex items-end justify-center pb-4">
            <span className="text-xs text-slate-300 font-medium tracking-wide">Sign above this line</span>
          </div>
        )}
      </div>
      <div className="flex items-center justify-between">
        <span className="text-xs text-slate-400">
          {hasSignature ? "Signature captured" : "Draw your signature using mouse or touch"}
        </span>
        <button
          type="button"
          onClick={handleClear}
          className="text-xs font-semibold text-slate-500 hover:text-brand transition inline-flex items-center gap-1"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-3.5 w-3.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h5M20 20v-5h-5M4.5 9.5a8 8 0 0 1 13.9-3M19.5 14.5a8 8 0 0 1-13.9 3" />
          </svg>
          Clear
        </button>
      </div>
    </div>
  );
}