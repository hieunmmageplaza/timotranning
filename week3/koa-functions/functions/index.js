const hello  = require("./src/handlers/timo")
const functions = require("firebase-functions")
const apiHandler = require("./src/handlers/api")

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

exports.timotest = functions.https.onRequest(apiHandler.callback());
