export default function HomeHero() {
  return (
    <section className="relative z-10 flex min-h-screen items-center justify-center px-6">
      <div className="text-center">
        {/* الشعار */}
        <div className="mx-auto flex h-52 w-52 items-center justify-center overflow-hidden rounded-[48px] border border-orange-400/30 bg-white/[0.04] shadow-[0_0_90px_rgba(249,115,22,.30)] backdrop-blur-xl sm:h-64 sm:w-64">
          <img
            src="/mike-wolf-logo.gif"
            alt="Mike Wolf"
            className="h-full w-full object-contain p-2"
          />
        </div>

        {/* اسم التطبيق */}
        <h1 className="mt-8 bg-gradient-to-r from-gray-200 via-white to-orange-400 bg-clip-text text-4xl font-black tracking-[0.22em] text-transparent sm:text-6xl">
          MIKE WOLF
        </h1>

        {/* الخط البرتقالي */}
        <div className="mx-auto mt-5 h-[2px] w-32 bg-gradient-to-r from-transparent via-orange-500 to-transparent shadow-[0_0_18px_rgba(249,115,22,.9)]" />

        {/* الوصف */}
        <p
          dir="rtl"
          className="mx-auto mt-6 max-w-2xl text-base leading-8 text-gray-400 sm:text-lg"
        >
          مرحبًا بك في عالم <span className="font-bold text-orange-400">Mike Wolf</span>.
          منصة متكاملة للغرف الصوتية، الدردشة، الترفيه، والتواصل مع الأصدقاء
          بتجربة حديثة وآمنة.
        </p>
      </div>
    </section>
  );
}