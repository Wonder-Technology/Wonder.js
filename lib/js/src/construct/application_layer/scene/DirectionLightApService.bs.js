'use strict';

var AllDirectionLightsDoService$Wonderjs = require("../../domain_layer/domain/scene/scene_graph/service/direction_light/AllDirectionLightsDoService.bs.js");
var CreateDirectionLightDoService$Wonderjs = require("../../domain_layer/domain/scene/scene_graph/service/direction_light/CreateDirectionLightDoService.bs.js");
var OperateDirectionLightDoService$Wonderjs = require("../../domain_layer/domain/scene/scene_graph/service/direction_light/OperateDirectionLightDoService.bs.js");
var DirectionDirectionLightDoService$Wonderjs = require("../../domain_layer/domain/scene/scene_graph/service/direction_light/DirectionDirectionLightDoService.bs.js");
var GameObjectDirectionLightDoService$Wonderjs = require("../../domain_layer/domain/scene/scene_graph/service/direction_light/GameObjectDirectionLightDoService.bs.js");

function create(param) {
  return CreateDirectionLightDoService$Wonderjs.create(undefined);
}

var getGameObject = GameObjectDirectionLightDoService$Wonderjs.getGameObject;

var getColor = OperateDirectionLightDoService$Wonderjs.getColor;

var setColor = OperateDirectionLightDoService$Wonderjs.setColor;

var getIntensity = OperateDirectionLightDoService$Wonderjs.getIntensity;

var setIntensity = OperateDirectionLightDoService$Wonderjs.setIntensity;

function getAllLights(param) {
  return AllDirectionLightsDoService$Wonderjs.getAllLights(undefined);
}

var getDirection = DirectionDirectionLightDoService$Wonderjs.getDirection;

function getLightCount(param) {
  return AllDirectionLightsDoService$Wonderjs.getLightCount(undefined);
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
