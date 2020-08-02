var express = require('express')
var router = express.Router()

var multer = require('multer');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, uniqueSuffix + '-' + file.originalname)
    }
})
var upload = multer({
    storage: storage, fileFilter:(req, file, cb) => {
        if (file.mimetype.includes("image")) {
            cb(null,true);
        } else {

            cb(new Error('can upload only images'), false);
        }
    }
})

// define the home page route
router.get('/', function (req, res) {
    res.send('Bronzer home page')
})
// define the about route
router.get('/about', function (req, res) {
    res.send('About birds')
})
router.post('/', upload.array('photos', 12), (req, res) => {
    console.log(req.body);
    res.send("ok")
})

module.exports = router