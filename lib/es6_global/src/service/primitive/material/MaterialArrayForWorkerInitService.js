

import * as ArrayService$Wonderjs from "../../atom/ArrayService.js";
import * as DisposeECSService$Wonderjs from "../ecs/DisposeECSService.js";
import * as SparseMapService$WonderCommonlib from "../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/SparseMapService.js";

function removeDisposedOnesFromMaterialArrayForWorkerInit(materialArray, materialArrayForWorkerInit) {
  var match = materialArray.length;
  if (match !== 0) {
    var materialMap = DisposeECSService$Wonderjs.buildMapFromArray(materialArray, SparseMapService$WonderCommonlib.createEmpty(/* () */0));
    return materialArrayForWorkerInit.filter((function (material) {
                  return !SparseMapService$WonderCommonlib.has(material, materialMap);
                }));
  } else {
    return materialArrayForWorkerInit;
  }
}

function addMaterialToMaterialArrayForWorkerInit(materialIndex, materialArrayForWorkerInit) {
  var match = ArrayService$Wonderjs.getLast(materialArrayForWorkerInit) === materialIndex;
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
