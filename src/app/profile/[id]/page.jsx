"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function PublicProfile() {
  const {id} = useParams();
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState("");

  // 🔥 FETCH USER PROFILE
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(
          `https://sarahaapp-production-2a3f.up.railway.app/users/profile/${id}`
        );
        console.log(res)
        setUser(res.data.user);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  // 💌 SEND MESSAGE
  const sendMessage = async () => {
    if (!message.trim()) return;

    setSending(true);
    setStatus("");

    try {
      await axios.post(
        "https://sarahaapp-production-2a3f.up.railway.app/message/",
        {
          userId: id,
          content: message,
        }
      );

      setStatus("Message sent successfully 💌");
      setMessage("");
    } catch (err) {
      setStatus("Failed to send message ❌");
    } finally {
      setSending(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white flex items-center justify-center px-4">

      <div className="w-full max-w-2xl space-y-6">

        {/* USER HEADER */}
        <div className="text-center space-y-1">
          <h1 className="text-3xl font-bold">
            {user?.name}
          </h1>

          <p className="text-gray-400 text-sm">
            Send an anonymous message to{" "}
            <span className="text-violet-400 font-medium">
              {user?.name}
            </span>
          </p>
        </div>

        {/* MESSAGE BOX */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-xl">

          {/* TOP LABEL */}
          <div className="mb-4 border-b border-white/10 pb-3">
            <p className="text-sm text-gray-300">
              Writing to: {user?.name} an anonymous message
            </p>
          </div>

          {/* TEXTAREA */}
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={`Write your anonymous message to ${user?.name}...`}
            className="w-full h-40 p-4 bg-black/30 border border-white/10 rounded-xl outline-none resize-none text-white"
          />

          {/* BUTTON */}
          <button
            onClick={sendMessage}
            disabled={sending}
            className="w-full mt-4 bg-violet-600 hover:bg-violet-700 transition py-3 rounded-xl font-medium"
          >
            {sending ? "Sending..." : "Send Message"}
          </button>

          {/* STATUS */}
          {status && (
            <p className="text-center text-sm mt-3 text-gray-300">
              {status}
            </p>
          )}

        </div>

        {/* SIGNUP CTA */}
        <div className="text-center text-sm text-gray-400 space-y-2">
          <p>New here?</p>

          <Link
            href="/signup"
            className="text-violet-400 hover:text-violet-300 font-medium"
          >
            Create your account now and start receiving messages →
          </Link>
        </div>

      </div>
    </div>
  );
}