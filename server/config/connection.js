import mongoose from "mongoose";

export const connection = () =>
  mongoose.connect(
    process.env.MONGODB_URI || "mongodb://localhost/google-book-search",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    }
  );
