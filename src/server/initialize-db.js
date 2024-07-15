import {defaultState} from './defaultState'
import { connectDB } from './connect-db'

async function initializeDB() {
    //get Database connection
    let db = await connectDB();

    //Insert default data into database.
    for(let collectionName in defaultState){
        let collection = db.collection(collectionName);
        await collection.insertMany(defaultState[collectionName]);
        
    }
}

initializeDB();