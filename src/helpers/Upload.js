import multer from 'multer';
import path from 'path';
import {
    log
} from '../helpers/Log';

//multer.storage

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
         
        cb(null, path.join(__dirname,'..','public','images'))
    },
    filename: (req, file, cb) => {

        var filetype = '';
        if (file.mimetype === 'image/gif') {
            filetype = 'gif';
        }
        if (file.mimetype === 'image/png') {
            filetype = 'png';
        }
        if (file.mimetype === 'image/jpeg') {
            filetype = 'jpg';
        }
        cb(null, 'image-' + Date.now() + '.' + filetype);
    }
});

export const upload = multer({
    storage: storage
});