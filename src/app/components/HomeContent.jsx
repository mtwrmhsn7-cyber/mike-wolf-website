export default function HomeContent() {
  return (
    <div
      dir="rtl"
      className="relative z-10 pb-24"
    >
      <AboutSection />
      <FeaturesSection />
      <VoiceRoomsSection />
      <EntertainmentSection />
      <DownloadSection />
      <FooterSection />
    </div>
  );
}

function SectionHeading({
  badge,
  title,
  description,
}) {
  return (
    <div className="mx-auto mb-12 max-w-3xl text-center">
      <span className="inline-flex rounded-full border border-orange-400/20 bg-orange-500/10 px-5 py-2 text-sm font-bold text-orange-300">
        {badge}
      </span>

      <h2 className="mt-5 bg-gradient-to-l from-white via-gray-200 to-orange-400 bg-clip-text text-3xl font-black text-transparent sm:text-4xl lg:text-5xl">
        {title}
      </h2>

      <p className="mx-auto mt-5 max-w-2xl text-sm leading-8 text-gray-400 sm:text-base">
        {description}
      </p>
    </div>
  );
}

function AboutSection() {
  return (
    <section className="px-5 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          badge="عن التطبيق"
          title="عالم متكامل للتواصل والترفيه"
          description="Mike Wolf يجمع الغرف الصوتية والدردشة والتفاعل الاجتماعي في تجربة حديثة وسهلة الاستخدام."
        />

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-[34px] border border-white/10 bg-white/[0.035] p-7 shadow-[0_30px_100px_rgba(0,0,0,.4)] backdrop-blur-2xl sm:p-10">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-orange-400/25 bg-orange-500/10 text-orange-300">
              <ChatIcon />
            </div>

            <h3 className="mt-6 text-2xl font-black text-white">
              تواصل بدون حدود
            </h3>

            <p className="mt-4 leading-8 text-gray-400">
              ادخل الغرف الصوتية، تعرف على أصدقاء جدد، وتفاعل مع مجتمع متنوع
              ضمن بيئة منظمة وآمنة.
            </p>
          </div>

          <div className="rounded-[34px] border border-white/10 bg-white/[0.035] p-7 shadow-[0_30px_100px_rgba(0,0,0,.4)] backdrop-blur-2xl sm:p-10">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-orange-400/25 bg-orange-500/10 text-orange-300">
              <ShieldIcon />
            </div>

            <h3 className="mt-6 text-2xl font-black text-white">
              تجربة منظمة وآمنة
            </h3>

            <p className="mt-4 leading-8 text-gray-400">
              يوفر التطبيق أدوات للإشراف والإبلاغ والحظر للحفاظ على مجتمع
              محترم ومناسب للمستخدمين.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function FeaturesSection() {
  const features = [
    {
      title: "غرف صوتية",
      description:
        "استمتع بمحادثات صوتية مباشرة مع الأصدقاء والمستخدمين.",
      icon: <MicIcon />,
    },
    {
      title: "دردشة ومنشورات",
      description:
        "شارك الرسائل والمنشورات والتعليقات وتفاعل مع المجتمع.",
      icon: <ChatIcon />,
    },
    {
      title: "هدايا وعملات",
      description:
        "أرسل الهدايا الافتراضية واستفد من نظام العملات داخل التطبيق.",
      icon: <GiftIcon />,
    },
    {
      title: "عضويات VIP",
      description:
        "مزايا مميزة وتجربة خاصة للمستخدمين أصحاب العضويات.",
      icon: <CrownIcon />,
    },
    {
      title: "ألعاب ترفيهية",
      description:
        "استمتع بألعاب وأنشطة خفيفة داخل التطبيق.",
      icon: <GameIcon />,
    },
    {
      title: "ملف شخصي",
      description:
        "أنشئ هويتك الخاصة وعدّل اسمك وصورتك ومعلومات حسابك.",
      icon: <UserIcon />,
    },
  ];

  return (
    <section className="px-5 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          badge="المميزات"
          title="كل ما تحتاجه في مكان واحد"
          description="مجموعة من المميزات المصممة لتقديم تجربة ترفيهية واجتماعية متكاملة."
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <article
              key={feature.title}
              className="group rounded-[30px] border border-white/10 bg-white/[0.03] p-6 shadow-[0_20px_70px_rgba(0,0,0,.3)] backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-orange-400/25 hover:bg-white/[0.05]"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-orange-400/20 bg-orange-500/10 text-orange-300 transition group-hover:scale-105">
                {feature.icon}
              </div>

              <h3 className="mt-5 text-xl font-black text-white">
                {feature.title}
              </h3>

              <p className="mt-3 leading-7 text-gray-400">
                {feature.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function VoiceRoomsSection() {
  return (
    <section className="px-5 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="overflow-hidden rounded-[38px] border border-white/10 bg-gradient-to-l from-orange-500/10 via-white/[0.03] to-red-500/10 p-7 shadow-[0_30px_100px_rgba(0,0,0,.45)] backdrop-blur-2xl sm:p-10 lg:p-12">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div>
              <span className="inline-flex rounded-full border border-orange-400/20 bg-orange-500/10 px-5 py-2 text-sm font-bold text-orange-300">
                الغرف الصوتية
              </span>

              <h2 className="mt-5 text-3xl font-black text-white sm:text-4xl">
                اجتمع، تحدث، واستمتع
              </h2>

              <p className="mt-5 leading-8 text-gray-400">
                صمم Mike Wolf ليقدم تجربة غرف صوتية سلسة، مع إمكانية إدارة
                المقاعد والمشرفين والتفاعل بين أعضاء الغرفة.
              </p>

              <div className="mt-7 space-y-4">
                <FeatureRow text="إدارة مرنة للغرف والمشرفين" />
                <FeatureRow text="مقاعد صوتية وتفاعل مباشر" />
                <FeatureRow text="أدوات حماية وإبلاغ داخل التطبيق" />
              </div>
            </div>

            <div className="relative mx-auto flex h-72 w-full max-w-md items-center justify-center rounded-[32px] border border-orange-400/20 bg-black/30 shadow-[0_0_70px_rgba(249,115,22,.15)]">
              <div className="absolute h-44 w-44 rounded-full bg-orange-500/15 blur-[55px]" />

              <div className="relative grid grid-cols-3 gap-4">
                {Array.from({ length: 6 }).map((_, index) => (
                  <div
                    key={index}
                    className="flex h-16 w-16 items-center justify-center rounded-full border border-white/10 bg-white/[0.05] text-orange-300 backdrop-blur-xl"
                  >
                    <MicIcon />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function EntertainmentSection() {
  return (
    <section className="px-5 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          badge="الترفيه"
          title="هدايا، ألعاب، ومزايا خاصة"
          description="استمتع بمحتوى ترفيهي متنوع داخل التطبيق ضمن تجربة اجتماعية متكاملة."
        />

        <div className="grid gap-6 md:grid-cols-3">
          <EntertainmentCard
            icon={<GiftIcon />}
            title="الهدايا"
            text="أرسل هدايا افتراضية مميزة لأصدقائك داخل الغرف."
          />

          <EntertainmentCard
            icon={<GameIcon />}
            title="الألعاب"
            text="مجموعة ألعاب خفيفة للمتعة والتفاعل داخل التطبيق."
          />

          <EntertainmentCard
            icon={<CrownIcon />}
            title="VIP"
            text="مزايا وخصائص إضافية تمنحك تجربة استخدام مختلفة."
          />
        </div>
      </div>
    </section>
  );
}

function DownloadSection() {
  return (
    <section className="px-5 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="rounded-[38px] border border-orange-400/20 bg-gradient-to-l from-orange-500/15 to-red-500/10 p-8 text-center shadow-[0_30px_110px_rgba(0,0,0,.5)] backdrop-blur-2xl sm:p-12">
          <div className="mx-auto flex h-24 w-24 items-center justify-center overflow-hidden rounded-[28px] border border-orange-400/30 bg-white/5 shadow-[0_0_45px_rgba(249,115,22,.25)]">
            <img
              src="/mike-wolf-logo.gif"
              alt="Mike Wolf Logo"
              className="h-full w-full object-contain p-1"
            />
          </div>

          <h2 className="mt-6 text-3xl font-black text-white sm:text-4xl">
            حمّل Mike Wolf
          </h2>

          <p className="mx-auto mt-4 max-w-2xl leading-8 text-gray-300">
            التطبيق سيكون متوفرًا على المتاجر الرسمية. سنضيف روابط التحميل
            فور نشره.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <StoreButton label="Google Play" />
            <StoreButton label="App Store" />
            <StoreButton label="Huawei AppGallery" />
          </div>
        </div>
      </div>
    </section>
  );
}

function FooterSection() {
  return (
    <footer className="px-5 pt-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl border-t border-white/10 py-8">
        <div className="flex flex-col items-center justify-between gap-5 text-center sm:flex-row sm:text-right">
          <div>
            <p className="font-black tracking-[0.2em] text-white">
              MIKE WOLF
            </p>

            <p className="mt-2 text-sm text-gray-500">
              منصة اجتماعية وترفيهية للغرف الصوتية والدردشة.
            </p>
          </div>

          <p className="text-sm text-gray-600">
            © 2026 Mike Wolf. جميع الحقوق محفوظة.
          </p>
        </div>
      </div>
    </footer>
  );
}

function FeatureRow({ text }) {
  return (
    <div className="flex items-center gap-3">
      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-orange-400/20 bg-orange-500/10 text-orange-300">
        ✓
      </span>

      <p className="text-sm text-gray-300 sm:text-base">
        {text}
      </p>
    </div>
  );
}

function EntertainmentCard({
  icon,
  title,
  text,
}) {
  return (
    <article className="rounded-[30px] border border-white/10 bg-white/[0.03] p-7 text-center shadow-[0_20px_70px_rgba(0,0,0,.3)] backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-orange-400/25">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-orange-400/20 bg-orange-500/10 text-orange-300">
        {icon}
      </div>

      <h3 className="mt-5 text-xl font-black text-white">
        {title}
      </h3>

      <p className="mt-3 leading-7 text-gray-400">
        {text}
      </p>
    </article>
  );
}

function StoreButton({ label }) {
  return (
    <button
      type="button"
      disabled
      className="cursor-not-allowed rounded-2xl border border-white/10 bg-black/30 px-6 py-4 font-bold text-gray-500"
    >
      {label}
    </button>
  );
}

function MicIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7">
      <rect
        x="9"
        y="3"
        width="6"
        height="11"
        rx="3"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M5 11C5 15 8 18 12 18C16 18 19 15 19 11"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M12 18V22"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ChatIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7">
      <path
        d="M5 5H19V16H10L5 20V5Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function GiftIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7">
      <path
        d="M4 9H20V20H4V9Z"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M12 9V20"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M3 6H21V10H3V6Z"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M12 6C10 6 8 5 8 3.5C8 2.5 9 2 10 2C11.5 2 12 4 12 6Z"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M12 6C14 6 16 5 16 3.5C16 2.5 15 2 14 2C12.5 2 12 4 12 6Z"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
  );
}

function CrownIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7">
      <path
        d="M4 8L8 12L12 5L16 12L20 8L18 18H6L4 8Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function GameIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7">
      <path
        d="M7 8H17C20 8 22 11 21 14L20 17C19.5 19 17 19.5 15.5 18L13.5 16H10.5L8.5 18C7 19.5 4.5 19 4 17L3 14C2 11 4 8 7 8Z"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M8 11V15M6 13H10"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="16.5" cy="12" r="1" fill="currentColor" />
      <circle cx="18.5" cy="14" r="1" fill="currentColor" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7">
      <circle
        cx="12"
        cy="8"
        r="4"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M4 21C4 16.5 7.5 14 12 14C16.5 14 20 16.5 20 21"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7">
      <path
        d="M12 3L20 6V11C20 16 17 20 12 22C7 20 4 16 4 11V6L12 3Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M9 12L11 14L15 10"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}