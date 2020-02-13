

import * as Contract$WonderLog from "../../../../../node_modules/wonder-log/lib/es6_global/src/Contract.js";
import * as StateDataMain$Wonderjs from "../../service/state/main/data/StateDataMain.js";
import * as IsDebugMainService$Wonderjs from "../../service/state/main/state/IsDebugMainService.js";
import * as ArrayService$WonderCommonlib from "../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as AliveComponentService$Wonderjs from "../../service/primitive/component/AliveComponentService.js";
import * as GetAllComponentService$Wonderjs from "../../service/primitive/component/GetAllComponentService.js";
import * as InitBasicMaterialMainService$Wonderjs from "../../service/state/main/material/basic/InitBasicMaterialMainService.js";
import * as NameBasicMaterialMainService$Wonderjs from "../../service/state/main/material/basic/NameBasicMaterialMainService.js";
import * as CreateBasicMaterialMainService$Wonderjs from "../../service/state/main/material/basic/CreateBasicMaterialMainService.js";
import * as GameObjectBasicMaterialService$Wonderjs from "../../service/record/main/material/basic/GameObjectBasicMaterialService.js";
import * as RecordBasicMaterialMainService$Wonderjs from "../../service/state/main/material/basic/RecordBasicMaterialMainService.js";
import * as DisposeBasicMaterialMainService$Wonderjs from "../../service/state/main/material/basic/DisposeBasicMaterialMainService.js";
import * as OperateBasicMaterialMainService$Wonderjs from "../../service/state/main/material/basic/OperateBasicMaterialMainService.js";
import * as DisposeComponentGameObjectMainService$Wonderjs from "../../service/state/main/gameObject/DisposeComponentGameObjectMainService.js";

function createBasicMaterial(state) {
  return CreateBasicMaterialMainService$Wonderjs.create(state);
}

function unsafeGetBasicMaterialGameObjects(material, state) {
  Contract$WonderLog.requireCheck((function (param) {
          return AliveComponentService$Wonderjs.checkComponentShouldAlive(material, DisposeBasicMaterialMainService$Wonderjs.isAlive, RecordBasicMaterialMainService$Wonderjs.getRecord(state));
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  return GameObjectBasicMaterialService$Wonderjs.unsafeGetGameObjects(material, RecordBasicMaterialMainService$Wonderjs.getRecord(state));
}

function getBasicMaterialColor(material, state) {
  Contract$WonderLog.requireCheck((function (param) {
          return AliveComponentService$Wonderjs.checkComponentShouldAlive(material, DisposeBasicMaterialMainService$Wonderjs.isAlive, RecordBasicMaterialMainService$Wonderjs.getRecord(state));
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  return OperateBasicMaterialMainService$Wonderjs.getColor(material, state);
}

function setBasicMaterialColor(material, color, state) {
  Contract$WonderLog.requireCheck((function (param) {
          return AliveComponentService$Wonderjs.checkComponentShouldAlive(material, DisposeBasicMaterialMainService$Wonderjs.isAlive, RecordBasicMaterialMainService$Wonderjs.getRecord(state));
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  return OperateBasicMaterialMainService$Wonderjs.setColor(material, color, state);
}

function unsafeGetBasicMaterialMap(material, state) {
  Contract$WonderLog.requireCheck((function (param) {
          return AliveComponentService$Wonderjs.checkComponentShouldAlive(material, DisposeBasicMaterialMainService$Wonderjs.isAlive, RecordBasicMaterialMainService$Wonderjs.getRecord(state));
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  return OperateBasicMaterialMainService$Wonderjs.unsafeGetMap(material, state);
}

function setBasicMaterialMap(material, texture, state) {
  Contract$WonderLog.requireCheck((function (param) {
          return AliveComponentService$Wonderjs.checkComponentShouldAlive(material, DisposeBasicMaterialMainService$Wonderjs.isAlive, RecordBasicMaterialMainService$Wonderjs.getRecord(state));
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  return OperateBasicMaterialMainService$Wonderjs.setMap(material, texture, state);
}

function hasBasicMaterialMap(material, state) {
  Contract$WonderLog.requireCheck((function (param) {
          return AliveComponentService$Wonderjs.checkComponentShouldAlive(material, DisposeBasicMaterialMainService$Wonderjs.isAlive, RecordBasicMaterialMainService$Wonderjs.getRecord(state));
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  return OperateBasicMaterialMainService$Wonderjs.hasMap(material, state);
}

function removeBasicMaterialMap(material, state) {
  Contract$WonderLog.requireCheck((function (param) {
          return AliveComponentService$Wonderjs.checkComponentShouldAlive(material, DisposeBasicMaterialMainService$Wonderjs.isAlive, RecordBasicMaterialMainService$Wonderjs.getRecord(state));
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  return OperateBasicMaterialMainService$Wonderjs.removeMap(material, state);
}

function getBasicMaterialIsDepthTest(material, state) {
  Contract$WonderLog.requireCheck((function (param) {
          return AliveComponentService$Wonderjs.checkComponentShouldAlive(material, DisposeBasicMaterialMainService$Wonderjs.isAlive, RecordBasicMaterialMainService$Wonderjs.getRecord(state));
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  return OperateBasicMaterialMainService$Wonderjs.getIsDepthTest(material, state);
}

function setBasicMaterialIsDepthTest(material, isDepthTest, state) {
  Contract$WonderLog.requireCheck((function (param) {
          return AliveComponentService$Wonderjs.checkComponentShouldAlive(material, DisposeBasicMaterialMainService$Wonderjs.isAlive, RecordBasicMaterialMainService$Wonderjs.getRecord(state));
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  return OperateBasicMaterialMainService$Wonderjs.setIsDepthTest(material, isDepthTest, state);
}

function getBasicMaterialAlpha(material, state) {
  Contract$WonderLog.requireCheck((function (param) {
          return AliveComponentService$Wonderjs.checkComponentShouldAlive(material, DisposeBasicMaterialMainService$Wonderjs.isAlive, RecordBasicMaterialMainService$Wonderjs.getRecord(state));
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  return OperateBasicMaterialMainService$Wonderjs.getAlpha(material, state);
}

function setBasicMaterialAlpha(material, alpha, state) {
  Contract$WonderLog.requireCheck((function (param) {
          return AliveComponentService$Wonderjs.checkComponentShouldAlive(material, DisposeBasicMaterialMainService$Wonderjs.isAlive, RecordBasicMaterialMainService$Wonderjs.getRecord(state));
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  return OperateBasicMaterialMainService$Wonderjs.setAlpha(material, alpha, state);
}

function unsafeGetBasicMaterialName(material, state) {
  Contract$WonderLog.requireCheck((function (param) {
          return AliveComponentService$Wonderjs.checkComponentShouldAlive(material, DisposeBasicMaterialMainService$Wonderjs.isAlive, RecordBasicMaterialMainService$Wonderjs.getRecord(state));
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  return NameBasicMaterialMainService$Wonderjs.unsafeGetName(material, state);
}

function setBasicMaterialName(material, name, state) {
  Contract$WonderLog.requireCheck((function (param) {
          return AliveComponentService$Wonderjs.checkComponentShouldAlive(material, DisposeBasicMaterialMainService$Wonderjs.isAlive, RecordBasicMaterialMainService$Wonderjs.getRecord(state));
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  return NameBasicMaterialMainService$Wonderjs.setName(material, name, state);
}

function reInitMaterials(materials, state) {
  Contract$WonderLog.requireCheck((function (param) {
          return ArrayService$WonderCommonlib.forEach((function (material) {
                        return AliveComponentService$Wonderjs.checkComponentShouldAlive(material, DisposeBasicMaterialMainService$Wonderjs.isAlive, RecordBasicMaterialMainService$Wonderjs.getRecord(state));
                      }), materials);
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  return InitBasicMaterialMainService$Wonderjs.reInitComponents(materials, state);
}

function getAllBasicMaterials(state) {
  var match = RecordBasicMaterialMainService$Wonderjs.getRecord(state);
  return GetAllComponentService$Wonderjs.getAllComponents(match[/* index */0], match[/* disposedIndexArray */11]);
}

var batchDisposeBasicMaterial = DisposeComponentGameObjectMainService$Wonderjs.batchDisposeBasicMaterialComponent;

export {
  createBasicMaterial ,
  unsafeGetBasicMaterialGameObjects ,
  getBasicMaterialColor ,
  setBasicMaterialColor ,
  unsafeGetBasicMaterialMap ,
  setBasicMaterialMap ,
  hasBasicMaterialMap ,
  removeBasicMaterialMap ,
  getBasicMaterialIsDepthTest ,
  setBasicMaterialIsDepthTest ,
  getBasicMaterialAlpha ,
  setBasicMaterialAlpha ,
  unsafeGetBasicMaterialName ,
  setBasicMaterialName ,
  reInitMaterials ,
  getAllBasicMaterials ,
  batchDisposeBasicMaterial ,
  
}
/* Contract-WonderLog Not a pure module */
