"use client";

import { useState } from "react";
import Link from "next/link";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signOut,
  updateProfile,
} from "firebase/auth";
import {
  doc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";

import { auth, db } from "@/lib/firebase";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const [acceptedTerms, setAcceptedTerms] =
    useState(false);

  const [confirmedAge, setConfirmedAge] =
    useState(false);

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] =
    useState("");

  const [accountCreated, setAccountCreated] =
    useState(false);

  async function handleSubmit(event) {
    event.preventDefault();

    if (loading) return;

    setErrorMessage("");

    const cleanName = name.trim();
    const cleanEmail = email.trim().toLowerCase();

    if (cleanName.length < 2) {
      setErrorMessage(
        "يرجى إدخال اسم صحيح لا يقل عن حرفين.",
      );
      return;
    }

    if (!cleanEmail) {
      setErrorMessage(
        "يرجى إدخال البريد الإلكتروني.",
      );
      return;
    }

    if (password.length < 6) {
      setErrorMessage(
        "يجب أن تتكون كلمة المرور من 6 أحرف على الأقل.",
      );
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage(
        "كلمتا المرور غير متطابقتين.",
      );
      return;
    }

    if (!confirmedAge) {
      setErrorMessage(
        "يجب تأكيد أن عمرك 18 عامًا أو أكثر.",
      );
      return;
    }

    if (!acceptedTerms) {
      setErrorMessage(
        "يجب الموافقة على الشروط والأحكام.",
      );
      return;
    }

    try {
      setLoading(true);

      const userCredential =
        await createUserWithEmailAndPassword(
          auth,
          cleanEmail,
          password,
        );

      const user = userCredential.user;

      // إضافة اسم المستخدم إلى Firebase Authentication
      await updateProfile(user, {
        displayName: cleanName,
      });

      // إنشاء بيانات المستخدم داخل Firestore
      try {
        await setDoc(
          doc(db, "users", user.uid),
          {
            uid: user.uid,
            name: cleanName,
            email: cleanEmail,
            imageUrl: "",
            provider: "password",
            emailVerified: false,
            ageConfirmed: true,
            acceptedTerms: true,
            acceptedTermsAt: serverTimestamp(),
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
          },
          {
            merge: true,
          },
        );
      } catch (firestoreError) {
        console.error(
          "Firestore profile error:",
          firestoreError,
        );
      }

      auth.languageCode = "ar";

      // إرسال رابط تأكيد البريد
      await sendEmailVerification(user);

      // لا نبقي الحساب داخل الموقع قبل تأكيد البريد
      await signOut(auth);

      setAccountCreated(true);
    } catch (error) {
      console.error(
        "Firebase registration error:",
        error,
      );

      switch (error.code) {
        case "auth/email-already-in-use":
          setErrorMessage(
            "هذا البريد الإلكتروني مستخدم مسبقًا.",
          );
          break;

        case "auth/invalid-email":
          setErrorMessage(
            "صيغة البريد الإلكتروني غير صحيحة.",
          );
          break;

        case "auth/weak-password":
          setErrorMessage(
            "كلمة المرور ضعيفة. اختر كلمة مرور أقوى.",
          );
          break;

        case "auth/operation-not-allowed":
          setErrorMessage(
            "إنشاء الحساب بالبريد غير مفعّل حاليًا.",
          );
          break;

        case "auth/network-request-failed":
          setErrorMessage(
            "تعذر الاتصال بالإنترنت. تحقق من الشبكة.",
          );
          break;

        case "auth/too-many-requests":
          setErrorMessage(
            "تم إجراء محاولات كثيرة. انتظر قليلًا ثم حاول مرة أخرى.",
          );
          break;

        default:
          setErrorMessage(
            "حدث خطأ أثناء إنشاء الحساب. حاول مرة أخرى.",
          );
      }
    } finally {
      setLoading(false);
    }
  }

  if (accountCreated) {
    return (
      <main
        dir="rtl"
        className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#050505] px-5 py-10"
      >
        <Background />

        <section className="relative z-10 w-full max-w-md rounded-[32px] border border-white/10 bg-white/[0.04] p-8 text-center shadow-[0_30px_100px_rgba(0,0,0,.55)] backdrop-blur-2xl">
          <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-[28px] border border-green-400/25 bg-green-500/10 text-green-300 shadow-[0_0_45px_rgba(74,222,128,.18)]">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="h-12 w-12"
            >
              <path
                d="M5 12.5L9.2 16.5L19 6.5"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <p className="mt-6 text-xs font-bold tracking-[0.35em] text-orange-400">
            MIKE WOLF
          </p>

          <h1 className="mt-3 text-3xl font-black text-white">
            تم إنشاء الحساب
          </h1>

          <p className="mt-4 leading-8 text-gray-400">
            أرسلنا رابط تأكيد إلى:
          </p>

          <p className="mt-2 break-all font-bold text-orange-300">
            {email.trim().toLowerCase()}
          </p>

          <div className="mt-6 rounded-2xl border border-white/10 bg-black/25 p-4 text-sm leading-7 text-gray-400">
            افتح بريدك واضغط على رابط تأكيد الحساب،
            وبعدها ارجع وسجّل الدخول.
          </div>

          <Link
            href="/login"
            className="mt-7 flex w-full items-center justify-center rounded-2xl bg-gradient-to-r from-orange-500 to-red-500 px-6 py-4 font-black text-white shadow-[0_0_35px_rgba(249,115,22,.32)] transition hover:scale-[1.02]"
          >
            الانتقال إلى تسجيل الدخول
          </Link>
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

      {/* الرجوع */}
      <Link
        href="/login"
        aria-label="الرجوع إلى تسجيل الدخول"
        className="absolute left-5 top-5 z-20 flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-black/40 text-2xl text-white backdrop-blur-xl transition hover:border-orange-400/40 hover:text-orange-300"
      >
        ←
      </Link>

      <section className="relative z-10 my-8 w-full max-w-lg overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.035] p-7 shadow-[0_30px_100px_rgba(0,0,0,.55)] backdrop-blur-2xl sm:p-9">
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

          <div className="mt-6 text-center">
            <p className="text-xs font-bold tracking-[0.35em] text-orange-400">
              MIKE WOLF
            </p>

            <h1 className="mt-3 text-3xl font-black text-white">
              إنشاء حساب جديد
            </h1>

            <p className="mt-3 text-sm leading-7 text-gray-400">
              أنشئ حسابك للانضمام إلى عالم Mike Wolf.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="mt-8 space-y-5"
          >
            {/* الاسم */}
            <FieldLabel
              htmlFor="name"
              title="اسم المستخدم"
            />

            <input
              id="name"
              type="text"
              required
              maxLength={40}
              autoComplete="name"
              disabled={loading}
              value={name}
              onChange={(event) => {
                setName(event.target.value);
                setErrorMessage("");
              }}
              placeholder="أدخل اسم المستخدم"
              className={inputClassName}
            />

            {/* البريد */}
            <FieldLabel
              htmlFor="register-email"
              title="البريد الإلكتروني"
            />

            <input
              id="register-email"
              type="email"
              required
              autoComplete="email"
              disabled={loading}
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
                setErrorMessage("");
              }}
              placeholder="example@email.com"
              className={inputClassName}
            />

            {/* كلمة المرور */}
            <FieldLabel
              htmlFor="register-password"
              title="كلمة المرور"
            />

            <div className="relative">
              <input
                id="register-password"
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                required
                minLength={6}
                autoComplete="new-password"
                disabled={loading}
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value);
                  setErrorMessage("");
                }}
                placeholder="••••••••"
                className={`${inputClassName} pl-14`}
              />

              <PasswordButton
                showPassword={showPassword}
                disabled={loading}
                onClick={() =>
                  setShowPassword(
                    (current) => !current,
                  )
                }
              />
            </div>

            {/* تأكيد كلمة المرور */}
            <FieldLabel
              htmlFor="confirm-password"
              title="تأكيد كلمة المرور"
            />

            <input
              id="confirm-password"
              type={
                showPassword
                  ? "text"
                  : "password"
              }
              required
              minLength={6}
              autoComplete="new-password"
              disabled={loading}
              value={confirmPassword}
              onChange={(event) => {
                setConfirmPassword(
                  event.target.value,
                );
                setErrorMessage("");
              }}
              placeholder="أعد إدخال كلمة المرور"
              className={inputClassName}
            />

            {errorMessage && (
              <div
                role="alert"
                className="rounded-2xl border border-red-500/25 bg-red-500/10 px-4 py-3 text-sm leading-6 text-red-300"
              >
                {errorMessage}
              </div>
            )}

            {/* تأكيد العمر */}
            <CheckRow
              checked={confirmedAge}
              disabled={loading}
              onChange={(value) => {
                setConfirmedAge(value);
                setErrorMessage("");
              }}
            >
              أؤكد أن عمري{" "}
              <span className="font-bold text-orange-300">
                18 عامًا أو أكثر
              </span>
            </CheckRow>

            {/* الشروط وسياسة الخصوصية */}
<CheckRow
  checked={acceptedTerms}
  disabled={loading}
  onChange={(value) => {
    setAcceptedTerms(value);
    setErrorMessage("");
  }}
>
  أوافق على{" "}
  <a
    href="https://mike-wolf-terms.vercel.app"
    target="_blank"
    rel="noopener noreferrer"
    onClick={(event) =>
      event.stopPropagation()
    }
    className="font-bold text-orange-400 underline decoration-orange-400/40 underline-offset-4 transition hover:text-orange-300"
  >
    الشروط والأحكام
  </a>

  {" "}و{" "}

  <Link
    href="/privacy"
    target="_blank"
    onClick={(event) =>
      event.stopPropagation()
    }
    className="font-bold text-orange-400 underline decoration-orange-400/40 underline-offset-4 transition hover:text-orange-300"
  >
    سياسة الخصوصية
  </Link>
            </CheckRow>

            <button
              type="submit"
              disabled={
                loading ||
                !acceptedTerms ||
                !confirmedAge
              }
              className={`flex w-full items-center justify-center gap-3 rounded-2xl px-6 py-4 font-black text-white transition duration-300 ${
                !loading &&
                acceptedTerms &&
                confirmedAge
                  ? "bg-gradient-to-r from-orange-500 to-red-500 shadow-[0_0_35px_rgba(249,115,22,.35)] hover:scale-[1.02]"
                  : "cursor-not-allowed bg-white/10 text-white/35"
              }`}
            >
              {loading && (
                <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
              )}

              {loading
                ? "جاري إنشاء الحساب..."
                : "إنشاء الحساب"}
            </button>
          </form>

          <p className="mt-7 text-center text-sm text-gray-500">
            لديك حساب بالفعل؟{" "}
            <Link
              href="/login"
              className="font-black text-orange-400 transition hover:text-orange-300"
            >
              تسجيل الدخول
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}

const inputClassName =
  "w-full rounded-2xl border border-white/10 bg-black/35 px-5 py-4 text-left text-white outline-none transition duration-300 placeholder:text-gray-600 focus:border-orange-400/50 focus:ring-4 focus:ring-orange-500/10 disabled:cursor-not-allowed disabled:opacity-60";

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

function FieldLabel({ htmlFor, title }) {
  return (
    <label
      htmlFor={htmlFor}
      className="-mb-3 block text-sm font-bold text-gray-300"
    >
      {title}
    </label>
  );
}

function CheckRow({
  checked,
  disabled,
  onChange,
  children,
}) {
  return (
    <label className="flex cursor-pointer items-start gap-3 rounded-2xl border border-white/10 bg-black/25 p-4 transition hover:border-orange-400/25">
      <input
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={(event) =>
          onChange(event.target.checked)
        }
        className="mt-1 h-5 w-5 shrink-0 accent-orange-500"
      />

      <span className="text-sm leading-7 text-gray-400">
        {children}
      </span>
    </label>
  );
}

function PasswordButton({
  showPassword,
  disabled,
  onClick,
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
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
            d="M6.2 6.2C4.6 7.4 3.5 9 3 12C4.5 15.5 7.7 20 12 20C13.2 20 14.3 19.7 15.3 19.2"
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
  );
}