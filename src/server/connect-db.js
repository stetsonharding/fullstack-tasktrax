import { MongoClient } from 'mongodb';


//const url = process.env.ORMONGO_URL || 'mongodb://localhost:27017/myorganizer';
const url = "mongodb+srv://stetsonharding:LfaXTEVJ3LG5RCHI@tasktrax.jbd2uh2.mongodb.net/?retryWrites=true&w=majority&appName=TaskTrax" || 'mongodb://localhost:27017/TaskTrax'
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

