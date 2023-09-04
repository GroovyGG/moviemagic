import Link from "next/link";
import RemoveBtn from "./RemoveBtn";
import { HiPencilAlt } from "react-icons/hi";

export default function TopicsList() {
    return (
        <>
            <div className="p-5 border border-slate-200 my-4 flex justify-between gap-4 items-center bg-white shadow-md hover:shadow-lg transition-shadow duration-300 rounded-lg">
                <div>
                    <h2 className="font-semibold text-2xl text-slate-800 mb-1">Movie Title</h2>
                    <div className="text-slate-600">Movie Description</div>
                </div>

                <div className="flex gap-3 items-center">
                    <RemoveBtn/>
                    <Link href='/editTopic/123'>
                        <div className="bg-slate-200 p-2 rounded-full cursor-pointer hover:bg-slate-300 transition-colors duration-300">
                            <HiPencilAlt className="text-slate-600 hover:text-slate-800" size={24} />
                        </div>
                    </Link>
                </div>
            </div>
        </>
    );
}
