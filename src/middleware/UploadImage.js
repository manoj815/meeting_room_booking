import 
    multer
 from 'multer';

export const upload = multer({
    dest: __dirname + '/uploads/images'
});