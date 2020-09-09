'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var DpContainer$Wonderjs = require("../../../../../dependency/container/DpContainer.bs.js");

function handleAddComponent(cameraView, gameObject) {
  return Curry._2(DpContainer$Wonderjs.unsafeGetBasicCameraViewRepoDp(undefined).setGameObject, cameraView, gameObject);
}

exports.handleAddComponent = handleAddComponent;
/* No side effect */
