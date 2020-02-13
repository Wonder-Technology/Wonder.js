

import * as ArrayService$WonderCommonlib from "../../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as MutableSparseMapService$WonderCommonlib from "../../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/MutableSparseMapService.js";

function create(param) {
  return /* record */[
          /* index */0,
          /* pointDragStartEventHandleFuncListMap */MutableSparseMapService$WonderCommonlib.createEmpty(/* () */0),
          /* pointDragDropEventHandleFuncListMap */MutableSparseMapService$WonderCommonlib.createEmpty(/* () */0),
          /* pointDragOverEventHandleFuncListMap */MutableSparseMapService$WonderCommonlib.createEmpty(/* () */0),
          /* pointScaleEventHandleFuncListMap */MutableSparseMapService$WonderCommonlib.createEmpty(/* () */0),
          /* keydownEventHandleFuncListMap */MutableSparseMapService$WonderCommonlib.createEmpty(/* () */0),
          /* keyupEventHandleFuncListMap */MutableSparseMapService$WonderCommonlib.createEmpty(/* () */0),
          /* moveSpeedMap */MutableSparseMapService$WonderCommonlib.createEmpty(/* () */0),
          /* wheelSpeedMap */MutableSparseMapService$WonderCommonlib.createEmpty(/* () */0),
          /* rotateSpeedMap */MutableSparseMapService$WonderCommonlib.createEmpty(/* () */0),
          /* eulerAngleDiffMap */MutableSparseMapService$WonderCommonlib.createEmpty(/* () */0),
          /* translationDiffMap */MutableSparseMapService$WonderCommonlib.createEmpty(/* () */0),
          /* gameObjectMap */MutableSparseMapService$WonderCommonlib.createEmpty(/* () */0),
          /* disposedIndexArray */ArrayService$WonderCommonlib.createEmpty(/* () */0),
          /* directionArrayMap */MutableSparseMapService$WonderCommonlib.createEmpty(/* () */0),
          /* localEulerAngleMap */MutableSparseMapService$WonderCommonlib.createEmpty(/* () */0)
        ];
}

function deepCopyForRestore(param) {
  return /* record */[
          /* index */param[/* index */0],
          /* pointDragStartEventHandleFuncListMap */MutableSparseMapService$WonderCommonlib.copy(param[/* pointDragStartEventHandleFuncListMap */1]),
          /* pointDragDropEventHandleFuncListMap */MutableSparseMapService$WonderCommonlib.copy(param[/* pointDragDropEventHandleFuncListMap */2]),
          /* pointDragOverEventHandleFuncListMap */MutableSparseMapService$WonderCommonlib.copy(param[/* pointDragOverEventHandleFuncListMap */3]),
          /* pointScaleEventHandleFuncListMap */MutableSparseMapService$WonderCommonlib.copy(param[/* pointScaleEventHandleFuncListMap */4]),
          /* keydownEventHandleFuncListMap */MutableSparseMapService$WonderCommonlib.copy(param[/* keydownEventHandleFuncListMap */5]),
          /* keyupEventHandleFuncListMap */MutableSparseMapService$WonderCommonlib.copy(param[/* keyupEventHandleFuncListMap */6]),
          /* moveSpeedMap */MutableSparseMapService$WonderCommonlib.copy(param[/* moveSpeedMap */7]),
          /* wheelSpeedMap */MutableSparseMapService$WonderCommonlib.copy(param[/* wheelSpeedMap */8]),
          /* rotateSpeedMap */MutableSparseMapService$WonderCommonlib.copy(param[/* rotateSpeedMap */9]),
          /* eulerAngleDiffMap */MutableSparseMapService$WonderCommonlib.copy(param[/* eulerAngleDiffMap */10]),
          /* translationDiffMap */MutableSparseMapService$WonderCommonlib.copy(param[/* translationDiffMap */11]),
          /* gameObjectMap */MutableSparseMapService$WonderCommonlib.copy(param[/* gameObjectMap */12]),
          /* disposedIndexArray */param[/* disposedIndexArray */13].slice(),
          /* directionArrayMap */MutableSparseMapService$WonderCommonlib.copy(param[/* directionArrayMap */14]),
          /* localEulerAngleMap */MutableSparseMapService$WonderCommonlib.copy(param[/* localEulerAngleMap */15])
        ];
}

export {
  create ,
  deepCopyForRestore ,
  
}
/* No side effect */
