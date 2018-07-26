'use strict';

var GameObjectAPI$Wonderjs = require("../../../../src/api/GameObjectAPI.js");
var PointLightAPI$Wonderjs = require("../../../../src/api/light/PointLightAPI.js");
var MappedIndexService$Wonderjs = require("../../../../src/service/primitive/MappedIndexService.js");
var IndexPointLightService$Wonderjs = require("../../../../src/service/record/main/light/point/IndexPointLightService.js");
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

function getRecord(state) {
  return state[/* pointLightRecord */21];
}

function isAlive(light, state) {
  return DisposePointLightService$Wonderjs.isAlive(light, state[/* pointLightRecord */21]);
}

function getColor(light, state) {
  return OperatePointLightService$Wonderjs.getColor(light, state[/* pointLightRecord */21]);
}

function getIntensity(light, state) {
  return OperatePointLightService$Wonderjs.getIntensity(light, state[/* pointLightRecord */21]);
}

function getConstant(light, state) {
  return OperatePointLightService$Wonderjs.getConstant(light, state[/* pointLightRecord */21]);
}

function getLinear(light, state) {
  return OperatePointLightService$Wonderjs.getLinear(light, state[/* pointLightRecord */21]);
}

function getQuadratic(light, state) {
  return OperatePointLightService$Wonderjs.getQuadratic(light, state[/* pointLightRecord */21]);
}

function getRange(light, state) {
  return OperatePointLightService$Wonderjs.getRange(light, state[/* pointLightRecord */21]);
}

function getMappedIndex(index, state) {
  return MappedIndexService$Wonderjs.getMappedIndex(index, IndexPointLightService$Wonderjs.getMappedIndexMap(state));
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
exports.getMappedIndex = getMappedIndex;
exports.getLightCount = getLightCount;
/* GameObjectAPI-Wonderjs Not a pure module */
