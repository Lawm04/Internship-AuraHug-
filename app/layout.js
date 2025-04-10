import { Fugaz_One, Open_Sans } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const inter = Open_Sans({ subsets: ["latin"] });
const fugaz = Fugaz_One({ subsets: ["latin"], weight: ["400"] });

export const metadata = {
  title: "AuraHug",
  description: "Track your daily mood!",
};

export default function RootLayout({ children }) {
  const header = (
    <header className="p-4 sm:p-8 flex items-center justify-between gap-4 bg-gray-300 w-full">
      <h1 className={`text-base sm:text-lg textGradient ${fugaz.className}`}>
        AuraHug
      </h1>
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
        <span>AuraHug. All rights are reserved</span>
      </p>
    </footer>
  );

  return (
    <html lang="en">
      <body className={"text-sm sm:text-base min-h-screen flex flex-col text-gray-800 " + inter.className}>
        {header}
        <main className="w-full max-w-[1000px] mx-auto flex-grow">{children}</main>
        {footer}
      </body>
    </html>
  );
}
