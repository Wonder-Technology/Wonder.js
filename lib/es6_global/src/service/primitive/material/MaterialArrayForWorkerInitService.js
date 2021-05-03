

import * as ArrayService$Wonderjs from "../../atom/ArrayService.js";
import * as DisposeECSService$Wonderjs from "../ecs/DisposeECSService.js";
import * as MutableSparseMapService$WonderCommonlib from "./../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/MutableSparseMapService.js";

function removeDisposedOnesFromMaterialArrayForWorkerInit(materialDataMap, materialArrayForWorkerInit) {
  var match = MutableSparseMapService$WonderCommonlib.length(materialDataMap);
  if (match !== 0) {
    var materialMap = DisposeECSService$Wonderjs.buildMapFromArray(MutableSparseMapService$WonderCommonlib.getValidKeys(materialDataMap), MutableSparseMapService$WonderCommonlib.createEmpty(/* () */0));
    return materialArrayForWorkerInit.filter((function (material) {
                  return !MutableSparseMapService$WonderCommonlib.has(material, materialMap);
                }));
  } else {
    return materialArrayForWorkerInit;
  }
}

function addMaterialToMaterialArrayForWorkerInit(materialIndex, materialArrayForWorkerInit) {
  var match = ArrayService$Wonderjs.unsafeGetLast(materialArrayForWorkerInit) === materialIndex;
  if (match) {
    return materialArrayForWorkerInit;
  } else {
    return ArrayService$Wonderjs.push(materialIndex, materialArrayForWorkerInit);
  }
}

export {
  removeDisposedOnesFromMaterialArrayForWorkerInit ,
  addMaterialToMaterialArrayForWorkerInit ,
  
}
/* ArrayService-Wonderjs Not a pure module */
