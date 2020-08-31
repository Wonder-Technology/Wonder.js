'use strict';

var AxisVO$Wonderjs = require("../../value_object/AxisVO.bs.js");
var AngleVO$Wonderjs = require("../../value_object/AngleVO.bs.js");
var Quaternion$Wonderjs = require("../../../../../library/structure/Quaternion.bs.js");
var RotationVO$Wonderjs = require("../../value_object/RotationVO.bs.js");
var ModelMatrixTransformDoService$Wonderjs = require("./ModelMatrixTransformDoService.bs.js");

function rotateLocalOnAxis(transform, param) {
  var rot = Quaternion$Wonderjs.setFromAxisAngle(AngleVO$Wonderjs.value(param[0]), AxisVO$Wonderjs.value(param[1]));
  return ModelMatrixTransformDoService$Wonderjs.setLocalRotation(transform, RotationVO$Wonderjs.create(Quaternion$Wonderjs.multiply(RotationVO$Wonderjs.value(ModelMatrixTransformDoService$Wonderjs.getLocalRotation(transform)), rot)));
}

function rotateWorldOnAxis(transform, param) {
  var rot = Quaternion$Wonderjs.setFromAxisAngle(AngleVO$Wonderjs.value(param[0]), AxisVO$Wonderjs.value(param[1]));
  return ModelMatrixTransformDoService$Wonderjs.setLocalRotation(transform, RotationVO$Wonderjs.create(Quaternion$Wonderjs.multiply(rot, RotationVO$Wonderjs.value(ModelMatrixTransformDoService$Wonderjs.getLocalRotation(transform)))));
}

exports.rotateLocalOnAxis = rotateLocalOnAxis;
exports.rotateWorldOnAxis = rotateWorldOnAxis;
/* No side effect */
