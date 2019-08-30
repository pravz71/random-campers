## Random Campers

A platform similar to a blog where users can share about the campgrounds they have visited, allows users to comment and view campgrounds shared by other users. 
A user can add campgrounds only if they are logged in and delete a post or a comment if they own it.
Technologies: Node.js, Express, MongoDB, Passport, Bootstrap, HTML
Deployed on Heroku: https://random-campers-pravin.herokuapp.com

## Requirements
* Node
* Git

## Common Setup
Clone the repo and install the dependencies.
```bash
git clone https://github.com/pravz71/random-campers.git
cd random-campers
```
```bash
npm install
```
## Setup environment variables
For Production add the above key-value pair as environment variables. 
Register on mlab.com and create a database - 
```bash
DATABASEURL=mongodb://<db_username>:<db_password>@ds213968.mlab.com:13968/randomcampers
```
For development you can you use the local mongo db database or use mlab database
```bash
mongoose.connect("mongodb://<db_user>:<db_password>@ds213968.mlab.com:13968/randomcampers", { useNewUrlParser: true });
or
mongoose.connect("mongodb://localhost/random_campers", { useNewUrlParser: true });
```
## Start Express Server

```bash
npm start
```
*Open [http://localhost:3000](http://localhost:3000)*

