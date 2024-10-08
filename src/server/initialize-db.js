import {defaultState} from './defaultState'
import { connectDB } from './connect-db'

async function initializeDB() {
    //get Database connection
    let db = await connectDB();

    let user = await db.collection('users').findOne({id:'U1'});

    if(!user){

        //Insert default data into database.
        for(let collectionName in defaultState){
            let collection = db.collection(collectionName);
            await collection.insertMany(defaultState[collectionName]);
            
        }
    }

}

initializeDB();