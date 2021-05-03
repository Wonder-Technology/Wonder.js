

import * as Caml_option from "./../../../../../../../node_modules/bs-platform/lib/es6/caml_option.js";
import * as TypeArrayPoolService$Wonderjs from "../../../record/main/typeArrayPool/TypeArrayPoolService.js";
import * as DisposeComponentService$Wonderjs from "../../../primitive/component/DisposeComponentService.js";
import * as MutableSparseMapService$WonderCommonlib from "./../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/MutableSparseMapService.js";

function disposeMatrixFloat32ArrayMap(sourceInstance, maxBigTypeArrayPoolSize, matrixFloat32ArrayMap, typeArrayPoolRecord) {
  var match = MutableSparseMapService$WonderCommonlib.get(sourceInstance, matrixFloat32ArrayMap);
  if (match !== undefined) {
    TypeArrayPoolService$Wonderjs.addFloat32TypeArrayToPool(Caml_option.valFromOption(match), maxBigTypeArrayPoolSize, TypeArrayPoolService$Wonderjs.getFloat32ArrayPoolMap(typeArrayPoolRecord));
  }
  return DisposeComponentService$Wonderjs.disposeSparseMapData(sourceInstance, matrixFloat32ArrayMap);
}

var disposeMatrixInstanceBufferCapacityMap = DisposeComponentService$Wonderjs.disposeSparseMapData;

var disposeIsSendTransformMatrixDataMap = DisposeComponentService$Wonderjs.disposeSparseMapData;

export {
  disposeMatrixFloat32ArrayMap ,
  disposeMatrixInstanceBufferCapacityMap ,
  disposeIsSendTransformMatrixDataMap ,
  
}
/* DisposeComponentService-Wonderjs Not a pure module */
