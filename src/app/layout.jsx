import "./globals.css";
import Footer from "../app/components/Footer";
import Navbar from './components/Header/page';

export const metadata = {
  title: "Saraha App",
  description: "Anonymous messaging app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-slate-950 text-white">

        {/* GLOBAL HEADER */}
        <Navbar />

        {/* PAGE CONTENT */}
        <main className="min-h-screen">
          {children}
        </main>

        {/* GLOBAL FOOTER */}
        <Footer />

      </body>
    </html>
  );
}