import Link from "next/link";

export default function Navbar() {
    return (
        <nav className="flex justify-between items-center bg-slate-800 px-6 py-3 shadow-md">
            <Link className="text-white font-bold text-2xl hover:text-slate-400 transition-colors duration-300" href={"/"}>Movie Magic</Link>
            <Link className="bg-slate-700 text-white p-2 rounded hover:bg-slate-600 transition-colors duration-300" href={"/addTopic"}>Add Topic</Link>
        </nav>
    );
}
