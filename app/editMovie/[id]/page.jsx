import EditMovieForm from "@/app/components/EditMovieForm";

/**
 * Fetches movie data by its ID.
 *
 * @param {string|number} id - The ID of the movie.
 * @returns {object|null} - The movie data or null if an error occurs.
 */
const getMovieById = async (id) => {
    // Validate the provided ID
    if (!id) {
        console.error("Provided movie ID is not valid.");
        return [];
    }

    try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        
    
        const res = await fetch(`${apiUrl}/api/movies/${id}`, {
            cache: "no-store",
        });

        // Check the response status
        if (!res.ok) {
            throw new Error(`Failed to fetch movie with id: ${id}. Status: ${res.status}, StatusText: ${res.statusText}`);
        }

        const data = await res.json();

        // Check for empty data or if movieName and description aren't present
        if (!data || !data.movie.movieName || !data.movie.description) {
            console.error("Incomplete data received:", data); // Log the incomplete data
            throw new Error("Received incomplete data from API.");
        }

        // Return the data as an array: [id, movieName, description]
        return [id, data.movie.movieName, data.movie.description];
    } catch (error) {
        console.error(error);
        return []; // Return an empty array in case of errors
    }
};

/**
 * Component to edit a movie.
 *
 * @param {object} props - The component properties.
 * @returns {JSX.Element} - The rendered EditMovieForm component.
 */
export default async function EditMovie({ params }) {
    const { id } = params;
    console.log("Movie ID:", id);

    // Fetch movie data by ID
    const movieDetails = await getMovieById(id);
    if (!movieDetails || movieDetails.length !== 3) {
        // Handle this scenario as per your application's need. For now, just logging an error.
        console.error("Failed to fetch movie data for editing.");
        return null; // or a suitable placeholder/error component
    }

    const [fetchedId, movieName, description] = movieDetails;
    console.log('Fetched Movie ID:', fetchedId); // This should be the same as the provided ID.
    console.log('Movie Name:', movieName);
    console.log('Description:', description);

    return <EditMovieForm id={fetchedId} movieName={movieName} description={description} />;
}

