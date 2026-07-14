"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "@/lib/firebase";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();

    if (loading) return;

    setErrorMessage("");

    if (!email.trim()) {
      setErrorMessage("يرجى إدخال البريد الإلكتروني.");
      return;
    }

    if (!password.trim()) {
      setErrorMessage("يرجى إدخال كلمة المرور.");
      return;
    }

    if (!acceptedTerms) {
      setErrorMessage("يجب الموافقة على الشروط والأحكام أولًا.");
      return;
    }

    try {
      setLoading(true);

      const userCredential =
  await signInWithEmailAndPassword(
    auth,
    email.trim(),
    password,
  );

if (!userCredential.user.emailVerified) {
  await signOut(auth);

  setErrorMessage(
    "يجب تأكيد البريد الإلكتروني قبل تسجيل الدخول. تحقق من صندوق البريد.",
  );

  return;
}

// بعد نجاح تسجيل الدخول والتأكد من البريد
router.replace("/");
    } catch (error) {
      console.error("Firebase login error:", error);

      switch (error.code) {
        case "auth/invalid-email":
          setErrorMessage("صيغة البريد الإلكتروني غير صحيحة.");
          break;

        case "auth/user-disabled":
          setErrorMessage("تم تعطيل هذا الحساب من قبل الإدارة.");
          break;

        case "auth/invalid-credential":
        case "auth/wrong-password":
        case "auth/user-not-found":
          setErrorMessage(
            "البريد الإلكتروني أو كلمة المرور غير صحيحة.",
          );
          break;

        case "auth/too-many-requests":
          setErrorMessage(
            "تم إجراء محاولات كثيرة. انتظر قليلًا ثم حاول مرة أخرى.",
          );
          break;

        case "auth/network-request-failed":
          setErrorMessage(
            "تعذر الاتصال بالإنترنت. تحقق من اتصالك وحاول مرة أخرى.",
          );
          break;

        case "auth/operation-not-allowed":
          setErrorMessage(
            "تسجيل الدخول بالبريد الإلكتروني غير مفعّل حاليًا.",
          );
          break;

        default:
          setErrorMessage(
            "حدث خطأ أثناء تسجيل الدخول. حاول مرة أخرى.",
          );
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <main
      dir="rtl"
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#050505] px-5 py-10"
    >
      {/* خلفية الصفحة */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-40 -top-40 h-[430px] w-[430px] rounded-full bg-orange-500/15 blur-[140px]" />

        <div className="absolute -bottom-40 -right-40 h-[430px] w-[430px] rounded-full bg-red-500/15 blur-[140px]" />

        <div className="absolute left-1/2 top-1/2 h-[350px] w-[350px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.04] blur-[120px]" />

        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,.2) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,.2) 1px, transparent 1px)
            `,
            backgroundSize: "42px 42px",
          }}
        />
      </div>

      {/* زر الرجوع */}
      <Link
        href="/"
        aria-label="الرجوع إلى الصفحة الرئيسية"
        className="absolute left-5 top-5 z-20 flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-black/40 text-2xl text-white shadow-lg backdrop-blur-xl transition duration-300 hover:border-orange-400/40 hover:bg-white/[0.06] hover:text-orange-300"
      >
        ←
      </Link>

      {/* بطاقة تسجيل الدخول */}
      <section className="relative z-10 w-full max-w-md overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.035] p-7 shadow-[0_30px_100px_rgba(0,0,0,.55)] backdrop-blur-2xl sm:p-9">
        {/* توهج داخل البطاقة */}
        <div className="pointer-events-none absolute -right-24 -top-24 h-56 w-56 rounded-full bg-orange-500/10 blur-[90px]" />

        <div className="relative">
          {/* الشعار */}
          <div className="mx-auto flex h-28 w-28 items-center justify-center overflow-hidden rounded-[30px] border border-orange-400/30 bg-white/5 shadow-[0_0_50px_rgba(249,115,22,.28)]">
            <img
              src="/mike-wolf-logo.gif"
              alt="Mike Wolf Logo"
              className="h-full w-full object-contain p-1"
            />
          </div>

          {/* العنوان */}
          <div className="mt-6 text-center">
            <p className="text-xs font-bold tracking-[0.35em] text-orange-400">
              MIKE WOLF
            </p>

            <h1 className="mt-3 text-3xl font-black text-white">
              سجّل دخول بحسابك
            </h1>

            <p className="mt-3 text-sm leading-7 text-gray-400">
              أدخل معلومات حسابك للوصول إلى خدمات Mike Wolf.
            </p>
          </div>

          {/* نموذج تسجيل الدخول */}
          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            {/* البريد الإلكتروني */}
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-bold text-gray-300"
              >
                البريد الإلكتروني
              </label>

              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                value={email}
                disabled={loading}
                onChange={(event) => {
                  setEmail(event.target.value);
                  setErrorMessage("");
                }}
                placeholder="example@email.com"
                className="w-full rounded-2xl border border-white/10 bg-black/35 px-5 py-4 text-left text-white outline-none transition duration-300 placeholder:text-gray-600 focus:border-orange-400/50 focus:ring-4 focus:ring-orange-500/10 disabled:cursor-not-allowed disabled:opacity-60"
              />
            </div>

            {/* كلمة المرور */}
            <div>
              <div className="mb-2 flex items-center justify-between gap-3">
                <label
                  htmlFor="password"
                  className="block text-sm font-bold text-gray-300"
                >
                  كلمة المرور
                </label>

                <Link
                  href="/forgot-password"
                  className="text-xs font-bold text-orange-400 transition hover:text-orange-300"
                >
                  هل نسيت كلمة المرور؟
                </Link>
              </div>

              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  autoComplete="current-password"
                  value={password}
                  disabled={loading}
                  onChange={(event) => {
                    setPassword(event.target.value);
                    setErrorMessage("");
                  }}
                  placeholder="••••••••"
                  className="w-full rounded-2xl border border-white/10 bg-black/35 py-4 pl-14 pr-5 text-left text-white outline-none transition duration-300 placeholder:text-gray-600 focus:border-orange-400/50 focus:ring-4 focus:ring-orange-500/10 disabled:cursor-not-allowed disabled:opacity-60"
                />

                <button
                  type="button"
                  disabled={loading}
                  onClick={() => setShowPassword((value) => !value)}
                  aria-label={
                    showPassword
                      ? "إخفاء كلمة المرور"
                      : "إظهار كلمة المرور"
                  }
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 transition hover:text-orange-400 disabled:opacity-50"
                >
                  {showPassword ? (
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      className="h-6 w-6"
                    >
                      <path
                        d="M3 3L21 21"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />

                      <path
                        d="M10.6 10.6A2 2 0 0013.4 13.4"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />

                      <path
                        d="M9.9 4.3A10.7 10.7 0 0112 4C17.5 4 21 9 21 12C20.5 13.2 19.8 14.3 18.9 15.3"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />

                      <path
                        d="M6.2 6.2C4.6 7.4 3.5 9 3 12C4.5 15.5 7.7 20 12 20C13.2 20 14.3 19.7 15.3 19.2"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                  ) : (
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      className="h-6 w-6"
                    >
                      <path
                        d="M3 12C4.5 8.5 7.7 4 12 4C16.3 4 19.5 8.5 21 12C19.5 15.5 16.3 20 12 20C7.7 20 4.5 15.5 3 12Z"
                        stroke="currentColor"
                        strokeWidth="2"
                      />

                      <circle
                        cx="12"
                        cy="12"
                        r="3"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* رسالة الخطأ */}
            {errorMessage && (
              <div
                role="alert"
                className="rounded-2xl border border-red-500/25 bg-red-500/10 px-4 py-3 text-sm leading-6 text-red-300"
              >
                {errorMessage}
              </div>
            )}

            {/* الموافقة على الشروط */}
            <label className="flex cursor-pointer items-start gap-3 rounded-2xl border border-white/10 bg-black/25 p-4 transition duration-300 hover:border-orange-400/25">
              <input
                type="checkbox"
                checked={acceptedTerms}
                disabled={loading}
                onChange={(event) => {
                  setAcceptedTerms(event.target.checked);
                  setErrorMessage("");
                }}
                className="mt-1 h-5 w-5 shrink-0 accent-orange-500"
              />

              <span className="text-sm leading-7 text-gray-400">
                أوافق على{" "}
                <a
                  href="https://mike-wolf-terms.vercel.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(event) => event.stopPropagation()}
                  className="font-bold text-orange-400 underline decoration-orange-400/40 underline-offset-4 transition hover:text-orange-300"
                >
                  الشروط والأحكام
                </a>
              </span>
            </label>

            {/* زر الدخول */}
            <button
              type="submit"
              disabled={!acceptedTerms || loading}
              className={`flex w-full items-center justify-center gap-3 rounded-2xl px-6 py-4 text-base font-black text-white transition duration-300 ${
                acceptedTerms && !loading
                  ? "bg-gradient-to-r from-orange-500 to-red-500 shadow-[0_0_35px_rgba(249,115,22,.35)] hover:scale-[1.02]"
                  : "cursor-not-allowed bg-white/10 text-white/35"
              }`}
            >
              {loading && (
                <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
              )}

              {loading
                ? "جاري تسجيل الدخول..."
                : "تسجيل الدخول"}
            </button>
          </form>

          {/* إنشاء حساب */}
          <div className="mt-7 text-center">
            <p className="text-sm text-gray-500">
              ليس لديك حساب؟{" "}
              <Link
                href="/register"
                className="font-black text-orange-400 transition hover:text-orange-300"
              >
                إنشاء حساب
              </Link>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}