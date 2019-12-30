import express from 'express';
import multer from 'multer';
import {
    createOrganization,
    getOrganization,
    putOrganization,
    deleteOrganization
} from '../controllers/organizationController';
import {
    upload
} from '../helpers/Upload';
import {
    log
} from '../helpers/Log';
import {
    userAuth
} from '../middleware/AuthMiddleware';


import {
    validateOrg
} from '../middleware/OrgValidateMiddleware';

const OrgRoute = new express();

//https://github.com/expressjs/multer/issues/530
OrgRoute.get('/', userAuth(['SUPER_ADMIN_ROLE', 'ADMIN_ROLE', 'USER_ROLE']), getOrganization);
//[validateOrg, upload.single('file')] validateOrg
OrgRoute.post('/', upload.single('file'), ...validateOrg, userAuth(['SUPER_ADMIN_ROLE']), createOrganization);
OrgRoute.put('/:id', upload.single('file'), ...validateOrg, userAuth(['SUPER_ADMIN_ROLE', 'ADMIN_ROLE']), putOrganization);
OrgRoute.delete('/:id', userAuth(['SUPER_ADMIN_ROLE']), deleteOrganization);
export default OrgRoute;