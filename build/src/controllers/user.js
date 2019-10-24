"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var userRoute = (0, _express["default"])();
userRoute.get('/', function (req, res) {
  console.log('user get working');
  res.status(200).json({
    'message': 'user get working'
  });
});
var _default = userRoute;
exports["default"] = _default;