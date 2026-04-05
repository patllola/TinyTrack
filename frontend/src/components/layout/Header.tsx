"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import ProfileModal from "./ProfileModal";
import { getStoredUser, clearUser } from "@/lib/auth";

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const [profileOpen, setProfileOpen] = useState(false);
  const [userName, setUserName] = useState<string | null>(null);

  const isAuthPage = pathname === "/login" || pathname === "/register";

  useEffect(() => {
    const user = getStoredUser();
    setUserName(user?.fullName ?? null);
  }, [profileOpen, pathname]);

  function handleLogout() {
    clearUser();
    setUserName(null);
    router.push("/login");
  }

  const tabClass = (active: boolean) =>
    `text-sm font-medium px-4 py-2 rounded-lg transition-colors ${
      active
        ? "bg-brand-600 text-white"
        : "text-gray-600 hover:text-brand-600 hover:bg-brand-50"
    }`;

  return (
    <>
      <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-sm border-b border-brand-100">
        {/* Top row: logo + welcome + logout */}
        <div className="max-w-2xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center shadow-sm">
              <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3C7 3 3 7.5 3 12c0 2.5 1 4.8 2.6 6.4L7 20h10l1.4-1.6C20 16.8 21 14.5 21 12c0-4.5-4-9-9-9z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6M12 9v6" />
              </svg>
            </div>
            <span className="text-lg font-bold bg-gradient-to-r from-brand-600 to-brand-400 bg-clip-text text-transparent">
              TinyTrack
            </span>
          </Link>

          {!isAuthPage && userName && (
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-700 font-medium">
                Welcome, <span className="text-brand-600">{userName.split(" ")[0]}</span>
              </span>
              <button
                onClick={handleLogout}
                className="text-xs font-medium text-gray-400 hover:text-red-500 transition-colors"
              >
                Logout
              </button>
            </div>
          )}

          {isAuthPage && (
            <Link
              href="/login"
              className="text-sm font-medium text-brand-600 bg-brand-50 px-3 py-1.5 rounded-lg"
            >
              Sign In
            </Link>
          )}
        </div>

        {/* Tab row — only when logged in */}
        {!isAuthPage && userName && (
          <div className="max-w-2xl mx-auto px-4 pb-2 flex items-center gap-1">
            <Link href="/" className={tabClass(pathname === "/")}>
              Dashboard
            </Link>
            <button
              onClick={() => setProfileOpen(true)}
              className={tabClass(false)}
            >
              Update Profile
            </button>
            <Link href="/log" className={tabClass(pathname === "/log")}>
              Log Feed
            </Link>
          </div>
        )}
      </header>

      <ProfileModal open={profileOpen} onClose={() => setProfileOpen(false)} />
    </>
  );
}
