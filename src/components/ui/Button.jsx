import Spinner from "./Spinner";

const variants = {
  primary:
    "bg-brand text-white shadow-sm shadow-brand/30 hover:bg-brand-dark hover:shadow-md hover:shadow-brand/30 focus-visible:ring-brand/40 disabled:hover:bg-brand",
  secondary:
    "bg-white text-slate-700 border border-slate-200 shadow-sm hover:border-slate-300 hover:bg-slate-50 focus-visible:ring-slate-300",
  ghost:
    "bg-transparent text-slate-600 hover:bg-slate-100 focus-visible:ring-slate-300",
  danger:
    "bg-white text-red-600 border border-red-200 hover:bg-red-50 focus-visible:ring-red-300",
};

const sizes = {
  sm: "text-xs px-3 py-1.5 rounded-lg",
  md: "text-sm px-4 py-2.5 rounded-xl",
  lg: "text-sm px-6 py-3 rounded-xl",
};

export default function Button({
  as: Component = "button",
  variant = "primary",
  size = "md",
  loading = false,
  loadingText,
  disabled,
  className = "",
  children,
  ...props
}) {
  return (
    <Component
      disabled={disabled || loading}
      className={`inline-flex items-center justify-center gap-2 font-semibold tracking-tight transition-all duration-150 focus-visible:outline-none focus-visible:ring-4 disabled:opacity-60 disabled:cursor-not-allowed ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {loading ? (
        <>
          <Spinner className="h-4 w-4" />
          {loadingText || children}
        </>
      ) : (
        children
      )}
    </Component>
  );
}
