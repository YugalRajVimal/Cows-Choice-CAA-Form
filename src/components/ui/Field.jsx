export function Label({ children, required }) {
  return (
    <label className="text-[13px] font-semibold text-slate-700">
      {children} {required && <span className="text-brand">*</span>}
    </label>
  );
}

export function TextInput({ label, required, className = "", ...props }) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && <Label required={required}>{label}</Label>}
      <input
        required={required}
        className={`w-full border border-slate-200 bg-white rounded-xl px-3.5 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 shadow-sm transition focus:outline-none focus:ring-4 focus:ring-brand/15 focus:border-brand ${className}`}
        {...props}
      />
    </div>
  );
}

export function Alert({ type = "error", children }) {
  const styles = {
    error: "bg-red-50 border-red-200 text-red-700",
    success: "bg-emerald-50 border-emerald-200 text-emerald-700",
    info: "bg-sky-50 border-sky-200 text-sky-700",
    warning: "bg-amber-50 border-amber-200 text-amber-800",
  };
  const icons = {
    error: (
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v4m0 4h.01M10.29 3.86l-8.18 14.14A1.5 1.5 0 0 0 3.5 20.5h17a1.5 1.5 0 0 0 1.39-2.5L13.71 3.86a1.5 1.5 0 0 0-2.42 0Z" />
    ),
    success: <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />,
    info: <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v.01M11 12h1v5h1" />,
    warning: (
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v4m0 4h.01M10.29 3.86l-8.18 14.14A1.5 1.5 0 0 0 3.5 20.5h17a1.5 1.5 0 0 0 1.39-2.5L13.71 3.86a1.5 1.5 0 0 0-2.42 0Z" />
    ),
  };
  return (
    <div className={`flex items-start gap-2.5 border text-sm rounded-xl px-4 py-3 ${styles[type]}`} role="status">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-4 w-4 mt-0.5 shrink-0">
        {icons[type]}
      </svg>
      <span>{children}</span>
    </div>
  );
}

export function Card({ children, className = "" }) {
  return (
    <div className={`bg-white rounded-2xl border border-slate-200/70 shadow-[0_1px_2px_rgba(15,23,42,0.04),0_12px_32px_-16px_rgba(15,23,42,0.12)] ${className}`}>
      {children}
    </div>
  );
}

export function SectionHeading({ eyebrow, title, children }) {
  return (
    <div className="mb-5 flex items-end justify-between gap-4 border-b border-slate-100 pb-3">
      <div>
        {eyebrow && (
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-brand/70 mb-1">{eyebrow}</p>
        )}
        <h3 className="text-base font-bold text-slate-900">{title}</h3>
      </div>
      {children}
    </div>
  );
}

export function Badge({ children, tone = "slate" }) {
  const tones = {
    slate: "bg-slate-100 text-slate-700",
    yellow: "bg-amber-100 text-amber-800",
    blue: "bg-sky-100 text-sky-800",
    orange: "bg-orange-100 text-orange-800",
    green: "bg-emerald-100 text-emerald-800",
  };
  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold tracking-wide ${tones[tone]}`}>
      {children}
    </span>
  );
}
