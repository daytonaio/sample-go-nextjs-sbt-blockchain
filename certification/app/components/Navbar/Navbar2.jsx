import Link from "next/link";
import { Award } from "lucide-react";
const Navbar2 = () => (
  <div className="py-2 px-4 bg-indigo-50 text-black">
    <div className="container mx-auto gap-4 flex justify-between items-center">
      <h1 className="text-2xl font-mono font-extrabold flex items-center justify-center gap-2 text-[#283593]">
        <Award className="h-7 w-7 text-[#283593]" />
        <Link href="/">Certify</Link>
      </h1>
      <div className="flex flex-wrap rounded-xl px-1 py-1 appearance-none">
        <div className="font-medium text-lg flex flex-row justify-between w-full transition-colors duration-500 ease-in-out">
          <Link
            href="/all-sbt"
            className="relative px-4 py-2 mx-2 hover:bg-zinc-950 transition-colors duration-200 ease-in-out hover:text-white rounded-xl font-mono font-bold"
          >
            All SBT
          </Link>
          <Link
            href="/block"
            className="relative px-4 py-2 mx-2 hover:bg-zinc-950 transition-colors duration-200 ease-in-out hover:text-white rounded-xl font-mono font-bold"
          >
            Issue/Verify SBT
          </Link>
          <Link
            href="/transfer-sbt"
            className="relative px-4 py-2 mx-2 hover:bg-zinc-950 transition-colors duration-200 ease-in-out hover:text-white rounded-xl font-mono font-bold"
          >
            Transfer SBT
          </Link>
        </div>
      </div>

      <button className="bg-zinc-950 border-2 text-white font-mono rounded-2xl py-3 px-5">
        <Link href="">Connected</Link>
      </button>
    </div>
  </div>
);

export default Navbar2;
