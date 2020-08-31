'use strict';

var Quaternion$Wonderjs = require("../../../../library/structure/Quaternion.bs.js");

function create(value) {
  return /* Rotation */{
          _0: value
        };
}

function value(rotation) {
  return rotation._0;
}

function invert(rotation) {
  return /* Rotation */{
          _0: Quaternion$Wonderjs.invert(rotation._0)
        };
}

function multiply(rot1, rot2) {
  return /* Rotation */{
          _0: Quaternion$Wonderjs.multiply(rot1._0, rot2._0)
        };
}

exports.create = create;
exports.value = value;
exports.invert = invert;
exports.multiply = multiply;
/* No side effect */
