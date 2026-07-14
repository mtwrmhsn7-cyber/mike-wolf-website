"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

import { auth } from "@/lib/firebase";

export default function UserMenu() {
  const menuRef = useRef(null);

  const [user, setUser] = useState(null);
  const [checkingAuth, setCheckingAuth] = useState(true);

  const [showAccountMenu, setShowAccountMenu] =
    useState(false);

  const [showLogoutDialog, setShowLogoutDialog] =
    useState(false);

  const [loggingOut, setLoggingOut] = useState(false);
  const [logoutError, setLogoutError] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (currentUser) => {
        setUser(currentUser);
        setCheckingAuth(false);
      },
      (error) => {
        console.error("Auth state error:", error);
        setUser(null);
        setCheckingAuth(false);
      },
    );

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    function handleOutsideClick(event) {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target)
      ) {
        setShowAccountMenu(false);
      }
    }

    document.addEventListener(
      "mousedown",
      handleOutsideClick,
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleOutsideClick,
      );
    };
  }, []);

  useEffect(() => {
    function handleEscape(event) {
      if (event.key !== "Escape") return;

      setShowAccountMenu(false);

      if (!loggingOut) {
        setShowLogoutDialog(false);
        setLogoutError("");
      }
    }

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener(
        "keydown",
        handleEscape,
      );
    };
  }, [loggingOut]);

  async function handleLogout() {
    if (loggingOut) return;

    try {
      setLoggingOut(true);
      setLogoutError("");

      await signOut(auth);

      setShowLogoutDialog(false);
      setShowAccountMenu(false);
    } catch (error) {
      console.error("Logout error:", error);

      setLogoutError(
        "حدث خطأ أثناء تسجيل الخروج. حاول مرة أخرى.",
      );
    } finally {
      setLoggingOut(false);
    }
  }

  function toggleAccountMenu() {
    setShowAccountMenu((currentValue) => !currentValue);
  }

  function openLogoutDialog() {
    setLogoutError("");
    setShowAccountMenu(false);
    setShowLogoutDialog(true);
  }

  function closeLogoutDialog() {
    if (loggingOut) return;

    setLogoutError("");
    setShowLogoutDialog(false);
  }

  return (
    <>
      <div
        ref={menuRef}
        className="fixed right-5 top-5 z-50 md:right-10 md:top-8"
      >
        {checkingAuth ? (
          <AuthLoadingButton />
        ) : user ? (
          <div className="relative">
            <button
              type="button"
              onClick={toggleAccountMenu}
              aria-expanded={showAccountMenu}
              aria-haspopup="menu"
              aria-label="فتح قائمة الحساب"
              className="group flex items-center gap-3 rounded-full border border-white/10 bg-black/45 p-2 pr-4 shadow-[0_15px_50px_rgba(0,0,0,.45)] backdrop-blur-xl transition-all duration-300 hover:border-orange-400/40 hover:bg-white/[0.06]"
            >
              <UserAvatar user={user} />

              <div className="hidden text-right sm:block">
                <p className="max-w-[170px] truncate text-[10px] font-semibold text-gray-500">
                  {user.email || "Mike Wolf Account"}
                </p>

                <p className="text-sm font-bold text-white transition group-hover:text-orange-300">
                  حسابي
                </p>
              </div>

              <svg
                viewBox="0 0 24 24"
                fill="none"
                className={`hidden h-4 w-4 text-gray-500 transition duration-300 sm:block ${
                  showAccountMenu
                    ? "rotate-180 text-orange-400"
                    : ""
                }`}
              >
                <path
                  d="M7 10L12 15L17 10"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            {showAccountMenu && (
              <AccountMenu
                user={user}
                onClose={() => setShowAccountMenu(false)}
                onLogout={openLogoutDialog}
              />
            )}
          </div>
        ) : (
          <LoginButton />
        )}
      </div>

      {showLogoutDialog && (
        <LogoutDialog
          loggingOut={loggingOut}
          logoutError={logoutError}
          onCancel={closeLogoutDialog}
          onConfirm={handleLogout}
        />
      )}
    </>
  );
}

function LoginButton() {
  return (
    <Link
      href="/login"
      className="group flex items-center gap-3 rounded-full border border-white/10 bg-black/45 p-2 pr-4 shadow-[0_15px_50px_rgba(0,0,0,.45)] backdrop-blur-xl transition-all duration-300 hover:border-orange-400/40 hover:bg-white/[0.06]"
    >
      <DefaultUserIcon />

      <div className="hidden text-right sm:block">
        <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-gray-500">
          Account
        </p>

        <p className="text-sm font-bold text-white transition group-hover:text-orange-300">
          تسجيل الدخول
        </p>
      </div>
    </Link>
  );
}

function AccountMenu({
  user,
  onClose,
  onLogout,
}) {
  return (
    <div
      dir="rtl"
      role="menu"
      className="absolute right-0 top-[calc(100%+12px)] w-72 overflow-hidden rounded-[24px] border border-white/10 bg-[#0b0b0b]/95 p-3 shadow-[0_30px_100px_rgba(0,0,0,.7)] backdrop-blur-2xl"
    >
      <div className="flex items-center gap-3 rounded-2xl border border-white/5 bg-white/[0.035] p-3">
        <UserAvatar user={user} small />

        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-black text-white">
            {user.displayName || "مستخدم Mike Wolf"}
          </p>

          <p className="mt-1 truncate text-[11px] text-gray-500">
            {user.email}
          </p>
        </div>
      </div>

      <div className="my-3 h-px bg-white/10" />

      <Link
        href="/dashboard"
        role="menuitem"
        onClick={onClose}
        className="group flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-right transition hover:bg-orange-500/10"
      >
        <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-orange-400/20 bg-orange-500/10 text-orange-300">
          <DashboardIcon />
        </span>

        <div>
          <p className="text-sm font-black text-white transition group-hover:text-orange-300">
            لوحة المستخدم
          </p>

          <p className="mt-1 text-[11px] text-gray-500">
            عرض حسابك ومحتوى الموقع
          </p>
        </div>
      </Link>

      <button
        type="button"
        role="menuitem"
        onClick={onLogout}
        className="group mt-1 flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-right transition hover:bg-red-500/10"
      >
        <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-red-400/20 bg-red-500/10 text-red-300">
          <LogoutIcon className="h-5 w-5" />
        </span>

        <div>
          <p className="text-sm font-black text-white transition group-hover:text-red-300">
            تسجيل الخروج
          </p>

          <p className="mt-1 text-[11px] text-gray-500">
            الخروج من حسابك الحالي
          </p>
        </div>
      </button>
    </div>
  );
}

function LogoutDialog({
  loggingOut,
  logoutError,
  onCancel,
  onConfirm,
}) {
  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/75 px-5 backdrop-blur-md"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onCancel();
        }
      }}
    >
      <section
        dir="rtl"
        role="dialog"
        aria-modal="true"
        aria-labelledby="logout-dialog-title"
        className="relative w-full max-w-sm overflow-hidden rounded-[30px] border border-white/10 bg-[#0b0b0b]/95 p-7 shadow-[0_30px_120px_rgba(0,0,0,.75)]"
      >
        <div className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-red-500/15 blur-[80px]" />

        <div className="relative">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-[24px] border border-red-400/25 bg-red-500/10 text-red-300 shadow-[0_0_40px_rgba(239,68,68,.18)]">
            <LogoutIcon className="h-10 w-10" />
          </div>

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

          {logoutError && (
            <div className="mt-5 rounded-2xl border border-red-500/25 bg-red-500/10 px-4 py-3 text-center text-sm leading-6 text-red-300">
              {logoutError}
            </div>
          )}

          <div className="mt-7 grid grid-cols-2 gap-3">
            <button
              type="button"
              disabled={loggingOut}
              onClick={onCancel}
              className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4 font-bold text-gray-300 transition hover:border-white/20 hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-50"
            >
              إلغاء
            </button>

            <button
              type="button"
              disabled={loggingOut}
              onClick={onConfirm}
              className="flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-red-600 to-orange-600 px-5 py-4 font-black text-white shadow-[0_0_30px_rgba(239,68,68,.25)] transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loggingOut && (
                <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
              )}

              {loggingOut
                ? "جاري الخروج..."
                : "تسجيل الخروج"}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

function AuthLoadingButton() {
  return (
    <div className="flex items-center gap-3 rounded-full border border-white/10 bg-black/45 p-2 pr-4 shadow-[0_15px_50px_rgba(0,0,0,.45)] backdrop-blur-xl">
      <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5">
        <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/20 border-t-orange-400" />
      </div>

      <div className="hidden text-right sm:block">
        <p className="text-xs font-bold text-gray-500">
          جاري التحقق...
        </p>
      </div>
    </div>
  );
}

function DefaultUserIcon() {
  return (
    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-orange-400/30 bg-gradient-to-br from-gray-700 to-gray-950 shadow-[0_0_25px_rgba(249,115,22,.2)]">
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className="h-7 w-7 text-white"
      >
        <path
          d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z"
          fill="currentColor"
        />

        <path
          d="M4 21C4 16.5817 7.58172 13 12 13C16.4183 13 20 16.5817 20 21"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}

function UserAvatar({ user, small = false }) {
  const sizeClass = small
    ? "h-11 w-11 rounded-xl text-sm"
    : "h-12 w-12 rounded-full text-base";

  if (user?.photoURL) {
    return (
      <div
        className={`${sizeClass} shrink-0 overflow-hidden border border-orange-400/30 bg-white/5 shadow-[0_0_25px_rgba(249,115,22,.18)]`}
      >
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
    <div
      className={`${sizeClass} flex shrink-0 items-center justify-center border border-orange-400/30 bg-gradient-to-br from-orange-500 to-red-600 font-black uppercase text-white shadow-[0_0_25px_rgba(249,115,22,.18)]`}
    >
      {firstLetter}
    </div>
  );
}

function DashboardIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="h-5 w-5"
    >
      <path
        d="M4 4H10V10H4V4Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />

      <path
        d="M14 4H20V10H14V4Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />

      <path
        d="M4 14H10V20H4V14Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />

      <path
        d="M14 14H20V20H14V14Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function LogoutIcon({ className }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
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