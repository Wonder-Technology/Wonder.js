'use strict';

var DirectionLightApService$Wonderjs = require("../../../application_layer/scene/DirectionLightApService.bs.js");

function create(param) {
  return DirectionLightApService$Wonderjs.create(undefined);
}

var getGameObject = DirectionLightApService$Wonderjs.getGameObject;

var getColor = DirectionLightApService$Wonderjs.getColor;

var setColor = DirectionLightApService$Wonderjs.setColor;

var getIntensity = DirectionLightApService$Wonderjs.getIntensity;

var setIntensity = DirectionLightApService$Wonderjs.setIntensity;

function getAllLights(param) {
  return DirectionLightApService$Wonderjs.getAllLights(undefined);
}

var getDirection = DirectionLightApService$Wonderjs.getDirection;

function getLightCount(param) {
  return DirectionLightApService$Wonderjs.getLightCount(undefined);
}

exports.create = create;
exports.getGameObject = getGameObject;
exports.getColor = getColor;
exports.setColor = setColor;
exports.getIntensity = getIntensity;
exports.setIntensity = setIntensity;
exports.getAllLights = getAllLights;
exports.getDirection = getDirection;
exports.getLightCount = getLightCount;
/* No side effect */
