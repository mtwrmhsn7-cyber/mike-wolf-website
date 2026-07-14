"use client";

export default function UserAvatar({
  user,
  small = false,
}) {
  const size = small
    ? "h-11 w-11 rounded-xl text-sm"
    : "h-12 w-12 rounded-full text-base";

  if (user?.photoURL) {
    return (
      <div
        className={`${size} shrink-0 overflow-hidden border border-orange-400/30 bg-white/5 shadow-[0_0_25px_rgba(249,115,22,.18)]`}
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
      className={`${size} flex shrink-0 items-center justify-center border border-orange-400/30 bg-gradient-to-br from-orange-500 to-red-600 font-black uppercase text-white shadow-[0_0_25px_rgba(249,115,22,.18)]`}
    >
      {firstLetter}
    </div>
  );
}