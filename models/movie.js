import mongoose, { Schema } from "mongoose";

const MovieSchema = new Schema({
    movieName:String,
    description:String
});

const Movie = mongoose.models.Movie || mongoose.model("Movie", MovieSchema);

export default Movie;
