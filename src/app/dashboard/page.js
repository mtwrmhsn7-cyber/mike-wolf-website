"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

import { auth } from "@/lib/firebase";

export default function DashboardPage() {
  const router = useRouter();

  const [user, setUser] = useState(null);
  const [checkingAuth, setCheckingAuth] = useState(true);

  const [showLogoutDialog, setShowLogoutDialog] =
    useState(false);

  const [loggingOut, setLoggingOut] = useState(false);
  const [logoutError, setLogoutError] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (currentUser) => {
        if (!currentUser) {
          router.replace("/login");
          return;
        }

        setUser(currentUser);
        setCheckingAuth(false);
      },
      (error) => {
        console.error("Auth state error:", error);
        router.replace("/login");
      },
    );

    return () => unsubscribe();
  }, [router]);

  async function handleLogout() {
    if (loggingOut) return;

    try {
      setLoggingOut(true);
      setLogoutError("");

      await signOut(auth);

      router.replace("/");
    } catch (error) {
      console.error("Logout error:", error);

      setLogoutError(
        "حدث خطأ أثناء تسجيل الخروج. حاول مرة أخرى.",
      );
    } finally {
      setLoggingOut(false);
    }
  }

  function closeLogoutDialog() {
    if (loggingOut) return;

    setLogoutError("");
    setShowLogoutDialog(false);
  }

  if (checkingAuth) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#050505]">
        <div className="text-center">
          <span className="mx-auto block h-10 w-10 animate-spin rounded-full border-2 border-white/20 border-t-orange-400" />

          <p className="mt-4 text-sm font-bold text-gray-400">
            جاري تحميل حسابك...
          </p>
        </div>
      </main>
    );
  }

  return (
    <main
      dir="rtl"
      className="relative min-h-screen overflow-x-hidden bg-[#050505] px-5 py-8"
    >
      {/* الخلفية */}
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute -left-40 -top-40 h-[430px] w-[430px] rounded-full bg-orange-500/15 blur-[140px]" />

        <div className="absolute -bottom-40 -right-40 h-[430px] w-[430px] rounded-full bg-red-500/15 blur-[140px]" />

        <div
          className="absolute inset-0 opacity-[0.03]"
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
      </div>

      <div className="relative z-10 mx-auto max-w-6xl">
        {/* الشريط العلوي */}
        <header className="flex items-center justify-between rounded-[28px] border border-white/10 bg-black/45 px-5 py-4 shadow-[0_20px_70px_rgba(0,0,0,.35)] backdrop-blur-xl sm:px-7">
          <div className="flex items-center gap-4">
            <div className="h-14 w-14 overflow-hidden rounded-2xl border border-orange-400/30 bg-white/5 shadow-[0_0_30px_rgba(249,115,22,.2)]">
              <img
                src="/mike-wolf-logo.gif"
                alt="Mike Wolf Logo"
                className="h-full w-full object-contain p-1"
              />
            </div>

            <div>
              <p className="text-xs font-black tracking-[0.25em] text-orange-400">
                MIKE WOLF
              </p>

              <h1 className="mt-1 text-lg font-black text-white">
                لوحة المستخدم
              </h1>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setShowLogoutDialog(true)}
            className="rounded-2xl border border-red-400/20 bg-red-500/10 px-5 py-3 text-sm font-black text-red-300 transition hover:border-red-400/40 hover:bg-red-500/20"
          >
            تسجيل الخروج
          </button>
        </header>

        {/* بطاقة الترحيب */}
        <section className="mt-8 overflow-hidden rounded-[34px] border border-white/10 bg-white/[0.035] p-7 shadow-[0_30px_100px_rgba(0,0,0,.45)] backdrop-blur-2xl sm:p-10">
          <div className="flex flex-col items-center gap-6 text-center sm:flex-row sm:text-right">
            <UserAvatar user={user} />

            <div className="flex-1">
              <p className="text-sm font-bold text-orange-400">
                أهلًا بعودتك
              </p>

              <h2 className="mt-2 text-3xl font-black text-white">
                {user?.displayName || "مستخدم Mike Wolf"}
              </h2>

              <p className="mt-3 text-sm text-gray-400">
                {user?.email}
              </p>
            </div>
          </div>
        </section>

        {/* منطقة المحتوى */}
        <section className="mt-8 rounded-[34px] border border-white/10 bg-white/[0.03] p-7 text-center shadow-[0_25px_90px_rgba(0,0,0,.4)] backdrop-blur-xl sm:p-12">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-[24px] border border-orange-400/25 bg-orange-500/10 text-orange-300 shadow-[0_0_35px_rgba(249,115,22,.18)]">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="h-10 w-10"
            >
              <path
                d="M4 7H20"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />

              <path
                d="M6 7V19H18V7"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />

              <path
                d="M9 4H15"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </div>

          <h3 className="mt-6 text-2xl font-black text-white">
            محتوى الصفحة
          </h3>

          <p className="mx-auto mt-4 max-w-2xl leading-8 text-gray-400">
            هذا هو المكان المخصص للمحتوى الذي سنضيفه لاحقًا داخل
            لوحة المستخدم.
          </p>

          <div className="mt-7 inline-flex rounded-full border border-orange-400/20 bg-orange-500/10 px-5 py-3 text-sm font-bold text-orange-300">
            جاهز لإضافة المحتوى
          </div>
        </section>

        <div className="mt-8 text-center">
          <Link
            href="/"
            className="text-sm font-bold text-gray-500 transition hover:text-orange-300"
          >
            الرجوع إلى الصفحة الرئيسية
          </Link>
        </div>
      </div>

      {/* نافذة تسجيل الخروج */}
      {showLogoutDialog && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/75 px-5 backdrop-blur-md"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              closeLogoutDialog();
            }
          }}
        >
          <section className="relative w-full max-w-sm overflow-hidden rounded-[30px] border border-white/10 bg-[#0b0b0b]/95 p-7 text-center shadow-[0_30px_120px_rgba(0,0,0,.75)]">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-[24px] border border-red-400/25 bg-red-500/10 text-red-300">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="h-10 w-10"
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
            </div>

            <h2 className="mt-6 text-2xl font-black text-white">
              تسجيل الخروج
            </h2>

            <p className="mt-3 text-sm leading-7 text-gray-400">
              هل أنت متأكد من تسجيل الخروج من حسابك؟
            </p>

            {logoutError && (
              <div className="mt-5 rounded-2xl border border-red-500/25 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                {logoutError}
              </div>
            )}

            <div className="mt-7 grid grid-cols-2 gap-3">
              <button
                type="button"
                disabled={loggingOut}
                onClick={closeLogoutDialog}
                className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4 font-bold text-gray-300 transition hover:bg-white/10 disabled:opacity-50"
              >
                إلغاء
              </button>

              <button
                type="button"
                disabled={loggingOut}
                onClick={handleLogout}
                className="flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-red-600 to-orange-600 px-5 py-4 font-black text-white transition hover:scale-[1.02] disabled:opacity-60"
              >
                {loggingOut && (
                  <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                )}

                {loggingOut
                  ? "جاري الخروج..."
                  : "تسجيل الخروج"}
              </button>
            </div>
          </section>
        </div>
      )}
    </main>
  );
}

function UserAvatar({ user }) {
  if (user?.photoURL) {
    return (
      <div className="h-24 w-24 shrink-0 overflow-hidden rounded-[28px] border border-orange-400/30 bg-white/5 shadow-[0_0_40px_rgba(249,115,22,.22)]">
        <img
          src={user.photoURL}
          alt="صورة المستخدم"
          referrerPolicy="no-referrer"
          className="h-full w-full object-cover"
        />
      </div>
    );
  }

  const firstLetter =
    user?.displayName?.trim()?.charAt(0) ||
    user?.email?.trim()?.charAt(0) ||
    "M";

  return (
    <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-[28px] border border-orange-400/30 bg-gradient-to-br from-orange-500 to-red-600 text-3xl font-black uppercase text-white shadow-[0_0_40px_rgba(249,115,22,.22)]">
      {firstLetter}
    </div>
  );
}