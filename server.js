var express = require('express');
var app = express();
var path = require('path');
var multer = require ('multer');

var storage = multer.memoryStorage();
var upload = multer({ storage: storage });

var upload = multer().single('data')
 
app.post('/upload', function (req, res) {
  upload(req, res, function (err) {
    if (req.file) {
    res.status(200).json({
     // filename: req.file.originalname,
      size: req.file.size
     // type: req.file.mimetype
      });
    } else {
      res.status(500).json({ error: `No file was provided in the 'data' field` });
    }
  })
})

app.get('/:fileupload', function(req,res){
 var fileName = path.join(__dirname, 'server.html');
  res.sendFile(fileName, function (err) {
    if (err) {
      console.log(err);
      res.status(err.status).end();
    }
    else {
      console.log('Sent:', fileName);
    }
  });
  
}); 

app.get('/', function(req,res){
 var fileName = path.join(__dirname, 'views/index.html');
  res.sendFile(fileName, function (err) {
    if (err) {
      console.log(err);
      res.status(err.status).end();
    }
    else {
      console.log('Sent:', fileName);
    }
  });
  
}); 





// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
