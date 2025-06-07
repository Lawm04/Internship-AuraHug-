"use client";

import { Fugaz_One, Open_Sans } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { usePathname } from "next/navigation";

const inter = Open_Sans({ subsets: ["latin"] });
const fugaz = Fugaz_One({ subsets: ["latin"], weight: ["400"] });

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const hideHeader = ["/login", "/signup", "/"].includes(pathname);
  const centerPage = ["/login", "/signup", "/"].includes(pathname);

  const header = (
    <header className="p-4 sm:p-8 flex items-center justify-between gap-4 bg-gray-300 w-full">
      <Link href="/profile">
        <img
          src="/images/AuraHug.png"
          alt="AuraHug Logo"
          className="h-15 sm:h-10 object-contain cursor-pointer"
        />
      </Link>
      <ul className="flex flex-row gap-4 ml-4">
        <li>
          <Link href="/dashboard" className="hover:text-indigo-400 transition-colors duration-300">
            Home
          </Link>
        </li>
        <li>
          <Link href="/stress-relief" className="hover:text-indigo-400 transition-colors duration-300">
            Features
          </Link>
        </li>
        <li>
          <Link href="/resource" className="hover:text-indigo-400 transition-colors duration-300">
            Resources
          </Link>
        </li>
        <li>
          <Link href="/about" className="hover:text-indigo-400 transition-colors duration-300">
            About
          </Link>
        </li>
        <li>
          <Link href="/contact" className="hover:text-indigo-400 transition-colors duration-300">
            Contact
          </Link>
        </li>
      </ul>
    </header>
  );

  const footer = (
    <footer className="p-4 sm:p-8 grid bg-indigo-900 text-white w-full">
      <p>
        &copy; {new Date().getFullYear()}{" "}
        <span>AuraHug. All rights reserved.</span>
      </p>
    </footer>
  );

  return (
    <html lang="en">
      <body className={`text-sm sm:text-base min-h-screen flex flex-col text-gray-800 ${inter.className}`}>
        {!hideHeader && header}
        <main
          className={`w-full max-w-[1000px] mx-auto flex-grow ${
            centerPage ? "flex items-center justify-center" : ""
          }`}
        >
          {children}
        </main>
        {footer}
      </body>
    </html>
  );
}

