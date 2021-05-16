

import * as Vector3Tool$Wonderjs from "../atom/Vector3Tool.js";
import * as GameObjectAPI$Wonderjs from "../../../../src/api/GameObjectAPI.js";
import * as DirectionLightAPI$Wonderjs from "../../../../src/api/light/DirectionLightAPI.js";
import * as InitLightMaterialStateTool$Wonderjs from "../../state/InitLightMaterialStateTool.js";
import * as DisposeDirectionLightService$Wonderjs from "../../../../src/service/record/main/light/direction/DisposeDirectionLightService.js";
import * as OperateDirectionLightService$Wonderjs from "../../../../src/service/record/main/light/direction/OperateDirectionLightService.js";
import * as RecordDirectionLightMainService$Wonderjs from "../../../../src/service/state/main/light/direction/RecordDirectionLightMainService.js";
import * as DirectionDirectionLightMainService$Wonderjs from "../../../../src/service/state/main/light/direction/DirectionDirectionLightMainService.js";
import * as CountInitLightMaterialDirectionLightService$Wonderjs from "../../../../src/service/record/init_material/init_lightMaterial/light/direction/CountInitLightMaterialDirectionLightService.js";

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

export {
  createGameObject ,
  getRecord ,
  isAlive ,
  getColor ,
  getIntensity ,
  getDefaultColor ,
  getDefaultIntensity ,
  getLightCount ,
  getDirection ,
  
}
/* GameObjectAPI-Wonderjs Not a pure module */
