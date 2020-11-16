'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var OptionSt$Wonderjs = require("../../../../../library/structure/OptionSt.bs.js");
var DpContainer$Wonderjs = require("../../../../../dependency/container/DpContainer.bs.js");
var GameObjectEntity$Wonderjs = require("../../entity/GameObjectEntity.bs.js");
var BasicCameraViewEntity$Wonderjs = require("../../entity/BasicCameraViewEntity.bs.js");

function getActiveCameraView(sceneGameObject) {
  return OptionSt$Wonderjs.map(Curry._1(DpContainer$Wonderjs.unsafeGetBasicCameraViewRepoDp(undefined).getActiveBasicCameraView, GameObjectEntity$Wonderjs.value(sceneGameObject)), BasicCameraViewEntity$Wonderjs.create);
}

exports.getActiveCameraView = getActiveCameraView;
/* No side effect */
