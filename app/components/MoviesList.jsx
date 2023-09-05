"use client";

import Link from "next/link";
import { useState, useEffect } from 'react';
import RemoveBtn from "./RemoveBtn";
import { HiPencilAlt } from "react-icons/hi";
import Cors from 'micro-cors';


const getMovieNames = async () => {
    try {
        const res = await fetch('https://moviemagic-dpiwhd2cj-groovygg.vercel.app/api/movies', {
            cache: 'no-store',
        });

        if (!res.ok) {
            throw new Error(`Failed to fetch movies. Status: ${res.status}`);
        }
        const data = await res.json();

        // Log the response for visibility
        console.log("Fetched data from API:", data);

        return data;  // make sure this is an array
    } catch (error) {
        console.error("Error fetching movie name:", error.message);
        return [];  // fallback to an empty array
    }
};

export default function MoviesList() {
    const [movieNames, setMovieNames] = useState([]);

    useEffect(() => {
        (async () => {
            const movies = await getMovieNames();
            console.log("Movies after fetch:", movies);
            setMovieNames(movies.movies);
        })();
    }, []);
    

    return (
        <>
            {Array.isArray(movieNames) && movieNames.map((m) => (
                <div 
                    key={m._id}
                    className="p-5 border border-slate-200 my-4 flex justify-between gap-4 items-center bg-white shadow-md hover:shadow-lg transition-shadow duration-300 rounded-lg">
                <div>
                    <h2 className="font-semibold text-2xl text-slate-800 mb-1">{m.movieName}</h2>
                    <div className="text-slate-600">{m.description}</div>
                </div>

                <div className="flex gap-3 items-center">
                    <RemoveBtn/>
                    <Link href={`/editMovie/${m._id}`}>
                        <div className="bg-slate-200 p-2 rounded-full cursor-pointer hover:bg-slate-300 transition-colors duration-300">
                            <HiPencilAlt className="text-slate-600 hover:text-slate-800" size={24} />
                        </div>
                    </Link>
                </div>
            </div>
            ))}
        </>
    );
}
