# Mongo-and-Mongoose
This project describes connecting to Mongo database using Mongoose. 

**Contents of the repository**
This repository contains three main JavaScript files, two json files, and one folder for node modules.

**About the Project**
This project demonstrates 
1) Creating Mongoose model, inserting multiple objects, finding using Mongoose, updating using Mongoose, and deleting with Mongoose. 
2) Mongoose validation errors, Model instance methods, Mongoose virtuals, and defining Mongoose Middleware. 

**Note** 

**Index.js**

Please note that for finding, updating, and deleting, the codes along with their output have been commented. 

To verify, please run the index.js file in the terminal using 

_nodemon index.js_

To view the database, go to the mongo terminal by entering the following in the terminal.

_mongo_

Switch to the movieApp database using 

_use movieApp_

View the contents of the database using

_db.movies.find()_

**product.js**

This file contains demonstration regarding model instance method and Mongoose validation errors. To verify, run the following in the terminal - 

_nodemon product.js_

**person.js**

This file contains demonstration regarding Mongoose middleware.
