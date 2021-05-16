'use strict';

var GameObjectAPI$Wonderjs = require("../../../../src/api/GameObjectAPI.js");
var PointLightAPI$Wonderjs = require("../../../../src/api/light/PointLightAPI.js");
var DisposePointLightService$Wonderjs = require("../../../../src/service/record/main/light/point/DisposePointLightService.js");
var OperatePointLightService$Wonderjs = require("../../../../src/service/record/main/light/point/OperatePointLightService.js");
var InitLightMaterialStateTool$Wonderjs = require("../../state/InitLightMaterialStateTool.js");
var RecordPointLightMainService$Wonderjs = require("../../../../src/service/state/main/light/point/RecordPointLightMainService.js");
var CountInitLightMaterialPointLightService$Wonderjs = require("../../../../src/service/record/init_material/init_lightMaterial/light/point/CountInitLightMaterialPointLightService.js");

function createGameObject(state) {
  var match = PointLightAPI$Wonderjs.createPointLight(state);
  var light = match[1];
  var match$1 = GameObjectAPI$Wonderjs.createGameObject(match[0]);
  var gameObject = match$1[1];
  var state$1 = GameObjectAPI$Wonderjs.addGameObjectPointLightComponent(gameObject, light, match$1[0]);
  return /* tuple */[
          state$1,
          gameObject,
          light
        ];
}

var getRecord = RecordPointLightMainService$Wonderjs.getRecord;

function isAlive(light, state) {
  return DisposePointLightService$Wonderjs.isAlive(light, RecordPointLightMainService$Wonderjs.getRecord(state));
}

function getColor(light, state) {
  return OperatePointLightService$Wonderjs.getColor(light, RecordPointLightMainService$Wonderjs.getRecord(state));
}

function getIntensity(light, state) {
  return OperatePointLightService$Wonderjs.getIntensity(light, RecordPointLightMainService$Wonderjs.getRecord(state));
}

function getConstant(light, state) {
  return OperatePointLightService$Wonderjs.getConstant(light, RecordPointLightMainService$Wonderjs.getRecord(state));
}

function getLinear(light, state) {
  return OperatePointLightService$Wonderjs.getLinear(light, RecordPointLightMainService$Wonderjs.getRecord(state));
}

function getQuadratic(light, state) {
  return OperatePointLightService$Wonderjs.getQuadratic(light, RecordPointLightMainService$Wonderjs.getRecord(state));
}

function getRange(light, state) {
  return OperatePointLightService$Wonderjs.getRange(light, RecordPointLightMainService$Wonderjs.getRecord(state));
}

function getLightCount(state) {
  return CountInitLightMaterialPointLightService$Wonderjs.getLightCount(InitLightMaterialStateTool$Wonderjs.createStateWithoutMaterialData(state)[/* pointLightRecord */2]);
}

var getDefaultColor = RecordPointLightMainService$Wonderjs.getDefaultColor;

var getDefaultIntensity = RecordPointLightMainService$Wonderjs.getDefaultIntensity;

var getDefaultConstant = RecordPointLightMainService$Wonderjs.getDefaultConstant;

var getDefaultLinear = RecordPointLightMainService$Wonderjs.getDefaultLinear;

var getDefaultQuadratic = RecordPointLightMainService$Wonderjs.getDefaultQuadratic;

var getDefaultRange = RecordPointLightMainService$Wonderjs.getDefaultRange;

exports.createGameObject = createGameObject;
exports.getRecord = getRecord;
exports.isAlive = isAlive;
exports.getColor = getColor;
exports.getIntensity = getIntensity;
exports.getConstant = getConstant;
exports.getLinear = getLinear;
exports.getQuadratic = getQuadratic;
exports.getRange = getRange;
exports.getDefaultColor = getDefaultColor;
exports.getDefaultIntensity = getDefaultIntensity;
exports.getDefaultConstant = getDefaultConstant;
exports.getDefaultLinear = getDefaultLinear;
exports.getDefaultQuadratic = getDefaultQuadratic;
exports.getDefaultRange = getDefaultRange;
exports.getLightCount = getLightCount;
/* GameObjectAPI-Wonderjs Not a pure module */
