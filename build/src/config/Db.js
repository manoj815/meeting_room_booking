"use strict";

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var db = _mongoose["default"].connect('mongodb://localhost:27017/myblog_db', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(function () {
  console.log("database connected");
})["catch"](function (err) {
  console.log(err);
});

module.exports = db;