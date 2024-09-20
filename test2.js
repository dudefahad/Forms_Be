
// import { corsConfig, REQUEST_FAILURE_MESSAGES, REQUEST_SUCCESS_MESSAGE, SECRET_KEY, SOCKET_EVENTS } from '/home/ameer/mp/ts_be/GFC-BE-APP/src/common/constants.ts';
// import mongoose from 'mongoose';

const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://ameerfahadmca22:ameerfahadmca22@forms.ep9emns.mongodb.net/forms?retryWrites=true&w=majority&appName=Forms")
  .then(() => {
    console.log("coneection succeeded");
    // console.log(server);
  })
  .catch((err) => {
    console.log("connection failed", err);
    console.log("same conectiin fialed");
    process.exit();
  });


// const mongoose = require('mongoose');

// // Replace with your actual MongoDB connection string
// const MONGODB_URI = "mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.2.15"

// // "mongodb+srv://CollegeLogin:CollegeLogin@firstcluster.zr33pxh.mongodb.net/?retryWrites=true&w=majority&appName=Forms";
// // mongodb+srv://ameerfahadmca22:<db_password>@forms.ep9emns.mongodb.net/?retryWrites=true&w=majority&appName=Forms
// // Connect to the MongoDB cluster
// mongoose.connect(MONGODB_URI)
//   .then(() => {
//     console.log("Connected to MongoDB cluster successfully!");
//     // Your server or application logic here
//   })
//   .catch((err) => {
//     console.error("Error connecting to MongoDB cluster:", err);
//   });
