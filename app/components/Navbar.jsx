import Link from "next/link";

export default function Navbar() {
    return (
      <nav className="flex justify-between items-center bg-slate-800 px-4 py-3">
        <Link className="text-white font-bold text-xl" href={"/"}>Home</Link>
        <Link className="bg-white p-2" href={"/about"}>About</Link>
      </nav>
    );
}
