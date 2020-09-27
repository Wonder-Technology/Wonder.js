'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var OptionSt$Wonderjs = require("../../../../../library/structure/OptionSt.bs.js");
var DpContainer$Wonderjs = require("../../../../../dependency/container/DpContainer.bs.js");
var GameObjectEntity$Wonderjs = require("../../entity/GameObjectEntity.bs.js");
var BasicCameraViewEntity$Wonderjs = require("../../entity/BasicCameraViewEntity.bs.js");

function getGameObject(cameraView) {
  return OptionSt$Wonderjs.map(Curry._1(DpContainer$Wonderjs.unsafeGetBasicCameraViewRepoDp(undefined).getGameObject, BasicCameraViewEntity$Wonderjs.value(cameraView)), GameObjectEntity$Wonderjs.create);
}

exports.getGameObject = getGameObject;
/* No side effect */
