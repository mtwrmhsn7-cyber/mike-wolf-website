export default function Background() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[#050505]">
      {/* التوهج البرتقالي */}
      <div className="absolute -left-40 -top-40 h-[430px] w-[430px] rounded-full bg-orange-500/15 blur-[140px]" />

      {/* التوهج الأحمر */}
      <div className="absolute -bottom-40 -right-40 h-[430px] w-[430px] rounded-full bg-red-500/15 blur-[140px]" />

      {/* التوهج الفضي */}
      <div className="absolute left-1/2 top-1/2 h-[360px] w-[360px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.045] blur-[120px]" />

      {/* شبكة خفيفة */}
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: `
            linear-gradient(
              rgba(255,255,255,.18) 1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              rgba(255,255,255,.18) 1px,
              transparent 1px
            )
          `,
          backgroundSize: "42px 42px",
        }}
      />

      {/* طبقة تظليل خفيفة */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/5 to-black/40" />
    </div>
  );
}