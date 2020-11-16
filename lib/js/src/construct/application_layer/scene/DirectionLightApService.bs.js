'use strict';

var AllDirectionLightsDoService$Wonderjs = require("../../domain_layer/domain/scene/scene_graph/service/direction_light/AllDirectionLightsDoService.bs.js");
var OperateDirectionLightDoService$Wonderjs = require("../../domain_layer/domain/scene/scene_graph/service/direction_light/OperateDirectionLightDoService.bs.js");
var DirectionDirectionLightDoService$Wonderjs = require("../../domain_layer/domain/scene/scene_graph/service/direction_light/DirectionDirectionLightDoService.bs.js");

var getColor = OperateDirectionLightDoService$Wonderjs.getColor;

var getIntensity = OperateDirectionLightDoService$Wonderjs.getIntensity;

var getAllLights = AllDirectionLightsDoService$Wonderjs.getAllLights;

var getDirection = DirectionDirectionLightDoService$Wonderjs.getDirection;

var getLightCount = AllDirectionLightsDoService$Wonderjs.getLightCount;

exports.getColor = getColor;
exports.getIntensity = getIntensity;
exports.getAllLights = getAllLights;
exports.getDirection = getDirection;
exports.getLightCount = getLightCount;
/* No side effect */
