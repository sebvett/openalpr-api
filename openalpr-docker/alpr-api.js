/* IMPORTS ============================================================================
   Express provides the webserver
   Multer provides Express middleware to handle file uploads
   mimeExtension allows Multer to put an extension on the uploaded file
    (needed by OpenALPR)
   {promisify} turns child_process() in to a promise, allowing a linux
    command to be run asynchronously
   exec allows execution of linux commands (openalpr) */
const express = require('express');
const multer = require('multer');
const mimeExtension = require('mime-types').extension
const {promisify} = require('util');
const exec = promisify(require('child_process').exec)

/* MULTER SETUP ======================================================================
   Define how to handle the uploaded files */
const storage = multer.diskStorage({
  destination: './uploads/',
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + '.' + mimeExtension(file.mimetype))
/*    crypto.pseudoRandomBytes(16, function (err, raw) {
      console.log("Generating filename")
      cb(null, raw.toString('hex') + Date.now() + '.' + mime.extension(file.mimetype));
    });*/
  }
});

/* OPENALPR SETUP ====================================================================
   Define the function to run OpenALPR */
const runAlpr = async function runAlpr (countrycode, filename) {
  // Run OpenALPR on a fixed folder
  var consoleout = await exec("alpr -j -c " + countrycode + " " + filename);
  if (consoleout.stderr != '') {
    throw(consoleout.stderr);
  } else {
    return(consoleout.stdout);
  }
}

/* EXPRESS SETUP =====================================================================
   Create the express app, and define multer middleware for use */
var app = express()
app.use(multer({storage:storage}).single('file')) // Use multer

// Reply with nothing (useful) to a get
app.get('/', async (req, res) => {
  res.send("Hello world!");
});

// Reply with OpenALPR response to image upload
app.post('/', async (req, res) => {
  let alprResult = await runAlpr("us",  `./${req.file.path}`);
  res.json(alprResult);
  res.status(204).end();
});

/* EXPRESS LAUNCH ====================================================================
   Listen on port 3000 */
app.listen(3000);
