

import * as Log$WonderLog from "./../../../../../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as Contract$WonderLog from "./../../../../../../../../../../node_modules/wonder-log/lib/es6_global/src/Contract.js";
import * as StateDataMain$Wonderjs from "../../../../../main/data/StateDataMain.js";
import * as IsDebugMainService$Wonderjs from "../../../../../main/state/IsDebugMainService.js";
import * as MutableSparseMapService$WonderCommonlib from "./../../../../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/MutableSparseMapService.js";
import * as OperateTypeArrayAllLightMaterialService$Wonderjs from "../../../../../../record/all/material/light/OperateTypeArrayAllLightMaterialService.js";

function getDiffuseColor(material, param) {
  return OperateTypeArrayAllLightMaterialService$Wonderjs.getDiffuseColor(material, param[/* lightMaterialRecord */2][/* diffuseColors */3]);
}

function getSpecularColor(material, param) {
  return OperateTypeArrayAllLightMaterialService$Wonderjs.getSpecularColor(material, param[/* lightMaterialRecord */2][/* specularColors */4]);
}

function getShininess(material, param) {
  return OperateTypeArrayAllLightMaterialService$Wonderjs.getShininess(material, param[/* lightMaterialRecord */2][/* shininess */5]);
}

function getDiffuseTexture(material, param) {
  return OperateTypeArrayAllLightMaterialService$Wonderjs.getTextureIndex(material, param[/* lightMaterialRecord */2][/* diffuseTextureIndices */6]);
}

function getSpecularTexture(material, param) {
  return OperateTypeArrayAllLightMaterialService$Wonderjs.getTextureIndex(material, param[/* lightMaterialRecord */2][/* specularTextureIndices */7]);
}

function _unsafeGetMapUnit(material, unitMap) {
  Contract$WonderLog.requireCheck((function (param) {
          return Contract$WonderLog.test(Log$WonderLog.buildAssertMessage("unitMap has unit", "not"), (function (param) {
                        return Contract$WonderLog.assertTrue(MutableSparseMapService$WonderCommonlib.has(material, unitMap));
                      }));
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  return MutableSparseMapService$WonderCommonlib.unsafeGet(material, unitMap);
}

function unsafeGetDiffuseMapUnit(material, lightMaterialRecord) {
  return _unsafeGetMapUnit(material, lightMaterialRecord[/* diffuseMapUnitMap */0]);
}

function unsafeGetSpecularMapUnit(material, lightMaterialRecord) {
  return _unsafeGetMapUnit(material, lightMaterialRecord[/* specularMapUnitMap */1]);
}

function getDiffuseMapUnit(material, param) {
  return _unsafeGetMapUnit(material, param[/* lightMaterialRecord */2][/* diffuseMapUnitMap */0]);
}

function getSpecularMapUnit(material, param) {
  return _unsafeGetMapUnit(material, param[/* lightMaterialRecord */2][/* specularMapUnitMap */1]);
}

export {
  getDiffuseColor ,
  getSpecularColor ,
  getShininess ,
  getDiffuseTexture ,
  getSpecularTexture ,
  _unsafeGetMapUnit ,
  unsafeGetDiffuseMapUnit ,
  unsafeGetSpecularMapUnit ,
  getDiffuseMapUnit ,
  getSpecularMapUnit ,
  
}
/* Log-WonderLog Not a pure module */
