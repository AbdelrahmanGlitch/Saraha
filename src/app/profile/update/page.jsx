"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function UpdateProfile() {
  const router = useRouter();

  const [token, setToken] = useState("");

  // PROFILE FIELDS
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    gender: "",
  });

  // PASSWORD FIELDS
  const [passwords, setPasswords] = useState({
    oldPassword: "",
    newPassword: "",
    cNewPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    const t = localStorage.getItem("token");

    if (!t) {
      router.push("/signin");
      return;
    }

    setToken(t);
  }, [router]);

  // HANDLE PROFILE UPDATE
  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg("");

    try {
        const payload = {};

        // ✅ Only add fields if they are NOT empty
        if (form.name?.trim()) payload.name = form.name;
        if (form.email?.trim()) payload.email = form.email;
        if (form.phone?.trim()) payload.phone = form.phone;
        if (form.gender?.trim()) payload.gender = form.gender;

        // 🚨 Prevent empty request
        if (Object.keys(payload).length === 0) {
        setMsg("Please update at least one field");
        setLoading(false);
        return;
        }

        await axios.patch(
        "https://sarahaapp-production-2a3f.up.railway.app/users/update",
        payload,
        {
            headers: {
            authorization: `Bearer ${token}`,
            },
        }
        );

        setMsg("Profile updated successfully ✅");
    } catch (err) {
        setMsg(err.response?.data?.message || "Update failed");
    } finally {
        setLoading(false);
    }
    };

  // HANDLE PASSWORD UPDATE
  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg("");

    try {
      await axios.patch(
        "https://sarahaapp-production-2a3f.up.railway.app/users/update/password",
        passwords,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );

      setMsg("Password updated successfully 🔐");

      setPasswords({
        oldPassword: "",
        newPassword: "",
        cNewPassword: "",
      });

    } catch (err) {
      setMsg(err.response?.data?.message || "Password update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white p-6">

      <div className="max-w-5xl mx-auto space-y-8">

        {/* HEADER */}
        <div>
          <h1 className="text-3xl font-bold">Edit Profile ⚙️</h1>
          <p className="text-gray-400">Update your account settings</p>
        </div>

        {/* PROFILE UPDATE */}
        <form
          onSubmit={handleProfileUpdate}
          className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4 backdrop-blur-xl"
        >

          <h2 className="text-xl font-semibold">Profile Information</h2>

          <div className="grid md:grid-cols-2 gap-4">

            <input
              placeholder="Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="p-3 rounded-lg bg-black/30 border border-white/10"
            />

            <input
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="p-3 rounded-lg bg-black/30 border border-white/10"
            />

            <input
              placeholder="Phone"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="p-3 rounded-lg bg-black/30 border border-white/10"
            />

            <select
              value={form.gender}
              onChange={(e) => setForm({ ...form, gender: e.target.value })}
              className="p-3 rounded-lg bg-black/30 border border-white/10"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>

          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-violet-600 hover:bg-violet-700 px-6 py-3 rounded-lg transition"
          >
            {loading ? "Updating..." : "Update Profile"}
          </button>

        </form>

        {/* PASSWORD UPDATE */}
        <form
          onSubmit={handlePasswordUpdate}
          className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4 backdrop-blur-xl"
        >

          <h2 className="text-xl font-semibold">Change Password 🔐</h2>

          <div className="grid md:grid-cols-3 gap-4">

            <input
              type="password"
              placeholder="Old Password"
              value={passwords.oldPassword}
              onChange={(e) =>
                setPasswords({ ...passwords, oldPassword: e.target.value })
              }
              className="p-3 rounded-lg bg-black/30 border border-white/10"
            />

            <input
              type="password"
              placeholder="New Password"
              value={passwords.newPassword}
              onChange={(e) =>
                setPasswords({ ...passwords, newPassword: e.target.value })
              }
              className="p-3 rounded-lg bg-black/30 border border-white/10"
            />

            <input
              type="password"
              placeholder="Confirm Password"
              value={passwords.cNewPassword}
              onChange={(e) =>
                setPasswords({ ...passwords, cNewPassword: e.target.value })
              }
              className="p-3 rounded-lg bg-black/30 border border-white/10"
            />

          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-lg transition"
          >
            {loading ? "Updating..." : "Change Password"}
          </button>

        </form>

        {/* MESSAGE */}
        {msg && (
          <div className="text-center text-sm text-gray-300">
            {msg}
          </div>
        )}

      </div>
    </div>
  );
}