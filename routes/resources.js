const router = require('express').Router();
const jwt = require('jsonwebtoken');
const multer = require('multer');
const stream = require('stream');
let Project = require('../models/Project');

//flags
let resourcesFlags = {
  updatingThumbnails: false
};

//confingure and import for Google API
const { google } = require('googleapis');
//load credentials from env
const credentials = JSON.parse(process.env.GOOGLE_CREDENTIALS);

const scopes = ['https://www.googleapis.com/auth/drive'];
const auth = new google.auth.JWT(
  credentials.client_email,
  null,
  credentials.private_key,
  scopes
);

const drive = google.drive({ version: 'v3', auth });

const upload = multer({
  storage: multer.MemoryStorage,
  limits: {
    fileSize: 5 * 1024 * 1024 // no larger than 5mb
  }
});

//upload file to google drive and return webLink+thumbnailLink
router
  .use(upload.single('pFile'))
  .route('/upload')
  .post(async (req, res) => {
    let fileObject = req.file;

    if (!fileObject) {
      res.sendStatus(500);
    } else {
      let bufferStream = new stream.PassThrough();
      const newFilename = Date.now() + '-' + fileObject.originalname;

      bufferStream.end(fileObject.buffer);
      let resp = await drive.files.create({
        auth: auth,
        media: {
          mimeType: fileObject.mimetype,
          body: bufferStream
        },
        resource: {
          name: newFilename
          // if you want to store the file in the root, remove this parents
          //parents: ['Drive folder id in which the file needs to be uploaded.']
        },
        fields: 'id, webContentLink, thumbnailLink'
      });

      drive.permissions
        .create({
          auth: auth,
          fileId: resp.data.id,
          resource: {
            type: 'anyone',
            role: 'reader'
          },
          fields: 'id'
        })
        .then(function(subresp) {
          console.log(
            '--Permissions to uploaded file granted (--set reader to anyone). '
          );
        })
        .catch(function(error) {
          console.log(error);
        });

      res.status(200).json(
        JSON.stringify({
          webContentLink: resp.data.webContentLink,
          thumbnailLink: resp.data.thumbnailLink
        })
      );
    }
  });

//update all thumbnails (request from client/projects.component - unable to load thumbnails)
router.route('/updateallthumbnails').get(async (req, res) => {
  console.log('/updateallthumbnails');
  if (!resourcesFlags.updatingThumbnails) {
    resourcesFlags.updatingThumbnails = true;

    let resp = await drive.files.list(
      {
        auth: auth,
        fields: 'files(webContentLink, thumbnailLink)'
      },
      (err, resp) => {
        if (err) {
          res.sendStatus(500);
          throw err;
        }

        Project.find({}, (err, projects) => {
          projects.map(project => {
            fileImg1 = resp.data.files.find(
              file => file.webContentLink === project.img1
            );
            fileImg2 = resp.data.files.find(
              file => file.webContentLink === project.img2
            );
            fileImg3 = resp.data.files.find(
              file => file.webContentLink === project.img3
            );

            console.log('Project: ' + project._id + ' updating thumbnails.');

            Project.findByIdAndUpdate(
              project._id,
              {
                img1thumbnail: fileImg1.thumbnailLink,
                img2thumbnail: fileImg2.thumbnailLink,
                img3thumbnail: fileImg3.thumbnailLink
              },
              err => {
                if (err) {
                  console.log(err);
                  res
                    .status(500)
                    .send('Erorr, unable to update project thumbnails');
                  return;
                }
              }
            );
          });
        });
      }
    );
    resourcesFlags.updatingThumbnails = false;
    res.sendStatus(200);
  } else {
    res.sendStatus(200);
  }
});

function getIdFromImgPath(imgPath) {
  return imgPath
    .replace('https://drive.google.com/uc?id=', '')
    .replace('&export=download', '');
}

module.exports = router;
