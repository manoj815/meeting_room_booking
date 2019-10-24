"use strict";

var _express = _interopRequireDefault(require("express"));

var _Db = _interopRequireDefault(require("./src/config/Db"));

var _user = _interopRequireDefault(require("./src/controllers/user"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var app = (0, _express["default"])();
app.use(_express["default"].json());
app.get('/', function (req, res) {
  return res.status(200).send({
    'message': 'your first end point is working'
  });
});
app.listen(3002, function () {
  console.log('app is running on port 3002');
});
app.use('/user', _user["default"]);