import mongoose from "mongoose";

export default async () =>
  mongoose.connect(process.env.DB_URL, {
    dbName: process.env.DB_NAME,
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });
