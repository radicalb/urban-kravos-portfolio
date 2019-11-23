const router = require('express').Router();
const jwt = require('jsonwebtoken');
const multer = require('multer');
const stream = require('stream');
/* const multerDrive = require('multer-drive'); */

//confingure and import for Google API
const { google } = require('googleapis');
//load credentials from env
const credentials = JSON.parse(process.env.GOOGLE_CREDENTIALS);
//const credentials = require('../urban-kravos-portfolio-fcc52dfdfca6.json');
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

router
  .use(upload.single('pFile'))
  .route('/upload')
  .post(async (req, res) => {
    //console.log(req);

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

router.route('/test').get((req, res) => {
  drive.files.list(
    {
      pageSize: 1,
      fields: '*'
    },
    (err, res) => {
      if (err) throw err;
      const files = res.data.files;
      if (files.length) {
        files.map(file => {
          console.log(file);
        });
      } else {
        console.log('No files found');
      }
    }
  );
  res.sendStatus(200);
});

/* function getWebViewLinkByName(name) {
  drive.files.list(
    {
      pageSize: 1,
      fields: 'files(name, webViewLink)',
      orderBy: 'createdTime desc',
      q: (name = '1574246456785-jde2.png')
    },
    (err, res) => {
      if (err) throw err;
      const files = res.data.files;
      if (files.length) {
        return files[0].webViewLink;
      } else {
        return 'No files found';
      }
    }
  );
} */

router.route('/updatethumbnailbyid/:fileid').get(async (req, res) => {
  let fileId = req.params.fileid;

  let resp = await drive.files.list(
    {
      auth: auth,
      fileId: fileId,
      pageSize: 1,

      fields: 'files(thumbnailLink)'
    },
    (err, resp) => {
      if (err) {
        res.sendStatus(500);
        throw err;
      }
      const thumbnailLink = resp.data.files[0].thumbnailLink;
      if (thumbnailLink) {
        res.status(200).send(thumbnailLink);
      } else {
        res.sendStatus(400);
      }
    }
  );
});

module.exports = router;
