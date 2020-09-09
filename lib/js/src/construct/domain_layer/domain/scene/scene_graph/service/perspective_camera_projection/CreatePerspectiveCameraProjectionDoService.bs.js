'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Matrix4$Wonderjs = require("../../../../../library/structure/matrix/Matrix4.bs.js");
var DpContainer$Wonderjs = require("../../../../../dependency/container/DpContainer.bs.js");
var IndexComponentDoService$Wonderjs = require("../IndexComponentDoService.bs.js");
var PerspectiveCameraProjectionEntity$Wonderjs = require("../../entity/PerspectiveCameraProjectionEntity.bs.js");
var IndexPerspectiveCameraProjectionDoService$Wonderjs = require("./IndexPerspectiveCameraProjectionDoService.bs.js");

function create(param) {
  var index = IndexPerspectiveCameraProjectionDoService$Wonderjs.getMaxIndex(undefined);
  var newIndex = IndexComponentDoService$Wonderjs.generateIndex(index);
  IndexPerspectiveCameraProjectionDoService$Wonderjs.setMaxIndex(newIndex);
  Curry._1(DpContainer$Wonderjs.unsafeGetPerspectiveCameraProjectionRepoDp(undefined).addToDirtyList, index);
  Curry._2(DpContainer$Wonderjs.unsafeGetPerspectiveCameraProjectionRepoDp(undefined).setPMatrix, index, Matrix4$Wonderjs.createIdentityMatrix4(undefined));
  return PerspectiveCameraProjectionEntity$Wonderjs.create(index);
}

exports.create = create;
/* No side effect */
