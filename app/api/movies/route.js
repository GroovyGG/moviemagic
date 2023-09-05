import connectMongoDB from "@/libs/mongodb";
import Movie from "@/models/movie";
import { NextResponse } from "next/server";


export async function POST(request) {
    try {
        // Ensure MongoDB connection
        await connectMongoDB();

        // Parse the request body
        const { movieName, description } = await request.json();

        // Validation for movieName
        if (!movieName) {
            return NextResponse.json({ message: "Movie name is required" }, { status: 400 });
        }

        // Validation for description (assuming it's also required; remove this block if it's optional)
        if (!description) {
            return NextResponse.json({ message: "Description is required" }, { status: 400 });
        }

        // Check if movie with the same name already exists
        const existingMovie = await Movie.findOne({ movieName });
        if (existingMovie) {
            return NextResponse.json({ message: "Movie with the same name already exists" }, { status: 409 });
        }

        // Create a new movie with both movieName and description
        await Movie.create({ movieName, description });

        // Return a success response
        return NextResponse.json({ message: "Movie created successfully" }, { status: 201 });

    } catch (error) {
        // Log the error
        console.error("Error while creating movie:", error);

        // Return a server error response
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}



// GET all movies
export async function GET() {
    try {
        await connectMongoDB();
        const movies = await Movie.find();
        return NextResponse.json({ data: movies, message: "Movies fetched successfully" });

    } catch (error) {
        console.error("Error while fetching movies:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}

export async function DELETE(request) {
    try {
        await connectMongoDB();

        // Extract the ID from the request
        const id = request.nextUrl.searchParams.get("id");

        if (!id) {
            return NextResponse.json({ message: "Movie ID is required" }, { status: 400 });
        }

        // Use the findByIdAndDelete method to delete the movie by its ID
        const movie = await Movie.findByIdAndDelete(id);

        // If the movie wasn't found, return a 404 error
        if (!movie) {
            return NextResponse.json({ message: "Movie not found" }, { status: 404 });
        }

        // Return a success message
        return NextResponse.json({ message: "Movie deleted successfully" }, { status: 200 });

    } catch (error) {
        console.error("Error while deleting movie:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}
