'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var OptionSt$Wonderjs = require("../../../../../library/structure/OptionSt.bs.js");
var DpContainer$Wonderjs = require("../../../../../dependency/container/DpContainer.bs.js");
var GameObjectEntity$Wonderjs = require("../../entity/GameObjectEntity.bs.js");
var PerspectiveCameraProjectionEntity$Wonderjs = require("../../entity/PerspectiveCameraProjectionEntity.bs.js");

function getGameObject(cameraProjection) {
  return OptionSt$Wonderjs.map(OptionSt$Wonderjs.fromNullable(Curry._1(DpContainer$Wonderjs.unsafeGetPerspectiveCameraProjectionRepoDp(undefined).getGameObject, PerspectiveCameraProjectionEntity$Wonderjs.value(cameraProjection))), GameObjectEntity$Wonderjs.create);
}

exports.getGameObject = getGameObject;
/* No side effect */
