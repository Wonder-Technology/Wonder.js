'use strict';

var SceneApService$Wonderjs = require("../../../application_layer/scene/SceneApService.bs.js");

function getSceneGameObject(param) {
  return SceneApService$Wonderjs.getSceneGameObject(undefined);
}

var setSceneGameObject = SceneApService$Wonderjs.setSceneGameObject;

exports.getSceneGameObject = getSceneGameObject;
exports.setSceneGameObject = setSceneGameObject;
/* No side effect */
