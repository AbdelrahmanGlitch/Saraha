"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
type Message = {
  _id: string;
  content: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
};

type User = {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  gender?: string;
  role?: string;
};

type ProfileResponse = {
  user: User;
  messages: Message[];
};
export default function Profile() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [data, setData] = useState<ProfileResponse | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          router.push("/signin");
          return;
        }

        const res = await axios.get(
          "https://sarahaapp-production-2a3f.up.railway.app/users/profile",
          {
            headers: {
              authorization: `bearer ${token}`,
            },
          }
        );

        setData(res.data);
      } catch {
        setError("Failed to load profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white">
        <div className="animate-pulse text-lg">Loading your dashboard...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-red-400">
        {error}
      </div>
    );
  }
  const user = data?.user ;
  const messages = data?.messages|| [];
  console.log(messages)
  const formatMessage = (
      msg: string | { content?: string; text?: string }
    ) => {
      try {
        // If it's already an object
        if (typeof msg === "object") {
          return msg.text || msg.content || "";
        }

        // If it's a stringified object or plain string
        const parsed = JSON.parse(msg);

        return parsed.text || parsed.content || msg;
      } catch (e) {
        // 🔥 NOW TypeScript knows msg is string here
        if (typeof msg === "string") {
          return msg.replace(/^"|"$/g, "");
        }

        return "";
      }
    };
    const formatDate = (dateString: string) => {
      if (!dateString) return "";

      const date = new Date(dateString);

      return date.toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      });
    };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">

      {/* HEADER */}
      <div className="border-b border-white/10 bg-white/5 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-6 py-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

          <div>
            <h1 className="text-2xl sm:text-3xl font-bold">
              Welcome back, {user?.name} 👋
            </h1>
            <p className="text-gray-400 text-sm mt-1">
              Manage your profile & messages
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="px-4 py-2 rounded-full bg-violet-600/20 border border-violet-500/30 text-violet-300 text-sm">
              {messages.length} Messages
            </span>
          </div>

        </div>
      </div>

      {/* MAIN */}
      <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* LEFT - USER CARD */}
        <div className="lg:col-span-1 space-y-6">

                  {/* PROFILE CARD */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-xl">

          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">
              Profile
            </h2>

            <button
              onClick={() => router.push("/profile/update")}
              className="px-4 py-2 rounded-lg bg-violet-600 cursor-pointer hover:bg-violet-700 transition duration-200 text-sm font-medium"
            >
              Edit Profile
            </button>
          </div>

          <div className="space-y-4">

            <div>
              <p className="text-gray-400 text-sm">Name</p>
              <p className="text-white">{user?.name}</p>
            </div>

            <div>
              <p className="text-gray-400 text-sm">Email</p>
              <p className="text-white">{user?.email}</p>
            </div>

            <div>
              <p className="text-gray-400 text-sm">Phone</p>
              <p className="text-white">{user?.phone}</p>
            </div>

            <div>
              <p className="text-gray-400 text-sm">Gender</p>
              <p className="text-white">{user?.gender}</p>
            </div>

            <div>
              <p className="text-gray-400 text-sm">Role</p>
              <p className="text-white capitalize">{user?.role}</p>
            </div>

          </div>

        </div>
          <div className="bg-gradient-to-br from-violet-600/20 to-blue-600/10 border border-white/10 rounded-2xl p-6">
            <h3 className="font-semibold mb-2">Your Link</h3>

            <p className="text-sm text-gray-300">
              Share your Saraha link to receive anonymous messages.
            </p>

            <div className="mt-4 bg-black/30 p-3 rounded-lg text-xs text-gray-300 break-all space-y-3">

              {/* LINK */}
              <div className="w-full break-all">
                {typeof window !== "undefined"
                  ? `${window.location.origin}/profile/${user?._id}`
                  : `/profile/${user?._id}`}
              </div>

              {/* COPY BUTTON */}
              <button
                onClick={async () => {
                  const link = `${window.location.origin}/profile/${user?._id}`;
                  await navigator.clipboard.writeText(link);
                  alert("Link copied");
                }}
                className="w-full sm:w-auto px-4 py-2 rounded-lg bg-violet-600 hover:bg-violet-700 transition text-sm"
              >
                Copy Link
              </button>

            </div>
          </div>

        </div>

        {/* RIGHT - MESSAGES */}
        <div className="lg:col-span-2">

          <h2 className="text-xl font-semibold mb-4">
            Messages
          </h2>
          {messages.length === 0 ? (
            <div className="bg-white/5 border border-white/10 rounded-2xl p-10 text-center text-gray-400">
              <p className="text-lg">No messages yet</p>
              <p className="text-sm mt-2">
                Share your link to start receiving anonymous messages 💌
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map((msg, i) => (
              <div
                key={i}
                className="bg-white/5 hover:bg-white/10 transition border border-white/10 rounded-2xl p-5"
              >
                <p className="text-gray-200">
                  {formatMessage(msg.content || msg)}
                </p>
                <p className="text-xs text-gray-500 mt-3">
                  {formatDate(msg.createdAt)}
                </p>
              </div>
            ))}
            </div>
          )}

        </div>

      </div>
    </div>
  );
}