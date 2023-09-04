import Link from "next/link";
import RemoveBtn from "./RemoveBtn";
import {HiPencilAlt} from "react-icons/hi";

export default function TopicsList() {
    return (
        <>
            <div className="p-4 border border-slate-300 my-3 flex justify-between gap-5"> 
                <div>
                    <h2>Topic Title</h2>
                    <div> Topic Description</div>   
                </div>

                <div>
                    <RemoveBtn/>
                    <Link href={'/editTopic/123'}>
                        <HiPencilAlt size={24}/>
                    </Link>
                </div>
            </div>
        </>
    )
}