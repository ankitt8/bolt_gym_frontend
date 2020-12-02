/* eslint-disable */
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const AWS = require('aws-sdk');
const fs = require('fs');
const dotenv = require('dotenv');
// getting User Modal
const User = require('./models/User');
const connectDB = require('./config/db');
// load config
dotenv.config({ path: './config/config.env' });
const app = express();
const bodyParser = require('body-parser');
// use bodyParser to parse req.body
const jsonParser = bodyParser.json();

app.use('/', jsonParser);
app.use(cors());
// configuring the DiscStorage engine.
const storage = multer.diskStorage({
  destination: 'uploads/',
  filename(req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

// setting the credentials
// The region should be the region of the bucket that you created
// Visit this if you have any confusion - https://docs.aws.amazon.com/general/latest/gr/rande.html
AWS.config.update({
  accessKeyId: process.env.IAM_ACCESS_ID,
  secretAccessKey: process.env.IAM_SECRET_KEY,
  region: 'us-west-2',
});

// Creating a new instance of S3:
const s3 = new AWS.S3();

app.post('/api/in_time', (req, res) => {
  const { userId } = req.body;
  console.log(userId)
  User.findById(userId, (err, doc) => {
    if (err) {
      res.status(400).json({ Status: `Failed to find user with id ${userId}` });
    } else {
      doc.attendance.push({
        $each: [{ inTime: new Date(), outTime: null, date: new Date() }],
        $position: 0,
      });
      doc.save((err) => {
        if (err) {
          res.status(400).json({ Status: `Failed to save the in time for user with id ${userId}` });
        } else {
          res.status(200).json({ Status: `In Time updated succesffuly for user ${userId}` });
        }
      });
    }
  });
});
app.post('/api/out_time', (req, res) => {
  const { userId } = req.body;
  User.findById(userId, (err, doc) => {
    if (err) {
      res.status(400).json({ Status: `Failed to find user with id ${userId}` });
    } else {
      doc.attendance[0].outTime = req.body.date || new Date();
      doc.save((err) => {
        if (err) {
          res.status(400).json({ Status: `Failed to save the out time for user with userId ${userId}` });
        } else {
          res.status(200).json({ Status: `Out Time updated succesffuly for user with ${userId}` });
        }
      });
    }
  });
});

app.get('/api/testing', (req, res) => {
  User.findById('5fb804b1fb6cdb38ec3f521e', (err, doc) => {
    if (err) {
      console.log('Error');
      res.status(400).json({ Status: 'Failed' });
    } else {
      console.log(doc.attendance);
      // doc.name = "Ankita"
      doc.attendance.push({
        $each: [{ inTime: new Date(), outTime: new Date(), date: new Date() }],
        $position: 0,
      });
      doc.save((err) => {
        if (err) {
          console.log('error');
        } else {
          console.log(doc.attendance);
          console.log('saved');
          res.status(200).json({ Status: 'Attendance updated' });
        }
      });
    }
  });
});

// POST method to register a new entry
app.post('/api/add_user', (req, res) => {
  const user = new User(req.body);
  console.log(req.body);
  user.save()
    .then((user) => {
      res.status(200).json({ Status: `User with name ${req.body.name} registered successfully!` });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).send('Something went wrong');
    });
});

// POST method to get user detials to shown on home page
app.get('/api/get_users', (req, res) => {
  User.find({}, (err, result) => {
    if (err) {
      res.status(400).send('Something went wroing');
    } else {
      res.status(200).json(result);
    }
  });
});

// POST method route for uploading file
app.post('/api/post-file', upload.single('demo_file'), (req, res) => {
  // Multer middleware adds file(in case of single file ) or files(multiple files) object to the request object.
  // req.file is the demo_file
  uploadFile(req.file.path, req.file.filename, res);
});

// GET method route for downloading/retrieving file
app.get('/api/get-file/:file_name', (req, res) => {
  retrieveFile(req.params.file_name, res);
});



// The uploadFile function
function uploadFile(source, targetName, res) {
  console.log('preparing to upload...');
  fs.readFile(source, (err, filedata) => {
    if (!err) {
      const putParams = {
        Bucket: 'manishcomplexgym',
        Key: targetName,
        Body: filedata,
      };
      s3.putObject(putParams, (err, data) => {
        if (err) {
          console.log('Could nor upload the file. Error :', err);
          return res.send({ success: false });
        }
        fs.unlink(source, (err) => {
          if (err) throw err;
          console.log(`${source} deleted successfully!!`);
        });// Deleting the file from uploads folder(Optional).Do Whatever you prefer.
        console.log('Successfully uploaded the file');
        return res.send({ success: true });
      });
    } else {
      console.log({ err });
    }
  });
}

// The retrieveFile function
function retrieveFile(filename, res) {
  const getParams = {
    Bucket: 'manishcomplexgym',
    Key: filename,
  };

  s3.getObject(getParams, (err, data) => {
    if (err) {
      return res.status(400).send({ success: false, err });
    }
    return res.send(data.Body);
  });
}
const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  connectDB();
});
