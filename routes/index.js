var express = require('express');
var router = express.Router();
var fs = require('fs');
var time = 0;
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/', function(req, res, next) {
  var newfile = fs.createWriteStream('myfile.txt');
  var fileLength = req.headers['content-length'];
  var uploadedBytes = 0;
  time = new Date().getTime();
  req.pipe(newfile);

   req.on('data', function(chunk) {
      uploadedBytes += chunk.length;
      var progress = uploadedBytes / fileLength * 100; // Phần trăm upload file.
      console.log('Uploaded: ' + parseInt(progress, 10) + '% \n');
  });

   req.on('end', function() {
      console.log(new Date().getTime() - time);
      console.log('Your file was uploaded successful!');
      res.send(new Date().getTime() - time);
   });
});
module.exports = router;
