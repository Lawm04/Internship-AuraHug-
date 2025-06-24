"use client";

import { Fugaz_One, Open_Sans } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";


const inter = Open_Sans({ subsets: ["latin"] });
const fugaz = Fugaz_One({ subsets: ["latin"], weight: ["400"] });

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const hideHeader = ["/login", "/signup", "/"].includes(pathname);
  const centerPage = ["/login", "/signup", "/"].includes(pathname);

  // Navigation links with paths
  const navLinks = [
    { name: "Home", path: "/dashboard" },
    { name: "Features", path: "/stress-relief" },
    { name: "Resources", path: "/resource" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  const header = (
    <header className="bg-gradient-to-b from-white to-blue-50 shadow-sm w-full py-4">
      <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between">
        <Link href="/profile" className="mb-4 sm:mb-0">
          <div className="flex items-center space-x-3">
            <Image
              src="/images/AuraHug.png"
              alt="AuraHug Logo"
              width={300}
              height={300}
              className="h-12 w-12 object-contain"
            />
            <span className={`text-2xl font-bold text-indigo-700 ${fugaz.className}`}>
              AuraHug
            </span>
          </div>
        </Link>
        
        <nav className="w-full sm:w-auto">
          <ul className="flex flex-wrap justify-center gap-2 sm:gap-6">
            {navLinks.map((link) => (
              <li key={link.path}>
                <Link
                  href={link.path}
                  className={`relative py-1 px-2 text-gray-700 font-medium transition-colors duration-300 hover:text-indigo-600 ${
                    pathname === link.path ? "text-indigo-700 font-semibold" : ""
                  }`}
                >
                  {link.name}
                  {pathname === link.path && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-600"></span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );

  const footer = (
    <footer className="bg-purple-50 py-8 border-t border-purple-100">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <div className="flex items-center space-x-3">
              <Image
                src="/images/AuraHug.png"
                alt="AuraHug Logo"
                width={300}
                height={300}
                className="h-10 w-10 object-contain"
              />
              <span className={`text-xl font-bold text-indigo-700 ${fugaz.className}`}>
                AuraHug
              </span>
            </div>
          </div>
          
          <div className="text-center md:text-right">
            <p className="text-gray-600">
              &copy; {new Date().getFullYear()} AuraHug. All rights reserved.
            </p>
            <div className="mt-2 flex justify-center md:justify-end space-x-4">
              <a href="#" className="text-gray-500 hover:text-indigo-600 transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-500 hover:text-indigo-600 transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );

  return (
    <html lang="en">
      <body className={`min-h-screen flex flex-col bg-white text-gray-800 ${inter.className}`}>
        {!hideHeader && header}
        <main
          className={`w-full max-w-[1000px] mx-auto flex-grow px-4 ${
            centerPage ? "flex items-center justify-center" : "py-8"
          }`}
        >
          {children}
        </main>
        {footer}
      </body>
    </html>
  );
}