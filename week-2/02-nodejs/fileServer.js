/**
  You need to create an express HTTP server in Node.js which will handle the logic of a file server.
  - Use built in Node.js `fs` module
  The expected API endpoints are defined below,
  1. GET /files - Returns a list of files present in `./files/` directory
    Response: 200 OK with an array of file names in JSON format.
    Example: GET http://localhost:3000/files
  2. GET /file/:filename - Returns content of given file by name
      Description: Use the filename from the request path parameter to read the file from `./files/` directory
      Response: 200 OK with the file content as the response body if found, or 404 Not Found if not found. Should return 
      `File not found` as text if file is not found
      Example: GET http://localhost:3000/file/example.txt
    - For any other route not defined in the server return 404
    Testing the server - run `npm run test-fileServer` command in terminal
 */
const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

/*const dataRead = fs.readFile("a.txt", "utf-8", function(err,data){
  if(err){
    console.error("Error reading file: ", err);
  }
  console.log(data);
})*/

app.get("/files", function(req,res){
  const directorypath = path.join(__dirname, 'files');
  fs.readdir(directorypath, function(err,files){
    if(err){
      console.error("Error reading files : ", err);
    }
    res.status(200).json({files});
  })
})

app.get("/files/:filename", function(req,res){
  const filename = req.params.filename;
  const filepath = path.join(__dirname, 'files', filename);
  fs.readFile(filepath, "utf-8", function(err,data){
    if(err){
      //console.error("File not found: ", err);
      res.status(404).json({msg: "File not found"});
    }
    res.status(200).send(data);
  })
})

app.use(function(req, res){
  res.status(404).send('Not Found');
});

app.listen(3000);

module.exports = app;