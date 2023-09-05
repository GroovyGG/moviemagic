"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddMovie() {
    const [movieName, setMovieName] = useState('');
    const [description, setDescription] = useState('');
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!movieName || !description) {
            alert("Movie name and description are required!");
            return;
        }

        try {
            const res = await fetch("api/movies", {
              method: "POST",
              headers: {
                "Content-type": "application/json",
              },
              body: JSON.stringify({ movieName, description }),
            });
      
            if (res.ok) {
              router.push("/");
            } else {
              throw new Error("Failed to add a movie");
            }
          } catch (error) {
            console.log(error);
          }
    };

    return (
        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
            <input 
                name="movieName"
                onChange={(e) => setMovieName(e.target.value)}
                value={movieName}
                className='border border-slate-200 p-2 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-slate-400'
                type="text" 
                placeholder="Movie Title"
            />
            <input 
                name="description"
                onChange={(e) => setDescription(e.target.value)}
                value={description}
                className='border border-slate-200 p-2 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-slate-400'
                type="text" 
                placeholder="Movie Description"
            />
            <button 
                type="submit"
                className='bg-slate-600 hover:bg-slate-500 font-semibold text-white py-2 px-5 rounded-md shadow-md transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-slate-400'>
                    Add Movie
            </button>
        </form>
    );
}
