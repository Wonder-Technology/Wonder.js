'use strict';

var TransformApService$Wonderjs = require("../../../../application_layer/scene/TransformApService.bs.js");

function create(param) {
  return TransformApService$Wonderjs.create(undefined);
}

var getGameObject = TransformApService$Wonderjs.getGameObject;

var getParent = TransformApService$Wonderjs.getParent;

var hasParent = TransformApService$Wonderjs.hasParent;

var setParent = TransformApService$Wonderjs.setParent;

var removeParent = TransformApService$Wonderjs.removeParent;

var getChildren = TransformApService$Wonderjs.getChildren;

var getLocalPosition = TransformApService$Wonderjs.getLocalPosition;

var setLocalPosition = TransformApService$Wonderjs.setLocalPosition;

var getPosition = TransformApService$Wonderjs.getPosition;

var setPosition = TransformApService$Wonderjs.setPosition;

var getLocalRotation = TransformApService$Wonderjs.getLocalRotation;

var setLocalRotation = TransformApService$Wonderjs.setLocalRotation;

var getRotation = TransformApService$Wonderjs.getRotation;

var setRotation = TransformApService$Wonderjs.setRotation;

var getLocalScale = TransformApService$Wonderjs.getLocalScale;

var setLocalScale = TransformApService$Wonderjs.setLocalScale;

var getScale = TransformApService$Wonderjs.getScale;

var setScale = TransformApService$Wonderjs.setScale;

var getLocalEulerAngles = TransformApService$Wonderjs.getLocalEulerAngles;

var setLocalEulerAngles = TransformApService$Wonderjs.setLocalEulerAngles;

var getEulerAngles = TransformApService$Wonderjs.getEulerAngles;

var setEulerAngles = TransformApService$Wonderjs.setEulerAngles;

function rotateLocalOnAxis(transform, param) {
  return TransformApService$Wonderjs.rotateLocalOnAxis(transform, [
              param[0],
              param[1]
            ]);
}

function rotateWorldOnAxis(transform, param) {
  return TransformApService$Wonderjs.rotateWorldOnAxis(transform, [
              param[0],
              param[1]
            ]);
}

var getLocalToWorldMatrix = TransformApService$Wonderjs.getLocalToWorldMatrix;

var getNormalMatrix = TransformApService$Wonderjs.getNormalMatrix;

var lookAt = TransformApService$Wonderjs.lookAt;

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
