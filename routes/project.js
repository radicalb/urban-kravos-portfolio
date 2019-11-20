const router = require('express').Router();
let Project = require('../models/Project');
const jwt = require('jsonwebtoken');
var multer = require('multer');
const secret = process.env.SECRET_TOKEN;

var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './client/resources/img/projects');
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

var upload = multer({ storage: storage });

// POST route to register a user
router
  .use(upload.single('pFile'))
  .route('/upload')
  .post((req, res) => {
    const filename = 'img/projects/' + req.file.filename;
    console.log(filename);
    res.status(200).send(filename);
  });

// POST route to add project
router.route('/add').post(async (req, res) => {
  const { tittle, postBody, img1, img2, img3, gitUrl } = req.body;
  let nextOrderingIdHolder = await Project.getNexOrderingId();
  let nextOrderingId = nextOrderingIdHolder[0].orderingId + 1;
  console.log(nextOrderingId);

  const project = new Project({
    orderingId: nextOrderingId,
    tittle,
    postBody,
    img1,
    img2,
    img3,
    gitUrl
  });
  project
    .save(err => {
      if (err) {
        console.log('Jajca1');
        res.status(500).send('Erorr, unable to add project');
      } else {
        res.status(200).send('Project added!');
      }
    })
    .catch(err => res.status(500).json(`Error ${err}`));
});

// POST route to update project
router.route('/update/:id').post((req, res) => {
  //console.log(req.body);
  const { orderingId, tittle, postBody, img1, img2, img3, gitUrl } = req.body;
  let id = req.params.id;
  console.log(id);

  //const project = new Project({ tittle, postBody, img1, img2, img3, gitUrl });
  if (!tittle) {
    Project.findByIdAndUpdate(id, { orderingId }, err => {
      if (err) {
        console.log(err);
        res.status(500).send('Erorr, unable to update project');
      } else {
        res.status(200).send('Project updated!');
      }
    });
  } else {
    Project.findByIdAndUpdate(
      id,
      { tittle, postBody, img1, img2, img3, gitUrl },
      err => {
        if (err) {
          console.log(err);
          res.status(500).send('Erorr, unable to update project');
        } else {
          res.status(200).send('Project updated!');
        }
      }
    );
  }
});

// DELET route to remove project
router.route('/delete').delete((req, res) => {
  console.log(req.body);
  const { _id } = req.body;

  Project.findByIdAndRemove(_id, null, err => {
    if (err) {
      console.log(err);
      res.status(500).send('Erorr, unable to remove project');
    } else {
      res.status(200).send('Project removed succesfully!');
    }
  });
});

router.route('/:id?').get((req, res) => {
  let id = req.params.id;
  if (!id) {
    Project.find()
      .sort({ orderingId: 1 })
      .then(project => res.status(200).json(project))
      .catch(err => res.status(400).json(`Error ${err}`));
  } else {
    Project.findOne({ _id: id })
      .then(project => res.status(200).json(project))
      .catch(err => res.status(400).json(`Error ${err}`));
  }
});

router.route('/test').get((req, res) => {});

module.exports = router;
