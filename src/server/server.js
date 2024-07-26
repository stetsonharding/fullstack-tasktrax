import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import { connectDB } from './connect-db'
import "./initialize-db"
import path from 'path'

import { authenticationRoute } from './authenticate'
import { toUnicode } from 'punycode'

let port = process.env.PORT || 7777;




//create new express instance
let app = express();
app.listen(port, console.log('Server lisening on port', port))

// CORS configuration
const corsOptions = {
    origin: 'https://tasktrax-691ef54c2e05.herokuapp.com', // Your frontend origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 200
};

// Apply CORS middleware globally
app.use(cors(corsOptions));

// Use bodyParser after CORS middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Define routes after middleware setup
authenticationRoute(app);

// Serve static files for production
if(process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, '../../dist')));
    app.get('/*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../../dist/index.html'));
    });
}


//function to add task and communicate with database for testing
export const addNewTask = async (task) => {
    let db = await connectDB();
    let collection = db.collection('tasks')
    await collection.insertOne(task)
}

export const updateTask = async (task) => {
    let { id, group, isComplete, name } = task;
    let db = await connectDB();
    let collection = db.collection('tasks')

    //update group attr
    if (group) {
        //Pass the id of the task you want to update, and set the new group user has defined
        await collection.updateOne({ id }, { $set: {group} })
    }
    //update name attr
    if (name) {
        await collection.updateOne({ id }, { $set:  {name}  })
    }
    //update isComplete attr
    if (isComplete !== undefined) {
        await collection.updateOne({ id }, { $set: { isComplete } })
    }
}


export const deleteTask = async (task) => {
    let { id } = task;
    let db = await connectDB();
    let collection = db.collection('tasks')

    //update group attr
    if (id) {
        //Pass the id of the task you want to update, and set the new group user has defined
        await collection.deleteOne({ id })
    }

}


//root to add new tasks
app.post('/task/new', async (req, res) => {
    let task = req.body.task;
    await addNewTask(task);
    res.status(200).send();
})

//root to update tasks
app.post('/task/update', async (req, res) => {
    let task = req.body.task;
    await updateTask(task);
    res.status(200).send();
})

//root to delete tasks
app.post('/task/delete', async (req, res) => {
    let task = req.body.task;
    await deleteTask(task);
    res.status(200).send();
})

