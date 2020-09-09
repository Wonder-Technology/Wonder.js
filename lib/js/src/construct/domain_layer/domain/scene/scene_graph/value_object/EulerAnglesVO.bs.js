'use strict';

var Tuple3$Wonderjs = require("../../../../library/structure/tuple/Tuple3.bs.js");
var AngleVO$Wonderjs = require("./AngleVO.bs.js");
var Quaternion$Wonderjs = require("../../../../library/structure/Quaternion.bs.js");

function create(value) {
  return /* EulerAngles */{
          _0: value
        };
}

function value(eulerAngles) {
  return eulerAngles._0;
}

function getPrimitiveValue(eulerAngles) {
  return Tuple3$Wonderjs.map(eulerAngles._0, AngleVO$Wonderjs.value);
}

function convertToQuaternion(eulerAngles) {
  return Quaternion$Wonderjs.setFromEulerAngles(Tuple3$Wonderjs.map(eulerAngles._0, AngleVO$Wonderjs.value));
}

exports.create = create;
exports.value = value;
exports.getPrimitiveValue = getPrimitiveValue;
exports.convertToQuaternion = convertToQuaternion;
/* No side effect */
