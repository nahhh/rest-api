var express = require('express');
var router = express.Router();
const formidable = require('formidable');
const path = require('path');
var fs = require('fs');
var common = require('../common/common');
const util = require('util');


// dummy data photos
// var photos = [];
// photos.push({
//     name: 'Node.js Logo',
//     path: 'http://nodejs.org/images/logos/nodejs-green.png'
// });

// photos.push({
//     name: 'Ryan Speaking',
//     path: 'http://nodejs.org/images/ryan-speaker.jpg'
// });



// list all photos route
router.get('/', function (req, res) {

    // default directory updload and receive
    const imgDir = req.app.locals.uploadDir;

    // store photo output
    let photos = [];

    // get all file in upload dir and display
    fs.readdirSync(imgDir).forEach(function (file) {
        let fileDisplay = path.join(imgDir, file);

        // put each image to output
        photos.push({
            name: file,
            path: file
        });
    });

    // render view
    res.render('photo/photos', {
        title: 'Photos',
        photos: photos
    })
});

// display upload form route
router.get('/upload', function (req, res) {
    res.render('photo/upload', {
        title: 'Upload photo'
    });
});

// handle upload file
router.post('/upload', function (req, res) {

    // create incomming data upload
    let form = new formidable.IncomingForm();
    //form.encoding = 'utf-8';
    // https://github.com/felixge/node-formidable

    // parse incoming request
    form.parse(req, function (err, fields, files) {
        console.log('received upload:\n\n');
        console.log(util.inspect({ fields: fields, files: files }));
    });

    // form.on('fileBegin', function (name, file) {
    //     file.path = path.join(req.app.locals.uploadDir, file.name);
    //     console.log('file.path: ' + file.path);
    // });

    // default upload directory
    form.uploadDir = req.app.locals.uploadDir;

    // rename on file has been uploaded success
    form.on('file', function (name, file) {
        // console.log('file.path: ' + file.path);
        // fs.readFile(file.path, function (err, data) {
        //     if (err) {
        //         res.end('Error');
        //     }
        //     let newName = 'img_' + Date.now() + common.getFileExtension(name);
        //     //console.log('common.getFileExtension(name): ' + common.getFileExtension(name));
        //     let newPath = path.join(, newName);
        //     fs.write(newPath, function (err) {
        //         if (err) {
        //             console.log(err);
        //         }
        //         res.redirect('/photo');
        //     })
        // })
        console.log('file.name' + file.name);
        let uploadFileName = Date.now() + path.extname(file.name);
        fs.rename(file.path, path.join(form.uploadDir, uploadFileName));

        res.redirect('/photo');
    });

    
});



module.exports = router;

