"use client";

import { useState } from "react";
import Link from "next/link";
import { sendPasswordResetEmail } from "firebase/auth";

import { auth } from "@/lib/firebase";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [emailSent, setEmailSent] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();

    if (loading) return;

    const cleanEmail = email.trim().toLowerCase();

    setErrorMessage("");

    if (!cleanEmail) {
      setErrorMessage("يرجى إدخال البريد الإلكتروني.");
      return;
    }

    try {
      setLoading(true);

      auth.languageCode = "ar";

      await sendPasswordResetEmail(auth, cleanEmail);

      setEmailSent(true);
    } catch (error) {
      console.error("Password reset error:", error);

      switch (error.code) {
        case "auth/invalid-email":
          setErrorMessage("صيغة البريد الإلكتروني غير صحيحة.");
          break;

        case "auth/user-disabled":
          setErrorMessage("تم تعطيل هذا الحساب من قبل الإدارة.");
          break;

        case "auth/too-many-requests":
          setErrorMessage(
            "تم إرسال محاولات كثيرة. انتظر قليلًا ثم حاول مرة أخرى.",
          );
          break;

        case "auth/network-request-failed":
          setErrorMessage(
            "تعذر الاتصال بالإنترنت. تحقق من الشبكة وحاول مرة أخرى.",
          );
          break;

        case "auth/operation-not-allowed":
          setErrorMessage(
            "خدمة استعادة كلمة المرور غير مفعلة حاليًا.",
          );
          break;

        default:
          setErrorMessage(
            "تعذر إرسال رابط إعادة تعيين كلمة المرور. حاول مرة أخرى.",
          );
      }
    } finally {
      setLoading(false);
    }
  }

  if (emailSent) {
    return (
      <main
        dir="rtl"
        className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#050505] px-5 py-10"
      >
        <Background />

        <section className="relative z-10 w-full max-w-md overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.04] p-8 text-center shadow-[0_30px_100px_rgba(0,0,0,.55)] backdrop-blur-2xl">
          <div className="pointer-events-none absolute -right-24 -top-24 h-56 w-56 rounded-full bg-green-500/10 blur-[90px]" />

          <div className="relative">
            <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-[28px] border border-green-400/25 bg-green-500/10 text-green-300 shadow-[0_0_45px_rgba(74,222,128,.18)]">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="h-12 w-12"
              >
                <path
                  d="M4 6.5L12 13L20 6.5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                <rect
                  x="3"
                  y="5"
                  width="18"
                  height="14"
                  rx="3"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </svg>
            </div>

            <p className="mt-6 text-xs font-bold tracking-[0.35em] text-orange-400">
              MIKE WOLF
            </p>

            <h1 className="mt-3 text-3xl font-black text-white">
              تحقق من بريدك
            </h1>

            <p className="mt-4 leading-8 text-gray-400">
              إذا كان البريد مسجلًا لدينا، فقد أرسلنا إليه رابط إعادة تعيين كلمة
              المرور.
            </p>

            <p className="mt-3 break-all font-bold text-orange-300">
              {email.trim().toLowerCase()}
            </p>

            <div className="mt-6 rounded-2xl border border-white/10 bg-black/25 p-4 text-sm leading-7 text-gray-400">
              افتح الرسالة واضغط على رابط إعادة التعيين، ثم اختر كلمة مرور
              جديدة.
            </div>

            <Link
              href="/login"
              className="mt-7 flex w-full items-center justify-center rounded-2xl bg-gradient-to-r from-orange-500 to-red-500 px-6 py-4 font-black text-white shadow-[0_0_35px_rgba(249,115,22,.32)] transition hover:scale-[1.02]"
            >
              الرجوع إلى تسجيل الدخول
            </Link>

            <button
              type="button"
              onClick={() => {
                setEmailSent(false);
                setErrorMessage("");
              }}
              className="mt-4 text-sm font-bold text-gray-500 transition hover:text-orange-300"
            >
              استخدام بريد إلكتروني آخر
            </button>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main
      dir="rtl"
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#050505] px-5 py-10"
    >
      <Background />

      <Link
        href="/login"
        aria-label="الرجوع إلى تسجيل الدخول"
        className="absolute left-5 top-5 z-20 flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-black/40 text-2xl text-white shadow-lg backdrop-blur-xl transition duration-300 hover:border-orange-400/40 hover:bg-white/[0.06] hover:text-orange-300"
      >
        ←
      </Link>

      <section className="relative z-10 w-full max-w-md overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.035] p-7 shadow-[0_30px_100px_rgba(0,0,0,.55)] backdrop-blur-2xl sm:p-9">
        <div className="pointer-events-none absolute -right-24 -top-24 h-56 w-56 rounded-full bg-orange-500/10 blur-[90px]" />

        <div className="relative">
          <div className="mx-auto flex h-28 w-28 items-center justify-center overflow-hidden rounded-[30px] border border-orange-400/30 bg-white/5 shadow-[0_0_50px_rgba(249,115,22,.28)]">
            <img
              src="/mike-wolf-logo.gif"
              alt="Mike Wolf Logo"
              className="h-full w-full object-contain p-1"
            />
          </div>

          <div className="mt-6 text-center">
            <p className="text-xs font-bold tracking-[0.35em] text-orange-400">
              MIKE WOLF
            </p>

            <h1 className="mt-3 text-3xl font-black text-white">
              نسيت كلمة المرور؟
            </h1>

            <p className="mt-3 text-sm leading-7 text-gray-400">
              أدخل بريدك الإلكتروني وسنرسل لك رابطًا لإعادة تعيين كلمة المرور.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <div>
              <label
                htmlFor="reset-email"
                className="mb-2 block text-sm font-bold text-gray-300"
              >
                البريد الإلكتروني
              </label>

              <input
                id="reset-email"
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

            {errorMessage && (
              <div
                role="alert"
                className="rounded-2xl border border-red-500/25 bg-red-500/10 px-4 py-3 text-sm leading-6 text-red-300"
              >
                {errorMessage}
              </div>
            )}

            <button
              type="submit"
              disabled={loading || !email.trim()}
              className={`flex w-full items-center justify-center gap-3 rounded-2xl px-6 py-4 font-black text-white transition duration-300 ${
                !loading && email.trim()
                  ? "bg-gradient-to-r from-orange-500 to-red-500 shadow-[0_0_35px_rgba(249,115,22,.35)] hover:scale-[1.02]"
                  : "cursor-not-allowed bg-white/10 text-white/35"
              }`}
            >
              {loading && (
                <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
              )}

              {loading
                ? "جاري إرسال الرابط..."
                : "إرسال رابط إعادة التعيين"}
            </button>
          </form>

          <div className="mt-7 text-center">
            <p className="text-sm text-gray-500">
              تذكرت كلمة المرور؟{" "}
              <Link
                href="/login"
                className="font-black text-orange-400 transition hover:text-orange-300"
              >
                تسجيل الدخول
              </Link>
            </p>
          </div>
        </div>
      </section>
    </main>
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
            linear-gradient(rgba(255,255,255,.2) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,.2) 1px, transparent 1px)
          `,
          backgroundSize: "42px 42px",
        }}
      />
    </div>
  );
}