'use strict';

var Vector3Tool$Wonderjs = require("../atom/Vector3Tool.js");
var TransformAPI$Wonderjs = require("../../../../src/api/TransformAPI.js");
var GameObjectAPI$Wonderjs = require("../../../../src/api/GameObjectAPI.js");

function setLocalEulerAngles(gameObject, localEulerAngles, state) {
  return TransformAPI$Wonderjs.setTransformLocalEulerAngles(GameObjectAPI$Wonderjs.unsafeGetGameObjectTransformComponent(gameObject, state), localEulerAngles, state);
}

function setLocalScale(gameObject, localScale, state) {
  return TransformAPI$Wonderjs.setTransformLocalScale(GameObjectAPI$Wonderjs.unsafeGetGameObjectTransformComponent(gameObject, state), localScale, state);
}

function getLocalEulerAngles(gameObject, state) {
  return Vector3Tool$Wonderjs.truncate(3, TransformAPI$Wonderjs.getTransformLocalEulerAngles(GameObjectAPI$Wonderjs.unsafeGetGameObjectTransformComponent(gameObject, state), state));
}

exports.setLocalEulerAngles = setLocalEulerAngles;
exports.setLocalScale = setLocalScale;
exports.getLocalEulerAngles = getLocalEulerAngles;
/* TransformAPI-Wonderjs Not a pure module */
