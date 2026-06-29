import Link from "next/link";

export default function Home() {
  return (
    <section className="min-h-[90vh] flex items-center justify-center bg-liner-to-br from-slate-950 via-purple-900 to-indigo-900">

      <div className="max-w-3xl text-center px-6">

        <span className="text-violet-400 uppercase tracking-widest font-semibold">
          Welcome to
        </span>

        <h1 className="text-6xl md:text-7xl font-extrabold mt-4 mb-6">
          Saraha
        </h1>

        <p className="text-gray-300 text-xl leading-8 mb-10">
          Receive honest and anonymous messages from friends,
          classmates, and colleagues.
        </p>

        <Link
          href="/signup"
          className="inline-flex items-center rounded-full bg-violet-600 px-8 py-4 text-lg font-semibold transition hover:bg-violet-700"
        >
          Get Started →
        </Link>

      </div>

    </section>
  );
}