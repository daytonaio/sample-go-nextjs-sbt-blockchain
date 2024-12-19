import Link from "next/link";
import { Award } from "lucide-react";

const Navbar = () => (
  <div className="py-2 px-4 bg-indigo-50 text-black">
    <div className="container mx-auto gap-4 flex justify-between items-center">
      <h1 className="text-2xl font-mono font-extrabold flex items-center justify-center gap-2 text-[#283593]">
        <Award className="h-7 w-7 text-[#283593]" />
        Certify
      </h1>

      <div className="flex flex-wrap rounded-2xl px-1 py-1 appearance-none">
        <ul className="font-medium text-xl flex flex-row justify-between w-full transition-colors duration-500 ease-in-out">
          <a
            href="#home"
            className="relative px-4 py-2 mx-2 hover:bg-zinc-950 transition-colors duration-200 ease-in-out hover:text-white rounded-xl font-mono font-bold"
          >
            Home
          </a>
          <a
            href="#how-it-works"
            className="relative px-4 py-2 mx-2 hover:bg-zinc-950 transition-colors duration-200 ease-in-out hover:text-white rounded-xl font-mono font-bold"
          >
            How it works
          </a>
          <a
            href="#about"
            className="relative px-4 py-2 mx-2 hover:bg-zinc-950 transition-colors duration-200 ease-in-out hover:text-white rounded-xl font-mono font-bold"
          >
            About
          </a>
        </ul>
      </div>

      <button className="bg-zinc-950 border-2 text-white font-mono transition-colors rounded-2xl py-3 px-5 duration-200 ease-in-out hover:bg-white hover:text-black hover:border-2 hover:border-gray-300">
        <Link href="/block">Get Started</Link>
      </button>
    </div>
  </div>
);

export default Navbar;
