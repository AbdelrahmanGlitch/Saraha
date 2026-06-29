"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { signInSchema } from "../../schemas/signin.schema";
import { signIn } from "../../services/signin.service";

export default function SignIn() {
  const router = useRouter();

  const [serverResponse, setServerResponse] = useState({
    message: "",
    type: "",
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    setServerResponse({ message: "", type: "" });

    try {
      const response = await signIn(data);

      const { token, message } = response.data;

      // ✅ Save token for future requests
      if (token) {
        localStorage.setItem("token", token);
      }

      setServerResponse({
        message: message || "Login successful.",
        type: "success",
      });

      reset();

      // ⏳ small delay for better UX (optional)
      setTimeout(() => {
        router.push("/profile");
      }, 500);

    } catch (err) {
      setServerResponse({
        message:
          err.response?.data?.message ||
          "Invalid email or password.",
        type: "error",
      });
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 flex items-center justify-center px-6 py-10">

      <div className="grid lg:grid-cols-2 max-w-6xl gap-16 w-full">

        {/* Left */}
        <div className="hidden lg:flex flex-col justify-center">
          <h1 className="text-6xl font-bold text-white">
            Welcome <span className="text-violet-500">Back</span>
          </h1>

          <p className="text-gray-300 mt-6 text-lg leading-8">
            Sign in to continue receiving anonymous messages from your friends.
          </p>
        </div>

        {/* Right */}
        <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl p-10">

          <h2 className="text-4xl font-bold text-white text-center">
            Sign In
          </h2>

          <p className="text-gray-400 text-center mt-2">
            Welcome back 👋
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 mt-8">

            <div>
              <input
                type="email"
                placeholder="Email Address"
                {...register("email")}
                className="w-full rounded-xl bg-slate-900 border border-slate-700 px-5 py-4 text-white outline-none focus:border-violet-500"
              />
              <p className="text-red-400 mt-1 text-sm">
                {errors.email?.message}
              </p>
            </div>

            <div>
              <input
                type="password"
                placeholder="Password"
                {...register("password")}
                className="w-full rounded-xl bg-slate-900 border border-slate-700 px-5 py-4 text-white outline-none focus:border-violet-500"
              />
              <p className="text-red-400 mt-1 text-sm">
                {errors.password?.message}
              </p>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-violet-600 hover:bg-violet-700 transition rounded-xl py-4 font-semibold text-white disabled:opacity-50"
            >
              {isSubmitting ? "Signing In..." : "Sign In"}
            </button>

            {serverResponse.message && (
              <div
                className={`rounded-lg p-3 text-center font-medium ${
                  serverResponse.type === "success"
                    ? "bg-green-500/20 border border-green-500 text-green-400"
                    : "bg-red-500/20 border border-red-500 text-red-400"
                }`}
              >
                {serverResponse.message}
              </div>
            )}

          </form>

          <p className="text-center text-gray-400 mt-8">
            Don't have an account?
            <Link
              href="/signup"
              className="ml-2 text-violet-400 hover:text-violet-300"
            >
              Create One
            </Link>
          </p>

        </div>
      </div>
    </section>
  );
}