import connectMongoDB from "@/libs/mongodb";
import Movie from "@/models/movie";
import { NextResponse } from "next/server";

export async function POST (request) {
    const { movieName } = await request.json();
    await connectMongoDB();
    await Movie.create({ movieName });
    return NextResponse.json({ message: "Movie created successfully" },{ status: 201});

}
