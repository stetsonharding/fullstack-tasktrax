Full Stack React Express Application
Introduction
This repository contains a simple Full Stack Express / React application. It is intended to demonstrate as wide an array of features as possible while still keeping the app simple and easy to understand.

This application consists of Front End component (located in the app directory) that is built with Redux and React. It also has a Back End component (located in the server directory) that uses Express to manage

Installation
First, install the programs required to run the application:

Git
Node.js
Mongo.DB
Next, clone this repository and install dependencies:

git clone https://github.com/stetsonharding/fullstack-tasktrax.git
npm install
Also, make sure MongoDB is running by navigating to the installation directory and running (in cmd or terminal), replacing the path with your chosen Mongo directory:

C:\Data\bin\mongod.exe
Now, start the development environment with the following command:

npm run dev
The application should open automatically.

Troubleshooting
Problem: The application won't start!

Try:

Run npm install again
Update your version of Node.js to the latest
Clone the finished repo and start from there
Problem: I'm getting weird error XYZ!

Try:

Cancel npm run dev (with ctrl-C on windows) and run it again
If there error mentions any particular file, visit that file and make sure you didn't make any common errors (capitalization of property names, forgetting to destructure paramaters with curly brackets)
Still no luck? Clone the finished repo and prune away parts of it until you are at the point you left off.
Challenge Task Solutions
Connected Username Component
Create a connected username component which matches user data with an ID provided as a prop.
Update the server-side state assembly process to include the usernames (but not passwords or any sensitive data) of any users which will be relevant to the current session.
Sign Up
This version of the application is found at the Add Sign Up Branch.

Add a link to the sign up page from the login page.
Create a Sign Up route, which is almost identical to the Login route.
Add a saga to communicate requests from the Login Route to the server.
Add a route to the server which creates new users in the database.
