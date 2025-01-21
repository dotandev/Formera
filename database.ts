import mongoose from "mongoose";
import config from "./Config/config";
import jwt from 'jsonwebtoken'

function hashCrypto (thing: any) {
    const res = jwt.sign({thing}, 'erty')
    return res.trimEnd()
}

export const connectToDB = async () => {
  try {
    const conn = await mongoose.connect(config.db.mongodb.MONGO_URL, {});

    console.log(`MongoDB Connected: ${hashCrypto(conn.connection.host)}`);
  } catch (error) {
    console.error(`Error: ${error}`);
    process.exit(1);
  }
};