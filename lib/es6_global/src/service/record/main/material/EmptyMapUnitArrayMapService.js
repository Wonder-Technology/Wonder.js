

import * as Log$WonderLog from "../../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as ArrayService$Wonderjs from "../../../atom/ArrayService.js";
import * as SparseMapService$WonderCommonlib from "../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/SparseMapService.js";

var _unsafeGetEmptyMapUnitArray = SparseMapService$WonderCommonlib.unsafeGet;

function addEmptyMapUnit(material, emptyMapUnit, emptyMapUnitArrayMap) {
  ArrayService$Wonderjs.push(emptyMapUnit, SparseMapService$WonderCommonlib.unsafeGet(material, emptyMapUnitArrayMap));
  return emptyMapUnitArrayMap;
}

function _createArray(textureCountPerMaterial) {
  return ArrayService$Wonderjs.rangeReverse(textureCountPerMaterial - 1 | 0, 0);
}

function initEmptyMapUnitArray(material, textureCountPerMaterial, emptyMapUnitArrayMap) {
  return SparseMapService$WonderCommonlib.set(material, _createArray(textureCountPerMaterial), emptyMapUnitArrayMap);
}

function unsafeGetEmptyMapUnitAndPop(material, emptyMapUnitArrayMap) {
  var match = SparseMapService$WonderCommonlib.unsafeGet(material, emptyMapUnitArrayMap).pop();
  return /* tuple */[
          match !== undefined ? match : Log$WonderLog.fatal(Log$WonderLog.buildFatalMessage("unsafeGetEmptyMapUnitAndPop", "has no empty map unit", "", "", "")),
          emptyMapUnitArrayMap
        ];
}

export {
  _unsafeGetEmptyMapUnitArray ,
  addEmptyMapUnit ,
  _createArray ,
  initEmptyMapUnitArray ,
  unsafeGetEmptyMapUnitAndPop ,
  
}
/* Log-WonderLog Not a pure module */
