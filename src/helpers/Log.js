import fs from 'fs';
import path from 'path';
import moment from 'moment';
import {
    config
} from '../config/config';

const trueLog = console.log;
const logDir = path.join(__dirname, '..', 'storage', 'log',
    `${moment().format("YYYYMMDD")}-log.log`);

// check file exist or not
// if (!fs.existsSync(fileName)) {

// }
const writeLog = function (msg) {
    if (config.enable_log == true) {
        let message = `${moment().format("YYYY-MM-DD HH:mm:ss")}: ${msg} \r\n`;
        fs.appendFile(logDir, message, function (err) {
            if (err) {
                return trueLog(err);
            }
        });
         console.log(message); //uncomment if you want logs
    }
}

export const log = {
    info: function (msg) {
        writeLog(`info ${msg}`);
    },
    warn: function (msg) {
        writeLog(`warn ${msg}`);
    },
    error: function (msg) {
        writeLog(`Error ${msg}`);
    }

}