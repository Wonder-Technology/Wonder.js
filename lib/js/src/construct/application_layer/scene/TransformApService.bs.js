'use strict';

var CreateTransformDoService$Wonderjs = require("../../domain_layer/domain/scene/scene_graph/service/transform/CreateTransformDoService.bs.js");
var LookAtTransformDoService$Wonderjs = require("../../domain_layer/domain/scene/scene_graph/service/transform/LookAtTransformDoService.bs.js");
var RotateTransformDoService$Wonderjs = require("../../domain_layer/domain/scene/scene_graph/service/transform/RotateTransformDoService.bs.js");
var UpdateTransformDoService$Wonderjs = require("../../domain_layer/domain/scene/scene_graph/service/transform/UpdateTransformDoService.bs.js");
var HierachyTransformDoService$Wonderjs = require("../../domain_layer/domain/scene/scene_graph/service/transform/HierachyTransformDoService.bs.js");
var GameObjectTransformDoService$Wonderjs = require("../../domain_layer/domain/scene/scene_graph/service/transform/GameObjectTransformDoService.bs.js");
var ModelMatrixTransformDoService$Wonderjs = require("../../domain_layer/domain/scene/scene_graph/service/transform/ModelMatrixTransformDoService.bs.js");

function create(param) {
  return CreateTransformDoService$Wonderjs.create(undefined);
}

var getGameObject = GameObjectTransformDoService$Wonderjs.getGameObject;

var getParent = HierachyTransformDoService$Wonderjs.getParent;

var hasParent = HierachyTransformDoService$Wonderjs.hasParent;

var setParent = HierachyTransformDoService$Wonderjs.setParent;

var removeParent = HierachyTransformDoService$Wonderjs.removeParent;

var getChildren = HierachyTransformDoService$Wonderjs.getChildren;

var getLocalPosition = ModelMatrixTransformDoService$Wonderjs.getLocalPosition;

var setLocalPosition = ModelMatrixTransformDoService$Wonderjs.setLocalPosition;

var getPosition = UpdateTransformDoService$Wonderjs.updateAndGetPosition;

var setPosition = UpdateTransformDoService$Wonderjs.updateAndSetPosition;

var getLocalRotation = ModelMatrixTransformDoService$Wonderjs.getLocalRotation;

var setLocalRotation = ModelMatrixTransformDoService$Wonderjs.setLocalRotation;

var getRotation = UpdateTransformDoService$Wonderjs.updateAndGetRotation;

var setRotation = UpdateTransformDoService$Wonderjs.updateAndSetRotation;

var getLocalScale = ModelMatrixTransformDoService$Wonderjs.getLocalScale;

var setLocalScale = ModelMatrixTransformDoService$Wonderjs.setLocalScale;

var getScale = UpdateTransformDoService$Wonderjs.updateAndGetScale;

var setScale = UpdateTransformDoService$Wonderjs.updateAndSetScale;

var getLocalEulerAngles = ModelMatrixTransformDoService$Wonderjs.getLocalEulerAngles;

var setLocalEulerAngles = ModelMatrixTransformDoService$Wonderjs.setLocalEulerAngles;

var getEulerAngles = UpdateTransformDoService$Wonderjs.updateAndGetEulerAngles;

var setEulerAngles = UpdateTransformDoService$Wonderjs.updateAndSetEulerAngles;

function rotateLocalOnAxis(transform, param) {
  return RotateTransformDoService$Wonderjs.rotateLocalOnAxis(transform, [
              param[0],
              param[1]
            ]);
}

function rotateWorldOnAxis(transform, param) {
  return RotateTransformDoService$Wonderjs.rotateWorldOnAxis(transform, [
              param[0],
              param[1]
            ]);
}

var getLocalToWorldMatrix = ModelMatrixTransformDoService$Wonderjs.getLocalToWorldMatrix;

var getNormalMatrix = ModelMatrixTransformDoService$Wonderjs.getNormalMatrix;

function lookAt(transform, target) {
  return LookAtTransformDoService$Wonderjs.lookAt(transform, target, undefined, undefined);
}

exports.create = create;
exports.getGameObject = getGameObject;
exports.getParent = getParent;
exports.hasParent = hasParent;
exports.setParent = setParent;
exports.removeParent = removeParent;
exports.getChildren = getChildren;
exports.getLocalPosition = getLocalPosition;
exports.setLocalPosition = setLocalPosition;
exports.getPosition = getPosition;
exports.setPosition = setPosition;
exports.getLocalRotation = getLocalRotation;
exports.setLocalRotation = setLocalRotation;
exports.getRotation = getRotation;
exports.setRotation = setRotation;
exports.getLocalScale = getLocalScale;
exports.setLocalScale = setLocalScale;
exports.getScale = getScale;
exports.setScale = setScale;
exports.getLocalEulerAngles = getLocalEulerAngles;
exports.setLocalEulerAngles = setLocalEulerAngles;
exports.getEulerAngles = getEulerAngles;
exports.setEulerAngles = setEulerAngles;
exports.rotateLocalOnAxis = rotateLocalOnAxis;
exports.rotateWorldOnAxis = rotateWorldOnAxis;
exports.getLocalToWorldMatrix = getLocalToWorldMatrix;
exports.getNormalMatrix = getNormalMatrix;
exports.lookAt = lookAt;
/* No side effect */
