"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    router.push("/signin");
  };

  return (
    <nav className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur-md border-b border-white/10">

      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">

        {/* LOGO */}
        <Link
          href="/"
          className="text-3xl font-bold text-violet-400"
        >
          Saraha
        </Link>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-4">

          {!isLoggedIn ? (
            <>
              {/* NOT LOGGED IN */}
              <Link
                href="/signin"
                className="rounded-lg px-5 py-2 hover:bg-slate-800 transition"
              >
                Sign In
              </Link>

              <Link
                href="/signup"
                className="rounded-lg bg-violet-600 px-5 py-2 hover:bg-violet-700 transition"
              >
                Sign Up
              </Link>
            </>
          ) : (
            <>
              {/* LOGGED IN */}
              <Link
                href="/profile"
                className="rounded-lg px-5 py-2 hover:bg-slate-800 transition"
              >
                Profile
              </Link>

              <button
                onClick={handleLogout}
                className="rounded-lg bg-red-600 px-5 py-2 hover:bg-red-700 transition"
              >
                Logout
              </button>
            </>
          )}

        </div>

      </div>

    </nav>
  );
}