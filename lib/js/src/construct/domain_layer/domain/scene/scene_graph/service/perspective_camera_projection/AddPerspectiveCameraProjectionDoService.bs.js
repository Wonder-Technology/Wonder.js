'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var DpContainer$Wonderjs = require("../../../../../dependency/container/DpContainer.bs.js");

function handleAddComponent(cameraProjection, gameObject) {
  return Curry._2(DpContainer$Wonderjs.unsafeGetPerspectiveCameraProjectionRepoDp(undefined).setGameObject, cameraProjection, gameObject);
}

exports.handleAddComponent = handleAddComponent;
/* No side effect */
