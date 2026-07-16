import { useRef } from "react";
import SignatureCanvas from "react-signature-canvas";

export default function SignaturePad({ onChange }) {
  const sigRef = useRef(null);

  const handleEnd = () => {
    if (sigRef.current && !sigRef.current.isEmpty()) {
      const dataUrl = sigRef.current.getTrimmedCanvas().toDataURL("image/png");
      onChange(dataUrl);
    }
  };

  const handleClear = () => {
    sigRef.current?.clear();
    onChange(null);
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="border border-gray-300 rounded-md bg-white">
        <SignatureCanvas
          ref={sigRef}
          penColor="black"
          canvasProps={{ className: "w-full h-40 rounded-md" }}
          onEnd={handleEnd}
        />
      </div>
      <button
        type="button"
        onClick={handleClear}
        className="self-start text-sm text-gray-600 underline hover:text-brand"
      >
        Clear signature
      </button>
    </div>
  );
}
