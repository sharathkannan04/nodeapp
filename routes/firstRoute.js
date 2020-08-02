var express = require('express')
var router = express.Router()
const fs = require('fs');

var multer = require('multer');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        let fileDir = './uploads';
        if (!fs.existsSync(fileDir)) {
            fs.mkdirSync(fileDir);
        }
        cb(null, fileDir);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.originalname)
    }
})
var upload = multer(/* {
    storage: storage, fileFilter:(req, file, cb) => {
        if (file.mimetype.includes("image")) {
            cb(null,true);
        } else {

            cb(new Error('can upload only images'), false);
        }
    }
} */)



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
    fs.readdir("./public/img", (err, files) => {
        if (fs.existsSync("./public/img/" + req.body.fileName)) {
            fs.unlinkSync("./public/img/" + req.body.fileName)
        }
        if (req.files[0].mimetype.includes("image")) {
            fs.writeFile("./public/img/" + req.body.fileName, req.files[0].buffer, (err, success) => {
                res.send("ok");
            })
        } else {

            res.send("err");
        }
    });
})





module.exports = router