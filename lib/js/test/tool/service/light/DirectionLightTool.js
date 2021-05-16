'use strict';

var Vector3Tool$Wonderjs = require("../atom/Vector3Tool.js");
var GameObjectAPI$Wonderjs = require("../../../../src/api/GameObjectAPI.js");
var DirectionLightAPI$Wonderjs = require("../../../../src/api/light/DirectionLightAPI.js");
var InitLightMaterialStateTool$Wonderjs = require("../../state/InitLightMaterialStateTool.js");
var DisposeDirectionLightService$Wonderjs = require("../../../../src/service/record/main/light/direction/DisposeDirectionLightService.js");
var OperateDirectionLightService$Wonderjs = require("../../../../src/service/record/main/light/direction/OperateDirectionLightService.js");
var RecordDirectionLightMainService$Wonderjs = require("../../../../src/service/state/main/light/direction/RecordDirectionLightMainService.js");
var DirectionDirectionLightMainService$Wonderjs = require("../../../../src/service/state/main/light/direction/DirectionDirectionLightMainService.js");
var CountInitLightMaterialDirectionLightService$Wonderjs = require("../../../../src/service/record/init_material/init_lightMaterial/light/direction/CountInitLightMaterialDirectionLightService.js");

function createGameObject(state) {
  var match = DirectionLightAPI$Wonderjs.createDirectionLight(state);
  var light = match[1];
  var match$1 = GameObjectAPI$Wonderjs.createGameObject(match[0]);
  var gameObject = match$1[1];
  var state$1 = GameObjectAPI$Wonderjs.addGameObjectDirectionLightComponent(gameObject, light, match$1[0]);
  return /* tuple */[
          state$1,
          gameObject,
          light
        ];
}

var getRecord = RecordDirectionLightMainService$Wonderjs.getRecord;

function isAlive(light, state) {
  return DisposeDirectionLightService$Wonderjs.isAlive(light, RecordDirectionLightMainService$Wonderjs.getRecord(state));
}

function getColor(light, state) {
  return OperateDirectionLightService$Wonderjs.getColor(light, RecordDirectionLightMainService$Wonderjs.getRecord(state));
}

function getIntensity(light, state) {
  return OperateDirectionLightService$Wonderjs.getIntensity(light, RecordDirectionLightMainService$Wonderjs.getRecord(state));
}

function getLightCount(state) {
  return CountInitLightMaterialDirectionLightService$Wonderjs.getLightCount(InitLightMaterialStateTool$Wonderjs.createStateWithoutMaterialData(state)[/* directionLightRecord */1]);
}

function getDirection(light, state) {
  return Vector3Tool$Wonderjs.truncate(3, DirectionDirectionLightMainService$Wonderjs.getDirection(light, state));
}

var getDefaultColor = RecordDirectionLightMainService$Wonderjs.getDefaultColor;

var getDefaultIntensity = RecordDirectionLightMainService$Wonderjs.getDefaultIntensity;

exports.createGameObject = createGameObject;
exports.getRecord = getRecord;
exports.isAlive = isAlive;
exports.getColor = getColor;
exports.getIntensity = getIntensity;
exports.getDefaultColor = getDefaultColor;
exports.getDefaultIntensity = getDefaultIntensity;
exports.getLightCount = getLightCount;
exports.getDirection = getDirection;
/* GameObjectAPI-Wonderjs Not a pure module */
