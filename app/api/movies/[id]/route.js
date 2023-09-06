import Movie from "@/models/movie";
import connectMongoDB from "@/libs/mongodb";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
    try {
        // Connect to MongoDB
        await connectMongoDB();

        // Extract movie ID from the parameters
        const { id } = params;

        // If no ID is provided, return a 400 error
        if (!id) {
            return NextResponse.json({ message: "Movie ID is required" }, { status: 400 });
        }

        // Extract movie details from the request
        const { newMovieName: movieName, newDescription: description } = await request.json();

        // If neither a new movie name nor a new description is provided, return a 400 error
        if (!movieName && !description) {
            return NextResponse.json({ message: "New movie name or description is required" }, { status: 400 });
        }

        // Update the movie with the new details
        const movie = await Movie.findByIdAndUpdate(id, { movieName, description }, { new: true });

        // If no movie matches the ID, return a 404 error
        if (!movie) {
            return NextResponse.json({ message: "Movie not found" }, { status: 404 });
        }

        // Return a success message
        return NextResponse.json({ message: "Movie updated successfully" }, { status: 200 });

    } catch (error) {
        console.error("Error while updating movie:", error);

        // Handle specific MongoDB errors or add more cases if needed
        if (error.name === 'CastError' && error.kind === 'ObjectId') {
            return NextResponse.json({ message: "Invalid Movie ID format" }, { status: 400 });
        }

        // Return a general server error response
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}

// Existing imports and PUT function ...

export async function GET(request, { params }) {
    try {
        // Connect to MongoDB
        await connectMongoDB();

        // Extract movie ID from the parameters
        const { id } = params;

        // If no ID is provided, return a 400 error
        if (!id) {
            return NextResponse.json({ message: "Movie ID is required" }, { status: 400 });
        }

        // Fetch the movie with the given ID
        const movie = await Movie.findById(id);

        // If no movie matches the ID, return a 404 error
        if (!movie) {
            return NextResponse.json({ message: "Movie not found" }, { status: 404 });
        }

        // Return the fetched movie
        return NextResponse.json({movie}, { status: 200 });

    } catch (error) {
        console.error("Error while fetching movie:", error);

        // Handle specific MongoDB errors or add more cases if needed
        if (error.name === 'CastError' && error.kind === 'ObjectId') {
            return NextResponse.json({ message: "Invalid Movie ID format" }, { status: 400 });
        }

        // Return a general server error response
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}
