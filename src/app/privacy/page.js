export const metadata = {
  title: "سياسة الخصوصية | Mike Wolf",
  description:
    "سياسة الخصوصية الخاصة بتطبيق ومنصة Mike Wolf.",
};

export default function PrivacyPage() {
  return (
    <main
      dir="rtl"
      className="relative min-h-screen overflow-hidden bg-[#050505] px-5 py-12 text-white sm:px-6 lg:px-8"
    >
      <Background />

      <div className="relative z-10 mx-auto max-w-4xl">
        <header className="text-center">
          <div className="mx-auto flex h-28 w-28 items-center justify-center overflow-hidden rounded-[30px] border border-orange-400/30 bg-white/5 shadow-[0_0_50px_rgba(249,115,22,.28)]">
            <img
              src="/mike-wolf-logo.gif"
              alt="Mike Wolf Logo"
              className="h-full w-full object-contain p-1"
            />
          </div>

          <p className="mt-6 text-xs font-bold tracking-[0.35em] text-orange-400">
            MIKE WOLF
          </p>

          <h1 className="mt-3 text-3xl font-black text-white sm:text-5xl">
            سياسة الخصوصية
          </h1>

          <p className="mx-auto mt-5 max-w-2xl leading-8 text-gray-400">
            توضح هذه السياسة كيفية جمع معلومات المستخدمين واستخدامها
            وحمايتها عند استخدام تطبيق وموقع Mike Wolf.
          </p>

          <p className="mt-3 text-sm text-gray-500">
            آخر تحديث: 1 أغسطس 2026
          </p>
        </header>

        <section className="mt-10 space-y-6">
          <PolicySection title="1. مقدمة">
            <p>
              تحترم WOLF MIND LLC خصوصية مستخدمي Mike Wolf، ونلتزم
              بالتعامل مع المعلومات الشخصية بصورة آمنة ومسؤولة.
              باستخدامك للخدمة، فإنك تقر بقراءة هذه السياسة وفهمها.
            </p>
          </PolicySection>

          <PolicySection title="2. المعلومات التي نجمعها">
            <p>
              قد نجمع المعلومات التي تقدمها عند إنشاء الحساب أو استخدام
              التطبيق، ومنها الاسم، البريد الإلكتروني، رقم الهاتف عند
              استخدام تسجيل الدخول بالهاتف، تاريخ الميلاد، الجنس، الدولة،
              صورة الملف الشخصي، النبذة الشخصية، ومعلومات الحساب الأخرى.
            </p>

            <p>
              قد نجمع أيضًا معلومات الاستخدام، مثل وقت تسجيل الدخول،
              التفاعلات، الغرف الصوتية، الرسائل، المنشورات، التعليقات،
              الهدايا الافتراضية، البلاغات، وإعدادات التطبيق.
            </p>

            <p>
              قد تُجمع معلومات تقنية مثل نوع الجهاز، نظام التشغيل،
              معرفات التطبيق والجهاز، عنوان IP، سجلات الأعطال، رموز
              الإشعارات، وبيانات الأداء والأمان.
            </p>
          </PolicySection>

          <PolicySection title="3. كيفية استخدام المعلومات">
            <p>
              نستخدم المعلومات لإنشاء الحسابات وإدارتها، وتشغيل الغرف
              الصوتية والدردشة، وعرض الملفات الشخصية، وتحسين أداء
              التطبيق، وتوفير الإشعارات، ومنع الاحتيال وإساءة الاستخدام،
              وتنفيذ سياسات المجتمع، وتقديم الدعم الفني.
            </p>
          </PolicySection>

          <PolicySection title="4. المحتوى الذي ينشئه المستخدم">
            <p>
              قد ينشر المستخدمون محتوى مثل الصور والمنشورات والتعليقات
              والرسائل والمعلومات الشخصية. قد يكون بعض هذا المحتوى
              ظاهرًا للمستخدمين الآخرين حسب إعدادات الخصوصية وطبيعة
              الميزة المستخدمة.
            </p>
          </PolicySection>

          <PolicySection title="5. خدمات الجهات الخارجية">
            <p>
              يعتمد Mike Wolf على خدمات تقنية من جهات خارجية، وقد تشمل
              Firebase Authentication وCloud Firestore وFirebase Storage
              وFirebase Cloud Messaging وخدمات الصوت والتحليلات
              والحماية من الأعطال.
            </p>

            <p>
              قد تعالج هذه الجهات بعض البيانات وفق سياسات الخصوصية
              الخاصة بها وبالقدر اللازم لتقديم خدماتها.
            </p>
          </PolicySection>

          <PolicySection title="6. تسجيل الدخول عبر جهات خارجية">
            <p>
              عند تسجيل الدخول باستخدام مزود خارجي مثل X أو Apple أو
              Huawei، قد نتلقى معلومات أساسية يسمح بها المستخدم، مثل
              الاسم والبريد الإلكتروني وصورة الحساب ومعرف المزود.
            </p>
          </PolicySection>

          <PolicySection title="7. تخزين البيانات وأمانها">
            <p>
              نستخدم تدابير تقنية وتنظيمية مناسبة لحماية البيانات من
              الوصول غير المصرح به أو التعديل أو الفقدان أو الإفصاح.
              ومع ذلك، لا توجد وسيلة تخزين أو نقل إلكتروني آمنة بنسبة
              مئة بالمئة.
            </p>
          </PolicySection>

          <PolicySection title="8. مشاركة المعلومات">
            <p>
              لا نبيع المعلومات الشخصية للمستخدمين. قد نشارك المعلومات
              مع مزودي الخدمات الذين يساعدوننا في تشغيل التطبيق، أو
              عندما يكون ذلك مطلوبًا قانونيًا، أو لحماية المستخدمين
              والمنصة من الاحتيال أو الضرر أو إساءة الاستخدام.
            </p>
          </PolicySection>

          <PolicySection title="9. العملات والهدايا والمشتريات">
            <p>
              قد يوفر التطبيق عملات رقمية وهدايا واشتراكات أو مزايا
              افتراضية. لا تمثل هذه العناصر أموالًا حقيقية ولا تمنح
              المستخدم حقًا ماليًا خارج التطبيق، ما لم يرد نص صريح
              بخلاف ذلك.
            </p>

            <p>
              قد تتم معالجة المشتريات من خلال Google Play أو App Store
              أو Huawei AppGallery، وتخضع عمليات الدفع لسياسات المتجر
              المستخدم.
            </p>
          </PolicySection>

          <PolicySection title="10. مدة الاحتفاظ بالبيانات">
            <p>
              نحتفظ بالمعلومات للمدة اللازمة لتشغيل الخدمة وتنفيذ
              الالتزامات القانونية وحل النزاعات ومنع الاحتيال. قد
              نحتفظ ببعض السجلات بعد حذف الحساب عندما يكون ذلك ضروريًا
              لأسباب قانونية أو أمنية.
            </p>
          </PolicySection>

          <PolicySection title="11. حقوق المستخدم">
            <p>
              يمكن للمستخدم طلب الوصول إلى معلوماته أو تحديثها أو حذف
              حسابه وبياناته، مع مراعاة القيود القانونية والأمنية.
              يمكن تعديل بعض المعلومات مباشرة من إعدادات الحساب داخل
              التطبيق.
            </p>
          </PolicySection>

          <PolicySection title="12. حذف الحساب">
            <p>
              يمكن للمستخدم طلب حذف حسابه من داخل التطبيق عند توفر
              الميزة، أو من خلال التواصل معنا. قد يستغرق تنفيذ الطلب
              مدة معقولة للتحقق من الهوية ومعالجة البيانات المرتبطة.
            </p>
          </PolicySection>

          <PolicySection title="13. خصوصية القاصرين">
            <p>
              الخدمة مخصصة للمستخدمين بعمر 18 عامًا أو أكثر. لا نستهدف
              الأطفال عمدًا، وإذا علمنا بجمع بيانات شخص دون السن
              المسموح، فقد نتخذ خطوات لحذف الحساب والبيانات المرتبطة.
            </p>
          </PolicySection>

          <PolicySection title="14. الإشعارات">
            <p>
              قد نرسل إشعارات متعلقة بالحساب والرسائل والغرف والأمان
              والعروض والميزات الجديدة. يمكن للمستخدم التحكم في بعض
              الإشعارات من إعدادات الجهاز أو التطبيق.
            </p>
          </PolicySection>

          <PolicySection title="15. التعديلات على السياسة">
            <p>
              قد نحدّث سياسة الخصوصية من وقت إلى آخر. سيتم نشر النسخة
              المحدثة في هذه الصفحة مع تعديل تاريخ آخر تحديث. استمرار
              استخدام الخدمة بعد التحديث يعني الاطلاع على السياسة
              المعدلة.
            </p>
          </PolicySection>

          <PolicySection title="16. التواصل معنا">
            <p>
              للاستفسارات المتعلقة بالخصوصية أو طلبات الوصول أو الحذف،
              يمكن التواصل مع WOLF MIND LLC عبر البريد الإلكتروني
              الرسمي المنشور في موقع Mike Wolf.
            </p>
          </PolicySection>
        </section>

        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <a
            href="/"
            className="rounded-2xl border border-white/10 bg-white/[0.05] px-6 py-3 font-bold text-white transition hover:border-orange-400/30 hover:text-orange-300"
          >
            العودة إلى الرئيسية
          </a>

          <a
            href="https://mike-wolf-terms.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-2xl bg-gradient-to-r from-orange-500 to-red-500 px-6 py-3 font-bold text-white shadow-[0_0_30px_rgba(249,115,22,.25)] transition hover:scale-[1.02]"
          >
            الشروط والأحكام
          </a>
        </div>

        <footer className="mt-12 border-t border-white/10 py-8 text-center text-sm text-gray-600">
          © 2026 Mike Wolf — WOLF MIND LLC. جميع الحقوق محفوظة.
        </footer>
      </div>
    </main>
  );
}

function PolicySection({ title, children }) {
  return (
    <article className="rounded-[28px] border border-white/10 bg-white/[0.035] p-6 shadow-[0_20px_70px_rgba(0,0,0,.3)] backdrop-blur-xl sm:p-8">
      <h2 className="text-xl font-black text-orange-300 sm:text-2xl">
        {title}
      </h2>

      <div className="mt-4 space-y-4 leading-8 text-gray-400">
        {children}
      </div>
    </article>
  );
}

function Background() {
  return (
    <div className="pointer-events-none absolute inset-0">
      <div className="absolute -left-40 -top-40 h-[430px] w-[430px] rounded-full bg-orange-500/15 blur-[140px]" />

      <div className="absolute -bottom-40 -right-40 h-[430px] w-[430px] rounded-full bg-red-500/15 blur-[140px]" />

      <div className="absolute left-1/2 top-1/2 h-[360px] w-[360px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.035] blur-[120px]" />

      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `
            linear-gradient(
              rgba(255,255,255,.2) 1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              rgba(255,255,255,.2) 1px,
              transparent 1px
            )
          `,
          backgroundSize: "42px 42px",
        }}
      />
    </div>
  );
}