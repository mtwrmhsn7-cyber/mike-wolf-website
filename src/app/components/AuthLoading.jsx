export default function AuthLoading() {
  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-[#050505]">
      <div className="text-center">
        <div className="mx-auto flex h-28 w-28 items-center justify-center overflow-hidden rounded-[30px] border border-orange-400/30 bg-white/5 shadow-[0_0_45px_rgba(249,115,22,.25)]">
          <img
            src="/mike-wolf-logo.gif"
            alt="Mike Wolf"
            className="h-full w-full object-contain p-1"
          />
        </div>

        <div className="mt-8 flex justify-center">
          <span className="h-10 w-10 animate-spin rounded-full border-4 border-white/20 border-t-orange-500" />
        </div>

        <p className="mt-6 text-lg font-bold text-white">
          جاري التحميل...
        </p>

        <p className="mt-2 text-sm text-gray-500">
          يرجى الانتظار
        </p>
      </div>
    </div>
  );
}