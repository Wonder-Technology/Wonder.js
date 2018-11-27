

import * as GameObjectAPI$Wonderjs from "../../../../src/api/GameObjectAPI.js";
import * as PointLightAPI$Wonderjs from "../../../../src/api/light/PointLightAPI.js";
import * as DisposePointLightService$Wonderjs from "../../../../src/service/record/main/light/point/DisposePointLightService.js";
import * as OperatePointLightService$Wonderjs from "../../../../src/service/record/main/light/point/OperatePointLightService.js";
import * as InitLightMaterialStateTool$Wonderjs from "../../state/InitLightMaterialStateTool.js";
import * as RecordPointLightMainService$Wonderjs from "../../../../src/service/state/main/light/point/RecordPointLightMainService.js";
import * as CountInitLightMaterialPointLightService$Wonderjs from "../../../../src/service/record/init_material/init_lightMaterial/light/point/CountInitLightMaterialPointLightService.js";

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

export {
  createGameObject ,
  getRecord ,
  isAlive ,
  getColor ,
  getIntensity ,
  getConstant ,
  getLinear ,
  getQuadratic ,
  getRange ,
  getDefaultColor ,
  getDefaultIntensity ,
  getDefaultConstant ,
  getDefaultLinear ,
  getDefaultQuadratic ,
  getDefaultRange ,
  getLightCount ,
  
}
/* GameObjectAPI-Wonderjs Not a pure module */
