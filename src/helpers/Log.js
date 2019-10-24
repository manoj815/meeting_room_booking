let log = {
    info: function (msg) {
        console.log(`info ${msg}`);
    },
    warn: function (msg) {
        console.log(`warn ${msg}`);
    },
    error: function (msg) {
        console.log(`Error ${msg}`);
    }

}
module.exports = log;