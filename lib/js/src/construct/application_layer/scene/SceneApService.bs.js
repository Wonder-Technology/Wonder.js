'use strict';

var SceneRoot$Wonderjs = require("../../domain_layer/domain/scene/scene_graph/root/SceneRoot.bs.js");

function getSceneGameObject(param) {
  return SceneRoot$Wonderjs.getSceneGameObject(undefined);
}

exports.getSceneGameObject = getSceneGameObject;
/* No side effect */
