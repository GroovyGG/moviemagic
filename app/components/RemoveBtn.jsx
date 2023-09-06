"use client";

import { HiOutlineTrash } from "react-icons/hi";
import { useRouter } from "next/navigation";

export default function RemoveBtn({ id }) {  // Destructured id from props
    const router = useRouter();

    const removeMovie = async () => {
        const confirmed = confirm('Are you sure you want to delete this movie?');
        if (!confirmed) return;
    
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        // Ensure the URL is properly formatted
        const endpoint = apiUrl.endsWith("/") 
            ? `api/movies?id=${id}` 
            : `/api/movies?id=${id}`;
    
        try {
            
            const res = await fetch(apiUrl + endpoint, {
                method: 'DELETE',
                cache: 'no-store'
            });
            if(res.ok) {
                // Refresh the current page to reflect the changes
                router.refresh();
                router.push("/");
          
            }
    
            if (!res.ok) {
                throw new Error('Failed to delete the movie.');
            }
    
            
    
        } catch (error) {
            console.error("Error deleting movie:", error.message);
        }
    };

    return (
        <button className="text-red-400" onClick={removeMovie}>  
            <HiOutlineTrash size={24} />
        </button>
    );
}