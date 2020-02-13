

import * as Contract$WonderLog from "../../../../../node_modules/wonder-log/lib/es6_global/src/Contract.js";
import * as StateDataMain$Wonderjs from "../../service/state/main/data/StateDataMain.js";
import * as IsDebugMainService$Wonderjs from "../../service/state/main/state/IsDebugMainService.js";
import * as ArrayService$WonderCommonlib from "../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as AliveComponentService$Wonderjs from "../../service/primitive/component/AliveComponentService.js";
import * as GetAllComponentService$Wonderjs from "../../service/primitive/component/GetAllComponentService.js";
import * as InitLightMaterialMainService$Wonderjs from "../../service/state/main/material/light/InitLightMaterialMainService.js";
import * as NameLightMaterialMainService$Wonderjs from "../../service/state/main/material/light/NameLightMaterialMainService.js";
import * as CreateLightMaterialMainService$Wonderjs from "../../service/state/main/material/light/CreateLightMaterialMainService.js";
import * as GameObjectLightMaterialService$Wonderjs from "../../service/record/main/material/light/GameObjectLightMaterialService.js";
import * as RecordLightMaterialMainService$Wonderjs from "../../service/state/main/material/light/RecordLightMaterialMainService.js";
import * as DisposeLightMaterialMainService$Wonderjs from "../../service/state/main/material/light/DisposeLightMaterialMainService.js";
import * as OperateLightMaterialMainService$Wonderjs from "../../service/state/main/material/light/OperateLightMaterialMainService.js";
import * as DisposeComponentGameObjectMainService$Wonderjs from "../../service/state/main/gameObject/DisposeComponentGameObjectMainService.js";

function createLightMaterial(state) {
  return CreateLightMaterialMainService$Wonderjs.create(state);
}

function unsafeGetLightMaterialGameObjects(material, state) {
  Contract$WonderLog.requireCheck((function (param) {
          return AliveComponentService$Wonderjs.checkComponentShouldAlive(material, DisposeLightMaterialMainService$Wonderjs.isAlive, RecordLightMaterialMainService$Wonderjs.getRecord(state));
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  return GameObjectLightMaterialService$Wonderjs.unsafeGetGameObjects(material, RecordLightMaterialMainService$Wonderjs.getRecord(state));
}

function getLightMaterialDiffuseColor(material, state) {
  Contract$WonderLog.requireCheck((function (param) {
          return AliveComponentService$Wonderjs.checkComponentShouldAlive(material, DisposeLightMaterialMainService$Wonderjs.isAlive, RecordLightMaterialMainService$Wonderjs.getRecord(state));
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  return OperateLightMaterialMainService$Wonderjs.getDiffuseColor(material, state);
}

function setLightMaterialDiffuseColor(material, color, state) {
  Contract$WonderLog.requireCheck((function (param) {
          return AliveComponentService$Wonderjs.checkComponentShouldAlive(material, DisposeLightMaterialMainService$Wonderjs.isAlive, RecordLightMaterialMainService$Wonderjs.getRecord(state));
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  return OperateLightMaterialMainService$Wonderjs.setDiffuseColor(material, color, state);
}

function getLightMaterialSpecularColor(material, state) {
  Contract$WonderLog.requireCheck((function (param) {
          return AliveComponentService$Wonderjs.checkComponentShouldAlive(material, DisposeLightMaterialMainService$Wonderjs.isAlive, RecordLightMaterialMainService$Wonderjs.getRecord(state));
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  return OperateLightMaterialMainService$Wonderjs.getSpecularColor(material, state);
}

function setLightMaterialSpecularColor(material, color, state) {
  Contract$WonderLog.requireCheck((function (param) {
          return AliveComponentService$Wonderjs.checkComponentShouldAlive(material, DisposeLightMaterialMainService$Wonderjs.isAlive, RecordLightMaterialMainService$Wonderjs.getRecord(state));
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  return OperateLightMaterialMainService$Wonderjs.setSpecularColor(material, color, state);
}

function getLightMaterialShininess(material, state) {
  Contract$WonderLog.requireCheck((function (param) {
          return AliveComponentService$Wonderjs.checkComponentShouldAlive(material, DisposeLightMaterialMainService$Wonderjs.isAlive, RecordLightMaterialMainService$Wonderjs.getRecord(state));
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  return OperateLightMaterialMainService$Wonderjs.getShininess(material, state);
}

function setLightMaterialShininess(material, shininess, state) {
  Contract$WonderLog.requireCheck((function (param) {
          return AliveComponentService$Wonderjs.checkComponentShouldAlive(material, DisposeLightMaterialMainService$Wonderjs.isAlive, RecordLightMaterialMainService$Wonderjs.getRecord(state));
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  return OperateLightMaterialMainService$Wonderjs.setShininess(material, shininess, state);
}

function unsafeGetLightMaterialDiffuseMap(material, state) {
  Contract$WonderLog.requireCheck((function (param) {
          return AliveComponentService$Wonderjs.checkComponentShouldAlive(material, DisposeLightMaterialMainService$Wonderjs.isAlive, RecordLightMaterialMainService$Wonderjs.getRecord(state));
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  return OperateLightMaterialMainService$Wonderjs.unsafeGetDiffuseMap(material, state);
}

function setLightMaterialDiffuseMap(material, texture, state) {
  Contract$WonderLog.requireCheck((function (param) {
          return AliveComponentService$Wonderjs.checkComponentShouldAlive(material, DisposeLightMaterialMainService$Wonderjs.isAlive, RecordLightMaterialMainService$Wonderjs.getRecord(state));
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  return OperateLightMaterialMainService$Wonderjs.setDiffuseMap(material, texture, state);
}

function hasLightMaterialDiffuseMap(material, state) {
  Contract$WonderLog.requireCheck((function (param) {
          return AliveComponentService$Wonderjs.checkComponentShouldAlive(material, DisposeLightMaterialMainService$Wonderjs.isAlive, RecordLightMaterialMainService$Wonderjs.getRecord(state));
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  return OperateLightMaterialMainService$Wonderjs.hasDiffuseMap(material, state);
}

function removeLightMaterialDiffuseMap(material, state) {
  Contract$WonderLog.requireCheck((function (param) {
          return AliveComponentService$Wonderjs.checkComponentShouldAlive(material, DisposeLightMaterialMainService$Wonderjs.isAlive, RecordLightMaterialMainService$Wonderjs.getRecord(state));
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  return OperateLightMaterialMainService$Wonderjs.removeDiffuseMap(material, state);
}

function unsafeGetLightMaterialSpecularMap(material, state) {
  Contract$WonderLog.requireCheck((function (param) {
          return AliveComponentService$Wonderjs.checkComponentShouldAlive(material, DisposeLightMaterialMainService$Wonderjs.isAlive, RecordLightMaterialMainService$Wonderjs.getRecord(state));
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  return OperateLightMaterialMainService$Wonderjs.unsafeGetSpecularMap(material, state);
}

function setLightMaterialSpecularMap(material, texture, state) {
  Contract$WonderLog.requireCheck((function (param) {
          return AliveComponentService$Wonderjs.checkComponentShouldAlive(material, DisposeLightMaterialMainService$Wonderjs.isAlive, RecordLightMaterialMainService$Wonderjs.getRecord(state));
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  return OperateLightMaterialMainService$Wonderjs.setSpecularMap(material, texture, state);
}

function hasLightMaterialSpecularMap(material, state) {
  Contract$WonderLog.requireCheck((function (param) {
          return AliveComponentService$Wonderjs.checkComponentShouldAlive(material, DisposeLightMaterialMainService$Wonderjs.isAlive, RecordLightMaterialMainService$Wonderjs.getRecord(state));
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  return OperateLightMaterialMainService$Wonderjs.hasSpecularMap(material, state);
}

function removeLightMaterialSpecularMap(material, state) {
  Contract$WonderLog.requireCheck((function (param) {
          return AliveComponentService$Wonderjs.checkComponentShouldAlive(material, DisposeLightMaterialMainService$Wonderjs.isAlive, RecordLightMaterialMainService$Wonderjs.getRecord(state));
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  return OperateLightMaterialMainService$Wonderjs.removeSpecularMap(material, state);
}

function unsafeGetLightMaterialName(material, state) {
  Contract$WonderLog.requireCheck((function (param) {
          return AliveComponentService$Wonderjs.checkComponentShouldAlive(material, DisposeLightMaterialMainService$Wonderjs.isAlive, RecordLightMaterialMainService$Wonderjs.getRecord(state));
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  return NameLightMaterialMainService$Wonderjs.unsafeGetName(material, state);
}

function setLightMaterialName(material, name, state) {
  Contract$WonderLog.requireCheck((function (param) {
          return AliveComponentService$Wonderjs.checkComponentShouldAlive(material, DisposeLightMaterialMainService$Wonderjs.isAlive, RecordLightMaterialMainService$Wonderjs.getRecord(state));
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  return NameLightMaterialMainService$Wonderjs.setName(material, name, state);
}

function reInitMaterials(materials, state) {
  Contract$WonderLog.requireCheck((function (param) {
          return ArrayService$WonderCommonlib.forEach((function (material) {
                        return AliveComponentService$Wonderjs.checkComponentShouldAlive(material, DisposeLightMaterialMainService$Wonderjs.isAlive, RecordLightMaterialMainService$Wonderjs.getRecord(state));
                      }), materials);
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  return InitLightMaterialMainService$Wonderjs.reInitComponents(materials, state);
}

function getAllLightMaterials(state) {
  var match = RecordLightMaterialMainService$Wonderjs.getRecord(state);
  return GetAllComponentService$Wonderjs.getAllComponents(match[/* index */0], match[/* disposedIndexArray */14]);
}

function batchDisposeLightMaterial(materialArr, state) {
  return DisposeComponentGameObjectMainService$Wonderjs.batchDisposeLightMaterialComponent(materialArr, false, state);
}

function batchDisposeLightMaterialRemoveTexture(materialArr, state) {
  return DisposeComponentGameObjectMainService$Wonderjs.batchDisposeLightMaterialComponent(materialArr, true, state);
}

export {
  createLightMaterial ,
  unsafeGetLightMaterialGameObjects ,
  getLightMaterialDiffuseColor ,
  setLightMaterialDiffuseColor ,
  getLightMaterialSpecularColor ,
  setLightMaterialSpecularColor ,
  getLightMaterialShininess ,
  setLightMaterialShininess ,
  unsafeGetLightMaterialDiffuseMap ,
  setLightMaterialDiffuseMap ,
  hasLightMaterialDiffuseMap ,
  removeLightMaterialDiffuseMap ,
  unsafeGetLightMaterialSpecularMap ,
  setLightMaterialSpecularMap ,
  hasLightMaterialSpecularMap ,
  removeLightMaterialSpecularMap ,
  unsafeGetLightMaterialName ,
  setLightMaterialName ,
  reInitMaterials ,
  getAllLightMaterials ,
  batchDisposeLightMaterial ,
  batchDisposeLightMaterialRemoveTexture ,
  
}
/* Contract-WonderLog Not a pure module */
