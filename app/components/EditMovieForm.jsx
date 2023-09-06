"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function EditMovieForm({ id, movieName, description }) { // Destructured props
    const [newMovieName, setNewMovieName] = useState(movieName);
    const [newDescription, setNewDescription] = useState(description);
    const router = useRouter();
    // Handle form submission
    const handleSubmit = async (e) => {
        
        e.preventDefault();
        const apiUrl = process.env.NEXT_PUBLIC_API_URL; // Get the API URL from .env

        try {
          const res = await fetch(`${apiUrl}/api/movies/${id}`, {
            method: "PUT",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify({ newMovieName, newDescription }),
          });
    
          if (!res.ok) {
            throw new Error("Failed to update the movie.");
          }
    
          router.refresh();
          router.push("/");
        } catch (error) {
          console.log(error);
        }
    
        // Implement logic to send the updated data to the server.
        // For instance, you might make an API call here with newMovieName and newDescription.
        console.log('Movie Name:', movieName);
        console.log('Description:', description);
        console.log("Updated movie name:", newMovieName);
        console.log("Updated movie description:", newDescription);
    }

    return (
        <form className="flex flex-col gap-3" onSubmit={handleSubmit}> {/* Added submission handler */}
            <input 
                className='border border-slate-200 p-2 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-slate-400'
                type="text"
                placeholder={movieName}
                value={newMovieName} // This will display the current movie name
                onChange={(e) => setNewMovieName(e.target.value)} // Update the value on change
            />  
            <input 
                className='border border-slate-200 p-2 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-slate-400'
                type="text"
                placeholder={description}
                value={newDescription} // This will display the current movie description
                onChange={(e) => setNewDescription(e.target.value)} // Update the value on change
            />  
            <button 
                className='bg-slate-600 hover:bg-slate-500 font-semibold text-white py-2 px-5 rounded-md shadow-md transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-slate-400'
                type="submit" // Specify the button type
            >
                Update Movie
            </button>
        </form>
    )
}
