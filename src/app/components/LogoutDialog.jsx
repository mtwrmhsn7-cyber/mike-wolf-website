"use client";

export default function LogoutDialog({
  open,
  loading = false,
  error = "",
  onClose,
  onConfirm,
}) {
  if (!open) return null;

  function handleBackdropClick(event) {
    if (event.target === event.currentTarget && !loading) {
      onClose();
    }
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/75 px-5 backdrop-blur-md"
      onMouseDown={handleBackdropClick}
    >
      <section
        dir="rtl"
        role="dialog"
        aria-modal="true"
        aria-labelledby="logout-dialog-title"
        className="relative w-full max-w-sm overflow-hidden rounded-[30px] border border-white/10 bg-[#0b0b0b]/95 p-7 shadow-[0_30px_120px_rgba(0,0,0,.75)]"
      >
        {/* التوهج */}
        <div className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-red-500/15 blur-[80px]" />

        <div className="relative">
          {/* الأيقونة */}
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-[24px] border border-red-400/25 bg-red-500/10 text-red-300 shadow-[0_0_40px_rgba(239,68,68,.18)]">
            <LogoutIcon className="h-10 w-10" />
          </div>

          {/* النص */}
          <div className="mt-6 text-center">
            <h2
              id="logout-dialog-title"
              className="text-2xl font-black text-white"
            >
              تسجيل الخروج
            </h2>

            <p className="mt-3 text-sm leading-7 text-gray-400">
              هل أنت متأكد من تسجيل الخروج من حسابك؟
            </p>
          </div>

          {/* رسالة الخطأ */}
          {error && (
            <div
              role="alert"
              className="mt-5 rounded-2xl border border-red-500/25 bg-red-500/10 px-4 py-3 text-center text-sm leading-6 text-red-300"
            >
              {error}
            </div>
          )}

          {/* الأزرار */}
          <div className="mt-7 grid grid-cols-2 gap-3">
            <button
              type="button"
              disabled={loading}
              onClick={onClose}
              className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4 font-bold text-gray-300 transition duration-300 hover:border-white/20 hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-50"
            >
              إلغاء
            </button>

            <button
              type="button"
              disabled={loading}
              onClick={onConfirm}
              className="flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-red-600 to-orange-600 px-5 py-4 font-black text-white shadow-[0_0_30px_rgba(239,68,68,.25)] transition duration-300 hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading && (
                <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
              )}

              {loading ? "جاري الخروج..." : "تسجيل الخروج"}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

function LogoutIcon({ className = "h-6 w-6" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M10 17L15 12L10 7"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <path
        d="M15 12H3"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />

      <path
        d="M14 4H18C19.1046 4 20 4.89543 20 6V18C20 19.1046 19.1046 20 18 20H14"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}