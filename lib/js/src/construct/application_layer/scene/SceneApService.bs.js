'use strict';

var SceneRoot$Wonderjs = require("../../domain_layer/domain/scene/scene_graph/root/SceneRoot.bs.js");

function getSceneGameObject(param) {
  return SceneRoot$Wonderjs.getSceneGameObject(undefined);
}

var setSceneGameObject = SceneRoot$Wonderjs.setSceneGameObject;

exports.getSceneGameObject = getSceneGameObject;
exports.setSceneGameObject = setSceneGameObject;
/* No side effect */
