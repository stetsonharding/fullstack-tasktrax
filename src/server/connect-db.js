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

        let client = await MongoClient.connect(url, { useUnifiedTopology: true });
        db = client.db()
        console.info('Got DB,', db)
        return db;
    }catch(error){
        console.error('Failed to connect to database', error)
        throw new Error("database connection error")
    }
}

