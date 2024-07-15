import { MongoClient } from 'mongodb';


const url = 'mongodb://localhost:27017/myorganizer';
//Connection for reuse
let db = null;

//Function to connect to database
export async function connectDB() {
    if(db) return db;
    let client = await MongoClient.connect(url, {useNewUrlParser: true});
    db = client.db()
    console.info('Got DB,', db)
    return db;
}

