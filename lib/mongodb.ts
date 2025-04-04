import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI as string;
if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable in your .env.local file"
  );
}
declare global {
  // eslint-disable-next-line no-var
  var mongoose: {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
  };
}

let cached = global.mongoose as
  | { conn: typeof mongoose | null; promise: Promise<typeof mongoose> | null }
  | undefined;
if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

const connectMongoDB = async () => {
  if (cached!.conn) {
    return cached!.conn;
  }
  if (!cached!.promise) {
    const opts = { bufferCommands: false };
    cached!.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      console.log("Connected to MongoDB.");
      return mongoose;
    });
  }
  cached!.conn = await cached!.promise;
  return cached!.conn;
};

export default connectMongoDB;
