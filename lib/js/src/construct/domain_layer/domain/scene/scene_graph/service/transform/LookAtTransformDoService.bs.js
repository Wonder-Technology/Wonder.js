'use strict';

var Matrix4$Wonderjs = require("../../../../../library/structure/matrix/Matrix4.bs.js");
var PositionVO$Wonderjs = require("../../value_object/PositionVO.bs.js");
var Quaternion$Wonderjs = require("../../../../../library/structure/Quaternion.bs.js");
var RotationVO$Wonderjs = require("../../value_object/RotationVO.bs.js");
var UpdateTransformDoService$Wonderjs = require("./UpdateTransformDoService.bs.js");

function lookAt(transform, target, upOpt, param) {
  var up = upOpt !== undefined ? upOpt : [
      0,
      1,
      0
    ];
  return UpdateTransformDoService$Wonderjs.updateAndSetRotation(transform, RotationVO$Wonderjs.create(Quaternion$Wonderjs.setFromMatrix(Matrix4$Wonderjs.setLookAt(PositionVO$Wonderjs.value(UpdateTransformDoService$Wonderjs.updateAndGetPosition(transform)), target, up))));
}

exports.lookAt = lookAt;
/* No side effect */
