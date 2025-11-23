"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { notoSansFont, forumFont } from "@/app/utils/font";
import Image from "next/image";
import logo from "@/public/logo.webp";
import { signIn } from "../lib/auth";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await signIn(email, password);
      // Redirect to menu page after successful login
      router.push("/");
    } catch (err) {
      setError("Invalid email or password");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const goBack = () => {
    router.back();
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#FEFAF4] px-4 py-12">
      {/* Back button */}
      <button
        onClick={goBack}
        className={`fixed left-6 top-6 flex items-center gap-2 rounded-[20px] bg-[#E9DFCF] px-4 py-2 text-sm text-[#3a3227] transition hover:bg-[#d9cfbf] ${notoSansFont.className}`}
      >
        <i className="bi bi-arrow-left" />
        BACK
      </button>

      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="mb-8 flex justify-center">
          <Image src={logo} alt="Logo" className="h-20 w-auto" priority />
        </div>

        {/* Login card */}
        <div className="rounded-2xl bg-white p-8 shadow-2xl border border-[#E9DFCF]">
          {/* Title */}
          <h1
            className={`mb-2 text-center text-3xl font-medium tracking-wide text-[#3E2E1C] ${forumFont.className}`}
          >
            ADMIN LOGIN
          </h1>
          <p
            className={`mb-8 text-center text-sm text-[#574C3E]/70 ${notoSansFont.className}`}
          >
            Sign in to edit menu items and content
          </p>

          {/* Error message */}
          {error && (
            <div className="mb-6 rounded-lg bg-red-50 border border-red-200 p-3 text-sm text-red-700 flex items-center gap-3">
              <i className="bi h-fit bi-exclamation-circle text-lg" />
              <span>{error}</span>
            </div>
          )}

          {/* Login form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="email"
                className={`mb-2 block text-sm font-medium text-[#3E2E1C] ${notoSansFont.className}`}
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                className={`w-full rounded-lg border border-[#E9DFCF] bg-[#FEFAF4] px-4 py-3 text-[#3E2E1C] transition focus:border-[#C0A078] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#C0A078]/20 ${notoSansFont.className}`}
                placeholder="admin@example.com"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className={`mb-2 block text-sm font-medium text-[#3E2E1C] ${notoSansFont.className}`}
              >
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                  className={`w-full rounded-lg border border-[#E9DFCF] bg-[#FEFAF4] px-4 py-3 pr-12 text-[#3E2E1C] transition focus:border-[#C0A078] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#C0A078]/20 ${notoSansFont.className}`}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#574C3E]/60 hover:text-[#3E2E1C] transition"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  <i
                    className={`bi ${
                      showPassword ? "bi-eye-slash" : "bi-eye"
                    } text-lg`}
                  />
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full rounded-lg bg-[#C0A078] px-6 py-3.5 font-medium tracking-wider text-white transition hover:bg-[#b99c71] disabled:cursor-not-allowed disabled:opacity-50 flex items-center justify-center gap-2 ${notoSansFont.className}`}
            >
              {loading ? (
                <>
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  Signing in...
                </>
              ) : (
                <>
                  <i className="bi bi-box-arrow-in-right" />
                  Sign In
                </>
              )}
            </button>
          </form>

          {/* Help text */}
          <p
            className={`mt-6 text-center text-xs text-[#574C3E]/60 ${notoSansFont.className}`}
          >
            This is a secure admin area. Only authorized users can access.
          </p>
        </div>

        {/* Footer text */}
        <p
          className={`mt-6 text-center text-sm text-[#574C3E]/70 ${notoSansFont.className}`}
        >
          Need help? Contact your system administrator
        </p>
      </div>
    </div>
  );
}
