"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

import { signUpSchema } from "../../schemas/auth.schema";
import { signUp } from "../../services/auth.service";

export default function SignUp() {
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
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      gender: "",
      password: "",
      cPassword: "",
    },
  });

  const onSubmit = async (data) => {
        setServerResponse({
            message: "",
            type: "",
        });

        try {
            const response = await signUp(data);

            setServerResponse({
            message: response.data.message || "Account created successfully.",
            type: "success",
            });

            reset();

        } catch (err) {
            setServerResponse({
            message:
                err.response?.data?.message ||
                "Something went wrong. Please try again.",
            type: "error",
            });
        }
    };

  return (
    <section className="min-h-screen bg-liner-to-br from-slate-950 via-purple-950 to-slate-900 flex items-center justify-center py-10 px-3 sm:px-6">

      <div className="grid lg:grid-cols-2 max-w-6xl gap-16 w-full">

        {/* Left Side */}

        <div className="hidden lg:flex flex-col justify-center">

          <h1 className="text-6xl font-bold text-white">
            Join
            <span className="text-violet-500"> Saraha</span>
          </h1>

          <p className="text-gray-300 mt-6 text-lg leading-8">
            Receive honest anonymous messages from your friends.
          </p>

        </div>

        {/* Right Side */}

        <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl p-10">

          <h2 className="text-4xl font-bold text-center text-white">
            Create Account
          </h2>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-5 mt-8"
          >

            <div>
              <input
                {...register("name")}
                placeholder="Full Name"
                className="w-full rounded-xl bg-slate-900 border border-slate-700 px-5 py-4 text-white"
              />
              <p className="text-red-400 mt-1 text-sm">
                {errors.name?.message}
              </p>
            </div>

            <div>
              <input
                {...register("email")}
                placeholder="Email"
                className="w-full rounded-xl bg-slate-900 border border-slate-700 px-5 py-4 text-white"
              />
              <p className="text-red-400 mt-1 text-sm">
                {errors.email?.message}
              </p>
            </div>

            <div>
              <input
                {...register("phone")}
                placeholder="Phone Number"
                className="w-full rounded-xl bg-slate-900 border border-slate-700 px-5 py-4 text-white"
              />
              <p className="text-red-400 mt-1 text-sm">
                {errors.phone?.message}
              </p>
            </div>

            <div>
              <select
                {...register("gender")}
                className="w-full rounded-xl bg-slate-900 border border-slate-700 px-5 py-4 text-white"
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>

              <p className="text-red-400 mt-1 text-sm">
                {errors.gender?.message}
              </p>
            </div>

            <div>
              <input
                type="password"
                {...register("password")}
                placeholder="Password"
                className="w-full rounded-xl bg-slate-900 border border-slate-700 px-5 py-4 text-white"
              />
              <p className="text-red-400 mt-1 text-sm">
                {errors.password?.message}
              </p>
            </div>

            <div>
              <input
                type="password"
                {...register("cPassword")}
                placeholder="Confirm Password"
                className="w-full rounded-xl bg-slate-900 border border-slate-700 px-5 py-4 text-white"
              />
              <p className="text-red-400 mt-1 text-sm">
                {errors.cPassword?.message}
              </p>
            </div>

            <button
              disabled={isSubmitting}
              className="w-full bg-violet-600 hover:bg-violet-700 rounded-xl py-4 font-semibold transition disabled:opacity-50"
            >
              {isSubmitting ? "Creating Account..." : "Create Account"}
            </button>
            {serverResponse.message && (
            <div
                className={`mt-4 rounded-lg p-3 text-center font-medium ${
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

            Already have an account?

            <Link
              href="/signin"
              className="text-violet-400 ml-2 hover:text-violet-300"
            >
              Sign In
            </Link>

          </p>

        </div>

      </div>

    </section>
  );
}