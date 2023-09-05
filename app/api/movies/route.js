import connectMongoDB from "@/libs/mongodb";
import Movie from "@/models/movie";
import { NextResponse } from "next/server";


export async function POST(request) {
    try {
        // Ensure MongoDB connection
        await connectMongoDB();
        // Parse the request body
        const { movieName } = await request.json();
        // Validation (can be extended based on your needs)
        if (!movieName) {
            return NextResponse.json({ message: "Movie name is required" }, { status: 400 });
        }
        // Check if movie with the same name already exists
        const existingMovie = await Movie.findOne({ movieName });
        if (existingMovie) {
            return NextResponse.json({ message: "Movie with the same name already exists" }, { status: 409 });
        }
        // Create a new movie
        await Movie.create({ movieName });
        // Return a success response
        return NextResponse.json({ message: "Movie created successfully" }, { status: 201 });
    } catch (error) {
        // Log the error (better logging can be implemented based on your needs)
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