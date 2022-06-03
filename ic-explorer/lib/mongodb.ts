/* eslint-disable vars-on-top */
/* eslint-disable import/no-mutable-exports */
/* eslint-disable no-var */
import { MongoClient } from 'mongodb';

// adapted from https://github.com/vercel/next.js/blob/7ac7ae62b0a8b4c48172b54099e7a8e52661c493/examples/with-mongodb/lib/mongodb.js

declare global {
  var mongoClientPromise: Promise<MongoClient>;
}

const options = {};

let client;
let clientPromise: Promise<MongoClient>;

if (!process.env.MONGO_URI) {
  throw new Error('MONGO_URI must be defined in the environment');
}

if (process.env.NODE_ENV === 'development') {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  if (!global.mongoClientPromise) {
    client = new MongoClient(process.env.MONGO_URI, options);
    global.mongoClientPromise = client.connect();
  }
  clientPromise = global.mongoClientPromise;
} else {
  // In production mode, it's best to not use a global variable.
  client = new MongoClient(process.env.MONGO_URI, options);
  clientPromise = client.connect();
}

// Export a module-scoped MongoClient promise. By doing this in a
// separate module, the client can be shared across functions.
export default clientPromise;
