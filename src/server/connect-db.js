import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';


// Load environment variables from .env file
dotenv.config();

//const url = process.env.ORMONGO_URL || 'mongodb://localhost:27017/myorganizer';
const url = process.env.MONGODB_URI || 'mongodb://localhost:27017/TaskTrax'
//Connection for reuse
let db = null;

//Function to connect to database
export async function connectDB() {
    if(db) return db;

    try{

        // let client = await MongoClient.connect(url, { useUnifiedTopology: true });

        const client = await MongoClient.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            ssl: true,
            sslValidate: false, // Adjust based on your SSL requirements
          });

          db = client.db('test');
          return db;
    }catch(error){
        console.error('Failed to connect to database', error)
        throw new Error("database connection error")
    }
}

