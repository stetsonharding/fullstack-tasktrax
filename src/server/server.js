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

//Plugins used in application
app.use(
    cors(),
    //Let us use post requests
    bodyParser.urlencoded({ extended: true }),
    bodyParser.json()
);

authenticationRoute(app)



if(process.env.NODE_ENV == 'production') {
    app.use(express.static(path.resolve(__dirname,'../../dist')));
    app.get('/*',(req,res) => {
        res.sendFile(path.resolve('index.html'))
    })
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
    let tasksCollection = db.collection('tasks');
    let commentsCollection = db.collection('comments');

    if (id) {
        // Delete comments associated with the task from the comments collection
        await commentsCollection.deleteOne({ task: id });
        // Delete the task from the tasks collection
        await tasksCollection.deleteOne({ id });

    }
}


export const addTaskComment = async (comment) => {
    let db = await connectDB();
    let collection = db.collection('comments');

   // Check if a comment with the given task already exists
   const existingComment = await collection.findOne({ task: comment.task });

   if (existingComment) {
       // If the comment exists, update the content field
       await collection.updateOne(
           { task: comment.task }, // Filter by the comment's task field
           { $set: { content: comment.content } } // Update the content field
       );
   } else {
       // If the comment does not exist, insert a new comment
       await collection.insertOne(comment);
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

//root to add comment
app.post('/comment/new', async (req, res) => {
    let comment = req.body.comment;
    await addTaskComment(comment)
    res.status(200).send();
})

